import { getPayload } from "payload";
import config from "../src/payload.config";
if (!process.env.NOTIFICATION_EMAIL || !process.env.SMTP_HOST)
  throw new Error("Configure NOTIFICATION_EMAIL and SMTP first.");
const payload = await getPayload({ config });
// A PostgreSQL advisory lock ensures only one dispatcher claims pending messages.
const client = await payload.db.pool.connect();
try {
  const lock = await client.query(
    "SELECT pg_try_advisory_lock(981710) AS locked",
  );
  if (!lock.rows[0].locked) process.exitCode = 0;
  else {
    const pending = await payload.find({
      collection: "notification-outbox",
      where: { status: { equals: "pending" } },
      depth: 1,
      limit: 50,
    });
    for (const row of pending.docs) {
      const request = row.request as any;
      try {
        await payload.sendEmail({
          to: process.env.NOTIFICATION_EMAIL,
          subject: "Yêu cầu tư vấn mới: " + request.reference,
          text:
            "Có yêu cầu tư vấn mới. Mở trang quản trị để xem và xử lý: " +
            process.env.NEXT_PUBLIC_SITE_URL +
            "/admin/collections/consultation-requests/" +
            request.id,
        });
        await payload.update({
          collection: "notification-outbox",
          id: row.id,
          data: { status: "sent" },
        });
      } catch {
        process.exitCode = 1;
        await payload.update({
          collection: "notification-outbox",
          id: row.id,
          data: { status: "failed" },
        });
        console.error(
          "Notification delivery failed; see outbox. No client data logged.",
        );
      }
    }
  }
} finally {
  try {
    await client.query("SELECT pg_advisory_unlock(981710)");
  } finally {
    client.release();
    await payload.destroy();
  }
}
// Preserve a failure exit code for the hosting scheduler.
