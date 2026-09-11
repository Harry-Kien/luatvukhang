import {
  BodyTooLarge,
  readLimitedBody,
  clientAddress,
} from "@/lib/request-guards";
import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import { operationsPool as pool } from "@/lib/operations-db";
import { consultationSchema } from "@/lib/consultation";
import { getCMS } from "@/lib/cms";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
/** Tăng bộ đếm của một khóa và cho biết đã vượt hạn mức hay chưa. */
async function count(bucket: string, limit: number) {
  const result = await pool.query(
    "INSERT INTO operations.consultation_rate_limits (bucket, count) VALUES ($1, 1) ON CONFLICT (bucket) DO UPDATE SET count = consultation_rate_limits.count + 1 RETURNING count",
    [bucket],
  );
  return result.rows[0].count > limit;
}
/**
 * Các nguồn gửi được chấp nhận.
 *
 * Mặc định là địa chỉ website. Khi website trả lời trên nhiều tên miền — ví dụ
 * cả example.com lẫn www.example.com — hãy liệt kê thêm trong
 * ALLOWED_FORM_ORIGINS, ngăn cách bằng dấu phẩy; nếu không, khách truy cập qua
 * tên miền phụ sẽ bị từ chối mọi yêu cầu tư vấn.
 */
const allowedOrigins = new Set(
  [
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ...(process.env.ALLOWED_FORM_ORIGINS || "").split(","),
  ]
    .map((value) => value.trim().replace(/\/+$/, ""))
    .filter(Boolean),
);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.has(origin.replace(/\/+$/, "")))
    return json({ error: "Nguồn gửi không hợp lệ." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Định dạng không hợp lệ." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return json({ error: "Nội dung quá dài." }, 413);
  let input: unknown;
  try {
    const text = await readLimitedBody(request);
    if (Buffer.byteLength(text) > 16000)
      return json({ error: "Nội dung quá dài." }, 413);
    input = JSON.parse(text);
  } catch (error) {
    if (error instanceof BodyTooLarge)
      return json({ error: "Nội dung quá dài." }, 413);
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
    const cms = await getCMS();
    const idem = createHmac("sha256", process.env.PAYLOAD_SECRET!)
      .update(v.idempotencyKey + v.email.toLowerCase())
      .digest("hex");
    // Kiểm tra trùng trước khi tính hạn mức: người gửi bị mất kết nối rồi thử
    // lại cùng một yêu cầu không được coi là gửi thêm, nếu không họ tự khóa
    // chính mình dù chưa lưu được bản ghi nào.
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
    const minute = Math.floor(Date.now() / 60000);
    // Giới hạn theo từng người gửi, không dùng một bộ đếm chung: nếu chung,
    // một nguồn gửi tự động có thể chiếm hết hạn mức và chặn khách thật.
    const address = clientAddress(request);
    // Không nhận diện được người gửi thì chỉ áp hạn mức chung. Áp hạn mức cá
    // nhân cho toàn bộ lưu lượng gộp một chỗ sẽ chặn nhầm khách thật khi proxy
    // phía trước chưa gắn X-Forwarded-For.
    /**
     * Kiểm tra hạn mức cá nhân TRƯỚC, và chỉ chạm vào bộ đếm chung khi người gửi
     * còn trong hạn mức của mình.
     *
     * Trước đây hai bộ đếm chạy song song, nên bộ đếm chung vẫn tăng cả với
     * những yêu cầu đã bị hạn mức cá nhân chặn: một nguồn gửi tự động chỉ cần
     * 120 yêu cầu mỗi phút là chiếm hết hạn mức chung và chặn mọi khách thật —
     * đúng điều mà đoạn chú thích ngay trên nói là phải tránh.
     */
    let limited = false;
    if (address) {
      const caller = createHmac("sha256", process.env.PAYLOAD_SECRET!)
        .update(address)
        .digest("hex")
        .slice(0, 32);
      limited = await count(`${minute}:${caller}`, 5);
    }
    if (!limited) limited = await count(`${minute}:all`, 120);
    if (limited)
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
