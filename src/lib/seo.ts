import { languageInfo, locales } from "./locales";
import type { Metadata } from "next";
import { launched, type Locale } from "./content";

type Json = Record<string, unknown>;

/** Gốc website, đã bỏ dấu "/" thừa để ghép đường dẫn không sinh "//". */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const absolute = (path: string) =>
  siteUrl + (path.startsWith("/") ? path : `/${path}`);

/** Tên rút gọn dùng cho og:site_name và mẫu tiêu đề. */
export const siteName = "Vũ Khang";

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

const OG_LOCALE: Record<Locale, string> = Object.fromEntries(
  Object.entries(languageInfo).map(([key, value]) => [key, value.openGraph]),
) as Record<Locale, string>;

/**
 * Ảnh chia sẻ mặc định. Khai báo tường minh thay vì dựa vào tệp
 * opengraph-image ở segment gốc: khi một trang tự đặt openGraph, Next ghi đè
 * toàn bộ nhóm trường đó, kể cả ảnh kế thừa từ segment cha.
 */
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Công ty Luật Vũ Khang Solutions & Partners — Góc nhìn pháp lý cho những quyết định quan trọng",
};

/**
 * Bỏ mọi trường rỗng trước khi phát ra schema.org.
 * Website luật không được công bố thông tin chưa xác minh, nên thà thiếu
 * trường còn hơn phát ra thẻ trống hoặc giá trị giữ chỗ.
 */
export function prune<T extends Json>(value: T): T {
  const out: Json = {};
  for (const [key, item] of Object.entries(value)) {
    if (item === undefined || item === null || item === "") continue;
    if (Array.isArray(item) && item.length === 0) continue;
    out[key] = item;
  }
  return out as T;
}

/**
 * Chỉ khai hreflang cho bản dịch có thật. x-default trỏ về bản tiếng Việt khi
 * có, vì đó là ngôn ngữ mặc định của website.
 *
 * Duyệt theo `locales` thay vì liệt kê từng ngôn ngữ: thêm ngôn ngữ mới vào
 * cấu hình là hreflang tự có theo, đúng mã BCP-47 khai trong `languageInfo`.
 */
export function languageAlternates(paths: Partial<Record<Locale, string>>) {
  const languages: Record<string, string> = {};
  for (const language of locales)
    if (paths[language])
      languages[languageInfo[language].tag] = paths[language];
  const fallback = locales.map((l) => paths[l]).find(Boolean);
  if (fallback) languages["x-default"] = paths.vi ?? fallback;
  return languages;
}

export function pageMetadata({
  locale,
  title,
  description,
  path,
  alternates,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  images,
  noindex = false,
  titleAbsolute = false,
  feed,
}: {
  locale: Locale;
  title: string;
  /** Đặt true khi tiêu đề đã chứa tên công ty, tránh lặp "… | Vũ Khang". */
  titleAbsolute?: boolean;
  description?: string;
  /** Đường dẫn canonical, luôn không có dấu "/" ở cuối. */
  path: string;
  alternates?: Partial<Record<Locale, string>>;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  images?: string[];
  noindex?: boolean;
  /** Đường dẫn RSS công bố kèm trang, ví dụ "/vi/feed.xml". */
  feed?: string;
}): Metadata {
  const index = launched && !noindex;
  // Mặc định: cùng đường dẫn ở mọi ngôn ngữ. Tiền tố lấy từ `locales` để thêm
  // ngôn ngữ mới không phải sửa biểu thức chính quy ở đây.
  const localePrefix = new RegExp(`^/(?:${locales.join("|")})`);
  const languages = languageAlternates(
    alternates ??
      Object.fromEntries(
        locales.map((l) => [l, path.replace(localePrefix, `/${l}`)]),
      ),
  );
  const socialTitle = titleAbsolute ? title : `${title} | ${siteName}`;
  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages,
      types: feed ? { "application/rss+xml": feed } : undefined,
    },
    robots: {
      index,
      follow: launched,
      googleBot: {
        index,
        follow: launched,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: prune({
      type,
      title: socialTitle,
      description,
      url: absolute(path),
      siteName,
      locale: OG_LOCALE[locale],
      // Mọi ngôn ngữ khác ngôn ngữ hiện tại, không chỉ một.
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: images?.length ? images : [DEFAULT_OG_IMAGE],
      publishedTime: type === "article" ? publishedTime : undefined,
      modifiedTime: type === "article" ? modifiedTime : undefined,
      authors: type === "article" ? authors : undefined,
    }) as Metadata["openGraph"],
    twitter: prune({
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images?.length ? images : [DEFAULT_OG_IMAGE],
    }) as Metadata["twitter"],
  };
}

type Settings = {
  companyName?: string | null;
  englishName?: string | null;
  registration?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
} | null;

