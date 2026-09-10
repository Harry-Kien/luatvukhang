# SEO, dữ liệu có cấu trúc và bảo mật header

Tài liệu mô tả phần kỹ thuật đã triển khai, cách kiểm chứng và những việc còn
lại trước khi ra mắt. Cập nhật 09/09/2026.

## Nguyên tắc

Toàn bộ dữ liệu có cấu trúc lấy từ CMS. Trường chưa nhập bị loại bỏ khỏi
JSON-LD thay vì điền giá trị mẫu (`prune` trong `src/lib/seo.ts`). Nội dung minh
họa ở chế độ demo và bản xem trước không phát dữ liệu có cấu trúc, để không mô
tả nội dung chưa công bố như thông tin chính thức của công ty.

## Công tắc chặn chỉ mục

`src/lib/content.ts` tính `launched = SITE_LAUNCH_APPROVED === "true" && !demo`.

| Trạng thái | robots.txt | Thẻ meta robots | sitemap.xml |
| --- | --- | --- | --- |
| Chưa duyệt ra mắt | `Disallow: /` | `noindex, nofollow` | rỗng |
| Đã duyệt ra mắt | `Allow: /` + chặn `/admin`, `/api`, `?preview=`, `?translation=` | `index, follow` | đầy đủ hai ngôn ngữ |

Trang tìm kiếm (`/*/search`) và trang mẫu chữ (`/*/typography`) luôn `noindex,
follow`: cho phép thu thập liên kết nhưng không đưa vào chỉ mục, tránh phình chỉ
mục bằng các trang kết quả.

## Thẻ trên từng trang

`pageMetadata` trong `src/lib/seo.ts` là nguồn duy nhất sinh ra:

- `<title>` và `<meta name="description">`
- `<link rel="canonical">` — luôn không có dấu `/` ở cuối
- `<link rel="alternate" hreflang>` cho `vi`, `en` và `x-default`
- Open Graph và Twitter Card (`summary_large_image`)
- `robots` và `googlebot` kèm `max-image-preview:large`

**hreflang chỉ trỏ tới bản dịch có thật.** Trang chi tiết tra bản dịch theo
`translationKey` và chỉ khai khi bản đó đã xuất bản; `x-default` trỏ về bản
tiếng Việt khi có.

## Dữ liệu có cấu trúc

| Schema | Nơi phát | Nguồn dữ liệu |
| --- | --- | --- |
| `LegalService` + `Organization` | mọi trang công khai | Cài đặt trong CMS |
| `WebSite` + `SearchAction` | mọi trang công khai | Cài đặt + route tìm kiếm |
| `BreadcrumbList` | mọi trang có `PageHeading` | đường dẫn trang |
| `Article` | `/[locale]/articles/[slug]` | bài viết, tác giả, nguồn tham khảo |
| `Person` | `/[locale]/lawyers/[slug]` | hồ sơ luật sư |
| `Service` + `OfferCatalog` | `services`, `industries` | phạm vi hỗ trợ |
| `FAQPage` | trang hướng dẫn và bản ghi có FAQ | trường FAQ |
| `JobPosting` | `/[locale]/careers/[slug]` | tin tuyển dụng |

Chuỗi JSON-LD thay ký tự `<` bằng mã unicode tương đương để nội dung biên tập viên nhập không
thể đóng thẻ script (`src/components/json-ld.tsx`).

