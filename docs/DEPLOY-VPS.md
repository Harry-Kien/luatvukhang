# Triển khai lên VPS — luatvukhang.com

Hướng dẫn đầy đủ từ lúc trỏ tên miền đến khi website chạy công khai. Viết cho
Ubuntu 22.04/24.04 trên một VPS. Mỗi bước có cách kiểm chứng ngay sau đó — làm
xong bước nào thì xác nhận bước đó, đừng đợi đến cuối mới phát hiện sai.

Nếu dùng bản dựng Docker thay cho cách này, xem mục "Triển khai bằng Docker"
trong `OPERATIONS.md`.

## Trước khi bắt đầu

Cần có:

| Thứ | Ghi chú |
| --- | --- |
| VPS Ubuntu, tối thiểu **2 GB RAM** | `npm run build` của Next.js thường cần 1–2 GB. 1 GB sẽ bị hệ điều hành giết giữa chừng. |
| Quyền `sudo` và truy cập SSH | |
| Quyền quản lý DNS của `luatvukhang.com` | |
| Địa chỉ IPv4 của VPS | Nhà cung cấp cấp khi tạo máy |

**Ba điểm dễ sai nhất, đọc trước khi làm:**

1. **Biến `NEXT_PUBLIC_*` được nhúng lúc dựng bản build, không đọc lúc chạy.**
   Đổi `NEXT_PUBLIC_SITE_URL` hay `NEXT_PUBLIC_DEMO_MODE` rồi chỉ khởi động lại
   dịch vụ thì **không có tác dụng** — phải chạy lại `npm run build`.
2. **Chỉ bật `TRUST_PROXY_HEADERS=true` sau khi Nginx đã ghi đè
   `X-Forwarded-For`** và ứng dụng không còn nhận truy cập trực tiếp. Bật sớm thì
   khách tự khai địa chỉ được và hạn mức gửi biểu mẫu mất tác dụng.
3. **Không bật `SITE_LAUNCH_APPROVED=true` khi `npm run release:check` còn chặn.**
   Cờ này mở chỉ mục cho Google; bật khi nội dung chưa duyệt thì thứ chưa rà soát
   sẽ được lập chỉ mục dưới tên công ty.

---

## Bước 1 — Trỏ tên miền

Vào trang quản lý DNS của `luatvukhang.com`, tạo hai bản ghi:

| Loại | Tên | Giá trị | TTL |
| --- | --- | --- | --- |
| A | `@` | `<IP VPS>` | 300 |
| A | `www` | `<IP VPS>` | 300 |

Đặt TTL thấp (300 giây) trong lúc cài đặt để sửa nhanh nếu nhầm; xong xuôi nâng
lên 3600.

Kiểm chứng — chạy trên máy của bạn, chờ đến khi cả hai trả về đúng IP:

```bash
dig +short luatvukhang.com; dig +short www.luatvukhang.com
```

DNS có thể mất từ vài phút đến vài giờ. **Chưa ra đúng IP thì chưa chạy certbot
ở bước 9** — Let's Encrypt sẽ từ chối cấp chứng chỉ.

## Bước 2 — Chuẩn bị máy chủ

Đăng nhập VPS rồi cập nhật hệ thống và cài Node.js 24 (phiên bản dự án đã kiểm thử):

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

Bật tường lửa. Cổng 3000 **không** mở ra ngoài — Nginx là đường vào duy nhất:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

Tạo người dùng riêng cho ứng dụng. Website không chạy bằng `root`:

```bash
sudo adduser --system --group --home /srv/luatvukhang --shell /bin/bash luatvukhang
sudo mkdir -p /srv/luatvukhang
sudo chown luatvukhang:luatvukhang /srv/luatvukhang
```

Từ đây trở đi, mọi lệnh thao tác với mã nguồn đều chạy dưới người dùng này. Mẫu
lệnh dùng lại nhiều lần trong tài liệu:

```bash
sudo -u luatvukhang bash -c 'cd /srv/luatvukhang && <lệnh>'
```

## Bước 3 — PostgreSQL

```bash
sudo apt install -y postgresql
sudo systemctl enable --now postgresql
```

Tạo mật khẩu ngẫu nhiên rồi tạo người dùng và cơ sở dữ liệu. **Ghi lại mật khẩu
này**, bước 5 cần đến:

```bash
DBPASS=$(openssl rand -hex 24); echo "Mat khau DB: $DBPASS"
sudo -u postgres psql -c "CREATE USER law WITH PASSWORD '$DBPASS';"
sudo -u postgres psql -c "CREATE DATABASE law OWNER law ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0;"
```

