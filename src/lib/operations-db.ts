import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Kết nối dùng cho các truy vấn vận hành nằm ngoài CMS: đếm hạn mức gửi biểu
 * mẫu và kiểm tra sức khỏe hệ thống.
 *
 * Giữ một kết nối duy nhất trên toàn tiến trình. SQLite là một tệp trên đĩa nên
 * không có khái niệm nhóm kết nối như PostgreSQL; mở nhiều kết nối chỉ làm tăng
 * tranh chấp khóa ghi mà không nhanh hơn.
 */
const scope = globalThis as typeof globalThis & {
  operationsDb?: Client;
  operationsDbReady?: Promise<void>;
};

/**
 * Tạo client ở lần dùng đầu tiên, không phải lúc nạp module.
 *
 * `createClient` mở tệp ngay, nên tạo ở cấp module sẽ chạy cả trong `next build`
 * — lúc đó thư mục chứa cơ sở dữ liệu thường chưa có, và bước dựng hỏng với một
 * lỗi chẳng liên quan gì tới việc đang dựng.
 */
function db(): Client {
  if (scope.operationsDb) return scope.operationsDb;
  const url = process.env.DATABASE_URL || "file:./.local/law.db";
  // Thư mục phải có trước: SQLite không tự tạo đường dẫn.
  if (url.startsWith("file:"))
    mkdirSync(dirname(url.replace(/^file:/, "")), { recursive: true });
  const client = createClient({ url });
  /**
   * `busy_timeout` là thiết lập của TỪNG kết nối, không nằm trong tệp như chế
   * độ nhật ký: đặt ở adapter của Payload không che được kết nối này. Mặc định
   * là 0 — gặp khóa ghi là hỏng ngay, và bộ đếm hạn mức ghi ngay trước khi CMS
   * lưu yêu cầu tư vấn, nên hai lượt ghi ấy va nhau là chuyện bình thường.
   *
   * Không `await` được ở đây vì `db()` phải trả về client ngay; giữ lời hứa
   * lại để `query()` chờ trước câu lệnh đầu tiên.
   */
  scope.operationsDbReady = client
    .execute("PRAGMA busy_timeout = 5000")
    .then(() => undefined);
  return (scope.operationsDb = client);
}

/**
 * Bảng đếm hạn mức tự tạo lại khi thiếu.
 *
 * Trên PostgreSQL bảng này nằm trong schema riêng nên Payload không bao giờ
 * chạm tới. SQLite không có schema: bảng nằm chung với bảng của CMS, và cơ chế
 * đồng bộ lược đồ của Payload xóa mọi bảng nó không biết — điều này xảy ra mỗi
 * lần chạy một script quản trị ở chế độ phát triển.
 *
 * Ở production cơ chế đó tắt nên bảng không bị đụng tới. Nhưng tự phục hồi vẫn
 * đáng giá: mất bảng này chỉ biểu hiện ra ngoài bằng kiểm tra sức khỏe trả 503,
 * một triệu chứng chẳng nói gì về nguyên nhân.
 */
const CREATE_TABLE =
  "CREATE TABLE IF NOT EXISTS operations_consultation_rate_limits " +
  "(bucket TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)";

/** Kết quả tối giản, đủ cho hai chỗ đang dùng. */
export type Rows = { rows: Record<string, unknown>[]; rowsAffected: number };

const shape = (result: { rows: unknown[]; rowsAffected: number }): Rows => ({
  rows: result.rows as Record<string, unknown>[],
  rowsAffected: result.rowsAffected,
});

/** Lấy client và chờ `busy_timeout` có hiệu lực trước câu lệnh đầu tiên. */
async function ready(): Promise<Client> {
  const client = db();
  // Đặt được thì tốt, không đặt được cũng không chặn việc chính: mất
  // `busy_timeout` chỉ làm mất phần chờ, còn truy vấn vẫn chạy như trước.
  await scope.operationsDbReady?.catch(() => undefined);
  return client;
}

export async function query(
  sql: string,
  args: (string | number)[] = [],
): Promise<Rows> {
  try {
    return shape(await (await ready()).execute({ sql, args }));
  } catch (error) {
    // Thử lại đúng một lần, và chỉ khi lỗi là thiếu bảng. Mọi lỗi khác ném lên
    // nguyên vẹn để không che mất sự cố thật.
    if (!/no such table/i.test(String((error as Error)?.message ?? "")))
      throw error;
    await db().execute(CREATE_TABLE);
    return shape(await db().execute({ sql, args }));
  }
}

/** Dùng khi cần chắc bảng có mặt mà chưa truy vấn gì, ví dụ kiểm tra sức khỏe. */
export async function ensureOperationsTable() {
  await (await ready()).execute(CREATE_TABLE);
}
