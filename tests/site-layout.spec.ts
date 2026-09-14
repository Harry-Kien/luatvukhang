import { test, expect, type APIRequestContext } from "@playwright/test";
import fs from "node:fs/promises";

async function adminToken(request: APIRequestContext) {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  return (await login.json()).token as string;
}

test("menu, hero and footer come from the site-layout global in every language", async ({
  page,
  request,
}) => {
  const token = await adminToken(request);
  const auth = { Authorization: "JWT " + token };
  const before = await (
    await request.get("/api/globals/site-layout?locale=vi&fallback-locale=none")
  ).json();
  try {
    const patch = await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: {
        header: {
          menu: [
            { label: "QA Về chúng tôi", href: "/about", visible: true },
            { label: "QA ẩn", href: "/careers", visible: false },
            { label: "Liên hệ", href: "/contact", visible: true },
          ],
        },
        footer: { motto: "QA khẩu hiệu kiểm thử" },
        home: { heroKicker: "QA dòng dẫn" },
      },
    });
    expect(patch.ok(), await patch.text()).toBeTruthy();
    await page.goto("/vi");
    await expect(
      page.locator(".desktop-nav a, .mobile-nav a, .desktop-nav").first(),
    ).toBeAttached();
    expect(await page.locator("header").innerHTML()).toContain("QA Về chúng tôi");
    expect(await page.locator("body").innerHTML()).not.toContain("QA ẩn");
    await expect(page.locator(".footer-motto")).toHaveText(
      "QA khẩu hiệu kiểm thử",
    );
    await expect(page.locator(".hero-kicker")).toContainText("QA dòng dẫn");

    // EN chưa sửa: rơi về bản mặc định tiếng Anh, không hiện chuỗi tiếng Việt.
    await page.goto("/en");
    await expect(page.locator(".footer-motto")).toHaveText(
      "Understand the matter. Decide with confidence.",
    );
    expect(await page.locator("header").innerHTML()).not.toContain(
      "QA Về chúng tôi",
    );

    const bad = await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: {
        header: {
          menu: [{ label: "x", href: "javascript:alert(1)", visible: true }],
        },
      },
    });
    expect(bad.ok()).toBeFalsy();
  } finally {
    await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: {
        header: { menu: before.header?.menu ?? [] },
        footer: { motto: before.footer?.motto ?? "" },
        home: { heroKicker: before.home?.heroKicker ?? "" },
      },
    });
  }
});
