/**
 * Hệ sinh thái Luật Vũ Khang: công ty luật và các thành viên khác. Chủ website
 * nêu ngày 21/10/2026: ứng dụng Luật Việt thuộc hệ sinh thái của Luật Vũ Khang,
 * logo dẫn tới https://luatviet247.com.
 *
 * Mô tả Luật Việt lấy đúng theo cách chính website luatviet247.com tự giới
 * thiệu (kiểm tra ngày 21/10/2026): học và tra cứu luật theo từng điều, khoản;
 * tìm luật sư đã xác minh; miễn phí trên iOS và Android. Đổi mô tả ở đó thì
 * sửa ở đây cho khớp.
 */
type Localised = { vi: string; en: string; zh: string };

export type EcosystemMember = {
  key: string;
  /** Danh từ riêng, giữ nguyên ở cả ba ngôn ngữ. */
  name: string;
  role: Localised;
  /** Một câu giới thiệu, hiện trên thẻ ở trang Về chúng tôi. */
  summary: Localised;
  logo: string;
  /** Liên kết ra ngoài (mở tab mới); bỏ trống thì thẻ không bấm được. */
  href?: string;
  /** Tên miền hiện dưới thẻ, để người xem biết sẽ được dẫn đi đâu. */
  site?: string;
  /** Chính công ty luật — không lặp lại ở dải chân trang của chính website. */
  self?: boolean;
};

export const ECOSYSTEM: EcosystemMember[] = [
  {
    key: "vu-khang",
    name: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    role: { vi: "Dịch vụ pháp lý", en: "Legal services", zh: "法律服务" },
    summary: {
      vi: "Tư vấn và dịch vụ pháp lý cho cá nhân, gia đình và doanh nghiệp tại Đồng Nai.",
      en: "Legal advice and services for individuals, families and businesses in Đồng Nai.",
      zh: "为同奈的个人、家庭和企业提供法律咨询与服务。",
    },
    logo: "/brand/logo-192.webp",
    self: true,
  },
  {
    key: "luat-viet",
    name: "Luật Việt",
    role: { vi: "Ứng dụng pháp luật", en: "Legal app", zh: "法律应用" },
    summary: {
      vi: "Học và tra cứu luật Việt Nam theo từng điều, khoản; tìm luật sư đã xác minh. Miễn phí trên iOS và Android.",
      en: "Learn and look up Vietnamese law article by article, and find verified lawyers. Free on iOS and Android.",
      zh: "按条、款学习和查询越南法律，查找经核实的律师。iOS 与 Android 免费使用。",
    },
    logo: "/brand/luat-viet-192.webp",
    href: "https://luatviet247.com",
    site: "luatviet247.com",
  },
];
