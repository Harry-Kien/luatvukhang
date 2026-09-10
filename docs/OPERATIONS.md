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

Kiểm tra cấu hình trước khi có yêu cầu thật:
`node --env-file=.env --import tsx scripts/send-notifications.ts --check`
gửi một thư kiểm tra tới NOTIFICATION_EMAIL, không chứa dữ liệu khách hàng. Nhận
được thư nghĩa là đường gửi thông báo đã thông.

Thư gửi hỏng được **thử lại trong 24 giờ**. Trước đây một sự cố mạng thoáng qua
đánh dấu thư là `failed` vĩnh viễn trong khi vòng quét chỉ lấy `pending`, nên
yêu cầu của khách nằm im mà không ai được báo. Quá 24 giờ mà vẫn hỏng thì worker
ngừng thử lại, trả exit code khác 0 và in số bản ghi cần người xử lý — mở mục
Thông báo cần gửi trong /admin. Yêu cầu tư vấn của khách vẫn được lưu nguyên vẹn
trong mọi trường hợp; chỉ có bước báo cho nhân viên là chưa xong.
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

## Giám sát sức khỏe hệ thống
- `/api/health/live`: trả 200 khi tiến trình web trả lời được. Dùng cho kiểm tra liveness.
- `/api/health/ready`: trả 200 khi truy vấn DB thành công và các bảng chính tồn tại; trả 503 khi chưa sẵn sàng. Dùng để kiểm tra sau deploy và cảnh báo vận hành. Không tự restart web chỉ vì DB đang bảo trì.
- Hai endpoint chỉ trả trạng thái, không có dữ liệu khách hàng, không cache. Đây không phải kiểm tra SMTP, quyền ghi, nội dung, hoặc toàn bộ tính toàn vẹn schema.
- Pool thao tác vận hành tối đa 3 kết nối/tiến trình, chờ kết nối 3 giây, truy vấn 5 giây; pool CMS tối đa 10 kết nối/tiến trình, chờ kết nối 5 giây. Khi tăng số replica, cần tính tổng kết nối với giới hạn PostgreSQL.
- SMTP chờ kết nối/chào 10 giây, socket 30 giây. Worker trả exit code khác 0 nếu có thông báo gửi thất bại để scheduler phát hiện; giải phóng khóa và đóng CMS trong finally.
- Thông báo failed cần người vận hành kiểm tra trạng thái gửi ở nhà cung cấp trước khi chuyển về pending. Không gửi lại tự động nếu chưa biết email đã tới hay chưa; việc gửi email và cập nhật DB không phải giao dịch nguyên tử.

## Khi có sự cố
1. Kiểm tra live và ready để phân biệt web không trả lời với dữ liệu chưa sẵn sàng.
2. Kiểm tra log hosting/DB, hạn mức kết nối và migration đã chạy; không ghi secret hoặc nội dung tư vấn vào log.
3. Sau phục hồi, kiểm tra trang chính và gửi yêu cầu kiểm thử được đánh dấu, xác nhận DB/outbox rồi xóa dữ liệu kiểm thử theo quy trình.
4. Kiểm tra email với cấu hình thật trước khi tuyên bố hệ thống thông báo hoạt động.

Chưa kết nối dịch vụ giám sát bên ngoài hoặc tạo lịch gửi email trong phiên này. Các endpoint và hướng dẫn cần được cấu hình trên hosting thật.