Kiểm chứng: dán URL vào [Rich Results Test](https://search.google.com/test/rich-results)
hoặc [Schema Markup Validator](https://validator.schema.org/).

## Bộ nhận diện

| Tệp | Vai trò |
| --- | --- |
| `src/app/icon.svg` | favicon |
| `src/app/apple-icon.png` | biểu tượng màn hình chính iOS (180×180) |
| `src/app/opengraph-image.png` | ảnh chia sẻ 1200×630 |
| `src/app/opengraph-image.alt.txt` | mô tả ảnh chia sẻ |
| `src/app/manifest.ts` | web manifest |

Sinh lại sau khi đổi màu thương hiệu: `node scripts/generate-brand-assets.mjs`.

## RSS

`/vi/feed.xml` và `/en/feed.xml` phát 50 bài mới nhất, chỉ mở sau khi duyệt ra
mắt (trước đó trả về 404). Trang danh sách Góc nhìn khai báo feed bằng thẻ
`<link rel="alternate" type="application/rss+xml">`.

## Đo lường

Hai biến môi trường, để trống thì không nạp mã nào:

| Biến | Tác dụng |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS_ID` | Bật Google Analytics 4. Chỉ chạy khi đã duyệt ra mắt, nên bản phát triển không làm sai lệch số liệu. Bật biến này thì CSP tự mở đúng miền của Google, xem `next.config.mjs`. |
| `SITE_VERIFICATION_GOOGLE` | Thẻ xác minh quyền sở hữu cho Search Console. |
| `SITE_VERIFICATION_BING` | Thẻ xác minh cho Bing Webmaster Tools. |

## Hiệu năng

Việc đã làm:

- **Sửa lỗi font nặng 182 KB.** Bộ CSS của fontsource khai báo subset
  `latin-ext` sau `vietnamese`, mà dải `U+0100-02BA` và `U+1EF2-1EFF` của
  latin-ext chồng lên đúng các ký tự `Đ đ Ĩ ĩ Ũ ũ Ơ ơ Ư ư ỹ`. Theo thứ tự
  cascade, trình duyệt chọn latin-ext và tải 182 KB chỉ để hiển thị vài chữ cái
  tiếng Việt xuất hiện ở khắp nơi. `brand.css` khai báo lại face tiếng Việt ở
  cuối để bản 15 KB thắng. Đã kiểm chứng: latin-ext không còn được tải và chữ
  tiếng Việt vẫn đúng font serif.
- **Ảnh hero có biến thể responsive.** Ảnh gốc 1800×2700 (366 KB) trước đây tải
  nguyên bản xuống cả điện thoại. Nay có bản 800px (106 KB) và 1200px (189 KB);
  sinh lại bằng `node scripts/optimize-images.mjs`.
- Ảnh từ CMS dùng `CmsImage`, dựng `srcset` từ các kích thước Payload tạo sẵn
  (card 800px, hero 1600px) kèm `sizes` theo bố cục thật.
- Gỡ `NextIntlClientProvider` khỏi layout: không component nào dùng hook của
  next-intl, nên nó chỉ nạp JS thừa xuống trình duyệt.
- `getRecords` và `getSiteSettings` bọc trong `cache()` của React: layout,
  `generateMetadata`, JSON-LD và trang dùng chung một lần đọc cơ sở dữ liệu.

Kết quả đo cục bộ trên bản production (`node scripts/measure-performance.mjs`),
trang chủ trên khung điện thoại 390px:

| Chỉ số | Trước | Sau |
| --- | --- | --- |
| Tổng dung lượng tải | 866 KB | 402 KB |
| LCP xấu nhất | 560 ms | 512 ms |
| CLS xấu nhất | 0,018 | 0,018 |

Ngưỡng tốt của Google: LCP dưới 2500 ms, CLS dưới 0,1.

**Đây không phải số liệu thực địa.** Máy đo mạnh, mạng nội bộ, không có người
dùng thật. Con số chỉ dùng để phát hiện hồi quy. Số liệu ra quyết định phải lấy
từ báo cáo trải nghiệm người dùng thật sau khi website có tên miền và lưu lượng.

## Phụ thuộc

`npm audit` còn 7 cảnh báo mức trung bình, tất cả thuộc **một advisory duy
nhất**: GHSA-jg8r-5jh2-v2xj (Payload cho phép người dùng đã đăng nhập mở khóa
tài khoản của người khác). Chưa có bản phát hành nào vá lỗi này — chỉ có bản
internal. Ứng dụng đã vô hiệu lỗi bằng `unlock: isAdmin` trên collection
`users` trong `payload.config.ts`; cần kiểm tra lại khi Payload ra bản vá.

Bốn cảnh báo còn lại trước đây đến từ `esbuild@0.18.20`, kéo vào qua hai gói đã
ngừng phát triển `@esbuild-kit/*`. Bản vá npm đề xuất là hạ cấp Payload xuống
0.1.9, tức phá dự án. Cách xử lý đúng nằm ở `overrides` trong `package.json`:
`"esbuild": ">=0.25.12"` — buộc mọi bản sao dùng phiên bản đã vá mà không hạ cấp
các bản 0.28 sẵn có. Đã kiểm chứng drizzle-kit và toàn bộ kiểm thử vẫn chạy.

## Header bảo mật

Cấu hình trong `next.config.mjs`.

Áp cho mọi đường dẫn: `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`, và `Strict-Transport-Security`
(chỉ ở bản production).

Chỉ áp cho phần website công khai — không áp cho `/admin` và `/api`:
`Content-Security-Policy` và `Cross-Origin-Opener-Policy`.

Hai điểm cần biết:

1. CSP dùng `script-src 'unsafe-inline'` vì Next.js nhúng dữ liệu hydrate bằng
   thẻ script nội tuyến. Cách chặt hơn là nonce theo từng yêu cầu, nhưng nonce
   buộc mọi trang render động, mất lợi ích trang tĩnh. Các chỉ thị còn lại vẫn
   chặn khung nhúng lạ, biểu mẫu gửi ra ngoài, plugin và việc đổi thẻ base.
2. HSTS chưa khai `preload`. Chỉ thêm sau khi mọi tên miền con đã chạy HTTPS ổn
   định và đã chủ động nộp tên miền vào danh sách preload.

## Chống lạm dụng biểu mẫu

`/api/consultation` giới hạn theo từng người gửi: 5 yêu cầu/phút cho mỗi địa chỉ
(băm HMAC từ `X-Forwarded-For`) và 120 yêu cầu/phút cho toàn hệ thống. Bộ đếm cũ
được dọn theo xác suất nên không cần cron.

Khi không nhận diện được người gửi (proxy chưa ghi `X-Forwarded-For` hoặc
`X-Real-IP`), hệ thống chỉ áp hạn mức chung 120/phút thay vì siết 5/phút lên
toàn bộ lưu lượng gộp một chỗ — nếu không, cả website sẽ chặn nhầm khách thật.
Vẫn nên cấu hình proxy ghi đúng header này trước khi ra mắt để hạn mức cá nhân
có hiệu lực.

## Kiểm thử tự động

| Tệp | Phủ nội dung gì |
| --- | --- |
| `tests/seo.spec.ts` | canonical, hreflang ba ngôn ngữ và x-default, mô tả, đúng một h1, Open Graph, JSON-LD, robots/sitemap/manifest/feed, liên kết RSS. Có một bài tạo bản ghi đã xuất bản thật rồi xóa để chạy thực tế `Article`, `Person`, `Service`. |
| `tests/accessibility.spec.ts` | Những phần axe không quét được: liên kết bỏ qua, hành trình gửi yêu cầu chỉ bằng bàn phím, phóng to 200%, thứ tự tiêu đề, cấu trúc landmark, nhãn cho mọi ô nhập. |

Ngưỡng độ dài mô tả khác nhau theo hệ chữ viết: 50 ký tự cho chữ Latin, 15 cho
chữ Hán, vì tiếng Trung cô đọng hơn nhiều.

## Rà soát bảo mật

Đã kiểm chứng bằng yêu cầu thật trên máy:

| Điểm kiểm tra | Kết quả |
| --- | --- |
| Liệt kê tài khoản qua `/api/users` khi chưa đăng nhập | Trả về rỗng, không rò rỉ |
| `/api/consultation-requests`, `/api/notification-outbox` ẩn danh | Từ chối truy cập |
| Bản nháp qua REST `?draft=true` ẩn danh | Trả về rỗng |
| Chuyển hướng mở ở `/api/switch-language` | Không có: đường dẫn luôn bắt đầu bằng `/vi`, `/en` hoặc `/zh` và được ghép vào gốc website |
| Chuyển hướng lưu trong CMS | Chỉ nhận đích khớp `/^\/(vi|en)\//` |
| SQL | Chỉ dùng tham số hóa `$1`, không nối chuỗi |
| XSS | Một chỗ `dangerouslySetInnerHTML` duy nhất là JSON-LD, đã thoát ký tự `<` |
| Bí mật | `.gitignore` đã loại `.env`, `.local/`, `media/` |
| Tải lên | Chỉ nhận jpeg/png/webp, giới hạn 8 MB, không nhận SVG |

Hai điểm cần biết:

1. Collection `media` đặt `read: () => true`, nên ảnh đính kèm nội dung **chưa
   xuất bản** vẫn tải được nếu đoán đúng URL. Chưa khắc phục vì Payload không
   gắn trạng thái xuất bản vào tệp tải lên. Cách giảm thiểu: chỉ tải ảnh lên khi
   nội dung sắp công bố.
2. Trang xem trước trả `Cache-Control: no-cache, must-revalidate` do Next tự
   đặt. Đã thử ghi đè thành `private, no-store` qua `next.config.mjs` nhưng Next
   ghi đè lại cho trang render động, nên đã gỡ quy tắc đó thay vì để lại cấu
   hình không có tác dụng. `no-cache` vẫn buộc mọi bộ nhớ đệm dùng chung phải
   hỏi lại máy chủ trước khi phục vụ.

Chưa chạy `/security-review` tự động vì công cụ này cần kho git, mà dự án chưa
khởi tạo git dù đã có sẵn `.gitignore`.

## Nguyên tắc đa ngôn ngữ

Danh sách ngôn ngữ và mã BCP-47 khai một chỗ duy nhất: `locales` và
`languageInfo` trong `src/lib/locales.ts`. Mọi nơi sinh hreflang, tiền tố đường
dẫn, `og:locale`, `availableLanguage`, sitemap và RSS đều đọc từ đó.

Đây là kết quả của một đợt rà soát: trước đây `vi|en|zh` được viết cứng ở bốn
nơi, nên thêm ngôn ngữ thứ tư sẽ âm thầm sinh hreflang sai mà không có lỗi biên
dịch hay kiểm thử nào bắt được. Khi thêm ngôn ngữ, chỉ cần bổ sung vào
`locales.ts` và thêm mã ngôn ngữ vào `LOCALES`/`HREFLANG` trong
`tests/seo.spec.ts` để bộ kiểm thử phủ theo.

## Bản in

Nội dung pháp lý thường được in ra để đọc kỹ, chuyền tay nội bộ hoặc kẹp vào hồ
sơ. `brand.css` có khối `@media print`: bỏ điều hướng và nút bấm, đổi nền navy
của tiêu đề trang thành nền trắng cho đỡ tốn mực, in kèm địa chỉ sau mỗi liên
kết ngoài để tờ giấy còn truy được nguồn, tránh ngắt trang giữa tiêu đề và nội
dung, và mở sẵn phần hỏi đáp đang thu gọn để câu trả lời không bị mất.

## Kiểm tra trước khi ra mắt

`npm run release:check` chặn phát hành khi thiếu cấu hình hoặc nội dung, và cảnh
báo riêng (không chặn) các vấn đề SEO: mô tả quá 160 ký tự, bài viết chưa có tác
giả, hồ sơ luật sư chưa có thông tin nghề nghiệp đã xác minh, nội dung chưa có
bản dịch đã xuất bản.

Nếu bộ kiểm thử bị ngắt giữa chừng, bản ghi QA có thể còn lại trong cơ sở dữ
liệu và làm hỏng những lần chạy sau. Dọn bằng:

```
node --env-file=.env --import tsx scripts/clean-qa-records.ts
```

## Còn lại trước khi ra mắt

- Đặt `NEXT_PUBLIC_SITE_URL` thành tên miền HTTPS thật. Hiện là `localhost`, nên
  mọi canonical, hreflang, ảnh chia sẻ và sitemap đều đang trỏ về máy cục bộ.
- Bật `SITE_LAUNCH_APPROVED=true` và `NEXT_PUBLIC_DEMO_MODE=false`.
- Gắn Google Search Console và công cụ phân tích qua ba biến môi trường ở mục
  Đo lường; nộp sitemap.
- Nội dung thật: hồ sơ luật sư kèm thông tin nghề nghiệp đã xác minh, thông tin
  pháp nhân trong Cài đặt, tác giả và ngày tháng cho từng bài viết.
- Rà soát nghĩa vụ thông báo website với cơ quan quản lý.
- Đo Core Web Vitals thực địa sau khi có nội dung và hạ tầng thật.
- Cấu hình proxy ghi `X-Forwarded-For` để hạn mức gửi biểu mẫu theo từng người
  có hiệu lực.
- Theo dõi bản vá Payload cho advisory GHSA-jg8r-5jh2-v2xj.

## Kênh liên hệ trực tiếp — 10/09/2026

Số điện thoại trong Cài đặt là nguồn duy nhất cho ba đầu ra: nút gọi (`tel:` ở
dạng E.164), nút Zalo (`https://zalo.me/` + số nội địa) và trường `telephone`
trong `Organization`. Chuẩn hóa nằm ở `contactChannels()` trong
`src/lib/contact.ts`, nhận cả bốn cách nhập thường gặp (`0832270898`,
`083 227 0898`, `+84 832 270 898`, `84832270898`) và trả về `null` khi số không
đủ chữ số — giao diện khi đó ẩn hẳn nút thay vì hiện liên kết gọi hỏng.

Không tách trường riêng cho Zalo: ở Việt Nam Zalo gắn với chính số thuê bao, nên
hai trường chỉ tạo ra khả năng lệch nhau mà không ai phát hiện.

Biểu tượng Zalo là SVG nội tuyến. `img-src` trong CSP chỉ cho phép `'self'`, nên
logo tải từ máy chủ Zalo sẽ bị chặn mà không báo lỗi. Đây là ký hiệu dẫn hướng
kèm chữ "Zalo", không phải bản sao bộ nhận diện thương hiệu.

Liên kết Zalo mở tab mới kèm `rel="noopener noreferrer"`. Cụm nút nổi đặt
`aria-label` trực tiếp trên thẻ vì chữ hiển thị bị ẩn ở khung hẹp, và bị loại
khỏi bản in.

## Nội dung minh họa và dữ liệu có cấu trúc

`getSampleRecords()` trong `src/lib/cms.ts` chỉ trả về bản ghi khi đang ở chế độ
demo, và mệnh đề `isSample` là bắt buộc trong truy vấn: kể cả khi bỏ qua kiểm
tra quyền để đọc được bản nháp, truy vấn vẫn không thể chạm tới bản nháp thường
của biên tập viên.

Trang chi tiết dựng từ bản ghi minh họa **không phát schema.org** — `Person`,
`Article`, `Service` và `JobPosting` chỉ mô tả nội dung công ty đã công bố. Quy
tắc này được kiểm chứng bằng `tests/contact-and-samples.spec.ts`.
