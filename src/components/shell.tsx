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
import {
  ordinal,
  t,
  localizeHref,
  type Locale,
  type NavItem,
} from "@/lib/content";
import type { SiteLayoutData } from "@/cms/site-layout";
import { Brand } from "./brand";
import { ContactChannels } from "./contact-channels";
export function Header({
  locale,
  services = [],
  phone,
  layout,
  nav,
}: {
  locale: Locale;
  companyName?: string;
  services?: { slug: string; title: string }[];
  phone?: string | null;
  layout: SiteLayoutData["header"];
  nav: NavItem[];
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
  const cta = {
    label: layout.cta?.label || t(locale, "Đặt lịch tư vấn", "Consultation"),
    href: localizeHref(locale, layout.cta?.href || "/consultation"),
  };
  return (
    <header className="header" ref={ref}>
      <div className="utility-bar">
        <span>{layout.tagline}</span>
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
                /**
                 * Không tải trước. Đích của liên kết này không phải một trang
                 * mà là một chuyển hướng, và để dựng được chuyển hướng đó máy
                 * chủ phải đọc bản ghi ở cả hai ngôn ngữ để tìm bản dịch tương
                 * ứng. Tải trước nghĩa là MỖI lượt xem trang đều kéo thêm hai
                 * lượt chuyển hướng và bốn lượt truy vấn CMS, cho một nút mà
                 * gần như không khách nào bấm — website tiếng Việt phục vụ
                 * khách Việt là chính.
                 */
                prefetch={false}
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
          {nav.map((item) =>
            item.slug === "services" ? (
              <button
                className={"nav-dropdown" + (expertise ? " expanded" : "")}
                key={item.href}
                aria-expanded={expertise}
                aria-controls="expertise-menu"
                onClick={() => setExpertise(!expertise)}
              >
                {item.label}
                <ChevronDown size={13} />
              </button>
            ) : (
              <Link
                key={item.href}
                href={localizeHref(locale, item.href)}
                aria-current={
                  item.href.startsWith("/") && pathname.includes(item.href)
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link className="header-cta" href={cta.href}>
          {cta.label}
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
          {nav.map((item, i) => (
            <Link
              onClick={() => setOpen(false)}
              href={localizeHref(locale, item.href)}
              key={item.href}
            >
              <span>{ordinal(i, nav.length)}</span>
              {item.label}
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
const SOCIAL: [keyof SiteLayoutData["contact"], string][] = [
  ["facebook", "Facebook"],
  ["linkedin", "LinkedIn"],
  ["youtube", "YouTube"],
];
export function Footer({
  locale,
  companyName,
  phone,
  layout,
  contact,
  nav,
}: {
  locale: Locale;
  companyName?: string;
  phone?: string | null;
  layout: SiteLayoutData["footer"];
  contact: SiteLayoutData["contact"];
  nav: NavItem[];
}) {
  const lines = (value?: string | null) =>
    (value || "").split("\n").map((line, i, all) => (
      <span key={i}>
        {line}
        {i < all.length - 1 && <br />}
      </span>
    ));
  const social = SOCIAL.filter(([key]) => contact[key]);
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="eyebrow">{layout.kicker}</span>
          <h2>{lines(layout.title)}</h2>
        </div>
        <div className="footer-invitation">
          <p>{layout.invitation}</p>
          <Link
            className="button red"
            href={localizeHref(
              locale,
              layout.invitationCta?.href || "/consultation",
            )}
          >
            {layout.invitationCta?.label ||
              t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="footer-directory">
        <div className="footer-identity">
          <Brand locale={locale} inverted />
          <p>
            {companyName || "Công ty Luật TNHH Vũ Khang Solutions & Partners"}
          </p>
          <span className="footer-motto">{layout.motto}</span>
          <ContactChannels locale={locale} phone={phone} variant="stack" />
          {social.length > 0 && (
            <ul className="footer-social">
              {social.map(([key, label]) => (
                <li key={key}>
                  <a
                    href={String(contact[key])}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>{layout.exploreTitle}</h3>
          {nav.slice(0, 4).map((item) => (
            <Link key={item.href} href={localizeHref(locale, item.href)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{layout.connectTitle}</h3>
          {nav.slice(4).map((item) => (
            <Link key={item.href} href={localizeHref(locale, item.href)}>
              {item.label}
            </Link>
          ))}
          {(layout.extraLinks ?? [])
            .filter((l) => l.href && l.label)
            .map((l) => (
              <Link key={l.href} href={localizeHref(locale, l.href)}>
                {l.label}
              </Link>
            ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {layout.copyright}
        </span>
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
