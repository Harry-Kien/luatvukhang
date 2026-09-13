import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import AxeBuilder from "@axe-core/playwright";

const ORIGIN = "http://localhost:3000";
/** Ba ngôn ngữ công bố và mã hreflang tương ứng. */
const LOCALES = ["vi", "en", "zh"] as const;
const HREFLANG: Record<string, string> = { vi: "vi", en: "en", zh: "zh-Hans" };
/** Các trang công khai luôn tồn tại, không phụ thuộc nội dung trong CMS. */
const ROUTES = [
  "",
  "/about",
  "/services",
  "/lawyers",
  "/experience",
  "/articles",
  "/contact",
  "/guide",
  "/consultation",
  "/privacy",
  "/terms",
];

const structuredData = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (match) => JSON.parse(match[1]) as Record<string, any>,
  );

const attr = (html: string, pattern: RegExp) => html.match(pattern)?.[1];

const canonicalOf = (html: string) =>
  attr(html, /<link rel="canonical" href="([^"]+)"/i);

const hreflangs = (html: string) =>
  Object.fromEntries(
    [
      ...html.matchAll(
        /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi,
      ),
    ].map((m) => [m[1], m[2]]),
  );

test("every public page carries canonical, hreflang, description and breadcrumbs", async ({
  request,
}) => {
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const path = `/${locale}${route}`;
      const response = await request.get(path);
      expect(response.status(), `${path} phải trả về 200`).toBe(200);
      const html = await response.text();

      // Canonical phải tự trỏ về chính trang, không có dấu "/" ở cuối.
      expect(canonicalOf(html), `canonical của ${path}`).toBe(ORIGIN + path);

      // hreflang chỉ hợp lệ khi có cả hai ngôn ngữ và một x-default.
      const alternates = hreflangs(html);
      for (const [locale2, code] of Object.entries(HREFLANG))
        expect(alternates[code], `hreflang ${code} của ${path}`).toBe(
          `${ORIGIN}/${locale2}${route}`,
        );
      expect(alternates["x-default"], `x-default của ${path}`).toBe(
        `${ORIGIN}/vi${route}`,
      );

      const description = attr(
        html,
        /<meta name="description" content="([^"]*)"/i,
      );
      // Chữ Hán cô đọng hơn nhiều, một mô tả tốt tiếng Trung ngắn hơn hẳn bản
      // Latin nên ngưỡng độ dài phải khác nhau theo hệ chữ viết.
      const minimum = locale === "zh" ? 15 : 50;
      expect(description?.length, `mô tả của ${path}`).toBeGreaterThan(minimum);
      // Google cắt đoạn mô tả quanh mốc 160 ký tự; dài hơn là mất phần cuối.
      expect(
        description?.length,
        `mô tả của ${path} dài quá, sẽ bị cắt`,
      ).toBeLessThanOrEqual(160);

      // Đúng một h1 trên mỗi trang.
      expect(
        (html.match(/<h1[\s>]/g) || []).length,
        `số thẻ h1 của ${path}`,
      ).toBe(1);

      expect(
        attr(html, /<meta property="og:title" content="([^"]+)"/i),
        `og:title của ${path}`,
      ).toBeTruthy();
      expect(
        attr(html, /<meta property="og:image" content="([^"]+)"/i),
        `og:image của ${path}`,
      ).toBeTruthy();

      const types = structuredData(html).map((entry) => entry["@type"]);
      expect(JSON.stringify(types), `schema của ${path}`).toContain(
        "LegalService",
      );
      expect(types, `WebSite schema của ${path}`).toContainEqual("WebSite");
      if (route)
        expect(types, `BreadcrumbList của ${path}`).toContainEqual(
          "BreadcrumbList",
        );
    }
  }
});

test("the insights listing advertises its RSS feed", async ({ request }) => {
  for (const locale of LOCALES) {
    const html = await (await request.get(`/${locale}/articles`)).text();
    expect(
      html,
      `liên kết RSS trên /${locale}/articles`,
    ).toContain(`href="${ORIGIN}/${locale}/feed.xml"`);
    expect(html).toContain('type="application/rss+xml"');
  }
});

test("search and specimen pages stay out of the index", async ({ request }) => {
  for (const path of ["/vi/search?q=abc", "/vi/typography"]) {
    const html = await (await request.get(path)).text();
    const robots = attr(html, /<meta name="robots" content="([^"]+)"/i);
    expect(robots, `thẻ robots của ${path}`).toContain("noindex");
  }
});

test("robots, sitemap, manifest and feed respond correctly", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("User-Agent: *");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain("<urlset");
  // Lỗi từng gặp: sitemap sinh "/vi/" trong khi canonical là "/vi".
  expect(xml, "sitemap không được có URL kết thúc bằng dấu gạch chéo").not.toMatch(
    /<loc>[^<]*\/<\/loc>/,
  );

  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBeTruthy();
  expect((await manifest.json()).start_url).toBe("/vi");

  // Bộ nhận diện sinh từ design/logo.jpg (scripts/generate-brand-assets.mjs).
  // /favicon.ico bắt buộc: Safari không đọc favicon SVG, Google/Zalo gọi thẳng.
  for (const asset of [
    "/favicon.ico",
    "/icon.png",
    "/apple-icon.png",
    "/opengraph-image.png",
    "/brand/logo-192.png",
    "/brand/logo-512.png",
    "/brand/logo-maskable-512.png",
  ])
    expect((await request.get(asset)).ok(), `${asset} phải tải được`).toBeTruthy();
  const icons = (await manifest.json()).icons as { sizes: string; purpose?: string }[];
  expect(icons.map((i) => i.sizes)).toEqual(
    expect.arrayContaining(["192x192", "512x512"]),
  );
  expect(icons.some((i) => i.purpose === "maskable")).toBeTruthy();

  // Feed chỉ mở sau khi duyệt ra mắt; trước đó phải là 404.
  const feed = await request.get("/vi/feed.xml");
  expect([200, 404]).toContain(feed.status());
  if (feed.status() === 200)
    expect(feed.headers()["content-type"]).toContain("application/rss+xml");
});

