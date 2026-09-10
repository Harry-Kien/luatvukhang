import { getPayload } from "payload";
import config from "../src/payload.config";
import { policyDrafts } from "../src/lib/policy-drafts";
const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin) throw Error("Create an admin first");
for (const language of ["vi", "en"] as const) {
  for (const slug of [
    "home",
    "about",
    "contact",
    "privacy",
    "terms",
  ] as const) {
    const exists = await cms.count({
      collection: "pages",
      where: {
        and: [{ slug: { equals: slug } }, { language: { equals: language } }],
      },
    });
    if (exists.totalDocs) continue;
    const title =
      slug === "home"
        ? language === "vi"
          ? "Thấu hiểu vấn đề. Vững vàng quyết định."
          : "Understand the matter. Decide with confidence."
        : {
            about: ["Về Công ty Luật TNHH Vũ Khang", "About Vũ Khang"],
            contact: ["Liên hệ", "Contact"],
            privacy: ["Quyền riêng tư", "Privacy"],
            terms: ["Điều khoản sử dụng", "Terms of use"],
          }[slug]![language === "vi" ? 0 : 1];
    const policy = slug === "privacy" || slug === "terms";
    const sections = policy ? policyDrafts[slug][language] : [];
    await cms.create({
      collection: "pages",
      user: admin,
      draft: true,
      data: {
        title,
        slug,
        language,
        translationKey: slug,
        summary:
          language === "vi"
            ? "Nội dung dự thảo của Công ty Luật TNHH Vũ Khang — cần rà soát trước khi xuất bản."
            : "Draft content for Công ty Luật TNHH Vũ Khang — review before publication.",
        reviewState: "working",
        _status: "draft",
        blocks: sections.map(([heading, body]) => ({
          blockType: "callout" as const,
          visible: true,
          heading,
          body,
        })),
      },
    });
    console.log("Created draft", language, slug);
  }
}
await cms.destroy();
process.exit();
