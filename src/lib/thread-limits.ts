/**
 * Giữ số luồng nền của thư viện cơ sở dữ liệu ở mức cố định.
 *
 * `@libsql/client` chạy trên một runtime Tokio, và Tokio mặc định mở MỖI NHÂN
 * CPU MỘT LUỒNG. Trên máy 20 nhân, lần truy vấn đầu tiên đưa tiến trình từ 17
 * lên 37 luồng (đo ngày 10/10/2026 bằng `node server.cjs`). Trên máy chủ hosting
 * dùng chung — thường 32 tới 96 nhân — một website nhỏ thành ra giữ 50–100
 * luồng, trong khi CloudLinux tính mỗi luồng vào hạn mức số tiến trình (nPROC)
 * của tài khoản. Hệ quả đã gặp nhiều lần: website đang chạy thì Terminal và
 * trang Setup Node.js App của cPanel báo `cagefs_enter: Unable to fork`, không
 * dừng được ứng dụng để cập nhật.
 *
 * Hai luồng là đủ: SQLite chỉ có một bên ghi tại một thời điểm, nên thêm luồng
 * không làm website nhanh hơn. Với giới hạn này tiến trình dừng ở 19 luồng dù
 * máy có bao nhiêu nhân.
 *
 * Tokio đọc biến này lúc dựng runtime, tức ở lần mở cơ sở dữ liệu đầu tiên —
 * nên module này phải được nạp TRƯỚC mọi thứ dùng `@libsql/client`. Nó là dòng
 * import đầu tiên của payload.config.ts và operations-db.ts; server.cjs và
 * hosting-setup.mjs đặt cùng giá trị cho tiến trình của chúng.
 *
 * Muốn đổi thì đặt TOKIO_WORKER_THREADS trong biến môi trường; giá trị đã đặt
 * sẵn không bị ghi đè.
 */
process.env.TOKIO_WORKER_THREADS ??= "2";

export {};
