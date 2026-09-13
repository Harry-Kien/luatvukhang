# Báo cáo nghiệm thu — 08/09/2026

**Chưa đủ điều kiện ra mắt.** Đây là bản phát triển có website công khai, CMS thực và cơ sở dữ liệu thực; không phải sản phẩm đã hoàn thành toàn bộ đặc tả.

## Đã thực hiện và có kiểm chứng

- Trang chủ navy–đỏ, mẫu chữ tiếng Việt và các trang chuyên môn/danh sách/chi tiết/liên hệ/tư vấn/tìm kiếm.
- Hai họ font tự lưu, kiểm tra chuỗi tên tiếng Việt; xem ảnh toàn trang desktop và mobile. Bố cục không tràn ngang trong tập route thử.
- Kiểm tra axe WCAG A/AA trên trang chủ ở hai kích thước: không có lỗi tự động được phát hiện. Đây không phải chứng nhận WCAG toàn website.
- Việt–Anh, tìm kiếm không dấu trên tiêu đề/tóm tắt, giữ chuyên môn sang biểu mẫu.
- Lỗi biểu mẫu giữ dữ liệu; server kiểm tra dữ liệu và Origin.
- Payload admin đăng nhập thật và bảng tổng quan.
- Tạo 4 vai trò ngoài quản trị trong test, kiểm tra cấm xuất bản sai quyền, duyệt–xuất bản, ngăn nâng quyền và ngăn biên tập đọc tư vấn.
- Bản nháp không lộ công khai; sửa nháp không thay bản xuất bản.
- Bản dịch chưa xuất bản không xuất hiện như nội dung đã công bố.
- Lịch sử và khôi phục qua API.
- Preview chỉ mở nội dung nháp khi tài khoản đã đăng nhập có quyền.
- Đổi slug tạo và thực thi chuyển hướng.
- Yêu cầu được lưu thật; gửi lại cùng khóa trả cùng mã, chỉ một bản ghi.
- Yêu cầu và outbox lưu chung giao dịch.
- Không thể xác nhận lịch nếu thiếu ngày giờ xác nhận.
- Vòng cuối: TypeScript qua, 16/16 kiểm thử desktop/mobile qua, production build thành công.
- Sao lưu nhất quán và phục hồi dữ liệu vào DB riêng: 98 bảng, mọi dòng khớp; xem restore-test.json. Không có dữ liệu khách hàng thật trong tập kiểm thử.

## Có mã/cấu hình nhưng cần nghiệm thu thêm

- Payload autosave, cảnh báo chưa lưu, sắp xếp/nhân bản/ẩn khối, khóa nhiều người cùng sửa và live preview ở khung desktop/mobile: cần thêm hành trình UI cụ thể, đặc biệt xung đột hai người sửa. Không tính là xong chỉ vì đã bật cấu hình.
- Email worker có SMTP adapter và hàng đợi; chưa gửi thử với nhà cung cấp email, chưa cấu hình lịch worker thực.
- SEO canonical/hreflang/sitemap và chặn index staging đã có nền tảng. Cần rà soát hreflang chỉ trỏ bản dịch có thật, custom-domain và dữ liệu có cấu trúc khi có thông tin doanh nghiệp.
- Cài đặt đã nối tên vào header/footer, địa chỉ/điện thoại/email vào Liên hệ. Chưa nghiệm thu nhiều cấu hình doanh nghiệp thật.
- Schema có quan hệ hồ sơ, dịch vụ, bài, văn phòng. Giao diện chi tiết quan hệ, ảnh hồ sơ, mục lục, FAQ và bộ lọc cần tiếp tục hoàn thiện với nội dung thật.
- Menu Ngôn ngữ độc lập chưa có; dùng trường ngôn ngữ và mã liên kết bản dịch.
- Trang chủ hiện cho sửa tiêu đề, tóm tắt và thêm khối; các phần biên tập chính còn cố định. Chưa phải trình biên tập trực quan hoàn chỉnh toàn trang.
- Tìm kiếm giới hạn tối đa 100 bản ghi mỗi loại trong truy vấn hiện tại; cần phân trang/chỉ mục khi tăng nội dung.
- Route ngành nghề và tuyển dụng chưa bật vì chưa có nội dung.
- Bảng thiết kế SVG chỉnh sửa được được bàn giao; chưa có file Figma native.

## Còn chặn ra mắt

- Thông tin công ty, ảnh có quyền, nội dung dịch vụ/hồ sơ/kinh nghiệm/bài và chính sách được duyệt.
- SMTP, tên miền/HTTPS, hosting, object storage, MFA/SSO, giám sát, sao lưu production và thử phục hồi cả media.
- Kiểm tra bảo mật/phụ thuộc lần cuối: 11 cảnh báo moderate trong npm audit hiện tại; không còn cảnh báo high/critical sau cập nhật. Advisory unlock đã được hạn chế bằng access riêng, nhưng vẫn cần đánh giá upstream.
- Kiểm thử bằng nội dung thật, trình đọc màn hình, bàn phím toàn hành trình, 200% zoom, font/tên dài và cắt ảnh chân dung.
- Hiệu năng thực địa, Core Web Vitals, kiểm thử tải/rate-limit và xử lý lỗi hạ tầng.

## Phạm vi ngoài bản đầu

Cổng khách hàng, tài liệu riêng, tiến độ vụ việc, AI tra cứu/trả lời: chưa triển khai, không xuất hiện như tính năng hoạt động.

## Cập nhật hoàn thiện 08/09/2026
Đã bổ sung banner CMS có ảnh desktop/mobile và điểm lấy nét, 10 trang nền dạng nháp, dự thảo chính sách song ngữ, ngành nghề/tuyển dụng, hồ sơ/FAQ/quy trình/mục lục/nội dung liên quan, tìm kiếm danh sách và phân trang. Hreflang chi tiết dùng bản dịch thực sự đã xuất bản. Truy vấn nội dung không còn cắt ở 100 bản ghi (cần tối ưu truy vấn tìm kiếm khi dữ liệu lớn).
Cơ sở rà soát pháp lý: Luật 91/2025/QH15, hiệu lực 01/01/2026, nguồn chính thức https://vanban.chinhphu.vn/?classid=1&docid=214590&pageid=27160 . Các bản đề xuất không phải chứng nhận tuân thủ và chưa có hiệu lực.
Vẫn cần dữ liệu thật, rà soát pháp lý, cấu hình SMTP/hạ tầng, kiểm thử khôi phục production và duyệt ra mắt. Các mục cũ về chưa có banner CMS/FAQ/TOC/ngành nghề/tuyển dụng đã được thay thế bởi cập nhật này.

