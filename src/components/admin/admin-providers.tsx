import type { ReactNode } from "react";
import { emailConfigured } from "@/cms/email";
import { PasswordReveal } from "./password-reveal";

/**
 * Lớp bọc toàn bộ trang quản trị (kể cả trang đăng nhập, quên mật khẩu).
 * Chạy trên máy chủ để đọc được cấu hình gửi thư, rồi chuyển cho phần chạy
 * trên trình duyệt.
 */
export function AdminProviders({ children }: { children?: ReactNode }) {
  return (
    <PasswordReveal emailConfigured={emailConfigured()}>
      {children}
    </PasswordReveal>
  );
}
