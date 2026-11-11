import { expect, test } from "@playwright/test";
import {
  refuseForgotPasswordWithoutEmail,
  resetPasswordEmail,
} from "../src/cms/password-reset";

test("thư đặt lại mật khẩu: tiếng Việt, đúng đường dẫn, không chèn được mã HTML", () => {
  const { subject, html, link } = resetPasswordEmail({
    serverURL: "https://luatvukhang.com/",
    adminRoute: "/admin",
    token: "abc123",
    name: '<b>Kiên</b> "test"',
  });
  expect(subject).toContain("Đặt lại mật khẩu");
  expect(link).toBe("https://luatvukhang.com/admin/reset/abc123");
  expect(html).toContain('href="https://luatvukhang.com/admin/reset/abc123"');
  expect(html).toContain("hết hạn sau 1 giờ");
  expect(html).not.toContain("<b>Kiên</b>");
  expect(html).toContain("&lt;b&gt;Kiên&lt;/b&gt;");
});

test("quên mật khẩu khi chưa khai SMTP: báo rõ lý do, cùng một câu cho mọi email", () => {
  const saved = { host: process.env.SMTP_HOST, from: process.env.SMTP_FROM };
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_FROM;
  try {
    const run = (args: Record<string, unknown>) =>
      (refuseForgotPasswordWithoutEmail as (a: unknown) => unknown)({
        operation: "forgotPassword",
        args,
      });
    expect(() => run({ data: { email: "a@x.vn" } })).toThrow(/SMTP/);
    // Mã do máy chủ tự tạo (không gửi thư) không bị chặn.
    expect(run({ disableEmail: true })).toEqual({ disableEmail: true });
    // Thao tác khác không liên quan.
    expect(
      (refuseForgotPasswordWithoutEmail as (a: unknown) => unknown)({
        operation: "login",
        args: { x: 1 },
      }),
    ).toEqual({ x: 1 });
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_FROM = "web@example.com";
    expect(run({ data: { email: "a@x.vn" } })).toEqual({
      data: { email: "a@x.vn" },
    });
  } finally {
    if (saved.host === undefined) delete process.env.SMTP_HOST;
    else process.env.SMTP_HOST = saved.host;
    if (saved.from === undefined) delete process.env.SMTP_FROM;
    else process.env.SMTP_FROM = saved.from;
  }
});
