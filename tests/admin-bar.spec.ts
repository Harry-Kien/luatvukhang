import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs/promises";

async function loginAsAdmin(page: Page) {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  await page.goto("/admin/login");
  await page.locator('input[name="email"]').fill("admin@local.invalid");
  await page
    .locator('input[name="password"]')
    .fill(credentials.match(/Password: (.+)/)![1].trim());
  await page.locator('button[type="submit"]').click();
  await expect(
    page.getByRole("heading", { name: "Tổng quan công việc" }),
  ).toBeVisible();
}

/**
 * Gửi biểu mẫu bật/tắt chế độ sửa từ trong trang để mang theo phiên đăng nhập
 * (cookie của Payload là Secure nên APIRequestContext không gửi được). Không
 * theo chuyển hướng: bản production bật upgrade-insecure-requests, trình duyệt
 * kiểm thử sẽ nâng http://localhost lên https và thất bại.
 */
function toggleEditMode(page: Page, on: boolean) {
  return page.evaluate(async (value) => {
    const response = await fetch("/api/edit-mode", {
      method: "POST",
      body: new URLSearchParams({ on: value }),
      redirect: "manual",
    });
    return { type: response.type };
  }, on ? "1" : "0");
}

test("edit mode cookie can only be toggled by a signed-in editor", async ({
  page,
  request,
}) => {
  const anon = await request.post("/api/edit-mode", {
    form: { on: "1" },
    maxRedirects: 0,
  });
  expect(anon.status()).toBe(403);

  await loginAsAdmin(page);
  await page.goto("/vi/about");
  const on = await toggleEditMode(page, true);
  expect(on.type).toBe("opaqueredirect");
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "vk-edit")?.value).toBe("1");

  const off = await toggleEditMode(page, false);
  expect(off.type).toBe("opaqueredirect");
  expect(
    (await page.context().cookies()).find((c) => c.name === "vk-edit"),
  ).toBeUndefined();
});

test("visitors never see the admin bar or editable markup", async ({
  page,
}) => {
  const response = await page.goto("/vi");
  const html = await response!.text();
  expect(html).not.toContain('class="admin-bar');
  expect(html).not.toContain('class="editable');
  expect(html).not.toContain("has-admin-bar");
});

test("a signed-in editor sees the admin bar with working controls", async ({
  page,
}) => {
  await loginAsAdmin(page);
  await page.goto("/vi/about");
  const bar = page.locator(".admin-bar");
  await expect(bar).toBeVisible();
  // Trên khung hẹp email được ẩn, chỉ còn tên; kiểm tra tên hiện và email có mặt.
  await expect(bar.locator(".admin-bar-user strong")).toBeVisible();
  await expect(bar.getByText("admin@local.invalid")).toBeAttached();
  await expect(
    bar.getByRole("link", { name: "Bảng điều khiển" }),
  ).toHaveAttribute("href", "/admin");
  await expect(
    bar.getByRole("link", { name: "Sửa trang này" }),
  ).toHaveAttribute(
    "href",
    "/admin/collections/pages?where[slug][equals]=about&where[language][equals]=vi",
  );
  await bar.getByRole("button", { name: "Bật chế độ sửa" }).click();
  await expect(
    page.locator(".admin-bar").getByRole("button", { name: "Tắt chế độ sửa" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/has-admin-bar/);
  await expect(bar.getByRole("link", { name: "Đăng xuất" })).toHaveAttribute(
    "href",
    "/admin/logout",
  );
  // Dọn: tắt chế độ sửa để các kiểm thử sau không bị ảnh hưởng.
  await toggleEditMode(page, false);
});

test("edit mode marks regions with links to the right CMS screen", async ({
  page,
}) => {
  await loginAsAdmin(page);
  await page.goto("/vi");
  await toggleEditMode(page, true);
  await page.goto("/vi");
  const regions = page.locator(".editable");
  expect(await regions.count()).toBeGreaterThanOrEqual(5);
  await expect(
    page
      .locator(".editable-link[href='/admin/globals/site-layout#tab-home']")
      .first(),
  ).toBeAttached();
  await expect(
    page.locator(".editable-link[href='/admin/globals/site-layout#tab-header']"),
  ).toHaveCount(1);
  await expect(
    page.locator(".editable-link[href='/admin/globals/site-layout#tab-footer']"),
  ).toHaveCount(1);

  await page.locator(".hero").hover();
  await page.screenshot({
    path: `artifacts/edit-mode-${test.info().project.name}.png`,
    fullPage: false,
  });

  await page.goto("/vi/about");
  const link = page.locator("main .editable-link").first();
  await expect(link).toHaveAttribute(
    "href",
    /^\/admin\/collections\/pages\/\d+\/preview$/,
  );

  await toggleEditMode(page, false);
  await page.goto("/vi");
  await expect(page.locator(".editable")).toHaveCount(0);
});
