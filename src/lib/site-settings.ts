import { cache } from "react";
import { getCMS } from "./cms";
/** Ghi nhớ theo lượt render: header, footer và JSON-LD dùng chung một lần đọc. */
export const getSiteSettings = cache(async function getSiteSettings() {
  if (!process.env.DATABASE_URL) return null;
  const cms = await getCMS();
  return cms.findGlobal({ slug: "site-settings", overrideAccess: false });
});
