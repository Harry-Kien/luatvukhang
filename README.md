# Website công ty luật — bản phát triển

[![CI](https://github.com/Harry-Kien/luatvukhang/actions/workflows/ci.yml/badge.svg)](https://github.com/Harry-Kien/luatvukhang/actions/workflows/ci.yml)

Website Next.js / Payload / SQLite, giao diện Việt–Anh navy–đỏ.

**Trạng thái:** bản triển khai phát triển đã chạy và kiểm thử cục bộ; chưa nghiệm thu ra mắt. Không công bố hồ sơ, giải thưởng, khách hàng hay số liệu giả.

## Mở trên máy hiện tại

- Website: http://localhost:3000/vi
- Typography: http://localhost:3000/vi/typography
- CMS: http://localhost:3000/admin
- Tài khoản phát triển: xem `.local/admin-access.txt`. Không đưa tệp này vào Git hoặc gửi kèm bản bàn giao công khai.

## Chạy lại

Node.js 24 đã được dùng để kiểm thử. Cài phụ thuộc bằng `npm ci`.

1. Sao chép `.env.example` thành `.env`, tạo PAYLOAD_SECRET ngẫu nhiên ít nhất 32 ký tự.
2. Cơ sở dữ liệu là SQLite — một tệp ở `.local/law.db`, không cần cài hay chạy máy chủ nào. Tạo lược đồ bằng `npm run payload -- migrate`.
3. `node --env-file=.env --import tsx scripts/bootstrap.ts` tạo tài khoản quản trị cục bộ khi chưa có người dùng. Không ghi đè người dùng hiện có.
4. `npm run dev -- --hostname 127.0.0.1`.
5. `npm run typecheck`, `npm test`, `npm run build`.

Mỗi lần đẩy lên `main` và mỗi pull request đều chạy lại đúng chuỗi này trên CI,
từ một cơ sở dữ liệu PostgreSQL trống: migration, kiểm tra kiểu, dựng bản
production, nạp trang nền rồi chạy toàn bộ kiểm thử Playwright trên máy chủ thật.
Cấu hình ở `.github/workflows/ci.yml`.

Nếu dùng Docker: khai báo POSTGRES_PASSWORD, dùng cùng mật khẩu trong DATABASE_URL, rồi chạy `docker compose up -d`. Docker Desktop trên máy này không hoàn tất khởi động, nên bộ kiểm thử đã sử dụng PostgreSQL cục bộ thay thế.

## Nạp nội dung

Các script dưới đây chạy lại được nhiều lần, không tạo bản trùng và không ghi đè
nội dung công ty đã biên tập.

```
node --env-file=.env --import tsx scripts/prepare-practice-areas.ts   # 12 lĩnh vực × 3 ngôn ngữ
node --env-file=.env --import tsx scripts/prepare-keywords.ts         # từ khóa cho ô tìm kiếm
node --env-file=.env --import tsx scripts/prepare-page-content.ts     # trang nền
node --env-file=.env --import tsx scripts/prepare-people.ts           # hồ sơ đội ngũ minh họa
node --env-file=.env --import tsx scripts/set-contact.ts --phone "..." # số điện thoại / Zalo
node --env-file=.env --import tsx scripts/publish-drafts.ts           # liệt kê bản nháp
```

Hồ sơ đội ngũ được nạp là **nội dung minh họa**: không thể xuất bản, chỉ hiện ở
chế độ demo và luôn kèm nhãn. Xem `docs/BUSINESS-INPUTS.md` trước khi thay bằng
hồ sơ thật.

## Bàn giao

- [Hướng dẫn admin](docs/ADMIN.vi.md)
- [**Triển khai lên hosting cPanel có Node.js**](docs/DEPLOY-HOSTING-CPANEL.md) — đọc Bước 0 trước, ba câu hỏi quyết định gói hosting có chạy được không. Đóng gói bằng `npm run bundle:hosting`
- [**Triển khai lên VPS từng bước**](docs/DEPLOY-VPS.md) — tên miền, PostgreSQL, systemd, Nginx, HTTPS, sao lưu
- [Vận hành và triển khai](docs/OPERATIONS.md)
- [Mô hình dữ liệu](docs/DATA-MODEL.md)
- [Báo cáo kiểm thử và giới hạn](docs/ACCEPTANCE.md)
- [Thông tin doanh nghiệp còn thiếu](docs/BUSINESS-INPUTS.md)
- [SEO, dữ liệu có cấu trúc và header bảo mật](docs/SEO.md)
- [Thiết kế và nguồn tham khảo](docs/DESIGN.md)
- [Phụ thuộc và giấy phép](docs/DEPENDENCIES.md)
- [Phép thử phục hồi](docs/restore-test.json)
- Mẫu chữ chỉnh sửa được: `src/app/(public)/[locale]/[section]/page.tsx`, route `/vi/typography`.
- Bộ thành phần vector chỉnh sửa được: `design/design-system.svg`.
- Ảnh chụp: `artifacts/`.
