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
      <span className="brand-monogram" aria-hidden="true">
        <span>V</span>
        <span>K</span>
      </span>
      <span className="brand-wordmark">
        <small>CÔNG TY LUẬT TNHH</small>
        <strong>VŨ KHANG</strong>
      </span>
    </Link>
  );
}