## Nghiệm thu bổ sung — 09/09/2026
- Trang đội ngũ có bố cục riêng, chân dung/ảnh thay thế bằng chữ viết tắt, lọc chuyên môn đã xuất bản, tìm kiếm không dấu, sắp xếp tên, phân trang và trạng thái không có kết quả riêng biệt với chưa có hồ sơ.
- Hồ sơ hiển thị văn phòng đã xuất bản cùng ngôn ngữ; tác giả bài viết được tra lại từ nội dung công khai, tránh dùng bản nháp/bản khác ngôn ngữ.
- Admin có bảng trạng thái 5 trang chính theo VI/EN, liên kết đến nội dung cần hoàn tất.
- 8 kiểm thử đội ngũ/CMS qua trên desktop và mobile; build production thành công. Kiểm thử có tạo rồi xóa hồ sơ QA, không giữ người giả trên website.
- Khôi phục local theo toàn bộ migration: 114 bảng, 115 dòng khớp bản chụp nhất quán. Phạm vi chưa bao gồm media hoặc hạ tầng production.
- Ước lượng quản lý tiến độ: nền tảng/chức năng khoảng 80%; sẵn sàng ra mắt khoảng 60%. Đây là ước lượng theo phạm vi, không phải chứng nhận chất lượng hay kết quả đo tự động.
- Còn cần hoàn thiện biên tập toàn bộ trang chủ, kiểm thử xung đột CMS, tối ưu tìm kiếm khi dữ liệu lớn, nghiệm thu nội dung và hạ tầng production như danh sách phía trên. Các dữ liệu doanh nghiệp thật còn thiếu không được tự tạo.

## Nâng cấp SEO và bảo mật — 09/09/2026

Đã thực hiện và có kiểm chứng trên bản production build cục bộ:

- Dữ liệu có cấu trúc: `LegalService`/`Organization` và `WebSite`+`SearchAction`
  trên mọi trang công khai, `BreadcrumbList` trên mọi trang có tiêu đề. Đã xem
  trực tiếp trong HTML trả về. Bộ dựng `Article`, `Person`, `Service`,
  `JobPosting` đã nối vào route chi tiết và qua TypeScript, nhưng **chưa chạy
  thực tế** vì cơ sở dữ liệu cục bộ chưa có bản ghi đã xuất bản thuộc các loại
  này. `FAQPage` đã kiểm chứng trên trang hướng dẫn khách hàng (6 câu hỏi).
- Mọi trang có canonical, hreflang `vi`/`en`/`x-default` và mô tả riêng. Trang
  chủ trước đây không có canonical lẫn hreflang, nay đã có.
- Sửa lỗi sitemap sinh `/vi/` trong khi canonical là `/vi`. Sitemap nay khai
  hreflang, `lastModified` theo bản ghi và độ ưu tiên; không khai `lastmod` cho
  trang tĩnh vì sitemap sinh theo yêu cầu.
- Trang tìm kiếm và mẫu chữ đặt `noindex, follow`. Đã kiểm chứng ở cả hai trạng
  thái chưa/đã duyệt ra mắt.
- Bộ nhận diện: favicon, apple-icon, ảnh chia sẻ 1200×630 và web manifest. Chữ
  tiếng Việt có dấu trên ảnh chia sẻ đã kiểm tra bằng mắt.
- Header: thêm Content-Security-Policy và Strict-Transport-Security. CSP chỉ áp
  cho phần công khai, không áp cho `/admin` và `/api`; đã kiểm chứng bằng phản
  hồi thật. Giới hạn CSP và lý do ghi trong `docs/SEO.md`.
- Giới hạn gửi biểu mẫu chuyển từ một bộ đếm chung sang theo từng địa chỉ gửi,
  kèm dọn bộ đếm cũ. **Phụ thuộc proxy ghi đúng `X-Forwarded-For`** — chưa kiểm
  thử sau proxy thật.
- Ảnh từ CMS có `srcset` dựng từ kích thước Payload tạo sẵn. Truy vấn nội dung
  ghi nhớ theo lượt render. **Chưa đo Core Web Vitals thực địa.**
- `release:check` bổ sung kiểm tra SEO và cảnh báo E-E-A-T.
- Thêm `scripts/clean-qa-records.ts`: bộ kiểm thử bị ngắt giữa chừng để lại bản
  ghi QA đã xuất bản, khiến website coi đó là nội dung thật và làm hỏng các lần
  chạy sau. Sự cố này đã xảy ra trong phiên và đã được xử lý.

Vòng kiểm tra cuối: TypeScript qua, production build thành công, 26/26 kiểm thử
desktop/mobile qua.

Chưa thay đổi: website vẫn chặn chỉ mục vì chưa duyệt ra mắt, và
`NEXT_PUBLIC_SITE_URL` vẫn là `localhost` nên toàn bộ URL tuyệt đối đang trỏ về
máy cục bộ. Danh sách việc còn lại xem `docs/SEO.md`.

## Cải tiến tìm kiếm
Tìm kiếm công khai hiện bao gồm tiêu đề, tóm tắt, rich text, các khối đang hiển thị, phạm vi, quy trình, FAQ và thông tin nghề nghiệp. Không lập chỉ mục trường nội bộ hoặc khối ẩn. Kết quả ưu tiên tiêu đề, tiếp đến tóm tắt và nội dung; có lọc loại nội dung và phân trang 10 kết quả.
Kiểm thử font yêu cầu tải chuỗi tên tiếng Việt cụ thể trước khi kiểm tra, tránh đánh giá sai do font subset chỉ được tải khi cần.
Giới hạn: tìm kiếm vẫn chạy trên tập nội dung lấy từ CMS; chưa có chỉ mục chuyên dụng cho quy mô lớn. Các yêu cầu dữ liệu thật và hạ tầng production nêu trên vẫn còn hiệu lực.

## Vòng hoàn thiện thứ hai — 09/09/2026

- **Sửa lỗi hiệu năng font.** Trang chủ trên khung điện thoại giảm từ 866 KB
  xuống 402 KB. Nguyên nhân chính: bộ CSS fontsource khai báo subset `latin-ext`
  sau `vietnamese`, dải mã chồng lên đúng `Đ đ Ĩ ĩ Ũ ũ Ơ ơ Ư ư ỹ`, khiến trình
  duyệt tải 182 KB chỉ để hiển thị vài chữ cái tiếng Việt. Đã khai báo lại face
  tiếng Việt ở cuối `brand.css`; kiểm chứng latin-ext không còn được tải và chụp
  ảnh trang mẫu chữ để xác nhận chữ vẫn đúng font serif.
- Ảnh hero có biến thể 800px và 1200px (`scripts/optimize-images.mjs`); trước
  đây điện thoại tải nguyên bản 1800×2700.
- Gỡ `NextIntlClientProvider` khỏi layout vì không component nào dùng.
- Đo hiệu năng cục bộ bằng `scripts/measure-performance.mjs`: LCP xấu nhất
  512 ms, CLS xấu nhất 0,018, đều trong ngưỡng tốt. **Không phải số liệu thực
  địa**, chỉ dùng phát hiện hồi quy.
