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
    page.getByRole("heading", { name: "Đội ngũ luật sư", exact: true }),
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
