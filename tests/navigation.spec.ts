import { test, expect } from "@playwright/test";

test("the expertise menu lists every published practice area and numbers them correctly", async ({
  page,
}) => {
  await page.goto("/vi");
  const listed = await page
    .locator(".mega-links > a strong, .mobile-nav a")
    .count();
  test.skip(listed === 0 && (await page.locator(".menu-toggle").count()) === 0);

  // Trên khung hẹp danh mục chuyên môn nằm trong menu, không có mega menu.
  const toggle = page.locator(".mega-menu");
  const trigger = page.getByRole("button", { name: /Chuyên môn/ });
  test.skip(
    (await trigger.count()) === 0,
    "Khung này dùng menu di động, không có danh mục chuyên môn dạng mega menu.",
  );
  await trigger.click();
  await expect(toggle).toBeVisible();

  const items = page.locator(".mega-links > a");
  const count = await items.count();
  expect(count, "Danh mục phải liệt kê chuyên môn đã xuất bản").toBeGreaterThan(
    0,
  );

  // Viết cứng tiền tố "0" từng khiến mục thứ mười hiện thành "010"; đệm theo độ
  // dài danh sách nhưng vẫn giữ tối thiểu hai chữ số như thiết kế.
  const numbers = await items.locator("> span").allTextContents();
  const width = Math.max(2, String(count).length);
  expect(numbers).toEqual(
    Array.from({ length: count }, (_, i) => String(i + 1).padStart(width, "0")),
  );
  for (const value of numbers)
    expect(
      Number(value),
      `Số thứ tự "${value}" không hợp lệ`,
    ).toBeLessThanOrEqual(count);

  // Mỗi mục phải dẫn tới một trang chi tiết có thật.
  const first = items.first();
  const href = await first.getAttribute("href");
  const response = await page.goto(href!);
  expect(response?.status()).toBe(200);
});

test("the expertise menu matches the practice areas listing page", async ({
  page,
}) => {
  await page.goto("/vi/services");
  const onPage = (
    await page
      .locator("main a[href^='/vi/services/']")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).filter(Boolean);
  const unique = [...new Set(onPage)];
  expect(
    unique.length,
    "Trang chuyên môn phải liệt kê ít nhất một lĩnh vực",
  ).toBeGreaterThan(0);

  const trigger = page.getByRole("button", { name: /Chuyên môn/ });
  test.skip((await trigger.count()) === 0, "Khung này dùng menu di động.");
  await trigger.click();
  const inMenu = (
    await page
      .locator(".mega-links > a")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).filter(Boolean);
  // Menu và trang danh sách đọc cùng một nguồn; lệch nhau nghĩa là một trong hai
  // đang lọc theo tiêu chí khác và người dùng sẽ thấy hai danh sách mâu thuẫn.
  // Trang danh sách phân trang 12 mục, còn menu liệt kê tất cả — nên chỉ đối
  // chiếu bằng nhau khi danh sách gọn trong một trang.
  const paginated = (await page.locator(".pagination").count()) > 0;
  if (paginated)
    for (const href of unique)
      expect(inMenu, `Menu thiếu ${href}`).toContain(href);
  else expect([...inMenu].sort()).toEqual([...unique].sort());
});

test("practice areas follow the firm's catalogue order everywhere", async ({
  page,
}) => {
  // Trước đây danh sách xếp theo lần sửa gần nhất: lưu một lĩnh vực là nó nhảy
  // lên đầu menu. Thứ tự phải là thứ tự danh mục công ty đã đưa.
  const { SERVICE_ORDER } = await import("../src/lib/service-order");
  const order = SERVICE_ORDER as readonly string[];
  const slugsOn = async (selector: string) =>
    (
      await page
        .locator(selector)
        .evaluateAll((links) => links.map((a) => a.getAttribute("href") || ""))
    )
      .map((href) => href.split("/services/")[1]?.split(/[?#]/)[0])
      .filter((slug): slug is string => !!slug && order.includes(slug));

  await page.goto("/vi");
  const home = await slugsOn(".practice-list a.practice-item");
  await page.goto("/vi/services");
  const listing = await slugsOn(`main a[href^="/vi/services/"]`);
  for (const [where, slugs] of [
    ["trang chủ", home],
    ["trang Chuyên môn", [...new Set(listing)]],
  ] as const) {
    test.skip(slugs.length < 2, "Chưa đủ lĩnh vực đã xuất bản để so thứ tự.");
    const ranks = slugs.map((slug) => order.indexOf(slug));
    expect(ranks, `Thứ tự lĩnh vực trên ${where}`).toEqual(
      [...ranks].sort((a, b) => a - b),
    );
  }
});

test("menu and footer never link to a section that has nothing to show", async ({
  page,
}) => {
  // Liên kết tới mục trống chỉ dẫn khách tới dòng "Chưa có nội dung" — với một
  // công ty luật, đó là dấu hiệu website làm dở. Mục có bản ghi đầu tiên thì
  // liên kết tự hiện lại; ở đây chỉ kiểm chiều mục trống.
  for (const section of [
    "industries",
    "lawyers",
    "experience",
    "articles",
    "careers",
  ]) {
    await page.goto(`/vi/${section}`);
    const records = await page
      .locator(`main a[href^="/vi/${section}/"]`)
      .count();
    if (records) continue;
    const linked = await page
      .locator(`header a[href="/vi/${section}"], footer a[href="/vi/${section}"]`)
      .count();
    expect(linked, `Menu hoặc chân trang còn dẫn tới mục trống ${section}`).toBe(
      0,
    );
  }
});

test("the homepage numbers its practice areas without a stray zero", async ({
  page,
}) => {
  await page.goto("/vi");
  const numbers = await page
    .locator(".practice-list .practice-item .number")
    .allTextContents();
  test.skip(numbers.length === 0, "Trang chủ chưa liệt kê lĩnh vực nào.");
  // Cùng lỗi viết cứng tiền tố "0" đã từng có ở danh mục chuyên môn: với mười
  // hai lĩnh vực, mục thứ mười hiện thành "010".
  const width = Math.max(2, String(numbers.length).length);
  expect(numbers).toEqual(
    Array.from({ length: numbers.length }, (_, i) =>
      String(i + 1).padStart(width, "0"),
    ),
  );
});
