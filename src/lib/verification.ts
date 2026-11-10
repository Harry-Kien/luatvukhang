/**
 * Mã xác minh của Google Search Console / Bing Webmaster Tools nhập trong admin.
 * Người dùng thường dán nguyên thẻ `<meta name="…" content="MÃ" />` vừa sao
 * chép, nên lấy phần content; chỉ giữ ký tự hợp lệ của mã để không chèn được gì
 * khác vào thẻ meta.
 */
export function verificationCode(value?: string | null) {
  const raw = (value ?? "").trim();
  if (!raw) return undefined;
  const fromTag = raw.match(/content\s*=\s*["']([^"']+)["']/i)?.[1] ?? raw;
  const code = fromTag.trim();
  return /^[A-Za-z0-9_\-.=]{8,120}$/.test(code) ? code : undefined;
}
