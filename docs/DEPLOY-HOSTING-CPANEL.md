# Triển khai trên Hosting cPanel có Node.js

Dành cho gói hosting dùng chung có mục **Setup Node.js App** (chạy qua Passenger).
Nếu bạn có VPS, hãy dùng `DEPLOY-VPS.md` — đường đó ít giới hạn hơn nhiều.

## Bước 0 — Ba câu hỏi quyết định, hỏi trước khi làm bất cứ việc gì

Gửi đúng ba câu này cho bộ phận kỹ thuật của nhà cung cấp. **Chỉ một câu trả lời
"không" là gói hosting này không chạy được website**, và mọi bước phía sau đều vô ích.

| # | Câu hỏi | Vì sao quyết định |
| --- | --- | --- |
| 1 | **Gói hosting có PostgreSQL không?** (không phải MySQL) | Toàn bộ dữ liệu chạy trên PostgreSQL. MySQL không thay thế được nếu không viết lại tầng dữ liệu và toàn bộ migration. |
| 2 | Mục **Setup Node.js App** có **Node.js 20 trở lên** không? | Dự án kiểm thử trên Node 24. Node 18 trở xuống không chạy. |
| 3 | Tiến trình Node.js được cấp **bao nhiêu RAM**? | `npm run build` cần khoảng 1–2 GB. Dưới mức đó bước dựng sẽ bị hệ thống giết giữa chừng. |

Hỏi thêm hai câu nếu có thể: có **SSH** không, và có cho phép **kết nối ra ngoài
tới cổng 5432** không (dùng khi PostgreSQL đặt ở dịch vụ khác).

### Nếu câu 1 là "không có PostgreSQL"

Còn một đường: dùng **PostgreSQL quản lý sẵn ở bên ngoài** (Neon, Supabase,
Aiven…) và trỏ `DATABASE_URL` sang đó. Đường này chỉ đi được khi hosting cho
phép kết nối ra ngoài tới cổng 5432 — nhiều gói dùng chung chặn. Với một công ty
luật còn cần cân nhắc: dữ liệu khách hàng khi đó nằm trên máy chủ ở nước ngoài.

Không đi được cả hai đường thì chuyển sang VPS. Đó không phải thất bại kỹ thuật,
chỉ là chọn đúng loại dịch vụ.

## Bước 1 — Lấy đủ bộ mã nguồn

Nhà cung cấp báo "bộ mã nguồn chưa đầy đủ" thường là do tải lên thiếu tệp ẩn
hoặc thiếu tệp cấu hình. Cách chắc chắn nhất là tải thẳng từ kho mã:

```bash
git clone https://github.com/Harry-Kien/luatvukhang.git
```

Kho mã để **công khai** nên lệnh này không cần tài khoản, mật khẩu hay khóa SSH.
Đã kiểm chứng: bản clone ẩn danh có đủ `package.json`, `package-lock.json`,
`next.config.mjs`, `server.js`, `tsconfig.json`, `scripts/hosting-setup.mjs` và
`importMap.js` của admin, và **không** kèm `.env`, `.local/` hay `node_modules/`.

Không có SSH thì dùng **Git™ Version Control** trong cPanel: Create → dán URL
trên vào ô *Clone URL*, đặt *Repository Path* là thư mục ứng dụng. Cách này clone
được mà không cần dòng lệnh.

Không dùng được `git` trên hosting thì đóng gói sẵn ở máy cá nhân:

```bash
npm run bundle:hosting
```

Lệnh này tạo `.local/hosting-source.zip` dựng từ đúng danh sách tệp Git đang
theo dõi, nên không thể rơi mất tệp như khi kéo thả bằng File Manager. Nó tự đối
chiếu danh sách tệp bắt buộc và báo lỗi nếu thiếu, đồng thời **không** kèm
`.env`, `.local/`, `media/` hay `node_modules/` — bí mật không đi qua tệp nén.

Hosting không đủ RAM để dựng thì thêm bản dựng sẵn:

```bash
npm run build            # nhớ dùng đúng các biến NEXT_PUBLIC_* của production
node scripts/make-hosting-bundle.mjs --with-build
```

Tải cả hai tệp zip lên rồi giải nén vào cùng thư mục ứng dụng.

Dù đóng gói cách nào, **phải có đủ những tệp này** — vài tệp bắt đầu bằng dấu
chấm nên trình quản lý tệp hay ẩn đi:

```
package.json  package-lock.json  next.config.mjs  postcss.config.mjs
tsconfig.json  server.js  src/  public/  scripts/
```

**Không tải lên**: `node_modules/` (cài trên hosting), `.next/` (dựng trên
hosting), `.env` (tạo riêng, xem bước 3), `.local/`, `media/` của máy cá nhân.

## Bước 2 — Tạo ứng dụng Node.js trong cPanel

cPanel → **Setup Node.js App** → Create Application:

| Ô | Giá trị |
| --- | --- |
| Node.js version | 20 trở lên, chọn cao nhất có sẵn |
| Application mode | Production |
| Application root | thư mục vừa tải mã lên, ví dụ `luatvukhang` |
| Application URL | tên miền hoặc thư mục con sẽ chạy website |
| **Application startup file** | **`server.js`** |

`server.js` có sẵn trong kho mã. Nó tồn tại vì Passenger nạp thẳng một tệp
JavaScript chứ không chạy `npm start`, nên `next start` không cắm vào được.

## Bước 3 — Khai biến môi trường

Vẫn trong màn hình đó, mục **Environment variables**, thêm từng biến:

