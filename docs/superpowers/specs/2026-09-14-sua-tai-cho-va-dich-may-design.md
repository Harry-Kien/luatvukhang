# Thiết kế: sửa tại chỗ trên website, nội dung cố định vào CMS, dịch máy có duyệt

Ngày: 14/09/2026. Trạng thái: đã được chủ website duyệt phương án, chờ kế hoạch thực hiện.

## Mục tiêu

Chủ website tự sửa được mọi nội dung mà không cần lập trình viên, với trải nghiệm
gần WordPress: đăng nhập rồi sửa ngay trên trang đang xem, chỉ cần viết tiếng
Việt và hệ thống dịch sẵn bản Anh, Trung để duyệt. Giữ nguyên nền tảng hiện có
(Next.js 16, Payload 3.89, SQLite), ba ngôn ngữ, quy trình duyệt, bộ kiểm thử
Playwright, SEO và các lớp bảo mật đã nghiệm thu.

Ngoài phạm vi: trình dựng trang kéo thả, chuyển sang WordPress, đổi thiết kế
giao diện công khai.

## Hiện trạng liên quan

- Trang quản trị Payload đã có: logo công ty, bảng tổng quan, phân quyền
  (admin, editor, reviewer, publisher, reception), bản nháp tự lưu mỗi 1,5 giây,
  xem trước song song (`livePreview`) và trang công khai tự tải lại khi nhận
  thông điệp từ khung xem trước (`src/components/preview-refresh.tsx`).
- Mỗi ngôn ngữ của một nội dung là một bản ghi riêng, nối nhau bằng
  `translationKey`. Cấu trúc này giữ nguyên.
- Chữ trang chủ, menu, footer, các dòng kêu gọi nằm cứng trong mã
  (`src/app/(public)/[locale]/page.tsx`, `src/lib/content.ts`,
  `src/components/shell.tsx`). Cài đặt website (`site-settings`) chỉ có sáu
  ô thông tin công ty và một cờ duyệt chính sách.
- Trang công khai được dựng theo từng yêu cầu (dynamic), nên kiểm tra phiên
  đăng nhập ở máy chủ không tốn thêm hạ tầng.

## Phần 1. Thanh quản trị và chế độ sửa trên website

**Nhận biết người biên tập.** Hàm `getEditor()` trong `src/lib/editor.ts`, bọc
bằng `cache()` của React, gọi `cms.auth({ headers })` một lần mỗi yêu cầu và trả
về `{ id, email, role }` khi vai trò thuộc nhóm biên tập; ngược lại trả `null`.
Không đọc cookie thủ công, không lộ thông tin gì ra trang của khách.

**Thanh quản trị** (`src/components/admin-bar.tsx`, server component, gắn trong
layout công khai ngay trên `Header`). Chỉ hiện khi `getEditor()` khác `null`.
Gồm: tên đăng nhập và vai trò; nút "Sửa trang này" mở đúng bản ghi đang xem
(hoặc mục "Giao diện website" với trang chủ/đầu trang/chân trang); "Bảng điều
khiển"; công tắc "Chế độ sửa"; nhãn "Đang xem bản nháp" khi có `?preview=true`
kèm nút chuyển sang bản đã xuất bản; "Đăng xuất" gọi `/api/users/logout`.
Cao 40px, nền navy, chữ trắng, không che nội dung (đẩy trang xuống bằng
padding trên `body` chỉ khi có thanh).

**Chế độ sửa.** Trạng thái bật/tắt lưu trong cookie `vk-edit` (giá trị `1`,
30 ngày, `SameSite=Lax`), đọc ở máy chủ để không nháy giao diện. Thành phần
`<Editable target=... label=...>` (`src/components/editable.tsx`, server
component):

- Khách hoặc chế độ sửa tắt: trả về đúng `children`, không thêm phần tử nào.
  Mã HTML gửi cho khách không đổi một byte so với hiện nay.
