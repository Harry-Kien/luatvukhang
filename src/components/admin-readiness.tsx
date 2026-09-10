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
    <section
      style={{
        marginBottom: 40,
        padding: 24,
        border: "1px solid var(--theme-elevation-200)",
        borderRadius: 4,
      }}
    >
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
  );
}
