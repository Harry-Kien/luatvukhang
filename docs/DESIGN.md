# Nhận diện website Vũ Khang — vòng thiết kế 2

Tên công ty do người dùng cung cấp: **Công ty Luật TNHH Vũ Khang**. Đã lưu vào SiteSettings và dùng trong website. Không tự đặt tên pháp lý tiếng Anh.

## Thay đổi
- Wordmark VŨ KHANG và chữ ghép VK bằng typography, thay nhận diện “Công ty luật” chung.
- Header cố định gồm thanh tiện ích, logo lớn, điều hướng, menu chuyên môn mở rộng và nút đặt lịch.
- Menu hỗ trợ bàn phím, Escape, đóng khi chuyển trang và bấm ngoài; có bố cục riêng cho điện thoại.
- Trang chủ mở đầu bất đối xứng với ảnh kiến trúc thật và typography có chủ đích.
- Dải lối tắt theo nhu cầu; phần giới thiệu hai cột; chuyên môn kết hợp ảnh/danh sách; quy trình nền navy; khối đội ngũ/góc nhìn và footer phân cấp.
- Header, footer, đầu trang chi tiết, biểu mẫu và khoảng cách dùng chung hệ thống nhận diện.
- Noto Serif Variable 400/500; Be Vietnam Pro 400/500/600. Giữ đủ dấu tiếng Việt.
- Navy #101D35, navy đậm #091322, đỏ #C6283D, nền #F7F8FA. Sửa hai điểm tương phản được axe phát hiện.

## Tài sản ảnh
Ảnh minh họa kiến trúc, không phải ảnh văn phòng Vũ Khang.
- Simon Clotour: https://unsplash.com/photos/modern-glass-skyscraper-with-reflective-facade-tYOLBmbvM0M
- Tuan Nguyen: https://unsplash.com/photos/a-city-skyline-at-sunset-aVbSvuJTUxA
- Giấy phép kiểm tra: https://unsplash.com/license
- Bản WebP đã tối ưu trong public/images, phân phối bằng Next Image với kích thước responsive.
- Nguồn và giấy phép lưu trong tài liệu dự án; đã bỏ dòng ghi nguồn ở footer theo yêu cầu. Không dùng ảnh của hãng luật tham khảo.

## Kiểm chứng
- TypeScript và production build thành công.
- 16/16 kiểm thử desktop/mobile qua, bao gồm menu, chuyển ngôn ngữ, tìm kiếm, biểu mẫu và hồi quy CMS.
- Axe không phát hiện vi phạm trong các trang/trạng thái được thử: trang chủ, menu chuyên môn, biểu mẫu tư vấn.
- Đã xem ảnh đầu trang desktop/mobile, toàn trang desktop và menu mở rộng.
- Ảnh chụp tại artifacts/vukhang-*.jpg.
- Đây là nghiệm thu vòng thiết kế, không thay thế các điều kiện vận hành còn lại trong ACCEPTANCE.md.

