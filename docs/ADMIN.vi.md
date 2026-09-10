# Hướng dẫn quản trị

## Đăng nhập

Mở /admin. Tài khoản cục bộ được tạo với mật khẩu ngẫu nhiên trong .local/admin-access.txt. Đây không phải tài khoản production. Đổi mật khẩu, thiết lập email khôi phục và lớp MFA/SSO trước khi ra mắt.

## Các khu vực

- **Tổng quan công việc:** lối tắt và số yêu cầu mới cho quản trị/tiếp nhận.
- **Chỉnh sửa website:** trang nội dung, gồm home, about, contact, privacy, terms.
- **Dịch vụ, Đội ngũ, Kinh nghiệm, Bài viết:** nội dung có liên kết, không nhập lại hồ sơ ở nhiều chỗ.
- **Thư viện ảnh:** chỉ ảnh JPEG/PNG/WebP, tối đa 8 MB. Điền mô tả thay thế, nguồn và căn cứ quyền sử dụng.
- **Yêu cầu tư vấn:** xem nội dung, chuyển trạng thái, ghi chú nội bộ.
- **Thông báo cần gửi:** hàng đợi email; pending chưa gửi, sent đã được SMTP tiếp nhận, failed cần xử lý.
- **Cài đặt:** thông tin chính thức. Tên công ty được đưa vào header/footer; địa chỉ, số điện thoại và email hiển thị ở Liên hệ.
- **Ngôn ngữ:** hiện dùng trường Ngôn ngữ trên từng nội dung; chưa có màn hình tổng hợp bản dịch riêng.

## Nhập và chỉnh sửa

1. Chọn loại nội dung, tạo mới hoặc mở nội dung có sẵn.
2. Điền tiêu đề, đường dẫn chữ thường không dấu, ngôn ngữ, mã liên kết bản dịch và tóm tắt.
3. Viết nội dung hoặc thêm khối văn bản, ảnh và chú thích, điểm nhấn.
4. Dùng điều khiển khối của Payload để sắp xếp/nhân bản; bỏ chọn Hiển thị để ẩn khối.
5. Tự lưu nháp được cấu hình 1,5 giây. Quan sát trạng thái lưu trước khi rời trang.
6. Trạng thái nội dung minh họa ngăn xuất bản ở máy chủ.
7. Dùng live preview để xem nội dung được lưu ở khung mobile/desktop. Preview yêu cầu tài khoản có quyền biên tập. Không gửi link bản nháp cho khách hàng.

Khối tự lưu, trạng thái lưu, cảnh báo rời trang, khóa khi nhiều người sửa và toàn bộ thao tác khối cần thêm một vòng nghiệm thu thao tác với nhân viên thật. Không xem cấu hình CMS là bằng chứng đã nghiệm thu mọi thao tác.

## Duyệt và xuất bản

- Biên tập viên lưu bản nháp, đặt Chờ duyệt.
- Người duyệt chuyên môn kiểm tra và đặt Đã duyệt, lưu nháp.
- Người xuất bản xuất bản nội dung đã được duyệt.
- Người xuất bản thay đổi nội dung sẽ làm mất duyệt; nội dung phải quay lại bước duyệt.
- Quản trị hệ thống có quyền quản trị, vẫn không được xuất bản nội dung gắn cờ minh họa.
- Bản nháp không hiển thị ở trang công khai hoặc kết quả tìm kiếm.

## Việt–Anh

Mỗi ngôn ngữ là một bản ghi riêng để giữ trạng thái xuất bản độc lập. Hai bản dùng chung mã liên kết bản dịch. Chuyển ngôn ngữ tìm bản đã xuất bản tương ứng; thiếu bản dịch sẽ đưa về danh sách và thông báo. Biên tập bản Anh trực tiếp theo ngữ cảnh pháp lý, không dùng bản dịch tự động chưa duyệt.

## Lịch sử

Mở lịch sử Versions trong nội dung, so sánh và khôi phục phiên bản theo quyền. Cần kiểm tra lại sau khôi phục; không mặc định bản cũ còn đúng về pháp luật hoặc được phép công bố.

## Tiếp nhận yêu cầu

- received: đã nhận yêu cầu, chưa xác nhận lịch.
- contacting: đang liên hệ.
- confirmed: chỉ sau khi đã thống nhất với khách hàng; phải nhập thời gian xác nhận.
- closed: đã đóng.
  Không chép nội dung tư vấn sang công cụ phân tích hoặc nhật ký công khai.