- **npm audit: 11 → 7 cảnh báo.** Bốn cảnh báo esbuild đã xử lý bằng `overrides`
  thay vì hạ cấp Payload như npm đề xuất. Bảy cảnh báo còn lại là một advisory
  Payload chưa có bản vá, đã vô hiệu sẵn bằng `unlock: isAdmin`.
- Thêm RSS `/vi/feed.xml`, `/en/feed.xml`; chỉ mở sau khi duyệt ra mắt.
- Thêm móc nối Google Analytics 4 và xác minh Search Console/Bing qua biến môi
  trường, mặc định tắt; CSP tự mở đúng miền khi bật.
- Hạn mức gửi biểu mẫu: khi proxy chưa ghi `X-Forwarded-For`, chỉ áp hạn mức
  chung thay vì siết 5/phút lên toàn bộ lưu lượng.
- **Thêm `tests/seo.spec.ts`** — 6 bài kiểm thử phủ canonical, hreflang, mô tả,
  số thẻ h1, Open Graph, JSON-LD, robots/sitemap/manifest/feed, liên kết RSS và
  quét tiếp cận trên 6 trang. Trong đó có bài tạo bản ghi đã xuất bản thật rồi
  xóa, nhờ đó `Article`, `Person`, `Service` **đã được chạy thực tế** — khắc
  phục điểm chưa kiểm chứng được ghi ở mục trước.
- Vòng kiểm tra cuối: TypeScript qua, production build thành công, 42/42 kiểm
  thử desktop/mobile qua.

Lưu ý phối hợp: trong phiên này có tiến trình khác sửa cùng thư mục (thêm trang
Hướng dẫn khách hàng và bộ lọc tìm kiếm). Không nên chạy hai phiên đồng thời
trên cùng bản làm việc.

## Vòng hoàn thiện thứ ba — 10/09/2026

Thêm `tests/accessibility.spec.ts`, phủ những phần WCAG mà axe không quét được:
liên kết bỏ qua, hành trình gửi yêu cầu chỉ bằng bàn phím, phóng to 200%, thứ tự
tiêu đề, cấu trúc landmark và nhãn cho mọi ô nhập. Đây là các mục trước đây ghi
là "còn cần kiểm thử bàn phím toàn hành trình, 200% zoom".

Lỗi bộ kiểm thử mới phát hiện và đã sửa:

- **`/vi/services` và trang danh sách nhảy cấp tiêu đề** h1 → h3, bỏ qua h2.
  Người dùng trình đọc màn hình mất quan hệ cấu trúc (WCAG 1.3.1). Đã đổi sang
  h2 và mở rộng selector CSS sang `:is(h2, h3)` để giữ nguyên giao diện; đã chụp
  ảnh đối chiếu.
- **Trang Góc nhìn mất `BreadcrumbList`** sau khi được tách sang component
  `Insights` mà không truyền `path` cho `PageHeading`.
- **`/zh/experience` không có thẻ mô tả**: bản đồ mô tả tiếng Trung thiếu khóa
  `experience`, và code dùng bản đồ đó thay thế hoàn toàn nên trả về `undefined`
  thay vì lùi về bản dịch chung. Đã bổ sung khóa và thêm cơ chế lùi.
- **RSS chỉ nhận vi/en** nên `/zh/feed.xml` trả 404 trong khi trang vẫn quảng bá
  liên kết đó. Đã chuyển sang đọc danh sách ngôn ngữ từ cấu hình chung.
- **Sitemap mất `x-default`** sau khi được viết lại để hỗ trợ ba ngôn ngữ. Đã
  khôi phục cho cả trang tĩnh lẫn trang chi tiết.

Hai cảnh báo hóa ra là lỗi của chính bài kiểm thử, đã sửa và ghi lại để không
lặp: selector chỉ xét nút đầu tiên trong header (nút ẩn) nên báo sai là mất điều
hướng ở 200%; và ngưỡng độ dài mô tả áp chung cho mọi hệ chữ viết nên báo sai với
tiếng Trung.

Rà soát bảo mật thủ công: xem bảng trong `docs/SEO.md`. Không phát hiện lỗ hổng
truy cập. Hai điểm còn lại được ghi nhận là rủi ro chấp nhận có điều kiện.

Vòng kiểm tra cuối: TypeScript qua, production build thành công, 78/78 kiểm thử
desktop/mobile qua.

**Lưu ý phối hợp quan trọng.** Trong vòng này có phiên làm việc thứ hai chạy song
song trên cùng thư mục, bổ sung ngôn ngữ tiếng Trung và sửa cả những tệp thuộc
phần SEO. Có thời điểm cây mã không biên dịch được do tệp đang sửa dở, khiến việc
kiểm chứng phải dừng và chờ. Không nên chạy hai phiên đồng thời trên cùng bản làm
việc; và dự án vẫn chưa khởi tạo git nên không có lịch sử để đối chiếu hay khôi
phục khi hai bên ghi đè nhau.

## Vòng hoàn thiện thứ tư — 10/09/2026

Khởi tạo kho git. Dự án đã có `.gitignore` nhưng chưa từng chạy `git init`, nên
không có lịch sử để đối chiếu hay khôi phục — đặc biệt rủi ro khi có hai phiên
làm việc song song. Đã kiểm tra: không tệp bí mật nào (`.env`, `.local/`,
`media/`) lọt vào kho. Đầu ra của trình chạy test trong `artifacts/` không được
theo dõi; ảnh chụp bàn giao vẫn giữ.

Rà soát mã lớp SEO, 11 phát hiện, tất cả đã sửa. Ba lỗi kiểm chứng bằng phản hồi
thật của website:

- `og:locale:alternate` tính bằng `locale === "vi" ? "en" : "vi"` nên chỉ nêu
  được một ngôn ngữ: trang tiếng Trung không bao giờ giới thiệu bản tiếng Anh.
- `availableLanguage` trong Organization thiếu tiếng Trung dù `/zh` đã công bố —
  hai tín hiệu mâu thuẫn nhau với công cụ tìm kiếm.
- Sitemap dựng lại toàn bộ dữ liệu bộ sưu tập bên trong vòng lặp ngôn ngữ dù giá
  trị không phụ thuộc ngôn ngữ: 54 lượt đọc không phân trang mỗi yêu cầu thay vì
  18 lượt cần thiết.

Tám phát hiện còn lại đã sửa: mã ngôn ngữ viết cứng ở bốn nơi, trang chi tiết
thiếu `x-default`, RSS dùng `zh` thay vì `zh-Hans`, RSS không loại ký tự điều
khiển phá vỡ XML, `Host` trong robots.txt kèm giao thức, hạn mức gửi biểu mẫu
tính trước khi kiểm tra trùng, và kiểm tra Origin cứng nhắc chặn nhầm tên miền
phụ (nay có `ALLOWED_FORM_ORIGINS`).

