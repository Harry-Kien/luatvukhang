import { test, expect, type APIRequestContext } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

async function adminToken(request: APIRequestContext) {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  return (await login.json()).token as string;
}

/** Gửi một yêu cầu thật qua đúng endpoint công khai. */
async function submit(request: APIRequestContext) {
  const date = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  const response = await request.post("/api/consultation", {
    headers: { Origin: "http://localhost:3000" },
    data: {
      name: "QA Tiep Nhan",
      email: `qa-intake-${randomUUID()}@local.invalid`,
      phone: "0832270898",
      service: "Hợp đồng & thương mại",
      message: "Yeu cau kiem thu quy trinh tiep nhan tu dau den cuoi.",
      consent: true,
      language: "vi",
      website: "",
      idempotencyKey: randomUUID(),
      preferredDate: date,
    },
  });
  expect(response.ok(), await response.text()).toBeTruthy();
  return (await response.json()).reference as string;
}

/**
 * Một yêu cầu phải có người phụ trách và hạn theo dõi.
 *
 * Công ty đã chọn không dùng email thông báo, nên không ai được báo tự động.
 * Khi đó thứ duy nhất giữ cho yêu cầu không rơi là: ai đó đứng tên, và có một
 * ngày phải liên hệ lại. Thiếu hai ô này thì ba người cùng nhìn một danh sách
 * mà không ai biết việc nào của mình.
 */
test("yêu cầu tư vấn giao được cho người phụ trách và đặt được hạn theo dõi", async ({
  request,
}) => {
  const headers = { Authorization: "JWT " + (await adminToken(request)) };
  const reference = await submit(request);
  const found = await (
    await request.get(
      `/api/consultation-requests?where[reference][equals]=${reference}&depth=0`,
      { headers },
    )
  ).json();
  const id = found.docs[0].id;
  const me = await (await request.get("/api/users/me", { headers })).json();

  try {
    const followUpAt = new Date(Date.now() + 2 * 864e5).toISOString();
    const updated = await request.patch(`/api/consultation-requests/${id}`, {
      headers,
      data: { assignedTo: me.user.id, followUpAt, status: "contacting" },
    });
    expect(updated.ok(), await updated.text()).toBeTruthy();
    const doc = (await updated.json()).doc;
    expect(doc.assignedTo, "thiếu ô người phụ trách").toBeTruthy();
    expect(doc.followUpAt, "thiếu ô hạn theo dõi").toBeTruthy();
  } finally {
    await request.delete(`/api/consultation-requests/${id}`, { headers });
  }
});

/**
 * Đóng một yêu cầu phải nói rõ vì sao.
 *
 * "Đã đóng" mà không có lý do thì sau một năm công ty không biết mình mất khách
 * vì báo giá, vì ngoài phạm vi, hay vì không ai gọi lại. Đó là khác biệt giữa
 * một danh sách và một hệ thống học được từ chính nó.
 */
test("không đóng được yêu cầu nếu chưa nêu kết quả", async ({ request }) => {
  const headers = { Authorization: "JWT " + (await adminToken(request)) };
  const reference = await submit(request);
  const found = await (
    await request.get(
      `/api/consultation-requests?where[reference][equals]=${reference}&depth=0`,
      { headers },
    )
  ).json();
  const id = found.docs[0].id;

  try {
    const withoutOutcome = await request.patch(
      `/api/consultation-requests/${id}`,
      { headers, data: { status: "closed" } },
    );
    expect(
      withoutOutcome.ok(),
      "đóng mà không nêu kết quả thì phải bị từ chối",
    ).toBeFalsy();

    const withOutcome = await request.patch(
      `/api/consultation-requests/${id}`,
      { headers, data: { status: "closed", outcome: "engaged" } },
    );
    expect(withOutcome.ok(), await withOutcome.text()).toBeTruthy();
  } finally {
    await request.delete(`/api/consultation-requests/${id}`, { headers });
  }
});

/**
 * Bảng tổng quan phải chỉ ra yêu cầu đã quá hạn theo dõi.
 *
 * Đặt hạn liên hệ lại mà không có chỗ nào hiện cái đã quá hạn thì cái hạn đó
 * chỉ là một ô ngày trong hồ sơ. Không có email thông báo, bảng tổng quan là
 * màn hình đầu tiên người tiếp nhận thấy mỗi ngày — nó phải nói ngay việc gì
 * đang trễ.
 */
test("bảng tổng quan đếm yêu cầu đã quá hạn theo dõi", async ({
  page,
  request,
}) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const headers = { Authorization: "JWT " + (await adminToken(request)) };
  const reference = await submit(request);
  const found = await (
    await request.get(
      `/api/consultation-requests?where[reference][equals]=${reference}&depth=0`,
      { headers },
    )
  ).json();
  const id = found.docs[0].id;

  try {
    // Hạn đặt ở quá khứ: đây chính là việc đang trễ.
    const overdue = new Date(Date.now() - 3 * 864e5).toISOString();
    const patched = await request.patch(`/api/consultation-requests/${id}`, {
      headers,
      data: { followUpAt: overdue, status: "contacting" },
    });
    expect(patched.ok(), await patched.text()).toBeTruthy();

    await page.goto("/admin/login");
    await page.locator('input[name="email"]').fill("admin@local.invalid");
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await expect(
      page.getByRole("heading", { name: "Tổng quan công việc" }),
    ).toBeVisible();
    await expect(
      page.locator("body"),
      "bảng tổng quan không nhắc yêu cầu quá hạn theo dõi",
    ).toContainText("quá hạn");
  } finally {
    await request.delete(`/api/consultation-requests/${id}`, { headers });
  }
});