Dùng `LC_COLLATE 'C'` để khớp cấu hình đã kiểm thử. PostgreSQL chỉ nghe trên
localhost theo mặc định của Ubuntu — giữ nguyên, không mở ra mạng.

Kiểm chứng:

```bash
psql "postgresql://law:$DBPASS@127.0.0.1:5432/law" -c "SELECT version();"
```

## Bước 4 — Lấy mã nguồn

Kho mã ở `github.com/Harry-Kien/luatvukhang`. Nếu kho để riêng tư, tạo khóa SSH
trên VPS rồi thêm vào GitHub ở mục **Deploy keys** (chỉ cần quyền đọc):

```bash
sudo -u luatvukhang ssh-keygen -t ed25519 -N "" -f /srv/luatvukhang/.ssh/id_ed25519
sudo cat /srv/luatvukhang/.ssh/id_ed25519.pub
```

Dán khóa vừa in vào GitHub → repository → Settings → Deploy keys → Add.

Thư mục `/srv/luatvukhang` đã có sẵn `.ssh` nên `git clone` thẳng vào đó sẽ báo
lỗi "destination path already exists and is not an empty directory". Tải về một
thư mục tạm rồi chuyển vào:

```bash
sudo -u luatvukhang bash -c '
  cd /srv/luatvukhang
  git clone git@github.com:Harry-Kien/luatvukhang.git .src
  shopt -s dotglob
  mv .src/* .
  rmdir .src
'
```

Kho công khai thì thay URL bằng `https://github.com/Harry-Kien/luatvukhang.git`,
phần còn lại giữ nguyên.

Kiểm chứng:

```bash
sudo -u luatvukhang bash -c 'cd /srv/luatvukhang && git log --oneline -1'
```

## Bước 5 — Tệp cấu hình `.env`

```bash
sudo -u luatvukhang cp /srv/luatvukhang/.env.production.example /srv/luatvukhang/.env
sudo -u luatvukhang nano /srv/luatvukhang/.env
```

Điền như sau. Sinh `PAYLOAD_SECRET` bằng `openssl rand -hex 32`:

```
NEXT_PUBLIC_SITE_URL=https://luatvukhang.com
NEXT_PUBLIC_DEMO_MODE=false
SITE_LAUNCH_APPROVED=false
DATABASE_URL=postgresql://law:<mat-khau-o-buoc-3>@127.0.0.1:5432/law
PAYLOAD_SECRET=<64 ky tu ngau nhien>
TRUST_PROXY_HEADERS=false
```

Phần SMTP để trống lúc này, bước 11 quay lại điền.

> **Định dạng quan trọng:** systemd đọc tệp này nên mỗi dòng phải là
> `KHOA=giá-trị` trần — không `export`, không dấu nháy bao quanh, không khoảng
> trắng quanh dấu `=`.

Khóa quyền tệp, vì nó chứa mật khẩu cơ sở dữ liệu:

```bash
sudo chmod 600 /srv/luatvukhang/.env
sudo chown luatvukhang:luatvukhang /srv/luatvukhang/.env
```

## Bước 6 — Cài phụ thuộc, tạo lược đồ, dựng bản build

```bash
sudo -u luatvukhang bash -c 'cd /srv/luatvukhang && npm ci'
```

Giữ cả phụ thuộc phát triển: các script quản trị chạy bằng `tsx` nằm trong nhóm
đó. **Đừng dùng `--omit=dev`.**

Tạo lược đồ cơ sở dữ liệu và bảng hạn mức. Lệnh `payload` đọc cấu hình từ biến
môi trường chứ không tự nạp `.env`, nên phải nạp tệp vào phiên làm việc trước:

```bash
sudo -u luatvukhang bash -c '
  cd /srv/luatvukhang
  set -a; source .env; set +a
  npm run payload -- migrate
  psql "$DATABASE_URL" -f scripts/init-rate-limit.sql
'
```

Dựng bản production:

```bash
sudo -u luatvukhang bash -c 'cd /srv/luatvukhang && npm run build'
```

