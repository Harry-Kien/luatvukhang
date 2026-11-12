import { googleBusiness } from "@/lib/local-area";

/**
 * luatvukhang.com/danh-gia → trang "Viết bài đánh giá" trên Google Maps.
 *
 * Vì sao có đường dẫn riêng: mã QR in trên bàn tiếp khách và tin nhắn Zalo gửi
 * khách dùng địa chỉ này. Nếu hồ sơ Google đổi (chuyển văn phòng, tạo lại hồ
 * sơ), chỉ sửa googleBusiness.reviewUrl, không phải in lại QR.
 *
 * 307 (tạm thời) chứ không 308: trình duyệt và công cụ tìm kiếm không ghi nhớ
 * đích cũ khi đích đổi.
 */
export function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: googleBusiness.reviewUrl,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
