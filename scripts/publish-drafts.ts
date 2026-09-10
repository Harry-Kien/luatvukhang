/**
 * Duyệt và xuất bản hàng loạt bản nháp.
 *
 *   node --env-file=.env --import tsx scripts/publish-drafts.ts            # chỉ liệt kê
 *   node --env-file=.env --import tsx scripts/publish-drafts.ts --confirm  # thực sự xuất bản
 *
 * Mặc định chỉ liệt kê, không thay đổi gì. Cần cờ --confirm mới ghi.
 *
 * CHỈ CHẠY SAU KHI LUẬT SƯ CỦA CÔNG TY ĐÃ ĐỌC TỪNG BẢN NHÁP. Công cụ này rút
 * ngắn thao tác bấm chuột, không thay thế bước rà soát chuyên môn: nội dung
 * pháp lý xuất bản dưới tên công ty thì công ty chịu trách nhiệm.
 *
 * Bản ghi đánh dấu isSample không bao giờ được xuất bản.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const confirm = process.argv.includes("--confirm");
const COLLECTIONS = [
  "pages",
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
] as const;

const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin) throw Error("Cần có tài khoản quản trị trước.");

let count = 0;
for (const collection of COLLECTIONS) {
  const found = await cms.find({
    collection,
    where: {
      and: [
        { _status: { equals: "draft" } },
        { isSample: { not_equals: true } },
      ],
    },
    pagination: false,
    draft: true,
    depth: 0,
  });
  for (const doc of found.docs as Record<string, any>[]) {
    count += 1;
    console.log(
      `${confirm ? "xuat ban" : "se xuat ban"}  ${collection}/${doc.language}/${doc.slug}  —  ${doc.title}`,
    );
    if (!confirm) continue;
    // publicationGuard yêu cầu reviewState "approved" trước khi cho xuất bản.
    await cms.update({
      collection,
      id: doc.id,
      user: admin,
      data: { reviewState: "approved" },
      draft: true,
    });
    await cms.update({
      collection,
      id: doc.id,
      user: admin,
      data: { _status: "published" },
    });
  }
}

if (!count) console.log("Khong con ban nhap nao.");
else if (confirm)
  console.log(`\nDa xuat ban ${count} ban ghi.`);
else
  console.log(
    `\n${count} ban ghi dang o trang thai nhap.\n` +
      "Doc lai tung ban trong /admin, sau do chay lai voi --confirm de xuat ban.",
  );
process.exit(0);
