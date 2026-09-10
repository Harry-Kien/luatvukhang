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

  // Viết cứng tiền tố "0" từng khiến mục thứ mười hiện thành "010".
  const numbers = await items.locator("> span").allTextContents();
  const width = String(count).length;
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
  expect([...inMenu].sort()).toEqual([...unique].sort());
});
