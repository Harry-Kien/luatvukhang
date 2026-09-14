import { cache } from "react";
import { getCMS } from "./cms";
import type { Locale } from "./locales";
import {
  SITE_LAYOUT_DEFAULTS,
  type SiteLayoutData,
} from "@/cms/site-layout";

const filled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === "string"
      ? value.trim().length > 0
      : value !== null && value !== undefined;

function merge<T>(defaults: T, data: unknown): T {
  if (
    Array.isArray(defaults) ||
    typeof defaults !== "object" ||
    defaults === null
  )
    return (filled(data) ? data : defaults) as T;
  const out: Record<string, unknown> = { ...(defaults as object) };
  const source = (data ?? {}) as Record<string, unknown>;
  for (const key of new Set([...Object.keys(out), ...Object.keys(source)])) {
    const base = (defaults as Record<string, unknown>)[key];
    const value = source[key];
    out[key] =
      base && typeof base === "object" && !Array.isArray(base)
        ? merge(base, value)
        : filled(value)
          ? value
          : base;
  }
  return out as T;
}

/**
 * Dữ liệu global đè lên mặc định trong mã; ô trống dùng mặc định của đúng
 * ngôn ngữ đó. Nhờ vậy website trông y hệt trước và sau khi triển khai, và
 * không bao giờ hiện chuỗi tiếng Việt ở trang tiếng Anh vì thiếu bản dịch.
 */
export const getSiteLayout = cache(async function getSiteLayout(
  locale: Locale,
): Promise<SiteLayoutData> {
  const defaults = SITE_LAYOUT_DEFAULTS[locale];
  if (!process.env.DATABASE_URL) return defaults;
  try {
    const cms = await getCMS();
    const data = await cms.findGlobal({
      slug: "site-layout",
      locale,
      fallbackLocale: false,
      overrideAccess: false,
      depth: 0,
    });
    return merge(defaults, data);
  } catch {
    return defaults;
  }
});
