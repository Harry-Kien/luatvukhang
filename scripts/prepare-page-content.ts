/**
 * Bổ sung nội dung dự thảo cho các trang nền đang trống.
 *
 *   node --env-file=.env --import tsx scripts/prepare-page-content.ts
 *
 * Chỉ ghi vào trang chưa có khối nội dung nào. Trang mà công ty đã biên tập sẽ
 * được giữ nguyên, kể cả khi chạy lại script nhiều lần.
 *
 * Trang vẫn ở trạng thái nháp: nội dung của công ty luật phải được rà soát và
 * xuất bản bởi người có thẩm quyền, không đưa thẳng lên website.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { pageContent } from "./content/pages";

const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin) throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let updated = 0;
let untouched = 0;

for (const page of pageContent)
  for (const language of locales) {
    const found = await cms.find({
      collection: "pages",
      where: {
        and: [
          { slug: { equals: page.slug } },
          { language: { equals: language } },
        ],
      },
      draft: true,
      limit: 1,
    });
    const existing = found.docs[0] as { id: number | string; blocks?: unknown[] } | undefined;
    if (!existing) {
      console.log("bo qua", page.slug, language, "- chua co trang nay");
      continue;
    }
    // Không ghi đè công sức biên tập đã có.
    if (existing.blocks?.length) {
      untouched += 1;
      continue;
    }
    await cms.update({
      collection: "pages",
      id: existing.id,
      user: admin,
      draft: true,
      data: {
        summary: page.summary[language],
        blocks: page.sections.map((section) => ({
          blockType: "callout" as const,
          visible: true,
          heading: section.heading[language],
          body: section.body[language],
        })),
      },
    });
    updated += 1;
    console.log("da bo sung", page.slug, language);
  }

console.log(
  `\nDa bo sung: ${updated} trang. Giu nguyen vi da co noi dung: ${untouched}.\n` +
    "Tat ca van la NHAP. Vao /admin de ra soat va xuat ban.",
);
process.exit(0);
