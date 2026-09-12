# Triển khai trên Hosting cPanel có Node.js

Dành cho gói hosting dùng chung có mục **Setup Node.js App** (chạy qua Passenger).
Nếu bạn có VPS, hãy dùng `DEPLOY-VPS.md` — đường đó ít giới hạn hơn nhiều.

## Bước 0 — Ba câu hỏi quyết định, hỏi trước khi làm bất cứ việc gì

Gửi đúng ba câu này cho bộ phận kỹ thuật của nhà cung cấp. **Chỉ một câu trả lời
"không" là gói hosting này không chạy được website**, và mọi bước phía sau đều vô ích.

| # | Câu hỏi | Vì sao quyết định |
| --- | --- | --- |
| 1 | ~~Gói hosting có PostgreSQL không?~~ **Không còn cần** | Hệ thống đã chuyển sang SQLite — cơ sở dữ liệu là một tệp trong thư mục ứng dụng. Không cần PostgreSQL, không cần MySQL, không cần máy chủ cơ sở dữ liệu nào. |
| 2 | Mục **Setup Node.js App** có **Node.js 20 trở lên** không? | Dự án kiểm thử trên Node 24. Node 18 trở xuống không chạy. |
| 3 | Tiến trình Node.js được cấp **bao nhiêu RAM**? | `npm run build` cần khoảng 1–2 GB. Dưới mức đó bước dựng sẽ bị hệ thống giết giữa chừng. |

Hỏi thêm một câu nếu có thể: có **SSH** không.

Câu 2 hoặc câu 3 là "không" thì chuyển sang VPS. Đó không phải thất bại kỹ
thuật, chỉ là chọn đúng loại dịch vụ.

### Cơ sở dữ liệu bây giờ là một tệp — và điều đó đổi cách chọn thư mục

Trước đây dữ liệu nằm trong PostgreSQL, một dịch vụ riêng mà trình duyệt không
với tới được. Từ khi chuyển sang SQLite, **toàn bộ dữ liệu khách hàng nằm trong
một tệp bên trong thư mục ứng dụng**: `.local/law.db`.

Hệ quả duy nhất, và nó quan trọng hơn mọi bước còn lại trong tài liệu này: thư
mục ứng dụng **không được nằm trong vùng máy chủ web phục vụ trực tiếp**. Xem
khung cảnh báo ở Bước 2.

## Bước 1 — Lấy đủ bộ mã nguồn

Nhà cung cấp báo "bộ mã nguồn chưa đầy đủ" thường là do tải lên thiếu tệp ẩn
hoặc thiếu tệp cấu hình. Cách chắc chắn nhất là tải thẳng từ kho mã:

```bash
git clone https://github.com/Harry-Kien/luatvukhang.git
```

