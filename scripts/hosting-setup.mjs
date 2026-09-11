/**
 * Cài đặt website trên hosting bằng một lệnh duy nhất.
 *
 *   node scripts/hosting-setup.mjs
 *   node scripts/hosting-setup.mjs --skip-install
 *
 * Chạy đúng thứ tự: kiểm tra môi trường → cài phụ thuộc → tạo lược đồ cơ sở dữ
 * liệu → dựng bản production → tạo tài khoản quản trị → nạp nội dung nền.
 *
 * Vì sao gom lại: chuỗi này có thứ tự bắt buộc (dựng bản build trước khi tạo
 * lược đồ thì hỏng, nạp nội dung trước khi có tài khoản quản trị cũng hỏng), và
 * mỗi lệnh lại phải chạy trong đúng môi trường Node của hosting. Gõ tay mười
 * lệnh là mười cơ hội sai thứ tự, mà lỗi chỉ lộ ra ở lệnh sau cùng.
 *
 * Chạy lại được nhiều lần: các bước đều bỏ qua việc đã làm xong. Hỏng ở bước
 * sau rồi chạy lại thì `--skip-install` bỏ qua `npm ci` — bước lâu nhất và
 * không cần làm lại khi phụ thuộc đã cài xong.
 *
 * KHÔNG dùng tệp này trên VPS — ở đó làm theo docs/DEPLOY-VPS.md để kiểm soát
 * từng bước.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path, { join } from "node:path";

try {
  process.loadEnvFile();
} catch {
  // Biến môi trường khai trong bảng điều khiển hosting là bình thường.
}

const REQUIRED_ENV = [
  ["DATABASE_URL", "đường dẫn tệp SQLite, ví dụ file:./.local/law.db"],
  ["PAYLOAD_SECRET", "64 ký tự ngẫu nhiên"],
  ["NEXT_PUBLIC_SITE_URL", "https://tên-miền-của-bạn"],
];

/**
 * Thông báo dùng chung cho cả bước cài phụ thuộc lẫn bước dựng bản build.
 *
 * SIGKILL nghĩa là hệ điều hành giết tiến trình, không phải lệnh tự lỗi — trên
 * hosting dùng chung gần như luôn là vượt trần bộ nhớ. Stack trace của Node ở
 * trường hợp này không nói gì hữu ích, nên thay hẳn bằng việc cần làm.
 */
const OUT_OF_MEMORY = `Tien trinh bi he dieu hanh giet (SIGKILL) — gan nhu chac chan la vuot tran bo nho.

    Day la gioi han cua goi hosting, khong phai loi ma nguon. Ba huong xu ly:

    1. Xem tran bo nho hien tai, roi hoi nha cung cap co nang duoc khong:
         cat /sys/fs/cgroup/memory.max 2>/dev/null || ulimit -v
       Can khoang 2 GB cho buoc dung ban build.

    2. Dung san o may ca nhan roi tai len — khong can dung tren hosting:
         (tren may ca nhan)  npm run build
         (tren may ca nhan)  node scripts/make-hosting-bundle.mjs --with-build
       Tai ca hai tep zip len, giai nen, roi chay lai lenh nay voi --skip-install
       va --skip-build.

    3. Chuyen sang VPS — xem docs/DEPLOY-VPS.md.`;

let step = 0;
const say = (message) => console.log(`\n[${++step}] ${message}`);
const fail = (message) => {
  console.error("\nDUNG LAI: " + message);
  process.exit(1);
};
/**
 * Hosting chạy Linux, nhưng người bàn giao thường chạy thử trên máy Windows
 * trước — và ở đó `npm` là `npm.cmd`, thứ mà Node từ chối spawn trực tiếp kể từ
 * bản vá CVE-2024-27980. Không xử lý thì lỗi hiện ra trông y hệt lỗi cấu hình
 * hosting và sẽ bị chẩn đoán nhầm. Tham số ở đây đều là chuỗi đơn giản nên đi
 * qua shell không có rủi ro trích dẫn.
 */
const viaShell = process.platform === "win32";
const run = (command, args, options = {}) =>
  execFileSync(command, args, {
    stdio: "inherit",
    env: process.env,
    // Chỉ cần shell cho npm; gọi node thì không, nên tránh được cảnh báo về
    // việc truyền tham số qua shell.
    shell: viaShell && command === "npm",
    ...options,
  });

// --- Kiểm tra môi trường trước khi làm bất cứ việc gì ------------------------
say("Kiểm tra môi trường");

