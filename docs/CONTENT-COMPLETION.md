# Hoàn thiện nội dung trang — 10/09/2026

## Đã bổ sung

- 16 khối nội dung hướng dẫn trên Đội ngũ, Kinh nghiệm, Ngành nghề, Góc nhìn và Tuyển dụng, đầy đủ tiếng Việt/Anh/Trung.
- Nội dung mới nằm ở `src/lib/page-resources.ts`; trình bày bằng `src/components/page-resources.tsx`. Nguồn này là bản mặc định. Chạy `npm run prepare:resources` để tạo 15 bản nháp trong CMS (5 trang × 3 ngôn ngữ); trang có cùng slug sẽ thay thế nội dung mặc định sau khi được duyệt và xuất bản. Xem trước bản nháp yêu cầu đăng nhập có quyền.
- Thông tin liên hệ lấy từ CMS được hiển thị cả khi trang có nội dung biên tập; nút gửi yêu cầu luôn có mặt.
- Hiển thị tóm tắt CMS ở phần đầu trang Về chúng tôi/Liên hệ/chính sách khi có dữ liệu.
- Trạng thái tuyển dụng cụ thể; không tạo vị trí tuyển dụng, hồ sơ luật sư hay vụ việc không có căn cứ.

## Thông tin cần chủ website điền

| Trường | Nội dung xác nhận |
| --- | --- |
| Địa chỉ văn phòng | |
| Hotline | |
| Email tiếp nhận | |
| Giờ làm việc | |
| Thông tin đăng ký hoạt động | |
| Tên luật sư / chức danh | |
| Đoàn luật sư / thông tin nghề nghiệp | |
| Chuyên môn và ngôn ngữ làm việc | |
| Ảnh chân dung được phép sử dụng | |
| Kinh nghiệm được phép công bố | |
| Người duyệt bài chuyên môn | |

Các nội dung hướng dẫn không phải thành tích, lời chứng thực, hồ sơ luật sư hoặc tư vấn pháp lý cụ thể. Chế độ phát triển và điều kiện duyệt ra mắt được giữ nguyên.

## Kiểm chứng
Build production thành công; kiểm tra bản dịch đạt. 42 lượt trang (7 trang × 3 ngôn ngữ × 2 kích thước): HTTP 200, một h1, không tràn ngang, không lỗi axe A/AA/2.1 AA trong phạm vi quét. Chưa phải chứng nhận tiếp cận toàn website.

## Lấp các ô còn trống trên toàn hệ thống — 16/09/2026

Rà từng bản ghi, từng trường, từng ngôn ngữ. Bốn nhóm được bổ sung:

| Nội dung | Số ô | Script |
| --- | --- | --- |
| Ngành nghề: đối tượng phù hợp, 3 bước quy trình, 3 câu hỏi thường gặp | 54 | `scripts/prepare-industry-details.ts` |
| Tiêu đề hiển thị trên kết quả tìm kiếm | 75 | `scripts/prepare-seo-titles.ts` |
| Danh mục bài viết và gắn danh mục cho 3 bài | 9 + 12 | `scripts/prepare-categories.ts` |
| Liên kết bài viết ↔ lĩnh vực | 9 | `scripts/prepare-cross-links.ts` |

Trước đó 6 trang Ngành nghề chỉ có tóm tắt và hai khối ngắn, trong khi trang
Chuyên môn có đủ đối tượng, phạm vi, quy trình và câu hỏi thường gặp. Khách so
sánh hai trang cạnh nhau thấy một bên mỏng hẳn, và trang thiếu câu hỏi thường
gặp cũng không phát dữ liệu có cấu trúc `FAQPage`. Nay cả ba ngôn ngữ của 6
trang Ngành nghề đều phát `FAQPage`.

Ô "Hiển thị trên công cụ tìm kiếm" của trang Về chúng tôi và Liên hệ trước đây
**không nối với gì cả**: trang mục dựng thẻ tiêu đề từ hằng số trong mã và không
đọc bản ghi trong CMS. Biên tập viên điền vào đó rồi tưởng đã xong. Đã sửa ở
`src/app/(public)/[locale]/[section]/page.tsx`, có kiểm thử trong `tests/seo.spec.ts`.

Danh mục bài viết trước đây trống, nên bộ lọc theo chủ đề ở trang Góc nhìn không
lọc được gì. Nay có 3 danh mục ba ngôn ngữ và đã gắn cho cả 3 bài.

### Vẫn không thể soạn thay

Kinh nghiệm, Tuyển dụng, ảnh chân dung, số thẻ luật sư, đoàn luật sư, lĩnh vực
phụ trách của từng luật sư, tác giả bài viết, địa chỉ văn phòng và thông tin
đăng ký hoạt động — tất cả đều là khẳng định về sự thật hoặc về năng lực nghề
nghiệp. Xem `docs/BUSINESS-INPUTS.md`.
