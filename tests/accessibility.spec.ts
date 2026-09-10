import { test, expect, type Page } from "@playwright/test";

/**
 * Những phần WCAG mà quét tự động bằng axe không phủ được: hành trình bằng bàn
 * phím, phóng to 200%, thứ tự tiêu đề và cấu trúc landmark mà trình đọc màn
 * hình dựa vào để điều hướng.
 */

const PAGES = [
  "/vi",
  "/vi/services",
  "/vi/lawyers",
  "/vi/guide",
  "/vi/consultation",
  "/vi/contact",
  "/en",
  "/en/services",
  "/zh",
  "/zh/services",
];
/** Mã ngôn ngữ hợp lệ cho thuộc tính lang của thẻ html. */
const LANGS = ["vi", "en", "zh-Hans"];

/** Bấm Tab tối đa `limit` lần cho tới khi phần tử mong muốn nhận tiêu điểm. */
async function tabUntil(page: Page, selector: string, limit = 60) {
  for (let step = 0; step < limit; step += 1) {
    const focused = await page.evaluate(
      (sel) => document.activeElement?.matches(sel) ?? false,
      selector,
    );
    if (focused) return step;
    await page.keyboard.press("Tab");
  }
  return -1;
}

test("skip link is the first stop and moves focus to the main content", async ({
  page,
}) => {
  await page.goto("/vi");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    cls: document.activeElement?.className,
    text: document.activeElement?.textContent?.trim(),
  }));
  expect(first.cls, "liên kết bỏ qua phải là điểm dừng Tab đầu tiên").toContain(
    "skip",
  );
  expect(first.text).toBe("Đến nội dung chính");

  // Phải nhìn thấy được khi có tiêu điểm, nếu không người dùng bàn phím không biết mình đang ở đâu.
  const box = await page.locator("a.skip").boundingBox();
  expect(box, "liên kết bỏ qua phải hiện ra khi nhận tiêu điểm").not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  expect(await page.locator("#main").count()).toBe(1);
});

test("the enquiry journey can be completed with the keyboard alone", async ({
  page,
}) => {
  await page.goto("/vi/consultation");

  // Tới được từng ô nhập bằng Tab và nhập được bằng bàn phím.
  expect(await tabUntil(page, "#name"), "không tới được ô Họ tên").toBeGreaterThanOrEqual(0);
  await page.keyboard.type("Người kiểm thử bàn phím");

  expect(await tabUntil(page, "#email"), "không tới được ô Email").toBeGreaterThanOrEqual(0);
  await page.keyboard.type("keyboard@example.invalid");

  expect(await tabUntil(page, "#message"), "không tới được ô Nội dung").toBeGreaterThanOrEqual(0);
  await page.keyboard.type(
    "Đây là yêu cầu kiểm thử bằng bàn phím, không phải khách hàng thật.",
  );

  // Ô đồng ý phải bật/tắt được bằng phím cách.
  const toCheckbox = await tabUntil(page, 'input[type="checkbox"]');
  expect(toCheckbox, "không tới được ô đồng ý").toBeGreaterThanOrEqual(0);
  await page.keyboard.press("Space");
  expect(
    await page.evaluate(
      () => (document.activeElement as HTMLInputElement)?.checked,
    ),
    "phím cách phải bật được ô đồng ý",
  ).toBe(true);

  // Và tới được nút gửi.
  expect(
    await tabUntil(page, 'button[type="submit"], form button'),
    "không tới được nút gửi",
  ).toBeGreaterThanOrEqual(0);

  // Giá trị vừa gõ vẫn còn nguyên.
  await expect(page.locator("#name")).toHaveValue("Người kiểm thử bàn phím");
});

test("navigation stays operable at 200 percent zoom", async ({ page }) => {
  // Phóng to 200% tương đương khung nhìn CSS còn một nửa.
  await page.setViewportSize({ width: 720, height: 500 });
  for (const path of PAGES) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      `${path} bị tràn ngang khi phóng to 200%`,
    ).toBeTruthy();

    // Vẫn phải có đường vào phần điều hướng: hoặc liên kết hiện, hoặc nút mở menu.
    const reachable = await page.evaluate(() => {
      const visible = (el: Element) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      };
      // Header chứa nhiều nút, trong đó có nút ẩn; chỉ cần một lối vào còn hiện.
      return [
        ...document.querySelectorAll("header nav a, header button"),
      ].some(visible);
    });
    expect(reachable, `${path} không còn lối vào điều hướng ở 200%`).toBeTruthy();
  }
});