- Chế độ sửa bật: bọc `children` trong `<div class="editable">` có viền mờ khi
  rê chuột và một liên kết bút chì "Sửa <nhãn>" ở góc, trỏ tới trang biên tập
  của mục đích. `target` là một trong: `{ collection, id }`,
  `{ global: "site-layout", tab }`, `{ global: "site-settings" }`.

**Đích liên kết.** Bản ghi: `/admin/collections/<slug>/<id>/preview` (màn hình
biên tập có khung xem trước của Payload). Global: `/admin/globals/<slug>`;
với "Giao diện website" thêm `#tab-<tên tab>` để mở đúng tab.

**Vùng được bọc Editable ở đợt đầu.** Trang chủ: mỗi mục lớn (hero, khám phá,
giới thiệu, chuyên môn, cách bắt đầu). Trang nội dung và trang chi tiết: tiêu
đề và thân bài của bản ghi đang xem. Header: menu và nút đặt lịch. Footer:
toàn bộ. Danh sách (dịch vụ, đội ngũ, bài viết): từng thẻ trỏ tới bản ghi
của thẻ đó.

**Bảo mật.** Thanh và các nút chỉ dựa vào phiên Payload thật, không có tham số
URL nào bật được chúng. Cookie `vk-edit` không có tác dụng khi chưa đăng nhập.
CSP hiện có không cần nới.

## Phần 2. Nội dung cố định vào CMS: global "Giao diện website"

**Global mới `site-layout`** ("Giao diện website"), nhóm "Nội dung website",
quyền sửa: nhóm biên tập; xuất bản: như các global khác (không có bản nháp,
lưu là có hiệu lực, vì đây là khung của mọi trang). Bốn tab:

1. **Đầu trang**: `menu` (mảng: `label`, `href` chọn từ danh sách mục cố định
   about/services/lawyers/experience/articles/industries/careers/guide/contact
   hoặc đường dẫn tự nhập, `visible`), `ctaLabel`, `ctaHref`, `tagline`
   ("Tư vấn pháp lý · Việt Nam").
2. **Trang chủ**: `heroKicker`, `heroTitle` (richText giới hạn: đoạn và xuống
   dòng), `heroSummary`, `heroPrimary` và `heroSecondary` (`label`, `href`),
   `discoverTitle`, `discoverCards` (3 thẻ: `title`, `text`, `href`),
   `aboutKicker`, `aboutTitle`, `aboutText`, `aboutLink`, `expertiseTitle`,
   `expertiseText`, `startKicker`, `startTitle`, `startText`, `steps`
   (3 bước: `title`, `text`), `startCta`.
3. **Chân trang**: `motto`, `invitation`, `invitationCta`, `exploreTitle`,
   `connectTitle`, `extraLinks` (mảng `label`, `href`), `copyright`.
4. **Liên hệ và mạng xã hội**: `zalo`, `facebook`, `linkedin`, `youtube`,
   `hours` (giờ làm việc), `mapUrl`, `mapEmbed` (chỉ nhận địa chỉ Google Maps).

Mọi ô chữ được đánh dấu `localized: true` (xem Phần 3). Ảnh hero vẫn lấy từ
trang `home` trong "Chỉnh sửa website" như hiện nay, vì đã có quy trình nháp
và điểm lấy nét theo màn hình.

**Giá trị mặc định.** Chữ hiện có trong mã trở thành `defaultValue` của từng
ô cho cả ba ngôn ngữ, và migration nạp chúng vào cơ sở dữ liệu ngay khi tạo
bảng. Website trông y hệt trước và sau khi triển khai.

**Đọc ở trang công khai.** `getSiteLayout(locale)` trong `src/lib/cms.ts`, bọc
`cache()`, đọc global với `locale` tương ứng và `fallbackLocale: "vi"`. Ô nào
trống ở ngôn ngữ đang xem thì dùng bản tiếng Việt. `navigation` trong
`src/lib/content.ts` chuyển thành hàm nhận dữ liệu từ global; các nơi đang
dùng mảng cứng chuyển theo. Sitemap và kiểm thử điều hướng đọc menu từ cùng
một nguồn.

