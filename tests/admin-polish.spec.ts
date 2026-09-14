import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

test("dashboard shortcuts, collapsed advanced group and preview button", async ({
  page,
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

  await page.goto("/admin/collections/articles/create");
  const advanced = page.locator(".collapsible", { hasText: "Nâng cao" });
  await expect(advanced.first()).toBeVisible();
  await expect(page.locator('input[name="translationKey"]')).toBeHidden();
  await expect(page.locator('input[name="title"]')).toBeVisible();
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
    data: { title: "QA", slug, language: "vi", summary: "QA", _status: "draft" },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const doc = (await created.json()).doc;
  try {
    expect(doc.translationKey).toBe(slug);
  } finally {
    await request.delete("/api/articles/" + doc.id, { headers: auth });
  }
});
