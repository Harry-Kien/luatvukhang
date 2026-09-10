# Triển khai và vận hành

## Cấu hình

Dùng .env.example. Bí mật lưu ở secret manager của nền tảng, không trong Git. NEXT_PUBLIC_SITE_URL phải là origin tin cậy, production HTTPS. Không dùng mật khẩu phát triển.

Stack chạy Node.js + PostgreSQL qua TCP. Không chuyển sang runtime Sites/Cloudflare Workers vì môi trường đó không hỗ trợ raw TCP theo hướng dẫn đã kiểm tra; giữ bộ công nghệ người dùng yêu cầu.

## Cơ sở dữ liệu

- Local đã kiểm thử PostgreSQL 18.4 qua embedded-postgres trên Windows, UTF-8. Wrapper beta chỉ là công cụ phát triển.
- docker-compose.yml chuẩn bị PostgreSQL 17; cấu hình này chưa chạy được trên Docker máy hiện tại.
- Production cần kiểm thử phiên bản PostgreSQL chọn dùng, TLS, quyền DB tối thiểu và quy trình migration.
- Không bật schema push trong production. Chạy `npm run payload -- migrate` sau khi có bản sao lưu.
- Migration ban đầu nằm ở src/migrations. Sau migration, chạy scripts/init-rate-limit.sql.
- Không chạy DOWN migration trên DB có dữ liệu thật nếu chưa có kế hoạch và xác nhận; có thể mất bảng.
- Khi thay mô hình, sinh migration mới, đọc SQL, thử ở staging trước.

## Website

1. npm ci
2. Kiểm tra cấu hình và dữ liệu công bố.
3. npm run typecheck && npm test
4. npm run build
5. npm start
6. Đặt sau reverse proxy HTTPS. Bảo vệ /admin bằng MFA/SSO hoặc cổng truy cập của đơn vị hosting.
7. Chỉ đặt SITE_LAUNCH_APPROVED=true và NEXT_PUBLIC_DEMO_MODE=false sau khi hoàn tất nghiệm thu.
8. Gắn domain thật rồi kiểm tra canonical/hreflang/sitemap, chuyển hướng, 404 và robots trực tiếp.
9. Persist thư mục media hoặc tích hợp object storage trước khi chạy nhiều máy chủ.

## Email

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, NOTIFICATION_EMAIL.
Chạy `node --env-file=.env --import tsx scripts/send-notifications.ts` bằng worker định kỳ của hạ tầng.
Worker dùng khóa PostgreSQL để tránh hai tiến trình gửi đồng thời. Email chỉ có mã tham chiếu và liên kết quản trị. Gửi thành công SMTP không đồng nghĩa thư đã đến inbox.
Outbox failed phải điều tra và đưa lại pending; chưa có backoff tự động.
Nếu worker chết sau SMTP gửi nhưng trước đánh dấu sent, lần chạy lại có thể gửi lặp: delivery hiện at-least-once.
Không cấu hình SMTP: sendEmail báo lỗi, không ghi email/mật khẩu reset ra console.

## Sao lưu và khôi phục

- Phép thử cục bộ: node --env-file=.env scripts/verify-local-restore.mjs. Chụp dữ liệu nhất quán, tạo DB law_restore_<timestamp>, áp migration ban đầu, nạp lại và so sánh từng dòng.
- Tệp sao lưu chứa dữ liệu riêng và hash mật khẩu nằm trong .local/backups, không đưa vào Git. Mã thử phục hồi chỉ dành cho DB cục bộ dùng quyền superuser; không chạy trên production.
- Kết quả: docs/restore-test.json.
- Production dùng pg_dump/pg_restore hoặc snapshot/PITR của nhà cung cấp, mã hóa, quản lý quyền, thời hạn lưu và thử RTO/RPO.
- Sao lưu Media riêng cùng metadata, kiểm tra khôi phục ảnh. Chưa có ảnh công ty trong DB thử.
- Giữ version triển khai và migration tương ứng. Quay lại ứng dụng trước chỉ khi schema tương thích; không tự động rollback DB.

## Giám sát

Cần chọn dịch vụ theo dõi lỗi và uptime trước ra mắt. Không gửi tên/email/nội dung tư vấn vào analytics. Theo dõi hàng đợi failed, phản hồi 5xx, dung lượng DB/media, tình trạng sao lưu. Chưa cấu hình giám sát ngoài máy.
Theo dõi Core Web Vitals bằng dữ liệu thật sau ra mắt; chưa có dữ liệu thực địa.

## Kiểm tra bảo mật phụ thuộc

audit-report.json ghi kết quả npm audit. Đã nâng sharp và DOMPurify. Còn cảnh báo moderate từ Payload/chuỗi công cụ Drizzle. Quyền unlock của Users đã khóa cho admin để giảm rủi ro advisory account-unlock; cần kiểm tra lại bản vá upstream trước production. Không dùng npm audit fix --force để hạ major CMS.