test("landmarks and heading order match what a screen reader expects", async ({
  page,
}) => {
  for (const path of PAGES) {
    await page.goto(path);
    const structure = await page.evaluate(() => {
      const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
        .filter((h) => (h as HTMLElement).offsetParent !== null)
        .map((h) => Number(h.tagName[1]));
      return {
        banner: document.querySelectorAll("header").length,
        main: document.querySelectorAll("main").length,
        contentinfo: document.querySelectorAll("footer").length,
        namedNavs: [...document.querySelectorAll("nav")].filter((n) =>
          n.getAttribute("aria-label"),
        ).length,
        navs: document.querySelectorAll("nav").length,
        levels,
        lang: document.documentElement.lang,
      };
    });

    expect(structure.banner, `${path} phải có đúng một header`).toBe(1);
    expect(structure.main, `${path} phải có đúng một main`).toBe(1);
    expect(structure.contentinfo, `${path} phải có đúng một footer`).toBe(1);
    // Nhiều vùng điều hướng thì mỗi vùng phải có tên riêng để phân biệt.
    expect(structure.namedNavs, `${path}: mọi nav phải có aria-label`).toBe(
      structure.navs,
    );
    expect(LANGS, `${path} có lang không hợp lệ`).toContain(structure.lang);

    expect(structure.levels[0], `${path} phải bắt đầu bằng h1`).toBe(1);
    expect(
      structure.levels.filter((l) => l === 1).length,
      `${path} chỉ được có một h1`,
    ).toBe(1);
    for (let i = 1; i < structure.levels.length; i += 1)
      expect(
        structure.levels[i] - structure.levels[i - 1],
        `${path} nhảy cấp tiêu đề tại vị trí ${i}: ${structure.levels.join(",")}`,
      ).toBeLessThanOrEqual(1);
  }
});

test("every form control exposes an accessible name", async ({ page }) => {
  for (const path of ["/vi/consultation", "/vi/lawyers", "/vi/search"]) {
    await page.goto(path);
    const unnamed = await page.evaluate(() =>
      [...document.querySelectorAll("input, select, textarea")]
        .filter((el) => {
          const node = el as HTMLInputElement;
          if (node.type === "hidden") return false;
          if (node.closest("[aria-hidden='true']")) return false;
          const labelled =
            node.labels?.length ||
            node.getAttribute("aria-label") ||
            node.getAttribute("aria-labelledby");
          return !labelled;
        })
        .map((el) => el.outerHTML.slice(0, 90)),
    );
    expect(unnamed, `${path} có ô nhập thiếu nhãn`).toEqual([]);
  }
});

test("printed pages drop the navigation and keep the whole answer", async ({
  page,
}) => {
  await page.goto("/vi/guide");
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  const printed = await page.evaluate(() => {
    const hidden = (selector: string) => {
      const el = document.querySelector(selector);
      return !el || getComputedStyle(el).display === "none";
    };
    const answer = document.querySelector(".faq-list details p");
    const heading = document.querySelector(".page-heading");
    return {
      headerHidden: hidden("header"),
      footerHidden: hidden("footer"),
      // Nền navy in ra là một mảng mực đen.
      headingBackground: heading
        ? getComputedStyle(heading).backgroundColor
        : "",
      // Phần hỏi đáp thu gọn vẫn phải in ra đầy đủ câu trả lời.
      answerHeight: answer ? Math.round(answer.getBoundingClientRect().height) : 0,
    };
  });
  expect(printed.headerHidden, "bản in không được có thanh điều hướng").toBe(true);
  expect(printed.footerHidden, "bản in không được có chân trang").toBe(true);
  expect(printed.headingBackground, "tiêu đề trang phải nền trắng khi in").toBe(
    "rgb(255, 255, 255)",
  );
  expect(printed.answerHeight, "câu trả lời phải hiện trên bản in").toBeGreaterThan(0);
});
