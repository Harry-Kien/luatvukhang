import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage, fonts, language and accessibility", async ({ page }, info) => {
  await page.goto("/vi");
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Request glyphs in the specimen that may not appear in the page itself.
    const faces = await document.fonts.load('500 32px "Noto Serif Variable"', "Nguyễn Trương Đỗ Quyền Nghĩa Thủy Hưởng");
    if (!faces.length) throw new Error("Vietnamese font faces are missing");
  });
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "quyết định.",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  expect(
    await page.evaluate(() =>
      document.fonts.check(
        '500 32px "Noto Serif Variable"',
        "Nguyễn Trương Đỗ Quyền Nghĩa Thủy Hưởng",
      ),
    ),
  ).toBeTruthy();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({
    path: "artifacts/home-" + info.project.name + ".png",
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("Vietnamese search without accents and service context", async ({
  page,
}) => {
  await page.goto("/vi/search?q=dau%20tu");
  await expect(
    page.getByRole("heading", { name: "Đầu tư & doanh nghiệp" }),
  ).toBeVisible();
  await page.getByRole("heading", { name: "Đầu tư & doanh nghiệp" }).click();
  await page
    .locator("aside")
    .getByRole("link", { name: /Gửi yêu cầu tư vấn/ })
    .click();
  await expect(page.locator("#service")).toHaveValue("Đầu tư & doanh nghiệp");
});
test("form validation and failed submission preserve entries", async ({
  page,
}) => {
  await page.goto("/vi/consultation");
  await page.getByRole("button", { name: /Gửi yêu cầu tư vấn/ }).click();
  await expect(
    page.getByText("Vui lòng điền thông tin này.").first(),
  ).toBeVisible();
  await page.locator("#name").fill("Người kiểm thử");
  await page.locator("#email").fill("test@example.invalid");
  await page
    .locator("#message")
    .fill("Đây là yêu cầu kiểm thử, không phải khách hàng thật.");
  await page.getByRole("checkbox").check();
  await page.route("**/api/consultation", (r) =>
    r.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Chưa lưu được yêu cầu. Vui lòng thử lại.",
      }),
    }),
  );
  await page.getByRole("button", { name: /Gửi yêu cầu tư vấn/ }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Chưa lưu được",
  );
  await expect(page.locator("#name")).toHaveValue("Người kiểm thử");
});
test("typography and interior pages have no overflow", async ({
  page,
}, info) => {
  for (const route of [
    "typography",
    "services",
    "lawyers",
    "experience",
    "articles",
    "contact",
    "privacy",
    "services/dau-tu-doanh-nghiep",
  ]) {
    await page.goto("/vi/" + route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBeTruthy();
    if (["typography", "services/dau-tu-doanh-nghiep"].includes(route))
      await page.screenshot({
        path:
          "artifacts/" +
          route.replaceAll("/", "-") +
          "-" +
          info.project.name +
          ".png",
        fullPage: true,
        scale: "css",
      });
  }
});
test("server rejects invalid input and foreign origins", async ({
  request,
}) => {
  const invalid = await request.post("/api/consultation", {
    headers: { origin: "http://localhost:3000" },
    data: { name: "x" },
  });
  expect(invalid.status()).toBe(422);
  const foreign = await request.post("/api/consultation", {
    headers: { origin: "https://foreign.invalid" },
    data: {},
  });
  expect(foreign.status()).toBe(403);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
});
