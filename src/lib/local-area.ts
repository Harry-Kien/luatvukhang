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
