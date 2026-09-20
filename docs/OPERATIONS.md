# Triển khai và vận hành

## Cấu hình

Dùng .env.example. Bí mật lưu ở secret manager của nền tảng, không trong Git. NEXT_PUBLIC_SITE_URL phải là origin tin cậy, production HTTPS. Không dùng mật khẩu phát triển.

Stack chạy Node.js + SQLite (tệp trên đĩa). Không chuyển sang runtime Sites/Cloudflare Workers vì môi trường đó không có hệ thống tệp ghi được lâu dài; giữ bộ công nghệ người dùng yêu cầu.

DATABASE_URL phải là `file:` + đường dẫn tuyệt đối, trỏ ra ngoài mọi thư mục mà máy chủ web phục vụ trực tiếp. Tệp này là toàn bộ dữ liệu khách hàng: đặt trong vùng phục vụ tĩnh thì nó tải về được bằng một đường link.

## Cơ sở dữ liệu

- SQLite qua @payloadcms/db-sqlite và @libsql/client. Không có máy chủ cơ sở dữ liệu, không có cổng mạng, không có mật khẩu DB.
- Quyền tệp thay cho quyền DB: đặt `chmod 700` thư mục chứa và để đúng một người dùng hệ thống ghi được.
- Ghi vào SQLite là tuần tự. Không chạy nhiều tiến trình ứng dụng trên cùng một tệp; muốn tăng tải thì tăng CPU cho một tiến trình, không tăng số replica.
- `push` tắt hẳn trong payload.config.ts. SQLite không có schema tách biệt nên cơ chế đồng bộ lược đồ của Payload xóa cả bảng ngoài CMS.
- Sao lưu bằng `VACUUM INTO`, không bao giờ bằng `cp`: chế độ WAL giữ dữ liệu mới ở tệp -wal, chép thẳng sẽ ra bản rách.
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
Worker dùng một hàng khóa trong bảng để tránh hai tiến trình gửi đồng thời. Email chỉ có mã tham chiếu và liên kết quản trị. Gửi thành công SMTP không đồng nghĩa thư đã đến inbox.
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

- Phép thử phục hồi: chạy deploy/backup.sh, rồi trỏ `DATABASE_URL` của một phiên `next dev` riêng vào tệp vừa sao lưu và đối chiếu số bản ghi. Sao lưu chưa thử phục hồi thì chưa tính là sao lưu.
- Tệp sao lưu chứa dữ liệu riêng và hash mật khẩu. Đặt `chmod 600`, để ngoài Git, và đưa một bản ra khỏi máy chủ gốc.
- Kết quả: docs/restore-test.json.
- Production dùng deploy/backup.sh (`VACUUM INTO` + nén thư mục media) chạy theo cron, hoặc snapshot của nhà cung cấp; mã hóa, quản lý quyền, thời hạn lưu và thử RTO/RPO.
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
- Không còn nhóm kết nối: SQLite là tệp trên đĩa, giữ một kết nối duy nhất cho mỗi tiến trình. Giới hạn thực tế là khóa ghi của SQLite, không phải số kết nối.
- SMTP chờ kết nối/chào 10 giây, socket 30 giây. Worker trả exit code khác 0 nếu có thông báo gửi thất bại để scheduler phát hiện; giải phóng khóa và đóng CMS trong finally.
- Thông báo failed cần người vận hành kiểm tra trạng thái gửi ở nhà cung cấp trước khi chuyển về pending. Không gửi lại tự động nếu chưa biết email đã tới hay chưa; việc gửi email và cập nhật DB không phải giao dịch nguyên tử.

## Khi có sự cố
1. Kiểm tra live và ready để phân biệt web không trả lời với dữ liệu chưa sẵn sàng.
2. Kiểm tra log hosting/DB, hạn mức kết nối và migration đã chạy; không ghi secret hoặc nội dung tư vấn vào log.
3. Sau phục hồi, kiểm tra trang chính và gửi yêu cầu kiểm thử được đánh dấu, xác nhận DB/outbox rồi xóa dữ liệu kiểm thử theo quy trình.
4. Kiểm tra email với cấu hình thật trước khi tuyên bố hệ thống thông báo hoạt động.

Chưa kết nối dịch vụ giám sát bên ngoài hoặc tạo lịch gửi email trong phiên này. Các endpoint và hướng dẫn cần được cấu hình trên hosting thật.

## Cập nhật kiểm soát biểu mẫu và phát hành — 10/09/2026

