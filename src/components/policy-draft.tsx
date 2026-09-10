import {zhPolicies} from "@/lib/zh-content";
import { policyDrafts } from "@/lib/policy-drafts";
import { t, type Locale } from "@/lib/content";
export function PolicyDraft({
  kind,
  locale,
}: {
  kind: "privacy" | "terms";
  locale: Locale;
}) {
  const sections = locale === "zh" ? zhPolicies[kind] : policyDrafts[kind][locale];
  return (
    <>
      <div className="policy-status">
        <strong>
          {t(
            locale,
            "Dự thảo — chưa có hiệu lực áp dụng",
            "Draft — not yet in effect",
          )}
        </strong>
        <p>
          {t(
            locale,
            "Nội dung để công ty rà soát trong bản phát triển. Thông tin vận hành còn thiếu phải được xác nhận trước khi công bố.",
            "For review in this development version. Missing operational details must be confirmed before publication.",
          )}
        </p>
      </div>
      <nav
        className="article-toc"
        aria-label={t(locale, "Mục lục", "Contents")}
      >
        <ol>
          {sections.map(([heading], i) => (
            <li key={heading}>
              <a href={`#policy-${i}`}>{heading}</a>
            </li>
          ))}
        </ol>
      </nav>
      {sections.map(([heading, body], i) => (
        <section key={heading}>
          <h2 id={`policy-${i}`}>
            {String(i + 1).padStart(2, "0")}. {heading}
          </h2>
          <p>{body}</p>
        </section>
      ))}
    </>
  );
}
