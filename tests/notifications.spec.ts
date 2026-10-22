import { test, expect } from "@playwright/test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Email báo yêu cầu tư vấn mới (lib/notifications.ts).
 *
 * Lỗi đã gặp khi rà soát 22/10/2026: hàng đợi còn 63 thông báo của các yêu cầu
 * đã bị xóa; mỗi lượt chỉ xử lý 10 hàng cũ nhất, nên yêu cầu khách vừa gửi phải
 * chờ thêm 7 lượt mới được báo.
 */
type Row = {
  id: number;
  request: { id: number; reference: string } | null;
  status: string;
  createdAt: string;
};

test("thông báo: dọn hàng của yêu cầu đã xóa, báo yêu cầu mới nhất trước, một thư hỏng không dừng cả lượt", async () => {
  // Khóa chống gửi trùng nằm trong SQLite; dùng một tệp tạm riêng cho bài này.
  const dir = mkdtempSync(path.join(tmpdir(), "vk-notify-"));
  process.env.DATABASE_URL =
    "file:" + path.join(dir, "ops.db").replace(/\\/g, "/");
  process.env.NOTIFICATION_EMAIL = "hopthu@example.test";
  const { deliverPendingNotifications } =
    await import("../src/lib/notifications");

  const rows: Row[] = [
    { id: 1, request: null, status: "pending", createdAt: "2026-09-01" },
    {
      id: 2,
      request: { id: 10, reference: "YC-CU" },
      status: "pending",
      createdAt: "2026-10-01",
    },
    {
      id: 3,
      request: { id: 11, reference: "YC-MOI" },
      status: "pending",
      createdAt: "2026-10-22",
    },
  ];
  const sent: string[] = [];
  const fake = {
    async delete({ where }: { where: { request?: { exists?: boolean } } }) {
      if (where.request?.exists === false)
        for (let i = rows.length - 1; i >= 0; i--)
          if (!rows[i].request) rows.splice(i, 1);
    },
    async find({ sort, limit }: { sort: string; limit: number }) {
      const docs = rows
        .filter((row) => row.request && row.status !== "sent")
        .sort((a, b) =>
          sort === "-createdAt"
            ? b.createdAt.localeCompare(a.createdAt)
            : a.createdAt.localeCompare(b.createdAt),
        )
        .slice(0, limit);
      return { docs };
    },
    async sendEmail({ subject }: { subject: string }) {
      // Thư của yêu cầu cũ hỏng (máy chủ thư lỗi tạm thời).
      if (subject.includes("YC-CU")) throw new Error("SMTP tạm lỗi");
      sent.push(subject);
    },
    async update({ id, data }: { id: number; data: { status: string } }) {
      const row = rows.find((candidate) => candidate.id === id);
      if (row) row.status = data.status;
    },
    async count() {
      return { totalDocs: 0 };
    },
  };

  const result = await deliverPendingNotifications(fake as never, {
    limit: 10,
  });

  expect(
    rows.find((row) => row.id === 1),
    "hàng mồ côi bị dọn",
  ).toBeUndefined();
  expect(sent[0], "yêu cầu mới nhất được báo trước").toContain("YC-MOI");
  expect(result).toMatchObject({ locked: true, sent: 1, failed: 1 });
  expect(rows.find((row) => row.id === 2)!.status).toBe("failed");
  expect(rows.find((row) => row.id === 3)!.status).toBe("sent");

  // Lượt sau: khóa đã được trả, thư hỏng còn trong hạn được thử lại.
  const again = await deliverPendingNotifications(fake as never);
  expect(again.locked).toBe(true);
});
