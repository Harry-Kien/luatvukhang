/**
 * Kênh liên hệ trực tiếp dựng từ số điện thoại trong Cài đặt.
 *
 * Cài đặt → "Điện thoại và Zalo" có ba phần sửa riêng được: số nút Gọi (ô
 * phone), Zalo 1 (ô zaloPrimary — để trống thì dùng luôn số nút Gọi, vì ở Việt
 * Nam Zalo gắn với số thuê bao) và Zalo 2, Zalo 3… (ô zaloNumbers).
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

/** Phần Cài đặt quyết định các nút gọi và Zalo. */
export type ZaloSettings =
  | {
      phone?: string | null;
      zaloPrimary?: string | null;
      zaloNumbers?: ZaloNumber[] | null;
    }
  | null
  | undefined;

/** Số Zalo 1: ô "Zalo 1"; để trống thì dùng số nút Gọi. */
export function mainZalo(settings: ZaloSettings): string | null {
  return settings?.zaloPrimary?.trim() || settings?.phone?.trim() || null;
}

/** Mọi số Zalo theo thứ tự hiển thị: Zalo 1 rồi Zalo 2, Zalo 3… */
export function zaloNumbersOf(settings: ZaloSettings): ZaloNumber[] {
  return [{ phone: mainZalo(settings) }, ...(settings?.zaloNumbers ?? [])];
}

/**
 * Các kênh Zalo theo thứ tự hiển thị: số đầu (Zalo 1) trước, rồi các số bổ
 * sung. Bỏ số không hợp lệ và số trùng (cùng một thuê bao nhập hai cách).
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

const INVALID_NUMBER =
  "Số không hợp lệ — nhập 9 đến 12 chữ số, ví dụ 0977013358 hoặc +84 977 013 358.";

/**
 * Ô "Số điện thoại — nút Gọi" và ô "Zalo 1" trong admin: để trống được, có
 * nhập thì phải là số hợp lệ.
 */
export function validateMainPhone(value: unknown): true | string {
  if (typeof value !== "string" || !value.trim()) return true;
  return contactChannels(value) ? true : INVALID_NUMBER;
}

/**
 * Một dòng Zalo 2, Zalo 3…: phải là số hợp lệ, không trùng Zalo 1 và không
 * trùng dòng khác — cùng một thuê bao nhập hai cách ("0976894548" và
 * "+84 976 894 548") cũng tính là trùng. `firstZalo` là số Zalo 1 (mainZalo).
 */
export function validateExtraZalo(
  value: unknown,
  firstZalo?: string | null,
  rows?: ZaloNumber[] | null,
): true | string {
  const channel = contactChannels(typeof value === "string" ? value : null);
  if (!channel) return INVALID_NUMBER;
  if (contactChannels(firstZalo)?.zalo === channel.zalo)
    return "Số này trùng Zalo 1 ở trên — không cần nhập lại.";
  const same = (rows ?? []).filter(
    (row) => contactChannels(row?.phone)?.zalo === channel.zalo,
  ).length;
  return same > 1 ? "Số này đã có ở một dòng Zalo khác." : true;
}
