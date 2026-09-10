# Thông tin cần công ty cung cấp và xác nhận

Đã nhận tên chính thức: Công ty Luật TNHH Vũ Khang. Website đã cập nhật tên này.

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
| Bốn lĩnh vực chuyên môn: tóm tắt, đối tượng phù hợp, phạm vi hỗ trợ, quy trình, câu hỏi thường gặp, mô tả SEO | 12 | `scripts/prepare-practice-areas.ts` |
| Trang Về chúng tôi, Liên hệ, Trang chủ | 9 | `scripts/prepare-page-content.ts` |
| Dự thảo chính sách quyền riêng tư và điều khoản | đã có từ trước | `scripts/prepare-pages.ts` |

Nội dung này **chỉ mô tả cách làm việc, quy trình và giới hạn dịch vụ**. Không
nêu số năm kinh nghiệm, quy mô đội ngũ, giải thưởng, tên khách hàng hay kết quả
vụ việc, vì đó là những khẳng định chỉ công ty mới xác nhận được. Phần câu hỏi
thường gặp cố ý giữ ở mức quy trình, không tư vấn pháp lý cụ thể.

Chạy lại các script này không tạo bản trùng và không ghi đè nội dung công ty đã
biên tập.

Sau khi rà soát, xuất bản bằng:

```
node --env-file=.env --import tsx scripts/publish-drafts.ts            # liệt kê
node --env-file=.env --import tsx scripts/publish-drafts.ts --confirm  # xuất bản
```

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
