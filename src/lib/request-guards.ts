import { isIP } from "node:net";
export class BodyTooLarge extends Error {}
/** Stop reading as soon as the limit is exceeded, including chunked requests. */
export async function readLimitedBody(
  request: Request,
  maxBytes = 16000,
): Promise<string> {
  if (Number(request.headers.get("content-length") || 0) > maxBytes)
    throw new BodyTooLarge();
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new BodyTooLarge();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}
/** Enable only behind an ingress that overwrites client-supplied forwarding headers. */
export function clientAddress(
  request: Request,
  trusted = process.env.TRUST_PROXY_HEADERS === "true",
): string | null {
  if (!trusted) return null;
  const value = (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    ""
  ).trim();
  return isIP(value) ? value : null;
}