**Kiểm tra dữ liệu.** `href` nội bộ phải bắt đầu bằng `/`; liên kết ngoài phải
là `https://`. Tối đa 8 mục menu hiện. `mapEmbed` chỉ chấp nhận
`https://www.google.com/maps/embed?...`.

## Phần 3. Ba ngôn ngữ trong một màn hình và dịch máy có duyệt

### 3a. Bật localization của Payload cho global

Thêm vào cấu hình: `localization: { locales: [vi, en, zh], defaultLocale: "vi",
fallback: true }`. Chỉ các ô có `localized: true` mới tách theo ngôn ngữ; toàn
bộ collection hiện có không đánh dấu nên cấu trúc và dữ liệu của chúng không
đổi. Trong "Giao diện website" và "Cài đặt", các ô chữ có bộ chọn ngôn ngữ
VI / EN / ZH của Payload ở góc trên; ô nào chưa có bản dịch hiện nhãn "chưa
dịch, đang dùng tiếng Việt".

`site-settings` đánh dấu `localized` cho `address` (địa chỉ có thể viết khác
theo ngôn ngữ). `companyName`, `englishName`, `phone`, `email`,
`registration` giữ nguyên không localized.

### 3b. Bảng "Bản dịch" trên từng bản ghi nội dung

Trên mọi collection nội dung (pages, services, industries, lawyers, experience,
articles, careers) thêm ô giao diện `translations` (`type: "ui"`, vị trí cột
phải) do `src/components/admin/translation-panel.tsx` hiển thị:

- Ba dòng VI, EN, ZH. Dòng của bản ghi đang mở được đánh dấu. Dòng khác hiện
  trạng thái: "chưa có", "nháp", "đã xuất bản", kèm nhãn "bản dịch máy, chưa
  duyệt" nếu có; nút "Mở" tới bản ghi đó.
- Nút **"Dịch bằng AI sang EN"** và **"... sang ZH"**, chỉ hiện khi bản ghi đang
  mở là tiếng Việt và đã được lưu ít nhất một lần. Bấm: gọi endpoint dịch,
  hiện tiến trình, xong thì làm mới bảng và hiện thông báo "Đã tạo bản nháp
  EN, mở để rà soát".
- Nếu bản đích đã có và đã được người sửa tay (không còn cờ máy dịch), nút
  hỏi xác nhận trước khi ghi đè, và ghi đè tạo phiên bản mới nên vẫn khôi
  phục được từ lịch sử phiên bản của Payload.

### 3c. Endpoint dịch

`POST /api/translate` (endpoint gốc của Payload, `src/cms/translate.ts`):

- Chỉ nhóm biên tập. Thân yêu cầu: `{ kind: "document", collection, id, targets:
  ["en" | "zh"], force?: boolean }` hoặc `{ kind: "global", slug: "site-layout" |
  "site-settings", targets }`.
- Nguồn luôn là tiếng Việt. Với bản ghi: thu thập các ô chữ cần dịch (`title`,
  `summary`, `seo.title`, `seo.description`, `keywords`, `body` richText, các
  khối `blocks` có chữ, và ô riêng của từng collection như `position`,
  `faq`, `scope`). Với richText Lexical: duyệt cây, gom mọi `text` node theo thứ
  tự thành mảng chuỗi, dịch mảng, ghi ngược đúng vị trí; định dạng, liên kết
  và ảnh giữ nguyên. Với global: gom các ô `localized` của tab được yêu cầu.
- Gọi Claude qua `@anthropic-ai/sdk`, model `claude-opus-5`, streaming và lấy
  thông điệp cuối, `output_config.format` là JSON theo lược đồ
  `{ items: string[] }` cùng độ dài với đầu vào. System prompt nêu: đây là
  website công ty luật Việt Nam; giữ nguyên tên riêng, tên công ty
  "Công ty Luật TNHH Vũ Khang Solutions & Partners", số hiệu văn bản pháp luật,
  số điện thoại, địa chỉ email, đường dẫn; dùng bảng thuật ngữ trong
  `src/cms/glossary.ts` (từ khóa pháp lý Việt → Anh → Trung giản thể); giọng
  trang trọng; không thêm nội dung. Ghi `cache_control` cho system prompt.
