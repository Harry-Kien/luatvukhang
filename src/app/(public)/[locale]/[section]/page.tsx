import { PageResources } from "@/components/page-resources";
import { localText, pageResources } from "@/lib/page-resources";
import { Insights } from "@/components/insights";
import { searchScore } from "@/lib/search";
import { ClientGuide } from "@/components/client-guide";
import { PeopleDirectory } from "@/components/people-directory";
import { PolicyDraft } from "@/components/policy-draft";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, EmptyContent, ContentBody } from "@/components/content";
import { CmsImage } from "@/components/cms-image";
import { ConsultationForm } from "@/components/consultation-form";
import { ContactChannels } from "@/components/contact-channels";
import { getSiteSettings } from "@/lib/site-settings";
import { applyRedirect } from "@/lib/redirects";
import { getPreviewRecord } from "@/lib/preview";
import { PreviewRefresh } from "@/components/preview-refresh";
import { getRecords } from "@/lib/cms";
import { t, demo, samples, fold, type Locale, navigation } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
const extra: Record<string, [string, string]> = {
  guide: ["Hướng dẫn khách hàng", "Client guide"],
  consultation: ["Yêu cầu tư vấn", "Request a consultation"],
  search: ["Tìm kiếm", "Search"],
  industries: ["Ngành nghề", "Industries"],
  careers: ["Cơ hội nghề nghiệp", "Careers"],
  privacy: ["Quyền riêng tư", "Privacy"],
  terms: ["Điều khoản sử dụng", "Terms of use"],
  typography: [
    "Kiểm tra typography tiếng Việt",
    "Vietnamese typography specimen",
  ],
};
type Props = {
  params: Promise<{ locale: Locale; section: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    kind?: string;
    sort?: string;
    page?: string;
    service?: string;
    preview?: string;
    translation?: string;
  }>;
};
/** Mô tả trang mục. Thiếu thẻ này thì Google tự cắt đoạn văn bản bất kỳ. */
const descriptions: Record<string, [string, string]> = {
  guide: [
    "Hướng dẫn gửi yêu cầu tư vấn tới Vũ Khang: cần chuẩn bị gì, quy trình tiếp nhận ra sao và những câu hỏi thường gặp.",
    "How to make an enquiry with Vũ Khang: what to prepare, how the process works and answers to frequently asked questions.",
  ],
  about: [
    "Tìm hiểu Công ty Luật TNHH Vũ Khang: cách tiếp cận vấn đề pháp lý, phạm vi hoạt động và nguyên tắc làm việc với khách hàng.",
    "Learn about Vũ Khang: how the firm approaches legal matters, its scope of practice and the principles behind client work.",
  ],
  services: [
    "Các lĩnh vực chuyên môn của Vũ Khang: đầu tư và doanh nghiệp, hợp đồng thương mại, giải quyết tranh chấp, sở hữu trí tuệ và công nghệ.",
    "Areas of practice at Vũ Khang: investment and corporate, commercial contracts, dispute resolution, intellectual property and technology.",
  ],
  lawyers: [
    "Hồ sơ luật sư của Vũ Khang: chức danh, lĩnh vực chuyên môn và ngôn ngữ làm việc. Tìm luật sư phù hợp với vấn đề của bạn.",
    "Lawyer profiles at Vũ Khang: roles, areas of practice and working languages. Find the right lawyer for your matter.",
  ],
  experience: [
    "Kinh nghiệm công việc đã được phép công bố, phân theo lĩnh vực chuyên môn và loại vấn đề pháp lý.",
    "Selected experience cleared for publication, organised by area of practice and type of legal matter.",
  ],
  articles: [
    "Góc nhìn pháp lý của Vũ Khang về quy định mới, thực tiễn áp dụng và những vấn đề doanh nghiệp thường gặp.",
    "Legal insights from Vũ Khang on new regulations, practical application and the issues businesses encounter.",
  ],
  contact: [
    "Thông tin liên hệ Công ty Luật TNHH Vũ Khang: địa chỉ văn phòng, điện thoại và email tiếp nhận yêu cầu.",
    "Contact details for Vũ Khang: office address, telephone and the email address for enquiries.",
  ],
  consultation: [
    "Gửi yêu cầu tư vấn tới Vũ Khang. Mô tả ngắn gọn vấn đề của bạn; việc gửi yêu cầu chưa thiết lập quan hệ luật sư–khách hàng.",
    "Request a consultation with Vũ Khang. Briefly describe your matter; submitting a request does not establish a lawyer–client relationship.",
  ],
  industries: [
    "Kinh nghiệm pháp lý của Vũ Khang theo từng ngành nghề và đặc thù hoạt động kinh doanh.",
    "Legal experience at Vũ Khang organised by industry and the particulars of each business sector.",
  ],
  careers: [
    "Cơ hội nghề nghiệp tại Công ty Luật TNHH Vũ Khang: vị trí đang tuyển, nơi làm việc và cách ứng tuyển.",
    "Careers at Vũ Khang: open positions, work locations and how to apply.",
  ],
  privacy: [
    "Cách Công ty Luật TNHH Vũ Khang thu thập, sử dụng và bảo vệ thông tin cá nhân của người truy cập website.",
    "How Vũ Khang collects, uses and protects the personal information of visitors to this website.",
  ],
  terms: [
    "Điều khoản sử dụng website của Công ty Luật TNHH Vũ Khang, bao gồm giới hạn trách nhiệm đối với nội dung tham khảo.",
    "Terms of use for the Vũ Khang website, including the limits of responsibility for reference content.",
  ],
};
/** Trang kết quả tìm kiếm và trang mẫu chữ không nên vào chỉ mục. */
/**
 * Mô tả tiếng Trung cho từng trang mục. Thiếu khóa nào thì lùi về bản dịch
 * chung thay vì bỏ trống thẻ mô tả — trước đây trang Kinh nghiệm bản tiếng
 * Trung không có thẻ nào vì khóa bị sót.
 */
