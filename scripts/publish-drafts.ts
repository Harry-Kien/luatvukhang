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
 *
 * Trang Quyền riêng tư và Điều khoản chỉ được xuất bản khi Cài đặt đã bật
 * "Chính sách quyền riêng tư đã được rà soát". Khi chưa xuất bản, website hiển
 * thị bản dự thảo kèm nhãn "Dự thảo — chưa có hiệu lực áp dụng"; xuất bản sớm
 * sẽ gỡ mất nhãn đó và trình bày một chính sách chưa qua rà soát như thể đã có
 * hiệu lực.
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
const settings = (await cms.findGlobal({ slug: "site-settings" })) as {
  privacyApproved?: boolean | null;
};
/** Trang có hiệu lực pháp lý, cần cờ duyệt riêng chứ không chỉ duyệt nội dung. */
const POLICY_PAGES = ["privacy", "terms"];
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin) throw Error("Cần có tài khoản quản trị trước.");

let count = 0;
let held = 0;
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
    if (
      collection === "pages" &&
      POLICY_PAGES.includes(doc.slug) &&
      !settings.privacyApproved
    ) {
      held += 1;
      console.log(
        `giu lai   pages/${doc.language}/${doc.slug}  —  chua bat co da ra soat chinh sach`,
      );
      continue;
    }
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

if (held)
  console.log(
    `\n${held} trang chinh sach duoc giu o trang thai nhap. ` +
      "Bat 'Chinh sach quyen rieng tu da duoc ra soat' trong Cai dat cua " +
      "/admin sau khi luat su ra soat, roi chay lai.",
  );
if (!count) console.log("Khong con ban nhap nao de xuat ban.");
else if (confirm)
  console.log(`\nDa xuat ban ${count} ban ghi.`);
else
  console.log(
    `\n${count} ban ghi dang o trang thai nhap.\n` +
      "Doc lai tung ban trong /admin, sau do chay lai voi --confirm de xuat ban.",
  );
process.exit(0);
