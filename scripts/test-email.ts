/**
 * Gửi một thư thử để kiểm tra hộp thư gửi đi (SMTP) đã khai đúng chưa. Cần
 * cho "Quên mật khẩu" ở trang quản trị và thư báo yêu cầu tư vấn mới.
 *
 *   node --import tsx scripts/test-email.ts               # gửi tới NOTIFICATION_EMAIL hoặc SMTP_FROM
 *   node --import tsx scripts/test-email.ts ten@email.com # gửi tới địa chỉ khác
 *
 * Không in mật khẩu hộp thư ra màn hình.
 */
import "./load-env";
import nodemailer from "nodemailer";

const env = process.env;
const missing = ["SMTP_HOST", "SMTP_FROM", "SMTP_USER", "SMTP_PASSWORD"].filter(
  (name) => !env[name]?.trim(),
);
if (missing.length) {
  console.error(
    `Chưa khai: ${missing.join(", ")}.\n` +
      "Vào cPanel → Setup Node.js App → Environment variables, thêm các biến này rồi Restart.\n" +
      "Nếu dùng tệp .env thì kiểm tra lại tệp .env trong thư mục website.",
  );
  process.exit(1);
}

const to = process.argv[2]?.trim() || env.NOTIFICATION_EMAIL || env.SMTP_FROM!;
const port = Number(env.SMTP_PORT || 587);
const transport = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port,
  secure: port === 465,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});

console.log(
  `Máy chủ gửi: ${env.SMTP_HOST}:${port} · tài khoản: ${env.SMTP_USER} · gửi tới: ${to}`,
);
try {
  await transport.verify();
  const info = await transport.sendMail({
    from: env.SMTP_FROM,
    to,
    subject: "Thư thử từ website luatvukhang.com",
    text:
      "Hộp thư gửi đi của website đã hoạt động.\n" +
      'Từ nay "Quên mật khẩu" ở trang quản trị và thư báo yêu cầu tư vấn mới gửi được.',
  });
  console.log(
    `ĐÃ GỬI. Mã thư: ${info.messageId}. Kiểm tra hộp thư ${to} (cả mục Spam).`,
  );
  process.exit(0);
} catch (error) {
  const err = error as {
    code?: string;
    responseCode?: number;
    message?: string;
  };
  console.error(`GỬI KHÔNG ĐƯỢC: ${err.message}`);
  if (err.code === "EAUTH" || err.responseCode === 535)
    console.error(
      "→ Sai tài khoản hoặc mật khẩu hộp thư. Với Gmail phải dùng MẬT KHẨU ỨNG DỤNG 16 ký tự " +
        "(Tài khoản Google → Bảo mật → Xác minh 2 bước → Mật khẩu ứng dụng), không dùng mật khẩu đăng nhập Gmail.",
    );
  else if (
    ["ETIMEDOUT", "ECONNECTION", "ECONNREFUSED", "ESOCKET"].includes(
      err.code ?? "",
    )
  )
    console.error(
      "→ Không kết nối được máy chủ gửi. Thử SMTP_PORT=465 (hoặc 587); một số hosting chặn cổng ra ngoài — khi đó dùng hộp thư của chính hosting (mail.luatvukhang.com).",
    );
  process.exit(1);
}