- Không giữ mã khóa trong mã nguồn. Đọc `ANTHROPIC_API_KEY` từ môi trường.
  Thiếu khóa: trả 503 với thông báo tiếng Việt "Chưa cấu hình dịch máy"; nút
  trong admin hiện thông báo đó. Khi `TRANSLATION_PROVIDER=mock` (chỉ dùng cho
  kiểm thử): trả chuỗi nguồn kèm hậu tố `[en]`/`[zh]`, không gọi mạng.
- Kết quả với bản ghi: tìm bản đích theo `translationKey` + `language`; chưa có
  thì tạo bản nháp mới (`draft: true`, `slug` giữ như bản Việt trừ khi trùng thì
  thêm hậu tố ngôn ngữ); có rồi thì cập nhật dưới dạng nháp. Đặt
  `machineTranslated: true`, `reviewState: "working"`, giữ `isSample` của bản
  gốc, không bao giờ đặt `_status: "published"`.
- Giới hạn: mỗi lần dịch tối đa 60.000 ký tự nguồn; tối đa 20 lần dịch mỗi
  người dùng mỗi giờ (dùng bảng hạn mức có sẵn). Ghi nhật ký số ký tự và số
  token vào `console` để theo dõi chi phí.

### 3d. Cờ máy dịch và cổng xuất bản

