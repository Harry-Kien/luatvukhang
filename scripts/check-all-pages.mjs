/**
 * Quét TOÀN BỘ đường dẫn công khai, không chỉ bảy mục như check-page-content.
 *
 * check-page-content.mjs đối chiếu bảy trang mục × ba ngôn ngữ × hai bề ngang.
 * Đủ để bắt lỗi bố cục chung, nhưng nó không bao giờ mở một trang chi tiết nào:
 * ba mươi sáu trang lĩnh vực, mười tám bài viết, chín hồ sơ luật sư, mười tám
 * trang ngành và các trang Hướng dẫn, Gửi yêu cầu, Chính sách đều nằm ngoài.
 * Đó lại chính là chỗ nội dung do công ty nhập vào, nên cũng là chỗ dễ có một
 * tiêu đề thiếu, một ảnh hỏng hay một đoạn tràn ngang trên điện thoại.
 *
 * Script này tự đi theo mọi liên kết nội bộ từ ba trang gốc ngôn ngữ, nên thêm
 * một lĩnh vực hay một bài viết mới là nó tự quét luôn, không phải sửa danh
 * sách ở đây.
 *
 *   npm run check:all-pages            # mã trạng thái, h1, tràn ngang, ảnh
 *   npm run check:all-pages -- --a11y  # thêm axe WCAG 2.1 AA trên từng trang
 *
 * Máy chủ phải đang chạy. Đặt CHECK_URL khi dùng cổng khác.
 */
import { chromium } from "@playwright/test";

const BASE = process.env.CHECK_URL || "http://127.0.0.1:3000";
const WITH_AXE = process.argv.includes("--a11y");
const AxeBuilder = WITH_AXE
  ? (await import("@axe-core/playwright")).default
  : null;

/**
 * Trang kết quả tìm kiếm và trang mẫu chữ đều để noindex và không có thẻ mô
 * tả — đó là chủ ý, nên không tính là thiếu sót.
 */
const KHONG_CAN_MO_TA = new Set(["search", "typography"]);

const browser = await chromium.launch();
const findings = [];
let daQuet = 0;

for (const width of [390, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
  });
  const page = await context.newPage();

  const seen = new Set();
  const queue = ["/vi", "/en", "/zh"];

  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);

    const consoleErrors = [];
    const badResponses = [];
    const onConsole = (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200));
    };
    // Chỉ tính phản hồi 4xx/5xx thật. Next.js tự huỷ các lượt tải trước khi
    // điều hướng, nên "requestfailed" đầy những lượt huỷ bình thường.
    const onResponse = (r) => {
      if (r.status() >= 400)
        badResponses.push(r.status() + " " + r.url().replace(BASE, ""));
    };
    page.on("console", onConsole);
    page.on("response", onResponse);

    try {
      const response = await page.goto(BASE + path, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
      const status = response ? response.status() : 0;
      const h1 = await page.locator("h1").count();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      const brokenImages = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.currentSrc || i.src),
      );
      const description = await page
        .locator('meta[name="description"]')
        .first()
        .getAttribute("content")
        .catch(() => null);
      const canMoTa = !KHONG_CAN_MO_TA.has(path.split("/")[2] || "");

      const violations =
        AxeBuilder && status === 200
          ? (
              await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
                .analyze()
            ).violations.map((v) => v.id)
          : [];

      if (
        status !== 200 ||
        h1 !== 1 ||
        overflow ||
        consoleErrors.length ||
        badResponses.length ||
        brokenImages.length ||
        violations.length ||
        (canMoTa && !description)
      )
        findings.push({
          path,
          width,
          status,
          h1,
          overflow,
          consoleErrors,
          badResponses,
          brokenImages,
          violations,
          missingDescription: canMoTa && !description,
        });

      daQuet += 1;

      for (const href of await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]")).map((a) => a.href),
      )) {
        if (!href.startsWith(BASE)) continue;
        const next = href.slice(BASE.length).split("#")[0].split("?")[0];
        if (!next || seen.has(next) || queue.includes(next)) continue;
        // Bảng quản trị và API không phải trang công khai; tệp tĩnh không có
        // gì để đối chiếu ở đây.
        if (next.startsWith("/admin") || next.startsWith("/api")) continue;
        if (/\.[a-z0-9]{2,5}$/i.test(next)) continue;
        queue.push(next);
      }
    } catch (error) {
      findings.push({
        path,
        width,
        error: String(error.message).slice(0, 200),
      });
    } finally {
      page.off("console", onConsole);
      page.off("response", onResponse);
    }
  }

  await context.close();
}

await browser.close();

console.log(
  JSON.stringify(
    { luot_quet: daQuet, tiep_can: WITH_AXE, findings },
    null,
    2,
  ),
);
if (findings.length) process.exit(1);
