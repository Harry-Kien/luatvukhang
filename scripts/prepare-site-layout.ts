/**
 * Nạp chữ mặc định của giao diện vào global "Giao diện website" cho ba ngôn ngữ.
 * Chỉ điền ô đang trống; không ghi đè nội dung công ty đã sửa. Chạy lại được.
 *   node --env-file=.env --import tsx scripts/prepare-site-layout.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { SITE_LAYOUT_DEFAULTS } from "../src/cms/site-layout";

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
    // Bản Trung từng được nạp bằng chữ tiếng Anh khi từ điển thiếu cụm; ô nào
    // vẫn còn đúng bằng mặc định tiếng Anh thì coi như chưa dịch và nạp lại.
    const english = SITE_LAYOUT_DEFAULTS.en as Record<string, any>;
    const data: Record<string, any> = {};
    let filled = 0;
    for (const tab of Object.keys(defaults)) {
      data[tab] = { ...(current[tab] ?? {}) };
      for (const [key, value] of Object.entries(defaults[tab])) {
        const existing = current[tab]?.[key];
        const empty = Array.isArray(existing)
          ? existing.length === 0
          : existing == null || existing === "";
        const untranslated =
          locale === "zh" &&
          typeof existing === "string" &&
          existing === english[tab]?.[key] &&
          existing !== value;
        if (empty || untranslated) {
          data[tab][key] = value;
          filled++;
        }
      }
    }
    if (filled) await cms.updateGlobal({ slug: "site-layout", locale, data });
    console.log(`[${locale}] đã điền ${filled} ô trống.`);
  }
} finally {
  await cms.destroy();
}
process.exit(0);
