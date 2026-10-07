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
 * Bản ghi tạo ra ở dạng NHÁP và chưa duyệt, trừ hồ sơ khai `publishOnCreate`
 * (công ty đã quyết định đưa người đó lên website) — tạo thẳng ở trạng thái
 * xuất bản.
 *
 * Chạy lại nhiều lần không tạo bản trùng và không ghi đè nội dung đã sửa. Khi
 * công ty đính chính thông tin trong scripts/content/lawyers.ts, ô nào trên CMS
 * còn nguyên giá trị nạp lần trước (content/lawyers-2026-09.json) được cập nhật
 * theo; ô đã sửa tay thì giữ. Lĩnh vực phụ trách (`services`) được gắn vào hồ
 * sơ chưa có lĩnh vực nào.
 *
 * Ảnh chân dung khai trong scripts/content/lawyers.ts (ô `portrait`) được tải
 * lên thư viện ảnh và gắn vào hồ sơ chưa có ảnh, kể cả hồ sơ đã xuất bản.
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
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { firmLawyers, type Localised } from "./content/lawyers";

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

/**
 * Giá trị đã nạp ở lần trước (bản 25/09/2026). Ô nào trên CMS còn đúng bằng giá
 * trị này nghĩa là chưa ai sửa tay, nên được đính chính theo lawyers.ts mà
 * không cần cờ --refresh. Ô công ty đã tự sửa thì giữ nguyên.
 */
const previous: Record<
  string,
  Record<"position" | "summary" | "qualifications", Localised>
> = JSON.parse(
  readFileSync(
    new URL("./content/lawyers-2026-09.json", import.meta.url),
    "utf8",
  ),
);

/** id lĩnh vực cùng ngôn ngữ, giữ đúng thứ tự công ty nêu. */
async function serviceIds(slugs: string[] | undefined, language: string) {
  if (!slugs?.length) return [];
  const found = await cms.find({
    collection: "services",
    where: {
      and: [{ slug: { in: slugs } }, { language: { equals: language } }],
    },
    draft: true,
    pagination: false,
    depth: 0,
  });
  return slugs
    .map((slug) => found.docs.find((doc) => doc.slug === slug)?.id)
    .filter((id): id is number => id !== undefined);
}

const same = (a: unknown, b: unknown) =>
  String(a ?? "").trim() === String(b ?? "").trim();

let created = 0;
let updated = 0;
let published = 0;
let skipped = 0;
for (const lawyer of firmLawyers)
  for (const language of locales) {
    const seoDescription = (lawyer.seoDescription ?? lawyer.summary)[language];
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
      let live = found._status === "published";
      if (publish && !live) {
        await cms.update({
          collection: "lawyers",
          id: found.id,
          user: admin,
          data: { reviewState: "approved", _status: "published" },
        });
        live = true;
        published += 1;
        console.log("da xuat ban", lawyer.slug, language);
      }
      const data: Record<string, unknown> = {};
      const before = previous[lawyer.slug];
      for (const key of ["position", "summary", "qualifications"] as const) {
        const next = lawyer[key][language];
        if (same(found[key], next)) continue;
        if (refresh || (before && same(found[key], before[key][language])))
          data[key] = next;
      }
      if (
        !same(found.seo?.description, seoDescription) &&
        (refresh ||
          (before && same(found.seo?.description, before.summary[language])))
      )
        data.seo = { ...(found.seo ?? {}), description: seoDescription };
      if (refresh && found.role !== lawyer.role) data.role = lawyer.role;
      // Lĩnh vực chỉ gắn khi hồ sơ chưa có: lĩnh vực công ty tự chọn được giữ.
      if (!found.services?.length) {
        const ids = await serviceIds(lawyer.services, language);
        if (ids.length) data.services = ids;
      }
      if (!Object.keys(data).length) {
        skipped += 1;
        continue;
      }
      // Giữ nguyên trạng thái: bản đang chạy vẫn chạy sau khi đính chính,
      // không âm thầm tụt về nháp và biến mất khỏi website.
      await cms.update({
        collection: "lawyers",
        id: found.id,
        user: admin,
        draft: !live,
        data: { ...data, ...(live ? { _status: "published" } : {}) },
      });
      updated += 1;
      console.log(
        "da cap nhat",
        lawyer.slug,
        language,
        Object.keys(data).join(", "),
      );
      continue;
    }
    const live = publish || lawyer.publishOnCreate === true;
    await cms.create({
      collection: "lawyers",
      user: admin,
      draft: !live,
      data: {
        title: lawyer.name,
        slug: lawyer.slug,
        language,
        translationKey: lawyer.slug,
        position: lawyer.position[language],
        role: lawyer.role,
        summary: lawyer.summary[language],
        qualifications: lawyer.qualifications[language],
        services: await serviceIds(lawyer.services, language),
        seo: { description: seoDescription },
        reviewState: live ? "approved" : "working",
        _status: live ? "published" : "draft",
        isSample: false,
      },
    });
    created += 1;
    console.log(live ? "da tao va xuat ban" : "da tao", lawyer.slug, language);
  }

// Ảnh chân dung công ty đã cung cấp. Chỉ gắn vào hồ sơ CHƯA có ảnh: ảnh công
// ty tự chọn trong CMS không bị thay. Tệp được tải lên thư viện ảnh một lần rồi
// dùng chung cho cả ba ngôn ngữ. Hồ sơ đã xuất bản vẫn ở trạng thái xuất bản.
let portraits = 0;
for (const lawyer of firmLawyers) {
  if (!lawyer.portrait) continue;
  const records = (
    await cms.find({
      collection: "lawyers",
      where: { slug: { equals: lawyer.slug } },
      draft: true,
      pagination: false,
      depth: 0,
    })
  ).docs as Record<string, any>[];
  const missing = records.filter((record) => !record.portrait);
  if (!missing.length) continue;
  const existing = (
    await cms.find({
      collection: "media",
      where: { filename: { equals: lawyer.portrait.file } },
      limit: 1,
      depth: 0,
    })
  ).docs[0];
  const media =
    existing ??
    (await cms.create({
      collection: "media",
      user: admin,
      filePath: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "content/portraits",
        lawyer.portrait.file,
      ),
      data: {
        alt: lawyer.portrait.alt,
        credit: lawyer.portrait.credit,
        rights: lawyer.portrait.rights,
      },
    }));
  for (const record of missing) {
    const live = record._status === "published";
    await cms.update({
      collection: "lawyers",
      id: record.id,
      user: admin,
      draft: !live,
      data: { portrait: media.id, ...(live ? { _status: "published" } : {}) },
    });
    portraits += 1;
    console.log("da gan anh chan dung", lawyer.slug, record.language);
  }
}

console.log(
  `\nTao moi: ${created}. Cap nhat: ${updated}. Xuat ban: ${published}. Gan anh: ${portraits}. Bo qua: ${skipped}.\n` +
    "Cac ho so dang o dang NHAP. Truoc khi xuat ban, vao /admin > Doi ngu de nhap:\n" +
    "  - So the luat su va doan luat su (o 'Thong tin nghe nghiep da xac minh')\n" +
    "  - Linh vuc chuyen mon phu trach\n" +
    "  - Ngon ngu lam viec\n" +
    "  - Anh chan dung, kem quyen su dung anh\n" +
    "roi duyet chuyen mon va xuat ban.",
);
await cms.destroy();
process.exit(0);
