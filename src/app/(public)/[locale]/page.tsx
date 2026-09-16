import Link from "next/link";
import { BannerPhoto } from "@/components/banner-photo";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ArrowDown, MoveUpRight } from "lucide-react";
import {
  t,
  type Locale,
  demo,
  ordinal,
  samples,
  localizeHref,
} from "@/lib/content";
import { getPreviewRecord } from "@/lib/preview";
import { PreviewRefresh } from "@/components/preview-refresh";
import { ContentBody } from "@/components/content";
import { Editable } from "@/components/editable";
import { getRecords } from "@/lib/cms";
import { getSiteLayout } from "@/lib/site-layout";
import { pageMetadata } from "@/lib/seo";
const INTRO: Record<Locale, string> = {
  zh: "Vũ Khang — 为越南投资、企业经营、合同与争议问题提供清晰的法律视角。",
  vi: "Công ty Luật TNHH Vũ Khang Solutions & Partners — góc nhìn pháp lý rõ ràng cho đầu tư, doanh nghiệp, hợp đồng và giải quyết tranh chấp tại Việt Nam.",
  en: "Vũ Khang — a clear legal perspective on investment, corporate, contract and dispute matters in Vietnam.",
};
/** Tiêu đề nhiều dòng trong CMS: mỗi dòng xuống hàng một lần. */
function lines(value?: string | null) {
  return (value || "").split("\n").map((line, i, all) => (
    <span key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </span>
  ));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const home = (await getRecords("pages", locale)).find(
    (r) => r.slug === "home",
  );
  return pageMetadata({
    locale,
    title: t(
      locale,
      "Công ty Luật TNHH Vũ Khang Solutions & Partners — Tư vấn pháp lý doanh nghiệp",
      "Vũ Khang — Legal counsel in Vietnam",
    ),
    titleAbsolute: true,
    description: home?.seo?.description || home?.summary || INTRO[locale],
    path: `/${locale}`,
  });
}
export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale } = await params;
  const preview = (await searchParams).preview === "true";
  const home = preview
    ? await getPreviewRecord("pages", locale, "home")
    : (await getRecords("pages", locale)).find((r) => r.slug === "home");
  const records = await getRecords("services", locale);
  const layout = (await getSiteLayout(locale)).home;
  const href = (value?: string | null) => localizeHref(locale, value);
  const services = records.length
    ? records
    : demo
      ? samples.map((s) => ({
          id: undefined as string | number | undefined,
          slug: s.slug,
          title: t(locale, s.vi, s.en),
          summary: t(locale, s.description[0], s.description[1]),
        }))
      : [];
  const heroLines = (layout.heroTitle || "").split("\n");
  const homeTab = { global: "site-layout", tab: "home" } as const;
  return (
    <>
      {preview && home && <PreviewRefresh />}
      <Editable target={homeTab} label="phần mở đầu trang chủ">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span />
              {layout.heroKicker}
            </div>
            <h1 id="hero-title">
              {home?.title ||
                (heroLines.length >= 4 ? (
                  <>
                    {heroLines[0]} <br />
                    {heroLines[1]} <br />
                    <span>{lines(heroLines.slice(2).join("\n"))}</span>
                  </>
                ) : (
                  lines(layout.heroTitle)
                ))}
            </h1>
            <p>{home?.summary || layout.heroSummary}</p>
            <div className="hero-actions">
              <Link className="button red" href={href(layout.heroPrimary?.href)}>
                {layout.heroPrimary?.label}
                <ArrowUpRight size={19} />
              </Link>
              <Link
                className="hero-secondary"
                href={href(layout.heroSecondary?.href)}
              >
                {layout.heroSecondary?.label}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <BannerPhoto banner={home?.banner} locale={locale} />
          <a className="hero-scroll" href="#expertise">
            <ArrowDown size={18} />
            <span>{t(locale, "Khám phá Vũ Khang", "Discover Vũ Khang")}</span>
          </a>
        </section>
      </Editable>
      <Editable target={homeTab} label="dải khám phá">
        <div className="pathway-strip">
          <div>
            <span className="pathway-label">{layout.discoverTitle}</span>
          </div>
          {(layout.discoverCards ?? []).map((card, i) => (
            <Link key={i} href={href(card.href)}>
              <span className="path-number">0{i + 1}</span>
              <span>{card.title}</span>
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </div>
      </Editable>
      {home && (home.body || home.blocks?.length) && (
        <Editable
          target={{ collection: "pages", id: home.id }}
          label="nội dung trang chủ"
        >
          <section className="section article-body">
            <ContentBody record={home} />
          </section>
        </Editable>
      )}
      <Editable target={homeTab} label="mục 01">
        <section className="section intro">
          <div className="section-index">
            <span>01</span>
            <span>{layout.aboutKicker}</span>
          </div>
          <div className="intro-content">
            <h2>{lines(layout.aboutTitle)}</h2>
            <div className="intro-columns">
              <p className="lead">{layout.aboutLead}</p>
              <div>
                <p>{layout.aboutText}</p>
                <Link className="underlined" href={href(layout.aboutLink?.href)}>
                  {layout.aboutLink?.label}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Editable>
      <Editable target={homeTab} label="mục 02">
        <section className="section expertise" id="expertise">
          <div className="section-heading">
            <div>
              <div className="section-index">
                <span>02</span>
                <span>{layout.expertiseKicker}</span>
              </div>
              <h2>{lines(layout.expertiseTitle)}</h2>
            </div>
            <div className="section-heading-side">
              <p>{layout.expertiseText}</p>
              <Link
                className="underlined"
                href={href(layout.expertiseLink?.href)}
              >
                {layout.expertiseLink?.label}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="practice-layout">
            <div className="practice-photo">
              <Image
                src="/images/saigon.webp"
                alt={t(
                  locale,
                  "Đường chân trời Thành phố Hồ Chí Minh trong ánh hoàng hôn",
                  "Ho Chi Minh City skyline at sunset",
                )}
                fill
                sizes="(max-width:700px) 100vw, 34vw"
              />
              <div className="practice-photo-caption">
                <span>VIỆT NAM</span>
                <strong>
                  {t(
                    locale,
                    "Trong nhịp chuyển động\ncủa kinh doanh.",
                    "In a changing\nbusiness landscape.",
                  )}
                </strong>
              </div>
            </div>
            <div className="practice-list">
              {services.map((s, i) => {
                const item = (
                  <Link
                    className="practice-item"
                    href={"/" + locale + "/services/" + s.slug}
                    key={s.slug}
                  >
                    <span className="number">
                      {ordinal(i, services.length)}
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.summary}</p>
                    </div>
                    <ArrowUpRight className="practice-arrow" size={23} />
                  </Link>
                );
                return s.id ? (
                  <Editable
                    key={s.slug}
                    target={{ collection: "services", id: s.id }}
                    label="dịch vụ"
                  >
                    {item}
                  </Editable>
                ) : (
                  item
                );
              })}
              {!services.length && (
                <p>
                  {t(
                    locale,
                    "Thông tin chuyên môn đang được cập nhật.",
                    "Expertise information is being prepared.",
                  )}
                </p>
              )}
            </div>
          </div>
        </section>
      </Editable>
      <Editable target={homeTab} label="mục 03">
        <section className="section process">
          <div className="process-heading">
            <div className="section-index">
              <span>03</span>
              <span>{layout.startKicker}</span>
            </div>
            <h2>{lines(layout.startTitle)}</h2>
            <p>{layout.startText}</p>
            <Link className="underlined white" href={href(layout.startCta?.href)}>
              {layout.startCta?.label}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ol>
            {(layout.steps ?? []).map((step, i) => (
              <li key={i}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <MoveUpRight size={19} />
              </li>
            ))}
          </ol>
        </section>
      </Editable>
      <section className="section editorial">
        <div className="section-index">
          <span>04</span>
          <span>
            {t(locale, "Con người & góc nhìn", "People & perspectives")}
          </span>
        </div>
        <div className="editorial-grid">
          <Link className="editorial-people" href={"/" + locale + "/lawyers"}>
            <div className="editorial-label">
              {t(locale, "Đội ngũ", "Our people")}
              <ArrowUpRight size={26} />
            </div>
            <h2>
              {t(
                locale,
                "Chuyên môn bắt đầu\ntừ con người.",
                "Expertise begins\nwith people.",
              )}
            </h2>
            <p>
              {t(
                locale,
                "Tìm hiểu hồ sơ và lĩnh vực chuyên môn của luật sư.",
                "Explore lawyer profiles and their areas of practice.",
              )}
            </p>
            <span className="underlined">
              {t(locale, "Tìm luật sư", "Find a lawyer")}
              <ArrowRight size={18} />
            </span>
            {/* Huy hiệu công ty làm dấu nền, thay cho chữ VK trang trí trước đây. */}
            <img
              className="editorial-mark"
              src="/brand/logo-512.png"
              alt=""
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <Link
            className="editorial-insights"
            href={"/" + locale + "/articles"}
          >
            <div className="editorial-label">
              {t(locale, "Góc nhìn pháp lý", "Legal insights")}
              <ArrowUpRight size={26} />
            </div>
            <h2>
              {t(
                locale,
                "Đọc sâu hơn.\nNhìn rõ hơn.",
                "Read further.\nSee more clearly.",
              )}
            </h2>
            <p>
              {t(
                locale,
                "Khám phá nội dung chuyên môn theo chủ đề bạn quan tâm.",
                "Explore legal perspectives on the topics that interest you.",
              )}
            </p>
            <span className="underlined">
              {t(locale, "Khám phá góc nhìn", "Explore insights")}
              <ArrowRight size={18} />
            </span>
            <div className="insight-rule" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
