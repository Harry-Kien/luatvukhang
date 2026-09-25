/**
 * Đưa khách vào www.<tên miền> về đúng địa chỉ khai ở NEXT_PUBLIC_SITE_URL.
 *
 * Vì sao cần: website trả lời cả trên www lẫn tên miền chính, nhưng biểu mẫu
 * tư vấn chỉ nhận Origin trùng NEXT_PUBLIC_SITE_URL. Khách vào qua www bấm gửi
 * là bị từ chối "Nguồn gửi không hợp lệ" — mất yêu cầu mà không ai hay.
 * Chuyển hướng sửa tận gốc, và cũng gom nội dung trùng cho máy tìm kiếm.
 *
 * Chỉ chuyển www của chính tên miền đó. Mọi tên máy khác — localhost,
 * 127.0.0.1, địa chỉ IP, tên miền tạm — đi qua nguyên vẹn.
 *
 * KHÔNG chuyển http sang https ở đây: máy chủ Next tự gắn
 * `x-forwarded-proto: http` khi máy chủ phía trước không gửi header đó, nên
 * sau LiteSpeed/Passenger mọi lượt HTTPS đều trông như HTTP và sẽ bị chuyển
 * hướng vòng tròn. Ép HTTPS bằng "Force HTTPS Redirect" trong cPanel → Domains.
 */
export function canonicalRedirect(
  siteUrl: string | undefined,
  request: { host: string | null; path: string },
): string | null {
  if (!siteUrl || !request.host) return null;
  let site: URL;
  try {
    site = new URL(siteUrl);
  } catch {
    return null;
  }
  const host = request.host
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  return host === "www." + site.hostname ? site.origin + request.path : null;
}
