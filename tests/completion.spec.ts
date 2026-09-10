import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
test("new pages, policies and responsive layout", async ({ page }) => {
  for (const locale of ["vi", "en"]) {
    for (const route of [
      "about",
      "contact",
      "services",
      "lawyers",
      "experience",
      "articles",
      "industries",
      "careers",
      "privacy",
      "terms",
    ]) {
      const response = await page.goto(`/${locale}/${route}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBeTruthy();
    }
  }
  await page.goto("/vi/privacy");
  await expect(
    page.getByText("Dự thảo — chưa có hiệu lực áp dụng"),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({
    path: `artifacts/policy-${test.info().project.name}.jpg`,
    fullPage: true,
    type: "jpeg",
    quality: 75,
  });
});
test("banner media upload, draft isolation and responsive focal points", async ({
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
  const token = (await login.json()).token,
    headers = { Authorization: "JWT " + token };
  const pages = await request.get(
    "/api/pages?where[slug][equals]=home&where[language][equals]=vi&draft=true",
    { headers },
  );
  const home = (await pages.json()).docs[0];
  expect(home).toBeTruthy();
  const upload = await request.post("/api/media", {
    headers,
    multipart: {
      _payload: JSON.stringify({
        alt: "Ảnh kiểm thử banner",
        credit: "Ảnh minh họa kiểm thử",
        rights: "Ảnh từ thư viện dự án, chỉ dùng kiểm thử",
      }),
      file: {
        name: "qa-banner.webp",
        mimeType: "image/webp",
        buffer: await fs.readFile("public/images/architecture.webp"),
      },
    },
  });
  expect(upload.ok()).toBeTruthy();
  const media = (await upload.json()).doc;
  try {
    const update = await request.patch(`/api/pages/${home.id}?draft=true`, {
      headers,
      data: {
        banner: {
          desktopImage: media.id,
          mobileImage: media.id,
          desktopX: 20,
          desktopY: 30,
          mobileX: 70,
          mobileY: 40,
          caption: "Banner kiểm thử",
          fit: "contain",
          shade: 10,
        },
        _status: "draft",
      },
    });
    expect(update.ok()).toBeTruthy();
    await page.goto("/vi");
    await expect(
      page.getByText("Banner kiểm thử", { exact: true }),
    ).toHaveCount(0);
    await page
      .context()
      .addCookies([
        { name: "payload-token", value: token, domain: "localhost", path: "/" },
      ]);
    await page.goto("/vi?preview=true");
    await expect(
      page.getByText("Banner kiểm thử", { exact: true }),
    ).toBeVisible();
    await expect(page.locator(".banner-image")).toHaveCSS(
      "object-position",
      test.info().project.name === "mobile" ? "70% 40%" : "20% 30%",
    );
    await expect(page.locator(".banner-image")).toHaveCSS(
      "object-fit",
      "contain",
    );
    await expect(page.locator(".photo-credit-tag")).toHaveCount(0);
    expect(
      await page
        .locator(".banner-image")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    ).toBeTruthy();
  } finally {
    await request.patch(`/api/pages/${home.id}?draft=true`, {
      headers,
      data: {
        banner: home.banner || {
          desktopImage: null,
          mobileImage: null,
          caption: null,
        },
        _status: "draft",
      },
    });
    await request.delete(`/api/media/${media.id}`, { headers });
  }
});
