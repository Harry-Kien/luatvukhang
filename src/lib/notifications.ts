import type { Payload } from "payload";
import { query } from "./operations-db";

/**
 * Gửi email báo có yêu cầu tư vấn mới, lấy từ hàng đợi `notification-outbox`.
 *
 * Dùng chung cho hai đường:
 *   - API gửi yêu cầu gọi ngay sau khi lưu (`after()`), nên công ty được báo
 *     ngay cả khi hosting dùng chung không đặt được lịch chạy (cron);
 *   - scripts/send-notifications.ts chạy theo lịch (nếu có) để thử lại thư hỏng.
 *
 * Thư chỉ có mã tham chiếu và liên kết vào trang quản trị — không chép thông
 * tin của khách vào hộp thư.
 */
export const RETRY_WINDOW_HOURS = 24;
const LOCK = "notifications";
/** Khóa cũ hơn mức này là của một tiến trình đã chết, được thu hồi. */
const STALE_LOCK_MINUTES = 15;

/** Đã cấu hình gửi thư và công ty không cố ý tắt email thông báo. */
export const notificationsConfigured = () =>
  process.env.EMAIL_NOTIFICATIONS_DISABLED !== "true" &&
  Boolean(process.env.NOTIFICATION_EMAIL && process.env.SMTP_HOST);

export type DeliveryResult = {
  /** false: một tiến trình khác đang gửi, lần này không làm gì. */
  locked: boolean;
  sent: number;
  failed: number;
  /** Thư hỏng quá hạn thử lại — cần người xử lý trong /admin. */
  stuck: number;
};

export async function deliverPendingNotifications(
  payload: Payload,
  { limit = 50 }: { limit?: number } = {},
): Promise<DeliveryResult> {
  const result: DeliveryResult = {
    locked: false,
    sent: 0,
    failed: 0,
    stuck: 0,
  };
  /**
   * Chỉ một tiến trình được nhận việc gửi. SQLite không có khóa advisory như
   * PostgreSQL, nên dùng một hàng trong bảng làm khóa: khóa chính khiến lần
   * chèn thứ hai thất bại. Nhờ vậy gửi ngay sau khi khách bấm Gửi và lịch chạy
   * định kỳ không bao giờ gửi trùng một thư.
   */
  await query(
    "CREATE TABLE IF NOT EXISTS operations_worker_lock (name TEXT PRIMARY KEY, acquired_at TEXT NOT NULL)",
  );
  await query(
    "DELETE FROM operations_worker_lock WHERE name = ? AND acquired_at < ?",
    [LOCK, new Date(Date.now() - STALE_LOCK_MINUTES * 60 * 1000).toISOString()],
  );
  try {
    await query(
      "INSERT INTO operations_worker_lock (name, acquired_at) VALUES (?, ?)",
      [LOCK, new Date().toISOString()],
    );
    result.locked = true;
  } catch {
    return result;
  }
  try {
    const retryAfter = new Date(
      Date.now() - RETRY_WINDOW_HOURS * 60 * 60 * 1000,
    ).toISOString();
    // Thông báo của yêu cầu đã bị xóa (thư rác, yêu cầu thử) không còn gì để
    // báo. Để lại thì chúng đứng đầu hàng đợi và chiếm hết lượt gửi, yêu cầu
    // mới phía sau không được báo.
    await payload.delete({
      collection: "notification-outbox",
      where: { request: { exists: false } },
    });
    const pending = await payload.find({
      collection: "notification-outbox",
      where: {
        request: { exists: true },
        or: [
          { status: { equals: "pending" } },
          // Thử lại thư hỏng gần đây: phần lớn lỗi gửi thư là tạm thời.
          {
            and: [
              { status: { equals: "failed" } },
              { createdAt: { greater_than: retryAfter } },
            ],
          },
        ],
      },
      depth: 1,
      limit,
      // Mới nhất trước: yêu cầu khách vừa gửi được báo ngay, thư hỏng cũ chờ sau.
      sort: "-createdAt",
    });
    for (const row of pending.docs) {
      const request = row.request as { id: number | string; reference: string };
      try {
        await payload.sendEmail({
          to: process.env.NOTIFICATION_EMAIL,
          subject: "Yêu cầu tư vấn mới: " + request.reference,
          text:
            "Có yêu cầu tư vấn mới. Mở trang quản trị để xem và xử lý: " +
            process.env.NEXT_PUBLIC_SITE_URL +
            "/admin/collections/consultation-requests/" +
            request.id,
        });
        await payload.update({
          collection: "notification-outbox",
          id: row.id,
          data: { status: "sent" },
        });
        result.sent += 1;
      } catch {
        result.failed += 1;
        // Ghi trạng thái hỏng cũng có thể lỗi; đừng để một hàng làm dừng cả lượt.
        await payload
          .update({
            collection: "notification-outbox",
            id: row.id,
            data: { status: "failed" },
          })
          .catch(() => {});
      }
    }
    result.stuck = (
      await payload.count({
        collection: "notification-outbox",
        where: {
          and: [
            { status: { equals: "failed" } },
            { createdAt: { less_than_equal: retryAfter } },
          ],
        },
      })
    ).totalDocs;
  } finally {
    await query("DELETE FROM operations_worker_lock WHERE name = ?", [LOCK]);
  }
  return result;
}