Kho mã để **công khai** nên lệnh này không cần tài khoản, mật khẩu hay khóa SSH.
Đã kiểm chứng: bản clone ẩn danh có đủ `package.json`, `package-lock.json`,
`next.config.mjs`, `server.cjs`, `tsconfig.json`, `scripts/hosting-setup.mjs` và
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
tsconfig.json  server.cjs  src/  public/  scripts/
```

**Không tải lên**: `node_modules/` (cài trên hosting), `.next/` (dựng trên
hosting), `.env` (tạo riêng, xem bước 3), `.local/`, `media/` của máy cá nhân.

## Bước 2 — Tạo ứng dụng Node.js trong cPanel

> **Tải mã nguồn về TRƯỚC khi tạo ứng dụng.** cPanel tự tạo `app.js` và
> `package.json` mẫu trong thư mục ứng dụng nếu nó đang trống, và `git clone`
> sẽ từ chối ghi vào một thư mục không trống. Làm Bước 1 xong rồi mới làm bước
> này thì không vướng.
>
> **Kiểm tra ô Node.js version trước tiên.** Bấm vào ô đó xem có bản **20 trở
> lên** không. Next.js khai `engines: node >= 20.9.0` và Payload khai
> `>= 20.9.0` — đây là yêu cầu của chính thư viện, không phải khuyến nghị. Bản
> cao nhất mà dưới 20.9 thì gói hosting này **không chạy được website**, và mọi
> bước sau đều vô ích.

> ## ⛔ Application root KHÔNG ĐƯỢC là `public_html`
>
> Đây là ô nguy hiểm nhất trong toàn bộ quá trình triển khai, và cPanel không hề
> cảnh báo khi điền sai.
>
> `public_html` là thư mục mà máy chủ web phục vụ **thẳng ra Internet**: mọi tệp
> đặt trong đó đều tải về được bằng một đường link. Còn thư mục ứng dụng chứa
> những thứ không bao giờ được ra Internet. Đặt trùng hai thứ đó vào nhau thì
> bất kỳ ai gõ đúng đường dẫn cũng tải được:
>
> | Đường dẫn | Thứ họ lấy được |
> | --- | --- |
> | `/.local/law.db` | **Toàn bộ cơ sở dữ liệu** — mọi yêu cầu tư vấn: họ tên, email, số điện thoại, nội dung khách hàng trình bày, ghi chú nội bộ |
> | `/.env` | `PAYLOAD_SECRET` — đủ để tự ký vé đăng nhập và vào thẳng trang quản trị với quyền cao nhất |
> | `/.local/admin-access.txt` | Mật khẩu quản trị dạng chữ thường, nếu tệp này bị tải lên |
> | `/.git/config` | Đủ để dựng lại nguyên vẹn kho mã |
>
> Với một công ty luật, mục đầu tiên không chỉ là sự cố kỹ thuật: đó là toàn bộ
> thông tin khách hàng đã tin tưởng gửi đi.
>
> **Điền đúng:** Application root là một thư mục **ngang hàng** với
> `public_html`, không phải bên trong nó.
>
> ```
> /home/tên-tài-khoản/
> ├── public_html/     ← máy chủ web phục vụ thư mục này ra Internet
> └── luatvukhang/     ← ĐIỀN THƯ MỤC NÀY vào ô Application root
>     ├── .env
>     ├── .local/law.db
>     └── server.cjs
> ```
>
> Ô Application root nhận đường dẫn tính từ thư mục gốc tài khoản, nên chỉ cần
> gõ `luatvukhang`. Nếu ô đó đang là `public_html`, `public_html/luatvukhang`
> hay bất cứ thứ gì bắt đầu bằng `public_html` — **sửa lại ngay bây giờ**, trước
> khi làm tiếp.
>
> Website vẫn chạy trên tên miền bình thường: ô **Application URL** mới là thứ
> quyết định địa chỉ, và Passenger chuyển tiếp yêu cầu vào ứng dụng đang nằm ở
> chỗ khác. Đặt ngoài `public_html` không hề làm website khó truy cập hơn.
>
> Bước 6 có một lệnh kiểm chứng để biết chắc mình đã điền đúng.

cPanel → **Setup Node.js App** → Create Application:

| Ô | Giá trị |
| --- | --- |
| Node.js version | 20 trở lên, chọn cao nhất có sẵn |
| Application mode | Production |
| **Application root** | thư mục vừa tải mã lên, ví dụ `luatvukhang` — **ngoài `public_html`**, xem khung trên |
| Application URL | tên miền hoặc thư mục con sẽ chạy website |
| **Application startup file** | **`server.cjs`** |

`server.cjs` có sẵn trong kho mã. Nó tồn tại vì Passenger nạp thẳng một tệp
JavaScript chứ không chạy `npm start`, nên `next start` không cắm vào được.

> **Phải là `server.cjs`, không phải `server.js`.** Passenger không *chạy* tệp
> khởi động, nó **nạp bằng `require()`**. Dự án khai `"type": "module"` nên mọi
> tệp `.js` là ES module, và `require()` một ES module thì hỏng — Node 20 báo
> `ERR_REQUIRE_ESM`, Node 22 trở lên báo `ERR_REQUIRE_ASYNC_MODULE`. Đuôi
> `.cjs` buộc tệp là CommonJS nên nạp được ở mọi phiên bản.
>
> Sai chỗ này thì triệu chứng duy nhất nhìn thấy là website không lên, còn
> `node server.js` chạy tay lại vẫn tốt — nên rất dễ đi tìm nhầm chỗ.

## Bước 3 — Khai biến môi trường

Vẫn trong màn hình đó, mục **Environment variables**, thêm từng biến:

| Biến | Giá trị |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:/home/TÊN-TÀI-KHOẢN/luatvukhang/.local/law.db` — dùng đường dẫn **tuyệt đối**, lấy bằng `pwd` trong Terminal |
| `PAYLOAD_SECRET` | 64 ký tự ngẫu nhiên — sinh bằng `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://luatvukhang.com` |
| `NEXT_PUBLIC_DEMO_MODE` | `false` |
| `SITE_LAUNCH_APPROVED` | `false` cho tới khi nghiệm thu xong |
| `TRUST_PROXY_HEADERS` | `false` |

