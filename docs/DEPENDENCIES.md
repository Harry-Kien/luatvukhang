# Phụ thuộc và giấy phép

Phiên bản đã cài theo package-lock.json. Ngày kiểm tra: 08/09/2026.

| Gói | Phiên bản | Giấy phép | Phạm vi |
|---|---|---|---|
| @fontsource-variable/noto-serif | 5.3.0 | OFL-1.1 | runtime |
| @fontsource/be-vietnam-pro | 5.3.0 | OFL-1.1 | runtime |
| @hookform/resolvers | 5.9.1 | MIT | runtime |
| @libsql/client | 0.14.0 | MIT | runtime |
| @payloadcms/db-sqlite | 3.89.0 | MIT | runtime |
| @payloadcms/next | 3.89.0 | MIT | runtime |
| @payloadcms/richtext-lexical | 3.89.0 | MIT | runtime |
| @payloadcms/translations | 3.89.0 | MIT | runtime |
| @tailwindcss/postcss | 4.3.3 | MIT | runtime |
| graphql | 16.14.2 | MIT | runtime |
| lucide-react | 0.577.0 | ISC | runtime |
| next | 16.3.4 | MIT | runtime |
| next-intl | 4.14.2 | MIT | runtime |
| nodemailer | 10.0.3 | MIT-0 | runtime |
| payload | 3.89.0 | MIT | runtime |
| react | 19.2.8 | MIT | runtime |
| react-dom | 19.2.8 | MIT | runtime |
| react-hook-form | 7.87.0 | MIT | runtime |
| sharp | 0.35.4 | Apache-2.0 | runtime |
| tailwindcss | 4.3.3 | MIT | runtime |
| zod | 4.6.2 | MIT | runtime |
| @axe-core/playwright | 4.13.0 | MPL-2.0 | development |
| @playwright/test | 1.63.0 | Apache-2.0 | development |
| @types/node | 22.20.2 | MIT | development |
| @types/nodemailer | 8.0.1 | MIT | development |
| @types/react | 19.3.0 | MIT | development |
| @types/react-dom | 19.3.0 | MIT | development |
| prettier | 3.9.6 | MIT | development |
| tsx | 4.23.13 | MIT | development |
| typescript | 5.9.3 | Apache-2.0 | development |

Font Noto Serif và Be Vietnam Pro: SIL Open Font License 1.1; bản giấy phép trong docs/licenses. SQLite thuộc phạm vi công cộng; @libsql/client và libsql theo giấy phép MIT.

Payload/Next.js/TypeScript/Tailwind/next-intl cung cấp nền CMS và giao diện; React Hook Form + Zod xử lý biểu mẫu; Lucide cho biểu tượng; @libsql/client cho giới hạn gửi; nodemailer cho SMTP; Playwright + axe cho kiểm thử. Không cài Tailark, Magic UI, Motion hoặc Superpowers vì chưa có chức năng cần chúng. Không tìm thấy Superpowers trong thư mục kỹ năng/plugin đã kiểm tra.

Không dùng npm audit fix --force. Còn cảnh báo moderate được ghi trong audit-report.json. Lockfile giữ toàn bộ cây phụ thuộc; danh sách này không thay thế rà soát pháp lý giấy phép khi phân phối.
