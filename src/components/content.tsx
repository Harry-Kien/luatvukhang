import { Fragment } from "react";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { t, type Locale } from "@/lib/content";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
export function PageHeading({
  locale,
  title,
  summary,
  path,
  trail = [],
}: {
  locale: Locale;
  title: string;
  summary?: string;
  /** Đường dẫn canonical của trang; có giá trị này mới phát BreadcrumbList. */
  path?: string;
  /** Các cấp trung gian giữa trang chủ và trang hiện tại. */
  trail?: { name: string; path: string }[];
}) {
  const crumbs = [
    { name: t(locale, "Trang chủ", "Home"), path: `/${locale}` },
    ...trail,
  ];
  return (
    <div className="page-heading">
      <div className="breadcrumb">
        {crumbs.map((crumb) => (
          <Fragment key={crumb.path}>
            <Link href={crumb.path}>{crumb.name}</Link>
            <span>/</span>
          </Fragment>
        ))}
        <span>{title}</span>
      </div>
      <h1>{title}</h1>
      {summary && <p>{summary}</p>}
      {path && (
        <JsonLd data={breadcrumbJsonLd([...crumbs, { name: title, path }])} />
      )}
    </div>
  );
}
export function ContentBody({ record }: { record: any }) {
  return (
    <>
      {record.body && <RichText data={record.body} />}
      {record.blocks
        ?.filter((b: any) => b.visible !== false)
        .map((b: any, i: number) => (
          <section key={b.id || i}>
            {b.heading && <h2 id={`section-${i}`}>{b.heading}</h2>}
            {b.blockType === "text" && b.body && <RichText data={b.body} />}
            {b.blockType === "callout" && (
              <div className="status">{b.body}</div>
            )}
            {b.blockType === "image" &&
              typeof b.image === "object" &&
              b.image?.url && (
                <figure>
                  <img
                    src={b.image.url}
                    alt={b.image.alt || ""}
                    width={b.image.width}
                    height={b.image.height}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <figcaption className="meta">{b.caption}</figcaption>
                </figure>
              )}
          </section>
        ))}
    </>
  );
}
export function EmptyContent({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  return (
    <div className="empty">
      <span className="eyebrow dark">
        {t(
          locale,
          "Thông tin đang được chuẩn bị",
          "Information in preparation",
        )}
      </span>
      <h2>{title}</h2>
      <p>
        {t(
          locale,
          "Nội dung sẽ được hiển thị sau khi hoàn tất xác minh và phê duyệt công bố.",
          "Content will appear once verification and publication approval are complete.",
        )}
      </p>
      <Link href={`/${locale}/contact`} className="underlined">
        {t(locale, "Liên hệ với chúng tôi", "Contact us")} →
      </Link>
    </div>
  );
}
