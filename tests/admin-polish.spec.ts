import { test, expect, type APIRequestContext } from "@playwright/test";
import fs from "node:fs/promises";

async function adminToken(request: APIRequestContext, credentials: string) {
  const login = await request.post("/api/users/login", {
    data: {
      email: "admin@local.invalid",
      password: credentials.match(/Password: (.+)/)![1].trim(),
    },
  });
  return (await login.json()).token as string;
}

/**
 * Mã của mọi bản ghi Bài viết, kể cả bản nháp.
 *
 * Bắt buộc gửi kèm xác thực: truy vấn ẩn danh chỉ thấy bài đã xuất bản, nên
 * bản nháp rỗng vừa sinh ra sẽ không nằm trong kết quả và không bị dọn.
 */
async function articleIds(
  request: APIRequestContext,
  headers: Record<string, string>,
) {
  const response = await request.get(
    "/api/articles?draft=true&limit=300&depth=0",
    { headers },
  );
  const docs = ((await response.json()).docs ?? []) as { id: number }[];
  return new Set(docs.map((doc) => doc.id));
}

test("dashboard shortcuts, collapsed advanced group and preview button", async ({
  page,
  request,
}) => {
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
  for (const name of [
    "Viết bài mới",
    "Sửa trang chủ",
    "Thêm luật sư",
    "Sửa giao diện website",
    "Mở website",
  ])
    await expect(page.getByRole("link", { name })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Sửa giao diện website" }),
  ).toHaveAttribute("href", "/admin/globals/site-layout");

  // Mở màn hình soạn thảo là Payload tự lưu ngay một bản nháp rỗng. Dọn lại,
  // nếu không mỗi lần chạy bộ kiểm thử lại để thêm một dòng trống trong /admin.
  const auth = {
    Authorization: "JWT " + (await adminToken(request, credentials)),
  };
  const before = await articleIds(request, auth);
  await page.goto("/admin/collections/articles/create");
  const advanced = page.locator(".collapsible", { hasText: "Nâng cao" });
  await expect(advanced.first()).toBeVisible();
  await expect(page.locator('input[name="translationKey"]')).toBeHidden();
  await expect(page.locator('input[name="title"]')).toBeVisible();

  for (const id of await articleIds(request, auth))
    if (!before.has(id))
      await request.delete("/api/articles/" + id, { headers: auth });
});

test("a new record gets its translation key from the slug automatically", async ({
  request,
}) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  const auth = { Authorization: "JWT " + (await login.json()).token };
  const slug = "qa-auto-key-" + Date.now();
  const created = await request.post("/api/articles?draft=true", {
    headers: auth,
    data: {
      title: "QA",
      slug,
      language: "vi",
      summary: "QA",
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const doc = (await created.json()).doc;
  try {
    expect(doc.translationKey).toBe(slug);
  } finally {
    await request.delete("/api/articles/" + doc.id, { headers: auth });
  }
});
