import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID, randomBytes } from "node:crypto";
test("CMS roles, language isolation, drafts, revisions and reception", async ({
  request,
  page,
}) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  expect(login.ok()).toBeTruthy();
  const adminToken = (await login.json()).token;
  const auth = (token: string) => ({ Authorization: "JWT " + token });
  const users: { id: number; token: string; role: string }[] = [];
  const created: { collection: string; id: number }[] = [];
  try {
    for (const role of ["editor", "reviewer", "publisher", "reception"]) {
      const email = role + "-" + randomUUID() + "@example.invalid";
      const secret = randomBytes(20).toString("hex");
      const create = await request.post("/api/users", {
        headers: auth(adminToken),
        data: { name: "QA " + role, email, password: secret, role },
      });
      expect(create.ok()).toBeTruthy();
      const u = (await create.json()).doc;
      created.push({ collection: "users", id: u.id });
      const signed = await request.post("/api/users/login", {
        data: { email, password: secret },
      });
      users.push({ id: u.id, role, token: (await signed.json()).token });
    }
    const user = (role: string) => users.find((u) => u.role === role)!;
    const key = "qa-" + randomUUID();
    const draft = await request.post("/api/services?draft=true", {
      headers: auth(user("editor").token),
      data: {
        title: "QA kiểm thử nháp",
        slug: key,
        translationKey: key,
        language: "vi",
        summary: "Dữ liệu kiểm thử tự động sẽ được xóa.",
        _status: "draft",
      },
    });
    expect(draft.ok()).toBeTruthy();
    const doc = (await draft.json()).doc;
    created.push({ collection: "services", id: doc.id });
    const anon = await request.get("/api/services/" + doc.id);
    expect(anon.status()).toBe(404);
    const forbidden = await request.patch("/api/services/" + doc.id, {
      headers: auth(user("editor").token),
      data: { _status: "published" },
    });
    expect(forbidden.ok()).toBeFalsy();
    const approve = await request.patch(
      "/api/services/" + doc.id + "?draft=true",
      {
        headers: auth(user("reviewer").token),
        data: { reviewState: "approved", _status: "draft" },
      },
    );
    expect(approve.ok()).toBeTruthy();
    const publish = await request.patch("/api/services/" + doc.id, {
      headers: auth(user("publisher").token),
      data: { reviewState: "approved", _status: "published" },
    });
    expect(publish.ok()).toBeTruthy();
    expect((await request.get("/api/services/" + doc.id)).ok()).toBeTruthy();
    await page.goto("/en/services/" + key);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Page not found",
    );
    const revise = await request.patch(
      "/api/services/" + doc.id + "?draft=true",
      {
        headers: auth(user("editor").token),
        data: { title: "QA thay đổi chưa công bố", _status: "draft" },
      },
    );
    expect(revise.ok()).toBeTruthy();
    const live = await request.get("/api/services/" + doc.id);
    expect((await live.json()).title).toBe("QA kiểm thử nháp");
    await page.goto("/vi/services/" + key + "?preview=true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Không tìm thấy",
    );
    await page
      .context()
      .addCookies([
        {
          name: "payload-token",
          value: adminToken,
          url: "http://localhost:3000",
        },
      ]);
    await page.goto("/vi/services/" + key + "?preview=true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "QA thay đổi chưa công bố",
    );
    await page.context().clearCookies();
    const revisions = await request.get(
      "/api/services/versions?where[parent][equals]=" + doc.id,
      { headers: auth(adminToken) },
    );
    expect(revisions.ok()).toBeTruthy();
    const versions = (await revisions.json()).docs;
    expect(versions.length).toBeGreaterThan(1);
    const original = versions.find(
      (v: any) => v.version.title === "QA kiểm thử nháp",
    );
    const restored = await request.post(
      "/api/services/versions/" + original.id,
      { headers: auth(adminToken) },
    );
    expect(restored.ok()).toBeTruthy();
    const renamed = await request.patch("/api/services/" + doc.id, {
      headers: auth(adminToken),
      data: {
        slug: key + "-new",
        reviewState: "approved",
        _status: "published",
      },
    });
    expect(renamed.ok()).toBeTruthy();
    await page.goto("/vi/services/" + key);
    await expect(page).toHaveURL(new RegExp(key + "-new$"));
    const redirects = await request.get(
      "/api/redirects?where[from][contains]=" + key,
      { headers: auth(adminToken) },
    );
    for (const r of (await redirects.json()).docs)
      created.push({ collection: "redirects", id: r.id });
    const cannotRead = await request.get("/api/consultation-requests", {
      headers: auth(user("editor").token),
    });
    expect(cannotRead.status()).toBe(403);
    const cannotEscalate = await request.patch(
      "/api/users/" + user("editor").id,
      { headers: auth(user("editor").token), data: { role: "admin" } },
    );
    if (cannotEscalate.ok())
      expect((await cannotEscalate.json()).doc.role).toBe("editor");
    const body = {
      name: "QA tiếng Việt",
      email: "qa@example.invalid",
      phone: "",
      service: "Kiểm thử",
      message: "Đây là dữ liệu kiểm thử tự động, không phải khách hàng thật.",
      consent: true,
      language: "vi",
      website: "",
      preferredDate: "",
      idempotencyKey: randomUUID(),
    };
    const first = await request.post("/api/consultation", {
      headers: { origin: "http://localhost:3000" },
      data: body,
    });
    expect(first.status()).toBe(201);
    const accepted = await first.json();
    const second = await request.post("/api/consultation", {
      headers: { origin: "http://localhost:3000" },
      data: body,
    });
    expect((await second.json()).reference).toBe(accepted.reference);
    const inbox = await request.get(
      "/api/consultation-requests?where[reference][equals]=" +
        accepted.reference,
      { headers: auth(user("reception").token) },
    );
    const requests = await inbox.json();
    expect(requests.totalDocs).toBe(1);
    const requestId = requests.docs[0].id;
    const outbox = await request.get(
      "/api/notification-outbox?where[request][equals]=" + requestId,
      { headers: auth(adminToken) },
    );
    for (const o of (await outbox.json()).docs)
      created.push({ collection: "notification-outbox", id: o.id });
    created.push({ collection: "consultation-requests", id: requestId });
    const badConfirm = await request.patch(
      "/api/consultation-requests/" + requestId,
      { headers: auth(user("reception").token), data: { status: "confirmed" } },
    );
    expect(badConfirm.ok()).toBeFalsy();
  } finally {
    for (const doc of created.reverse())
      await request.delete("/api/" + doc.collection + "/" + doc.id, {
        headers: auth(adminToken),
      });
  }
});
test("admin login opens a real CMS dashboard", async ({ page }) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  await page.goto("/admin/login");
  await page.locator('input[name="email"]').fill("admin@local.invalid");
  await page
    .locator('input[name="password"]')
    .fill(credentials.match(/Password: (.+)/)![1].trim());
  await page.locator('button[type="submit"]').click();
  await expect(
    page.getByRole("heading", { name: "Tổng quan công việc" }),
  ).toBeVisible();
  await page.screenshot({
    path: "artifacts/admin-desktop.png",
    fullPage: true,
  });
});
