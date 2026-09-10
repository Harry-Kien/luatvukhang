import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProduction = process.env.NODE_ENV === "production";
/**
 * Chỉ mở CSP cho Google Analytics khi thật sự bật đo lường. Không đặt biến
 * NEXT_PUBLIC_ANALYTICS_ID thì chính sách vẫn khóa chặt ở "self".
 */
const analytics = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);
const gtm = "https://www.googletagmanager.com";
const ga = "https://*.google-analytics.com https://*.analytics.google.com";

/**
 * Chính sách bảo mật nội dung cho phần website công khai.
 *
 * Dùng 'unsafe-inline' cho script vì Next.js nhúng dữ liệu hydrate bằng thẻ
 * script nội tuyến. Cách thay thế là nonce theo từng yêu cầu, nhưng nonce buộc
 * mọi trang phải render động, làm mất toàn bộ lợi ích của trang tĩnh trên một
 * website nội dung. Các chỉ thị còn lại vẫn chặn khung nhúng lạ, biểu mẫu gửi
 * ra ngoài, plugin và việc đổi thẻ base.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `img-src 'self' data: blob:${analytics ? " " + ga + " " + gtm : ""}`,
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}${analytics ? " " + gtm : ""}`,
  `connect-src 'self'${analytics ? " " + ga + " " + gtm : ""}`,
  "manifest-src 'self'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  ...(isProduction
    ? [
        {
          // Chưa khai "preload": muốn vào danh sách preload của trình duyệt thì
          // phải tự nộp tên miền, và cam kết đó rất khó gỡ. Thêm sau khi mọi
          // tên miền con đã chạy HTTPS ổn định.
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]
    : []),
];

export default withPayload(
  withNextIntl({
    poweredByHeader: false,
    devIndicators: false,
    async headers() {
      return [
        { source: "/:path*", headers: baseHeaders },
        {
          // Bảng quản trị Payload cần khả năng nhúng và tải tài nguyên riêng,
          // nên CSP chỉ áp cho phần website công khai.
          source: "/((?!admin|api).*)",
          headers: [
            { key: "Content-Security-Policy", value: contentSecurityPolicy },
            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          ],
        },
      ];
    },
  }),
);
