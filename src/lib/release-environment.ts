/** Pure configuration checks shared with release tooling; never return secret values. */
export function releaseEnvironmentIssues(
  env: Record<string, string | undefined>,
): string[] {
  const issues: string[] = [];
  if (env.NEXT_PUBLIC_DEMO_MODE !== "false") issues.push("Turn off demo mode.");
  if (env.SITE_LAUNCH_APPROVED !== "true")
    issues.push("Publication has not been approved.");
  try {
    const url = new URL(env.NEXT_PUBLIC_SITE_URL || "");
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      /^(localhost|127\.|\[::1\])/.test(url.hostname) ||
      /\.(invalid|example|test|localhost)$/.test(url.hostname)
    )
      throw new Error();
  } catch {
    issues.push(
      "Set a valid HTTPS production origin without credentials, paths or query strings.",
    );
  }
  if (env.NEXT_PUBLIC_SITE_URL?.endsWith("/"))
    issues.push("NEXT_PUBLIC_SITE_URL must not end with a slash.");
  if ((env.PAYLOAD_SECRET?.length || 0) < 32)
    issues.push("Set a strong PAYLOAD_SECRET.");
  if (!env.DATABASE_URL) issues.push("Configure the production database.");
  /**
   * Công ty có thể chọn không dùng email thông báo, nhưng phải khai báo rõ.
   *
   * Thiếu SMTP mà vẫn mở cửa nghĩa là khách gửi yêu cầu xong không ai được báo.
   * Đó là lý do mục này chặn phát hành. Nhưng nếu công ty quyết định tự kiểm
   * tra yêu cầu trong CMS, cổng sẽ đỏ vĩnh viễn — và một cổng không bao giờ
   * xanh được thì người vận hành học cách bỏ qua nó, kể cả những mục khác.
   *
   * Chỉ đúng chuỗi "true" mới tính là khai báo: quên cấu hình và cố ý không
   * dùng là hai chuyện khác nhau, và một giá trị gõ nhầm không được phép biến
   * chuyện thứ nhất thành chuyện thứ hai.
   */
  const emailDisabled = env.EMAIL_NOTIFICATIONS_DISABLED === "true";
  if (
    !emailDisabled &&
    (!env.SMTP_HOST || !env.SMTP_FROM || !env.NOTIFICATION_EMAIL)
  )
    issues.push("Configure SMTP_HOST, SMTP_FROM and NOTIFICATION_EMAIL.");
  const port = Number(env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    issues.push("SMTP_PORT must be a valid TCP port.");
  if (env.SMTP_USER && !env.SMTP_PASSWORD)
    issues.push("Set SMTP_PASSWORD when SMTP_USER is configured.");
  if (
    env.NEXT_PUBLIC_ANALYTICS_ID &&
    !/^G-[A-Z0-9]+$/.test(env.NEXT_PUBLIC_ANALYTICS_ID)
  )
    issues.push("Use a valid GA4 measurement ID.");
  return issues;
}

/** Thông tin pháp nhân trong Cài đặt, ở dạng thuần để kiểm thử được. */
export type SiteSettingsFields = {
  companyName?: string | null;
  englishName?: string | null;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
  registration?: string | null;
};

/**
 * Phân loại thông tin pháp nhân: cái nào chặn phát hành, cái nào chỉ nhắc.
 *
 * Năm ô đầu là thứ khách cần để biết công ty tên gì, ở đâu, gọi và gửi thư vào
 * đâu. Thiếu một trong số đó thì website chưa dùng được, nên chúng chặn.
 *
 * Thông tin đăng ký hoạt động là tín hiệu xác minh — đáng có với một công ty
 * luật và nên bổ sung — nhưng thiếu nó website vẫn hoạt động bình thường. Trước
 * đây nó cũng chặn, nghĩa là công ty chọn không công bố sẽ thấy cổng phát hành
 * đỏ vĩnh viễn; mà một cổng không bao giờ xanh được thì người vận hành học cách
 * bỏ qua nó, kể cả những mục khác đang thực sự cần chú ý. Nên nó chuyển thành
 * cảnh báo, và vẫn được nêu ra ở mỗi lần kiểm tra.
 */
export function releaseSettingsIssues(settings: SiteSettingsFields): {
  issues: string[];
  warnings: string[];
} {
  const blank = (value: unknown) =>
    typeof value !== "string" || !value.trim().length;
  const required: [keyof SiteSettingsFields, string][] = [
    ["companyName", "tên công ty"],
    ["englishName", "tên tiếng Anh"],
    ["phone", "điện thoại"],
    ["address", "địa chỉ"],
    ["email", "email tiếp nhận"],
  ];
  const missing = required
    .filter(([field]) => blank(settings[field]))
    .map(([, label]) => label);
  return {
    issues: missing.length
      ? [`Complete verified company settings: thiếu ${missing.join(", ")}.`]
      : [],
    warnings: blank(settings.registration)
      ? [
          "Chưa có thông tin đăng ký hoạt động trong Cài đặt. Không chặn phát hành, " +
            "nhưng với một công ty luật thì đây là tín hiệu xác minh mà khách hàng " +
            "cẩn thận sẽ tìm.",
        ]
      : [],
  };
}
