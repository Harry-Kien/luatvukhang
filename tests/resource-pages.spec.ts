import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

test("resource pages support authenticated preview without exposing draft edits", async ({
  page,
  request,
}) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const credentials = { email: "admin@local.invalid", password };
  const login = await request.post("/api/users/login", { data: credentials });
  expect(login.ok()).toBeTruthy();
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const existing = await request.get(
    "/api/pages?where[slug][equals]=industries&where[language][equals]=vi&draft=true",
    { headers },
  );
  test.skip(
    (await existing.json()).totalDocs > 0,
    "Preserve existing company resource content; run against the clean CI database.",
  );
  const title = "QA resource " + randomUUID();
  const created = await request.post("/api/pages?draft=true", {
    headers,
    data: {
      slug: "industries",
      language: "vi",
      translationKey: title,
      title,
      summary: "Temporary resource content for publication isolation testing.",
      reviewState: "working",
      _status: "draft",
      blocks: [
        {
          blockType: "callout",
          heading: "QA resource heading",
          body: "QA resource body",
          visible: true,
        },
      ],
    },
  });
  expect(created.ok()).toBeTruthy();
  const id = (await created.json()).doc.id;
  try {
    await page.goto("/vi/industries?preview=true");
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toHaveCount(0);
    expect(
      (await page.request.post("/api/users/login", { data: credentials })).ok(),
    ).toBeTruthy();
    await page.goto("/vi/industries?preview=true");
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    expect(
      (
        await request.patch(`/api/pages/${id}`, {
          headers,
          data: { reviewState: "approved", _status: "published" },
        })
      ).ok(),
    ).toBeTruthy();
    await page.goto("/vi/industries");
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    expect(
      (
        await request.patch(`/api/pages/${id}?draft=true`, {
          headers,
          data: { title: title + " PRIVATE", _status: "draft" },
        })
      ).ok(),
    ).toBeTruthy();
    const publicResponse = await request.get("/vi/industries");
    expect(await publicResponse.text()).not.toContain(title + " PRIVATE");
  } finally {
    expect(
      (await request.delete(`/api/pages/${id}`, { headers })).ok(),
    ).toBeTruthy();
  }
});

test("resource guidance can be found through site search and links to the real page", async ({
  page,
}) => {
  await page.goto(
    "/vi/search?q=" + encodeURIComponent("danh mục tài liệu") + "&kind=pages",
  );
  const result = page.locator('main a.service-row[href="/vi/articles"]');
  await expect(result).toBeVisible();
  await result.click();
  await expect(page).toHaveURL(/\/vi\/articles$/);
  await expect(page.locator("main")).toContainText("Lập danh mục tài liệu");
});
