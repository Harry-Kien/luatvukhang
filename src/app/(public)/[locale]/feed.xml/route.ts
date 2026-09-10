import { getRecords } from "@/lib/cms";
import { launched, locales, t, type Locale } from "@/lib/content";
import { absolute } from "@/lib/seo";

/** Thoát ký tự đặc biệt của XML; nội dung do biên tập viên nhập không được phá cấu trúc tệp. */
const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  // Danh sách ngôn ngữ lấy từ cấu hình chung, để thêm ngôn ngữ mới là feed
  // tự có theo, không phải sửa ở đây.
  if (!launched || !(locales as readonly string[]).includes(raw))
    return new Response("Not found", { status: 404 });
  const locale = raw as Locale;

  const articles = (await getRecords("articles", locale))
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 50);

  const title = t(
    locale,
    "Góc nhìn pháp lý — Công ty Luật TNHH Vũ Khang",
    "Legal insights — Vũ Khang",
  );
  const description = t(
    locale,
    "Bài viết về quy định mới, thực tiễn áp dụng và những vấn đề doanh nghiệp thường gặp.",
    "Articles on new regulations, practical application and the issues businesses encounter.",
  );
  const items = articles
    .map((article) => {
      const link = absolute(`/${locale}/articles/${article.slug}`);
      const published = article.createdAt
        ? new Date(article.createdAt).toUTCString()
        : undefined;
      return [
        "    <item>",
        `      <title>${escape(article.title)}</title>`,
        `      <link>${escape(link)}</link>`,
        `      <guid isPermaLink="true">${escape(link)}</guid>`,
        article.summary
          ? `      <description>${escape(article.summary)}</description>`
          : "",
        published ? `      <pubDate>${published}</pubDate>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(title)}</title>
    <link>${escape(absolute(`/${locale}/articles`))}</link>
    <description>${escape(description)}</description>
    <language>${locale}</language>
    <atom:link href="${escape(absolute(`/${locale}/feed.xml`))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
