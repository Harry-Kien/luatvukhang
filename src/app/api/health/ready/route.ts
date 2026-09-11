import { ensureOperationsTable, query } from "@/lib/operations-db";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (!process.env.DATABASE_URL)
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  try {
    await ensureOperationsTable();
    // Đếm xem bốn bảng thiết yếu có mặt đủ chưa. Kết nối được nhưng chưa chạy
    // migration là một trạng thái có thật, và nó phải bị coi là chưa sẵn sàng.
    const result = await query(
      "SELECT COUNT(*) AS found FROM sqlite_master WHERE type = 'table' AND name IN (?, ?, ?, ?)",
      [
        "pages",
        "consultation_requests",
        "notification_outbox",
        "operations_consultation_rate_limits",
      ],
    );
    if (Number(result.rows[0]?.found) !== 4)
      throw new Error("Storage not ready");
    return Response.json({ status: "ready" }, { headers });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
}
