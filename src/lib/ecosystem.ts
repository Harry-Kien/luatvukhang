/**
 * Hệ sinh thái Luật Vũ Khang: công ty luật và các thành viên khác. Chủ website
 * nêu ngày 21/10/2026: ứng dụng Luật Việt thuộc hệ sinh thái của Luật Vũ Khang.
 *
 * Chỉ ghi điều đã được xác nhận — tên, logo, vai trò "ứng dụng". Chưa có đường
 * dẫn tải ứng dụng nên thẻ Luật Việt chưa bấm được; có `href` (website hoặc
 * trang App Store / Google Play) thì thẻ tự thành liên kết.
 */
type Localised = { vi: string; en: string; zh: string };

export type EcosystemMember = {
  key: string;
  /** Danh từ riêng, giữ nguyên ở cả ba ngôn ngữ. */
  name: string;
  role: Localised;
  logo: string;
  /** Liên kết ra ngoài; bỏ trống thì thẻ không bấm được. */
  href?: string;
  /** Chính công ty luật — không lặp lại ở dải chân trang của chính website. */
  self?: boolean;
};

export const ECOSYSTEM: EcosystemMember[] = [
  {
    key: "vu-khang",
    name: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    role: { vi: "Dịch vụ pháp lý", en: "Legal services", zh: "法律服务" },
    logo: "/brand/logo-192.webp",
    self: true,
  },
  {
    key: "luat-viet",
    name: "Luật Việt",
    role: { vi: "Ứng dụng", en: "App", zh: "应用" },
    logo: "/brand/luat-viet-192.webp",
  },
];
