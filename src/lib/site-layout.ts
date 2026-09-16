import { cache } from "react";
import { getCMS } from "./cms";
import type { Locale } from "./locales";
import { SITE_LAYOUT_DEFAULTS, type SiteLayoutData } from "@/cms/site-layout";

const filled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === "string"
      ? value.trim().length > 0
      : value !== null && value !== undefined;

const href = (row: unknown) =>
  (row as { href?: unknown } | null | undefined)?.href;

/**
 * Dòng mặc định ứng với một dòng đã lưu: khớp theo đường dẫn, không khớp được
 * thì lấy theo thứ tự.
 *
 * Mảng trong global không dịch theo ngôn ngữ — các dòng dùng chung, chỉ nhãn
 * bên trong mới có ba bản. Biên tập viên thêm một mục menu ở bản tiếng Việt là
 * dòng đó xuất hiện ở cả ba ngôn ngữ nhưng chỉ có nhãn tiếng Việt. Ghép từng
 * dòng với mặc định của đúng ngôn ngữ đang xem để ô nhãn trống được lấp bằng
 * chữ đúng ngôn ngữ, thay vì cả mảng rơi về bản đã lưu.
 */
const rowDefault = (defaults: unknown[], row: unknown, index: number) => {
  const path = href(row);
  // Dòng có đường dẫn thì chỉ nhận mặc định cùng đường dẫn. Lấy theo vị trí sẽ
  // khiến một mục mới chèn vào giữa mượn nhãn của mục đang đứng chỗ đó — menu
  // tiếng Anh hiện "People" nhưng bấm vào lại ra trang khác. Mục chưa có bản
  // dịch thì thà tạm ẩn còn hơn dẫn sai.
  return path
    ? defaults.find((entry) => href(entry) === path)
    : defaults[index];
};

function mergeRows(defaults: unknown[], data: unknown[]): unknown[] {
  return data.map((row, index) => {
    const base = rowDefault(defaults, row, index);
    return base && typeof base === "object" && !Array.isArray(base)
      ? merge(base, row)
      : filled(row)
        ? row
        : base;
  });
}

function merge<T>(defaults: T, data: unknown): T {
  if (Array.isArray(defaults))
    return (
      Array.isArray(data) && data.length ? mergeRows(defaults, data) : defaults
    ) as T;
  if (typeof defaults !== "object" || defaults === null)
    return (filled(data) ? data : defaults) as T;
  const out: Record<string, unknown> = { ...(defaults as object) };
  const source = (data ?? {}) as Record<string, unknown>;
  for (const key of new Set([...Object.keys(out), ...Object.keys(source)])) {
    const base = (defaults as Record<string, unknown>)[key];
    const value = source[key];
    out[key] =
      base && typeof base === "object"
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
