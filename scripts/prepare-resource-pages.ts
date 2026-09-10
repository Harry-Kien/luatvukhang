/** Seed editable resource pages without replacing existing editorial work. */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { pageResources, localText } from "../src/lib/page-resources";
const cms = await getPayload({ config });
try {
  const admin = (
    await cms.find({
      collection: "users",
      where: { role: { equals: "admin" } },
      limit: 1,
    })
  ).docs[0];
  if (!admin)
    throw new Error("Create an administrator before preparing content.");
  let created = 0;
  for (const [slug, resource] of Object.entries(pageResources))
    for (const language of locales) {
      const existing = await cms.find({
        collection: "pages",
        where: {
          and: [{ slug: { equals: slug } }, { language: { equals: language } }],
        },
        draft: true,
        limit: 1,
      });
      if (existing.docs.length) continue;
      await cms.create({
        collection: "pages",
        user: admin,
        draft: true,
        data: {
          slug,
          language,
          translationKey: `resource-${slug}`,
          title: localText(resource.title, language),
          summary: localText(resource.intro, language),
          reviewState: "working",
          _status: "draft",
          isSample: false,
          blocks: resource.cards.map(([title, body]) => ({
            blockType: "callout" as const,
            visible: true,
            heading: localText(title, language),
            body: localText(body, language),
          })),
        },
      });
      created++;
    }
  console.log(
    `Created ${created} editable draft pages; existing content preserved.`,
  );
} finally {
  await cms.destroy();
}

// Payload's toolchain may retain background handles after destroy.
process.exit(0);
