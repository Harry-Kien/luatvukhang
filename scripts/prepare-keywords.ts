/**
 * Nạp từ khóa tìm kiếm cho các lĩnh vực chuyên môn đã có trong CMS.
 *
 *   node --env-file=.env --import tsx scripts/prepare-keywords.ts
 *
 * Chỉ ghi vào bản ghi chưa có từ khóa. Lĩnh vực nào công ty đã tự biên tập thì
 * giữ nguyên, kể cả khi chạy lại nhiều lần.
 *
 * Từ khóa chỉ phục vụ ô tìm kiếm trong website: không hiển thị ra trang, không
 * vào thẻ meta, không gửi cho công cụ tìm kiếm.
 *
 * Ghi thẳng vào cả bản nháp lẫn bản đã xuất bản, vì đây không phải nội dung
 * biên tập hiển thị cho người đọc — bắt xuất bản lại toàn bộ chỉ để đổi từ khóa
 * tìm kiếm là thừa.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { practiceKeywords } from "./content/keywords";

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

let written = 0;
let kept = 0;
let absent = 0;

for (const [slug, keywords] of Object.entries(practiceKeywords))
  for (const language of locales) {
    const found = await cms.find({
      collection: "services",
      where: {
        and: [{ slug: { equals: slug } }, { language: { equals: language } }],
      },
      draft: true,
      limit: 1,
      depth: 0,
    });
    const record = found.docs[0] as
      | { id: number | string; keywords?: string | null; _status?: string }
      | undefined;
    if (!record) {
      absent += 1;
      console.log("bo qua", slug, language, "- chua co linh vuc nay");
      continue;
    }
    // Không đè lên từ khóa công ty đã tự thêm.
    if (record.keywords?.trim()) {
      kept += 1;
      continue;
    }
    await cms.update({
      collection: "services",
      id: record.id,
      user: admin,
      data: { keywords: keywords[language] },
      // Giữ nguyên trạng thái xuất bản hiện tại của bản ghi.
      draft: record._status !== "published",
    });
    written += 1;
    console.log("da ghi", slug, language);
  }

if (absent)
  console.log(
    `\n${absent} ban ghi chua ton tai. Chay scripts/prepare-practice-areas.ts truoc.`,
  );
console.log(
  `\nDa ghi tu khoa: ${written}. Giu nguyen vi da co: ${kept}.\n` +
    "Bo sung them trong /admin > Dich vu > o 'Tu khoa khach hang thuong go'.",
);
process.exit(0);