Bộ kiểm thử tiếp cận phủ thêm tiếng Anh và tiếng Trung; quét WCAG tự động chạy
thêm trên `/zh` và `/zh/services`.

Vòng kiểm tra cuối: TypeScript sạch, production build thành công, 84/84 kiểm thử
desktop/mobile đạt.

## Hoàn thiện nội dung và kiểm soát vận hành — 10/09/2026

- 16 khối hướng dẫn Việt/Anh/Trung; 15 trang nháp có thể biên tập trong CMS.
  Script khởi tạo chạy lại tạo 0 bản ghi, không ghi đè nội dung đang có.
- Trang Liên hệ không còn bỏ qua thông tin doanh nghiệp khi có nội dung CMS.
- Nội dung hướng dẫn có thể tìm qua tìm kiếm và dẫn tới đúng trang.
- Preview yêu cầu quyền biên tập; sửa bản nháp không thay nội dung công khai.
- Ngày hẹn được kiểm tra ngày thực tế và múi giờ Việt Nam; giới hạn request
  áp dụng theo byte ngay trong luồng đọc; chỉ tin header IP khi cấu hình ingress.
- Bổ sung kiểm tra cấu hình phát hành, dữ liệu dịch vụ và hồ sơ luật sư.
- Production build và TypeScript đạt; toàn bộ 98 kiểm thử đạt. Sau bổ sung
  tìm kiếm hướng dẫn, 8 kiểm thử liên quan đạt. Quét 42 lượt trang ba ngôn ngữ,
  desktop/mobile không có lỗi axe, tràn ngang hoặc thiếu h1 trong phạm vi quét.
- npm audit production: 7 moderate, 0 high, 0 critical trong nhóm Payload;
  không dùng hạ cấp major tự động để che cảnh báo.

Chưa hoàn tất ra mắt: dữ liệu pháp nhân/hồ sơ luật sư được xác minh, duyệt chính
sách, tên miền/HTTPS, SMTP thực và nghiệm thu hạ tầng. Không đưa bí mật hoặc
cơ sở dữ liệu khách hàng lên GitHub. Mã seed được bàn giao trong repository;
15 bản nháp được tạo trong cơ sở dữ liệu local, không phải DB production.

## Mở rộng lĩnh vực, đội ngũ minh họa và kênh liên hệ — 10/09/2026

**Lĩnh vực pháp lý: 4 → 12.** Bổ sung Lao động & nhân sự, Đất đai & bất động
sản, Thuế & tài chính doanh nghiệp, Hôn nhân/gia đình & thừa kế, Hình sự, Hành
chính & giấy phép, Ngân hàng & tín dụng, Xây dựng & hạ tầng. Mỗi lĩnh vực có
tóm tắt, đối tượng phù hợp, 6 mục phạm vi, 4 bước quy trình, 4 câu hỏi thường
gặp và mô tả SEO riêng, ở cả ba ngôn ngữ — tổng 36 bản ghi, 72 mục phạm vi,
45 bước quy trình, 44 câu hỏi.

Nội dung giữ đúng giới hạn đã đặt từ đầu: chỉ mô tả phạm vi công việc và cách
làm việc; không nêu số năm kinh nghiệm, quy mô, giải thưởng, tên khách hàng hay
kết quả vụ việc; không dẫn số hiệu điều luật cụ thể vì trích dẫn chưa được rà
soát trên website công ty luật là rủi ro nghề nghiệp. Phần hỏi đáp giữ ở mức
quy trình, không tư vấn pháp lý cụ thể. Riêng mảng hình sự và gia đình được
viết ở giọng bình tĩnh, không hứa hẹn kết quả và không gợi ý quan hệ với cơ
quan tiến hành tố tụng.

**Đội ngũ: 6 hồ sơ minh họa** (18 bản ghi ba ngôn ngữ), sửa được trong CMS. Chi
tiết cơ chế bảo vệ ba lớp xem `docs/BUSINESS-INPUTS.md`. Điểm cốt lõi: cờ
`isSample` khiến `publicationGuard` từ chối xuất bản **kể cả tài khoản quản
trị** — đã có kiểm thử tự động chứng minh bằng yêu cầu thật; hồ sơ chỉ hiện ở
chế độ demo, luôn kèm nhãn, và không phát schema.org `Person`.

**Kênh liên hệ trực tiếp.** Số 0832270898 do công ty cung cấp đã vào Cài đặt và
sinh ra nút gọi cùng nút Zalo ở thanh tiện ích, menu di động, chân trang, trang
Liên hệ và một cụm nút nổi luôn trong tầm tay. Một nguồn duy nhất: đổi số trong
Cài đặt là mọi nơi đổi theo, kể cả `telephone` trong `Organization`. Chưa nhập
số thì toàn bộ khối không render, để website không mời một hành động không thực
hiện được. Biểu tượng Zalo vẽ bằng SVG nội tuyến vì CSP chỉ cho phép ảnh cùng
nguồn — tải logo từ máy chủ Zalo sẽ hỏng lặng lẽ.

Lỗi bộ kiểm thử phát hiện và đã sửa: thanh tiện ích có thêm hai liên kết gây
**tràn ngang ở khung 320px**. Dưới 700px phần này được ẩn; người dùng vẫn có nút
nổi và mục liên hệ trong menu.

Thêm `tests/contact-and-samples.spec.ts` — 5 bài × 2 khung: chuẩn hóa số điện
thoại từ bốn cách nhập, loại số thiếu chữ số, kiểm tra liên kết gọi/Zalo trên ba
ngôn ngữ, tên gọi trợ năng khi chữ bị ẩn ở khung hẹp, hồ sơ minh họa có nhãn và
không phát `Person`, và bài chứng minh quản trị viên không xuất bản được nội
dung minh họa.

`release:check` nay liệt kê từng bản ghi minh họa cần thay trước khi ra mắt.

Vòng kiểm tra cuối: TypeScript sạch, production build thành công, **108/108 kiểm
thử desktop/mobile đạt**.

**Chưa thay đổi điều kiện ra mắt.** `release:check` vẫn chặn 13 mục: demo mode,
cờ duyệt ra mắt, tên miền HTTPS, SMTP, thông tin pháp nhân còn thiếu (địa chỉ,
email, mã số thuế, đăng ký hành nghề), duyệt chính sách, 6 trang Quyền riêng
tư/Điều khoản và hồ sơ luật sư thật. Ngoài ra, **36 bản ghi lĩnh vực chuyên môn
đang ở trạng thái đã xuất bản nhưng do script soạn, chưa có luật sư của công ty
đọc duyệt** — phải rà soát trước khi bật `SITE_LAUNCH_APPROVED`.

