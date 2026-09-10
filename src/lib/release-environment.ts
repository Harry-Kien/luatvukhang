/** Pure configuration checks shared with release tooling; never return secret values. */
export function releaseEnvironmentIssues(
  env: Record<string, string | undefined>,
): string[] {
  const issues: string[] = [];
  if (env.NEXT_PUBLIC_DEMO_MODE !== "false") issues.push("Turn off demo mode.");
  if (env.SITE_LAUNCH_APPROVED !== "true")
    issues.push("Publication has not been approved.");
  try {
    const url = new URL(env.NEXT_PUBLIC_SITE_URL || "");
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      /^(localhost|127\.|\[::1\])/.test(url.hostname) ||
      /\.(invalid|example|test|localhost)$/.test(url.hostname)
    )
      throw new Error();
  } catch {
    issues.push(
      "Set a valid HTTPS production origin without credentials, paths or query strings.",
    );
  }
  if (env.NEXT_PUBLIC_SITE_URL?.endsWith("/"))
    issues.push("NEXT_PUBLIC_SITE_URL must not end with a slash.");
  if ((env.PAYLOAD_SECRET?.length || 0) < 32)
    issues.push("Set a strong PAYLOAD_SECRET.");
  if (!env.DATABASE_URL) issues.push("Configure the production database.");
  if (!env.SMTP_HOST || !env.SMTP_FROM || !env.NOTIFICATION_EMAIL)
    issues.push("Configure SMTP_HOST, SMTP_FROM and NOTIFICATION_EMAIL.");
  const port = Number(env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    issues.push("SMTP_PORT must be a valid TCP port.");
  if (env.SMTP_USER && !env.SMTP_PASSWORD)
    issues.push("Set SMTP_PASSWORD when SMTP_USER is configured.");
  if (
    env.NEXT_PUBLIC_ANALYTICS_ID &&
    !/^G-[A-Z0-9]+$/.test(env.NEXT_PUBLIC_ANALYTICS_ID)
  )
    issues.push("Use a valid GA4 measurement ID.");
  return issues;
}
