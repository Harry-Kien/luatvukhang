/**
 * Xóa bản ghi QA còn sót lại khi bộ kiểm thử bị ngắt giữa chừng.
 *
 * Các test tạo bản ghi có slug bắt đầu bằng "qa-" rồi tự xóa ở bước cuối. Nếu
 * lần chạy bị dừng đột ngột, bản ghi ở lại và website coi đó là nội dung thật,
 * làm hỏng những lần chạy sau.
 *
 *   node --env-file=.env --import tsx scripts/clean-qa-records.ts
 */
import { getPayload } from "payload";
import config from "@payload-config";

const COLLECTIONS = [
  "services",
  "lawyers",
  "articles",
  "experience",
  "industries",
  "careers",
  "offices",
] as const;

const cms = await getPayload({ config });
let removed = 0;
for (const collection of COLLECTIONS) {
  const found = await cms.find({
    collection,
    where: { slug: { like: "qa-" } },
    pagination: false,
    depth: 0,
  });
  for (const doc of found.docs) {
    const slug = String((doc as { slug?: string }).slug ?? "");
    // Kiểm tra lại tiền tố: "like" khớp cả chuỗi nằm giữa slug.
    if (!slug.startsWith("qa-")) continue;
    await cms.delete({ collection, id: doc.id });
    console.log("đã xóa", collection, slug);
    removed += 1;
  }
}
console.log(removed ? `Tổng cộng ${removed} bản ghi.` : "Không có bản ghi QA nào.");
process.exit(0);
