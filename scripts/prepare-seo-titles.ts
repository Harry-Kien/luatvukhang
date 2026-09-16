/**
 * Điền tiêu đề hiển thị trên kết quả tìm kiếm cho các bản ghi còn trống.
 *
 *   node --env-file=.env --import tsx scripts/prepare-seo-titles.ts
 *   node --env-file=.env --import tsx scripts/prepare-seo-titles.ts --list
 *   node --env-file=.env --import tsx scripts/prepare-seo-titles.ts --refresh
 *
 * Ô trống thì website ghép tiêu đề bản ghi với tên công ty. Đọc được, nhưng bỏ
 * phí chỗ đặt cụm từ khách thật sự gõ khi tìm kiếm.
 *
 * Chỉ điền ô đang trống; tiêu đề công ty đã tự viết không bị ghi đè.
 *
 * `--refresh` nạp lại từ scripts/content/seo-titles.ts kể cả khi ô đã có chữ.
 * Dùng khi chính tệp nội dung mới là bản đúng — ví dụ công ty bổ sung thông tin
 * làm tiêu đề cũ không còn phản ánh đủ. Cờ này GHI ĐÈ phần đã sửa tay.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { seoTitles } from "./content/seo-titles";

const listOnly = process.argv.includes("--list");
const refresh = process.argv.includes("--refresh");
const cms = await getPayload({ config });
// Bản ghi đang được xuất bản chỉ ghi lại được bằng tài khoản có quyền xuất bản.
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin)
  throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let filled = 0;
let skipped = 0;
const missing: string[] = [];

for (const [key, title] of Object.entries(seoTitles)) {
  const [collection, slug] = key.split("/");
  for (const language of locales) {
    const found = (
      await cms.find({
        collection: collection as never,
        where: {
          and: [{ slug: { equals: slug } }, { language: { equals: language } }],
        },
        draft: true,
        limit: 1,
        depth: 0,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (!found) {
      missing.push(`${key}/${language}`);
      continue;
    }
    const current = String(found.seo?.title ?? "").trim();
    if (current && !refresh) {
      skipped += 1;
      continue;
    }
    if (current === title[language]) {
      skipped += 1;
      continue;
    }
    if (listOnly) {
      console.log(`${key}/${language}: ${title[language]}`);
      filled += 1;
      continue;
    }
    const live = found._status === "published";
    await cms.update({
      collection: collection as never,
      id: found.id,
      user: admin,
      draft: !live,
      data: {
        // Giữ nguyên mô tả đã có; chỉ thêm tiêu đề.
        seo: { ...(found.seo ?? {}), title: title[language] },
        ...(live ? { _status: "published" } : {}),
      } as never,
    });
    filled += 1;
    console.log(`da dien ${key}/${language}`);
  }
}

if (missing.length)
  console.log("\nKhong tim thay ban ghi: " + missing.join(", "));
console.log(
  listOnly
    ? `\n${filled} o se duoc dien. Bo qua vi da co: ${skipped}.`
    : `\nDa dien ${filled} tieu de. Bo qua vi da co: ${skipped}.`,
);
await cms.destroy();
process.exit(0);
