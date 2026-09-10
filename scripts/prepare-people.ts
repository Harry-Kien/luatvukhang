/**
 * Nạp hồ sơ nhân sự MINH HỌA cho trang Đội ngũ, ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-people.ts
 *
 * Vì sao cần: trang Đội ngũ trống thì công ty không thấy được bố cục, bộ lọc
 * chuyên môn hay trang chi tiết trông ra sao. Script tạo sẵn bộ hồ sơ để sửa
 * trực tiếp trong /admin thay vì phải dựng từ đầu.
 *
 * An toàn: mọi bản ghi mang cờ `isSample`. Hệ thống chặn xuất bản nội dung
 * minh họa (publicationGuard), website chỉ hiển thị khi còn ở chế độ demo và
 * luôn kèm nhãn, còn `release:check` vẫn coi trang Đội ngũ là chưa có nội dung
 * thật. Muốn dùng làm hồ sơ thật thì phải nhập thông tin đã xác minh rồi bỏ
 * đánh dấu "Nội dung minh họa" trong CMS.
 *
 * Chạy lại nhiều lần không tạo bản trùng và không ghi đè bản đã sửa.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import { samplePeople, qualificationsPlaceholder } from "./content/people";

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
const missingServices = new Set<string>();

for (const person of samplePeople)
  for (const language of locales) {
    const exists = await cms.count({
      collection: "lawyers",
      where: {
        and: [
          { slug: { equals: person.slug } },
          { language: { equals: language } },
        ],
      },
    });
    if (exists.totalDocs) {
      skipped += 1;
      continue;
    }
    // Quan hệ chuyên môn phải trỏ tới bản dịch cùng ngôn ngữ, nếu không bộ lọc
    // trên trang Đội ngũ sẽ không khớp.
    const serviceIds: number[] = [];
    for (const slug of person.serviceSlugs) {
      const found = await cms.find({
        collection: "services",
        where: {
          and: [{ slug: { equals: slug } }, { language: { equals: language } }],
        },
        draft: true,
        limit: 1,
        depth: 0,
      });
      if (found.docs[0]) serviceIds.push(found.docs[0].id);
      else missingServices.add(`${slug}/${language}`);
    }
    await cms.create({
      collection: "lawyers",
      user: admin,
      draft: true,
      data: {
        title: person.name,
        slug: person.slug,
        language,
        translationKey: person.slug,
        position: person.position[language],
        summary: person.summary[language],
        languages: person.languages[language],
        // Không dựng số thẻ luật sư giả: để lại đúng việc công ty phải làm.
        qualifications: qualificationsPlaceholder[language],
        services: serviceIds,
        blocks: person.sections.map((section) => ({
          blockType: "callout" as const,
          visible: true,
          heading: section.heading[language],
          body: section.body[language],
        })),
        seo: { description: person.summary[language].slice(0, 155) },
        reviewState: "working",
        _status: "draft",
        isSample: true,
      },
    });
    created += 1;
    console.log("da tao", person.slug, language);
  }

if (missingServices.size)
  console.log(
    "\nChua tim thay chuyen mon de lien ket: " +
      [...missingServices].join(", ") +
      "\nChay scripts/prepare-practice-areas.ts truoc roi chay lai.",
  );
console.log(
  `\nTao moi: ${created} ho so. Bo qua vi da co: ${skipped}.\n` +
    "Tat ca deu la HO SO MINH HOA (isSample) va khong the xuat ban.\n" +
    "Vao /admin > Doi ngu de sua. Muon dung that: nhap thong tin da xac minh,\n" +
    "bo danh dau 'Noi dung minh hoa', duyet chuyen mon roi xuat ban.",
);
process.exit(0);