## Đổi tên công ty thành Công ty Luật Vũ Khang Solutions & Partners — 13/09/2026

Tên đầy đủ mới thay cho "Công ty Luật TNHH Vũ Khang" ở mọi nơi: tiêu đề mặc
định, manifest, schema.org, ảnh chia sẻ, mô tả trang, bản dự thảo chính sách
(ba ngôn ngữ), tài liệu và tệp dịch vụ. Tên ngắn "Vũ Khang" trong tiêu đề trang
và siteName giữ nguyên.

Wordmark ở header và footer chuyển sang ba dòng: CÔNG TY LUẬT / VŨ KHANG /
SOLUTIONS & PARTNERS, chiều cao vẫn nằm trong khung header 103px.

Dữ liệu CMS đã có (trang Về chúng tôi, Quyền riêng tư, Điều khoản ở ba ngôn
ngữ) đổi bằng `scripts/rename-company.ts`, giữ nguyên trạng thái nháp/xuất bản.
**Script này phải chạy thêm một lần trên hosting** vì cơ sở dữ liệu ở đó tách
biệt với máy cá nhân.

## Logo chính thức thay monogram chữ — 13/09/2026

**Logo thật của công ty** (chữ V navy, K vàng, sách mở, viền tròn vàng) thay cho
monogram "VK" vẽ bằng chữ. Logo gốc lưu ở `design/logo.jpg`; mọi tệp nhận diện
sinh bằng `scripts/generate-brand-assets.mjs`, không chỉnh tay.

Ba khoảng trống phát hiện khi rà soát trước đó đã được lấp: `/favicon.ico` từng
trả 404 (Safari không đọc favicon SVG, Google/Zalo gọi thẳng đường dẫn này);
manifest chưa có biểu tượng 192/512 và bản maskable cho Android; `logo` trong
schema.org trỏ tới SVG thay vì PNG ≥ 112×112 như Google khuyến nghị.

Đã kiểm chứng bằng mắt: header và footer trên máy tính lẫn điện thoại, favicon
ở 16/32 px, ảnh chia sẻ 1200×630, biểu tượng iOS nền trắng. Bài kiểm thử
`tests/brand.spec.ts` thêm điều kiện ảnh logo phải tải xong.

## Icon Zalo chính thức, chỗ cho chatbot và rà soát bố cục — 10/09/2026

**Chữ hiệu Zalo chính thức** thay cho ký hiệu tự vẽ trước đó. Nguồn: bộ Simple
Icons (tệp icon CC0; nhãn hiệu thuộc VNG), nhúng dưới dạng đường dẫn SVG nội
tuyến vì CSP chỉ cho phép ảnh cùng nguồn. Phạm vi sử dụng và lưu ý pháp lý ghi
ở `docs/DEPENDENCIES.md`. Vì chữ hiệu tự đọc thành "Zalo", nhãn chữ trùng lặp đã
được bỏ; tên gọi cho trình đọc màn hình chuyển hẳn sang `aria-label`.

**Lỗi bố cục phát hiện khi mở rộng lên 12 lĩnh vực.** Danh mục chuyên môn đánh
số bằng chuỗi viết cứng `0{i+1}`, nên từ mục thứ mười trở đi hiện thành **"010",
"011", "012"**. Bốn lĩnh vực thì không lộ; mười hai thì lộ ngay. Đã thay bằng
hàm đệm theo độ dài danh sách và thêm `tests/navigation.spec.ts` để không tái
diễn — bài kiểm thử này cũng đối chiếu danh mục với trang danh sách, vì hai nơi
lệch nhau sẽ khiến người dùng thấy hai danh sách mâu thuẫn.

**Mega menu chuyển sang ba cột** từ 1180px trở lên. Hai cột × 12 mục đổ dài quá
tầm mắt; ba cột cho bốn hàng cân đối.

**Cụm nút liên hệ chuyển sang góc trái dưới, dạng nút tròn.** Bản có nhãn chữ đã
được dựng và chụp ảnh đối chiếu: ở 1440px nút rộng ~118px trong khi lề nội dung
bắt đầu quanh 100px, tức là **che mất đầu dòng chữ**. Nút tròn 52px kết thúc ở
~78px nên không chạm vào cột nội dung. Góc phải để trống có chủ đích cho phần
chatbot sẽ tích hợp sau; hai biến `--dock-inline` và `--dock-bottom` cho phép
chỉnh vị trí mà không phải sửa cấu trúc.

Đã kiểm tra bằng ảnh chụp ở 390px, 1100px và 1440px: mega menu, trang chủ, chân
trang và trang chuyên môn.

Vòng kiểm tra cuối: TypeScript sạch, production build thành công, **110/110 kiểm
thử desktop/mobile đạt**.

## Đo và sửa chất lượng tìm kiếm — 10/09/2026

Sau khi mở rộng lên 12 lĩnh vực, hai rủi ro được đo lại bằng số chứ không phỏng
đoán: hiệu năng và chất lượng tìm kiếm.

**Hiệu năng: không hồi quy.** Nội dung tăng gấp ba nhưng LCP xấu nhất 516 ms,
CLS xấu nhất 0,0168 — đều trong ngưỡng tốt của Google (2500 ms và 0,1). Trang
chủ trên khung điện thoại 427 KB, tăng 25 KB so với vòng trước do danh mục
chuyên môn có 12 mục. Vẫn là số đo cục bộ, chỉ dùng phát hiện hồi quy.

**Tìm kiếm: 13/20 đúng, đã sửa lên 20/20.** Dò bằng 20 truy vấn viết theo cách
khách thật sự gõ, không theo tên chính thức của lĩnh vực. Kết quả ban đầu:

- `sa thải` → **không có kết quả nào**. Chữ này không xuất hiện một lần nào
  trong bài về Lao động & nhân sự, vốn viết "chấm dứt hợp đồng lao động".
- `đăng ký nhãn hiệu` → Sở hữu trí tuệ xếp **hạng 10**. Bỏ dấu xong "nhãn" và
  "nhân" đều thành "nhan", mà cách khớp cũ dò chuỗi con nên "nhan" ăn trọn điểm
  tiêu đề của "Lao động & nhân sự".
- `kiện ra tòa`, `bị khởi tố`, `thành lập công ty` đều trả sai lĩnh vực.

Hai việc đã làm:

1. **Sửa cách tính điểm** (`src/lib/search.ts`): khớp theo âm tiết trọn vẹn hoặc
   phần đầu âm tiết thay vì chuỗi con; tách trọng số theo mức cô đọng của trường
   (tiêu đề > tóm tắt và từ khóa > phạm vi/quy trình/hỏi đáp > phần diễn giải);
   và thưởng điểm cho cụm từ đứng liền nhau, vì "nhãn hiệu" liền nhau mang nghĩa
   khác hẳn hai âm tiết nằm rải rác. Riêng thay đổi này đưa `đăng ký nhãn hiệu`
   từ hạng 10 lên hạng 1 và `bào chữa` từ hạng 2 lên hạng 1, tổng 14/20.
