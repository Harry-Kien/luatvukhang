/**
 * Nạp biến từ tệp .env nếu có, KHÔNG ghi đè biến đã có sẵn.
 *
 * Trên hosting, biến môi trường thường khai trong cPanel → Setup Node.js App và
 * có sẵn sau lệnh `source ~/nodevenv/.../activate`; có nơi lại để trong .env.
 * Nạp kiểu này để lệnh chạy được cả hai cách, không cần cờ --env-file (cờ đó
 * báo lỗi ngay khi thiếu tệp .env).
 *
 * Phải được import ĐẦU TIÊN, trước payload.config: cấu hình đọc biến lúc nạp.
 */
import { existsSync, readFileSync } from "node:fs";

if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(
      /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/,
    );
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2];
    const quoted = value.match(/^(["'])(.*)\1$/);
    value = quoted ? quoted[2] : value.replace(/\s+#.*$/, "");
    process.env[match[1]] = value;
  }
}
