import Link from "next/link";
import type { Locale } from "@/lib/content";
export function Brand({
  locale,
  inverted = false,
}: {
  locale: Locale;
  inverted?: boolean;
}) {
  return (
    <Link
      className={"brand" + (inverted ? " brand-inverted" : "")}
      href={"/" + locale}
      aria-label={locale === "zh" ? "Vũ Khang — 首页" : locale === "en" ? "Vũ Khang — Home" : "Vũ Khang — Trang chủ"}
    >
      {/* Huy hiệu tròn sinh từ design/logo.jpg; nền ngoài vòng trong suốt nên
          dùng chung cho header nền trắng và footer nền navy. Tên đã có trong
          aria-label của liên kết, ảnh để alt rỗng tránh đọc lặp. */}
      <img
        className="brand-logo"
        src="/brand/logo-192.png"
        alt=""
        width={192}
        height={192}
        decoding="async"
        fetchPriority="high"
      />
      <span className="brand-wordmark">
        <small>CÔNG TY LUẬT</small>
        <strong>VŨ KHANG</strong>
        <small>SOLUTIONS &amp; PARTNERS</small>
      </span>
    </Link>
  );
}
