import {
  deliverPendingNotifications,
  RETRY_WINDOW_HOURS,
} from "../src/lib/notifications";
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

if (process.env.EMAIL_NOTIFICATIONS_DISABLED === "true") {
  // Cong ty da chon khong dung email thong bao. Thoat gon, khong bao loi: lich
  // chay dinh ky khong nen do moi lan chi vi mot lua chon co y.
  console.log("Email thong bao dang tat (EMAIL_NOTIFICATIONS_DISABLED=true).");
  console.log(
    "Yeu cau tu van van duoc luu; xem trong /admin > Yeu cau tu van.",
  );
  process.exit(0);
}
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
  // Cùng hàm với API gửi yêu cầu (gửi ngay sau khi khách bấm Gửi); ở đây chạy
  // theo lịch để thử lại thư hỏng. Khóa trong hàm bảo đảm không gửi trùng.
  try {
    const result = await deliverPendingNotifications(payload);
    if (result.failed) {
      process.exitCode = 1;
      console.error(
        "Notification delivery failed; see outbox. No client data logged.",
      );
    }
    // Thư hỏng quá hạn thử lại cần người xử lý: yêu cầu của khách đã được lưu
    // nhưng chưa ai được báo.
    if (result.stuck) {
      process.exitCode = 1;
      console.error(
        `${result.stuck} thong bao hong qua ${RETRY_WINDOW_HOURS} gio, ` +
          "khong con tu thu lai. Mo muc Thong bao can gui trong /admin.",
      );
    }
  } finally {
    // Không còn kết nối riêng phải trả lại: SQLite dùng chung một kết nối.
    await payload.destroy();
  }
}
// Preserve a failure exit code for the hosting scheduler.
