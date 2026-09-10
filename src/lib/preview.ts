import type { CollectionSlug } from "payload";
import { headers } from "next/headers";
import { getCMS, type ContentRecord } from "./cms";
import { roleOf } from "@/cms/access";
import type { Locale } from "./content";
export async function getPreviewRecord(
  collection: string,
  locale: Locale,
  slug: string,
): Promise<ContentRecord | null> {
  if (
    !["pages", "services", "industries", "lawyers", "experience", "articles", "careers"].includes(
      collection,
    )
  )
    return null;
  const cms = await getCMS();
  const { user } = await cms.auth({ headers: await headers() });
  if (
    !["admin", "editor", "reviewer", "publisher"].includes(roleOf(user) || "")
  )
    return null;
  const result = await cms.find({
    collection: collection as CollectionSlug,
    where: {
      and: [{ language: { equals: locale } }, { slug: { equals: slug } }],
    },
    draft: true,
    overrideAccess: false,
    user,
    limit: 1,
    depth: 1,
  });
  return (result.docs[0] as unknown as ContentRecord) || null;
}
