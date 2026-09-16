/**
 * Bổ sung đối tượng phù hợp, quy trình hỗ trợ và câu hỏi thường gặp cho 6 trang
 * Ngành nghề, ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-industry-details.ts
 *
 * Vì sao cần: trang Chuyên môn có tóm tắt, đối tượng, phạm vi, quy trình và câu
 * hỏi thường gặp; trang Ngành nghề chỉ có tóm tắt và hai khối ngắn. Khách so
 * sánh hai trang cạnh nhau sẽ thấy một bên mỏng hẳn, và trang thiếu câu hỏi
 * thường gặp cũng không phát dữ liệu có cấu trúc FAQPage.
 *
 * Chỉ điền ô đang trống. Ô công ty đã biên tập không bị ghi đè, nên chạy lại
 * nhiều lần vẫn an toàn.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { industryDetails } from "./content/industry-details";

const cms = await getPayload({ config });
// Bản ghi đang được xuất bản chỉ ghi lại được bằng tài khoản có quyền xuất bản
// (publicationGuard); không truyền user thì lệnh ghi bị từ chối.
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin)
  throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

const blank = (value: unknown) =>
  value == null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "string" && value.trim() === "");

let filled = 0;
let skipped = 0;
const missing: string[] = [];

for (const detail of industryDetails)
  for (const language of locales) {
    const found = (
      await cms.find({
        collection: "industries",
        where: {
          and: [
            { slug: { equals: detail.slug } },
            { language: { equals: language } },
          ],
        },
        draft: true,
        limit: 1,
        depth: 0,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (!found) {
      missing.push(`${detail.slug}/${language}`);
      continue;
    }

    const data: Record<string, any> = {};
    if (blank(found.audience)) data.audience = detail.audience[language];
    if (blank(found.process))
      data.process = detail.process.map((step) => ({
        heading: step.heading[language],
        description: step.description[language],
      }));
    if (blank(found.faq))
      data.faq = detail.faq.map((item) => ({
        question: item.question[language],
        answer: item.answer[language],
      }));
    if (!Object.keys(data).length) {
      skipped += 1;
      continue;
    }

    const live = found._status === "published";
    await cms.update({
      collection: "industries",
      id: found.id,
      user: admin,
      draft: !live,
      data: { ...data, ...(live ? { _status: "published" } : {}) },
    });
    filled += Object.keys(data).length;
    console.log(
      `da bo sung ${detail.slug}/${language}: ${Object.keys(data).join(", ")}`,
    );
  }

if (missing.length)
  console.log(
    "\nKhong tim thay ban ghi: " +
      missing.join(", ") +
      "\nChay scripts/prepare-editorial.ts truoc roi chay lai.",
  );
console.log(`\nDa dien ${filled} o. Bo qua vi da co noi dung: ${skipped}.`);
await cms.destroy();
process.exit(0);