const major = Number(process.versions.node.split(".")[0]);
if (major < 20)
  fail(
    `Node.js ${process.versions.node} quá cũ. Cần bản 20 trở lên.\n` +
      "Đổi trong cPanel > Setup Node.js App > Node.js version.",
  );
console.log(`    Node.js ${process.versions.node} — đạt`);

const missing = REQUIRED_ENV.filter(([name]) => !process.env[name]);
if (missing.length)
  fail(
    "Thiếu biến môi trường:\n" +
      missing.map(([n, hint]) => `      ${n}  (${hint})`).join("\n") +
      "\n    Khai trong cPanel > Setup Node.js App > Environment variables.",
  );

if ((process.env.PAYLOAD_SECRET || "").length < 32)
  fail(
    "PAYLOAD_SECRET ngắn hơn 32 ký tự. Sinh chuỗi mới bằng: openssl rand -hex 32",
  );

if (!/^file:/.test(process.env.DATABASE_URL || ""))
  fail(
    "DATABASE_URL phải bắt đầu bằng file: — hệ thống chạy SQLite." +
      String.fromCharCode(10) +
      "    Ví dụ: file:./.local/law.db",
  );
console.log("    Biến môi trường — đủ");

// Đường dẫn tương đối phụ thuộc thư mục làm việc của tiến trình. Máy chủ web và
// một lệnh chạy tay từ thư mục khác sẽ mở HAI tệp khác nhau, và triệu chứng là
// "dữ liệu vừa nhập tự nhiên biến mất" — rất khó lần ra.
if (/^file:[.]/.test(process.env.DATABASE_URL))
  console.warn(
    "    Canh bao: DATABASE_URL dung duong dan tuong doi. Nen doi sang duong dan" +
      String.fromCharCode(10) +
      "    tuyet doi de moi tien trinh mo dung mot tep, vi du:" +
      String.fromCharCode(10) +
      "      file:" +
      join(process.cwd(), ".local", "law.db").split("\\").join("/"),
  );

if (process.argv.includes("--skip-install"))
  say("Bỏ qua cài phụ thuộc theo yêu cầu (--skip-install)");
else {
  say("Cài phụ thuộc (npm ci) — bước này lâu nhất");
  try {
    /**
     * Giảm mức tiêu thụ bộ nhớ hết mức có thể: hosting dùng chung đặt trần bộ
     * nhớ cho mỗi tiến trình, và npm mặc định tải song song rất nhiều luồng.
     *
     * Giữ cả phụ thuộc phát triển — các script quản trị chạy bằng tsx, và
     * `next build` cần typescript, cả hai đều nằm trong nhóm đó.
     */
    run("npm", [
      "ci",
      "--no-audit",
      "--no-fund",
      "--maxsockets",
      "3",
      "--prefer-offline",
    ]);
  } catch (error) {
    if (error.signal === "SIGKILL") fail(OUT_OF_MEMORY);
    throw error;
  }
}

// --- Lược đồ cơ sở dữ liệu ---------------------------------------------------
say("Kiểm tra ghi được tệp cơ sở dữ liệu");
/**
 * SQLite là một tệp trên đĩa: lỗi hay gặp không phải "không kết nối được" mà là
 * "không có quyền ghi vào thư mục". Kiểm tra trước để báo đúng việc cần làm.
 */
{
  const target = process.env.DATABASE_URL.replace(/^file:/, "");
  const folder = path.dirname(target);
  try {
    mkdirSync(folder, { recursive: true });
    const probe = join(folder, ".write-probe");
    writeFileSync(probe, "x");
    unlinkSync(probe);
    console.log(`    Ghi được vào ${folder}`);
  } catch (error) {
    fail(
      `Không ghi được vào thư mục ${folder} (${error.code || error.message}).
    Cơ sở dữ liệu SQLite là một tệp, nên thư mục chứa nó phải ghi được.
    Kiểm tra quyền thư mục, hoặc đổi DATABASE_URL sang chỗ khác trong
    thư mục ứng dụng.`,
    );
  }
}

