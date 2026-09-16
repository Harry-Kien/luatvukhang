/**
 * Nạp chữ mặc định của giao diện vào global "Giao diện website" cho ba ngôn ngữ.
 * Chỉ điền ô đang trống hoặc còn nguyên chữ của ngôn ngữ khác; không ghi đè nội
 * dung công ty đã biên tập. Chạy lại được.
 *   node --env-file=.env --import tsx scripts/prepare-site-layout.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { SITE_LAYOUT_DEFAULTS } from "../src/cms/site-layout";

type Row = Record<string, any>;
const vietnamese = SITE_LAYOUT_DEFAULTS.vi as Record<string, any>;
const english = SITE_LAYOUT_DEFAULTS.en as Record<string, any>;

/**
 * Ô coi như chưa có bản dịch của ngôn ngữ đang xét.
 *
 * Ngoài ô trống, còn hai dấu vết quen thuộc: ô giữ nguyên chữ của ngôn ngữ
 * nguồn (mảng trong global dùng chung dòng, nên bản tiếng Việt lưu trước là
 * tiếng Anh và tiếng Trung đọc lại đúng chữ đó), và ô mang đuôi " [en]" /
 * " [zh]" do nhà cung cấp dịch giả lập sinh ra — không phải chữ do người viết.
 */
function untranslated(
  locale: string,
  existing: unknown,
  wanted: unknown,
  sources: unknown[],
) {
  if (existing == null || existing === "") return true;
  if (locale === "vi" || typeof existing !== "string") return false;
  if (existing === wanted) return false;
  return sources.some(
    (source) =>
      typeof source === "string" &&
      source !== wanted &&
      (existing === source || existing === `${source} [${locale}]`),
  );
}

/** Ghép từng dòng của mảng: khớp theo đường dẫn, không khớp được thì theo thứ tự. */
function mergeRows(
  locale: string,
  stored: Row[],
  wanted: Row[],
  viRows: Row[],
  enRows: Row[],
) {
  let filled = 0;
  const at = (rows: Row[], row: Row, index: number) =>
    (row?.href && rows.find((entry) => entry?.href === row.href)) ||
    rows[index] ||
    {};
  const rows = stored.map((row, index) => {
    const want = at(wanted, row, index);
    const out: Row = { ...row };
    for (const [key, value] of Object.entries(want)) {
      if (key === "href") continue;
      const sources = [
        at(viRows, row, index)[key],
        at(enRows, row, index)[key],
      ];
      if (untranslated(locale, row?.[key], value, sources)) {
        out[key] = value;
        filled++;
      }
    }
    return out;
  });
  return { rows, filled };
}

const cms = await getPayload({ config });
try {
  for (const locale of ["vi", "en", "zh"] as const) {
    const current = (await cms.findGlobal({
      slug: "site-layout",
      locale,
      fallbackLocale: false,
      depth: 0,
    })) as Record<string, any>;
    const defaults = SITE_LAYOUT_DEFAULTS[locale] as Record<string, any>;
    const data: Record<string, any> = {};
    let filled = 0;
    for (const tab of Object.keys(defaults)) {
      data[tab] = { ...(current[tab] ?? {}) };
      for (const [key, value] of Object.entries(defaults[tab])) {
        const existing = current[tab]?.[key];
        if (Array.isArray(value)) {
          // Mảng đã có dòng thì không nạp đè cả mảng — biên tập viên có thể đã
          // thêm hoặc bớt mục. Chỉ lấp nhãn bên trong từng dòng.
          if (!Array.isArray(existing) || existing.length === 0) {
            data[tab][key] = value;
            filled++;
            continue;
          }
          const merged = mergeRows(
            locale,
            existing,
            value as Row[],
            (vietnamese[tab]?.[key] ?? []) as Row[],
            (english[tab]?.[key] ?? []) as Row[],
          );
          if (merged.filled) {
            data[tab][key] = merged.rows;
            filled += merged.filled;
          }
          continue;
        }
        if (
          untranslated(locale, existing, value, [
            vietnamese[tab]?.[key],
            english[tab]?.[key],
          ])
        ) {
          data[tab][key] = value;
          filled++;
        }
      }
    }
    if (filled) await cms.updateGlobal({ slug: "site-layout", locale, data });
    console.log(`[${locale}] đã điền ${filled} ô.`);
  }
} finally {
  await cms.destroy();
}
process.exit(0);
