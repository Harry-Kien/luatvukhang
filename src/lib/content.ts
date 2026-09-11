import zh from "./zh";
export { locales, type Locale } from "./locales";
import type { Locale } from "./locales";
export const chinese = (english: string) =>
  (zh as Record<string, string>)[english] || english;
export const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const launched = process.env.SITE_LAUNCH_APPROVED === "true" && !demo;
export const navigation = [
  ["about", "Về chúng tôi", "Our firm"],
  ["services", "Chuyên môn", "Expertise"],
  ["lawyers", "Đội ngũ", "People"],
  ["experience", "Kinh nghiệm", "Experience"],
  ["articles", "Góc nhìn", "Insights"],
  ["contact", "Liên hệ", "Contact"],
] as const;
export const t = (locale: Locale, vi: string, en: string) =>
  locale === "vi" ? vi : locale === "zh" ? chinese(en) : en;
export const samples = [
  {
    slug: "dau-tu-doanh-nghiep",
    vi: "Đầu tư & doanh nghiệp",
    en: "Investment & corporate",
    description: [
      "Từ quyết định đầu tư đến hoạt động thường ngày của doanh nghiệp.",
      "From investment decisions to the everyday operation of your business.",
    ],
    scope: [
      "Thành lập và cơ cấu doanh nghiệp",
      "Rà soát giao dịch và hợp đồng",
      "Quản trị nội bộ và tuân thủ",
    ],
    scopeEn: [
      "Business establishment and structuring",
      "Transaction and contract review",
      "Corporate governance and compliance",
    ],
  },
  {
    slug: "giai-quyet-tranh-chap",
    vi: "Giải quyết tranh chấp",
    en: "Dispute resolution",
    description: [
      "Nhìn rõ vấn đề, đánh giá lựa chọn và chuẩn bị phương án giải quyết.",
      "Understand the issues, assess your options and prepare a resolution strategy.",
    ],
    scope: [
      "Đánh giá hồ sơ và chứng cứ",
      "Thương lượng và hòa giải",
      "Chuẩn bị hồ sơ tranh tụng",
    ],
    scopeEn: [
      "Case and evidence assessment",
      "Negotiation and mediation",
      "Preparation for proceedings",
    ],
  },
  {
    slug: "hop-dong-thuong-mai",
    vi: "Hợp đồng & thương mại",
    en: "Contracts & commerce",
    description: [
      "Làm rõ quyền, nghĩa vụ và rủi ro trước khi đặt bút ký.",
      "Clarify rights, obligations and risks before you sign.",
    ],
    scope: [
      "Soạn thảo và rà soát hợp đồng",
      "Hỗ trợ đàm phán",
      "Xử lý vấn đề khi thực hiện hợp đồng",
    ],
    scopeEn: [
      "Contract drafting and review",
      "Negotiation support",
      "Contract performance issues",
    ],
  },
  {
    slug: "so-huu-tri-tue",
    vi: "Sở hữu trí tuệ & công nghệ",
    en: "Intellectual property & technology",
    description: [
      "Bảo vệ tài sản trí tuệ và xây dựng nền tảng cho hoạt động số.",
      "Protect intellectual assets and establish a foundation for digital operations.",
    ],
    scope: [
      "Rà soát tài sản sở hữu trí tuệ",
      "Hợp đồng công nghệ",
      "Đánh giá hoạt động xử lý dữ liệu",
    ],
    scopeEn: [
      "Intellectual asset review",
      "Technology contracts",
      "Data processing assessment",
    ],
  },
];
/**
 * Số thứ tự hiển thị trong danh sách. Giữ tối thiểu hai chữ số theo kiểu đánh
 * số của thiết kế, và nới thêm khi danh sách dài hơn 99 mục.
 *
 * Viết cứng tiền tố "0" như trước đây thì mục thứ mười trở đi hiện thành "010".
 * Lỗi này từng có ở hai nơi khác nhau, nên hàm đặt chung ở đây thay vì chép lại.
 */
export const ordinal = (index: number, total: number) =>
  String(index + 1).padStart(Math.max(2, String(total).length), "0");
export function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}
