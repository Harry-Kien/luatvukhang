/**
 * Ghi thông tin liên hệ đã được công ty xác nhận vào Cài đặt.
 *
 *   node --env-file=.env --import tsx scripts/set-contact.ts --phone "0832270898"
 *   node --env-file=.env --import tsx scripts/set-contact.ts --email a@b.vn --address "..."
 *
 * Chỉ ghi đúng những trường được truyền vào; trường không nhắc tới giữ nguyên.
 * Số điện thoại đồng thời là đầu mối Zalo trên website, nên đổi ở đây là cả nút
 * gọi lẫn nút Zalo đổi theo.
 *
 * Đây là dữ liệu thật của doanh nghiệp: chỉ nhập giá trị công ty đã xác nhận,
 * không đặt số minh họa.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { contactChannels } from "../src/lib/contact";

const FIELDS = [
  "phone",
  "email",
  "address",
  "companyName",
  "englishName",
  "registration",
] as const;

const args = process.argv.slice(2);
const data: Record<string, string> = {};
for (const field of FIELDS) {
  const at = args.indexOf("--" + field);
  if (at >= 0 && args[at + 1] && !args[at + 1].startsWith("--"))
    data[field] = args[at + 1].trim();
}
if (!Object.keys(data).length) {
  console.log(
    "Khong co gi de ghi. Vi du:\n" +
      '  node --env-file=.env --import tsx scripts/set-contact.ts --phone "0832270898"\n' +
      "Truong ho tro: " +
      FIELDS.join(", "),
  );
  process.exit(1);
}
// Số sai định dạng sẽ khiến website ẩn nút gọi mà không báo lỗi; chặn ngay đây.
if (data.phone && !contactChannels(data.phone)) {
  console.error(
    `So dien thoai khong hop le: "${data.phone}". Can 9-12 chu so, vi du 0832270898.`,
  );
  process.exit(1);
}

const cms = await getPayload({ config });
await cms.updateGlobal({ slug: "site-settings", data });
for (const [field, value] of Object.entries(data))
  console.log("da ghi", field, "=", value);
if (data.phone) {
  const channels = contactChannels(data.phone)!;
  console.log("  goi:  tel:" + channels.tel);
  console.log("  zalo: " + channels.zalo);
}
await cms.destroy();
process.exit(0);
