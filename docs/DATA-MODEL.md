# Mô hình dữ liệu

| Dữ liệu              | Chức năng                                                         |
| -------------------- | ----------------------------------------------------------------- |
| Users                | Tài khoản, vai trò, phiên đăng nhập, giới hạn đăng nhập sai       |
| Pages                | Trang home/about/contact/privacy/terms, nội dung và khối          |
| Services             | Dịch vụ, phạm vi, liên kết luật sư/kinh nghiệm/bài                |
| Industries           | Phân loại ngành; chưa có route riêng                              |
| Lawyers              | Hồ sơ, ảnh, chức danh, thông tin nghề nghiệp, ngôn ngữ, văn phòng |
| Experience           | Kinh nghiệm, căn cứ được công bố, chuyên môn                      |
| Articles             | Tác giả, danh mục, nguồn, nội dung                                |
| Categories           | Danh mục bài                                                      |
| Offices              | Văn phòng                                                         |
| Recognitions         | Ghi nhận đã xác minh                                              |
| Media                | Tệp ảnh, alt, tác giả, quyền sử dụng                              |
| ConsultationRequests | Yêu cầu, mã tham chiếu, chống trùng, đồng ý, trạng thái, lịch     |
| NotificationOutbox   | Thông báo cùng giao dịch với yêu cầu                              |
| SiteSettings         | Thông tin công ty và cờ chính sách                                |
| Redirects            | Chuyển hướng nội bộ, tự tạo khi đổi slug và xuất bản              |

Tất cả nội dung dùng language + translationKey. Mỗi cặp slug/language và translationKey/language là duy nhất. Phiên bản nháp được lưu riêng; truy vấn công khai luôn lọc published và không lấy isSample.

Vai trò trên máy chủ/API:

- admin: quản trị nội dung, tài khoản, tiếp nhận.
- editor: chỉnh nháp, không xuất bản hoặc duyệt, không đọc tư vấn.
- reviewer: chỉnh và duyệt nội dung, không xuất bản.
- publisher: xuất bản nội dung đã duyệt, không sửa rồi giữ duyệt.
- reception: đọc/cập nhật yêu cầu, không sửa nội dung.

Ảnh thư viện là tài sản công khai. Không tải hồ sơ vụ việc, tài liệu mật hoặc chứng từ khách hàng vào Media.

operations.consultation_rate_limits là bảng ngoài schema Payload: giới hạn toàn hệ thống 30 lần gửi hợp lệ/phút. Đây là lớp dự phòng; production cần giới hạn tại reverse proxy/WAF theo nguồn đáng tin cậy.
