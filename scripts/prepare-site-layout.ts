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
    const data: Record<string, any> = {};
    let filled = 0;
    for (const tab of Object.keys(defaults)) {
      data[tab] = { ...(current[tab] ?? {}) };
      for (const [key, value] of Object.entries(defaults[tab])) {
        const existing = current[tab]?.[key];
        const empty = Array.isArray(existing)
          ? existing.length === 0
          : existing == null || existing === "";
        if (empty) {
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
