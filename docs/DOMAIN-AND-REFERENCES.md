# Tham khảo và cấu hình luatvukhang.com
Tên miền do chủ dự án cung cấp: https://luatvukhang.com . Chưa xác minh quyền quản trị DNS/hosting; chưa triển khai công khai trong phiên này. Cấu hình local tiếp tục dùng localhost để không làm hỏng biểu mẫu và preview.

Tham khảo mô hình, không sao chép thông tin doanh nghiệp:
- https://ykvn-law.com/contact/ — đầu mối liên hệ rõ ràng, biểu mẫu có lựa chọn đồng ý.
- https://www.lntpartners.com/firm-news/important-notice-thong-bao-quan-trong — công bố và xác minh kênh liên hệ.
- https://www.lntpartners.com/about-us — phân chia thông tin công ty và lĩnh vực hoạt động.

Đã viết riêng trang Hướng dẫn khách hàng VI/EN: chuẩn bị thông tin, gửi yêu cầu, mã tham chiếu, xác nhận phạm vi/phí và câu hỏi thường gặp dựa trên chức năng thực tế. Không có thời gian phản hồi, phí, thành tích, nhân sự hoặc địa chỉ mượn từ hãng khác.

Triển khai: dùng .env.production.example làm mẫu cấu hình trên hosting; điền PostgreSQL, secret và SMTP qua kho bí mật của nhà cung cấp. Không gửi mật khẩu vào tài liệu nội dung. Build với tên miền production, chạy migration, kiểm tra release, trỏ DNS tới hạ tầng thực tế, cấp HTTPS và kiểm thử gửi/lưu/thông báo. SITE_LAUNCH_APPROVED chỉ bật sau khi các điều kiện thực tế đã đạt.

Cần chủ dự án cung cấp quyền triển khai qua kết nối hosting/DNS phù hợp và thông tin công ty đã xác minh. Chưa có bằng chứng hộp thư nào tại luatvukhang.com tồn tại; không tự tạo địa chỉ email trên giao diện.
