import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import {operationsPool as pool} from "@/lib/operations-db";
import { consultationSchema } from "@/lib/consultation";
import { getCMS } from "@/lib/cms";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
/**
 * Địa chỉ người gửi sau proxy. Chỉ lấy IP đầu tiên trong X-Forwarded-For, là
 * phần do proxy tin cậy ghi; các phần sau có thể do người gửi tự đặt.
 * Không có header nào thì trả về null: chỉ áp hạn mức chung, xem POST bên dưới.
 */
function clientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}
/** Tăng bộ đếm của một khóa và cho biết đã vượt hạn mức hay chưa. */
async function count(bucket: string, limit: number) {
  const result = await pool.query(
    "INSERT INTO operations.consultation_rate_limits (bucket, count) VALUES ($1, 1) ON CONFLICT (bucket) DO UPDATE SET count = consultation_rate_limits.count + 1 RETURNING count",
    [bucket],
  );
  return result.rows[0].count > limit;
}
export async function POST(request: Request) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (request.headers.get("origin") !== origin)
    return json({ error: "Nguồn gửi không hợp lệ." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Định dạng không hợp lệ." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return json({ error: "Nội dung quá dài." }, 413);
  let input: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 16000)
      return json({ error: "Nội dung quá dài." }, 413);
    input = JSON.parse(text);
  } catch {
    return json({ error: "Dữ liệu gửi không hợp lệ." }, 400);
  }
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success)
    return json(
      {
        error:
          "Kiểm tra họ tên, email, ngày mong muốn, mô tả (15–3.000 ký tự) và ô đồng ý.",
        fields: parsed.error.flatten().fieldErrors,
      },
      422,
    );
  if (!process.env.DATABASE_URL)
    return json(
      {
        error:
          "Hệ thống tiếp nhận chưa được cấu hình. Yêu cầu chưa được lưu; dữ liệu bạn nhập vẫn được giữ.",
      },
      503,
    );
  const v = parsed.data;
  try {
    const minute = Math.floor(Date.now() / 60000);
    // Giới hạn theo từng người gửi, không dùng một bộ đếm chung: nếu chung,
    // một nguồn gửi tự động có thể chiếm hết hạn mức và chặn khách thật.
    const address = clientAddress(request);
    // Không nhận diện được người gửi thì chỉ áp hạn mức chung. Áp hạn mức cá
    // nhân cho toàn bộ lưu lượng gộp một chỗ sẽ chặn nhầm khách thật khi proxy
    // phía trước chưa gắn X-Forwarded-For.
    const buckets = [count(`${minute}:all`, 120)];
    if (address) {
      const caller = createHmac("sha256", process.env.PAYLOAD_SECRET!)
        .update(address)
        .digest("hex")
        .slice(0, 32);
      buckets.push(count(`${minute}:${caller}`, 5));
    }
    const limited = await Promise.all(buckets);
    if (limited.some(Boolean))
      return json(
        {
          error:
            "Hệ thống đang nhận nhiều yêu cầu. Vui lòng thử lại sau một phút.",
        },
        429,
      );
    // Dọn bộ đếm cũ theo xác suất, tránh bảng phình vô hạn mà không cần cron.
    if (Math.random() < 0.02)
      await pool
        .query(
          "DELETE FROM operations.consultation_rate_limits WHERE split_part(bucket, ':', 1) ~ '^[0-9]+$' AND split_part(bucket, ':', 1)::bigint < $1",
          [minute - 60],
        )
        .catch(() => undefined);
    const cms = await getCMS();
    const idem = createHmac("sha256", process.env.PAYLOAD_SECRET!)
      .update(v.idempotencyKey + v.email.toLowerCase())
      .digest("hex");
    const existing = await cms.find({
      collection: "consultation-requests",
      where: { idempotencyKey: { equals: idem } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs.length)
      return json({
        reference: existing.docs[0].reference,
        status: "received",
      });
    const transactionID = await cms.db.beginTransaction();
    if (!transactionID) throw new Error("Transaction unavailable");
    try {
      const record = await cms.create({
        collection: "consultation-requests",
        req: { transactionID },
        data: {
          reference: "YC-" + randomBytes(6).toString("hex").toUpperCase(),
          idempotencyKey: idem,
          name: v.name,
          email: v.email.toLowerCase(),
          phone: v.phone,
          service: v.service,
          message: v.message,
          language: v.language,
          preferredDate: v.preferredDate || undefined,
          consentAt: new Date().toISOString(),
          status: "received",
        },
      });
      await cms.create({
        collection: "notification-outbox",
        req: { transactionID },
        data: { request: record.id, status: "pending" },
      });
      await cms.db.commitTransaction(transactionID);
      return json({ reference: record.reference, status: "received" }, 201);
    } catch (error) {
      await cms.db.rollbackTransaction(transactionID);
      const duplicate = await cms.find({
        collection: "consultation-requests",
        where: { idempotencyKey: { equals: idem } },
        limit: 1,
        depth: 0,
      });
      if (duplicate.docs.length)
        return json({
          reference: duplicate.docs[0].reference,
          status: "received",
        });
      throw error;
    }
  } catch {
    return json(
      {
        error:
          "Chưa lưu được yêu cầu. Vui lòng thử lại; thông tin bạn nhập vẫn được giữ.",
      },
      503,
    );
  }
}