- Ngày hẹn dùng lịch `Asia/Ho_Chi_Minh` ở cả trình duyệt và máy chủ. Ngày không
  tồn tại như 31/11 hoặc 29/02 năm không nhuận bị từ chối.
- Giới hạn 16.000 byte áp dụng trong lúc đọc luồng yêu cầu, kể cả khi người gửi
  không khai Content-Length. Proxy vẫn cần cấu hình giới hạn request và timeout.
- `TRUST_PROXY_HEADERS=false` là mặc định. Khi chưa tin cậy proxy, không dùng IP
  do khách tự khai để phân loại hạn mức. Chỉ bật `true` sau khi ingress đã được
  kiểm chứng **ghi đè** X-Forwarded-For và X-Real-IP, không giữ chuỗi do khách gửi.
  Chặn truy cập trực tiếp origin khi bật. Hạn mức chung 120/phút vẫn hoạt động.
- `release:check` kiểm tra origin HTTPS đúng cấu trúc, SMTP_FROM, cổng SMTP,
  mật khẩu khi dùng SMTP_USER, measurement ID và nội dung dịch vụ/luật sư VI.
  Kiểm tra cấu hình không chứng minh SMTP đã gửi được hoặc backup phục hồi được.
- `npm run check:content` quét 42 lượt trang. Có thể đặt CONTENT_CHECK_URL khi
  kiểm thử cổng khác; không dùng bộ kiểm thử ghi dữ liệu trên production.

## Triển khai bằng Docker

`Dockerfile` dựng ảnh chạy production. CI dựng lại ảnh này trên mỗi lần đẩy nên
nó luôn ở trạng thái dựng được.

```
docker build   --build-arg NEXT_PUBLIC_SITE_URL=https://ten-mien-that   --build-arg NEXT_PUBLIC_DEMO_MODE=false   -t luatvukhang:1.0 .
```

Ba điểm dễ sai:

1. **Biến `NEXT_PUBLIC_*` được nhúng lúc dựng ảnh**, không đọc lúc chạy. Truyền
   sai ở bước build thì canonical, hreflang và ảnh chia sẻ sẽ trỏ nhầm tên miền,
   và đổi biến môi trường lúc chạy không sửa được — phải dựng lại ảnh.
2. **Migration không chạy khi container khởi động.** Nhiều bản sao khởi động
   cùng lúc sẽ cùng chạy migration. Chạy như một bước phát hành riêng, trước khi
   đưa bản mới vào phục vụ:
   `docker run --rm --env-file .env luatvukhang:1.0 npm run payload -- migrate`
3. **`/app/media` phải gắn volume** hoặc chuyển sang object storage. Không gắn
   thì mỗi lần triển khai lại mất toàn bộ ảnh biên tập viên đã tải lên.

Container chạy bằng người dùng `node`, không phải root. `HEALTHCHECK` gọi
`/api/health/ready`; bộ cân bằng tải nên dùng chính endpoint đó để quyết định
khi nào đưa bản sao vào phục vụ.

Vẫn cần đặt sau reverse proxy HTTPS, và chỉ bật `TRUST_PROXY_HEADERS=true` khi
proxy đó thực sự ghi đè `X-Forwarded-For` — nếu bật khi chưa có proxy tin cậy,
người gửi tự đặt được header và hạn mức theo địa chỉ mất tác dụng.

## Bản nháp rỗng do tự lưu — 16/09/2026

CMS tự lưu bản nháp sau 700ms kể từ lúc mở màn hình soạn thảo. Mở "Viết bài
mới" rồi đổi ý thoát ra là để lại một bản ghi không tiêu đề, không đường dẫn.
Payload không có tùy chọn hoãn việc tạo bản ghi tới khi người dùng nhập gì đó,
nên phải dọn định kỳ:

```
node --env-file=.env --import tsx scripts/clean-empty-drafts.ts --list
node --env-file=.env --import tsx scripts/clean-empty-drafts.ts
```

Chỉ xóa bản ghi thiếu **cả** tiêu đề lẫn đường dẫn — thiếu một trong hai thì
giữ, vì đó có thể là bài ai đó đang viết dở. `hosting-setup.mjs` đã gọi sẵn ở
mỗi lần triển khai. `tests/cms-hygiene.spec.ts` giữ bất biến này.

## Không dùng email thông báo — 19/09/2026

Công ty có thể chọn không cấu hình SMTP. Khai báo bằng biến môi trường:

```
EMAIL_NOTIFICATIONS_DISABLED=true
```

