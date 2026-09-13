import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import "@fontsource-variable/noto-serif/wght.css";

import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-600.css";
import "@fontsource/be-vietnam-pro/latin-600.css";
import "./styles.css";
import "./brand.css";
import { getSiteSettings } from "@/lib/site-settings";
import { Header, Footer } from "@/components/shell";
import { ContactChannels } from "@/components/contact-channels";
import { getRecords } from "@/lib/cms";
import { demo, launched, samples, t } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@/components/analytics";
import {
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Công ty Luật Vũ Khang Solutions & Partners",
    template: "%s | Vũ Khang",
  },
  description: "Tìm hiểu chuyên môn và gửi yêu cầu tư vấn pháp lý.",
  applicationName: siteName,
  robots: {
    index: launched,
    follow: launched,
    googleBot: {
      index: launched,
      follow: launched,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.SITE_VERIFICATION_GOOGLE,
    other: process.env.SITE_VERIFICATION_BING
      ? { "msvalidate.01": process.env.SITE_VERIFICATION_BING }
      : {},
  },
  openGraph: { type: "website", siteName },
  twitter: { card: "summary_large_image" },
  // Số điện thoại trong nội dung không tự động thành liên kết gọi trên iOS,
  // tránh làm sai lệch bố cục và màu chữ của các trang.
  formatDetection: { telephone: false, address: false, email: false },
};
export const viewport: Viewport = {
  themeColor: "#101d35",
  colorScheme: "light",
};
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "vi" && locale !== "en" && locale !== "zh") notFound();
  setRequestLocale(locale);
  const settings = await getSiteSettings();
  const records = await getRecords("services", locale);
  const serviceLinks = records.length
    ? records.map((r) => ({ slug: r.slug, title: r.title }))
    : demo
      ? samples.map((s) => ({ slug: s.slug, title: t(locale, s.vi, s.en) }))
      : [];
  const companyName =
    locale === "en" ? settings?.englishName : settings?.companyName;
  const organization = organizationJsonLd(settings, locale);
  return (
    <html lang={locale === "zh" ? "zh-Hans" : locale}>
      <body id="top">
        <JsonLd
          data={[
            organization,
            websiteJsonLd(locale, String(organization.name)),
          ]}
        />
        <a className="skip" href="#main">
          {t(locale, "Đến nội dung chính", "Skip to content")}
        </a>
        {demo && (
          <div className="demo-note">
            {locale === "vi"
              ? "Bản phát triển · Nội dung minh họa, chưa phải thông tin công bố của công ty."
              : locale === "zh"
                ? "开发预览 · 示例内容，尚非公司正式发布的信息。"
                : "Development preview · Sample content, not an official statement of the firm."}
          </div>
        )}
        <Header
          locale={locale}
          companyName={companyName || undefined}
          services={serviceLinks}
          phone={settings?.phone}
        />
        <main id="main">{children}</main>
        <Footer
          locale={locale}
          companyName={companyName || undefined}
          phone={settings?.phone}
        />
        <ContactChannels
          locale={locale}
          phone={settings?.phone}
          variant="dock"
        />
        <Analytics />
      </body>
    </html>
  );
}
