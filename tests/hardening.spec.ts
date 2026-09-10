import { test, expect } from "@playwright/test";
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
