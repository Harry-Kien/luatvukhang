/**
 * Kênh liên hệ trực tiếp dựng từ số điện thoại trong Cài đặt.
 *
 * Số chính tự sinh cả nút gọi lẫn nút Zalo: ở Việt Nam Zalo gắn với chính số
 * thuê bao, nên không có ô Zalo riêng cho số chính. Các số CHỈ để nhắn Zalo
 * nằm ở ô "Số Zalo bổ sung" trong Cài đặt (thêm tháng 10/2026).
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

/** Một dòng của ô "Số Zalo bổ sung" trong Cài đặt. */
export type ZaloNumber = { phone?: string | null } | null | undefined;

/**
 * Các kênh Zalo theo thứ tự hiển thị: số chính trước, rồi các số bổ sung trong
 * Cài đặt. Bỏ số không hợp lệ và số trùng (cùng một thuê bao nhập hai cách).
 */
export function zaloChannels(
  phone?: string | null,
  extra?: ZaloNumber[] | null,
): ContactChannels[] {
  return [phone, ...(extra ?? []).map((item) => item?.phone)]
    .map((number) => contactChannels(number))
    .filter((item): item is ContactChannels => item !== null)
    .filter(
      (item, index, all) =>
        all.findIndex((candidate) => candidate.zalo === item.zalo) === index,
    );
}
