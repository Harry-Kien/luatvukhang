import Link from "next/link";
import { CmsImage } from "./cms-image";
import { getRecords, type ContentRecord } from "@/lib/cms";
import { t, type Locale } from "@/lib/content";
export async function RecordDetails({
  record: r,
  locale,
  section,
}: {
  record: ContentRecord;
  locale: Locale;
  section: string;
}) {
  const headings =
    r.blocks
      ?.filter((b: any) => b.visible !== false)
      .map((b: any, i: number) => ({ heading: b.heading, id: `section-${i}` }))
      .filter((b: any) => b.heading) || [];
  const authorId = typeof r.author === "object" ? r.author?.id : r.author;
  const officeId = typeof r.office === "object" ? r.office?.id : r.office;
  const [authors, offices] = await Promise.all([
    authorId ? getRecords("lawyers", locale) : Promise.resolve([]),
    officeId ? getRecords("offices", locale) : Promise.resolve([]),
  ]);
  const author = authors.find((a) => String(a.id) === String(authorId));
  const office = offices.find((o) => String(o.id) === String(officeId));
  return (
    <>
      {r.portrait?.url && (
        <CmsImage
          className="lawyer-portrait"
          media={r.portrait}
          fallbackAlt={r.title}
          sizes="(max-width: 700px) 100vw, 460px"
          priority
        />
      )}
      {author && (
        <p className="meta">
          {t(locale, "Tác giả", "Author")}:{" "}
          <Link href={`/${locale}/lawyers/${author.slug}`}>{author.title}</Link>
        </p>
      )}
      {(r.qualifications || r.languages || r.location) && (
        <dl className="profile-facts">
          {r.qualifications && (
            <>
              <dt>{t(locale, "Thông tin nghề nghiệp", "Qualifications")}</dt>
              <dd>{r.qualifications}</dd>
            </>
          )}
          {r.languages && (
            <>
              <dt>{t(locale, "Ngôn ngữ", "Languages")}</dt>
              <dd>{r.languages}</dd>
            </>
          )}
          {r.location && (
            <>
              <dt>{t(locale, "Nơi làm việc", "Location")}</dt>
              <dd>{r.location}</dd>
            </>
          )}
        </dl>
      )}
      {office && (
        <section className="profile-office">
          <h2>{t(locale, "Văn phòng", "Office")}</h2>
          <h3>{office.title}</h3>
          <p>{office.summary}</p>
          <Link className="underlined" href={`/${locale}/contact`}>
            {t(locale, "Thông tin liên hệ", "Contact details")} ↗
          </Link>
        </section>
      )}
      {section === "careers" && (
        <div className="status">
          {r.closingDate && (
            <p>
              {t(locale, "Hạn ứng tuyển", "Application deadline")}:{" "}
              {new Date(r.closingDate).toLocaleDateString(
                locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : "en-GB",
              )}
            </p>
          )}
          {r.closingDate && new Date(r.closingDate) < new Date() ? (
            <p>
              {t(
                locale,
                "Đã hết hạn nhận hồ sơ cho vị trí này.",
                "Applications for this position are closed.",
              )}
            </p>
          ) : (
            r.applicationEmail && (
              <a
                className="underlined"
                href={`mailto:${r.applicationEmail}?subject=${encodeURIComponent(r.title)}`}
              >
                {t(locale, "Gửi hồ sơ ứng tuyển", "Apply by email")} ↗
              </a>
            )
          )}
        </div>
      )}
      {headings.length > 1 && (
        <nav
          className="article-toc"
          aria-label={t(locale, "Mục lục bài viết", "On this page")}
        >
          <strong>{t(locale, "Trong nội dung này", "On this page")}</strong>
          <ol>
            {headings.map((h: any) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {r.audience && (
        <section>
          <h2>{t(locale, "Khi nào cần hỗ trợ?", "When can we help?")}</h2>
          <p>{r.audience}</p>
        </section>
      )}
      {!!r.process?.length && (
        <section>
          <h2>{t(locale, "Quy trình hỗ trợ", "Our approach")}</h2>
          <ol className="detail-process">
            {r.process.map((step: any, i: number) => (
              <li key={i}>
                <h3>{step.heading}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {!!r.faq?.length && (
        <section>
          <h2>
            {t(locale, "Câu hỏi thường gặp", "Frequently asked questions")}
          </h2>
          <div className="faq-list">
            {r.faq.map((f: any, i: number) => (
              <details key={i}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export async function RelatedContent({
  record,
  locale,
}: {
  record: ContentRecord;
  locale: Locale;
}) {
  const groups = await Promise.all(
    (
      [
        ["services", "Chuyên môn liên quan", "Related expertise"],
        ["lawyers", "Luật sư liên quan", "Related people"],
        ["experience", "Kinh nghiệm liên quan", "Related experience"],
        ["articles", "Bài viết liên quan", "Related insights"],
      ] as const
    ).map(async ([collection, vi, en]) => {
      const ids = new Set(
        (record[collection] || []).map((r: any) =>
          String(typeof r === "object" ? r.id : r),
        ),
      );
      const records = ids.size
        ? (await getRecords(collection, locale)).filter((r) =>
            ids.has(String(r.id)),
          )
        : [];
      return { collection, title: t(locale, vi, en), records };
    }),
  );
  return (
    <>
      {groups
        .filter((g) => g.records.length)
        .map((g) => (
          <section className="related-content" key={g.collection}>
            <h2>{g.title}</h2>
            {g.records.map((r) => (
              <Link href={`/${locale}/${g.collection}/${r.slug}`} key={r.id}>
                <h3>
                  {r.title} <span aria-hidden="true">↗</span>
                </h3>
                <p>{r.summary}</p>
              </Link>
            ))}
          </section>
        ))}
    </>
  );
}
