import Script from "next/script";
import { launched } from "@/lib/content";

const measurementId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

/**
 * Google Analytics 4, chỉ chạy khi đã đặt NEXT_PUBLIC_ANALYTICS_ID và website
 * đã được duyệt ra mắt. Không đặt biến này thì không có mã theo dõi nào được
 * nạp — bản phát triển và bản xem trước không làm sai lệch số liệu.
 *
 * Bật biến này thì phải mở CSP cho googletagmanager: xem next.config.mjs.
 */
export function Analytics() {
  if (!launched || !measurementId || !/^G-[A-Z0-9]+$/.test(measurementId))
    return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="analytics-config" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