> `PAYLOAD_SECRET` ngắn hơn 32 ký tự sẽ khiến ứng dụng dừng ngay khi khởi động ở
> chế độ production. Đó là chủ ý: giá trị dự phòng nằm công khai trong kho mã,
> và một website chạy êm với khóa ai cũng biết nguy hiểm hơn nhiều so với một
> website báo lỗi ngay.

## Bước 4 — Cài đặt bằng một lệnh

### Mở terminal ngay trong cPanel (không cần SSH)

cPanel → mục **Advanced** → **Terminal**. Đây là cửa sổ dòng lệnh chạy thẳng
trong trình duyệt, cùng quyền với tài khoản hosting — không cần cài PuTTY, không
cần bật SSH, không cần khóa. Lần đầu mở sẽ có một cảnh báo, bấm đồng ý là vào.

Không thấy mục Terminal nghĩa là nhà cung cấp tắt nó; xem cách đi vòng ở cuối
bước này.

### Nạp môi trường Node của ứng dụng

Trong **Setup Node.js App**, ở dòng đầu màn hình ứng dụng có một lệnh dạng
`source /home/.../activate`. Bấm vào biểu tượng chép, rồi dán vào Terminal và
Enter. **Bắt buộc làm bước này trước** — nếu không, `node` trong Terminal là bản
mặc định cũ của hệ thống chứ không phải bản Node 20+ của ứng dụng.

Kiểm tra đã đúng chưa:

```bash
node -v
```

Phải in ra `v20.x` trở lên. Nếu ra `v14` hay `v16` thì lệnh activate chưa chạy.

### Chạy cài đặt

```bash
cd ~/luatvukhang && node scripts/hosting-setup.mjs
```

Script làm toàn bộ theo đúng thứ tự: kiểm tra môi trường → `npm ci` → tạo lược
đồ cơ sở dữ liệu → bảng hạn mức → dựng bản production → tài khoản quản trị → nạp
nội dung nền. Gặp vấn đề ở bước nào nó dừng và nói rõ nguyên nhân.

Chạy lại sau khi đã sửa lỗi: thêm `--skip-install` để khỏi cài lại phụ thuộc.

### Lỗi "application should not contain folder/file with such name"

Thông báo đầy đủ từ CloudLinux NodeJS Selector:

> Cloudlinux NodeJS Selector demands to store node modules for application in
> separate folder (virtual environment) pointed by symlink called "node_modules".

CloudLinux — nền của phần lớn hosting cPanel — bắt `node_modules` trong thư mục
ứng dụng phải là **liên kết tượng trưng** trỏ sang môi trường ảo riêng, không
được là thư mục thật. Một lần cài dở dang (ví dụ bị giết vì thiếu bộ nhớ) để lại
thư mục thật ở đó, và từ đó mọi thao tác đều bị từ chối.