Trên các collection nội dung thêm `machineTranslated` (checkbox, nhãn "Bản dịch
máy, chưa duyệt", chỉ đọc trong admin, hiện ở cột phải). Hook `publicationGuard`
hiện có mở rộng: nếu `machineTranslated` còn bật mà chuyển sang `published`
thì từ chối với thông báo "Bản dịch máy phải được rà soát trước khi xuất bản.
Bấm 'Đã rà soát bản dịch' trong cột phải." Nút **"Đã rà soát bản dịch"** trong
bảng Bản dịch tắt cờ và lưu, ai trong nhóm biên tập cũng bấm được; ai bấm và
lúc nào được ghi vào `reviewedBy`, `reviewedAt` (chỉ đọc).

Kiểm tra phát hành (`scripts/release-check.ts`) liệt kê mọi bản ghi còn cờ
máy dịch như cảnh báo.

## Phần 4. Xem trước tức thì

Cơ chế hiện có (tự lưu nháp rồi khung xem trước tải lại) giữ nguyên nhưng rút
`autosave.interval` từ 1500 xuống 700 ms và bảo đảm `PreviewRefresh` có mặt ở
mọi trang công khai đọc bản nháp, kể cả trang chủ khi xem trước "Giao diện
website". Với global không có bản nháp, khung xem trước tải lại sau khi bấm
Lưu; vì vậy "Giao diện website" có `livePreview` trỏ tới trang chủ để người
sửa thấy ngay sau khi lưu. Đo trên máy cục bộ: từ khi ngừng gõ tới khi khung
đổi dưới 1,5 giây ở cả hai cỡ màn hình.

## Phần 5. Trang quản trị gọn và dễ hơn

- Ngôn ngữ giao diện admin mặc định tiếng Việt cho tài khoản mới
  (`users.language` mặc định `vi`); tài khoản đã chọn ngôn ngữ khác giữ nguyên.
- Bảng điều khiển: thêm hàng lối tắt "Viết bài mới", "Sửa trang chủ", "Thêm
  luật sư", "Sửa giao diện website", "Yêu cầu tư vấn mới (n)", "Mở website".
- Ở mọi collection nội dung: `translationKey`, `slug`, `keywords`, `seo` gấp
  vào nhóm "Nâng cao" (collapsible, mặc định đóng), có mô tả ngắn từng ô.
  `translationKey` tự sinh từ slug khi tạo mới nếu để trống.
- Nút "Xem trên website" ở cột phải mỗi bản ghi (mở trang công khai, kèm
  `?preview=true` khi là nháp).
- Thứ tự nhóm trong menu trái: Nội dung website, Tiếp nhận, Quản trị.

## Phần 6. Kiểm thử, triển khai, thứ tự làm

**Kiểm thử Playwright mới** (thêm vào bộ hiện có, chạy trên cả desktop và
mobile):

- `admin-bar.spec.ts`: khách không thấy thanh và HTML không có lớp `editable`;
  người biên tập thấy thanh, bật chế độ sửa thì mỗi vùng có liên kết đúng đích;
  tắt chế độ sửa thì mất; đăng xuất từ thanh hoạt động.
- `site-layout.spec.ts`: sửa menu và khẩu hiệu trong global qua API rồi thấy
  đổi ở header/footer ba ngôn ngữ; ô trống ở EN dùng bản VI; liên kết không hợp
  lệ bị từ chối.
- `translate.spec.ts` (chạy với `TRANSLATION_PROVIDER=mock`): dịch bản ghi
  tạo nháp EN/ZH đúng `translationKey`, richText giữ cấu trúc, cờ máy dịch bật,
  xuất bản bị chặn, bấm "Đã rà soát" thì xuất bản được; thiếu khóa trả 503;
  khách gọi endpoint bị 403.
- `admin-polish.spec.ts`: bảng điều khiển có đủ lối tắt; nhóm Nâng cao đóng
  mặc định; nút "Xem trên website" mở đúng trang.
- Cập nhật `navigation.spec.ts`, `seo.spec.ts` đọc menu từ global.

**Migration.** Một migration cho global `site-layout` (kèm bảng `_locales`),
ô mới ở `site-settings`, ô `machineTranslated`, `reviewedBy`, `reviewedAt`
và `users.language`. Migration nạp giá trị mặc định ba ngôn ngữ cho
`site-layout`. Chạy được nhiều lần, không ghi đè dữ liệu đã sửa.

**Phụ thuộc mới.** `@anthropic-ai/sdk` (dependencies). Kiểm tra giấy phép
và ghi vào `docs/DEPENDENCIES.md`.

**Môi trường.** `.env.example` và `.env.production.example` thêm
`ANTHROPIC_API_KEY=` (để trống) và ghi chú `TRANSLATION_PROVIDER=mock` chỉ cho
kiểm thử. `releaseEnvironmentIssues` không coi thiếu khóa là lỗi chặn, chỉ
cảnh báo "dịch máy chưa bật".

**Tài liệu.** `docs/ADMIN.vi.md` thêm ba mục: sửa tại chỗ, giao diện website,
dịch máy và duyệt. `docs/DEPLOY-HOSTING-CPANEL.md` thêm dòng khai
`ANTHROPIC_API_KEY`.

**Thứ tự làm, mỗi đợt kết thúc bằng typecheck, build, toàn bộ kiểm thử, commit:**

1. Đợt 1: `getEditor`, thanh quản trị, chế độ sửa, `Editable` trên các trang,
   rút thời gian tự lưu.
2. Đợt 2: localization, global `site-layout`, giá trị mặc định, đổi trang chủ,
   header, footer sang đọc từ global; ô mới ở `site-settings`.
3. Đợt 3: cờ máy dịch, cổng xuất bản, endpoint dịch, bảng Bản dịch, bộ thuật
   ngữ, nút dịch cho global.
4. Đợt 4: dọn trang quản trị, lối tắt, nhóm Nâng cao, nút "Xem trên website",
   tài liệu, kiểm tra phát hành.

Sau mỗi đợt: chạy workflow "Gói bản dựng cho hosting", cập nhật hosting theo
quy trình trong `docs/DEPLOY-HOSTING-CPANEL.md` (tắt ứng dụng trong lúc cập
nhật vì hạn mức tiến trình của gói hosting).
