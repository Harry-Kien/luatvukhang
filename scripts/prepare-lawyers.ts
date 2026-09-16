/**
 * Nạp hồ sơ luật sư THẬT của công ty và gỡ toàn bộ hồ sơ minh họa.
 *
 *   node --env-file=.env --import tsx scripts/prepare-lawyers.ts
 *   node --env-file=.env --import tsx scripts/prepare-lawyers.ts --refresh
 *   node --env-file=.env --import tsx scripts/prepare-lawyers.ts --publish
 *
 * Hồ sơ minh họa (scripts/prepare-people.ts) chỉ có ích khi công ty chưa có
 * người thật để đưa lên. Khi đã có, chúng phải rời khỏi CMS chứ không chỉ rời
 * khỏi website: biên tập viên rất dễ nhầm một hồ sơ mẫu với người thật.
 *
 * Bản ghi tạo ra ở dạng NHÁP và chưa duyệt. Thiếu số thẻ luật sư, đoàn luật sư,
 * lĩnh vực phụ trách, ngôn ngữ làm việc và ảnh chân dung — những thứ chỉ công ty
 * cung cấp được. Vào /admin > Đội ngũ để nhập, rồi mới duyệt và xuất bản.
 *
 * Chạy lại nhiều lần không tạo bản trùng và không ghi đè nội dung đã sửa.
 *
 * `--refresh` nạp lại chức danh và tóm tắt từ scripts/content/lawyers.ts cho
 * những bản ghi còn ở dạng nháp chưa duyệt. Dùng khi công ty đính chính thông
 * tin đã cung cấp; bản đã duyệt hoặc đã xuất bản không bị đụng tới.
 *
 * `--publish` duyệt và xuất bản các hồ sơ này. Chỉ chạy khi công ty đã quyết
 * định đưa họ tên lên website. Nội dung công bố đúng bằng những gì công ty đã
 * xác nhận — họ tên, chức danh, vai trò — còn số thẻ luật sư, đoàn luật sư,
 * lĩnh vực phụ trách, ngôn ngữ làm việc và ảnh chân dung vẫn để trống cho tới
 * khi có. Thiếu thông tin thì trang hiển thị ít đi; bịa ra thì thành hồ sơ hành
 * nghề sai sự thật, nên không bao giờ điền thay.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { firmLawyers } from "./content/lawyers";

const refresh = process.argv.includes("--refresh");
const publish = process.argv.includes("--publish");
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

// Gỡ hồ sơ minh họa trước: để lại thì trang Đội ngũ ở chế độ demo trộn lẫn
// người thật với hồ sơ mẫu, đúng thứ dễ gây nhầm nhất.
const samples = await cms.find({
  collection: "lawyers",
  where: { isSample: { equals: true } },
  draft: true,
  pagination: false,
  depth: 0,
});
for (const doc of samples.docs)
  await cms.delete({ collection: "lawyers", id: doc.id, user: admin });
if (samples.docs.length)
  console.log(`da go ${samples.docs.length} ho so minh hoa.`);

let created = 0;
let updated = 0;
let published = 0;
let skipped = 0;
for (const lawyer of firmLawyers)
  for (const language of locales) {
    const current = await cms.find({
      collection: "lawyers",
      where: {
        and: [
          { slug: { equals: lawyer.slug } },
          { language: { equals: language } },
        ],
      },
      draft: true,
      limit: 1,
      depth: 0,
    });
    const found = current.docs[0] as Record<string, any> | undefined;
    if (found) {
      // Chỉ đính chính bản còn là nháp chưa duyệt. Bản đã duyệt hoặc đã xuất
      // bản là quyết định của công ty, script không ghi đè.
      const editable =
        found._status !== "published" && found.reviewState === "working";
      if (refresh && editable) {
        await cms.update({
          collection: "lawyers",
          id: found.id,
          user: admin,
          draft: true,
          data: {
            position: lawyer.position[language],
            summary: lawyer.summary[language],
            seo: { description: lawyer.summary[language] },
            _status: "draft",
          },
        });
        updated += 1;
        console.log("da cap nhat", lawyer.slug, language);
      } else if (publish && found._status !== "published") {
        await cms.update({
          collection: "lawyers",
          id: found.id,
          user: admin,
          data: { reviewState: "approved", _status: "published" },
        });
        published += 1;
        console.log("da xuat ban", lawyer.slug, language);
      } else skipped += 1;
      continue;
    }
    await cms.create({
      collection: "lawyers",
      user: admin,
      draft: true,
      data: {
        title: lawyer.name,
        slug: lawyer.slug,
        language,
        translationKey: lawyer.slug,
        position: lawyer.position[language],
        summary: lawyer.summary[language],
        seo: { description: lawyer.summary[language] },
        reviewState: "working",
        _status: "draft",
        isSample: false,
      },
    });
    created += 1;
    console.log("da tao", lawyer.slug, language);
  }

console.log(
  `\nTao moi: ${created}. Cap nhat: ${updated}. Xuat ban: ${published}. Bo qua: ${skipped}.\n` +
    "Cac ho so dang o dang NHAP. Truoc khi xuat ban, vao /admin > Doi ngu de nhap:\n" +
    "  - So the luat su va doan luat su (o 'Thong tin nghe nghiep da xac minh')\n" +
    "  - Linh vuc chuyen mon phu trach\n" +
    "  - Ngon ngu lam viec\n" +
    "  - Anh chan dung, kem quyen su dung anh\n" +
    "roi duyet chuyen mon va xuat ban.",
);
await cms.destroy();
process.exit(0);
