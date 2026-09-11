/**
 * Đóng gói bộ mã nguồn đầy đủ để tải lên hosting.
 *
 *   node scripts/make-hosting-bundle.mjs
 *   node scripts/make-hosting-bundle.mjs --with-build
 *
 * Vì sao cần: nhà cung cấp hosting đã một lần báo "bộ mã nguồn chưa đầy đủ
 * thông tin/cấu hình cần thiết". Nguyên nhân thường gặp là kéo thả bằng File
 * Manager làm rơi mất tệp bắt đầu bằng dấu chấm hoặc thư mục con. Gói này dựng
 * từ danh sách tệp Git đang theo dõi nên không phụ thuộc vào thao tác tay, và
 * tự kiểm tra lại trước khi kết thúc.
 *
 * `--with-build` đính kèm cả thư mục `.next` đã dựng sẵn, dùng khi hosting
 * không đủ RAM để chạy `npm run build`. Nhớ dựng bằng đúng các biến
 * NEXT_PUBLIC_* của production, vì chúng được nhúng vào lúc dựng.
 *
 * Gói KHÔNG chứa .env, .local/ và media/ — bí mật và dữ liệu không đi qua tệp
 * nén. Khai biến môi trường trong bảng điều khiển của hosting.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const withBuild = process.argv.includes("--with-build");
const outDir = ".local";
const sourceZip = path.join(outDir, "hosting-source.zip");
const buildZip = path.join(outDir, "hosting-build.zip");

/** Thiếu bất kỳ tệp nào dưới đây là hosting sẽ không chạy được. */
const REQUIRED = [
  "package.json",
  "package-lock.json",
  "next.config.mjs",
  "postcss.config.mjs",
  "tsconfig.json",
  "server.js",
  "src/payload.config.ts",
  "src/app/(payload)/admin/importMap.js",
  "scripts/bootstrap.ts",
  "scripts/init-rate-limit.sql",
];

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 << 20 });
}

const dirty = git("status", "--porcelain").trim();
if (dirty)
  console.warn(
    "Canh bao: cay lam viec con thay doi chua commit. Goi chi chua nhung gi da\n" +
      "commit, nen thay doi moi nhat co the khong nam trong do.\n",
  );

fs.mkdirSync(outDir, { recursive: true });

// Dựng từ danh sách tệp Git theo dõi: đúng bằng bộ mã nguồn, không kèm
// node_modules, .next, .env, .local hay media.
execFileSync("git", ["archive", "--format=zip", "-o", sourceZip, "HEAD"], {
  stdio: "inherit",
});

// Tự kiểm tra: đọc lại danh sách tệp trong kho và đối chiếu, để lỗi "thiếu tệp"
// lộ ra ở đây chứ không phải sau khi đã tải lên hosting.
const tracked = new Set(
  git("ls-files")
    .split("\n")
    .map((f) => f.trim()),
);
const missing = REQUIRED.filter((file) => !tracked.has(file));
if (missing.length) {
  console.error("\nTHIEU TEP BAT BUOC:\n  " + missing.join("\n  "));
  process.exit(1);
}

const size = (file) =>
  (fs.statSync(file).size / 1024 / 1024).toFixed(1) + " MB";
console.log(
  `\nMa nguon: ${sourceZip} (${size(sourceZip)}), ${tracked.size} tep.`,
);

if (withBuild) {
  if (!fs.existsSync(".next")) {
    console.error("Chua co thu muc .next. Chay `npm run build` truoc.");
    process.exit(1);
  }
  /**
   * Bỏ `.next/cache` và `.next/dev` ra khỏi gói.
   *
   * `cache` là bộ nhớ đệm của quá trình dựng, không cần để chạy — nhưng nó
   * chiếm phần lớn dung lượng: đo trên dự án này là 1,2 GB đệm so với 76 MB
   * thật sự cần. Nén cả vào thì gói phình gấp hơn mười lăm lần và việc tải lên
   * hosting trở thành bất khả thi.
   *
   * `dev` chỉ sinh ra khi chạy chế độ phát triển và chứa liên kết tượng trưng,
   * thứ không chép được trên Windows nếu không có quyền quản trị.
   */
  const SKIP = new Set(["cache", "dev"]);
  /**
   * KHÔNG bỏ qua liên kết tượng trưng — phải chép nội dung thật của chúng.
   *
   * Turbopack đặt trong `.next/node_modules` các liên kết mang tên có mã băm,
   * ví dụ `pino-28069d5257187539`, và mã đã dựng gọi đúng tên đó. Bỏ chúng đi
   * thì máy chủ khởi động được nhưng mọi trang trả về lỗi 500 với thông báo
   * "Cannot find module" — đã đo đúng như vậy trước khi sửa.
   *
   * `dereference` chép nội dung đích thay vì tạo lại liên kết, nên gói giải nén
   * ra là thư mục thật, chạy được ở mọi hệ điều hành.
   */
  const staging = path.join(outDir, "build-upload");
  await fs.promises.rm(staging, { recursive: true, force: true });
  await fs.promises.cp(".next", path.join(staging, ".next"), {
    recursive: true,
    dereference: true,
    filter: (source) => !source.split(path.sep).some((part) => SKIP.has(part)),
  });
  if (process.platform === "win32")
    execFileSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `Compress-Archive -Path '${staging}/.next' -DestinationPath '${buildZip}' -Force`,
      ],
      { stdio: "inherit" },
    );
  else
    execFileSync("zip", ["-qr", path.resolve(buildZip), ".next"], {
      cwd: staging,
      stdio: "inherit",
    });
  await fs.promises.rm(staging, { recursive: true, force: true });
  console.log(
    `Ban dung san: ${buildZip} (${size(buildZip)}), da bo .next/cache.`,
  );
}

console.log(
  "\nCac buoc tiep theo:\n" +
    `  1. Tai ${sourceZip} len hosting roi giai nen vao thu muc ung dung.\n` +
    (withBuild
      ? `  2. Tai ${buildZip} len va giai nen cung cho, de khoi phai build tren hosting.\n`
      : "  2. Chay npm ci roi npm run build tren hosting.\n") +
    "  3. Khai bien moi truong trong Setup Node.js App (KHONG tai .env len).\n" +
    "  4. Dat Application startup file la server.js.\n" +
    "\nChi tiet tung buoc: docs/DEPLOY-HOSTING-CPANEL.md",
);
