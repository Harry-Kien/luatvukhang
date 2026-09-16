/**
 * Nạp toàn bộ nội dung nền theo đúng thứ tự.
 *
 *   node --env-file=.env scripts/seed-content.mjs
 *   npm run seed:content
 *
 * Dùng cho CI và cho máy cá nhân. Trên hosting thì hosting-setup.mjs gọi cùng
 * danh sách này, kèm theo các bước riêng của hosting (migrate, bảng hạn mức,
 * tài khoản quản trị).
 *
 * Mọi script trong danh sách đều chỉ điền ô đang trống và chạy lại được nhiều
 * lần mà không tạo bản trùng.
 */
import { execFileSync } from "node:child_process";
import { CONTENT_SCRIPTS } from "./content-scripts.mjs";

if (!process.env.DATABASE_URL) {
  console.error(
    "Thieu DATABASE_URL. Chay bang: node --env-file=.env scripts/seed-content.mjs",
  );
  process.exit(1);
}

for (const script of CONTENT_SCRIPTS) {
  console.log(`\n=== ${script} ===`);
  execFileSync("node", ["--import", "tsx", `scripts/${script}`], {
    stdio: "inherit",
    env: process.env,
  });
}
console.log(`\nDa chay ${CONTENT_SCRIPTS.length} script noi dung.`);