Email thông báo chỉ chứa mã yêu cầu và liên kết admin, không chứa mô tả khách hàng. SMTP chưa cấu hình thì thông báo ở hàng đợi, không được xem là đã gửi.

## Thay ảnh banner nhân sự
1. Vào **Chỉnh sửa website**, mở trang có đường dẫn `home` và ngôn ngữ cần chỉnh.
2. Mở **Banner — ảnh nhân sự / thương hiệu**. Chọn hoặc tải ảnh máy tính; có thể dùng ảnh điện thoại riêng.
3. Nhập mô tả ảnh, nguồn và căn cứ quyền sử dụng. Chỉ dùng ảnh nhân sự đã được phép công bố.
4. Điểm lấy nét X/Y từ 0 đến 100; 50 là giữa. Chỉnh riêng desktop/mobile. Dùng “Hiện toàn bộ ảnh” nếu cần giữ nguyên nhóm người.
5. Độ phủ tối 0–60%; chú thích không bắt buộc. Ảnh công ty tự ẩn nhãn kiến trúc minh họa.
6. Lưu nháp, xem trước 390px và 1440px; duyệt chuyên môn rồi xuất bản. Lặp lại cho bản tiếng Anh khi cần.

## Trang mới và nội dung chi tiết
- Ngành nghề và tuyển dụng có danh sách, tìm kiếm, phân trang và trang chi tiết.
- Tuyển dụng: nhập email nhận hồ sơ, nơi làm việc và hạn ứng tuyển. Quá hạn sẽ ẩn liên kết ứng tuyển.
- Dịch vụ/ngành nghề: đối tượng, quy trình, FAQ cần duyệt; khối nội dung có mục lục tự động khi có nhiều tiêu đề.
- Luật sư: ảnh, chức danh, thông tin nghề nghiệp, ngôn ngữ, liên kết chuyên môn.
- Quan hệ nội dung chỉ hiển thị khi bản cùng ngôn ngữ đã xuất bản.
- Điều khoản và quyền riêng tư VI/EN đã có bản nháp. Rà soát đầy đủ thông tin vận hành, thay các đoạn chờ xác nhận và ghi ngày hiệu lực trước khi duyệt. Bản phát triển hiển thị bản đề xuất có nhãn; production không tự công bố bản đề xuất.

## Tiếng Trung giản thể
- Đường dẫn `/zh`, nút 中文 bên cạnh VI/EN; khai báo trang `zh-Hans`, Open Graph `zh_CN`.
- Nội dung CMS chọn ngôn ngữ 简体中文 và cùng translationKey với VI/EN. Mỗi bản duyệt/xuất bản độc lập; thiếu bản dịch chuyển về danh sách kèm thông báo.
- Đã tạo nháp home/about/contact/privacy/terms tiếng Trung, không tự công bố.
- Giao diện và hướng dẫn đã dịch; không tự dịch bài CMS thành bài đã được duyệt. Công ty cần kiểm chứng thuật ngữ pháp lý, tên riêng và nội dung trước khi xuất bản.
- Font CJK dùng font có sẵn trên hệ điều hành (PingFang SC / Microsoft YaHei / Songti / SimSun). Giữ font gốc cho nhận diện tên pháp lý; cần nghiệm thu thêm trên thiết bị khách hàng thực tế.
- `src/lib/zh.ts` là từ điển giao diện. Các trang hướng dẫn và dự thảo nằm tại `src/lib/zh-content.ts`.

## Bảo trì ngôn ngữ
Cấu hình mã, nhãn và thẻ ngôn ngữ nằm tại src/lib/locales.ts. Nút chuyển có tên ngôn ngữ đầy đủ trong title và lang/hreflang phù hợp. Chỉ nối bản dịch theo translationKey có giá trị; không chuyển tới bản nháp hay đường dẫn ngoài phạm vi công khai.
Chạy npm run check:translations khi thay giao diện. Lệnh kiểm tra các lời gọi t() có chuỗi tiếng Anh tĩnh; không thay thế rà soát nội dung CMS, chuỗi động và chất lượng ngôn ngữ.
Trước mỗi đợt phát hành: chạy typecheck, check:translations, test, build và release:check trong môi trường cấu hình phù hợp. Sau đó nghiệm thu gửi yêu cầu, email, bản dịch và sao lưu trên hosting thực tế.
