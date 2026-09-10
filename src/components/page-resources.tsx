import { getRecords } from "@/lib/cms";
import { getPreviewRecord } from "@/lib/preview";
import { PreviewRefresh } from "./preview-refresh";
import { ContentBody } from "./content";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { localText, pageResources } from "@/lib/page-resources";

export async function PageResources({
  section,
  locale,
  preview = false,
}: {
  section: string;
  locale: Locale;
  preview?: boolean;
}) {
  const resource = pageResources[section];
  if (!resource) return null;
  const published = (await getRecords("pages", locale)).find(
    (record) => record.slug === section,
  );
  const draft = preview
    ? await getPreviewRecord("pages", locale, section)
    : null;
  const record = draft || published;
  return (
    <section
      className="section resource-section"
      aria-labelledby={`resources-${section}`}
    >
      {draft && <PreviewRefresh />}
      <div className="resource-intro">
        <span className="eyebrow dark">
          {localText(
            ["Thông tin hữu ích", "Useful information", "实用信息"],
            locale,
          )}
        </span>
        <h2 id={`resources-${section}`}>
          {record?.title || localText(resource.title, locale)}
        </h2>
        <p>{record?.summary || localText(resource.intro, locale)}</p>
      </div>
      {record ? (
        <article className="article-body">
          <ContentBody record={record} />
        </article>
      ) : (
        <div className="resource-grid">
          {resource.cards.map(([title, body], index) => (
            <article className="resource-card" key={title[0]}>
              <span className="resource-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{localText(title, locale)}</h3>
              <p>{localText(body, locale)}</p>
            </article>
          ))}
        </div>
      )}
      {section !== "careers" && (
        <div className="resource-actions">
          <Link className="button red" href={`/${locale}/consultation`}>
            {localText(
              [
                "Trao đổi về vấn đề của bạn",
                "Discuss your matter",
                "沟通您的问题",
              ],
              locale,
            )}{" "}
            ↗
          </Link>
          <Link className="underlined" href={`/${locale}/guide`}>
            {localText(
              [
                "Hướng dẫn trước khi liên hệ",
                "Before getting in touch",
                "联系前的准备指南",
              ],
              locale,
            )}{" "}
            →
          </Link>
        </div>
      )}
    </section>
  );
}
