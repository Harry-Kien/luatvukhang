/**
 * Kênh liên hệ trực tiếp dựng từ một số điện thoại duy nhất trong Cài đặt.
 *
 * Không thêm trường riêng cho Zalo: ở Việt Nam Zalo gắn với chính số thuê bao,
 * nên tách thành hai trường chỉ tạo ra khả năng hai nơi lệch nhau mà không ai
 * phát hiện. Đổi số trong Cài đặt là cả nút gọi lẫn nút Zalo đổi theo.
 */
export type ContactChannels = {
  /** Giữ nguyên cách công ty nhập để hiển thị. */
  display: string;
  /** Dạng E.164 cho liên kết tel: — bấm gọi được từ nước ngoài. */
  tel: string;
  /** zalo.me dùng số nội địa, không dấu cộng. */
  zalo: string;
};
/**
 * Trả về null khi chưa có số hợp lệ, để giao diện ẩn hẳn nút thay vì hiện một
 * liên kết gọi đến số rỗng.
 */
export function contactChannels(phone?: string | null): ContactChannels | null {
  if (!phone) return null;
  const cleaned = phone.replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/\D/g, "");
  // Số Việt Nam có 9–10 chữ số sau mã quốc gia; ngắn hơn là nhập thiếu.
  if (digits.length < 9 || digits.length > 12) return null;
  const local = cleaned.startsWith("+84")
    ? "0" + digits.slice(2)
    : digits.startsWith("84") && digits.length > 10
      ? "0" + digits.slice(2)
      : digits.startsWith("0")
        ? digits
        : "0" + digits;
  return {
    display: phone.trim(),
    tel: "+84" + local.slice(1),
    zalo: "https://zalo.me/" + local,
  };
}
