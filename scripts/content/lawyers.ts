/**
 * Hồ sơ luật sư THẬT của công ty, ba ngôn ngữ.
 *
 * Khác với scripts/content/people.ts (hồ sơ minh họa), đây là người thật, nên
 * mọi dòng trong tệp này phải truy được về thông tin do công ty cung cấp.
 *
 * Nguồn: chủ website xác nhận ngày 16/09/2026 — hai luật sư của công ty, trong
 * đó bà Phan Thùy Trang là người đại diện theo pháp luật, giữ chức danh
 * "Giám đốc - Luật sư"; bà Trần Phương Lan Anh là luật sư, trình độ Thạc sĩ Luật.
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
  /**
   * Quyết định thứ tự trên trang Đội ngũ: luật sư trước, nhân sự khác sau.
   * Tách khỏi chức danh vì chức danh là chữ tự do — công ty đặt thêm một chức
   * danh mới thì cách đoán vai trò từ chữ sẽ hỏng.
   */
  role: "lawyer" | "specialist";
  summary: Localised;
  /**
   * Nền tảng nghề nghiệp đã được công ty xác nhận. Hiện ở trang hồ sơ dưới
   * nhãn "Thông tin nghề nghiệp". Chỉ ghi điều công ty đã khẳng định.
   */
  qualifications: Localised;
};

const FIRM = "Công ty Luật TNHH Vũ Khang Solutions & Partners";

/**
 * Địa danh giữ nguyên ở cả ba ngôn ngữ.
 *
 * "Tây Ninh" dịch sang chữ Hán thành 西宁, trùng tên một thành phố Trung Quốc ở
 * Thanh Hải — người đọc tiếng Trung sẽ hiểu sai nơi công tác. Giữ nguyên dạng
 * tiếng Việt như cách website vẫn giữ "Vũ Khang".
 */
export const firmLawyers: FirmLawyer[] = [
  {
    slug: "phan-thuy-trang",
    name: "Phan Thùy Trang",
    role: "lawyer",
    position: {
      vi: "Giám đốc - Luật sư",
      en: "Director & Lawyer",
      // 主任 là cách gọi người đứng đầu một văn phòng/công ty luật trong tiếng
      // Trung, sát nghĩa hơn 董事 (thành viên hội đồng quản trị).
      zh: "主任、律师",
    },
    summary: {
      vi: `Giám đốc, Luật sư và người đại diện theo pháp luật của ${FIRM}. Nguyên Thẩm phán Tòa án khu vực Tây Ninh.`,
      en: `Director, Lawyer and legal representative of ${FIRM}. Former Judge of the Tây Ninh Regional Court.`,
      zh: `${FIRM} 主任、律师、法定代表人。曾任 Tây Ninh 地区法院法官。`,
    },
    qualifications: {
      vi: "Nguyên Thẩm phán Tòa án khu vực Tây Ninh.",
      en: "Former Judge, Tây Ninh Regional Court.",
      zh: "曾任 Tây Ninh 地区法院法官。",
    },
  },
  {
    slug: "tran-phuong-lan-anh",
    name: "Trần Phương Lan Anh",
    role: "lawyer",
    position: { vi: "Luật sư", en: "Lawyer", zh: "律师" },
    summary: {
      vi: `Luật sư của ${FIRM}, trình độ Thạc sĩ Luật. Nguyên Phó Chánh án Tòa án khu vực Nha Trang.`,
      en: `Lawyer at ${FIRM}, holding a Master of Laws. Former Deputy Chief Judge of the Nha Trang Regional Court.`,
      zh: `${FIRM} 律师，法学硕士。曾任 Nha Trang 地区法院副院长。`,
    },
    qualifications: {
      vi: "Thạc sĩ Luật. Nguyên Phó Chánh án Tòa án khu vực Nha Trang.",
      en: "Master of Laws. Former Deputy Chief Judge, Nha Trang Regional Court.",
      zh: "法学硕士。曾任 Nha Trang 地区法院副院长。",
    },
  },
  {
    // Chuyên viên, không phải luật sư. Không dùng chữ "luật sư" ở bất kỳ ô nào
    // của hồ sơ này: gọi sai tư cách hành nghề là sai sự thật, không phải cách
    // nói cho gọn.
    slug: "tran-le-kim-binh",
    name: "Trần Lê Kim Bình",
    role: "specialist",
    position: { vi: "Chuyên viên", en: "Legal Specialist", zh: "法务专员" },
    summary: {
      vi: `Chuyên viên của ${FIRM}, cử nhân luật.`,
      en: `Legal specialist at ${FIRM}, holding a Bachelor of Laws.`,
      zh: `${FIRM} 法务专员，法学学士。`,
    },
    qualifications: {
      vi: "Cử nhân Luật.",
      en: "Bachelor of Laws.",
      zh: "法学学士。",
    },
  },
];
