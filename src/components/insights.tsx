import { PageResources } from "./page-resources";
import Link from "next/link";
import { PageHeading } from "./content";
import { getRecords } from "@/lib/cms";
import { searchScore, searchableText } from "@/lib/search";
import { t, type Locale } from "@/lib/content";
export async function Insights({
  locale,
  query,
}: {
  locale: Locale;
  query: {
    q?: string;
    category?: string;
    page?: string;
    preview?: string;
    translation?: string;
  };
}) {
  const [articles, categories] = await Promise.all([
    getRecords("articles", locale),
    getRecords("categories", locale),
  ]);
  const q = (query.q || "").trim().slice(0, 150),
    category = query.category || "";
  const ids = (article: any) =>
    new Set(
      (article.categories || []).map((c: any) =>
        String(typeof c === "object" ? c.id : c),
      ),
    );
  const filtered = articles.filter(
    (a) => (!q || searchScore(a, q) > 0) && (!category || ids(a).has(category)),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 9)),
    current = Math.min(pages, Math.max(1, Math.floor(Number(query.page) || 1)));
  const href = (page: number) =>
    `/${locale}/articles?${new URLSearchParams({ q, category, page: String(page) })}`;
  return (
    <>
      <PageHeading
        locale={locale}
        path={`/${locale}/articles`}
        title={t(locale, "Góc nhìn pháp lý", "Legal insights")}
        summary={t(
          locale,
          "Tìm hiểu vấn đề, đối chiếu nguồn và chuẩn bị cho cuộc trao đổi chuyên sâu.",
          "Understand the issues, consult the sources and prepare for an informed conversation.",
        )}
      />
      <section className="section insights-section">
        {query.translation === "unavailable" && (
          <p className="status" role="status">
            {t(
              locale,
              "Bản dịch của nội dung này chưa được công bố.",
              "The translation of this content is not yet published.",
            )}
          </p>
        )}
        <div className="directory-intro">
          <div>
            <span className="eyebrow dark">
              {t(locale, "Thư viện kiến thức", "Knowledge library")}
            </span>
            <h2>
              {t(
                locale,
                "Đọc có trọng tâm.\nHiểu trong đúng bối cảnh.",
                "Read with purpose.\nUnderstand the context.",
              )}
            </h2>
          </div>
          <p>
            {t(
              locale,
              "Nội dung tham khảo cần được đọc cùng nguồn và thời điểm cập nhật. Đối với vụ việc cụ thể, hãy trao đổi để làm rõ hồ sơ và phạm vi áp dụng.",
              "Read reference material alongside its sources and update date. For a specific matter, discuss the facts and applicable scope.",
            )}
          </p>
        </div>
        <form className="insights-filter">
          <div>
            <label htmlFor="insight-q">
              {t(locale, "Tìm trong bài viết", "Search articles")}
            </label>
            <input
              id="insight-q"
              name="q"
              defaultValue={q}
              maxLength={150}
              placeholder={t(
                locale,
                "Vấn đề bạn đang quan tâm…",
                "What would you like to understand?",
              )}
            />
          </div>
          <div>
            <label htmlFor="insight-topic">
              {t(locale, "Chủ đề", "Topic")}
            </label>
            <select id="insight-topic" name="category" defaultValue={category}>
              <option value="">
                {t(locale, "Tất cả chủ đề", "All topics")}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <button className="button red">
            {t(locale, "Tìm bài viết", "Search")}
          </button>
        </form>
        {(q || category) && (
          <div className="directory-results">
            <p role="status">
              {filtered.length}{" "}
              {t(locale, "bài viết phù hợp", "matching articles")}
            </p>
            <Link href={`/${locale}/articles`}>
              {t(locale, "Xóa bộ lọc", "Clear filters")}
            </Link>
          </div>
        )}
        {filtered.length ? (
          <div className="insight-cards">
            {filtered.slice((current - 1) * 9, current * 9).map((a) => (
              <article key={a.id} className="insight-card">
                <div className="meta">
                  {categories
                    .filter((c) => ids(a).has(String(c.id)))
                    .map((c) => c.title)
                    .join(" · ") ||
                    t(locale, "Góc nhìn pháp lý", "Legal insights")}
                </div>
                <h2>
                  <Link href={`/${locale}/articles/${a.slug}`}>{a.title}</Link>
                </h2>
                <p>{a.summary}</p>
                <div className="insight-card-bottom">
                  <span>
                    {Math.max(
                      1,
                      Math.ceil(searchableText(a).split(/\s+/).length / 220),
                    )}{" "}
                    {t(locale, "phút đọc · ước tính", "min read · estimated")}
                  </span>
                  <Link
                    href={`/${locale}/articles/${a.slug}`}
                    aria-label={`${t(locale, "Đọc bài", "Read")}: ${a.title}`}
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="people-empty">
            <div>
              <h2>
                {q || category
                  ? t(
                      locale,
                      "Không có bài viết phù hợp",
                      "No matching articles",
                    )
                  : t(
                      locale,
                      "Bài viết đang được chuẩn bị và rà soát",
                      "Articles are being prepared and reviewed",
                    )}
              </h2>
              <p>
                {t(
                  locale,
                  "Bạn có thể xem hướng dẫn khách hàng hoặc gửi vấn đề cần trao đổi trong khi nội dung chuyên môn được hoàn thiện.",
                  "You can read the client guide or send an enquiry while editorial content is being prepared.",
                )}
              </p>
              <Link className="underlined" href={`/${locale}/guide`}>
                {t(locale, "Đọc hướng dẫn khách hàng", "Read the client guide")}{" "}
                →
              </Link>
            </div>
          </div>
        )}
        {pages > 1 && (
          <nav
            className="pagination"
            aria-label={t(locale, "Phân trang bài viết", "Article pagination")}
          >
            {current > 1 && (
              <Link href={href(current - 1)}>
                {t(locale, "Trước", "Previous")}
              </Link>
            )}
            <span>
              {current} / {pages}
            </span>
            {current < pages && (
              <Link href={href(current + 1)}>{t(locale, "Sau", "Next")}</Link>
            )}
          </nav>
        )}
        <div className="editorial-note">
          <h2>
            {t(
              locale,
              "Từ kiến thức đến vấn đề của bạn",
              "From information to your matter",
            )}
          </h2>
          <p>
            {t(
              locale,
              "Bài viết không thay thế tư vấn dựa trên hồ sơ cụ thể. Khi gửi yêu cầu, hãy nêu mục tiêu và thời hạn cần lưu ý; chưa gửi tài liệu mật.",
              "Articles do not replace advice on your specific circumstances. Mention your objectives and relevant deadlines in your enquiry; do not include confidential files.",
            )}
          </p>
          <Link className="button red" href={`/${locale}/consultation`}>
            {t(locale, "Trao đổi với Vũ Khang", "Talk to Vũ Khang")} ↗
          </Link>
        </div>
      </section>
      <PageResources
        section="articles"
        locale={locale}
        preview={query.preview === "true"}
      />
    </>
  );
}
