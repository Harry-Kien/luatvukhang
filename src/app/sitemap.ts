import type { MetadataRoute } from "next";
import { launched, navigationFrom } from "@/lib/content";
import { getSiteLayout } from "@/lib/site-layout";
import { detailCollections, languageInfo, locales } from "@/lib/locales";
import { getRecords } from "@/lib/cms";
import { emptySections } from "@/lib/empty-sections";
import { siteUrl } from "@/lib/seo";


const url = (locale: string, path: string) =>
  `${siteUrl}/${locale}${path ? "/" + path : ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!launched) return [];
  const result: MetadataRoute.Sitemap = [];
  const nav = navigationFrom(await getSiteLayout("vi"));
  const STATIC_PATHS = [
    ...new Set([
      "",
      ...nav.filter((n) => n.href.startsWith("/")).map((n) => n.slug),
      "industries",
      "careers",
      "guide",
      "consultation",
      "privacy",
      "terms",
    ]),
  ];

  // Trang mục còn trống chỉ có dòng "Chưa có nội dung": khai báo cho Google là
  // mời nó lập chỉ mục một trang mỏng. Xét theo từng ngôn ngữ.
  const empty = Object.fromEntries(
    await Promise.all(
      locales.map(async (l) => [l, await emptySections(l)] as const),
    ),
  );
  for (const path of STATIC_PATHS) {
    const present = locales.filter((l) => !empty[l].has(path));
    for (const locale of present)
      result.push({
        url: url(locale, path),
        alternates: {
          languages: {
            ...Object.fromEntries(
              present.map((l) => [languageInfo[l].tag, url(l, path)]),
            ),
            "x-default": url(present.includes("vi") ? "vi" : present[0], path),
          },
        },
      });
  }

  for (const collection of detailCollections) {
    // Đọc một lần cho mọi ngôn ngữ rồi mới ghép, thay vì đọc lại theo từng
    // ngôn ngữ của vòng ngoài — nội dung không phụ thuộc ngôn ngữ đang xét.
    const groups = await Promise.all(
      locales.map(async (l) => ({
        locale: l,
        records: await getRecords(collection, l),
      })),
    );
    for (const group of groups)
      for (const record of group.records) {
        const languages: Record<string, string> = {};
        for (const other of groups) {
          const twin =
            other.locale === group.locale
              ? record
              : record.translationKey
                ? other.records.find(
                    (r) => r.translationKey === record.translationKey,
                  )
                : null;
          if (twin)
            languages[languageInfo[other.locale].tag] = url(
              other.locale,
              collection + "/" + twin.slug,
            );
        }
        // Luôn khai x-default cho đồng nhất với trang tĩnh; ưu tiên bản tiếng
        // Việt, nếu bản ghi chưa có bản dịch tiếng Việt thì trỏ về chính nó.
        languages["x-default"] =
          languages[languageInfo.vi.tag] ??
          url(group.locale, collection + "/" + record.slug);
        result.push({
          url: url(group.locale, collection + "/" + record.slug),
          lastModified: record.updatedAt,
          alternates: { languages },
        });
      }
  }
  return result;
}
