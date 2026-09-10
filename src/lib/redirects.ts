import { permanentRedirect } from "next/navigation";
import { getCMS } from "./cms";
export async function applyRedirect(path: string) {
  if (!process.env.DATABASE_URL) return;
  const cms = await getCMS();
  const result = await cms.find({
    collection: "redirects",
    where: { from: { equals: path } },
    limit: 1,
    overrideAccess: false,
  });
  const to = result.docs[0]?.to;
  if (to && to !== path && /^\/(vi|en|zh)\//.test(to)) permanentRedirect(to);
}