**Kiểm tra trước khi xóa** — lệnh dưới chỉ đúng khi `node_modules` đã thành thư
mục thật:

```bash
ls -ld ~/luatvukhang/node_modules
```

Dòng kết quả bắt đầu bằng `l` là **liên kết tượng trưng, tức đang bình thường —
KHÔNG được xóa**. Xóa liên kết đó là gỡ ứng dụng khỏi môi trường ảo, và
Node.js Selector sẽ báo lỗi khó hiểu hơn hẳn lỗi ban đầu.

Chỉ khi dòng đó bắt đầu bằng `d` (thư mục thật) mới xóa:

```bash
cd ~/luatvukhang && rm -rf node_modules
```

Sau đó **bắt buộc nạp môi trường ảo trước khi cài** — nếu không, npm lại tạo ra
đúng thư mục thật gây lỗi này:

```bash
source /home/TÊN-TÀI-KHOẢN/nodevenv/luatvukhang/22/bin/activate
```

Kiểm tra đã nạp đúng chưa — phải thấy một đường dẫn nằm trong `nodevenv`:

```bash
which npm
```

Rồi mới cài. Hoặc đơn giản hơn: bấm nút **Run NPM Install** trong Setup Node.js
App, nút đó tự làm đúng.

### Nếu hosting giết tiến trình (SIGKILL) vì thiếu bộ nhớ

Hosting dùng chung đặt trần bộ nhớ cho mỗi tiến trình. `npm ci` và nhất là
`npm run build` có thể vượt trần và bị giết — dấu hiệu là `signal: 'SIGKILL'`,
không kèm thông báo lỗi nào khác.

Xem trần hiện tại:

```bash
cat /sys/fs/cgroup/memory.max 2>/dev/null || ulimit -v
```

Cần khoảng **2 GB** cho bước dựng. Thiếu thì làm ở máy cá nhân rồi tải lên:

```bash
npm run build
```

```bash
node scripts/make-hosting-bundle.mjs --with-build
```

Tải cả `hosting-source.zip` lẫn `hosting-build.zip` lên, giải nén vào cùng thư
mục, rồi chạy trên hosting:

```bash
node scripts/hosting-setup.mjs --skip-install --skip-build
```

Hai cờ này bỏ qua đúng hai bước nặng, các bước còn lại vẫn chạy đủ.

Gói bản dựng chỉ khoảng **23 MB** vì đã loại `.next/cache` — phần đệm của quá
trình dựng, chiếm tới 1,2 GB mà không cần để chạy. Đã kiểm chứng: xóa sạch
`.next`, giải nén riêng gói này rồi chạy máy chủ, toàn bộ trang và cả `/admin`
đều trả 200, và 128/128 kiểm thử đạt.

> **Trên Windows, đừng xóa `.next` bằng `Remove-Item -Recurse -Force`.** Thư mục
> `.next/node_modules` chứa liên kết tượng trưng trỏ ngược về `node_modules`
> thật, và lệnh đó đi theo liên kết rồi xóa luôn gói gốc — hỏng cả cây phụ
> thuộc. Xóa các liên kết trước, hoặc dùng `npm run build` đè lên.

Riêng `node_modules` vẫn phải cài trên hosting — nó chứa bản biên dịch riêng cho
Linux, không chép từ Windows sang được. Nếu chính `npm ci` cũng bị giết, phải
nhờ nhà cung cấp nâng trần bộ nhớ.

### Nếu không có Terminal

Dùng giao diện **Setup Node.js App**: bấm **Run NPM Install**, rồi ô **Run JS
script** nhập `scripts/hosting-setup.mjs`. Chậm hơn và khó đọc lỗi hơn, nhưng
làm được cùng việc.