Bước này nặng nhất. Nếu bị giết vì thiếu bộ nhớ, tạo swap tạm rồi dựng lại:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
```

Tạo thư mục ảnh:

```bash
sudo -u luatvukhang mkdir -p /srv/luatvukhang/media
```

## Bước 7 — Tài khoản quản trị và nội dung nền

```bash
cd /srv/luatvukhang
sudo -u luatvukhang node --env-file=.env --import tsx scripts/bootstrap.ts
sudo -u luatvukhang node --env-file=.env --import tsx scripts/prepare-pages.ts
sudo -u luatvukhang node --env-file=.env --import tsx scripts/prepare-practice-areas.ts
sudo -u luatvukhang node --env-file=.env --import tsx scripts/prepare-page-content.ts
sudo -u luatvukhang node --env-file=.env --import tsx scripts/set-contact.ts --phone "0832270898"
```

`bootstrap.ts` ghi mật khẩu quản trị vào `.local/admin-access.txt`. Đọc nó, đổi
mật khẩu ngay sau lần đăng nhập đầu, rồi xóa tệp:

```bash
sudo cat /srv/luatvukhang/.local/admin-access.txt
```

**Không chạy `scripts/prepare-people.ts` trên máy chủ thật.** Đó là hồ sơ minh
họa, chỉ dùng để xem trước bố cục ở máy phát triển.

## Bước 8 — Chạy như một dịch vụ hệ thống

```bash
sudo cp /srv/luatvukhang/deploy/luatvukhang.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now luatvukhang
sudo systemctl status luatvukhang --no-pager
```

Kiểm chứng ứng dụng đã chạy và nối được cơ sở dữ liệu:

```bash
curl -s http://127.0.0.1:3000/api/health/ready
```

Phải trả về `{"status":"ready"}`. Nếu không, xem log:

```bash
sudo journalctl -u luatvukhang -n 50 --no-pager
```

## Bước 9 — Nginx và HTTPS

```bash
sudo apt install -y nginx
sudo cp /srv/luatvukhang/deploy/nginx.conf /etc/nginx/sites-available/luatvukhang
sudo ln -s /etc/nginx/sites-available/luatvukhang /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Mở `http://luatvukhang.com` trên trình duyệt — phải thấy website. Xong thì cấp
chứng chỉ:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d luatvukhang.com -d www.luatvukhang.com
```

Chọn phương án chuyển hướng toàn bộ sang HTTPS khi certbot hỏi. Certbot tự gia
hạn; kiểm tra bằng `sudo certbot renew --dry-run`.

Kiểm chứng đầy đủ:

```bash
curl -sI https://luatvukhang.com | head -20
curl -sI http://www.luatvukhang.com | grep -i location
```

Phải thấy `strict-transport-security`, `content-security-policy`, và `www`
chuyển hướng về `https://luatvukhang.com`.

## Bước 10 — Bật hạn mức theo từng người gửi

Chỉ làm sau khi bước 9 xong và đã xác nhận Nginx ghi đè `X-Forwarded-For` (tệp
cấu hình kèm theo dùng `$remote_addr`, đúng yêu cầu này).

```bash
sudo -u luatvukhang sed -i 's/^TRUST_PROXY_HEADERS=.*/TRUST_PROXY_HEADERS=true/' /srv/luatvukhang/.env
sudo systemctl restart luatvukhang
```

Biến này đọc lúc chạy nên không cần dựng lại.

## Bước 11 — Nội dung thật, email và kiểm tra phát hành

Đăng nhập `https://luatvukhang.com/admin` và hoàn tất:

- **Cài đặt**: địa chỉ văn phòng, email tiếp nhận, mã số thuế, thông tin đăng ký
  hành nghề. Số điện thoại đã có từ bước 7.
- **Đội ngũ**: nhập hồ sơ luật sư thật kèm số thẻ, đoàn luật sư và ảnh chân dung
  có quyền sử dụng.
- **Chuyên môn**: luật sư của công ty đọc duyệt 12 lĩnh vực đã nạp sẵn.
- **Quyền riêng tư / Điều khoản**: rà soát bản dự thảo, rồi bật cờ "Chính sách
  quyền riêng tư đã được rà soát" trong Cài đặt.

