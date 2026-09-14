import { query } from "./operations-db";

/**
 * Tăng bộ đếm của một khóa và cho biết đã vượt hạn mức hay chưa. Bảng dùng
 * chung với biểu mẫu tư vấn; khóa nên gồm cửa sổ thời gian và danh tính.
 */
export async function overLimit(bucket: string, limit: number) {
  const result = await query(
    "INSERT INTO operations_consultation_rate_limits (bucket, count) VALUES (?, 1) " +
      "ON CONFLICT (bucket) DO UPDATE SET count = operations_consultation_rate_limits.count + 1 " +
      "RETURNING count",
    [bucket],
  );
  return Number(result.rows[0].count) > limit;
}
