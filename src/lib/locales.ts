export const locales = ["vi", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const languageInfo = {
  vi: { label: "Tiếng Việt", short: "VI", tag: "vi", openGraph: "vi_VN" },
  en: { label: "English", short: "EN", tag: "en", openGraph: "en_US" },
  zh: { label: "简体中文", short: "中文", tag: "zh-Hans", openGraph: "zh_CN" },
} as const;
export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);
export const resolveLocale = (value: unknown): Locale =>
  isLocale(value) ? value : "vi";
export const detailCollections = [
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
] as const;
export const publicSections = [
  "about",
  "contact",
  "privacy",
  "terms",
  "consultation",
  "guide",
  "search",
  "typography",
  ...detailCollections,
] as const;
/** Accept only public pathname segments; never forward a URL or query supplied as a path. */
export function languagePath(path: string, target: Locale) {
  const match = path.match(
    /^\/(vi|en|zh)(?:\/([a-z-]+))?(?:\/([\p{L}\p{N}_%-]+))?\/?$/u,
  );
  if (!match) return { source: "vi" as Locale, path: "/" + target };
  const [, language, section, slug] = match;
  if (section && !(publicSections as readonly string[]).includes(section))
    return { source: resolveLocale(language), path: "/" + target };
  if (slug && !(detailCollections as readonly string[]).includes(section))
    return {
      source: resolveLocale(language),
      path: "/" + target + "/" + section,
    };
  return {
    source: resolveLocale(language),
    section,
    slug,
    path: "/" + target + (section ? "/" + section : ""),
  };
}
