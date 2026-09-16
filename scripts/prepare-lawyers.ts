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
 * `--refresh` nạp lại chức danh, tóm tắt và thông tin nghề nghiệp từ
 * scripts/content/lawyers.ts, kể cả cho bản đã xuất bản — bản đã xuất bản thì
 * vẫn ở trạng thái xuất bản sau khi ghi. Dùng khi công ty đính chính thông tin
 * đã cung cấp.
 *
 * Cờ này GHI ĐÈ ba ô đó. Nếu ai đó đã sửa tay chúng trong CMS thì phần sửa mất,
 * nên chỉ chạy khi chính scripts/content/lawyers.ts mới là bản đúng.
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
      const live = found._status === "published";
      if (refresh) {
        // Giữ nguyên trạng thái: bản đang chạy vẫn chạy sau khi đính chính,
        // không âm thầm tụt về nháp và biến mất khỏi website.
        await cms.update({
          collection: "lawyers",
          id: found.id,
          user: admin,
          draft: !live,
          data: {
            position: lawyer.position[language],
            role: lawyer.role,
            summary: lawyer.summary[language],
            qualifications: lawyer.qualifications[language],
            seo: {
              ...((found.seo ?? {}) as Record<string, unknown>),
              description: lawyer.summary[language],
            },
            _status: live ? "published" : "draft",
          },
        });
        updated += 1;
        console.log("da cap nhat", lawyer.slug, language);
      } else if (publish && !live) {
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
        role: lawyer.role,
        summary: lawyer.summary[language],
        qualifications: lawyer.qualifications[language],
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
