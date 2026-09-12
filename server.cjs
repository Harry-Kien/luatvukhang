/**
 * Điểm khởi động cho hosting chạy Node.js qua Passenger (cPanel — "Setup Node.js
 * App", và các môi trường tương đương).
 *
 * Vì sao cần: những môi trường đó không chạy `npm start` mà nạp thẳng một tệp
 * JavaScript và tự quản lý vòng đời tiến trình, nên `next start` không cắm vào
 * được. Tệp này dựng máy chủ HTTP của Next bằng mã, đúng cách Next tài liệu hóa.
 *
 * Vì sao đuôi `.cjs` chứ không phải `.js`:
 *
 *   `package.json` khai `"type": "module"`, nên mọi tệp `.js` trong dự án là ES
 *   module. Passenger NẠP tệp khởi động bằng `require()` chứ không chạy nó như
 *   một chương trình, và `require()` một ES module thì:
 *     - Node 20: hỏng hẳn — ERR_REQUIRE_ESM;
 *     - Node 22 trở lên: chỉ chạy được nếu module không có `await` ở cấp cao
 *       nhất, mà `await app.prepare()` chính là thứ đó — ERR_REQUIRE_ASYNC_MODULE.
 *
 *   Đuôi `.cjs` buộc tệp này là CommonJS, nên `require()` nạp được ở mọi phiên
 *   bản Node. Đây không phải chuyện thẩm mỹ: bản `.js` trước đây khởi động được
 *   bằng `node server.js` — nên CI vẫn xanh — nhưng Passenger thì không bao giờ
 *   nạp nổi, và triệu chứng ngoài mặt chỉ là website không lên.
 *
 * Trên VPS và trong Docker thì KHÔNG dùng tệp này — ở đó `npm start` chạy thẳng
 * `next start`, vốn nhẹ hơn và được Next hỗ trợ đầy đủ hơn. Xem docs/DEPLOY-VPS.md.
 *
 * Chạy thử tại chỗ:  node server.cjs
 */

const { createServer } = require("node:http");

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

// Next xuất bản kèm cả hai dạng module; lấy đúng hàm dù bản dựng nào.
const nextModule = require("next");
const next = nextModule.default || nextModule;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Không dùng `await` ở cấp cao nhất — xem chú thích đầu tệp.
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(
        `San sang tren cong ${port} (${dev ? "development" : "production"})`,
      );
    });
  })
  .catch((error) => {
    // Passenger chỉ hiện "Error starting application"; in nguyên nhân ra log để
    // còn biết đường sửa.
    console.error("Khong khoi dong duoc may chu:", error);
    process.exit(1);
  });
