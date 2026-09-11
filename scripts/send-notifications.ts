import { query } from "../src/lib/operations-db";
/**
 * Gửi thông báo yêu cầu tư vấn từ hàng đợi outbox.
 *
 *   node --env-file=.env --import tsx scripts/send-notifications.ts
 *   node --env-file=.env --import tsx scripts/send-notifications.ts --check
 *
 * Chế độ --check gửi một thư kiểm tra tới NOTIFICATION_EMAIL để xác nhận cấu
 * hình SMTP hoạt động, thay vì chờ tới lúc có yêu cầu thật mới phát hiện sai.
 *
 * Thư gửi hỏng được thử lại trong 24 giờ. Trước đây một sự cố mạng thoáng qua
 * đánh dấu thư là "failed" vĩnh viễn và vòng quét chỉ lấy "pending", nên yêu
 * cầu của khách nằm im trong hệ thống mà không ai được báo.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const checkOnly = process.argv.includes("--check");
/** Thư hỏng quá thời hạn này thì ngừng thử lại và chờ người xử lý. */
const RETRY_WINDOW_HOURS = 24;

if (!process.env.NOTIFICATION_EMAIL || !process.env.SMTP_HOST) {
  // Thoát gọn thay vì ném lỗi: script này chạy theo lịch, một vệt stack trace
  // trong log của bộ định thời không nói cho người vận hành biết phải làm gì.
  console.error(
    "Chua cau hinh gui thu. Dat SMTP_HOST va NOTIFICATION_EMAIL trong .env, " +
      "sau do chay lai voi --check de xac nhan.",
  );
  process.exit(1);
}
const payload = await getPayload({ config });

if (checkOnly) {
  try {
    await payload.sendEmail({
      to: process.env.NOTIFICATION_EMAIL,
      subject: "Kiểm tra cấu hình gửi thư — website Vũ Khang",
      text:
        "Đây là thư kiểm tra do scripts/send-notifications.ts --check gửi.\n" +
        "Nhận được thư này nghĩa là cấu hình SMTP hoạt động và thông báo yêu " +
        "cầu tư vấn sẽ tới đúng hộp thư này.\n\n" +
        "Không có dữ liệu khách hàng trong thư kiểm tra.",
    });
    console.log("Da gui thu kiem tra toi", process.env.NOTIFICATION_EMAIL);
    console.log("Kiem tra hop thu de xac nhan da nhan duoc.");
  } catch (error) {
    process.exitCode = 1;
    console.error(
      "Gui thu kiem tra that bai:",
      error instanceof Error ? error.message : "loi khong xac dinh",
    );
  } finally {
    await payload.destroy();
  }
} else {
  /**
   * Chỉ một tiến trình được nhận việc gửi.
   *
   * SQLite không có khóa advisory như PostgreSQL, nên dùng một hàng trong bảng
   * làm khóa: khóa chính khiến lần chèn thứ hai thất bại, và đó chính là cơ chế
   * loại trừ. Khóa cũ hơn STALE_LOCK_MINUTES được coi là của một tiến trình đã
   * chết và bị thu hồi — nếu không, một lần bị giết giữa chừng sẽ chặn việc gửi
   * thư vĩnh viễn.
   */
  const LOCK = "notifications";
  const STALE_LOCK_MINUTES = 15;
  await query(
    "CREATE TABLE IF NOT EXISTS operations_worker_lock (name TEXT PRIMARY KEY, acquired_at TEXT NOT NULL)",
  );
  await query(
    "DELETE FROM operations_worker_lock WHERE name = ? AND acquired_at < ?",
    [LOCK, new Date(Date.now() - STALE_LOCK_MINUTES * 60 * 1000).toISOString()],
  );
  let locked = false;
  try {
    await query(
      "INSERT INTO operations_worker_lock (name, acquired_at) VALUES (?, ?)",
      [LOCK, new Date().toISOString()],
    );
    locked = true;
  } catch {
    // Hàng đã tồn tại: một tiến trình khác đang gửi.
  }
  try {
    if (!locked) process.exitCode = 0;
    else {
      const retryAfter = new Date(
        Date.now() - RETRY_WINDOW_HOURS * 60 * 60 * 1000,
      ).toISOString();
      const pending = await payload.find({
        collection: "notification-outbox",
        where: {
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
        limit: 50,
        sort: "createdAt",
      });
      for (const row of pending.docs) {
        const request = row.request as any;
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
        } catch {
          process.exitCode = 1;
          await payload.update({
            collection: "notification-outbox",
            id: row.id,
            data: { status: "failed" },
          });
          console.error(
            "Notification delivery failed; see outbox. No client data logged.",
          );
        }
      }
      // Thư hỏng quá hạn thử lại cần người xử lý: yêu cầu của khách đã được lưu
      // nhưng chưa ai được báo.
      const stuck = await payload.count({
        collection: "notification-outbox",
        where: {
          and: [
            { status: { equals: "failed" } },
            { createdAt: { less_than_equal: retryAfter } },
          ],
        },
      });
      if (stuck.totalDocs) {
        process.exitCode = 1;
        console.error(
          `${stuck.totalDocs} thong bao hong qua ${RETRY_WINDOW_HOURS} gio, ` +
            "khong con tu thu lai. Mo muc Thong bao can gui trong /admin.",
        );
      }
    }
  } finally {
    try {
      if (locked)
        await query("DELETE FROM operations_worker_lock WHERE name = ?", [
          LOCK,
        ]);
    } finally {
      // Không còn kết nối riêng phải trả lại: SQLite dùng chung một kết nối.
      await payload.destroy();
    }
  }
}
// Preserve a failure exit code for the hosting scheduler.