2. **Thêm trường "Từ khóa khách hàng thường gõ"** vào CMS kèm migration, và nạp
   bộ từ khóa khởi đầu cho 12 lĩnh vực × 3 ngôn ngữ. Đây mới là thứ sửa được các
   truy vấn còn lại: không thuật toán nào tìm ra chữ không có trong nội dung.

Kết quả sau cả hai: **20/20 truy vấn đưa đúng lĩnh vực lên vị trí đầu.**

Một hướng đi đã thử và bỏ: bắt âm tiết dưới ba ký tự phải khớp trọn vẹn, để
tránh "so" trong "sổ đỏ" quét trúng "sở", "số", "soát". Cách này làm `li hon`
(gõ không dấu) mất sạch kết quả, mà gõ không dấu là cách dùng phổ biến — nên đã
hoàn tác và giải quyết bằng từ khóa thay vì siết cách khớp.

**Từ khóa không rò rỉ ra ngoài.** Đã kiểm chứng bằng phản hồi thật: không có
trong trang chi tiết, trang danh sách, trang chủ, thẻ meta, JSON-LD, sitemap hay
RSS. Nhồi từ khóa vào thẻ meta là cách làm bị Google phạt từ lâu; hệ thống cố ý
không làm vậy và có kiểm thử khóa điều đó lại.

Thêm `tests/search-quality.spec.ts`: 20 truy vấn trên cùng một bài, cộng một bài
kiểm tra rò rỉ. Cả hai tự bỏ qua khi cơ sở dữ liệu chưa nạp đủ lĩnh vực, để bộ
kiểm thử vẫn chạy được trên cơ sở dữ liệu trống của CI.

Vòng kiểm tra cuối: TypeScript sạch, cổng bản dịch qua, production build thành
công, **114/114 kiểm thử đạt**.

## Sửa lỗi đánh số ở trang chủ và ngõ cụt khi tìm không ra — 11/09/2026

**Lỗi đánh số còn sót ở trang chủ.** Vòng trước đã sửa danh mục chuyên môn
nhưng bỏ sót danh sách lĩnh vực trên trang chủ: cùng một cách viết cứng tiền tố
`0`, nên với 12 lĩnh vực nó hiện "010", "011", "012". Đã kiểm chứng bằng phản
hồi thật của website trước và sau khi sửa.

Nguyên nhân sót là hàm đếm số được viết riêng trong `shell.tsx`. Đã chuyển thành
`ordinal` dùng chung trong `src/lib/content.ts` để không còn hai bản sao lệch
nhau, và thêm kiểm thử cho cả hai nơi.

**Tìm không ra kết quả không còn là ngõ cụt.** Trước đây trang chỉ hiện một câu
"Thử từ khóa ngắn hơn" rồi hết — khách gõ sai từ là hết đường, trong khi lĩnh
vực họ cần vẫn đang có trên website. Nay bên dưới câu đó là danh sách toàn bộ
lĩnh vực đã xuất bản, bấm được thẳng sang trang chi tiết.

Đã rà lại trang 404: vốn đã có liên kết các mục chính và ô tìm kiếm, không cần
sửa.

Vòng kiểm tra cuối: TypeScript sạch, cổng bản dịch qua (234 chuỗi), production
build thành công, **118/118 kiểm thử đạt**.

## Rà soát có hệ thống: 9 lỗi, một trong đó làm hỏng hẳn tìm kiếm tiếng Trung — 11/09/2026

Ba lượt rà soát độc lập (đúng sai chức năng, bảo mật/lộ dữ liệu, SEO) trên toàn
bộ mã nguồn. Những phát hiện đã xác minh bằng phản hồi thật và đã sửa:

### Nghiêm trọng — tìm kiếm tiếng Trung trả về 0 kết quả với mọi từ khóa

`src/lib/search.ts` tách từ bằng `/[^a-z0-9]+/`. Mọi chữ Hán rơi vào lớp "không
phải a-z0-9" nên bị coi là dấu phân cách: truy vấn tách ra thành mảng rỗng và
hàm trả về 0 cho mọi bản ghi. Đo trực tiếp trước khi sửa:

| Truy vấn | Kết quả |
| --- | --- |
| `/zh/search?q=合同` | **0** |
| `/zh/search?q=投资与企业` (tiêu đề chính xác của một lĩnh vực đang hiển thị) | **0** |
| `/zh/services?q=合同` (lọc chuỗi con, không qua hàm tính điểm) | 3 |

Toàn bộ chức năng tìm kiếm của bản tiếng Trung — 12 lĩnh vực đã xuất bản — nằm
chết. Đây là hồi quy do chính vòng sửa tìm kiếm hôm 10/09 gây ra, và lọt qua vì
không bài kiểm thử nào chạm tới `/zh/search`.

Đã tách theo khoảng trắng, dấu câu và ký hiệu; riêng chữ Hán dò theo chuỗi con
vì tiếng Trung viết liền, "合同" là một phần nằm trong "施工合同" chứ không phải
một âm tiết đứng riêng.

### Các lỗi khác đã sửa

- **Tìm kiếm bỏ mất trang Về chúng tôi, Liên hệ và Trang chủ.** Bộ trang hướng
  dẫn được *gán đè* lên toàn bộ nhóm kết quả `pages` thay vì gộp vào, mà bộ đó
  chỉ có 5 khóa. Tìm đúng tiêu đề trang Liên hệ cũng không ra trang Liên hệ.
- **Khối gợi ý khi không có kết quả** tính theo tập chưa lọc nhưng hiển thị theo
  tập đã lọc, nên khi bộ lọc loại hết kết quả thì lại không có gợi ý — đúng
  trường hợp cần nó nhất.
- **Danh sách ngôn ngữ viết cứng** `["vi","en","zh"]` còn sót ở trang chi tiết —
  nơi duy nhất sinh hreflang cho toàn bộ 36 trang lĩnh vực.
- **`inLanguage` khai `zh`** trong dữ liệu có cấu trúc trong khi `html lang` và
  hreflang đều là `zh-Hans`; trang tự mâu thuẫn với chính nó.
- **Chuyển hướng `/` là 307 (tạm thời)** thay vì 308. Đây là địa chỉ nhận mọi
  liên kết từ bên ngoài; báo tạm thời khiến công cụ tìm kiếm không dồn tín hiệu
  về bản tiếng Việt.
- **Phạm vi hỗ trợ rỗng** vẫn dựng tiêu đề trên một danh sách trống, vì `scope`
  luôn là mảng nên luôn "đúng" trong điều kiện kiểm tra.

### Bảo mật

