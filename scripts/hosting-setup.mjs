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
import { readFileSync } from "node:fs";

try {
  process.loadEnvFile();
} catch {
  // Biến môi trường khai trong bảng điều khiển hosting là bình thường.
}

const REQUIRED_ENV = [
  ["DATABASE_URL", "chuỗi kết nối PostgreSQL"],
  ["PAYLOAD_SECRET", "64 ký tự ngẫu nhiên"],
  ["NEXT_PUBLIC_SITE_URL", "https://tên-miền-của-bạn"],
];

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

if (!/^postgresql:\/\//.test(process.env.DATABASE_URL || ""))
  fail(
    "DATABASE_URL phải bắt đầu bằng postgresql:// — hệ thống chạy PostgreSQL, không phải MySQL.",
  );
console.log("    Biến môi trường — đủ");

// --- Cài phụ thuộc -----------------------------------------------------------
if (process.argv.includes("--skip-install"))
  say("Bỏ qua cài phụ thuộc theo yêu cầu (--skip-install)");
else {
  say("Cài phụ thuộc (npm ci) — bước này lâu nhất");
  // Giữ cả phụ thuộc phát triển: các script quản trị chạy bằng tsx nằm trong đó.
  run("npm", ["ci"]);
}

// --- Lược đồ cơ sở dữ liệu ---------------------------------------------------
say("Kiểm tra kết nối tới PostgreSQL");
/**
 * Thử kết nối trước khi gọi migrate. Payload thất bại ở đây sẽ đổ ra hàng chục
 * dòng stack trace mà dòng quan trọng nhất — ECONNREFUSED — nằm lẫn ở giữa và
 * không nói cho người đọc biết phải làm gì.
 */
{
  const { default: pgMod } = await import("pg");
  const probe = new pgMod.Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10_000,
  });
  const target = (() => {
    try {
      const parsed = new URL(process.env.DATABASE_URL);
      return `${parsed.hostname}:${parsed.port || 5432}${parsed.pathname}`;
    } catch {
      return "(DATABASE_URL sai định dạng)";
    }
  })();
  try {
    await probe.connect();
    await probe.end();
    console.log(`    Kết nối được tới ${target}`);
  } catch (error) {
    const hints = {
      ECONNREFUSED: [
        `Không có gì đang lắng nghe ở ${target}.`,
        "",
        "    Nghĩa là PostgreSQL không chạy ở địa chỉ đó. Ba khả năng:",
        "      1. Gói hosting không có PostgreSQL — chỉ có MySQL. Kiểm tra trong",
        "         cPanel xem có mục 'PostgreSQL Databases' không.",
        "      2. Có PostgreSQL nhưng nằm ở máy chủ khác, không phải 127.0.0.1.",
        "         Hỏi nhà cung cấp địa chỉ và cổng thật.",
        "      3. Dùng PostgreSQL bên ngoài (Neon, Supabase) — sửa DATABASE_URL",
        "         trỏ sang đó.",
        "",
        "    MySQL KHÔNG thay thế được: toàn bộ dữ liệu chạy trên PostgreSQL.",
      ],
      ENOTFOUND: [
        `Không phân giải được tên máy chủ trong ${target}.`,
        "    Kiểm tra lại phần sau dấu @ trong DATABASE_URL.",
      ],
      ETIMEDOUT: [
        `Kết nối tới ${target} hết giờ.`,
        "    Thường do tường lửa chặn kết nối ra ngoài cổng 5432.",
        "    Hỏi nhà cung cấp xem hosting có cho kết nối ra ngoài không.",
      ],
      "28P01": [
        "Sai tên đăng nhập hoặc mật khẩu cơ sở dữ liệu.",
        "    cPanel tự thêm tiền tố tài khoản vào tên user và tên database —",
        "    dùng đúng tên đầy đủ cPanel hiển thị, không phải tên bạn gõ.",
      ],
      "3D000": [
        "Cơ sở dữ liệu không tồn tại.",
        "    Tạo trong cPanel > PostgreSQL Databases, rồi gán user với quyền",
        "    ALL PRIVILEGES.",
      ],
    };
    fail(
      (hints[error.code] || [`Không kết nối được: ${error.message}`]).join(
        String.fromCharCode(10),
      ),
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
const { default: pg } = await import("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  await pool.query(readFileSync("scripts/init-rate-limit.sql", "utf8"));
  console.log("    Xong");
} finally {
  await pool.end();
}

// --- Dựng bản production -----------------------------------------------------
say("Dựng bản production (npm run build) — cần khoảng 1–2 GB RAM");
try {
  run("npm", ["run", "build"]);
} catch {
  fail(
    "Bước dựng bị dừng. Nguyên nhân thường gặp nhất là hosting không đủ RAM.\n" +
      "    Cách đi vòng: dựng ở máy cá nhân rồi tải thư mục .next lên —\n" +
      "    node scripts/make-hosting-bundle.mjs --with-build",
  );
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