Khi bật, `release:check` không còn chặn vì thiếu SMTP mà chuyển thành cảnh báo,
và `scripts/send-notifications.ts` thoát gọn với mã 0 thay vì báo lỗi mỗi lần
lịch chạy gọi tới.

**Đổi lại, phải có người mở `/admin` xem mục "Yêu cầu tư vấn" hằng ngày.** Yêu
cầu của khách vẫn được lưu đầy đủ và vẫn trả mã tham chiếu, nhưng không ai được
báo tự động. Bảng tổng quan của trang quản trị hiện sẵn số yêu cầu đang chờ tiếp
nhận ngay dòng đầu, nên chỉ cần đăng nhập là thấy.

Chỉ đúng chuỗi `true` mới được tính là khai báo. Quên cấu hình và cố ý không
dùng là hai chuyện khác nhau, và một giá trị gõ nhầm không được phép biến chuyện
thứ nhất thành chuyện thứ hai — vì vậy `EMAIL_NOTIFICATIONS_DISABLED=1` hay
`=yes` vẫn bị chặn như khi bỏ trống.

## Thông tin đăng ký hoạt động: nhắc chứ không chặn — 19/09/2026

`release:check` trước đây chặn phát hành khi Cài đặt thiếu bất kỳ ô nào trong
sáu ô thông tin pháp nhân, gồm cả thông tin đăng ký hoạt động. Công ty quyết
định không công bố ô đó, nghĩa là cổng phát hành sẽ đỏ vĩnh viễn — và một cổng
không bao giờ xanh được thì người vận hành học cách bỏ qua nó, kể cả những mục
khác đang thực sự cần chú ý.

Nay phân làm hai nhóm, ở `src/lib/release-environment.ts`:

| Nhóm | Ô | Xử lý |
| --- | --- | --- |
| Khách cần để liên hệ và nhận diện | tên công ty, tên tiếng Anh, điện thoại, địa chỉ, email | **chặn** |
| Tín hiệu xác minh | thông tin đăng ký hoạt động | **cảnh báo**, nêu ở mỗi lần kiểm tra |

Phần kiểm tra tách thành hàm thuần `releaseSettingsIssues` nên có kiểm thử bằng
dữ liệu dựng sẵn, không cần cơ sở dữ liệu thật. Trước đó khối này không có bài
kiểm thử nào canh.

Khuyến nghị vẫn giữ nguyên: với một công ty luật, số Giấy đăng ký hoạt động là
thứ khách hàng cẩn thận tìm để xác minh. Thêm vào bất cứ lúc nào bằng
`scripts/set-contact.ts --registration "..."` là cảnh báo tự biến mất.

## Theo dõi yêu cầu tư vấn — 20/09/2026

Mục Yêu cầu tư vấn trước đây chỉ có bốn trạng thái và một ô ghi chú. Đủ để lưu,
chưa đủ để ba người cùng chạy trên đó — nhất là khi công ty đã chọn không dùng
email thông báo, nên không ai được báo tự động.

Bổ sung ba ô:

| Ô | Vì sao |
| --- | --- |
| **Người phụ trách** | Không có email thông báo thì đây là thứ duy nhất cho biết việc thuộc về ai. Ba người cùng nhìn một danh sách mà không ai đứng tên là công thức để yêu cầu rơi. |
| **Cần liên hệ lại trước** | Bảng tổng quan đếm những yêu cầu đã quá hạn mà chưa đóng, và hiện ngay dòng đầu. |
| **Kết quả** | Bắt buộc khi đóng. "Đã đóng" mà không có lý do thì sau một năm công ty không biết mình mất khách vì báo giá, vì ngoài phạm vi, hay vì không ai gọi lại. |

Năm giá trị kết quả: đã nhận việc, khách không tiếp tục, ngoài phạm vi hành
nghề, không liên hệ được, trùng với yêu cầu khác.

Bảng tổng quan nay hiện cả hai con số ngay dòng đầu — *"N yêu cầu mới đang chờ
tiếp nhận, M yêu cầu đã quá hạn liên hệ lại"* — kèm lối tắt sang danh sách đã
sắp theo hạn.

`tests/intake.spec.ts` giữ cả ba: giao việc được, không đóng được khi chưa nêu
kết quả, và bảng tổng quan đếm đúng cái quá hạn.

**Đây vẫn chưa phải CRM.** Chưa có nhật ký liên hệ theo dòng thời gian, chưa có
báo cáo tỷ lệ chuyển đổi, chưa có nhắc việc tự động. Đủ để một công ty ba người
vận hành không bỏ sót; không đủ để thay một phần mềm CRM khi quy mô lớn hơn.
