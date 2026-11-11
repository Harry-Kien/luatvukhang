import type { EmailAdapter } from "payload";
import nodemailer from "nodemailer";
/** Đủ hai biến tối thiểu để gửi thư (máy chủ gửi và địa chỉ người gửi). */
export const emailConfigured = () =>
  Boolean(process.env.SMTP_HOST?.trim() && process.env.SMTP_FROM?.trim());
export const emailAdapter: EmailAdapter = () => ({
  name: "configured-smtp",
  defaultFromAddress: process.env.SMTP_FROM || "unconfigured@example.invalid",
  defaultFromName: "Luật Vũ Khang",
  async sendEmail(message) {
    if (!emailConfigured())
      throw new Error("Email delivery has not been configured.");
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 30000,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });
    return transport.sendMail({ ...message, from: process.env.SMTP_FROM });
  },
});
