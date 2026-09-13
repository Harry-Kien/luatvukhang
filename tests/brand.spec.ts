import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Vũ Khang navigation, mobile menu and image loading", async ({
  page,
}, info) => {
  await page.goto("/vi");
  await expect(page.locator(".brand-wordmark strong").first()).toHaveText(
    "VŨ KHANG",
  );
  await expect(page).toHaveTitle(/Vũ Khang/);
  expect(
    await page
      .locator(".brand-logo")
      .first()
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBeTruthy();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator(".hero-photo img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBeTruthy();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Mở menu", exact: true }).click();
    const menu = page.getByRole("navigation", { name: "Menu di động" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: /Chuyên môn/ }).click();
    await expect(page).toHaveURL(/\/vi\/services$/);
    await expect(menu).not.toBeVisible();
  } else {
    const trigger = page.getByRole("button", {
      name: "Chuyên môn",
      exact: true,
    });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const results = await new AxeBuilder({ page })
      .include("#expertise-menu")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: "artifacts/vukhang-mega-menu.jpg",
      type: "jpeg",
      quality: 80,
    });
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await page
      .locator("#expertise-menu")
      .getByRole("link", { name: /Đầu tư/ })
      .click();
    await expect(page).toHaveURL(/dau-tu-doanh-nghiep$/);
  }
  await page.goto("/vi/consultation");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({
    path: "artifacts/vukhang-contact-" + info.project.name + ".jpg",
    fullPage: true,
    type: "jpeg",
    quality: 75,
    scale: "css",
  });
});
