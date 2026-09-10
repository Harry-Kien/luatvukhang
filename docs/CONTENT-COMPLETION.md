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
