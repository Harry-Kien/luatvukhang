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
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {allowed && (
            <a href="/admin/collections/consultation-requests">
              Mở yêu cầu tư vấn →
            </a>
          )}
          <a href="/admin/collections/pages">Chỉnh sửa website →</a>
          <a href="/vi" target="_blank" rel="noreferrer">
            Xem website →
          </a>
        </div>
        <p style={{ fontSize: 14, marginTop: 24 }}>
          Thay ảnh banner: Chỉnh sửa website → trang có đường dẫn home → Banner.
          Chọn ảnh máy tính / điện thoại, chỉnh điểm lấy nét rồi xem trước. Hai
          ngôn ngữ có trang home riêng.
        </p>
        <p style={{ fontSize: 14, marginTop: 24 }}>
          Nội dung đi qua 3 bước: Lưu nháp → Duyệt chuyên môn → Xuất bản. Mỗi
          ngôn ngữ được duyệt riêng.
        </p>
      </section>
      <AdminReadiness payload={payload} user={user} />
    </>
  );
}
