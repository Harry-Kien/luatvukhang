import { PageResources } from "./page-resources";
import Link from "next/link";
import { ArrowUpRight, Users, Search } from "lucide-react";
import { PageHeading } from "./content";
import { CmsImage } from "./cms-image";
import { getRecords, getSampleRecords, type ContentRecord } from "@/lib/cms";
import { fold, t, type Locale } from "@/lib/content";
type Query = {
  q?: string;
  service?: string;
  page?: string;
  sort?: string;
  preview?: string;
  translation?: string;
};
export async function PeopleDirectory({
  locale,
  query,
}: {
  locale: Locale;
  query: Query;
}) {
  const [published, services] = await Promise.all([
    getRecords("lawyers", locale),
    getRecords("services", locale),
  ]);
  /**
   * Chưa có hồ sơ thật thì dùng hồ sơ minh họa để công ty xem trước bố cục.
   * Chỉ xảy ra ở chế độ demo; khi ra mắt, danh sách rỗng trở lại và trạng thái
   * "đang cập nhật" phía dưới được hiển thị đúng như trước.
   */
  const sampleProfiles = published.length
    ? []
    : await getSampleRecords("lawyers", locale);
  const people = published.length ? published : sampleProfiles;
  const showingSamples = sampleProfiles.length > 0;
  const keyword = (query.q || "").slice(0, 150),
    service = query.service || "";
  const sort = query.sort === "za" ? "za" : "az";
  const related = (r: ContentRecord) =>
    new Set(
      (r.services || []).map((s: any) =>
        String(typeof s === "object" ? s.id : s),
      ),
    );
  const filtered = people
    .filter(
      (r) =>
        fold(
          `${r.title} ${r.position || ""} ${r.summary} ${r.languages || ""}`,
        ).includes(fold(keyword)) &&
        (!service || related(r).has(service)),
    )
    .sort(
      (a, b) =>
        a.title.localeCompare(b.title, locale) * (sort === "za" ? -1 : 1),
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 9));
  const current = Math.min(
    pages,
    Math.max(1, Math.floor(Number(query.page) || 1)),
  );
  const pageHref = (page: number) =>
    `/${locale}/lawyers?${new URLSearchParams({ q: keyword, service, sort, page: String(page) })}`;
  return (
    <>
      <PageHeading
        locale={locale}
        path={`/${locale}/lawyers`}
        title={t(locale, "Đội ngũ luật sư", "Our people")}
        summary={t(
          locale,
          "Tìm hiểu con người, nền tảng nghề nghiệp và lĩnh vực chuyên môn đứng sau mỗi cuộc trao đổi.",
          "Explore the people, professional backgrounds and areas of practice behind each conversation.",
        )}
      />
      <section className="section people-directory">
        <div className="directory-intro">
          <div>
            <span className="eyebrow dark">
              {t(locale, "Con người Vũ Khang", "People of Vũ Khang")}
            </span>
            <h2>
              {t(
                locale,
                "Chuyên môn có tên.\nSự đồng hành có người phụ trách.",
                "Know the expertise.\nMeet the person behind it.",
              )}
            </h2>
          </div>
          <p>
            {t(
              locale,
              "Tra cứu theo tên, ngôn ngữ hoặc lĩnh vực quan tâm. Mỗi hồ sơ giúp bạn tìm hiểu thông tin nghề nghiệp trước khi gửi yêu cầu tư vấn.",
              "Search by name, language or area of interest. Each profile helps you understand professional experience before making an enquiry.",
            )}
          </p>
        </div>
        {query.translation === "unavailable" && (
          <p role="status">
            {t(
              locale,
              "Hồ sơ này chưa có bản dịch được công bố.",
              "This profile does not yet have a published translation.",
            )}
          </p>
        )}
        {showingSamples && (
          <p className="sample-badge" role="note">
            {t(
              locale,
              "Hồ sơ minh họa để xem trước bố cục — chưa phải nhân sự của công ty. Sửa hoặc thay bằng hồ sơ đã xác minh trong phần Đội ngũ của CMS.",
              "Illustrative profiles shown to preview the layout — these are not the firm's people. Edit or replace them with verified profiles in the CMS.",
            )}
          </p>
        )}
        {people.length > 0 && (
          <form className="directory-filters">
            <div>
              <label htmlFor="people-q">
                {t(locale, "Tên hoặc từ khóa", "Name or keyword")}
              </label>
              <input
                id="people-q"
                name="q"
                maxLength={150}
                defaultValue={keyword}
                placeholder={t(
                  locale,
                  "Tên, ngôn ngữ, chức danh…",
                  "Name, language, role…",
                )}
              />
            </div>
            <div>
              <label htmlFor="people-service">
                {t(locale, "Lĩnh vực chuyên môn", "Practice area")}
              </label>
              <select id="people-service" name="service" defaultValue={service}>
                <option value="">
                  {t(locale, "Tất cả chuyên môn", "All practice areas")}
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="people-sort">
                {t(locale, "Sắp xếp tên", "Sort names")}
              </label>
              <select id="people-sort" name="sort" defaultValue={sort}>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
            <button className="button red">
              <Search size={18} />
              {t(locale, "Tìm luật sư", "Find people")}
            </button>
          </form>
        )}
        {people.length > 0 && (
          <div className="directory-results">
            <p role="status">
              {filtered.length}{" "}
              {t(locale, "hồ sơ phù hợp", "matching profiles")}
            </p>
            {(keyword || service) && (
              <Link className="underlined" href={`/${locale}/lawyers`}>
                {t(locale, "Xóa bộ lọc", "Clear filters")}
              </Link>
            )}
          </div>
        )}
        {filtered.length > 0 ? (
          <div className="people-grid">
            {filtered.slice((current - 1) * 9, current * 9).map((r) => (
              <Link
                className="person-card"
                href={`/${locale}/lawyers/${r.slug}`}
                key={r.id}
              >
                <div className="person-photo">
                  {r.portrait?.url ? (
                    <CmsImage
                      media={r.portrait}
                      fallbackAlt={r.title}
                      sizes="(max-width: 700px) 50vw, 300px"
                    />
                  ) : (
                    <span className="person-initials" aria-hidden="true">
                      {r.title
                        .split(/\s+/)
                        .slice(-2)
                        .map((s: string) => s[0])
                        .join("")}
                    </span>
                  )}
                  <span className="person-open" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <div className="person-info">
                  <p className="person-role">{r.position}</p>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                  <div className="person-practices">
                    {services
                      .filter((s) => related(r).has(String(s.id)))
                      .slice(0, 3)
                      .map((s) => (
                        <span key={s.id}>{s.title}</span>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="people-empty">
            <Users size={34} strokeWidth={1.3} />
            <div>
              <h3>
                {people.length
                  ? t(
                      locale,
                      "Chưa tìm thấy hồ sơ phù hợp",
                      "No matching profiles",
                    )
                  : t(
                      locale,
                      "Hồ sơ đội ngũ đang được cập nhật",
                      "Our team profiles are being prepared",
                    )}
              </h3>
              <p>
                {people.length
                  ? t(
                      locale,
                      "Thử tên ngắn hơn hoặc chọn tất cả chuyên môn để mở rộng kết quả.",
                      "Try a shorter name or select all practice areas.",
                    )
                  : t(
                      locale,
                      "Thông tin luật sư sẽ xuất hiện sau khi hoàn tất xác minh và duyệt công bố. Bạn vẫn có thể gửi nhu cầu để được tiếp nhận và phân công người trao đổi.",
                      "Profiles will appear after verification and publication approval. You can still submit an enquiry for review and assignment.",
                    )}
              </p>
              <Link
                className="underlined"
                href={
                  people.length
                    ? `/${locale}/lawyers`
                    : `/${locale}/consultation`
                }
              >
                {people.length
                  ? t(locale, "Xem tất cả hồ sơ", "View all profiles")
                  : t(locale, "Gửi nhu cầu tư vấn", "Send an enquiry")}{" "}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        )}
        {pages > 1 && (
          <nav
            className="pagination"
            aria-label={t(locale, "Phân trang đội ngũ", "People pagination")}
          >
            {current > 1 && (
              <Link href={pageHref(current - 1)}>
                {t(locale, "Trước", "Previous")}
              </Link>
            )}
            <span>
              {current} / {pages}
            </span>
            {current < pages && (
              <Link href={pageHref(current + 1)}>
                {t(locale, "Sau", "Next")}
              </Link>
            )}
          </nav>
        )}
      </section>
      <section className="people-contact section">
        <div>
          <span className="eyebrow">
            {t(locale, "Bắt đầu từ vấn đề của bạn", "Start with your matter")}
          </span>
          <h2>
            {t(
              locale,
              "Chưa biết nên trao đổi với ai?",
              "Not sure who to speak to?",
            )}
          </h2>
          <p>
            {t(
              locale,
              "Mô tả ngắn nhu cầu và lĩnh vực quan tâm. Việc tiếp nhận và xác nhận người phụ trách được thực hiện sau khi trao đổi.",
              "Share your needs and area of interest. Acceptance and the responsible contact are confirmed following discussion.",
            )}
          </p>
        </div>
        <Link className="button red" href={`/${locale}/consultation`}>
          {t(locale, "Trao đổi với Vũ Khang", "Talk to Vũ Khang")}
          <ArrowUpRight size={18} />
        </Link>
      </section>
      <PageResources
        section="lawyers"
        locale={locale}
        preview={query.preview === "true"}
      />
    </>
  );
}
