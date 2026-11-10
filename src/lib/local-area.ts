import type { Locale } from "./content";

/**
 * Khu vực văn phòng, nói theo cách người tìm luật sư vẫn gõ vào Google.
 *
 * Phường Trấn Biên được hợp nhất từ sáu phường trung tâm TP. Biên Hòa cũ (Bửu
 * Long, Quang Vinh, Trung Dũng, Thống Nhất, Hiệp Hòa, An Bình — Nghị quyết
 * 1662/NQ-UBTVQH15 năm 2025); Đồng Nai lên thành phố năm 2026. "Biên Hòa" không
 * còn là đơn vị hành chính nhưng vẫn là từ khóa khu vực được tìm nhiều nhất
 * ("luật sư Biên Hòa"), nên nêu cả hai — đúng sự thật, không thêm nơi công ty
 * không có văn phòng.
 *
 * Dùng ở trang Liên hệ, llms.txt / llms-full.txt và mô tả tổ chức trong JSON-LD.
 * Văn phòng chuyển địa chỉ thì sửa cả ở đây.
 */
export const officeArea: Record<Locale, string> = {
  vi: "khu trung tâm Biên Hòa cũ (phường Trấn Biên), thành phố Đồng Nai",
  en: "central Biên Hòa (Trấn Biên ward), Đồng Nai, Vietnam",
  zh: "越南同奈边和中心区（Trấn Biên 坊）",
};

/**
 * Cụm ngắn đặt ngay sau địa chỉ đầy đủ (địa chỉ đã có tên phường và thành
 * phố), để không lặp "phường Trấn Biên, thành phố Đồng Nai" hai lần.
 */
export const officeLandmark: Record<Locale, string> = {
  vi: "khu trung tâm Biên Hòa cũ",
  en: "central Biên Hòa",
  zh: "边和中心区",
};

/**
 * Hồ sơ Google Maps (Google Business Profile) của công ty, đọc từ Google ngày
 * 10/11/2026: mã địa điểm, ghim bản đồ và giờ mở cửa đang đăng trên hồ sơ.
 *
 * Website nêu đúng những gì hồ sơ đã công bố, để Google thấy hai nơi khớp
 * nhau (tên, địa chỉ, tọa độ, giờ). Đổi giờ hoặc chuyển văn phòng trên Google
 * thì sửa cả ở đây và ô "Giờ làm việc" trong admin.
 */
export const googleBusiness = {
  placeId: "ChIJXQb_MwDfdDERizSudCgVdLE",
  /** Trang "Viết bài đánh giá" của Google cho đúng hồ sơ này. */
  reviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJXQb_MwDfdDERizSudCgVdLE",
  geo: { latitude: 10.9563297, longitude: 106.820579 },
  /** Hồ sơ đăng 08:00–19:00 cả bảy ngày. */
  hours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "19:00",
  },
} as const;

/**
 * Hồ sơ Google của văn phòng ở địa chỉ này, hoặc `undefined` khi địa chỉ trong
 * Cài đặt đã đổi sang nơi khác — khi đó không nêu tọa độ, giờ hay nút đánh giá
 * của văn phòng cũ.
 */
export function googleBusinessFor(address?: string | null) {
  return /1808\s+(đường\s+)?Nguyễn Ái Quốc/i.test((address ?? "").normalize("NFC"))
    ? googleBusiness
    : undefined;
}
