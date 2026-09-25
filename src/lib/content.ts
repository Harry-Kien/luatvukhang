export { locales, type Locale } from "./locales";
import type { Locale } from "./locales";
import type { SiteLayoutData } from "@/cms/site-layout";
export { chinese } from "./zh";
import { chinese } from "./zh";
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
export type NavItem = { slug: string; label: string; href: string };
/** Menu chính đọc từ global "Giao diện website": chỉ mục đang hiện, tối đa 8. */
export function navigationFrom(layout: SiteLayoutData): NavItem[] {
  return (layout.header.menu ?? [])
    .filter((m) => m.visible !== false && m.href && m.label)
    .slice(0, 8)
    .map((m) => ({
      slug: String(m.href).replace(/^\//, "").split("/")[0],
      label: String(m.label),
      href: String(m.href),
    }));
}
/** Đường dẫn nội bộ được gắn tiền tố ngôn ngữ; liên kết ngoài giữ nguyên. */
export const localizeHref = (locale: Locale, href?: string | null) =>
  !href ? "/" + locale : href.startsWith("/") ? "/" + locale + href : href;
export const t = (locale: Locale, vi: string, en: string) =>
  locale === "vi" ? vi : locale === "zh" ? chinese(en) : en;
export const samples = [
  {
    slug: "dau-tu-doanh-nghiep",
    vi: "Doanh nghiệp & thương mại",
    en: "Corporate & commercial",
    description: [
      "Từ lúc thành lập đến những hợp đồng hằng ngày của doanh nghiệp.",
      "From incorporation to the everyday contracts of your business.",
    ],
    scope: [
      "Thành lập và thay đổi đăng ký doanh nghiệp",
      "Soạn thảo và rà soát hợp đồng thương mại",
      "Tranh chấp thương mại và thu hồi công nợ",
    ],
    scopeEn: [
      "Incorporation and registration changes",
      "Commercial contract drafting and review",
      "Commercial disputes and debt recovery",
    ],
  },
  {
    slug: "giai-quyet-tranh-chap",
    vi: "Dân sự & tranh chấp",
    en: "Civil matters & disputes",
    description: [
      "Nhìn rõ vấn đề, đánh giá lựa chọn và chuẩn bị phương án giải quyết.",
      "Understand the issues, assess your options and prepare a resolution strategy.",
    ],
    scope: [
      "Tranh chấp hợp đồng, tài sản và thừa kế",
      "Thương lượng và hòa giải",
      "Thi hành án dân sự",
    ],
    scopeEn: [
      "Contract, property and inheritance disputes",
      "Negotiation and mediation",
      "Enforcement of civil judgments",
    ],
  },
  {
    slug: "dat-dai-bat-dong-san",
    vi: "Đất đai & nhà ở",
    en: "Land & housing",
    description: [
      "Kiểm tra hồ sơ trước giao dịch và xử lý tranh chấp về đất.",
      "Check the file before a transaction and resolve land disputes.",
    ],
    scope: [
      "Tranh chấp quyền sử dụng đất",
      "Sang tên, chuyển nhượng, tặng cho",
      "Hồ sơ cấp, đính chính Giấy chứng nhận",
    ],
    scopeEn: [
      "Land use right disputes",
      "Title transfer, sale and gift",
      "Issuing or correcting certificates",
    ],
  },
  {
    slug: "hon-nhan-gia-dinh",
    vi: "Hôn nhân & gia đình",
    en: "Marriage & family",
    description: [
      "Ly hôn, quyền nuôi con, cấp dưỡng và chia tài sản.",
      "Divorce, custody, maintenance and division of property.",
    ],
    scope: [
      "Ly hôn thuận tình và đơn phương",
      "Tranh chấp quyền nuôi con, cấp dưỡng",
      "Tranh chấp tài sản khi ly hôn",
    ],
    scopeEn: [
      "Consensual and contested divorce",
      "Custody and maintenance disputes",
      "Property disputes on divorce",
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
