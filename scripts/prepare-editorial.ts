/**
 * Nạp nội dung dự thảo cho hai mục còn trống: Bài viết và Ngành nghề, ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-editorial.ts
 *
 * Bản ghi được tạo ở trạng thái nháp, reviewState "working", không phải minh
 * họa: sau khi luật sư của công ty rà soát và ghi tên tác giả chịu trách nhiệm,
 * chúng được phép xuất bản như nội dung thật. Chạy lại nhiều lần không tạo
 * trùng và không ghi đè bản đã sửa.
 *
 * Kinh nghiệm và Đội ngũ cố ý không nằm ở đây: đó là khẳng định về việc đã
 * làm và về năng lực hành nghề, chỉ công ty cung cấp được.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { draftArticles } from "./content/articles";
import { draftIndustries } from "./content/industries";

const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin)
  throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let created = 0;
let skipped = 0;

async function exists(collection: "articles" | "industries", slug: string, language: string) {
  const found = await cms.count({
    collection,
    where: {
      and: [{ slug: { equals: slug } }, { language: { equals: language } }],
    },
  });
  return found.totalDocs > 0;
}

for (const article of draftArticles)
  for (const language of locales) {
    if (await exists("articles", article.slug, language)) {
      skipped += 1;
      continue;
    }
    await cms.create({
      collection: "articles",
      user: admin,
      draft: true,
      data: {
        title: article.title[language],
        slug: article.slug,
        language,
        translationKey: article.slug,
        summary: article.summary[language],
        keywords: article.keywords,
        blocks: article.sections.map((section) => ({
          blockType: "callout" as const,
          visible: true,
          heading: section.heading[language],
          body: section.body[language],
        })),
        sources: article.sources,
        seo: { description: article.seoDescription[language] },
        reviewState: "working",
        _status: "draft",
        isSample: false,
      } as never,
    });
    created += 1;
    console.log("da tao articles", article.slug, language);
  }

for (const industry of draftIndustries)
  for (const language of locales) {
    if (await exists("industries", industry.slug, language)) {
      skipped += 1;
      continue;
    }
    await cms.create({
      collection: "industries",
      user: admin,
      draft: true,
      data: {
        title: industry.title[language],
        slug: industry.slug,
        language,
        translationKey: industry.slug,
        summary: industry.summary[language],
        keywords: industry.keywords,
        blocks: industry.sections.map((section) => ({
          blockType: "callout" as const,
          visible: true,
          heading: section.heading[language],
          body: section.body[language],
        })),
        seo: { description: industry.seoDescription[language] },
        reviewState: "working",
        _status: "draft",
        isSample: false,
      } as never,
    });
    created += 1;
    console.log("da tao industries", industry.slug, language);
  }

console.log(
  `\nTao moi: ${created} ban ghi. Bo qua vi da co: ${skipped}.\n` +
    "Tat ca deu la NHAP. Vao /admin > Bai viet va Nganh nghe de ra soat,\n" +
    "ghi ten tac gia chiu trach nhiem, duyet chuyen mon roi xuat ban.",
);
process.exit(0);