/**
 * Hồ sơ tổ chức. Mọi trường đều lấy từ Cài đặt trong CMS; trường chưa nhập
 * bị loại bỏ thay vì điền giá trị mẫu.
 */
export function organizationJsonLd(settings: Settings, locale: Locale) {
  const name =
    (locale === "en" ? settings?.englishName : settings?.companyName) ||
    settings?.companyName ||
    "Công ty Luật Vũ Khang Solutions & Partners";
  const alternateName =
    locale === "en" ? settings?.companyName : settings?.englishName;
  return prune({
    "@context": "https://schema.org",
    "@type": ["LegalService", "Organization"],
    "@id": ORGANIZATION_ID,
    name,
    alternateName: alternateName || undefined,
    url: absolute(`/${locale}`),
    // Google yêu cầu logo tối thiểu 112×112, ưu tiên PNG/JPG hơn SVG.
    logo: absolute("/brand/logo-512.png"),
    telephone: settings?.phone || undefined,
    email: settings?.email || undefined,
    identifier: settings?.registration || undefined,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressCountry: "VN",
        }
      : undefined,
    areaServed: settings?.address
      ? { "@type": "Country", name: "Vietnam" }
      : undefined,
    // Đúng bằng các ngôn ngữ website thực sự công bố.
    availableLanguage: locales.map((l) => ({
      "@type": "Language",
      name: languageInfo[l].label,
      alternateName: languageInfo[l].tag,
    })),
  });
}

/** Khai báo website và hộp tìm kiếm nội bộ cho sitelinks searchbox. */
export function websiteJsonLd(locale: Locale, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absolute(`/${locale}`),
    name,
    inLanguage: languageInfo[locale].tag,
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absolute(`/${locale}/search?q={search_term_string}`),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

type SeoRecord = {
  title: string;
  slug: string;
  summary?: string;
  position?: string;
  qualifications?: string;
  languages?: string;
  portrait?: { url?: string } | number | null;
  scope?: { item: string }[];
  faq?: { question: string; answer: string }[];
  sources?: { label: string; url: string }[];
  author?: { title?: string; slug?: string } | number | null;
  location?: string;
  closingDate?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

const mediaUrl = (value: SeoRecord["portrait"]) =>
  value && typeof value === "object" && value.url
    ? absolute(value.url)
    : undefined;

export function personJsonLd(record: SeoRecord, locale: Locale, path: string) {
  return prune({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absolute(path) + "#person",
    name: record.title,
    url: absolute(path),
    jobTitle: record.position || undefined,
    description: record.summary || undefined,
    image: mediaUrl(record.portrait),
    knowsLanguage: record.languages || undefined,
    hasCredential: record.qualifications || undefined,
    worksFor: { "@id": ORGANIZATION_ID },
    inLanguage: languageInfo[locale].tag,
  });
}

export function articleJsonLd(record: SeoRecord, locale: Locale, path: string) {
  const author =
    record.author && typeof record.author === "object" && record.author.title
      ? prune({
          "@type": "Person",
          name: record.author.title,
          url: record.author.slug
            ? absolute(`/${locale}/lawyers/${record.author.slug}`)
            : undefined,
        })
      : { "@id": ORGANIZATION_ID };
  return prune({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absolute(path) + "#article",
    headline: record.title,
    description: record.summary || undefined,
    datePublished: record.createdAt || undefined,
    dateModified: record.updatedAt || record.createdAt || undefined,
    author,
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(path) },
    inLanguage: languageInfo[locale].tag,
    citation: record.sources?.length
      ? record.sources.map((source) =>
          prune({
            "@type": "CreativeWork",
            name: source.label,
            url: source.url,
          }),
        )
      : undefined,
  });
}

export function serviceJsonLd(record: SeoRecord, locale: Locale, path: string) {
  return prune({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absolute(path) + "#service",
    name: record.title,
    description: record.summary || undefined,
    serviceType: record.title,
    provider: { "@id": ORGANIZATION_ID },
    url: absolute(path),
    inLanguage: languageInfo[locale].tag,
    hasOfferCatalog: record.scope?.length
      ? {
          "@type": "OfferCatalog",
          name: record.title,
          itemListElement: record.scope.map((entry) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: entry.item },
          })),
        }
      : undefined,
  });
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function jobPostingJsonLd(record: SeoRecord, path: string) {
  return prune({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": absolute(path) + "#job",
    title: record.title,
    description: record.summary || record.title,
    datePosted: record.createdAt || undefined,
    validThrough: record.closingDate || undefined,
    hiringOrganization: { "@id": ORGANIZATION_ID },
    jobLocation: record.location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: record.location,
            addressCountry: "VN",
          },
        }
      : undefined,
    directApply: false,
  });
}