Giữ cả phụ thuộc phát triển — các script quản trị chạy bằng `tsx` nằm trong nhóm
đó. **Đừng dùng `--omit=dev`.**

Bước `npm run build` là nặng nhất. Bị giết giữa chừng nghĩa là hosting không đủ
RAM; khi đó dựng ở máy cá nhân rồi tải nguyên thư mục `.next` lên — nhớ dựng với
đúng các biến `NEXT_PUBLIC_*` của production, vì chúng được nhúng lúc dựng.

## Bước 5 — Số điện thoại và tài khoản quản trị

Bước 4 đã tạo tài khoản quản trị và nạp trang nền, 12 lĩnh vực chuyên môn cùng
bộ từ khóa tìm kiếm. Còn một việc chưa nằm trong script vì nó là dữ liệu thật của
doanh nghiệp — chạy khi số điện thoại đã được xác nhận:

```bash
node --import tsx scripts/set-contact.ts --phone "0832270898"
```

Số này đồng thời sinh ra nút gọi, nút Zalo và trường `telephone` trong dữ liệu có
cấu trúc. Đổi số thì sửa ở đây hoặc trong `/admin` > Cài đặt, không sửa trong mã.

Đọc mật khẩu quản trị:

```bash
cat .local/admin-access.txt
```

Đăng nhập `/admin`, **đổi mật khẩu ngay**, rồi xóa tệp đó:

```bash
rm .local/admin-access.txt
```

`scripts/prepare-people.ts` cố ý không nằm trong script cài đặt và **không chạy
trên máy chủ thật** — đó là hồ sơ luật sư minh họa, chỉ dùng để xem trước bố cục
ở máy phát triển.

## Bước 6 — Khởi động lại và kiểm chứng

Bấm **Restart** trong Setup Node.js App, rồi kiểm tra:

```
https://luatvukhang.com/api/health/ready      → {"status":"ready"}
https://luatvukhang.com/vi                    → trang chủ
https://luatvukhang.com/admin                 → đăng nhập được
```

`/api/health/ready` trả 503 nghĩa là ứng dụng chạy nhưng không nối được cơ sở dữ
liệu — kiểm tra lại `DATABASE_URL`.

### Kiểm chứng thư mục ứng dụng không bị phơi ra Internet

Ba lệnh này hỏi máy chủ xem nó có chịu phục vụ những tệp đáng lẽ không ai được
thấy hay không. Dán vào Terminal của cPanel, hoặc chạy ở máy cá nhân:

```bash
curl -sI https://luatvukhang.com/.env | head -1
curl -sI https://luatvukhang.com/.local/law.db | head -1
curl -sI https://luatvukhang.com/.git/config | head -1
```

**Đúng:** cả ba đều trả `HTTP/2 404` (hoặc `403`).

**Sai:** bất kỳ dòng nào trả `HTTP/2 200`. Khi đó dữ liệu khách hàng đang tải về
được từ Internet. Xử lý theo đúng thứ tự này:

1. Trong **Setup Node.js App**, sửa **Application root** sang thư mục ngoài
   `public_html` (xem khung cảnh báo ở Bước 2), rồi **Restart**.
2. Đổi `PAYLOAD_SECRET` sang giá trị mới — giá trị cũ phải coi như đã lộ. Dựng
   lại và Restart.
3. Đổi mật khẩu tài khoản quản trị.
4. Chạy lại ba lệnh trên để xác nhận đã thành 404.

Kho mã có sẵn một tệp `.htaccess` ở thư mục gốc chặn các đường dẫn này. Nó là
lưới an toàn phòng khi điền sai, **không thay thế** việc đặt đúng thư mục: một
số cấu hình máy chủ bỏ qua `.htaccess`, và nó không che được tệp nào nằm ngoài
danh sách.

Nếu đã tải `hosting-source.zip` / `hosting-build.zip` lên hosting, **xóa hai tệp
zip sau khi giải nén xong** — chúng chứa nguyên bộ mã nguồn và không cần giữ lại:

