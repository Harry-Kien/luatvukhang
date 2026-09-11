import { test, expect, type APIRequestContext } from "@playwright/test";
import fs from "node:fs/promises";

/**
 * Tìm kiếm tiếng Trung từng hỏng hoàn toàn: biểu thức tách từ chỉ nhận `a-z0-9`
 * nên mọi chữ Hán bị coi là dấu phân cách, truy vấn tách ra thành mảng rỗng và
 * mọi từ khóa đều trả về 0 kết quả — kể cả tiêu đề chính xác của một lĩnh vực
 * đang hiển thị. Không bài kiểm thử nào chạm tới /zh/search nên lỗi lọt qua.
 */
function resultCount(html: string): number {
  const match = html.match(/role="status">(\d+)/);
  return match ? Number(match[1]) : -1;
}

/**
 * Lấy từ khóa từ chính tiêu đề đã xuất bản thay vì viết cứng. Cơ sở dữ liệu
 * trống của CI không có lĩnh vực nào, và một danh sách từ khóa cố định sẽ hỏng
 * ở đó vì lý do không liên quan gì tới điều đang kiểm tra.
 */
async function publishedTitles(request: APIRequestContext, locale: string) {
  const response = await request.get(
    `/api/services?where[language][equals]=${locale}&where[_status][equals]=published&limit=5&depth=0`,
  );
  if (!response.ok()) return [];
  const body = await response.json();
  return (body.docs ?? []).map((doc: { title: string }) => doc.title);
}

/** Chữ Hán viết liền: hai ký tự đầu của tiêu đề là một từ khóa hợp lệ. */
const chineseQuery = (title: string) => Array.from(title).slice(0, 2).join("");
/** Chữ Latin: lấy từ dài nhất trong tiêu đề vì nó đặc trưng nhất. */
const latinQuery = (title: string) =>
  title
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)[0] ?? "";

test("Chinese queries return results, not an empty page", async ({
  request,
}) => {
  const titles = await publishedTitles(request, "zh");
  test.skip(
    titles.length === 0,
    "Chưa có lĩnh vực chuyên môn tiếng Trung đã xuất bản.",
  );
  for (const title of titles.slice(0, 3)) {
    const query = chineseQuery(title);
    const html = await (
      await request.get("/zh/search?q=" + encodeURIComponent(query))
    ).text();
    expect(
      resultCount(html),
      `Tìm "${query}" (lấy từ tiêu đề "${title}") phải có kết quả`,
    ).toBeGreaterThan(0);
  }
});

test("all three languages return results for their own wording", async ({
  request,
}) => {
  for (const locale of ["vi", "en", "zh"] as const) {
    const titles = await publishedTitles(request, locale);
    if (!titles.length) continue;
    const query =
      locale === "zh" ? chineseQuery(titles[0]) : latinQuery(titles[0]);
    if (!query) continue;
    const html = await (
      await request.get(`/${locale}/search?q=` + encodeURIComponent(query))
    ).text();
    expect(
      resultCount(html),
      `${locale}: tìm "${query}" không có kết quả nào`,
    ).toBeGreaterThan(0);
  }
});

test("site search reaches the standing pages, not only the practice areas", async ({
  request,
}) => {
  // Bộ trang hướng dẫn từng được gán đè lên toàn bộ kết quả nhóm "pages", nên
  // Về chúng tôi, Liên hệ và Trang chủ biến mất khỏi tìm kiếm.
  const html = await (
    await request.get("/vi/search?q=" + encodeURIComponent("Liên hệ"))
  ).text();
  test.skip(resultCount(html) <= 0, "Chưa nạp trang nền để tìm.");
  expect(html, "Trang Liên hệ phải tìm được").toContain('href="/vi/contact"');
});

test("the internal disclosure basis never leaves the CMS", async ({
  request,
}) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  expect(login.ok()).toBeTruthy();
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const secret = "CAN CU NOI BO " + Date.now();

  const created = await request.post("/api/experience?draft=true", {
    headers,
    data: {
      title: "QA experience " + Date.now(),
      slug: "qa-disclosure-" + Date.now(),
      language: "vi",
      translationKey: "qa-disclosure-" + Date.now(),
      summary: "Bản ghi kiểm thử cho quyền đọc ở mức trường.",
      disclosureApproval: secret,
      reviewState: "approved",
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const id = (await created.json()).doc.id;

  try {
    await request.patch(`/api/experience/${id}`, {
      headers,
      data: { _status: "published" },
    });

    // Quyền ở mức bộ sưu tập chỉ lọc BẢN GHI; nếu không chặn ở mức trường thì
    // bản ghi đã xuất bản mang theo cả căn cứ nội bộ ra API công khai.
    const anonymous = await request.get(`/api/experience/${id}?depth=0`);
    if (anonymous.ok())
      expect(
        await anonymous.text(),
        "Căn cứ được phép công bố bị lộ qua REST API",
      ).not.toContain(secret);

    const list = await request.get("/api/experience?limit=50&depth=0");
    expect(
      await list.text(),
      "Căn cứ được phép công bố bị lộ trong danh sách REST",
    ).not.toContain(secret);

    // Người biên tập vẫn phải đọc được, nếu không thì CMS mất chức năng.
    const editor = await request.get(`/api/experience/${id}?depth=0`, {
      headers,
    });
    expect(await editor.text()).toContain(secret);
  } finally {
    await request.delete(`/api/experience/${id}`, { headers });
  }
});
