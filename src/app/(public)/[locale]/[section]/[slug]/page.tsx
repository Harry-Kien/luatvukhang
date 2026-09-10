import Link from "next/link";
import { RecordDetails, RelatedContent } from "@/components/record-details";
import { notFound } from "next/navigation";
import { PageHeading, ContentBody } from "@/components/content";
import { getRecords, getSampleRecords } from "@/lib/cms";
import { applyRedirect } from "@/lib/redirects";
import { getPreviewRecord } from "@/lib/preview";
import { PreviewRefresh } from "@/components/preview-refresh";
import { demo, samples, t, type Locale } from "@/lib/content";
import { navigation } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import {
  absolute,
  articleJsonLd,
  faqJsonLd,
  jobPostingJsonLd,
  pageMetadata,
  personJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
type Props = {
  params: Promise<{ locale: Locale; section: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};
const DETAIL_SECTIONS = [
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
];
async function resolve(params: Awaited<Props["params"]>) {
  const { locale, section, slug } = params;
  if (!DETAIL_SECTIONS.includes(section)) return null;
  return (
    (await getRecords(section, locale)).find((r) => r.slug === slug) || null
  );
}
/**
 * Bản ghi minh họa lưu trong CMS, chỉ tồn tại ở chế độ demo. Dùng để xem trước
 * bố cục trang chi tiết khi công ty chưa nhập nội dung thật; không bao giờ phát
 * dữ liệu có cấu trúc và luôn hiển thị kèm nhãn.
 */
async function resolveSample(params: Awaited<Props["params"]>) {
  const { locale, section, slug } = params;
  if (!DETAIL_SECTIONS.includes(section)) return null;
  return (
    (await getSampleRecords(section, locale)).find((r) => r.slug === slug) ||
    null
  );
}
/** Nhãn cho các mục không nằm trong thanh điều hướng chính. */
const sectionNames: Record<string, [string, string]> = {
  industries: ["Ngành nghề", "Industries"],
  careers: ["Cơ hội nghề nghiệp", "Careers"],
};
/**
 * Chọn loại schema.org theo bộ sưu tập. Chỉ phát khi có bản ghi đã xuất bản —
 * nội dung minh họa và bản xem trước không được mô tả như nội dung công bố.
 */
function structuredDataFor(
  record: Awaited<ReturnType<typeof resolve>>,
  locale: Locale,
  section: string,
  path: string,
) {
  if (!record) return [];
  const data: object[] = [];
  if (section === "articles") data.push(articleJsonLd(record, locale, path));
  else if (section === "lawyers") data.push(personJsonLd(record, locale, path));
  else if (section === "careers") data.push(jobPostingJsonLd(record, path));
  else if (section === "services" || section === "industries")
    data.push(serviceJsonLd(record, locale, path));
  if (record.faq?.length) data.push(faqJsonLd(record.faq));
  return data;
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const r = await resolve(p);
  // Bản ghi minh họa chỉ dùng để đặt tiêu đề/mô tả cho trang xem trước; hreflang
  // vẫn chỉ tính trên nội dung đã xuất bản.
  const sampleRecord = r ? null : await resolveSample(p);
  const s =
    demo && p.section === "services"
      ? samples.find((s) => s.slug === p.slug)
      : null;
  const languages: Partial<Record<Locale, string>> = {};
  for (const language of ["vi", "en", "zh"] as const) {
    if (language === p.locale && (r || s))
      languages[language] = `/${language}/${p.section}/${p.slug}`;
    else if (r?.translationKey) {
      const translated = (await getRecords(p.section, language)).find(
        (item) => item.translationKey === r.translationKey,
      );
      if (translated)
        languages[language] = `/${language}/${p.section}/${translated.slug}`;
    } else if (s) languages[language] = `/${language}/${p.section}/${p.slug}`;
  }
  const portrait =
    r?.portrait && typeof r.portrait === "object" ? r.portrait.url : undefined;
  return pageMetadata({
    locale: p.locale,
    title:
      r?.seo?.title ||
      r?.title ||
      sampleRecord?.title ||
      (s ? t(p.locale, s.vi, s.en) : "404"),
    description:
      r?.seo?.description ||
      r?.summary ||
      sampleRecord?.summary ||
      (s ? t(p.locale, s.description[0], s.description[1]) : undefined),
    path: `/${p.locale}/${p.section}/${p.slug}`,
    alternates: languages as Partial<Record<Locale, string>>,
    type:
      p.section === "articles"
        ? "article"
        : p.section === "lawyers"
          ? "profile"
          : "website",
    publishedTime: r?.createdAt,
    modifiedTime: r?.updatedAt,
    authors:
      r?.author && typeof r.author === "object" && r.author.title
        ? [r.author.title]
        : undefined,
    images: portrait ? [absolute(portrait)] : undefined,
    // Không có bản ghi thật lẫn nội dung mẫu nghĩa là trang 404.
    noindex: !r && !s,
  });
}
export default async function Detail({ params, searchParams }: Props) {
  const p = await params;
  const { locale, section, slug } = p;
  const preview = (await searchParams).preview === "true";
  const published = preview
    ? await getPreviewRecord(section, locale, slug)
    : await resolve(p);
  // Chưa có bản ghi đã xuất bản thì mở bản minh họa trong CMS (chỉ ở demo).
  const sampleRecord = published ? null : await resolveSample(p);
  const record = published ?? sampleRecord;
  const sample =
    demo && section === "services"
      ? samples.find((s) => s.slug === slug)
      : null;
  if (!record && !sample) {
    await applyRedirect("/" + locale + "/" + section + "/" + slug);
    notFound();
  }
  const title = record?.title || t(locale, sample!.vi, sample!.en);
  const path = `/${locale}/${section}/${slug}`;
  const nav = navigation.find((n) => n[0] === section);
  const sectionLabel = nav
    ? t(locale, nav[1], nav[2])
    : t(locale, ...(sectionNames[section] ?? [section, section]));
  // Bản xem trước và nội dung minh họa không được phát dữ liệu có cấu trúc:
  // schema.org mô tả nội dung công ty đã công bố, không mô tả bản nháp.
  const structured =
    preview || sampleRecord
      ? []
      : structuredDataFor(published, locale, section, path);
  return (
    <>
      {preview && record && <PreviewRefresh />}
      {structured.length > 0 && <JsonLd data={structured} />}
      <PageHeading
        locale={locale}
        path={path}
        trail={[{ name: sectionLabel, path: `/${locale}/${section}` }]}
        title={title}
        summary={
          record?.summary ||
          (sample
            ? t(locale, sample.description[0], sample.description[1])
            : undefined)
        }
      />
      <div className="detail-back">
        <Link href={`/${locale}/${section}`}>
          ← {t(locale, "Trở về danh sách", "Back to listing")}
        </Link>
      </div>
      <section className="section content-grid">
        <article className="article-body">
          {sample && !record ? (
            <>
              <span className="sample-badge">
                {t(
                  locale,
                  "Nội dung dịch vụ minh họa — chưa được công bố chính thức",
                  "Sample service content — not officially published",
                )}
              </span>
              <h2>
                {t(
                  locale,
                  "Khi nào cần trao đổi?",
                  "When to start a conversation",
                )}
              </h2>
              <p>
                {t(
                  locale,
                  "Khi doanh nghiệp cần làm rõ quyền, nghĩa vụ hoặc các lựa chọn trước một quyết định. Buổi trao đổi ban đầu giúp xác định vấn đề, tài liệu liên quan và phạm vi hỗ trợ phù hợp.",
                  "When your business needs to clarify rights, obligations or options before making a decision. An initial conversation helps identify the issues, relevant documents and an appropriate scope.",
                )}
              </p>
              <h2>
                {t(
                  locale,
                  "Phạm vi hỗ trợ dự kiến",
                  "Proposed scope of support",
                )}
              </h2>
              <ul>
                {(locale === "vi" ? sample.scope : sample.scopeEn).map(
                  (item) => (
                    <li key={item}>{t(locale, item, item)}</li>
                  ),
                )}
              </ul>
              <h2>{t(locale, "Cách bắt đầu", "How to begin")}</h2>
              <p>
                {t(
                  locale,
                  "Hãy mô tả ngắn bối cảnh, mục tiêu và thời hạn dự kiến. Phạm vi, phí dịch vụ và người phụ trách chỉ được xác định sau khi trao đổi và thống nhất.",
                  "Briefly describe the context, objectives and expected timeline. Scope, fees and the responsible lawyer are determined following discussion and agreement.",
                )}
              </p>
            </>
          ) : (
            record && (
              <>
                {sampleRecord && (
                  <span className="sample-badge">
                    {t(
                      locale,
                      "Nội dung minh họa để xem trước bố cục — chưa phải thông tin chính thức của công ty",
                      "Illustrative content shown to preview the layout — not the firm's official information",
                    )}
                  </span>
                )}
                {record.position && <p className="meta">{record.position}</p>}
                {section === "articles" && record.updatedAt && (
                  <p className="meta">
                    {t(locale, "Cập nhật", "Updated")}{" "}
                    {new Intl.DateTimeFormat(
                      locale === "vi"
                        ? "vi-VN"
                        : locale === "zh"
                          ? "zh-CN"
                          : "en-GB",
                      { dateStyle: "long" },
                    ).format(new Date(record.updatedAt))}
                  </p>
                )}
                <RecordDetails
                  record={record}
                  locale={locale}
                  section={section}
                />
                <ContentBody record={record} />
                <RelatedContent record={record} locale={locale} />
                {record.scope && (
                  <>
                    <h2>{t(locale, "Phạm vi hỗ trợ", "Scope of support")}</h2>
                    <ul>
                      {record.scope.map((s, i) => (
                        <li key={i}>{s.item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {record.sources?.length ? (
                  <>
                    <h2>{t(locale, "Nguồn tham khảo", "Sources")}</h2>
                    <ul>
                      {record.sources.map((s) => (
                        <li key={s.url}>
                          <a
                            href={
                              /^https?:\/\//.test(s.url) ? s.url : undefined
                            }
                            rel="noreferrer"
                            target="_blank"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </>
            )
          )}
        </article>
        <aside className="sidebar">
          <span className="eyebrow dark">
            {t(locale, "Trao đổi cùng chúng tôi", "Talk to us")}
          </span>
          <h2>
            {t(
              locale,
              "Vấn đề của bạn\ncần một góc nhìn rõ ràng.",
              "A clear perspective\non your matter.",
            )}
          </h2>
          <p>
            {t(
              locale,
              "Gửi yêu cầu với lĩnh vực đã chọn. Lịch hẹn sẽ được xác nhận riêng.",
              "Send a request with your selected area. Appointments are confirmed separately.",
            )}
          </p>
          <Link
            className="button red"
            href={`/${locale}/consultation?service=${encodeURIComponent(title)}`}
          >
            {t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")} ↗
          </Link>
        </aside>
      </section>
    </>
  );
}
