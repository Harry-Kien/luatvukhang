/**
 * Nạp nội dung dự thảo cho bốn lĩnh vực chuyên môn, ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-practice-areas.ts
 *
 * Bản ghi được tạo ở trạng thái nháp, reviewState "working". Đây là chủ ý:
 * nội dung của một công ty luật phải do người có thẩm quyền rà soát và xuất
 * bản, không được đưa thẳng lên website. Chạy lại nhiều lần không tạo trùng —
 * bản ghi đã tồn tại sẽ được bỏ qua.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { practiceAreas } from "./content/practice-areas";

const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin) throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let created = 0;
let skipped = 0;

for (const area of practiceAreas)
  for (const language of locales) {
    const exists = await cms.count({
      collection: "services",
      where: {
        and: [
          { slug: { equals: area.slug } },
          { language: { equals: language } },
        ],
      },
    });
    if (exists.totalDocs) {
      skipped += 1;
      continue;
    }
    await cms.create({
      collection: "services",
      user: admin,
      draft: true,
      data: {
        title: area.title[language],
        slug: area.slug,
        language,
        translationKey: area.slug,
        summary: area.summary[language],
        audience: area.audience[language],
        scope: area.scope.map((item) => ({ item: item[language] })),
        process: area.process.map((step) => ({
          heading: step.heading[language],
          description: step.description[language],
        })),
        faq: area.faq.map((entry) => ({
          question: entry.question[language],
          answer: entry.answer[language],
        })),
        seo: { description: area.seoDescription[language] },
        // Nháp chờ rà soát: nội dung chuyên môn cần luật sư của công ty duyệt.
        reviewState: "working",
        _status: "draft",
        isSample: false,
      },
    });
    created += 1;
    console.log("da tao", area.slug, language);
  }

console.log(
  `\nTao moi: ${created} ban ghi. Bo qua vi da co: ${skipped}.\n` +
    "Tat ca deu la NHAP. Vao /admin de ra soat, duyet chuyen mon roi xuat ban.",
);
process.exit(0);
