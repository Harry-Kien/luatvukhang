import type { MetadataRoute } from "next";
import { launched, navigation } from "@/lib/content";
import { detailCollections, languageInfo, locales } from "@/lib/locales";
import { getRecords } from "@/lib/cms";
import { siteUrl } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  ...navigation.map((n) => n[0]),
  "industries",
  "careers",
  "guide",
  "consultation",
  "privacy",
  "terms",
];

const url = (locale: string, path: string) =>
  `${siteUrl}/${locale}${path ? "/" + path : ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!launched) return [];
  const result: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS)
    for (const locale of locales)
      result.push({
        url: url(locale, path),
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((l) => [languageInfo[l].tag, url(l, path)]),
            ),
            "x-default": url("vi", path),
          },
        },
      });

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
