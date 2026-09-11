import { createClient, type Client } from "@libsql/client";

/**
 * Kết nối dùng cho các truy vấn vận hành nằm ngoài CMS: đếm hạn mức gửi biểu
 * mẫu và kiểm tra sức khỏe hệ thống.
 *
 * Giữ một kết nối duy nhất trên toàn tiến trình. SQLite là một tệp trên đĩa nên
 * không có khái niệm nhóm kết nối như PostgreSQL; mở nhiều kết nối chỉ làm tăng
 * tranh chấp khóa ghi mà không nhanh hơn.
 */
const scope = globalThis as typeof globalThis & { operationsDb?: Client };
export const operationsDb = (scope.operationsDb ||= createClient({
  url: process.env.DATABASE_URL || "file:./.local/law.db",
}));

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

export async function query(
  sql: string,
  args: (string | number)[] = [],
): Promise<Rows> {
  try {
    return shape(await operationsDb.execute({ sql, args }));
  } catch (error) {
    // Thử lại đúng một lần, và chỉ khi lỗi là thiếu bảng. Mọi lỗi khác ném lên
    // nguyên vẹn để không che mất sự cố thật.
    if (!/no such table/i.test(String((error as Error)?.message ?? "")))
      throw error;
    await operationsDb.execute(CREATE_TABLE);
    return shape(await operationsDb.execute({ sql, args }));
  }
}

/** Dùng khi cần chắc bảng có mặt mà chưa truy vấn gì, ví dụ kiểm tra sức khỏe. */
export async function ensureOperationsTable() {
  await operationsDb.execute(CREATE_TABLE);
}
