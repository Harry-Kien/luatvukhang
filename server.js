/**
 * Điểm khởi động cho hosting chạy Node.js qua Passenger (cPanel — "Setup Node.js
 * App", và các môi trường tương đương).
 *
 * Vì sao cần: những môi trường đó không chạy `npm start` mà nạp thẳng một tệp
 * JavaScript và tự quản lý vòng đời tiến trình, nên `next start` không cắm vào
 * được. Tệp này dựng máy chủ HTTP của Next bằng mã, đúng cách Next tài liệu hóa.
 *
 * Trên VPS và trong Docker thì KHÔNG dùng tệp này — ở đó `npm start` chạy thẳng
 * `next start`, vốn nhẹ hơn và được Next hỗ trợ đầy đủ hơn. Xem docs/DEPLOY-VPS.md.
 *
 * Chạy thử tại chỗ:  node server.js
 */
import { createServer } from "node:http";
import next from "next";

// Passenger không nạp tệp .env; Next chỉ nạp env của riêng nó sau khi đã khởi
// tạo, mà DATABASE_URL cần có trước đó. Nạp sớm ở đây, bỏ qua nếu hosting đã
// khai biến môi trường trong bảng điều khiển.
try {
  process.loadEnvFile();
} catch {
  // Không có tệp .env là bình thường khi biến môi trường khai ở nơi khác.
}

const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

if (!process.env.DATABASE_URL)
  console.warn(
    "Chua co DATABASE_URL. Website se chay nhung khong doc duoc noi dung.",
  );

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();
createServer((req, res) => {
  handle(req, res);
}).listen(port, () => {
  console.log(
    `San sang tren cong ${port} (${dev ? "development" : "production"})`,
  );
});