test("published records emit the right schema.org type", async ({ request }) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  expect(login.ok()).toBeTruthy();
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const created: { collection: string; id: number }[] = [];

  const publish = async (
    collection: string,
    extra: Record<string, unknown>,
  ) => {
    const key = "qa-" + randomUUID();
    const response = await request.post(`/api/${collection}`, {
      headers,
      data: {
        slug: key,
        translationKey: key,
        language: "vi",
        summary: "Dữ liệu kiểm thử tự động, sẽ được xóa ngay sau bài kiểm thử.",
        reviewState: "approved",
        _status: "published",
        isSample: false,
        ...extra,
      },
    });
    expect(response.ok(), `tạo ${collection}: ${await response.text()}`).toBeTruthy();
    const doc = (await response.json()).doc;
    created.push({ collection, id: doc.id });
    return doc.slug as string;
  };

  try {
    const service = await publish("services", {
      title: "QA Chuyên môn kiểm thử",
      scope: [{ item: "Hạng mục kiểm thử" }],
    });
    const lawyer = await publish("lawyers", {
      title: "QA Luật sư kiểm thử",
      position: "Luật sư kiểm thử",
      qualifications: "Thông tin kiểm thử",
    });
    const article = await publish("articles", {
      title: "QA Bài viết kiểm thử",
      sources: [{ label: "Nguồn kiểm thử", url: "https://example.invalid" }],
    });

    const cases: [string, string, (entry: any) => void][] = [
      [
        `/vi/services/${service}`,
        "Service",
        (entry) => {
          expect(entry.provider["@id"]).toContain("#organization");
          expect(entry.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe(
            "Hạng mục kiểm thử",
          );
        },
      ],
      [
        `/vi/lawyers/${lawyer}`,
        "Person",
        (entry) => {
          expect(entry.jobTitle).toBe("Luật sư kiểm thử");
          expect(entry.hasCredential).toBe("Thông tin kiểm thử");
          expect(entry.worksFor["@id"]).toContain("#organization");
        },
      ],
      [
        `/vi/articles/${article}`,
        "Article",
        (entry) => {
          expect(entry.headline).toBe("QA Bài viết kiểm thử");
          expect(entry.datePublished).toBeTruthy();
          expect(entry.citation[0].url).toBe("https://example.invalid");
          expect(entry.publisher["@id"]).toContain("#organization");
        },
      ],
    ];

    for (const [path, type, assertions] of cases) {
      const response = await request.get(path);
      expect(response.status(), `${path} phải trả về 200`).toBe(200);
      const html = await response.text();
      const entry = structuredData(html).find((item) => item["@type"] === type);
      expect(entry, `${path} phải phát schema ${type}`).toBeTruthy();
      assertions(entry);
      // Trang chi tiết phải có breadcrumb ba cấp.
      const crumbs = structuredData(html).find(
        (item) => item["@type"] === "BreadcrumbList",
      );
      expect(crumbs?.itemListElement).toHaveLength(3);
      expect(canonicalOf(html)).toBe(ORIGIN + path);
    }
  } finally {
    for (const item of created.reverse())
      await request.delete(`/api/${item.collection}/${item.id}`, { headers });
  }
});

test("public pages have no automatic accessibility violations", async ({
  page,
}) => {
  for (const path of [
    "/vi",
    "/vi/services",
    "/vi/lawyers",
    "/vi/contact",
    "/vi/consultation",
    "/en",
    "/zh",
    "/zh/services",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations, `lỗi tiếp cận trên ${path}`).toEqual([]);
  }
});

test("the not-found page returns 404 and helps the visitor continue", async ({
  page,
}) => {
  // Phải dùng trình duyệt chứ không phải request thuần: ở chế độ phát triển
  // Next trả khung lỗi và dựng giao diện 404 phía client.
  const expected: Record<string, string> = {
    vi: "Không tìm thấy trang",
    en: "Page not found",
    zh: "未找到页面",
  };
  for (const locale of LOCALES) {
    const response = await page.goto(`/${locale}/duong-dan-khong-ton-tai`);
    expect(response?.status(), `mã trạng thái của /${locale}`).toBe(404);
    await expect(page.locator("h1")).toHaveText(expected[locale]);
    // Chỉ báo lỗi là chưa đủ: phải có lối đi tiếp.
    expect(
      await page.locator(".not-found-links a").count(),
      `liên kết gợi ý trên trang 404 /${locale}`,
    ).toBeGreaterThanOrEqual(4);
    await expect(page.locator(".not-found-search input")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  }
  // Ô tìm kiếm phải dẫn tới đúng trang kết quả.
  await page.goto("/vi/duong-dan-khong-ton-tai");
  await page.locator(".not-found-search input").fill("hợp đồng");
  await page.locator(".not-found-search button").click();
  await expect(page).toHaveURL(/\/vi\/search\?q=/);
});