- **Một nguồn gửi có thể chiếm hết hạn mức biểu mẫu và chặn mọi khách thật.**
  Hai bộ đếm chạy song song nên bộ đếm chung vẫn tăng cả với yêu cầu đã bị hạn
  mức cá nhân chặn: 120 yêu cầu mỗi phút từ một máy là khóa kênh tiếp nhận của
  công ty. Đúng điều mà chú thích ngay bên trên nói là phải tránh. Nay kiểm tra
  hạn mức cá nhân trước và chỉ chạm bộ đếm chung khi người gửi còn trong hạn mức.
- **`PAYLOAD_SECRET` âm thầm rơi về một giá trị nằm công khai trong kho mã.**
  Biến môi trường mất hay gõ sai thì ứng dụng vẫn khởi động bình thường với khóa
  ai cũng biết — đủ để người ngoài tự ký một phiên quản trị và đọc toàn bộ yêu
  cầu tư vấn của khách. Nay dừng hẳn lúc khởi động ở môi trường production.
- **Căn cứ được phép công bố lộ qua REST API.** Quyền ở mức bộ sưu tập chỉ lọc
  *bản ghi*, không lọc *trường*, nên bản ghi kinh nghiệm đã xuất bản mang theo
  cả căn cứ nội bộ. Đã chặn ở mức trường; có kiểm thử tạo bản ghi thật, xác nhận
  khách ẩn danh không đọc được còn biên tập viên vẫn đọc được, rồi xóa.

### Nâng cấp Payload 3.88.0 → 3.89.0

Bản này vá GHSA-jg8r-5jh2-v2xj — advisory duy nhất đứng sau cả 7 cảnh báo
moderate. `npm audit` nay báo **0 vulnerabilities**. Không có nâng cấp major nào
kèm theo; ngoài Payload chỉ có vài bản vá nhỏ của types, nodemailer và zod.

Thêm `tests/multilingual-search.spec.ts`: tìm kiếm trên cả ba ngôn ngữ, trang
nền phải tìm được, và bài kiểm tra rò rỉ trường nội bộ.

Vòng kiểm tra cuối: TypeScript sạch, cổng bản dịch qua, build thành công,
**126/126 kiểm thử đạt**, npm audit 0 lỗ hổng.

## Đường triển khai cho hosting cPanel — 11/09/2026

Nhà cung cấp báo bộ mã "chưa đầy đủ cấu hình cần thiết để ứng dụng Node.js hoạt
động trên Hosting". Thiếu thật, và đây là phần thiếu:

**Thêm `server.js`.** Hosting cPanel chạy Node qua Passenger, tức nạp thẳng một
tệp JavaScript và tự quản lý vòng đời tiến trình — `next start` không cắm vào
được. `server.js` dựng máy chủ HTTP của Next bằng mã theo đúng cách Next tài
liệu hóa, tự nạp `.env` (Passenger không làm việc đó) và cảnh báo khi thiếu
`DATABASE_URL`. Đã chạy thử: trang chủ, trang danh sách, trang chi tiết,
`/admin/login` và `sitemap.xml` đều trả 200.

Trên VPS và trong Docker **không dùng tệp này** — ở đó `npm start` chạy thẳng
`next start`, nhẹ hơn và được hỗ trợ đầy đủ hơn.

**Thêm bước CI khởi động `server.js` và gọi thử ba đường dẫn.** Không ai chạy
tệp này hằng ngày, nên nếu không kiểm tự động thì nó hỏng lúc nào không biết và
chỉ lộ ra đúng lúc đang triển khai.

**Thêm `docs/DEPLOY-HOSTING-CPANEL.md`.** Bước 0 của tài liệu là ba câu hỏi phải
gửi nhà cung cấp trước khi làm bất cứ việc gì: Node.js có
từ bản 20 trở lên không, và tiến trình được cấp bao nhiêu RAM. Một câu trả lời
"không" là gói hosting đó không chạy được, và mọi bước phía sau đều vô ích —
nói trước còn hơn để mất mấy ngày cài rồi hỏng.

Tài liệu cũng ghi thẳng bốn giới hạn của hosting dùng chung, trong đó nặng nhất
là **không đặt được lịch chạy worker gửi email**: yêu cầu tư vấn của khách vẫn
được lưu đầy đủ nhưng không ai được báo, phải vào `/admin` xem thủ công. Riêng
điểm đó đã đủ là lý do để một công ty luật dùng VPS.

Vòng kiểm tra: TypeScript sạch, 126/126 kiểm thử đạt, `server.js` phục vụ đúng.

## Công cụ đóng gói tải lên hosting — 11/09/2026

Nhà cung cấp báo "bộ mã nguồn chưa đầy đủ thông tin/cấu hình cần thiết". Nguyên
nhân thường gặp khi tải lên bằng File Manager là rơi mất tệp bắt đầu bằng dấu
chấm hoặc sót thư mục con — thao tác tay không có gì kiểm lại.

Thêm `npm run bundle:hosting`: dựng gói từ đúng danh sách tệp Git đang theo dõi,
nên không phụ thuộc vào thao tác kéo thả. Công cụ tự đối chiếu danh sách tệp bắt
buộc và dừng với lỗi nếu thiếu, đồng thời loại `.env`, `.local/`, `media/` và
`node_modules/` — bí mật và dữ liệu không đi qua tệp nén.

Đã kiểm chứng gói sinh ra: 237 mục, có đủ `package.json`, `package-lock.json`,
`next.config.mjs`, `server.js`, `tsconfig.json`, `postcss.config.mjs`,
`src/payload.config.ts`, `importMap.js` của admin và `init-rate-limit.sql`;
không có tệp nào thuộc `node_modules`, `.env`, `.local` hay `.next`.

Cờ `--with-build` đính kèm thư mục `.next` dựng sẵn, dùng khi hosting không đủ
RAM chạy `npm run build`.

CI chạy công cụ này mỗi lần đẩy, nên việc xóa nhầm một tệp cấu hình lộ ra ngay
chứ không phải giữa lúc triển khai.

Vòng kiểm tra cuối: TypeScript sạch, cổng bản dịch qua (234 chuỗi), build thành
công, **126/126 kiểm thử đạt** — chạy trên chính tiến trình `server.js` mà
hosting sẽ dùng, không phải `next start`. npm audit 0 lỗ hổng.

## Script cài đặt một lệnh, và lỗi trang tiếng Trung không được tạo — 11/09/2026

Thêm `scripts/hosting-setup.mjs`: chạy cả chuỗi cài đặt bằng một lệnh, đúng thứ
tự bắt buộc. Chuỗi này có ràng buộc thứ tự mà gõ tay rất dễ sai — dựng bản build
trước khi tạo lược đồ thì hỏng, nạp nội dung trước khi có tài khoản quản trị
cũng hỏng — và lỗi chỉ lộ ra ở lệnh sau cùng.

