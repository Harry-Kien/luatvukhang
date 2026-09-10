# Báo cáo nghiệm thu — 08/09/2026

**Chưa đủ điều kiện ra mắt.** Đây là bản phát triển có website công khai, CMS thực và PostgreSQL thực; không phải sản phẩm đã hoàn thành toàn bộ đặc tả.

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
