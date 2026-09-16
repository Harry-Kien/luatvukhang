/**
 * Nối bài viết với lĩnh vực chuyên môn liên quan.
 *
 *   node --env-file=.env --import tsx scripts/prepare-cross-links.ts
 *
 * Trang chuyên môn có ô "Bài liên quan" nhưng chưa bản ghi nào dùng, nên khách
 * đọc xong một lĩnh vực là hết đường đi tiếp. Liên kết nội bộ giữ khách ở lại
 * và cho công cụ tìm kiếm thấy hai trang cùng nói về một chủ đề.
 *
 * Quan hệ phải trỏ tới bản ghi CÙNG NGÔN NGỮ, nếu không trang tiếng Anh sẽ dẫn
 * sang bài tiếng Việt.
 *
 * Chỉ thêm, không gỡ: liên kết do công ty tự chọn trong CMS được giữ nguyên.
 * Bài "Chuẩn bị gì cho buổi gặp luật sư đầu tiên" cố ý không gắn vào lĩnh vực
 * nào — đó là hướng dẫn chung, gắn vào cả 12 lĩnh vực chỉ làm loãng.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";

/** slug lĩnh vực -> các slug bài viết liên quan. */
const LINKS: Record<string, string[]> = {
  "hop-dong-thuong-mai": [
    "khi-nao-can-luat-su-ra-soat-hop-dong",
    "cac-buoc-truoc-khi-khoi-kien-doi-tac",
  ],
  "giai-quyet-tranh-chap": ["cac-buoc-truoc-khi-khoi-kien-doi-tac"],
};

const cms = await getPayload({ config });
// Bản đã xuất bản chỉ ghi lại được bằng tài khoản có quyền xuất bản
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
const find = async (
  collection: "services" | "articles",
  slug: string,
  language: string,
) =>
  (
    await cms.find({
      collection,
      where: {
        and: [{ slug: { equals: slug } }, { language: { equals: language } }],
      },
      draft: true,
      limit: 1,
      depth: 0,
    })
  ).docs[0] as Record<string, any> | undefined;

let linked = 0;
let skipped = 0;
for (const [serviceSlug, articleSlugs] of Object.entries(LINKS))
  for (const language of locales) {
    const service = await find("services", serviceSlug, language);
    if (!service) {
      console.log(`khong thay chuyen mon ${serviceSlug}/${language}`);
      continue;
    }
    const current = (service.articles ?? []).map((value: any) =>
      typeof value === "object" ? value.id : value,
    );
    const wanted = [...current];
    for (const articleSlug of articleSlugs) {
      const article = await find("articles", articleSlug, language);
      if (!article) {
        console.log(`khong thay bai ${articleSlug}/${language}`);
        continue;
      }
      if (!wanted.includes(article.id)) wanted.push(article.id);
    }
    if (wanted.length === current.length) {
      skipped += 1;
      continue;
    }
    await cms.update({
      collection: "services",
      id: service.id,
      user: admin,
      draft: service._status !== "published",
      data: {
        articles: wanted,
        ...(service._status === "published" ? { _status: "published" } : {}),
      },
    });
    linked += wanted.length - current.length;
    console.log(
      `da noi ${serviceSlug}/${language}: +${wanted.length - current.length}`,
    );
  }

console.log(`\nDa them ${linked} lien ket. Bo qua vi da co: ${skipped}.`);
await cms.destroy();
process.exit(0);