```bash
rm -f ~/luatvukhang/hosting-*.zip
```

## Bước 7 — Ra mắt

Chỉ làm khi `npm run release:check` không còn mục nào bị chặn. Đổi
`SITE_LAUNCH_APPROVED` thành `true`, rồi **dựng lại** (`npm run build`) và
Restart. Chỉ Restart là không đủ: biến này được đọc cả lúc dựng.

## Cập nhật website về sau

Toàn bộ việc này làm được bằng Terminal, không cần đụng vào giao diện cPanel.

Trình tự có ba phần: lấy mã nguồn mới, lấy bản dựng mới, rồi khởi động lại.

**1. Dựng bản mới trên GitHub** (một lần, trên trình duyệt): tab **Actions** →
*Gói bản dựng cho hosting* → **Run workflow**. Chờ khoảng hai phút.

Bước dựng chạy trên máy Linux của GitHub chứ không trên hosting, vì hai lý do:
`npm run build` cần 1–2 GB RAM mà gói dùng chung không cấp đủ, và bản dựng trên
máy Windows không mang sang Linux được — `.next/required-server-files.json`
nhúng đường dẫn tuyệt đối của máy dựng.

**2. Cập nhật trên hosting** (Terminal):

```bash
source ~/nodevenv/luatvukhang/*/bin/activate && cd ~/luatvukhang
git pull
rm -rf .next && curl -fL -o ~/hb.tar.gz https://github.com/Harry-Kien/luatvukhang/releases/latest/download/hosting-build.tar.gz && tar -xzf ~/hb.tar.gz -C ~/luatvukhang && rm -f ~/hb.tar.gz && cat .next/BUILD_ID
node scripts/hosting-setup.mjs --skip-install --skip-build
```

> **Hai cờ `--skip-install --skip-build` là bắt buộc.** Thiếu `--skip-install`
> thì script chạy `npm install`, thiếu `--skip-build` thì nó chạy
> `npm run build` — cả hai đều bị hosting giết vì thiếu bộ nhớ, và lần cài dở
> dang để lại thư mục rỗng trong `node_modules` gây lỗi
> `Cannot find package` về sau.

Chỉ tải lại `node_modules` khi `package.json` đổi phần `dependencies`:

```bash
curl -fL -o ~/nm.tar.gz https://github.com/Harry-Kien/luatvukhang/releases/latest/download/hosting-node-modules.tar.gz
tar -xzf ~/nm.tar.gz -C ~/nodevenv/luatvukhang/22/lib && rm -f ~/nm.tar.gz
```

**3. Khởi động lại bằng Terminal:**

```bash
mkdir -p ~/luatvukhang/tmp && touch ~/luatvukhang/tmp/restart.txt
```

Passenger theo dõi tệp `tmp/restart.txt`; chạm vào nó là tiến trình được nạp
lại ở lần truy cập kế tiếp. Cách này thay hẳn nút **Restart** trong cPanel —
hữu ích vì giao diện đó có lúc báo "Can't acquire lock" hoặc "No such
application" trong khi website vẫn chạy tốt.

Kiểm chứng:

```bash
curl -sI https://luatvukhang.com/api/health/ready | head -1
```

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
  cần cron. Không có cron thì tự tải `.local/law.db` về theo định kỳ — đó là
  toàn bộ dữ liệu, một tệp duy nhất. Tải khi website đang chạy có thể ra bản
  rách; dừng ứng dụng vài giây rồi hẵng tải.
- **Ảnh tải lên nằm ở `media/`** — kiểm tra xem nhà cung cấp có xóa thư mục này
  khi triển khai lại không.

Bốn giới hạn đầu đều biến mất trên VPS. Nếu công ty dự định dùng website làm
kênh tiếp nhận khách hàng thật, riêng điểm thứ nhất — không ai được báo khi có
yêu cầu tư vấn — đã đủ là lý do để chuyển sang VPS.
