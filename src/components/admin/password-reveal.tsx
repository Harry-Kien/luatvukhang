"use client";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Nút con mắt xem/ẩn mật khẩu cho mọi ô mật khẩu của trang quản trị: đăng
 * nhập, đặt lại mật khẩu, tạo tài khoản, đổi mật khẩu ở trang Tài khoản.
 *
 * Payload không có tùy chọn này và các ô đó không phải trường cấu hình được,
 * nên gắn nút từ bên ngoài: theo dõi trang, gặp ô mật khẩu mới thì thêm nút.
 */
const EYE =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5.1-5.9M9.9 5.2A9.6 9.6 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M2 2l20 20"/></svg>';
const SHOW = "Hiện mật khẩu";
const HIDE = "Ẩn mật khẩu";

const buttons = new Map<HTMLInputElement, HTMLButtonElement>();

function render(button: HTMLButtonElement, visible: boolean) {
  button.innerHTML = visible ? EYE_OFF : EYE;
  button.setAttribute("aria-label", visible ? HIDE : SHOW);
  button.setAttribute("aria-pressed", String(visible));
  button.title = visible ? HIDE : SHOW;
}

function attach(input: HTMLInputElement) {
  if (buttons.has(input) || !input.parentElement) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "password-reveal";
  render(button, false);
  button.addEventListener("mousedown", (event) => event.preventDefault());
  button.addEventListener("click", () => {
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    render(button, visible);
    input.focus();
  });
  input.classList.add("password-reveal-input");
  input.parentElement.classList.add("password-reveal-wrap");
  input.insertAdjacentElement("afterend", button);
  buttons.set(input, button);
}

function scan() {
  // Ô đã chuyển sang hiện chữ có type="text" nên chỉ cần tìm ô chưa gắn nút.
  document
    .querySelectorAll<HTMLInputElement>('input[type="password"]')
    .forEach(attach);
  for (const [input, button] of buttons) {
    if (!input.isConnected) {
      button.remove();
      buttons.delete(input);
    }
  }
}

const STYLE = `
.password-reveal-wrap { position: relative; }
.password-reveal-input { padding-right: 44px !important; }
.password-reveal {
  position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
  width: 34px; height: 34px; display: inline-flex; align-items: center;
  justify-content: center; padding: 0; border: 0; border-radius: 4px;
  background: transparent; color: var(--theme-elevation-500, #6b7686);
  cursor: pointer;
}
.password-reveal:hover { color: var(--theme-elevation-800, #1c2738); }
.password-reveal:focus-visible {
  outline: 2px solid var(--theme-success-500, #2f6fde); outline-offset: 1px;
}
`;

/**
 * Trang "Quên mật khẩu" của Payload luôn báo "đã gửi thư" — cố ý, để người lạ
 * không dò được email nào có tài khoản. Khi website chưa khai hộp thư gửi đi,
 * thư không bao giờ tới mà màn hình vẫn báo đã gửi; cảnh báo này nói rõ điều
 * đó và chỉ cách lấy lại quyền vào.
 */
function EmailNotConfiguredNotice() {
  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "min(560px, calc(100vw - 32px))",
        padding: "14px 18px",
        background: "#fff4e5",
        border: "1px solid #f0b75e",
        borderRadius: 6,
        color: "#5c3b00",
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <strong>Website chưa cấu hình hộp thư gửi đi (SMTP).</strong> Thư đặt lại
      mật khẩu sẽ <strong>không được gửi</strong>, dù màn hình báo đã gửi. Hãy
      nhờ người quản lý hosting đặt lại mật khẩu bằng lệnh{" "}
      <code>scripts/reset-admin-password.ts</code>, hoặc khai báo SMTP rồi thử
      lại.
    </div>
  );
}

export function PasswordReveal({
  children,
  emailConfigured = true,
}: {
  children?: ReactNode;
  emailConfigured?: boolean;
}) {
  const pathname = usePathname();
  const onForgotPage = /\/forgot\/?$/.test(pathname ?? "");
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.passwordReveal = "";
    style.textContent = STYLE;
    document.head.appendChild(style);
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      style.remove();
      for (const button of buttons.values()) button.remove();
      buttons.clear();
    };
  }, []);
  return (
    <>
      {onForgotPage && !emailConfigured && <EmailNotConfiguredNotice />}
      {children}
    </>
  );
}