Cấu hình SMTP trong `.env` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASSWORD`, `SMTP_FROM`, `NOTIFICATION_EMAIL`), khởi động lại dịch vụ, rồi
thử đường gửi thông báo:

```bash
sudo systemctl restart luatvukhang
cd /srv/luatvukhang
sudo -u luatvukhang node --env-file=.env --import tsx scripts/send-notifications.ts --check
```

Đặt lịch cho worker gửi thông báo (5 phút một lần):

```bash
sudo crontab -e
# */5 * * * * cd /srv/luatvukhang && sudo -u luatvukhang node --env-file=.env --import tsx scripts/send-notifications.ts
```

Xuất bản nội dung đã duyệt:

```bash
cd /srv/luatvukhang
sudo -u luatvukhang node --env-file=.env --import tsx scripts/publish-drafts.ts          # xem trước
sudo -u luatvukhang node --env-file=.env --import tsx scripts/publish-drafts.ts --confirm
```

Rồi chạy kiểm tra phát hành cho đến khi không còn mục nào bị chặn:

```bash
sudo -u luatvukhang npm run release:check
```

## Bước 12 — Mở chỉ mục và ra mắt

Chỉ làm khi bước 11 đã sạch. Sửa `.env`:

```
SITE_LAUNCH_APPROVED=true
```

`NEXT_PUBLIC_DEMO_MODE` đã là `false` từ bước 5. Vì `SITE_LAUNCH_APPROVED` được
đọc cả lúc dựng, **phải dựng lại rồi mới khởi động lại**:

```bash
cd /srv/luatvukhang
sudo -u luatvukhang npm run build
sudo systemctl restart luatvukhang
```

Kiểm chứng website đã mở cho công cụ tìm kiếm:

```bash
curl -s https://luatvukhang.com/robots.txt
curl -s https://luatvukhang.com/sitemap.xml | head -20
curl -s https://luatvukhang.com/vi | grep -o '<meta name="robots"[^>]*>'
```

`robots.txt` phải cho phép thu thập, sitemap phải có nội dung, thẻ robots phải là
`index, follow`. Sau đó nộp sitemap trong Google Search Console và điền
`SITE_VERIFICATION_GOOGLE` vào `.env` (nhớ dựng lại vì đây cũng là biến lúc dựng).

## Bước 13 — Sao lưu và giám sát

```bash
sudo cp /srv/luatvukhang/deploy/backup.sh /usr/local/bin/luatvukhang-backup
sudo chmod +x /usr/local/bin/luatvukhang-backup
sudo /usr/local/bin/luatvukhang-backup          # chạy thử một lần
sudo crontab -e
# 15 2 * * * /usr/local/bin/luatvukhang-backup >> /var/log/luatvukhang-backup.log 2>&1
```

Đưa một bản sao ra khỏi máy chủ này. Sao lưu nằm cùng ổ đĩa với dữ liệu gốc thì
không cứu được gì khi ổ đĩa hỏng.

**Sao lưu chưa thử phục hồi thì chưa phải sao lưu.** Ít nhất một lần, phục hồi
bản dump vào một cơ sở dữ liệu tạm và đối chiếu số dòng.

Giám sát tối thiểu: trỏ một dịch vụ theo dõi uptime bên ngoài vào
`https://luatvukhang.com/api/health/ready` — endpoint này trả 503 khi cơ sở dữ
liệu không sẵn sàng, nên nó phân biệt được "web chết" với "dữ liệu chưa lên".

---

## Cập nhật website về sau

```bash
sudo /usr/local/bin/luatvukhang-backup
sudo -u luatvukhang bash -c '
  cd /srv/luatvukhang
  git pull
  npm ci
  set -a; source .env; set +a
  npm run payload -- migrate
  npm run build
'
sudo systemctl restart luatvukhang
curl -s https://luatvukhang.com/api/health/ready
```

Chạy sao lưu trước khi migrate nếu bản cập nhật có thay đổi lược đồ.

## Khi có sự cố

| Hiện tượng | Việc cần làm |
| --- | --- |
| Trang trả 502 | `sudo systemctl status luatvukhang` và `sudo journalctl -u luatvukhang -n 100` |
| `/api/health/ready` trả 503 | Cơ sở dữ liệu chưa sẵn sàng: `sudo systemctl status postgresql`, kiểm tra `DATABASE_URL` |
| Đổi `.env` mà không thấy tác dụng | Biến `NEXT_PUBLIC_*` và `SITE_LAUNCH_APPROVED` cần `npm run build` lại |
| Ảnh tải lên mất sau khi cập nhật | Thư mục `media/` bị ghi đè; phục hồi từ bản sao lưu |
| Chứng chỉ hết hạn | `sudo certbot renew` rồi `sudo systemctl reload nginx` |
| Biểu mẫu chặn nhầm khách thật | Xem `TRUST_PROXY_HEADERS` và cấu hình Nginx ở bước 10 |
| Log báo `Read-only file system` | Unit systemd đặt `ProtectSystem=strict`, chỉ cho ghi vào `media/` và `.next/`. Thêm đường dẫn cần ghi vào `ReadWritePaths` rồi `sudo systemctl daemon-reload` — đừng gỡ hẳn `ProtectSystem`. |
| Dựng build bị treo hoặc bị giết | Thiếu RAM. Thêm swap như ở bước 6, hoặc dựng ở máy khác rồi chép thư mục `.next` lên. |