Chạy thử từ đầu đến cuối trên **cơ sở dữ liệu trống** (đúng tình huống hosting)
và đã chạy đúng: kiểm tra môi trường → migrate → bảng hạn mức → build → tài
khoản quản trị → nạp nội dung nền.

Ba lỗi phát hiện nhờ chạy thử thật, đều đã sửa:

1. **Không gọi được `npm` trên Windows.** `npm` là `npm.cmd`, mà Node từ chối
   spawn tệp `.cmd` trực tiếp kể từ bản vá CVE-2024-27980. Hosting chạy Linux
   nên không gặp, nhưng người bàn giao thử trên máy Windows sẽ thấy một lỗi
   trông y hệt lỗi cấu hình hosting và chẩn đoán nhầm.
2. **`payload migrate` treo vô hạn.** Khi cơ sở dữ liệu từng bị đẩy lược đồ ở
   chế độ dev, lệnh này dừng lại hỏi một câu xác nhận có nguy cơ mất dữ liệu rồi
   **đứng chờ gõ phím**. Trên hosting không có bàn phím. Đã đặt hạn giờ 3 phút và
   thông báo rõ nguyên nhân. Cố ý **không** tự trả lời "có": câu hỏi đó cảnh báo
   mất dữ liệu, và đó là quyết định của người vận hành. Trên cơ sở dữ liệu trống
   câu hỏi này không xuất hiện — CI chứng minh điều đó mỗi lần chạy.
3. **`--skip-install`** để chạy lại sau khi hỏng ở bước sau mà không phải cài
   lại phụ thuộc — bước lâu nhất.

### Lỗi trang tiếng Trung không bao giờ được tạo

`scripts/prepare-pages.ts` viết cứng `["vi", "en"]` từ thời website mới có hai
ngôn ngữ, và không được cập nhật khi thêm tiếng Trung. Hậu quả trên một cài đặt
mới, đo trực tiếp trên cơ sở dữ liệu trống:

```
vi (5): about, contact, home, privacy, terms
en (5): about, contact, home, privacy, terms
zh (0):
```

Bản tiếng Trung không có bản ghi trang nào trong CMS: công ty không sửa được nội
dung tiếng Trung, và `release:check` báo thiếu `zh/privacy` với `zh/terms` mãi
mãi vì hai trang đó chưa từng tồn tại để mà xuất bản.

Lỗi này không lộ ra trên máy đang làm việc vì các trang tiếng Trung ở đó được
tạo thủ công trong một vòng trước. Chỉ chạy cài đặt trên cơ sở dữ liệu trống mới
thấy.

Đã sửa: script đọc danh sách ngôn ngữ từ `locales` và lấy dự thảo chính sách
tiếng Trung từ `zh-content.ts` — nội dung đó vốn đã có sẵn, chỉ chưa ai nạp vào
CMS. Kiểm chứng lại trên cơ sở dữ liệu trống: đủ 5 trang × 3 ngôn ngữ, trang
chính sách tiếng Trung có 8 khối nội dung.

Vòng kiểm tra cuối: TypeScript sạch, cổng bản dịch qua, build thành công,
**126/126 kiểm thử đạt** — chạy trên chính tiến trình `server.js` mà hosting sẽ
dùng.

## Chuyển từ PostgreSQL sang SQLite — 11/09/2026

Gói hosting của công ty không có PostgreSQL, chỉ có MySQL qua phpMyAdmin. Payload
CMS **không có adapter MySQL** — chỉ có PostgreSQL, MongoDB và SQLite. Nên lựa
chọn duy nhất chạy được trên đúng gói hosting đã mua là SQLite: cơ sở dữ liệu là
một tệp trong thư mục ứng dụng, không cần máy chủ nào.

Đã kiểm chứng trước khi làm: `libsql` có sẵn bản biên dịch cho `linux-x64`, nên
cài được trên hosting dùng chung mà không cần trình biên dịch.

### Bốn lỗi phát hiện khi chạy thật, đều đã sửa

1. **Biểu mẫu tư vấn hỏng hoàn toàn, trả 503 cho mọi yêu cầu.** Adapter SQLite
   chỉ bật giao dịch khi được khai `transactionOptions`; thiếu nó thì
   `beginTransaction` trả về null. Yêu cầu của khách và hàng đợi thông báo được
   lưu trong cùng một giao dịch để không lệch nhau, nên không có giao dịch là
   không lưu được gì.

2. **Bảng đếm hạn mức bị xóa mất.** PostgreSQL đặt bảng này trong schema riêng
   nên Payload không thấy. SQLite không có schema: cơ chế đồng bộ lược đồ của
   Payload coi đây là bảng lạ và **đòi xóa**, dừng chờ gõ phím — trên máy chủ
   không có bàn phím thì treo vĩnh viễn. Đã tắt hẳn cơ chế đồng bộ (dự án vốn
   dùng migration cho mọi thay đổi lược đồ) và cho bảng tự tạo lại khi truy vấn
   gặp lỗi thiếu bảng.

3. **Khóa của worker gửi email.** Dùng khóa advisory của PostgreSQL, thứ SQLite
   không có. Thay bằng một hàng trong bảng làm khóa; khóa cũ quá 15 phút được
   coi là của tiến trình đã chết và bị thu hồi, để một lần bị giết giữa chừng
   không chặn việc gửi thư vĩnh viễn.

4. **Kiểm tra sức khỏe** dùng `to_regclass` của PostgreSQL; đã chuyển sang đọc
   `sqlite_master`.

### Những chỗ khác đã chuyển

Cú pháp `$1` → `?`; `split_part(...)::bigint` → `instr`/`substr`/`CAST`;
`CREATE SCHEMA operations` → một bảng có tiền tố `operations_`; 5 migration viết
cho PostgreSQL thay bằng một migration SQLite tạo 113 bảng; CI bỏ hẳn dịch vụ
PostgreSQL; gỡ `pg`, `@payloadcms/db-postgres`, `embedded-postgres` và trình
chạy PostgreSQL nhúng dùng cho phát triển.

Cũng đã thêm ghi log nguyên nhân cho lỗi 503 của biểu mẫu tư vấn — trước đó nó
trả về một thông báo chung chung và không ghi gì, nên không chẩn đoán được.

### Điều phải biết về SQLite

Ghi đồng thời bị khóa lần lượt. Với website giới thiệu có biểu mẫu liên hệ thì
không thành vấn đề — lượng ghi rất thấp. Sao lưu đơn giản hơn hẳn: chép một tệp.

Vòng kiểm tra cuối trên SQLite: TypeScript sạch, cổng bản dịch qua, build thành
công, **128/128 kiểm thử đạt**, npm audit 0 lỗ hổng, kiểm tra sức khỏe trả
`ready`, và biểu mẫu tư vấn lưu được yêu cầu thật (mã YC-C3E79AE885C9).
