import { releaseEnvironmentIssues } from "../src/lib/release-environment";
import { locales } from "../src/lib/locales";
import { getPayload, type Where } from "payload";
import config from "../src/payload.config";
const issues = releaseEnvironmentIssues(process.env);
const warnings: string[] = [];
if (process.env.TRUST_PROXY_HEADERS !== "true")
  warnings.push(
    "Per-client rate limits disabled. Configure a trusted ingress before enabling TRUST_PROXY_HEADERS.",
  );
if (!process.env.DATABASE_URL) {
  console.error("RELEASE BLOCKED:\n" + issues.join("\n"));
  process.exit(1);
}
const payload = await getPayload({ config });
const settings = await payload.findGlobal({ slug: "site-settings" });
if (
  !settings.companyName ||
  !settings.englishName ||
  !settings.phone ||
  !settings.address ||
  !settings.email ||
  !settings.registration
)
  issues.push("Complete verified company settings.");
if (!settings.privacyApproved) issues.push("Approve privacy policy.");
for (const language of locales)
  for (const slug of ["home", "about", "contact", "privacy", "terms"]) {
    const result = await payload.count({
      collection: "pages",
      where: {
        and: [
          { language: { equals: language } },
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
          { isSample: { not_equals: true } },
        ],
      },
    });
    if (!result.totalDocs)
      issues.push("Missing approved " + language + "/" + slug);
  }
// Kiểm tra SEO trên nội dung đã xuất bản.
const publishedOnly: Where[] = [
  { _status: { equals: "published" } },
  { isSample: { not_equals: true } },
];
const published: Where = { and: publishedOnly };
for (const collection of [
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
] as const) {
  const { docs } = await payload.find({
    collection,
    where: published,
    pagination: false,
    depth: 1,
  });
  if (
    ["services", "lawyers"].includes(collection) &&
    !docs.some((doc) => doc.language === "vi")
  )
    issues.push(`Publish verified Vietnamese content in ${collection}.`);
  if (["articles", "experience"].includes(collection) && !docs.length)
    warnings.push(
      `No published ${collection}; supply verified editorial content before promoting this section.`,
    );
  for (const doc of docs as Record<string, any>[]) {
    const at = `${collection}/${doc.language}/${doc.slug}`;
    // Thiếu mô tả thì Google tự cắt một đoạn bất kỳ làm snippet.
    if (!doc.seo?.description && !doc.summary)
      issues.push(`No search description for ${at}`);
    if (doc.seo?.description && doc.seo.description.length > 160)
      warnings.push(
        `Search description over 160 characters; review snippet length: ${at}`,
      );
    // Nội dung pháp lý cần thể hiện rõ ai chịu trách nhiệm chuyên môn.
    if (collection === "articles" && !doc.author)
      warnings.push(`Article has no author, weakens expertise signals: ${at}`);
    if (collection === "lawyers" && !doc.qualifications)
      warnings.push(`Lawyer profile has no verified credentials: ${at}`);
    // hreflang chỉ trỏ được sang bản dịch đã xuất bản.
    if (doc.translationKey) {
      const twin = await payload.count({
        collection,
        where: {
          and: [
            { translationKey: { equals: doc.translationKey } },
            { language: { not_equals: doc.language } },
            ...publishedOnly,
          ],
        },
      });
      if (!twin.totalDocs)
        warnings.push(`No published translation, hreflang incomplete: ${at}`);
    }
  }
}
console.log(
  issues.length
    ? "RELEASE BLOCKED:\n" + issues.join("\n")
    : "Content/configuration checks passed. Manual acceptance still required.",
);
if (warnings.length)
  console.log("\nWARNINGS (not blocking):\n" + warnings.join("\n"));
await payload.destroy();
process.exit(issues.length ? 1 : 0);