say("Tạo lược đồ cơ sở dữ liệu");
/**
 * Đặt hạn giờ. Trên cơ sở dữ liệu mới tinh lệnh này chạy thẳng, nhưng nếu cơ sở
 * dữ liệu từng bị Payload đẩy lược đồ ở chế độ dev thì nó dừng lại hỏi một câu
 * xác nhận có nguy cơ mất dữ liệu — và đứng chờ gõ phím vô hạn. Trên hosting
 * không có bàn phím: không có hạn giờ thì việc cài đặt treo mà không rõ vì sao.
 *
 * Cố ý không tự trả lời "có": câu hỏi đó cảnh báo mất dữ liệu, và đó là quyết
 * định của người vận hành chứ không phải của một script cài đặt.
 */
try {
  run("node", ["node_modules/payload/bin.js", "migrate"], { timeout: 180_000 });
} catch (error) {
  if (error.signal === "SIGTERM" || error.status === null)
    fail(
      `Lệnh tạo lược đồ không kết thúc sau 3 phút.
    Gần như chắc chắn Payload đang chờ trả lời một câu hỏi xác nhận. Câu đó
    chỉ xuất hiện khi cơ sở dữ liệu từng được đẩy lược đồ ở chế độ dev.

    Cơ sở dữ liệu production phải là một cơ sở dữ liệu TRỐNG. Hãy tạo mới
    một database, trỏ DATABASE_URL sang đó rồi chạy lại.

    Nếu cố ý migrate trên cơ sở dữ liệu đã có dữ liệu: chạy tay lệnh dưới
    đây trong terminal có bàn phím và tự trả lời — SAU KHI đã sao lưu.
      node node_modules/payload/bin.js migrate`,
    );
  throw error;
}

say("Tạo bảng hạn mức gửi biểu mẫu");
// Dùng pg thay vì psql: hosting dùng chung thường không cài công cụ dòng lệnh
// của PostgreSQL, còn pg thì đã là phụ thuộc của chính ứng dụng.
const { createClient } = await import("@libsql/client");
const db = createClient({ url: process.env.DATABASE_URL });
await db.execute(readFileSync("scripts/init-rate-limit.sql", "utf8"));
console.log("    Xong");

// --- Dựng bản production -----------------------------------------------------
if (process.argv.includes("--skip-build"))
  say("Bỏ qua dựng bản build theo yêu cầu (--skip-build)");
else {
  say("Dựng bản production (npm run build) — cần khoảng 1–2 GB RAM");
  try {
    run("npm", ["run", "build"]);
  } catch (error) {
    // Hết bộ nhớ và lỗi dựng thật cần hai lời khuyên khác nhau, nhưng cả hai
    // đều đi tiếp được bằng cách dựng ở máy cá nhân.
    fail(
      error.signal === "SIGKILL"
        ? OUT_OF_MEMORY
        : "Bước dựng thất bại. Xem thông báo phía trên để biết nguyên nhân." +
            String.fromCharCode(10) +
            "    Nếu không rõ, dựng ở máy cá nhân rồi tải lên:" +
            String.fromCharCode(10) +
            "      node scripts/make-hosting-bundle.mjs --with-build",
    );
  }
}

// --- Tài khoản quản trị và nội dung nền --------------------------------------
say("Tạo tài khoản quản trị (bỏ qua nếu đã có người dùng)");
run("node", ["--import", "tsx", "scripts/bootstrap.ts"]);

say("Nạp nội dung nền — chạy lại không tạo bản trùng");
for (const script of [
  "prepare-pages.ts",
  "prepare-practice-areas.ts",
  "prepare-keywords.ts",
  "prepare-page-content.ts",
]) {
  console.log(`    ${script}`);
  run("node", ["--import", "tsx", `scripts/${script}`]);
}
// prepare-people.ts cố ý không nằm trong danh sách: đó là hồ sơ minh họa, không
// thuộc về một máy chủ thật.

console.log(
  "\n" +
    "=".repeat(70) +
    "\nCAI DAT XONG.\n\n" +
    "Tiep theo:\n" +
    "  1. Bam Restart trong cPanel > Setup Node.js App.\n" +
    '  2. Mo <ten-mien>/api/health/ready — phai thay {"status":"ready"}.\n' +
    "  3. Doc mat khau quan tri trong .local/admin-access.txt,\n" +
    "     dang nhap /admin, DOI MAT KHAU NGAY, roi xoa tep do.\n" +
    "  4. Nhap thong tin cong ty trong /admin > Cai dat.\n\n" +
    "Website dang chan Google (SITE_LAUNCH_APPROVED=false). Do la chu y.\n" +
    "Chi tiet: docs/DEPLOY-HOSTING-CPANEL.md\n" +
    "=".repeat(70),
);
