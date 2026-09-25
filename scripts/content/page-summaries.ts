import type { Locale } from "../../src/lib/locales";

/** Tóm tắt tạm cho trang nền mới tạo — nhắc biên tập viên đây là bản nháp. */
export const SUMMARIES: Record<Locale, string> = {
  vi: "Nội dung dự thảo của Công ty Luật TNHH Vũ Khang Solutions & Partners — cần rà soát trước khi xuất bản.",
  en: "Draft content for Công ty Luật TNHH Vũ Khang Solutions & Partners — review before publication.",
  zh: "Công ty Luật TNHH Vũ Khang Solutions & Partners 的内容草案 — 发布前须经审核。",
};

/**
 * Tóm tắt của hai trang chính sách. Tóm tắt hiện ngay dưới tiêu đề trang, nên
 * không được là câu "nội dung dự thảo" — xuất bản mà quên sửa ô này thì văn
 * bản đã có hiệu lực lại tự nhận mình là dự thảo.
 */
export const POLICY_SUMMARIES: Record<
  "privacy" | "terms",
  Record<Locale, string>
> = {
  privacy: {
    vi: "Cách Công ty Luật TNHH Vũ Khang Solutions & Partners thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi bạn dùng website và gửi yêu cầu tư vấn.",
    en: "How Vũ Khang Solutions & Partners collects, uses and protects personal data when you use this website and send an enquiry.",
    zh: "Công ty Luật TNHH Vũ Khang Solutions & Partners 在您使用本网站及提交咨询申请时如何收集、使用和保护个人数据。",
  },
  terms: {
    vi: "Điều kiện sử dụng website của Công ty Luật TNHH Vũ Khang Solutions & Partners.",
    en: "The conditions for using the Vũ Khang Solutions & Partners website.",
    zh: "Công ty Luật TNHH Vũ Khang Solutions & Partners 网站使用条件。",
  },
};
