# Thông tin cần công ty cung cấp và xác nhận

Đã nhận tên chính thức: Công ty Luật TNHH Vũ Khang. Website đã cập nhật tên này.

Đã nhận số điện thoại: **0832270898**. Số này nằm trong Cài đặt của CMS và là
nguồn duy nhất sinh ra nút gọi (`tel:+84832270898`), nút Zalo
(`https://zalo.me/0832270898`) và trường `telephone` trong dữ liệu có cấu trúc
`Organization`. Đổi số trong Cài đặt là cả ba nơi đổi theo; không sửa trong mã.

```
node --env-file=.env --import tsx scripts/set-contact.ts --phone "0832270898"
```

## Quyết định trước khi công bố

- Tên pháp lý, tên thương hiệu, tên tiếng Anh được sử dụng; thông tin đăng ký hành nghề.
- Logo vector, hướng dẫn thương hiệu nếu có; quyền sử dụng logo.
- Địa chỉ văn phòng, bản đồ, giờ làm việc, điện thoại, email tiếp nhận.
- Khách hàng mục tiêu và danh sách chuyên môn công ty thực sự cung cấp.
- Hồ sơ luật sư: tên, chức danh, văn phòng, thông tin nghề nghiệp đã xác minh, ngôn ngữ, ảnh và quyền sử dụng.
- Kinh nghiệm được phép công bố; văn bản đồng ý khi nhắc tên khách hàng; phạm vi phải ẩn danh.
- Bài chuyên môn, tác giả, nguồn, ngày cập nhật và người chịu trách nhiệm duyệt.
- Bản Việt–Anh đã được biên tập theo ngữ cảnh.
- Chính sách quyền riêng tư và điều khoản đã được rà soát: đơn vị kiểm soát dữ liệu, mục đích/căn cứ, lưu giữ, quyền của chủ thể, đầu mối liên hệ, nhà cung cấp, chuyển dữ liệu nếu có.
- Người tiếp nhận, thời gian phản hồi thực tế, lịch làm việc, quy trình xác nhận lịch, phân công và phí tư vấn.
- Tên miền, đơn vị hosting Node.js, PostgreSQL production, nơi lưu ảnh, SMTP và email nhận thông báo.
- Danh sách tài khoản / vai trò, phương án MFA hoặc SSO, người sở hữu sao lưu và khôi phục.

## Nội dung dự thảo đã soạn sẵn — 10/09/2026

Đã nạp vào CMS ở trạng thái **nháp**, ba ngôn ngữ, chờ luật sư của công ty rà
soát và xuất bản:

| Nội dung | Số bản ghi | Script |
| --- | --- | --- |
| **Mười hai** lĩnh vực chuyên môn: tóm tắt, đối tượng phù hợp, phạm vi hỗ trợ, quy trình, câu hỏi thường gặp, mô tả SEO | 36 | `scripts/prepare-practice-areas.ts` |
| Trang Về chúng tôi, Liên hệ, Trang chủ | 9 | `scripts/prepare-page-content.ts` |
| Dự thảo chính sách quyền riêng tư và điều khoản | đã có từ trước | `scripts/prepare-pages.ts` |

Nội dung này **chỉ mô tả cách làm việc, quy trình và giới hạn dịch vụ**. Không
nêu số năm kinh nghiệm, quy mô đội ngũ, giải thưởng, tên khách hàng hay kết quả
vụ việc, vì đó là những khẳng định chỉ công ty mới xác nhận được. Phần câu hỏi
thường gặp cố ý giữ ở mức quy trình, không tư vấn pháp lý cụ thể.

Chạy lại các script này không tạo bản trùng và không ghi đè nội dung công ty đã
biên tập.

