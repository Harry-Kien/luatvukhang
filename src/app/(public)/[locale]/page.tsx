import Link from "next/link";
import { BannerPhoto } from "@/components/banner-photo";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ArrowDown, MoveUpRight } from "lucide-react";
import { t, type Locale, demo, ordinal, samples } from "@/lib/content";
import { getPreviewRecord } from "@/lib/preview";
import { PreviewRefresh } from "@/components/preview-refresh";
import { ContentBody } from "@/components/content";
import { getRecords } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
const INTRO: Record<Locale, string> = {
  zh: "Vũ Khang — 为越南投资、企业经营、合同与争议问题提供清晰的法律视角。",
  vi: "Công ty Luật Vũ Khang Solutions & Partners — góc nhìn pháp lý rõ ràng cho đầu tư, doanh nghiệp, hợp đồng và giải quyết tranh chấp tại Việt Nam.",
  en: "Vũ Khang — a clear legal perspective on investment, corporate, contract and dispute matters in Vietnam.",
};
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
      "Công ty Luật Vũ Khang Solutions & Partners — Tư vấn pháp lý doanh nghiệp",
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
  const services = records.length
    ? records
    : demo
      ? samples.map((s) => ({
          slug: s.slug,
          title: t(locale, s.vi, s.en),
          summary: t(locale, s.description[0], s.description[1]),
        }))
      : [];
  return (
    <>
      {preview && home && <PreviewRefresh />}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span />
            {t(
              locale,
              "Công ty Luật Vũ Khang Solutions & Partners",
              "Vũ Khang · Legal counsel",
            )}
          </div>
          <h1 id="hero-title">
            {home?.title || (
              <>
                {t(locale, "Thấu hiểu", "Understand")} <br />
                {t(locale, "vấn đề.", "the matter.")} <br />
                <span>
                  {t(locale, "Vững vàng", "Decide with")} <br />
                  {t(locale, "quyết định.", "confidence.")}
                </span>
              </>
            )}
          </h1>
          <p>
            {home?.summary ||
              t(
                locale,
                "Góc nhìn pháp lý rõ ràng cho những quyết định quan trọng — từ hoạt động kinh doanh đến bảo vệ quyền và lợi ích của bạn.",
                "A clear legal perspective on the decisions that matter — from business operations to protecting your rights and interests.",
              )}
          </p>
          <div className="hero-actions">
            <Link className="button red" href={"/" + locale + "/consultation"}>
              {t(locale, "Trao đổi với Vũ Khang", "Talk to Vũ Khang")}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="hero-secondary" href={"/" + locale + "/services"}>
              {t(locale, "Khám phá chuyên môn", "Explore expertise")}
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
      <div className="pathway-strip">
        <div>
          <span className="pathway-label">
            {t(
              locale,
              "Bắt đầu từ nhu cầu của bạn",
              "Start with what you need",
            )}
          </span>
        </div>
        {[
          [
            t(locale, "Tìm chuyên môn phù hợp", "Find the right expertise"),
            "services",
          ],
          [
            t(locale, "Tìm hiểu đội ngũ luật sư", "Meet the legal team"),
            "lawyers",
          ],
          [
            t(locale, "Gửi yêu cầu tư vấn", "Request a consultation"),
            "consultation",
          ],
        ].map(([label, path], i) => (
          <Link key={path} href={"/" + locale + "/" + path}>
            <span className="path-number">0{i + 1}</span>
            <span>{label}</span>
            <ArrowUpRight size={19} />
          </Link>
        ))}
      </div>
      {home && (home.body || home.blocks?.length) && (
        <section className="section article-body">
          <ContentBody record={home} />
        </section>
      )}
      <section className="section intro">
        <div className="section-index">
          <span>01</span>
          <span>{t(locale, "Về Vũ Khang", "About Vũ Khang")}</span>
        </div>
        <div className="intro-content">
          <h2>
            {t(
              locale,
              "Pháp lý không tách rời\nbối cảnh của bạn.",
              "The law, understood\nin your context.",
            )}
          </h2>
          <div className="intro-columns">
            <p className="lead">
              {t(
                locale,
                "Đằng sau mỗi vấn đề pháp lý là một mục tiêu, một mối quan tâm và một quyết định cần được cân nhắc kỹ lưỡng.",
                "Behind every legal matter is an objective, a concern and a decision that deserves careful consideration.",
              )}
            </p>
            <div>
              <p>
                {t(
                  locale,
                  "Hiểu đúng bối cảnh là điểm khởi đầu để xác định vấn đề trọng tâm, đánh giá các lựa chọn và làm rõ bước tiếp theo.",
                  "Understanding the context is the starting point for identifying the key issues, assessing the options and clarifying the next step.",
                )}
              </p>
              <Link className="underlined" href={"/" + locale + "/about"}>
                {t(locale, "Tìm hiểu về Vũ Khang", "Discover Vũ Khang")}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section expertise" id="expertise">
        <div className="section-heading">
          <div>
            <div className="section-index">
              <span>02</span>
              <span>
                {t(locale, "Lĩnh vực chuyên môn", "Areas of practice")}
              </span>
            </div>
            <h2>
              {t(
                locale,
                "Góc nhìn chuyên sâu.\nHướng tiếp cận phù hợp.",
                "Focused perspectives.\nAn informed approach.",
              )}
            </h2>
          </div>
          <div className="section-heading-side">
            <p>
              {t(
                locale,
                "Tìm hiểu phạm vi hỗ trợ theo từng vấn đề bạn đang quan tâm.",
                "Explore the scope of support for the issues that matter to you.",
              )}
            </p>
            <Link className="underlined" href={"/" + locale + "/services"}>
              {t(locale, "Tất cả chuyên môn", "All expertise")}
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
            {services.map((s, i) => (
              <Link
                className="practice-item"
                href={"/" + locale + "/services/" + s.slug}
                key={s.slug}
              >
                <span className="number">{ordinal(i, services.length)}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                </div>
                <ArrowUpRight className="practice-arrow" size={23} />
              </Link>
            ))}
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
      <section className="section process">
        <div className="process-heading">
          <div className="section-index">
            <span>03</span>
            <span>{t(locale, "Cách bắt đầu", "Getting started")}</span>
          </div>
          <h2>
            {t(
              locale,
              "Rõ ràng từ\ncuộc trao đổi đầu tiên.",
              "Clarity from the\nfirst conversation.",
            )}
          </h2>
          <p>
            {t(
              locale,
              "Một hành trình có trọng tâm, từ việc hiểu nhu cầu đến thống nhất bước tiếp theo.",
              "A focused journey, from understanding your needs to agreeing on the next step.",
            )}
          </p>
          <Link
            className="underlined white"
            href={"/" + locale + "/consultation"}
          >
            {t(locale, "Bắt đầu trao đổi", "Start a conversation")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <ol>
          {[
            [
              t(locale, "Lắng nghe bối cảnh", "Understand the context"),
              t(
                locale,
                "Chia sẻ vấn đề, mục tiêu và thời hạn bạn đang cân nhắc.",
                "Share your matter, objectives and the timeline you have in mind.",
              ),
            ],
            [
              t(locale, "Làm rõ phạm vi", "Clarify the scope"),
              t(
                locale,
                "Trao đổi về hồ sơ cần thiết, phạm vi hỗ trợ và điều kiện dịch vụ.",
                "Discuss relevant documents, the scope of support and engagement terms.",
              ),
            ],
            [
              t(locale, "Thống nhất bước tiếp theo", "Agree on next steps"),
              t(
                locale,
                "Lịch hẹn và công việc được xác nhận sau khi hai bên trao đổi.",
                "Appointments and work are confirmed following discussion.",
              ),
            ],
          ].map(([title, body], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <MoveUpRight size={19} />
            </li>
          ))}
        </ol>
      </section>
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
              {t(locale, "Đội ngũ luật sư", "Our people")}
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
            <span className="editorial-word" aria-hidden="true">
              VK.
            </span>
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
