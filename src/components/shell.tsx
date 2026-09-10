"use client";
import Link from "next/link";
import { locales, languageInfo } from "@/lib/locales";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";
import { navigation, t, type Locale } from "@/lib/content";
import { Brand } from "./brand";
import { ContactChannels } from "./contact-channels";
/**
 * Số thứ tự trong menu. Giữ tối thiểu hai chữ số theo đúng kiểu đánh số của
 * thiết kế, và nới thêm khi danh sách dài hơn 99 mục — viết cứng tiền tố "0"
 * thì mục thứ mười trở đi sẽ hiện thành "010".
 */
const ordinal = (index: number, total: number) =>
  String(index + 1).padStart(Math.max(2, String(total).length), "0");
export function Header({
  locale,
  services = [],
  phone,
}: {
  locale: Locale;
  companyName?: string;
  services?: { slug: string; title: string }[];
  phone?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expertise, setExpertise] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
    setExpertise(false);
  }, [pathname]);
  useEffect(() => {
    function dismiss(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setExpertise(false);
      }
    }
    function outside(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setExpertise(false);
      }
    }
    window.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className="header" ref={ref}>
      <div className="utility-bar">
        <span>
          {t(locale, "Tư vấn pháp lý · Việt Nam", "Legal counsel · Vietnam")}
        </span>
        <div>
          <ContactChannels locale={locale} phone={phone} variant="bar" />
          {phone && <span className="utility-divider" />}
          <Link href={"/" + locale + "/search"}>
            <Search size={14} />
            {t(locale, "Tìm kiếm", "Search")}
          </Link>
          <span className="utility-divider" />
          {locales.map((language) =>
            language === locale ? (
              <span
                className="locale-current"
                key={language}
                aria-current="page"
              >
                {languageInfo[language].short}
              </span>
            ) : (
              <Link
                key={language}
                className="language"
                href={
                  "/api/switch-language?path=" +
                  encodeURIComponent(pathname) +
                  "&locale=" +
                  language
                }
                hrefLang={languageInfo[language].tag}
                lang={languageInfo[language].tag}
                title={languageInfo[language].label}
              >
                {languageInfo[language].short}
              </Link>
            ),
          )}
        </div>
      </div>
      <div className="header-inner">
        <Brand locale={locale} />
        <nav
          className="desktop-nav"
          aria-label={t(locale, "Điều hướng chính", "Main navigation")}
        >
          {navigation.map(([slug, vi, en]) =>
            slug === "services" ? (
              <button
                className={"nav-dropdown" + (expertise ? " expanded" : "")}
                key={slug}
                aria-expanded={expertise}
                aria-controls="expertise-menu"
                onClick={() => setExpertise(!expertise)}
              >
                {t(locale, vi, en)}
                <ChevronDown size={13} />
              </button>
            ) : (
              <Link
                key={slug}
                href={"/" + locale + "/" + slug}
                aria-current={
                  pathname.includes("/" + slug) ? "page" : undefined
                }
              >
                {t(locale, vi, en)}
              </Link>
            ),
          )}
        </nav>
        <Link className="header-cta" href={"/" + locale + "/consultation"}>
          {t(locale, "Đặt lịch tư vấn", "Consultation")}
          <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={t(
            locale,
            open ? "Đóng menu" : "Mở menu",
            open ? "Close menu" : "Open menu",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            setOpen(!open);
            setExpertise(false);
          }}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {expertise && (
        <div className="mega-menu" id="expertise-menu">
          <div className="mega-intro">
            <span className="eyebrow dark">
              {t(locale, "Chuyên môn", "Expertise")}
            </span>
            <h2>
              {t(
                locale,
                "Tìm hướng giải quyết\ncho vấn đề của bạn.",
                "Find a way forward\nfor your matter.",
              )}
            </h2>
            <Link
              className="underlined"
              onClick={() => setExpertise(false)}
              href={"/" + locale + "/services"}
            >
              {t(locale, "Xem tất cả chuyên môn", "View all expertise")}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mega-links">
            {services.map((s, i) => (
              <Link
                onClick={() => setExpertise(false)}
                href={"/" + locale + "/services/" + s.slug}
                key={s.slug}
              >
                {/* Đệm số theo độ dài danh sách: viết cứng "0" sẽ thành "010"
                    khi công ty công bố từ mười lĩnh vực trở lên. */}
                <span>{ordinal(i, services.length)}</span>
                <strong>{s.title}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <button
            className="mega-close"
            aria-label={t(
              locale,
              "Đóng danh mục chuyên môn",
              "Close expertise menu",
            )}
            onClick={() => setExpertise(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-menu"
          aria-label={t(locale, "Menu di động", "Mobile navigation")}
        >
          {navigation.map(([slug, vi, en], i) => (
            <Link
              onClick={() => setOpen(false)}
              href={"/" + locale + "/" + slug}
              key={slug}
            >
              <span>{ordinal(i, navigation.length)}</span>
              {t(locale, vi, en)}
              <ArrowUpRight size={19} />
            </Link>
          ))}
          <Link
            className="mobile-consultation"
            onClick={() => setOpen(false)}
            href={"/" + locale + "/consultation"}
          >
            {t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")}
            <ArrowRight size={18} />
          </Link>
          <ContactChannels locale={locale} phone={phone} variant="stack" />
        </nav>
      )}
    </header>
  );
}
export function Footer({
  locale,
  companyName,
  phone,
}: {
  locale: Locale;
  companyName?: string;
  phone?: string | null;
}) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="eyebrow">
            {t(locale, "Trao đổi cùng Vũ Khang", "Talk to Vũ Khang")}
          </span>
          <h2>
            {t(
              locale,
              "Bước tiếp theo,\nbắt đầu từ sự rõ ràng.",
              "Your next step\nstarts with clarity.",
            )}
          </h2>
        </div>
        <div className="footer-invitation">
          <p>
            {t(
              locale,
              "Chia sẻ vấn đề bạn đang quan tâm để bắt đầu một cuộc trao đổi có trọng tâm.",
              "Tell us about your matter to start a focused conversation.",
            )}
          </p>
          <Link className="button red" href={"/" + locale + "/consultation"}>
            {t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="footer-directory">
        <div className="footer-identity">
          <Brand locale={locale} inverted />
          <p>{companyName || "Công ty Luật TNHH Vũ Khang"}</p>
          <span className="footer-motto">
            {t(
              locale,
              "Thấu hiểu vấn đề. Vững vàng quyết định.",
              "Understand the matter. Decide with confidence.",
            )}
          </span>
          <ContactChannels locale={locale} phone={phone} variant="stack" />
        </div>
        <div>
          <h3>{t(locale, "Khám phá Vũ Khang", "Explore Vũ Khang")}</h3>
          {navigation.slice(0, 4).map(([slug, vi, en]) => (
            <Link key={slug} href={"/" + locale + "/" + slug}>
              {t(locale, vi, en)}
            </Link>
          ))}
        </div>
        <div>
          <h3>{t(locale, "Kết nối", "Connect")}</h3>
          {navigation.slice(4).map(([slug, vi, en]) => (
            <Link key={slug} href={"/" + locale + "/" + slug}>
              {t(locale, vi, en)}
            </Link>
          ))}
          <Link href={"/" + locale + "/industries"}>
            {t(locale, "Ngành nghề", "Industries")}
          </Link>
          <Link href={"/" + locale + "/careers"}>
            {t(locale, "Cơ hội nghề nghiệp", "Careers")}
          </Link>
          <Link href={"/" + locale + "/guide"}>
            {t(locale, "Hướng dẫn khách hàng", "Client guide")}
          </Link>
          <Link href={"/" + locale + "/search"}>
            {t(locale, "Tìm kiếm", "Search")}
          </Link>
          <Link href={"/" + locale + "/consultation"}>
            {t(locale, "Đặt lịch tư vấn", "Request an appointment")}
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Vũ Khang.</span>
        <div>
          <Link href={"/" + locale + "/privacy"}>
            {t(locale, "Quyền riêng tư", "Privacy")}
          </Link>
          <Link href={"/" + locale + "/terms"}>
            {t(locale, "Điều khoản", "Terms")}
          </Link>
        </div>
        <a className="back-top" href="#top">
          {t(locale, "Về đầu trang", "Back to top")} ↑
        </a>
      </div>
    </footer>
  );
}
