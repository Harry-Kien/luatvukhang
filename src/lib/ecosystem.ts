/**
 * Hệ sinh thái Luật Vũ Khang.
 *
 * Từ 22/10/2026 danh sách thành viên nằm trong admin: Cài đặt → "Hệ sinh thái"
 * (tên, vai trò, câu giới thiệu ba ngôn ngữ, logo, đường dẫn). Tệp này chỉ còn:
 *   - thẻ của chính công ty luật trên trang Về chúng tôi (lấy tên từ Cài đặt);
 *   - dữ liệu nạp sẵn một lần (scripts/prepare-ecosystem.ts): ứng dụng Luật Việt
 *     do chủ website nêu ngày 21/10/2026, mô tả lấy đúng theo cách website
 *     luatviet247.com tự giới thiệu.
 */
type Localised = { vi: string; en: string; zh: string };

/** Một thành viên như website hiển thị (đã chọn ngôn ngữ). */
export type EcosystemMember = {
  key: string;
  name: string;
  role?: string | null;
  summary?: string | null;
  logo: string;
  /** Liên kết ra ngoài (mở tab mới); bỏ trống thì thẻ không bấm được. */
  href?: string | null;
  /** Tên miền hiện dưới thẻ, để người xem biết sẽ được dẫn đi đâu. */
  site?: string | null;
};

/** Một dòng của ô "Hệ sinh thái" trong Cài đặt (đã đọc theo ngôn ngữ). */
type SettingsRow = {
  id?: string | null;
  name?: string | null;
  role?: string | null;
  summary?: string | null;
  url?: string | null;
  logo?: { url?: string | null } | number | string | null;
};

const domain = (url?: string | null) => {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "") : null;
  } catch {
    return null;
  }
};

/** Đổi ô "Hệ sinh thái" của Cài đặt thành danh sách thẻ hiển thị. */
export function ecosystemMembers(
  rows: SettingsRow[] | null | undefined,
): EcosystemMember[] {
  return (rows ?? []).flatMap((row, index): EcosystemMember[] => {
    const logo = row.logo && typeof row.logo === "object" ? row.logo.url : null;
    // Thiếu tên hoặc logo thì bỏ qua thay vì hiện một ô trống.
    if (!row.name || !logo) return [];
    return [
      {
        key: row.id || `member-${index}`,
        name: row.name,
        role: row.role,
        summary: row.summary,
        logo: logo.replace(/^https?:\/\/[^/]+/, ""),
        href: row.url || null,
        site: domain(row.url),
      },
    ];
  });
}

/** Thẻ của chính công ty luật, đứng đầu mục Hệ sinh thái ở trang Về chúng tôi. */
export const FIRM_MEMBER: Omit<EcosystemMember, "name" | "role" | "summary"> & {
  role: Localised;
  summary: Localised;
} = {
  key: "vu-khang",
  role: { vi: "Dịch vụ pháp lý", en: "Legal services", zh: "法律服务" },
  summary: {
    vi: "Tư vấn và dịch vụ pháp lý cho cá nhân, gia đình và doanh nghiệp tại Đồng Nai.",
    en: "Legal advice and services for individuals, families and businesses in Đồng Nai.",
    zh: "为同奈的个人、家庭和企业提供法律咨询与服务。",
  },
  logo: "/brand/logo-192.webp",
};

/** Nạp sẵn một lần vào Cài đặt — sau đó công ty tự sửa trong admin. */
export const DEFAULT_ECOSYSTEM: {
  name: string;
  role: Localised;
  summary: Localised;
  url: string;
  /** Đường dẫn tệp logo tính từ thư mục gốc dự án. */
  logoFile: string;
}[] = [
  {
    name: "Luật Việt",
    role: { vi: "Ứng dụng pháp luật", en: "Legal app", zh: "法律应用" },
    summary: {
      vi: "Học và tra cứu luật Việt Nam theo từng điều, khoản; tìm luật sư đã xác minh. Miễn phí trên iOS và Android.",
      en: "Learn and look up Vietnamese law article by article, and find verified lawyers. Free on iOS and Android.",
      zh: "按条、款学习和查询越南法律，查找经核实的律师。iOS 与 Android 免费使用。",
    },
    url: "https://luatviet247.com",
    logoFile: "public/brand/luat-viet-512.png",
  },
];
