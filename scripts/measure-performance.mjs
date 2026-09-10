/**
 * Đo hiệu năng tải trang trên máy cục bộ.
 *
 * Đây KHÔNG phải số liệu thực địa. Chrome ở đây chạy trên máy mạnh, mạng nội
 * bộ, không có người dùng thật; con số chỉ dùng để phát hiện hồi quy giữa các
 * lần thay đổi. Số liệu ra quyết định phải lấy từ báo cáo trải nghiệm người
 * dùng thật sau khi website có tên miền và lưu lượng.
 *
 * Chạy server production trước, rồi:
 *   node scripts/measure-performance.mjs [baseURL]
 */
import { chromium } from "@playwright/test";

const base = process.argv[2] || "http://127.0.0.1:3000";
const routes = [
  "/vi",
  "/vi/services",
  "/vi/lawyers",
  "/vi/articles",
  "/vi/guide",
  "/vi/consultation",
];

/** Thu LCP và CLS bằng PerformanceObserver, giống cách trình duyệt thật báo cáo. */
const collect = () =>
  new Promise((resolve) => {
    let lcp = 0;
    let cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
    setTimeout(() => {
      const nav = performance.getEntriesByType("navigation")[0] || {};
      const paint = performance
        .getEntriesByType("paint")
        .find((p) => p.name === "first-contentful-paint");
      resolve({
        ttfb: Math.round(nav.responseStart || 0),
        fcp: Math.round(paint?.startTime || 0),
        lcp: Math.round(lcp),
        cls: Number(cls.toFixed(4)),
        transferred: performance
          .getEntriesByType("resource")
          .reduce((sum, r) => sum + (r.transferSize || 0), 0),
        requests: performance.getEntriesByType("resource").length,
        domNodes: document.getElementsByTagName("*").length,
      });
    }, 2500);
  });

const browser = await chromium.launch();
const rows = [];
for (const preset of [
  { name: "may tinh", viewport: { width: 1440, height: 1000 } },
  { name: "dien thoai", viewport: { width: 390, height: 844 } },
]) {
  const context = await browser.newContext({ viewport: preset.viewport });
  for (const route of routes) {
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(collect);
    rows.push({ thiet_bi: preset.name, duong_dan: route, ...metrics });
    await page.close();
  }
  await context.close();
}
await browser.close();

console.table(
  rows.map((r) => ({
    ...r,
    kb: Math.round(r.transferred / 1024),
    transferred: undefined,
  })),
);
const worstLcp = Math.max(...rows.map((r) => r.lcp));
const worstCls = Math.max(...rows.map((r) => r.cls));
console.log(`\nLCP xau nhat: ${worstLcp}ms (nguong tot: 2500ms)`);
console.log(`CLS xau nhat: ${worstCls} (nguong tot: 0.1)`);
