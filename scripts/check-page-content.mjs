import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch();
const findings = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
    });
    const page = await context.newPage();
    for (const locale of ["vi", "en", "zh"])
      for (const section of [
        "about",
        "contact",
        "lawyers",
        "experience",
        "industries",
        "articles",
        "careers",
      ]) {
        const path = `/${locale}/${section}`;
        const response = await page.goto(
          (process.env.CONTENT_CHECK_URL || "http://127.0.0.1:3000") + path,
          { waitUntil: "domcontentloaded", timeout: 60000 },
        );
        const count = await page.locator("h1").count();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        if (
          response.status() !== 200 ||
          count !== 1 ||
          overflow ||
          result.violations.length
        )
          findings.push({
            path,
            width,
            status: response.status(),
            count,
            overflow,
            violations: result.violations.map((v) => v.id),
          });
        if (
          section === "contact" &&
          (await page
            .locator('main a[href="/' + locale + '/consultation"]')
            .count()) === 0
        )
          findings.push({ path, width, error: "missing contact action" });
        if (locale === "vi" && ["industries", "contact"].includes(section))
          await page.screenshot({
            path: `artifacts/content-${section}-${width}.png`,
            fullPage: true,
          });
      }
    await context.close();
  }
  console.log(JSON.stringify({ pages: 42, findings }, null, 2));
  if (findings.length) process.exitCode = 1;
} finally {
  await browser.close();
}
