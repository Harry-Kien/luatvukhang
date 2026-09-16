/**
 * Hồ sơ luật sư THẬT của công ty, ba ngôn ngữ.
 *
 * Khác với scripts/content/people.ts (hồ sơ minh họa), đây là người thật, nên
 * mọi dòng trong tệp này phải truy được về thông tin do công ty cung cấp.
 *
 * Nguồn: chủ website xác nhận ngày 16/09/2026 — hai luật sư của công ty, trong
 * đó bà Phan Thùy Trang là người đại diện theo pháp luật, giữ chức danh Giám
 * đốc; bà Trần Phương Lan Anh là luật sư, trình độ Thạc sĩ Luật.
 *
 * NHỮNG Ô CÒN TRỐNG LÀ CỐ Ý. Số thẻ luật sư, đoàn luật sư, lĩnh vực phụ trách,
 * ngôn ngữ làm việc và ảnh chân dung chưa được cung cấp. Bịa ra một trong số đó
 * là dựng hồ sơ hành nghề sai sự thật trên website công ty luật. Vì vậy các bản
 * ghi nạp ở dạng NHÁP và `release:check` vẫn nhắc cho tới khi công ty nhập đủ.
 */
export type Localised = { vi: string; en: string; zh: string };
export type FirmLawyer = {
  slug: string;
  /** Danh từ riêng: giữ nguyên ở cả ba ngôn ngữ. */
  name: string;
  position: Localised;
  summary: Localised;
};

const FIRM = "Công ty Luật TNHH Vũ Khang Solutions & Partners";

export const firmLawyers: FirmLawyer[] = [
  {
    slug: "phan-thuy-trang",
    name: "Phan Thùy Trang",
    position: {
      vi: "Giám đốc",
      en: "Director",
      // 主任 là cách gọi người đứng đầu một văn phòng/công ty luật trong tiếng
      // Trung, sát nghĩa hơn 董事 (thành viên hội đồng quản trị).
      zh: "主任",
    },
    summary: {
      vi: `Luật sư, Giám đốc và người đại diện theo pháp luật của ${FIRM}.`,
      en: `Lawyer, Director and legal representative of ${FIRM}.`,
      zh: `${FIRM} 律师、主任、法定代表人。`,
    },
  },
  {
    slug: "tran-phuong-lan-anh",
    name: "Trần Phương Lan Anh",
    position: { vi: "Luật sư", en: "Lawyer", zh: "律师" },
    summary: {
      vi: `Luật sư của ${FIRM}, trình độ Thạc sĩ Luật.`,
      en: `Lawyer at ${FIRM}, holding a Master of Laws.`,
      zh: `${FIRM} 律师，法学硕士。`,
    },
  },
];