const zhDescriptions: Record<string, string> = {
  about: "了解 Công ty Luật TNHH Vũ Khang 的介绍、团队及沟通方式。",
  services: "了解专业领域、支持范围及咨询申请流程。",
  experience: "浏览已获准公开的项目经验，按专业领域与法律问题类型分类。",
  lawyers: "浏览已核实发布的律师履历、职业背景及专业领域。",
  articles: "按主题浏览法律文章，查阅来源并了解更新信息。",
  contact: "查看联系信息并向 Vũ Khang 提交咨询需求。",
  consultation:
    "简要说明您的问题。提交申请不代表预约已确认或建立律师与客户关系。",
  guide: "了解咨询前的准备事项、申请流程及常见问题。",
  privacy: "了解网站数据处理说明。草案正式发布前须经公司审核。",
  terms: "阅读网站使用条款。草案正式发布前须经公司审核。",
  industries: "按行业了解相关法律问题与已发布内容。",
  careers: "查看已发布的招聘职位、工作地点及申请方式。",
  search: "搜索专业领域、律师和法律文章。",
};
const excluded = new Set(["search", "typography"]);
export async function generateMetadata({ params }: Props) {
  const { locale, section } = await params;
  const nav = navigation.find((n) => n[0] === section);
  const name = extra[section];
  const description = descriptions[section];
  return pageMetadata({
    locale,
    title: nav
      ? t(locale, nav[1], nav[2])
      : name
        ? t(locale, ...name)
        : section,
    description:
      (locale === "zh" ? zhDescriptions[section] : undefined) ??
      (description ? t(locale, ...description) : undefined),
    path: `/${locale}/${section}`,
    noindex: excluded.has(section),
    feed: section === "articles" ? `/${locale}/feed.xml` : undefined,
  });
}
export default async function Page({ params, searchParams }: Props) {
  const { locale, section } = await params;
  const query = await searchParams;
  const nav = navigation.find((n) => n[0] === section);
  const names = extra[section];
  if (!nav && !names) {
    await applyRedirect("/" + locale + "/" + section);
    notFound();
  }
  const title = nav ? t(locale, nav[1], nav[2]) : t(locale, ...names);
  const pagePath = `/${locale}/${section}`;
  if (section === "typography" && !demo) notFound();
  if (section === "articles") return <Insights locale={locale} query={query} />;
  if (section === "guide") return <ClientGuide locale={locale} />;
  if (section === "lawyers")
    return <PeopleDirectory locale={locale} query={query} />;
  if (section === "consultation")
    return (
      <>
        <PageHeading
          locale={locale}
          path={pagePath}
          title={title}
          summary={t(
            locale,
            "Chia sẻ ngắn gọn vấn đề của bạn. Gửi yêu cầu chưa đồng nghĩa với xác nhận lịch hẹn hoặc thiết lập quan hệ luật sư–khách hàng.",
            "Briefly describe your matter. Submitting a request does not confirm an appointment or establish a lawyer–client relationship.",
          )}
        />
        <section className="section content-grid">
          <ConsultationForm locale={locale} service={query.service || ""} />
          <aside className="sidebar">
            <h2>{t(locale, "Bước tiếp theo", "What happens next")}</h2>
            <p>
              {t(
                locale,
                "Sau khi yêu cầu được lưu thành công, bạn sẽ nhận mã tham chiếu trên màn hình. Nhân viên tiếp nhận cần liên hệ riêng để xác nhận lịch.",
                "Once your request is saved, a reference will appear on screen. A team member must contact you separately to confirm an appointment.",
              )}
            </p>
            <p>
              {t(
                locale,
                "Chưa gửi tài liệu mật, thông tin định danh hoặc hồ sơ vụ việc qua biểu mẫu này.",
                "Please do not include confidential documents, identity information or detailed case files in this form.",
              )}
            </p>
          </aside>
        </section>
      </>
    );
  if (section === "typography")
    return (
      <>
        <PageHeading
          locale={locale}
          path={pagePath}
          title={title}
          summary="Noto Serif · Be Vietnam Pro · Bộ chữ được lưu tại website, đầy đủ dấu tiếng Việt."
        />
        <section className="section">
          {[
            "Công ty Luật — Tư vấn đầu tư và giải quyết tranh chấp",
            "Sở hữu trí tuệ, dữ liệu và công nghệ",
            "Đội ngũ luật sư đồng hành cùng doanh nghiệp",
            "Nguyễn, Trương, Đỗ, Quyền, Nghĩa, Thủy, Hưởng",
          ].map((s) => (
            <div className="specimen" key={s}>
              <h2>{s}</h2>
              <p>{s}</p>
              <p style={{ fontWeight: 500 }}>{s}</p>
              <p style={{ fontWeight: 600 }}>{s}</p>
            </div>
          ))}
        </section>
      </>
    );
  if (section === "search") {
    const q = (query.q || "").slice(0, 150).trim();
    const groups = await Promise.all(
      [
        "services",
        "industries",
        "lawyers",
        "experience",
        "articles",
        "careers",
        "pages",
      ].map(async (collection) => ({
        collection,
        records: await getRecords(collection, locale),
      })),
    );
    const pageGroup = groups.find((group) => group.collection === "pages")!;
    // Gộp chứ không thay thế: gán đè sẽ vứt mất Về chúng tôi, Liên hệ và Trang
    // chủ khỏi kết quả tìm kiếm, vì pageResources chỉ liệt kê 5 trang hướng dẫn.
    const otherPages = pageGroup.records.filter(
      (record) => !(record.slug in pageResources),
    );
    pageGroup.records = Object.entries(pageResources).map(
      ([slug, resource]) =>
        pageGroup.records.find((record) => record.slug === slug) || {
          id: `resource-${slug}`,
          slug,
          title: localText(resource.title, locale),
          summary: localText(resource.intro, locale),
          blocks: resource.cards.map(([title, body]) => ({
            blockType: "callout",
            visible: true,
            heading: localText(title, locale),
            body: localText(body, locale),
          })),
        },
    );
    pageGroup.records = [...pageGroup.records, ...otherPages];
    if (demo && !groups[0].records.length)
      groups[0].records = samples.map((s) => ({
        id: s.slug,
        slug: s.slug,
        title: t(locale, s.vi, s.en),
        summary: t(locale, s.description[0], s.description[1]),
      }));
    const results = q
      ? groups.flatMap((g) =>
          g.records
            .filter((r) => searchScore(r, q) > 0)
            .map((r) => ({ ...r, collection: g.collection })),
        )
      : [];
    results.sort((a, b) => searchScore(b, q) - searchScore(a, q));
    const kinds: Record<string, [string, string]> = {
      services: ["Chuyên môn", "Expertise"],
      industries: ["Ngành nghề", "Industries"],
      lawyers: ["Đội ngũ", "People"],
      experience: ["Kinh nghiệm", "Experience"],
      articles: ["Bài viết", "Articles"],
      careers: ["Tuyển dụng", "Careers"],
      pages: ["Hướng dẫn", "Guidance"],
    };
    const kind = query.kind && kinds[query.kind] ? query.kind : "";
    const selected = kind
      ? results.filter((r) => r.collection === kind)
      : results;
    /**
     * Không có kết quả là lúc khách dễ rời đi nhất. Đưa sẵn danh sách lĩnh vực
     * để còn đường đi tiếp, thay vì để họ đứng trước một câu nhắn cụt.
     */
    const suggestions =
      q && !selected.length
        ? (groups.find((group) => group.collection === "services")?.records ??
          [])
        : [];
    const totalPages = Math.max(1, Math.ceil(selected.length / 10));
    const currentPage = Math.min(
      totalPages,
      Math.max(1, Math.floor(Number(query.page) || 1)),
    );
    const pageHref = (page: number) =>
      `/${locale}/search?${new URLSearchParams({ q, kind, page: String(page) })}`;

    return (
      <>
        <PageHeading
          locale={locale}
          path={pagePath}
          title={title}
          summary={t(
            locale,
            "Tìm chuyên môn, luật sư và bài viết. Có thể nhập tiếng Việt có dấu hoặc không dấu.",
            "Find expertise, people and insights. Vietnamese queries work with or without accents.",
          )}
        />
        <section className="section">
          <form className="search-bar">
            <label className="sr-only" htmlFor="q">
              {t(locale, "Từ khóa", "Search terms")}
            </label>
            <input
              className="search-input"
              id="q"
              name="q"
              defaultValue={q}
              maxLength={150}
              placeholder={t(
                locale,
                "Ví dụ: đầu tư, hợp đồng…",
                "For example: investment, contracts…",
              )}
            />
            <button className="button red">
              {t(locale, "Tìm kiếm", "Search")}
            </button>
          </form>
          {q && (
            <p role="status">
              {selected.length} {t(locale, "kết quả cho", "results for")} “{q}”
            </p>
          )}
          <nav
            className="search-types"
            aria-label={t(locale, "Loại kết quả", "Result type")}
          >
            {[
              ["", t(locale, "Tất cả", "All")],
              ...Object.entries(kinds).map(([key, label]) => [
                key,
                key === "pages"
                  ? localText(["Hướng dẫn", "Guidance", "指南"], locale)
                  : t(locale, ...label),
              ]),
            ].map(([key, label]) => (
              <Link
                key={key}
                aria-current={kind === key ? "page" : undefined}
                href={`/${locale}/search?${new URLSearchParams({ q, kind: key })}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          {selected.slice((currentPage - 1) * 10, currentPage * 10).map((r) => (
            <Link
              className="service-row"
              key={r.collection + r.slug}
              href={
                r.collection === "pages"
                  ? `/${locale}/${r.slug}`
                  : `/${locale}/${r.collection}/${r.slug}`
              }
            >
              <span className="number">↗</span>
              <h2>{r.title}</h2>
              <p>{r.summary}</p>
            </Link>
          ))}
          {totalPages > 1 && (
            <nav
              className="pagination"
              aria-label={t(locale, "Phân trang kết quả", "Search pagination")}
            >
              {currentPage > 1 && (
                <Link href={pageHref(currentPage - 1)}>
                  {t(locale, "Trước", "Previous")}
                </Link>
              )}
              <span>
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link href={pageHref(currentPage + 1)}>
                  {t(locale, "Sau", "Next")}
                </Link>
              )}
            </nav>
          )}
          {q && !selected.length && (
            <div className="search-empty">
              <p>
                {t(
                  locale,
                  "Thử từ khóa ngắn hơn hoặc một lĩnh vực liên quan.",
                  "Try a shorter phrase or a related topic.",
                )}
              </p>
              {suggestions.length > 0 && (
                <>
                  <h2>
                    {t(
                      locale,
                      "Hoặc chọn lĩnh vực gần với vấn đề của bạn",
                      "Or choose the area closest to your matter",
                    )}
                  </h2>
                  <div className="search-suggestions">
                    {suggestions.map((record) => (
                      <Link
                        key={record.slug}
                        href={`/${locale}/services/${record.slug}`}
                      >
                        {record.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </>
    );
  }
  if (["about", "contact", "privacy", "terms"].includes(section)) {
    const settings = await getSiteSettings();
    const records = await getRecords("pages", locale);
    const record =
      query.preview === "true"
        ? await getPreviewRecord("pages", locale, section)
        : records.find((r) => r.slug === section);
    return (
      <>
        {query.preview === "true" && record && <PreviewRefresh />}
        <PageHeading
          locale={locale}
          path={pagePath}
          title={record?.title || title}
          summary={record?.summary}
        />
        <section className="section content-grid">
          <article className="article-body">
            {section === "contact" && (
              <div className="contact-details">
                <h2>
                  {localText(
                    ["Kết nối với Vũ Khang", "Contact", "联系方式"],
                    locale,
                  )}
                </h2>
                {settings?.address && <p>{settings.address}</p>}
                {settings?.phone && (
                  <p>
                    <a href={"tel:" + settings.phone.replace(/[^+0-9]/g, "")}>
                      {settings.phone}
                    </a>
                  </p>
                )}
                {settings?.email && (
                  <p>
                    <a href={"mailto:" + settings.email}>{settings.email}</a>
                  </p>
                )}
                <ContactChannels locale={locale} phone={settings?.phone} />
                {!settings?.address && !settings?.phone && !settings?.email && (
                  <p>
                    {t(
                      locale,
                      "Thông tin văn phòng, số điện thoại và email sẽ được hiển thị sau khi công ty xác nhận.",
                      "Office details, telephone numbers and email addresses will appear after confirmation by the firm.",
                    )}
                  </p>
                )}
                <Link className="button red" href={`/${locale}/consultation`}>
                  {t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")}
                  <ArrowUpRight size={19} />
                </Link>
              </div>
            )}
            {record ? (
              <ContentBody record={record} />
            ) : section === "about" ? (
              <>
                <h2>
                  {t(
                    locale,
                    "Hiểu bối cảnh trước khi đề xuất hướng đi.",
                    "Understand the context before proposing a direction.",
                  )}
                </h2>
                <p>
                  {t(
                    locale,
                    "Nội dung giới thiệu công ty đang chờ thông tin chính thức về tổ chức, phạm vi hành nghề và đội ngũ.",
                    "The firm profile is awaiting confirmed details about its organisation, practice and people.",
                  )}
                </p>
                {demo && (
                  <span className="sample-badge">
                    {t(
                      locale,
                      "Nội dung phát triển — chờ duyệt",
                      "Development content — awaiting approval",
                    )}
                  </span>
                )}
              </>
            ) : section === "contact" ? (
              <p>
                {localText(
                  [
                    "Nêu ngắn gọn vấn đề, kết quả mong muốn và thời hạn cần lưu ý. Bạn có thể xem hướng dẫn khách hàng trước khi gửi yêu cầu.",
                    "Briefly describe your matter, preferred outcome and relevant dates. Read the client guide before submitting your request.",
                    "请简要说明问题、期望结果及需要注意的日期。提交前可查阅客户指南。",
                  ],
                  locale,
                )}
              </p>
            ) : demo && (section === "privacy" || section === "terms") ? (
              <PolicyDraft kind={section} locale={locale} />
            ) : (
              <EmptyContent
                locale={locale}
                title={t(
                  locale,
                  "Văn bản chưa được phê duyệt công bố.",
                  "This policy has not yet been approved for publication.",
                )}
              />
            )}
          </article>
          <aside className="sidebar">
            <h2>
              {t(
                locale,
                "Thông tin rõ ràng.\nLựa chọn có cơ sở.",
                "Clear information.\nInformed choices.",
              )}
            </h2>
            <p>
              {t(
                locale,
                "Tìm hiểu các lĩnh vực trước khi gửi yêu cầu.",
                "Explore the practice areas before submitting your request.",
              )}
            </p>
            <Link className="underlined" href={`/${locale}/services`}>
              {t(locale, "Xem chuyên môn", "Explore expertise")} →
            </Link>
          </aside>
        </section>
      </>
    );
  }
  let records = await getRecords(section, locale);
  if (section === "services" && demo && !records.length)
    records = samples.map((s) => ({
      id: s.slug,
      slug: s.slug,
      title: t(locale, s.vi, s.en),
      summary: t(locale, s.description[0], s.description[1]),
    }));
  const keyword = (query.q || "").slice(0, 150);
  const filtered = records.filter((r) =>
    fold(r.title + " " + r.summary + " " + (r.position || "")).includes(
      fold(keyword),
    ),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 12));
  const currentPage = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number(query.page) || 1)),
  );
  const visibleRecords = filtered.slice(
    (currentPage - 1) * 12,
    currentPage * 12,
  );
  return (
    <>
      <PageHeading
        locale={locale}
        path={pagePath}
        title={title}
        summary={
          section === "services"
            ? t(
                locale,
                "Tìm hiểu phạm vi hỗ trợ theo từng vấn đề của doanh nghiệp.",
                "Explore support for the issues your business faces.",
              )
            : undefined
        }
      />
      <section
        className={
          section === "industries" &&
          !records.length &&
          !keyword &&
          !query.translation
            ? "section collection-no-records"
            : "section"
        }
      >
        {query.translation === "unavailable" && (
          <p role="status">
            {t(
              locale,
              "Bản dịch của nội dung này chưa được công bố.",
              "The translation of this content is not yet published.",
            )}
          </p>
        )}
        {section === "services" && demo && (
          <span className="sample-badge">
            {t(
              locale,
              "Danh mục minh họa — chờ xác nhận phạm vi dịch vụ",
              "Sample practice areas — scope awaiting confirmation",
            )}
          </span>
        )}
        {(records.length > 0 || keyword) && (
          <form className="search-bar">
            <label className="sr-only" htmlFor="list-query">
              {t(locale, "Tìm trong danh sách", "Search this list")}
            </label>
            <input
              className="search-input"
              id="list-query"
              name="q"
              defaultValue={keyword}
              placeholder={t(
                locale,
                "Tìm theo tên hoặc từ khóa…",
                "Search by name or keyword…",
              )}
              maxLength={150}
            />
            <button className="button red">
              {t(locale, "Tìm kiếm", "Search")}
            </button>
            {keyword && (
              <Link className="underlined" href={`/${locale}/${section}`}>
                {t(locale, "Xóa bộ lọc", "Clear filter")}
              </Link>
            )}
          </form>
        )}
        {keyword && (
          <p role="status">
            {filtered.length} {t(locale, "kết quả phù hợp", "matching results")}
          </p>
        )}
        {filtered.length ? (
          visibleRecords.map((r, i) => (
            <Link
              className="service-row"
              key={r.slug}
              href={`/${locale}/${section}/${r.slug}`}
            >
              <span className="number">{String(i + 1).padStart(2, "0")}</span>
              <div>
                {r.portrait?.url && (
                  <CmsImage
                    className="list-portrait"
                    media={r.portrait}
                    fallbackAlt={r.title}
                    sizes="(max-width: 700px) 40vw, 180px"
                  />
                )}
                <h2>{r.title}</h2>
                {r.position && <span className="meta">{r.position}</span>}
              </div>
              <p>{r.summary}</p>
              <span className="row-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))
        ) : section === "careers" ? (
          <div className="editorial-note">
            <h2>
              {localText(
                [
                  "Chưa có vị trí tuyển dụng được công bố",
                  "No vacancies currently published",
                  "暂无已发布的招聘职位",
                ],
                locale,
              )}
            </h2>
            <p>
              {localText(
                [
                  "Vị trí, yêu cầu và cách ứng tuyển sẽ được đăng tại đây khi có thông báo chính thức.",
                  "Roles, requirements and application instructions will appear here when an official notice is available.",
                  "正式招聘通知发布后，本页将提供职位、要求及申请方式。",
                ],
                locale,
              )}
            </p>
          </div>
        ) : section === "industries" && !keyword ? null : (
          <EmptyContent
            locale={locale}
            title={
              keyword
                ? localText(
                    [
                      "Không có kết quả phù hợp",
                      "No matching results",
                      "没有匹配结果",
                    ],
                    locale,
                  )
                : t(
                    locale,
                    "Chưa có nội dung đã xác minh để hiển thị.",
                    "No verified content is available yet.",
                  )
            }
          />
        )}
        {pageCount > 1 && (
          <nav
            className="pagination"
            aria-label={t(locale, "Phân trang", "Pagination")}
          >
            {Array.from({ length: pageCount }, (_, i) => (
              <Link
                key={i}
                aria-current={currentPage === i + 1 ? "page" : undefined}
                href={`/${locale}/${section}?q=${encodeURIComponent(keyword)}&page=${i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
          </nav>
        )}
      </section>
      <PageResources
        section={section}
        locale={locale}
        preview={query.preview === "true"}
      />
    </>
  );
}
