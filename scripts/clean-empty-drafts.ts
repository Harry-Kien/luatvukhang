/**
 * Xóa bản nháp rỗng do tính năng tự lưu của CMS để lại.
 *
 *   node --env-file=.env --import tsx scripts/clean-empty-drafts.ts
 *   node --env-file=.env --import tsx scripts/clean-empty-drafts.ts --list
 *
 * Payload tự lưu bản nháp sau mỗi 700ms kể từ lúc mở màn hình soạn thảo. Mở
 * "Viết bài mới" rồi đổi ý thoát ra là đã có một bản ghi không tiêu đề, không
 * đường dẫn nằm lại. Payload không có tùy chọn hoãn việc tạo bản ghi tới khi
 * người dùng nhập gì đó, nên phải dọn.
 *
 * Bản ghi bị xóa phải KHÔNG có cả tiêu đề lẫn đường dẫn: thiếu cả hai thì nó
 * không thể xuất bản, không thể mở bằng đường dẫn nào, và không mang nội dung
 * nào để mất. Chỉ thiếu một trong hai thì giữ lại — đó có thể là bài ai đó đang
 * viết dở.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const listOnly = process.argv.includes("--list");
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
let removed = 0;
for (const collection of COLLECTIONS) {
  const { docs } = await cms.find({
    collection,
    draft: true,
    pagination: false,
    depth: 0,
  });
  for (const doc of docs as Record<string, any>[]) {
    const blank =
      !String(doc.title ?? "").trim() && !String(doc.slug ?? "").trim();
    if (!blank) continue;
    if (listOnly) {
      console.log(`${collection}#${doc.id} tao luc ${doc.createdAt}`);
      removed += 1;
      continue;
    }
    await cms.delete({ collection, id: doc.id });
    console.log(`da xoa ${collection}#${doc.id}`);
    removed += 1;
  }
}
console.log(
  listOnly
    ? `\n${removed} ban nhap rong. Chay lai khong kem --list de xoa.`
    : `\nDa xoa ${removed} ban nhap rong.`,
);
await cms.destroy();
process.exit(0);
