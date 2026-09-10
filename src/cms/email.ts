import type { EmailAdapter } from "payload";
import nodemailer from "nodemailer";
export const emailAdapter: EmailAdapter = () => ({
  name: "configured-smtp",
  defaultFromAddress: process.env.SMTP_FROM || "unconfigured@example.invalid",
  defaultFromName: "Website",
  async sendEmail(message) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_FROM)
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