| Biến | Giá trị |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `postgresql://người-dùng:mật-khẩu@máy-chủ:5432/tên-db` |
| `PAYLOAD_SECRET` | 64 ký tự ngẫu nhiên — sinh bằng `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://luatvukhang.com` |
| `NEXT_PUBLIC_DEMO_MODE` | `false` |
| `SITE_LAUNCH_APPROVED` | `false` cho tới khi nghiệm thu xong |
| `TRUST_PROXY_HEADERS` | `false` |

> `PAYLOAD_SECRET` ngắn hơn 32 ký tự sẽ khiến ứng dụng dừng ngay khi khởi động ở
> chế độ production. Đó là chủ ý: giá trị dự phòng nằm công khai trong kho mã,
> và một website chạy êm với khóa ai cũng biết nguy hiểm hơn nhiều so với một
> website báo lỗi ngay.

## Bước 4 — Cài, tạo lược đồ, dựng

Bấm **Run NPM Install** trong giao diện, hoặc qua SSH:

```bash
cd ~/luatvukhang
source /home/<tài-khoản>/nodevenv/luatvukhang/20/bin/activate   # đường dẫn cPanel in ra
npm ci
npm run payload -- migrate
psql "$DATABASE_URL" -f scripts/init-rate-limit.sql
npm run build
```

Giữ cả phụ thuộc phát triển — các script quản trị chạy bằng `tsx` nằm trong nhóm
đó. **Đừng dùng `--omit=dev`.**

Bước `npm run build` là nặng nhất. Bị giết giữa chừng nghĩa là hosting không đủ
RAM; khi đó dựng ở máy cá nhân rồi tải nguyên thư mục `.next` lên — nhớ dựng với
đúng các biến `NEXT_PUBLIC_*` của production, vì chúng được nhúng lúc dựng.

## Bước 5 — Nội dung nền và tài khoản quản trị

```bash
node --env-file=.env --import tsx scripts/bootstrap.ts
node --env-file=.env --import tsx scripts/prepare-pages.ts
node --env-file=.env --import tsx scripts/prepare-practice-areas.ts
node --env-file=.env --import tsx scripts/prepare-keywords.ts
node --env-file=.env --import tsx scripts/prepare-page-content.ts
node --env-file=.env --import tsx scripts/set-contact.ts --phone "0832270898"
```

Không chạy `scripts/prepare-people.ts` trên máy chủ thật — đó là hồ sơ minh họa.

Đọc mật khẩu quản trị ở `.local/admin-access.txt`, đăng nhập `/admin`, **đổi mật
khẩu ngay**, rồi xóa tệp đó.

## Bước 6 — Khởi động lại và kiểm chứng

Bấm **Restart** trong Setup Node.js App, rồi kiểm tra:

```
https://luatvukhang.com/api/health/ready      → {"status":"ready"}
https://luatvukhang.com/vi                    → trang chủ
https://luatvukhang.com/admin                 → đăng nhập được
```

`/api/health/ready` trả 503 nghĩa là ứng dụng chạy nhưng không nối được cơ sở dữ
liệu — kiểm tra lại `DATABASE_URL`.

## Bước 7 — Ra mắt

Chỉ làm khi `npm run release:check` không còn mục nào bị chặn. Đổi
`SITE_LAUNCH_APPROVED` thành `true`, rồi **dựng lại** (`npm run build`) và
Restart. Chỉ Restart là không đủ: biến này được đọc cả lúc dựng.

## Cập nhật website về sau

Đã clone bằng git thì lần sau chỉ cần kéo bản mới về:

```bash
cd ~/luatvukhang
source /home/<tài-khoản>/nodevenv/luatvukhang/20/bin/activate
git pull
node scripts/hosting-setup.mjs --skip-install
```

Bỏ `--skip-install` nếu bản cập nhật có thay đổi phụ thuộc — xem phần
`dependencies` trong `package.json` có đổi không. Sau đó bấm **Restart** trong
Setup Node.js App.

`git pull` không đụng tới `.env`, `.local/` và `media/` vì cả ba đều nằm ngoài
kho mã, nên nội dung và cấu hình của công ty không bị ghi đè.

Dùng **Git™ Version Control** của cPanel thì bấm **Update from Remote** thay cho
`git pull`, rồi chạy script như trên.

## Những giới hạn phải biết trước

Hosting dùng chung không cho bằng VPS, và đây là những chỗ sẽ vướng:

- **Không đặt được lịch chạy worker gửi email.** `scripts/send-notifications.ts`
  cần chạy vài phút một lần. Không có cron thì yêu cầu tư vấn của khách vẫn được
  lưu đầy đủ, nhưng **không ai được báo** — phải vào `/admin` xem thủ công.
- **Không tự cấu hình được Nginx**, nên không ghi đè được `X-Forwarded-For`. Giữ
  `TRUST_PROXY_HEADERS=false`; hạn mức gửi biểu mẫu chỉ áp ở mức chung.
- **Tiến trình bị ngủ khi không có truy cập** trên nhiều gói, nên lần truy cập
  đầu sau một lúc vắng sẽ chậm.
- **Sao lưu tự động** phải dựa vào công cụ của nhà cung cấp; `deploy/backup.sh`
  cần cron và `pg_dump`.
- **Ảnh tải lên nằm ở `media/`** — kiểm tra xem nhà cung cấp có xóa thư mục này
  khi triển khai lại không.

Bốn giới hạn đầu đều biến mất trên VPS. Nếu công ty dự định dùng website làm
kênh tiếp nhận khách hàng thật, riêng điểm thứ nhất — không ai được báo khi có
yêu cầu tư vấn — đã đủ là lý do để chuyển sang VPS.
