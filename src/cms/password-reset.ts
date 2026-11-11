import { APIError, type CollectionBeforeOperationHook } from "payload";
import { emailConfigured } from "./email";

/**
 * "Quên mật khẩu" ở trang đăng nhập quản trị.
 *
 * Payload gửi thư có đường dẫn đặt lại mật khẩu. Website chưa khai hộp thư gửi
 * (SMTP) thì không gửi được, và Payload chỉ báo "Đã xảy ra lỗi" — người dùng
 * không biết làm gì tiếp. Ở đây báo rõ lý do và cách lấy lại quyền vào.
 */
export const RESET_LINK_HOURS = 1;

export const EMAIL_NOT_CONFIGURED_MESSAGE =
  "Website chưa cấu hình hộp thư gửi đi (SMTP) nên chưa gửi được thư đặt lại mật khẩu. " +
  "Người quản lý hosting có thể đặt lại mật khẩu bằng lệnh scripts/reset-admin-password.ts " +
  "(xem docs/DEPLOY-HOSTING-CPANEL.md, mục Quên tài khoản hoặc mật khẩu quản trị).";

/** Chặn trước khi tạo mã đặt lại, để không sinh mã thừa và báo lỗi dễ hiểu. */
export const refuseForgotPasswordWithoutEmail: CollectionBeforeOperationHook =
  ({ operation, args }) => {
    // disableEmail: mã do máy chủ tự tạo, không cần gửi thư.
    if (
      operation !== "forgotPassword" ||
      emailConfigured() ||
      (args as { disableEmail?: boolean }).disableEmail
    )
      return args;
    // Cùng một thông báo cho mọi email: không để lộ email nào có tài khoản.
    const error = new APIError(EMAIL_NOT_CONFIGURED_MESSAGE, 503, {}, true);
    // Tên lớp có thể bị rút gọn khi đóng gói; Payload dựa vào tên để trả thông điệp.
    error.name = "APIError";
    throw error;
  };

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

/** Thư tiếng Việt thay cho thư mặc định của Payload. */
export function resetPasswordEmail({
  serverURL,
  adminRoute,
  token,
  name,
}: {
  serverURL: string;
  adminRoute: string;
  token: string;
  name?: string | null;
}) {
  const link = `${serverURL.replace(/\/+$/, "")}${adminRoute}/reset/${encodeURIComponent(token)}`;
  const greeting = name?.trim()
    ? `Chào ${escapeHtml(name.trim())},`
    : "Chào bạn,";
  const subject = "Đặt lại mật khẩu trang quản trị Luật Vũ Khang";
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1c2738;max-width:560px">
<p>${greeting}</p>
<p>Có yêu cầu đặt lại mật khẩu cho tài khoản quản trị website luatvukhang.com của bạn. Bấm nút dưới đây để đặt mật khẩu mới:</p>
<p style="margin:24px 0"><a href="${escapeHtml(link)}" style="background:#c8283f;color:#ffffff;text-decoration:none;padding:12px 22px;display:inline-block;font-weight:bold">Đặt mật khẩu mới</a></p>
<p>Hoặc mở đường dẫn: <br><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
<p>Đường dẫn chỉ dùng được một lần và hết hạn sau ${RESET_LINK_HOURS} giờ.</p>
<p>Nếu bạn không yêu cầu, hãy bỏ qua thư này — mật khẩu hiện tại vẫn giữ nguyên.</p>
<p style="color:#6b7686;font-size:13px">Công ty Luật TNHH Vũ Khang Solutions &amp; Partners</p>
</div>`;
  return { subject, html, link };
}