**Trang Quyền riêng tư và Điều khoản không xuất bản cùng đợt này.** Chúng chỉ
được xuất bản khi Cài đặt đã bật "Chính sách quyền riêng tư đã được rà soát".
Khi chưa xuất bản, website hiển thị bản dự thảo kèm nhãn "Dự thảo — chưa có hiệu
lực áp dụng"; xuất bản sớm sẽ gỡ mất nhãn đó và trình bày một chính sách chưa
qua rà soát pháp lý như thể đã có hiệu lực. Công cụ xuất bản tự giữ lại hai
trang này cho tới khi cờ được bật.

Sau khi rà soát, xuất bản bằng:

```
node --env-file=.env --import tsx scripts/publish-drafts.ts            # liệt kê
node --env-file=.env --import tsx scripts/publish-drafts.ts --confirm  # xuất bản
```

## Hồ sơ đội ngũ minh họa — 10/09/2026

Trang Đội ngũ đã có 6 hồ sơ **minh họa** (18 bản ghi, ba ngôn ngữ) để công ty
xem trước bố cục, thử bộ lọc chuyên môn và sửa trực tiếp trong CMS thay vì dựng
từ đầu. Nạp bằng `scripts/prepare-people.ts`.

Ba lớp bảo vệ, không phụ thuộc vào việc ai đó nhớ ra:

| Lớp | Tác dụng |
| --- | --- |
| Cờ `isSample` | `publicationGuard` từ chối xuất bản, kể cả tài khoản quản trị. Có kiểm thử tự động chứng minh. |
| Chỉ hiện ở chế độ demo | Đặt `NEXT_PUBLIC_DEMO_MODE=false` lúc ra mắt là hồ sơ minh họa biến mất khỏi website. |
| Nhãn trên giao diện | Trang danh sách và trang chi tiết đều ghi rõ "chưa phải nhân sự của công ty". |

Hồ sơ minh họa **không phát dữ liệu có cấu trúc `Person`** và `release:check`
vẫn coi trang Đội ngũ là chưa có nội dung thật, đồng thời liệt kê tên từng bản
ghi cần thay.

Trường "Thông tin nghề nghiệp" cố ý để lại câu nhắc việc thay vì số thẻ luật sư
giả. Một hồ sơ hành nghề sai sự thật trên website công ty luật là rủi ro nghề
nghiệp, không phải nội dung mẫu.

Cách dùng làm hồ sơ thật: mở /admin → Đội ngũ → nhập thông tin đã xác minh và
ảnh chân dung → **bỏ đánh dấu "Nội dung minh họa"** → duyệt chuyên môn → xuất bản.

## Vẫn phải do công ty cung cấp, không thể soạn thay

- **Hồ sơ luật sư**: họ tên, chức danh, số thẻ luật sư, đoàn luật sư, thông tin
  nghề nghiệp đã xác minh, ngôn ngữ làm việc, ảnh chân dung và quyền sử dụng ảnh.
- **Thông tin pháp nhân**: địa chỉ văn phòng, điện thoại, email, mã số thuế,
  thông tin đăng ký hành nghề — nhập trong Cài đặt của CMS.
- **Kinh nghiệm được phép công bố**: kèm căn cứ cho phép công bố; văn bản đồng ý
  nếu nhắc tên khách hàng.
- **Bài chuyên môn**: nội dung, tác giả chịu trách nhiệm và nguồn dẫn chiếu.

Bốn nhóm này là khẳng định về sự thật và về năng lực nghề nghiệp. Soạn thay sẽ
tạo ra hồ sơ giả trên website của một công ty luật.

## Đang dùng trong bản phát triển

- Nhận diện chữ VŨ KHANG được thiết kế theo tên người dùng cung cấp.
- 4 lĩnh vực minh họa, có nhãn phát triển; chưa khẳng định phạm vi hành nghề.
- Không có chân dung giả, số liệu, lời chứng thực, giải thưởng hoặc logo khách hàng.
- Đã dùng ảnh kiến trúc minh họa có nguồn và giấy phép Unsplash; chưa có ảnh văn phòng/luật sư chính thức.
- Không triển khai hoặc quảng cáo cổng khách hàng và AI.
