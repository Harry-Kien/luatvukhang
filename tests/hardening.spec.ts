import { test, expect } from "@playwright/test";
import { canonicalRedirect } from "../src/lib/canonical-host";
import { officeDate, validAppointmentDate } from "../src/lib/appointment-date";
import {
  readLimitedBody,
  BodyTooLarge,
  clientAddress,
} from "../src/lib/request-guards";
import { releaseEnvironmentIssues } from "../src/lib/release-environment";

test("appointment dates reject impossible dates and use the Vietnam calendar day", () => {
  const now = new Date("2026-09-10T18:00:00Z");
  expect(officeDate(now)).toBe("2026-09-11");
  expect(validAppointmentDate("2026-09-10", now)).toBe(false);
  expect(validAppointmentDate("2026-09-11", now)).toBe(true);
  expect(validAppointmentDate("2027-02-29", now)).toBe(false);
  expect(validAppointmentDate("2028-02-29", now)).toBe(true);
  expect(validAppointmentDate("2026-11-31", now)).toBe(false);
  expect(validAppointmentDate("", now)).toBe(true);
});

test("body limit counts UTF-8 bytes and cancels oversized chunked uploads", async () => {
  let cancelled = false;
  const body = new ReadableStream({
    start(c) {
      c.enqueue(new TextEncoder().encode("ữữ"));
    },
    cancel() {
      cancelled = true;
    },
  });
  const request = new Request("https://example.com", {
    method: "POST",
    body,
    duplex: "half",
  } as RequestInit);
  await expect(readLimitedBody(request, 5)).rejects.toBeInstanceOf(
    BodyTooLarge,
  );
  expect(cancelled).toBe(true);
  expect(
    await readLimitedBody(
      new Request("https://example.com", {
        method: "POST",
        body: '{"ok":true}',
      }),
    ),
  ).toBe('{"ok":true}');
});

test("untrusted forwarding headers cannot select the rate limit identity", () => {
  const request = new Request("https://example.com", {
    headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
  });
  expect(clientAddress(request, false)).toBeNull();
  expect(clientAddress(request, true)).toBe("203.0.113.10");
  expect(
    clientAddress(
      new Request("https://example.com", {
        headers: { "x-real-ip": "not-an-ip" },
      }),
      true,
    ),
  ).toBeNull();
});

test("release validation catches misleading origins and incomplete email configuration", () => {
  const env = {
    NEXT_PUBLIC_DEMO_MODE: "false",
    SITE_LAUNCH_APPROVED: "true",
    NEXT_PUBLIC_SITE_URL: "https://luatvukhang.com",
    PAYLOAD_SECRET: "x".repeat(32),
    DATABASE_URL: "configured",
    SMTP_HOST: "smtp.provider.com",
    SMTP_FROM: "office@luatvukhang.com",
    NOTIFICATION_EMAIL: "office@luatvukhang.com",
  };
  expect(releaseEnvironmentIssues(env)).toEqual([]);
  for (const url of [
    "https://localhost",
    "https://example.invalid",
    "https://luatvukhang.com/path",
    "https://user:pass@luatvukhang.com",
  ])
    expect(
      releaseEnvironmentIssues({ ...env, NEXT_PUBLIC_SITE_URL: url }).length,
    ).toBeGreaterThan(0);
  expect(releaseEnvironmentIssues({ ...env, SMTP_FROM: "" })).toContain(
    "Configure SMTP_HOST, SMTP_FROM and NOTIFICATION_EMAIL.",
  );
});

/**
 * Công ty có quyền không dùng email thông báo — nhưng phải nói rõ ra.
 *
 * Cổng phát hành chặn khi thiếu SMTP là đúng: khách gửi yêu cầu mà không ai
 * được báo là hỏng luồng. Nhưng nếu công ty quyết định không dùng email và
 * tự kiểm tra trong CMS, cổng sẽ đỏ vĩnh viễn — và một cổng không bao giờ
 * xanh được thì người vận hành sẽ học cách bỏ qua nó, kể cả những mục khác.
 *
 * Nên có một lối khai báo rõ ràng. Quên cấu hình và cố ý không dùng là hai
 * chuyện khác nhau; chỉ chuyện thứ hai mới được đi tiếp.
 */
