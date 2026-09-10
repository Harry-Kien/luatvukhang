import { operationsPool } from "@/lib/operations-db";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (!process.env.DATABASE_URL)
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  try {
    const result = await operationsPool.query(
      "SELECT to_regclass('public.pages') IS NOT NULL AND to_regclass('public.consultation_requests') IS NOT NULL AND to_regclass('public.notification_outbox') IS NOT NULL AND to_regclass('operations.consultation_rate_limits') IS NOT NULL AS ready",
    );
    if (!result.rows[0]?.ready) throw new Error("Storage not ready");
    return Response.json({ status: "ready" }, { headers });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
}
