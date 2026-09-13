import type { ServerComponentProps } from "payload";
export async function AdminReadiness({
  payload,
  user,
}: Pick<ServerComponentProps, "payload" | "user">) {
  if (
    !["admin", "editor", "reviewer", "publisher"].includes((user as any)?.role)
  )
    return null;
  const checks = await Promise.all(
    (
      [
        "home",
        "about",
        "contact",
        "privacy",
        "terms",
        "lawyers",
        "experience",
        "industries",
        "articles",
        "careers",
      ] as const
    ).map(async (slug) => {
      const result = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug } },
        limit: 10,
        depth: 0,
        user,
        overrideAccess: false,
      });
      return {
        slug,
        vi: result.docs.find((d) => d.language === "vi"),
        en: result.docs.find((d) => d.language === "en"),
        zh: result.docs.find((d) => d.language === "zh"),
      };
    }),
  );
  // Thông tin công ty: sáu ô bắt buộc của bộ kiểm tra ra mắt (release-check).
  const settings = (await payload.findGlobal({
    slug: "site-settings",
    depth: 0,
  })) as unknown as Record<string, unknown>;
  const settingFields: [string, string][] = [
    ["companyName", "Tên công ty chính thức"],
    ["englishName", "Tên tiếng Anh"],
    ["registration", "Thông tin đăng ký hoạt động"],
    ["phone", "Điện thoại"],
    ["email", "Email tiếp nhận"],
    ["address", "Địa chỉ"],
  ];
  const missingSettings = settingFields.filter(([key]) => !settings?.[key]);
  const privacyApproved = Boolean(settings?.privacyApproved);

  // Số bản ghi thật đã xuất bản theo từng mục nội dung và ngôn ngữ.
  const contentSlugs: [string, string][] = [
    ["services", "Dịch vụ"],
    ["lawyers", "Đội ngũ"],
    ["industries", "Ngành nghề"],
    ["experience", "Kinh nghiệm"],
    ["articles", "Bài viết"],
    ["offices", "Văn phòng"],
  ];
  const counts = await Promise.all(
    contentSlugs.map(async ([slug, label]) => {
      const per = await Promise.all(
        (["vi", "en", "zh"] as const).map(async (language) => {
          const result = await payload.count({
            collection: slug as "services",
            where: {
              and: [
                { language: { equals: language } },
                { _status: { equals: "published" } },
                { isSample: { not_equals: true } },
              ],
            },
            user,
            overrideAccess: false,
          });
          return result.totalDocs;
        }),
      );
      return { slug, label, per };
    }),
  );

  // Vận hành: đường gửi email thông báo và hàng đợi thông báo.
  const emailConfigured = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_FROM &&
      process.env.NOTIFICATION_EMAIL,
  );
  const isAdmin = (user as any)?.role === "admin";
  const outboxCount = async (status: string) =>
    (
      await payload.count({
        collection: "notification-outbox",
        where: { status: { equals: status } },
        user,
        overrideAccess: false,
      })
    ).totalDocs;
  const outbox = isAdmin
    ? { pending: await outboxCount("pending"), failed: await outboxCount("failed") }
    : null;

  const cell: React.CSSProperties = { padding: 12 };
  const head: React.CSSProperties = {
    padding: 12,
    borderBottom: "1px solid var(--theme-elevation-200)",
  };
  const box: React.CSSProperties = {
    marginBottom: 40,
    padding: 24,
    border: "1px solid var(--theme-elevation-200)",
    borderRadius: 4,
  };
  const tag = (ok: boolean, text: string) => (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 3,
        fontSize: 12,
        fontWeight: 600,
        background: ok ? "#e8f3ec" : "#fbe7ea",
        color: ok ? "#2f7a4d" : "#b3202f",
      }}
    >
      {text}
    </span>
  );

  const names: Record<string, string> = {
    lawyers: "Hướng dẫn · Đội ngũ",
    experience: "Hướng dẫn · Kinh nghiệm",
    industries: "Hướng dẫn · Ngành nghề",
    articles: "Hướng dẫn · Góc nhìn",
    careers: "Hướng dẫn · Tuyển dụng",
    home: "Trang chủ",
    about: "Giới thiệu",
    contact: "Liên hệ",
    privacy: "Quyền riêng tư",
    terms: "Điều khoản",
  };
  const status = (doc: any) =>
    !doc
      ? "Chưa tạo"
      : doc._status === "published"
        ? "Đã xuất bản"
        : doc.reviewState === "approved"
          ? "Đã duyệt · chờ xuất bản"
          : "Bản nháp · cần rà soát";
  return (
    <>
      <section style={box}>
        <h2>Thông tin công ty</h2>
        <p>
          Sáu ô trong Cài đặt là điều kiện bắt buộc để bật ra mắt. Địa chỉ,
          điện thoại và email ở đây tự hiện ở footer, trang Liên hệ, nút gọi và
          nút Zalo.
        </p>
        <p>
          {missingSettings.length === 0
            ? tag(true, "Đủ sáu ô")
            : tag(false, `Còn thiếu ${missingSettings.length} ô`)}{" "}
          {missingSettings.length > 0 && (
            <span>{missingSettings.map(([, label]) => label).join(" · ")}</span>
          )}
          {" — "}
          <a href="/admin/globals/site-settings">Mở Cài đặt →</a>
        </p>
        <p>
          {privacyApproved
            ? tag(true, "Chính sách quyền riêng tư đã rà soát")
            : tag(false, "Chính sách quyền riêng tư chưa rà soát")}{" "}
          Trang Quyền riêng tư và Điều khoản chỉ xuất bản được sau khi bật ô
          này.
        </p>
      </section>

      <section style={box}>
        <h2>Nội dung đã xuất bản</h2>
        <p>
          Số bản ghi thật đã xuất bản theo ngôn ngữ. Bản minh họa không được
          tính. Mục nào bằng 0 thì trang tương ứng trên website đang trống.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {["Mục", "Tiếng Việt", "English", "简体中文"].map((h) => (
                  <th key={h} style={head}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {counts.map((c) => (
                <tr key={c.slug}>
                  <th style={cell}>
                    <a href={`/admin/collections/${c.slug}`}>{c.label}</a>
                  </th>
                  {c.per.map((n, i) => (
                    <td key={i} style={cell}>
                      {n > 0 ? tag(true, String(n)) : tag(false, "0")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {outbox && (
        <section style={box}>
          <h2>Thông báo yêu cầu tư vấn</h2>
          <p>
            {emailConfigured
              ? tag(true, "Email thông báo đã cấu hình")
              : tag(false, "Email thông báo chưa cấu hình")}{" "}
            {emailConfigured
              ? "Mỗi yêu cầu mới sẽ được gửi tới hộp thư tiếp nhận khi worker chạy."
              : "Yêu cầu của khách vẫn được lưu trong mục Yêu cầu tư vấn, nhưng không ai nhận được email. Cần đặt SMTP_HOST, SMTP_FROM và NOTIFICATION_EMAIL trong tệp .env trên hosting."}
          </p>
          <p>
            Hàng đợi: {outbox.pending} chờ gửi · {outbox.failed} gửi lỗi
            {outbox.failed > 0 && (
              <>
                {" — "}
                <a href="/admin/collections/notification-outbox?where[status][equals]=failed">
                  Xem thông báo lỗi →
                </a>
              </>
            )}
          </p>
        </section>
      )}

      <section style={box}>
        <h2>Nội dung cần hoàn tất trước khi ra mắt</h2>
      <p>
        Mỗi ngôn ngữ được duyệt riêng. Trạng thái xuất bản không thay thế việc
        xác minh nội dung và cấu hình vận hành.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {["Trang", "Tiếng Việt", "English", "简体中文"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: 12,
                    borderBottom: "1px solid var(--theme-elevation-200)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => (
              <tr key={c.slug}>
                <th style={{ padding: 12 }}>{names[c.slug]}</th>
                {[c.vi, c.en, c.zh].map((doc, i) => (
                  <td key={i} style={{ padding: 12 }}>
                    <a
                      href={
                        doc
                          ? `/admin/collections/pages/${doc.id}`
                          : "/admin/collections/pages/create"
                      }
                    >
                      {status(doc)}
                    </a>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <a href="/admin/collections/lawyers">Bổ sung hồ sơ luật sư →</a>
        {" · "}
        <a href="/admin/collections/media">Quản lý ảnh được phép sử dụng →</a>
      </p>
    </section>
    </>
  );
}
