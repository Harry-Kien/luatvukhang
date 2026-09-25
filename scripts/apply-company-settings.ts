/**
 * Điền thông tin pháp nhân đã xác nhận vào Cài đặt, chỉ ở ô còn trống.
 *
 *   node --env-file=.env --import tsx scripts/apply-company-settings.ts
 *
 * Vì sao cần: địa chỉ, email và tên tiếng Anh được xác nhận ngày 19/09/2026 và
 * ghi bằng set-contact.ts — nhưng chỉ vào cơ sở dữ liệu của máy chạy lệnh. Máy
 * chủ thật không bao giờ nhận được, nên trang Liên hệ của website chỉ hiện số
 * điện thoại. Đặt script này trong chuỗi nạp nội dung thì mỗi lần cập nhật
 * hosting, ô còn trống được điền từ scripts/content/company.ts.
 *
 * Ô đã có giá trị được giữ nguyên, kể cả khi khác tệp: công ty sửa trong
 * /admin là bản đúng. Muốn ghi đè có chủ đích thì dùng set-contact.ts.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { confirmedCompany } from "./content/company";

const cms = await getPayload({ config });
const current = (await cms.findGlobal({
  slug: "site-settings",
})) as unknown as Record<string, unknown>;
const data: Record<string, string> = {};
for (const [field, value] of Object.entries(confirmedCompany))
  if (!String(current[field] ?? "").trim()) data[field] = value;

if (Object.keys(data).length) {
  await cms.updateGlobal({ slug: "site-settings", data });
  for (const [field, value] of Object.entries(data))
    console.log("da dien", field, "=", value);
} else console.log("Cai dat da du thong tin da xac nhan.");
await cms.destroy();
process.exit(0);