test("bỏ email thông báo chỉ được chấp nhận khi khai báo rõ ràng", () => {
  const env = {
    NEXT_PUBLIC_DEMO_MODE: "false",
    SITE_LAUNCH_APPROVED: "true",
    NEXT_PUBLIC_SITE_URL: "https://luatvukhang.com",
    PAYLOAD_SECRET: "x".repeat(32),
    DATABASE_URL: "configured",
  };
  // Quên cấu hình: vẫn chặn.
  expect(releaseEnvironmentIssues(env)).toContain(
    "Configure SMTP_HOST, SMTP_FROM and NOTIFICATION_EMAIL.",
  );
  // Khai báo rõ là không dùng: đi tiếp được.
  expect(
    releaseEnvironmentIssues({ ...env, EMAIL_NOTIFICATIONS_DISABLED: "true" }),
  ).toEqual([]);
  // Giá trị mập mờ không tính là khai báo.
  for (const value of ["false", "1", "yes", ""])
    expect(
      releaseEnvironmentIssues({
        ...env,
        EMAIL_NOTIFICATIONS_DISABLED: value,
      }),
    ).toContain("Configure SMTP_HOST, SMTP_FROM and NOTIFICATION_EMAIL.");
});

/**
 * Thông tin pháp nhân: cái nào chặn phát hành, cái nào chỉ nhắc.
 *
 * Khách cần biết công ty tên gì, ở đâu, gọi và gửi thư vào đâu — thiếu một
 * trong những thứ đó thì website chưa dùng được, nên chúng chặn.
 *
 * Thông tin đăng ký hoạt động là tín hiệu xác minh, đáng có với một công ty
 * luật nhưng không phải thứ khiến website ngừng hoạt động. Để nó chặn thì cổng
 * phát hành đỏ vĩnh viễn với công ty chọn không công bố — và một cổng không bao
 * giờ xanh được thì người vận hành học cách bỏ qua nó, kể cả những mục khác.
 */
test("thiếu thông tin liên hệ thì chặn, thiếu đăng ký hoạt động thì chỉ nhắc", async () => {
  const { releaseSettingsIssues } =
    await import("../src/lib/release-environment");
  const full = {
    companyName: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    englishName: "VU KHANG SOLUTIONS & PARTNERS LAW COMPANY LIMITED",
    phone: "0832270898",
    address: "1808 đường Nguyễn Ái Quốc, phường Trấn Biên, Thành phố Đồng Nai",
    email: "luatvukhang@gmail.com",
    registration: "Giấy ĐKHĐ số 123",
  };
  expect(releaseSettingsIssues(full)).toEqual({ issues: [], warnings: [] });

  // Thiếu đăng ký hoạt động: đi tiếp được, nhưng phải nhắc.
  const noRegistration = releaseSettingsIssues({ ...full, registration: "" });
  expect(noRegistration.issues).toEqual([]);
  expect(noRegistration.warnings.length).toBe(1);

  // Thiếu bất kỳ thông tin liên hệ nào: chặn.
  for (const field of [
    "companyName",
    "englishName",
    "phone",
    "address",
    "email",
  ] as const)
    expect(
      releaseSettingsIssues({ ...full, [field]: "" }).issues.length,
      `thiếu ${field} phải chặn phát hành`,
    ).toBe(1);
});

test("www chuyển về đúng địa chỉ website, tên máy khác đi qua nguyên vẹn", () => {
  const site = "https://luatvukhang.com";
  const go = (host: string | null) =>
    canonicalRedirect(site, { host, path: "/vi/contact?x=1" });

  expect(go("www.luatvukhang.com")).toBe(
    "https://luatvukhang.com/vi/contact?x=1",
  );
  expect(go("WWW.luatvukhang.com:443")).toBe(
    "https://luatvukhang.com/vi/contact?x=1",
  );

  // Tên miền chính không bị chuyển — kể cả khi Next tự gắn
  // x-forwarded-proto: http sau LiteSpeed, nên không có vòng chuyển hướng.
  for (const host of [
    "luatvukhang.com",
    "localhost:3000",
    "127.0.0.1:3000",
    "10.0.0.5",
    "evil.example",
    null,
  ])
    expect(go(host), String(host)).toBeNull();
  expect(
    canonicalRedirect(undefined, { host: "www.x.com", path: "/" }),
  ).toBeNull();
});

test("khách chưa đăng nhập đọc danh sách tài khoản bị từ chối, không làm sập API", async ({
  request,
}) => {
  const response = await request.get("/api/users?limit=1");
  expect(response.status()).toBe(403);
});
