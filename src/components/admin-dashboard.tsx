import { AdminReadiness } from "./admin-readiness";
import type { ServerComponentProps } from "payload";
export async function AdminDashboard({ payload, user }: ServerComponentProps) {
  const allowed = ["admin", "reception"].includes((user as any)?.role);
  const count = allowed
    ? await payload.count({
        collection: "consultation-requests",
        where: { status: { equals: "received" } },
        user,
        overrideAccess: false,
      })
    : null;
  const shortcuts: [string, string][] = [
    ["/admin/collections/articles/create", "Viết bài mới"],
    [
      "/admin/collections/pages?where[slug][equals]=home&where[language][equals]=vi",
      "Sửa trang chủ",
    ],
    ["/admin/collections/lawyers/create", "Thêm luật sư"],
    ["/admin/globals/site-layout", "Sửa giao diện website"],
    ...(allowed
      ? ([
          [
            "/admin/collections/consultation-requests",
            `Yêu cầu tư vấn mới (${count?.totalDocs ?? 0})`,
          ],
        ] as [string, string][])
      : []),
  ];
  return (
    <>
      <section
        style={{
          padding: "32px",
          background: "#101D35",
          color: "white",
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontSize: 28 }}>Tổng quan công việc</h1>
        <p>
          {count
            ? `${count.totalDocs} yêu cầu mới đang chờ tiếp nhận.`
            : "Chọn nội dung bên dưới để bắt đầu biên tập."}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {shortcuts.map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                padding: "10px 16px",
                background: "#fff",
                color: "#101D35",
                borderRadius: 4,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {label} →
            </a>
          ))}
          <a
            href="/vi"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 16px",
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Mở website ↗
          </a>
        </div>
        <p style={{ fontSize: 14, marginTop: 24 }}>
          Sửa ngay trên website: đăng nhập rồi mở website, thanh quản trị ở đầu
          trang có nút <strong>Bật chế độ sửa</strong>. Rê chuột lên vùng nào
          cũng thấy nút "✎ Sửa", bấm là mở đúng mục đó với khung xem trước.
        </p>
        <p style={{ fontSize: 14, marginTop: 12 }}>
          Thay ảnh banner: Chỉnh sửa website → trang có đường dẫn home → Banner.
          Chữ ở trang chủ, menu, chân trang: mục Giao diện website. Mỗi ngôn
          ngữ có trang home riêng.
        </p>
        <p style={{ fontSize: 14, marginTop: 12 }}>
          Nội dung đi qua 3 bước: Lưu nháp → Duyệt chuyên môn → Xuất bản. Mỗi
          ngôn ngữ được duyệt riêng. Bản dịch máy phải được rà soát trước khi
          xuất bản.
        </p>
      </section>
      <AdminReadiness payload={payload} user={user} />
    </>
  );
}
