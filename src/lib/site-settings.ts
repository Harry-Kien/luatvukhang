import { cache } from "react";
import { getCMS } from "./cms";
/**
 * Ghi nhớ theo lượt render: header, footer và JSON-LD dùng chung một lần đọc.
 * Truyền ngôn ngữ để đọc đúng bản dịch của ô có ba ngôn ngữ (địa chỉ, mô tả hệ
 * sinh thái); ô chưa dịch tự lấy bản tiếng Việt.
 */
export const getSiteSettings = cache(async function getSiteSettings(
  locale?: "vi" | "en" | "zh",
) {
  if (!process.env.DATABASE_URL) return null;
  const cms = await getCMS();
  return cms.findGlobal({
    slug: "site-settings",
    overrideAccess: false,
    ...(locale ? { locale, fallbackLocale: "vi" as const } : {}),
  });
});
