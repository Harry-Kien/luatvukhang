import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
test("people directory filters verified profiles and shows empty results accurately", async ({
  request,
  page,
}) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  expect(login.ok()).toBeTruthy();
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const created: { collection: string; id: number }[] = [];
  const key = "qa-" + randomUUID();
  const create = async (collection: string, data: any) => {
    const response = await request.post(`/api/${collection}`, {
      headers,
      data: {
        language: "vi",
        translationKey: key + collection,
        slug: key + collection,
        title: "Kiểm thử tạm thời",
        summary: "Dữ liệu kiểm thử tự động, sẽ được xóa sau khi kiểm tra.",
        reviewState: "approved",
        _status: "published",
        ...data,
      },
    });
    expect(response.ok()).toBeTruthy();
    const doc = (await response.json()).doc;
    created.push({ collection, id: doc.id });
    return doc;
  };
  try {
    const service = await create("services", {
      title: "QA Chuyên môn kiểm thử",
    });
    const lawyer = await create("lawyers", {
      title: "QA Nguyễn Kiểm Thử",
      position: "Hồ sơ kiểm thử",
      languages: "Tiếng Việt",
      services: [service.id],
    });
    await page.goto("/vi/lawyers");
    await page.getByLabel("Tên hoặc từ khóa").fill("Nguyen Kiem Thu");
    await page
      .getByLabel("Lĩnh vực chuyên môn")
      .selectOption(String(service.id));
    await page.getByRole("button", { name: "Tìm luật sư" }).click();
    await expect(page.locator(".person-card")).toHaveCount(1);
    await expect(page.locator(".person-card")).toContainText(lawyer.title);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
    await page.locator(".person-card").click();
    await expect(page.locator("h1")).toHaveText(lawyer.title);
    await expect(
      page.getByRole("link", { name: "Trở về danh sách" }),
    ).toBeVisible();
    await page.goto("/vi/lawyers?q=khong-co-ho-so-nay");
    await expect(
      page.getByRole("heading", { name: "Chưa tìm thấy hồ sơ phù hợp" }),
    ).toBeVisible();
    await expect(page.locator(".person-card")).toHaveCount(0);
  } finally {
    for (const c of created.reverse())
      await request.delete(`/api/${c.collection}/${c.id}`, { headers });
  }
});
test("people landing and admin readiness", async ({ page }) => {
  await page.goto("/vi/lawyers");
  await expect(
    page.getByRole("heading", { name: "Đội ngũ", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: `artifacts/people-${test.info().project.name}.jpg`,
    type: "jpeg",
    quality: 75,
    fullPage: true,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

/**
 * Trang Đội ngũ chỉ chứa người thật của công ty.
 *
 * Hồ sơ minh họa từng được dùng để công ty xem trước bố cục. Khi đã có hồ sơ
 * thật thì chúng phải biến mất khỏi CMS, không chỉ khỏi website: một hồ sơ luật
 * sư bịa nằm trong hệ thống của công ty luật là rủi ro nghề nghiệp, và biên tập
 * viên rất dễ nhầm nó với người thật.
 */
test("Đội ngũ không còn hồ sơ minh họa và mỗi người có đủ ba ngôn ngữ", async ({
  request,
}) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const all = await request.get("/api/lawyers?draft=true&limit=200&depth=0", {
    headers,
  });
  const docs = (await all.json()).docs as Record<string, any>[];

  const samples = docs.filter((doc) => doc.isSample);
  expect(
    samples.map((doc) => doc.slug),
    "còn hồ sơ minh họa trong CMS",
  ).toEqual([]);

  // Bản ghi do các bài kiểm thử khác tạo ra mang tiền tố qa-; bỏ qua.
  const real = docs.filter((doc) => !String(doc.slug ?? "").startsWith("qa-"));
  const byPerson = new Map<string, string[]>();
  for (const doc of real) {
    const key = String(doc.translationKey ?? doc.slug);
    byPerson.set(key, [...(byPerson.get(key) ?? []), doc.language]);
  }
  for (const [key, languages] of byPerson)
    expect(languages.sort(), `hồ sơ ${key} thiếu bản ngôn ngữ`).toEqual([
      "en",
      "vi",
      "zh",
    ]);
});

/**
 * Trang Đội ngũ phải thật sự giới thiệu được người của công ty.
 *
 * Với một công ty luật, đây là trang quyết định lòng tin: khách muốn biết ai sẽ
 * làm việc với mình trước khi gửi yêu cầu. Trạng thái "đang được cập nhật" chỉ
 * đúng khi công ty chưa cung cấp hồ sơ nào — còn khi đã có thì nó là lỗi.
 */
for (const locale of ["vi", "en", "zh"] as const)
  test(`trang Đội ngũ /${locale} hiển thị hồ sơ đã xuất bản`, async ({
    page,
    request,
  }) => {
    // Đọc danh sách từ chính API thay vì gắn cứng tên người. Công ty thêm,
    // đổi hay gỡ một luật sư là bài kiểm thử đi theo, không phải sửa lại —
    // và nó vẫn bắt được đúng lỗi cần bắt: có hồ sơ mà trang không hiện.
    const response = await request.get(
      `/api/lawyers?where[_status][equals]=published&where[language][equals]=${locale}&limit=100&depth=0`,
    );
    const published = ((await response.json()).docs ?? []) as {
      title: string;
    }[];
    test.skip(
      published.length === 0,
      `Chưa có hồ sơ luật sư đã xuất bản cho /${locale}.`,
    );

    await page.goto(`/${locale}/lawyers`);
    await expect(
      page.locator(".person-card"),
      `trang Đội ngũ /${locale} không có hồ sơ nào`,
    ).toHaveCount(published.length);
    for (const person of published)
      await expect(
        page.locator(".person-card", { hasText: person.title }),
        `thiếu hồ sơ ${person.title} ở /${locale}`,
      ).toHaveCount(1);
  });

/**
 * Thông tin nghề nghiệp đã xác minh phải hiện trên trang hồ sơ.
 *
 * Với một công ty luật, đây là phần khách và công cụ tìm kiếm đều dựa vào để
 * đánh giá: nền tảng nghề nghiệp, học vị, chức vụ đã từng giữ. Nhập vào CMS mà
 * trang không hiện thì coi như chưa có.
 */
test("hồ sơ luật sư hiển thị thông tin nghề nghiệp đã xác minh", async ({
  page,
  request,
}) => {
  const response = await request.get(
    "/api/lawyers?where[_status][equals]=published&where[language][equals]=vi&limit=100&depth=0",
  );
  const withCredentials = (
    ((await response.json()).docs ?? []) as {
      slug: string;
      qualifications?: string | null;
    }[]
  ).filter((doc) => String(doc.qualifications ?? "").trim());
  test.skip(
    withCredentials.length === 0,
    "Chưa hồ sơ nào có thông tin nghề nghiệp đã xác minh.",
  );

  for (const person of withCredentials) {
    await page.goto(`/vi/lawyers/${person.slug}`);
    await expect(
      page.locator("main"),
      `trang ${person.slug} không hiện thông tin nghề nghiệp`,
    ).toContainText(person.qualifications!.trim());
  }
});

/**
 * Luật sư đứng trước, chuyên viên đứng sau.
 *
 * Xếp thuần theo bảng chữ cái thì một chuyên viên có thể chen vào giữa các luật
 * sư — trên website công ty luật, thứ tự đó đọc như một nhận định sai về vai
 * trò. Vai trò lấy từ trường "Vai trò" trong CMS, không đoán từ chữ trong chức
 * danh: công ty đặt thêm chức danh mới thì cách đoán đó hỏng ngay.
 */
test("trang Đội ngũ xếp luật sư trước chuyên viên", async ({
  page,
  request,
}) => {
  const response = await request.get(
    "/api/lawyers?where[_status][equals]=published&where[language][equals]=vi&limit=100&depth=0",
  );
  const people = ((await response.json()).docs ?? []) as {
    title: string;
    role?: string | null;
  }[];
  const specialists = people.filter((p) => p.role === "specialist");
  const lawyers = people.filter((p) => p.role !== "specialist");
  test.skip(
    specialists.length === 0 || lawyers.length === 0,
    "Cần có cả luật sư lẫn chuyên viên đã xuất bản để kiểm thứ tự.",
  );

  await page.goto("/vi/lawyers");
  const order = await page.locator(".person-card h3").allInnerTexts();
  const at = (name: string) => order.findIndex((text) => text.includes(name));
  const lastLawyer = Math.max(...lawyers.map((p) => at(p.title)));
  const firstSpecialist = Math.min(...specialists.map((p) => at(p.title)));
  expect(
    firstSpecialist,
    `thứ tự hiện tại: ${order.join(" · ")}`,
  ).toBeGreaterThan(lastLawyer);
});

/**
 * Bộ lọc theo lĩnh vực chỉ xuất hiện khi có hồ sơ gán lĩnh vực.
 *
 * Chưa hồ sơ nào được gán mà vẫn bày ô chọn thì mọi lựa chọn đều trả về "0 hồ
 * sơ phù hợp" kèm lời khuyên "thử tên ngắn hơn" — đổ lỗi cho người tìm, trong
 * khi nguyên nhân nằm ở dữ liệu còn thiếu. Một ô lọc không bao giờ ra kết quả
 * tệ hơn là không có ô lọc nào.
 */
test("bộ lọc lĩnh vực chỉ hiện khi có hồ sơ đã gán lĩnh vực", async ({
  page,
  request,
}) => {
  const response = await request.get(
    "/api/lawyers?where[_status][equals]=published&where[language][equals]=vi&limit=100&depth=0",
  );
  const anyAssigned = (
    ((await response.json()).docs ?? []) as { services?: unknown[] | null }[]
  ).some((doc) => (doc.services ?? []).length > 0);

  await page.goto("/vi/lawyers");
  const filter = page.locator("#people-service");
  if (anyAssigned)
    await expect(
      filter,
      "có hồ sơ gán lĩnh vực nhưng thiếu bộ lọc",
    ).toHaveCount(1);
  else
    await expect(
      filter,
      "chưa hồ sơ nào gán lĩnh vực mà vẫn bày bộ lọc không ra kết quả",
    ).toHaveCount(0);
});
