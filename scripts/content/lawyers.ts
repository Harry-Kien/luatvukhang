/**
 * Hồ sơ luật sư THẬT của công ty, ba ngôn ngữ.
 *
 * Khác với scripts/content/people.ts (hồ sơ minh họa), đây là người thật, nên
 * mọi dòng trong tệp này phải truy được về thông tin do công ty cung cấp.
 *
 * Nguồn:
 *   - 16/09/2026: chủ website xác nhận hai luật sư, trong đó bà Phan Thùy Trang
 *     là người đại diện theo pháp luật, chức danh "Giám đốc - Luật sư".
 *   - 07/10/2026: chủ website gửi thông tin chi tiết và ảnh chân dung của bốn
 *     người. Thông tin của bà Trang lấy từ ảnh giới thiệu bà gửi kèm; ảnh đó do
 *     một công ty luật khác làm, nên chỉ lấy dữ kiện nghề nghiệp của cá nhân bà
 *     (nguyên Thẩm phán, đoàn luật sư, số năm kinh nghiệm, lĩnh vực) — không lấy
 *     tên công ty, số điện thoại, email hay khẩu hiệu trên ảnh.
 *
 *   - 21/10/2026: lĩnh vực phụ trách của bà Lan Anh.
 *
 * NHỮNG Ô CÒN TRỐNG LÀ CỐ Ý. Số thẻ luật sư, đoàn luật sư của bà Lan Anh, lĩnh
 * vực của chị Anh Như, ngôn ngữ làm việc chưa được cung cấp. Bịa
 * ra một trong số đó là dựng hồ sơ hành nghề sai sự thật trên website công ty
 * luật.
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
  /**
   * Khối và thứ tự trên trang Đội ngũ (lib/people-order.ts: TEAMS). Chỉ điền
   * vào hồ sơ CHƯA có — từ 22/10/2026 công ty tự đổi trong admin, lần cài đặt
   * sau không ghi đè.
   */
  team?: "leadership" | "lawyers" | "legal" | "clients" | "operations";
  sortOrder?: number;
  summary: Localised;
  /**
   * Nền tảng nghề nghiệp đã được công ty xác nhận. Hiện ở trang hồ sơ dưới
   * nhãn "Thông tin nghề nghiệp". Chỉ ghi điều công ty đã khẳng định — chưa
   * có thì bỏ trống, trang hồ sơ không hiện mục này.
   */
  qualifications?: Localised;
  /**
   * Mô tả trên kết quả tìm kiếm, tối đa 160 ký tự (Google cắt phần dư). Bỏ trống
   * thì dùng tóm tắt — chỉ khi tóm tắt đủ ngắn.
   */
  seoDescription?: Localised;
  /**
   * Lĩnh vực người này phụ trách, theo slug trong practice-areas.ts. Hiện thành
   * "Chuyên môn liên quan" trên trang hồ sơ, nhãn lĩnh vực trên thẻ ở trang
   * Đội ngũ và bộ lọc theo lĩnh vực. Chỉ gán khi công ty đã nêu.
   */
  services?: string[];
  /**
   * Công ty đã quyết định đưa người này lên website: hồ sơ được tạo thẳng ở
   * trạng thái xuất bản. Chỉ có tác dụng khi TẠO MỚI — hồ sơ công ty đã gỡ
   * xuống sẽ không bị lần triển khai sau tự đăng lại.
   */
  publishOnCreate?: boolean;
  /**
   * Ảnh chân dung do công ty cung cấp, đặt trong scripts/content/portraits/.
   * Cắt sẵn tỉ lệ 4:5 — đúng khung ảnh ở trang Đội ngũ và trang hồ sơ, để
   * object-fit không tự cắt mất đỉnh đầu. `rights` ghi nguồn gốc quyền dùng ảnh
   * vào ô bắt buộc của thư viện ảnh.
   */
  portrait?: {
    file: string;
    alt: string;
    credit: string;
    rights: string;
    /**
     * Tên tệp của các bản ảnh trước đây. Hồ sơ đang dùng một trong các tệp này
     * được đổi sang `file`; hồ sơ dùng ảnh khác (công ty tự chọn) thì giữ.
     */
    replaces?: string[];
    /**
     * Mô tả ảnh (alt) từng nạp cho chính tệp `file`. Ảnh trong thư viện còn
     * đúng một mô tả cũ thì được đổi sang `alt`; mô tả công ty tự sửa thì giữ.
     */
    previousAlts?: string[];
  };
};

const FIRM = "Công ty Luật TNHH Vũ Khang Solutions & Partners";
/**
 * Bộ ảnh bán thân chủ website gửi ngày 10/10/2026, thay cho ảnh thẻ chụp cận
 * trước đó. Cả bốn tấm cắt theo một chuẩn — khung 4:5, đỉnh đầu cách mép trên
 * 9%, đầu chiếm 35,5% chiều cao, mép dưới dừng ngang eo phía trên bàn tay,
 * phông trắng đều — để mắt và cằm của bốn người thẳng hàng trên trang Đội ngũ.
 */
const PROVIDED_1010 =
  "Chủ website cung cấp ngày 10/10/2026 để đăng trên hồ sơ tại website công ty.";
/**
 * Ảnh nhân sự phòng Phát triển khách hàng gửi ngày 21/10/2026, cắt theo cùng
 * chuẩn trên. Riêng ảnh ông Hoàng Vũ giơ ngón cái ngang ngực: khung dừng ngay
 * trên ngón tay, nên đầu chiếm khoảng 42% thay vì 35,5%.
 */
const PROVIDED_1021 =
  "Chủ website cung cấp ngày 21/10/2026 để đăng trên hồ sơ tại website công ty.";
const PROVIDED_1022 =
  "Chủ website cung cấp ngày 22/10/2026 để đăng trên hồ sơ tại website công ty.";

/**
 * Địa danh giữ nguyên ở cả ba ngôn ngữ.
 *
 * "Tây Ninh" dịch sang chữ Hán thành 西宁, trùng tên một thành phố Trung Quốc ở
 * Thanh Hải — người đọc tiếng Trung sẽ hiểu sai nơi công tác. Giữ nguyên dạng
 * tiếng Việt như cách website vẫn giữ "Vũ Khang". Riêng 胡志明市 là tên chuẩn,
 * không nhầm được, nên dùng kèm tên tiếng Việt của đoàn luật sư.
 */
export const firmLawyers: FirmLawyer[] = [
  {
    slug: "phan-thuy-trang",
    name: "Phan Thùy Trang",
    role: "lawyer",
    team: "leadership",
    sortOrder: 10,
    // Chủ website chốt ngày 22/10/2026: thẻ nêu chức vụ ở công ty và chức vụ ở
    // tòa án trước đây ("Nguyên Thẩm phán Tòa án Tây Ninh").
    position: {
      vi: "Giám đốc - Nguyên Thẩm phán Tòa án Tây Ninh",
      en: "Director - Former Judge, Tây Ninh Court",
      // 主任 là cách gọi người đứng đầu một văn phòng/công ty luật trong tiếng
      // Trung, sát nghĩa hơn 董事 (thành viên hội đồng quản trị).
      zh: "主任、曾任 Tây Ninh 法院法官",
    },
    summary: {
      vi: `Giám đốc, Luật sư và người đại diện theo pháp luật của ${FIRM}. Nguyên Thẩm phán Tòa án Tây Ninh, hơn 18 năm kinh nghiệm pháp lý.`,
      en: `Director, Lawyer and legal representative of ${FIRM}. Former Judge at the Tây Ninh Court, with more than 18 years of legal experience.`,
      zh: `${FIRM} 主任、律师、法定代表人。曾任 Tây Ninh 法院法官，拥有逾18年法律从业经验。`,
    },
    qualifications: {
      vi: "Nguyên Thẩm phán Tòa án Tây Ninh. Hơn 18 năm kinh nghiệm pháp lý. Thành viên Đoàn Luật sư Thành phố Hồ Chí Minh.",
      en: "Former Judge, Tây Ninh Court. More than 18 years of legal experience. Member of the Ho Chi Minh City Bar Association.",
      zh: "曾任 Tây Ninh 法院法官。逾18年法律从业经验。胡志明市律师协会（Đoàn Luật sư Thành phố Hồ Chí Minh）会员。",
    },
    seoDescription: {
      vi: "Luật sư Phan Thùy Trang — Giám đốc Công ty Luật Vũ Khang, nguyên Thẩm phán Tòa án Tây Ninh, hơn 18 năm kinh nghiệm pháp lý.",
      en: "Phan Thùy Trang — Director of Vũ Khang law firm, former Judge at the Tây Ninh Court, more than 18 years of legal experience.",
      zh: "Phan Thùy Trang 律师——Vũ Khang 律师事务所主任，曾任 Tây Ninh 法院法官，逾18年法律从业经验。",
    },
    // Theo ảnh giới thiệu: tranh chấp dân sự và hợp đồng; hình sự (bào chữa,
    // bảo vệ); kinh doanh thương mại (doanh nghiệp, đầu tư).
    services: ["giai-quyet-tranh-chap", "hinh-su", "dau-tu-doanh-nghiep"],
    portrait: {
      // Ảnh 22/10/2026 (tay chống cằm, khoanh tay): khung rộng hơn chuẩn một
      // chút để không cắt ngang bàn tay — đầu chiếm ~32% thay vì 35,5%.
      file: "phan-thuy-trang-2026-10-22.jpg",
      replaces: [
        "phan-thuy-trang.jpg",
        "phan-thuy-trang-5x7.jpg",
        "phan-thuy-trang-2026-10.jpg",
        "phan-thuy-trang-2026-10-11.jpg",
      ],
      alt: "Chân dung Luật sư Phan Thùy Trang",
      credit: FIRM,
      rights: PROVIDED_1022,
    },
  },
  {
    slug: "tran-phuong-lan-anh",
    name: "Trần Phương Lan Anh",
    role: "lawyer",
    team: "leadership",
    sortOrder: 20,
    // Chủ website xác nhận lại tối 22/10/2026: Ls Lan Anh là Phó Giám đốc.
    // 23/10/2026: bỏ tên huyện Cam Lâm — hồ sơ nêu "Tòa án khu vực tỉnh Khánh
    // Hòa" như trên thẻ.
    // Thẻ theo cùng mẫu với Giám đốc: chức vụ ở công ty, rồi chức vụ ở tòa án
    // trước đây. 副主任 đi cặp với 主任 của Giám đốc.
    position: {
      vi: "Phó Giám đốc - Nguyên Phó Chánh án Tòa án khu vực tỉnh Khánh Hòa",
      en: "Deputy Director - Former Deputy Chief Judge, Khánh Hòa",
      zh: "副主任、曾任 Khánh Hòa 省区域法院副院长",
    },
    summary: {
      vi: `Phó Giám đốc, Luật sư của ${FIRM}, Thạc sĩ Luật. Nguyên Thẩm phán trung cấp, nguyên Phó Chánh án Tòa án khu vực tỉnh Khánh Hòa; 22 năm công tác tại Tòa án.`,
      en: `Deputy Director and Lawyer at ${FIRM}, holding a Master of Laws. Former intermediate-level Judge and former Deputy Chief Judge of a regional people's court in Khánh Hòa Province, with 22 years in the court system.`,
      zh: `${FIRM} 副主任、律师，法学硕士。曾任中级法官、Khánh Hòa 省区域人民法院副院长，在法院系统工作22年。`,
    },
    qualifications: {
      vi: "Thạc sĩ Luật. Nguyên Thẩm phán trung cấp; nguyên Phó Chánh án Tòa án khu vực tỉnh Khánh Hòa. 22 năm công tác tại Tòa án, trong đó 14 năm xét xử. 4 năm hành nghề luật sư.",
      en: "Master of Laws. Former intermediate-level Judge; former Deputy Chief Judge of a regional people's court in Khánh Hòa Province. 22 years in the court system, 14 of them adjudicating. 4 years in practice as a lawyer.",
      zh: "法学硕士。曾任中级法官、Khánh Hòa 省区域人民法院副院长。在法院系统工作22年，其中从事审判工作14年。执业律师4年。",
    },
    seoDescription: {
      vi: "Luật sư Trần Phương Lan Anh — Phó Giám đốc Công ty Luật Vũ Khang, Thạc sĩ Luật, nguyên Phó Chánh án Tòa án khu vực tỉnh Khánh Hòa; 22 năm công tác tại Tòa án.",
      en: "Trần Phương Lan Anh — Deputy Director of Vũ Khang law firm, Master of Laws, former Deputy Chief Judge of a regional court in Khánh Hòa; 22 years in the courts.",
      zh: "Trần Phương Lan Anh 律师——Vũ Khang 律师事务所副主任，法学硕士，曾任 Khánh Hòa 省区域人民法院副院长，在法院系统工作22年。",
    },
    // Chủ website nêu ngày 21/10/2026: tranh chấp dân sự, hôn nhân gia đình,
    // hình sự, kinh doanh thương mại, lao động.
    services: [
      "giai-quyet-tranh-chap",
      "hon-nhan-gia-dinh",
      "hinh-su",
      "dau-tu-doanh-nghiep",
      "lao-dong-nhan-su",
    ],
    // Ảnh vest luật sư gửi ngày 19/10/2026, chủ website chọn dùng ngày
    // 21/10/2026. Ảnh gốc chụp cận (1024x1536, hai vai chạm mép) nên không cắt
    // được theo chuẩn chung: khung lấy trọn bề ngang ảnh, đầu chiếm ~58% thay vì
    // 35,5%. Phông xám xanh đã đưa về trắng như ảnh những người khác.
    portrait: {
      file: "tran-phuong-lan-anh-2026-10-19.jpg",
      replaces: [
        "tran-phuong-lan-anh.jpg",
        "tran-phuong-lan-anh-5x7.jpg",
        "tran-phuong-lan-anh-2026-10.jpg",
      ],
      alt: "Chân dung Luật sư Trần Phương Lan Anh",
      credit: FIRM,
      rights:
        "Chủ website cung cấp ngày 19/10/2026 để đăng trên hồ sơ tại website công ty.",
    },
  },
  {
    // Chuyên viên, không phải luật sư. Không dùng chữ "luật sư" ở bất kỳ ô nào
    // của hồ sơ này: gọi sai tư cách hành nghề là sai sự thật, không phải cách
    // nói cho gọn.
    slug: "tran-le-kim-binh",
    name: "Trần Lê Kim Bình",
    role: "specialist",
    team: "legal",
    sortOrder: 30,
    position: { vi: "Chuyên viên", en: "Legal Specialist", zh: "法务专员" },
    summary: {
      vi: `Chuyên viên của ${FIRM}, cử nhân luật. Lĩnh vực dân sự, hôn nhân và gia đình; 5 năm kinh nghiệm làm việc với tư cách chuyên viên.`,
      en: `Legal specialist at ${FIRM}, holding a Bachelor of Laws. Works on civil, marriage and family matters, with 5 years of experience as a legal specialist.`,
      zh: `${FIRM} 法务专员，法学学士。负责民事及婚姻家庭领域，拥有5年法务专员工作经验。`,
    },
    qualifications: {
      vi: "Cử nhân Luật. 5 năm kinh nghiệm làm việc với tư cách chuyên viên.",
      en: "Bachelor of Laws. 5 years of experience as a legal specialist.",
      zh: "法学学士。5年法务专员工作经验。",
    },
    seoDescription: {
      vi: "Trần Lê Kim Bình — chuyên viên Công ty Luật Vũ Khang, cử nhân luật, lĩnh vực dân sự, hôn nhân và gia đình, 5 năm kinh nghiệm.",
      en: "Trần Lê Kim Bình — legal specialist at Vũ Khang law firm, Bachelor of Laws, civil and family matters, 5 years of experience.",
      zh: "Trần Lê Kim Bình——Vũ Khang 律师事务所法务专员，法学学士，负责民事及婚姻家庭领域，拥有5年工作经验。",
    },
    services: ["giai-quyet-tranh-chap", "hon-nhan-gia-dinh"],
    portrait: {
      file: "tran-le-kim-binh-2026-10.jpg",
      replaces: ["tran-le-kim-binh.jpg", "tran-le-kim-binh-5x7.jpg"],
      alt: "Chân dung chuyên viên Trần Lê Kim Bình",
      credit: FIRM,
      rights: PROVIDED_1010,
    },
  },
  {
    // Chuyên viên pháp lý, không phải luật sư — cùng lưu ý như hồ sơ trên.
    // Lĩnh vực và kinh nghiệm công ty cố ý để trống.
    slug: "tran-thi-anh-nhu",
    name: "Trần Thị Anh Như",
    role: "specialist",
    team: "legal",
    sortOrder: 40,
    position: {
      vi: "Chuyên viên pháp lý",
      en: "Legal Specialist",
      zh: "法务专员",
    },
    summary: {
      vi: `Chuyên viên pháp lý của ${FIRM}, cử nhân luật.`,
      en: `Legal specialist at ${FIRM}, holding a Bachelor of Laws.`,
      zh: `${FIRM} 法务专员，法学学士。`,
    },
    qualifications: {
      vi: "Cử nhân Luật.",
      en: "Bachelor of Laws.",
      zh: "法学学士。",
    },
    publishOnCreate: true,
    portrait: {
      file: "tran-thi-anh-nhu-2026-10.jpg",
      replaces: ["tran-thi-anh-nhu.jpg", "tran-thi-anh-nhu-5x7.jpg"],
      alt: "Chân dung chuyên viên pháp lý Trần Thị Anh Như",
      credit: FIRM,
      rights: PROVIDED_1010,
    },
  },
  // Phòng Phát triển khách hàng (chủ website cung cấp họ tên, ảnh ngày
  // 21/10/2026; đổi chức danh cùng ngày từ "Trưởng phòng Kinh doanh" / "Trưởng
  // phòng Đối ngoại"). Không phải luật sư — không dùng chữ "luật sư" ở ô nào của
  // các hồ sơ này. Trình độ, kinh nghiệm chưa được cung cấp nên để trống. Ông
  // Nguyễn Anh Tân được gỡ theo yêu cầu chủ website, trước khi lên hosting.
  // 22/10/2026: thêm ông Trần Trung Kiên — Phát triển khách hàng.
  {
    slug: "hoang-vu",
    name: "Hoàng Vũ",
    role: "specialist",
    team: "clients",
    sortOrder: 50,
    position: {
      vi: "Trưởng phòng Phát triển khách hàng",
      en: "Head of Client Development",
      zh: "客户发展部经理",
    },
    summary: {
      vi: `Trưởng phòng Phát triển khách hàng của ${FIRM}.`,
      en: `Head of Client Development at ${FIRM}.`,
      zh: `${FIRM} 客户发展部经理。`,
    },
    seoDescription: {
      vi: "Hoàng Vũ — Trưởng phòng Phát triển khách hàng, Công ty Luật TNHH Vũ Khang Solutions & Partners tại Đồng Nai.",
      en: "Hoàng Vũ — Head of Client Development at Vũ Khang Solutions & Partners law firm in Đồng Nai, Vietnam.",
      zh: "Hoàng Vũ——Vũ Khang Solutions & Partners 律师事务所客户发展部经理（越南同奈）。",
    },
    publishOnCreate: true,
    portrait: {
      // Ảnh 22/10/2026 (khoanh tay): khung trọn hai bàn tay, đầu ~33%.
      file: "hoang-vu-2026-10-22.jpg",
      replaces: ["hoang-vu-2026-10.jpg"],
      alt: "Chân dung Trưởng phòng Phát triển khách hàng Hoàng Vũ",
      credit: FIRM,
      rights: PROVIDED_1022,
    },
  },
  {
    slug: "le-tran-doan-khang",
    name: "Lê Trần Đoan Khang",
    role: "specialist",
    team: "clients",
    sortOrder: 60,
    position: {
      vi: "Phó phòng Phát triển khách hàng",
      en: "Deputy Head of Client Development",
      zh: "客户发展部副经理",
    },
    summary: {
      vi: `Phó phòng Phát triển khách hàng của ${FIRM}.`,
      en: `Deputy Head of Client Development at ${FIRM}.`,
      zh: `${FIRM} 客户发展部副经理。`,
    },
    seoDescription: {
      vi: "Lê Trần Đoan Khang — Phó phòng Phát triển khách hàng, Công ty Luật TNHH Vũ Khang Solutions & Partners tại Đồng Nai.",
      en: "Lê Trần Đoan Khang — Deputy Head of Client Development at Vũ Khang Solutions & Partners law firm in Đồng Nai, Vietnam.",
      zh: "Lê Trần Đoan Khang——Vũ Khang Solutions & Partners 律师事务所客户发展部副经理（越南同奈）。",
    },
    publishOnCreate: true,
    portrait: {
      file: "le-tran-doan-khang-2026-10.jpg",
      alt: "Chân dung Phó phòng Phát triển khách hàng Lê Trần Đoan Khang",
      credit: FIRM,
      rights: PROVIDED_1021,
    },
  },
  {
    slug: "tran-trung-kien",
    name: "Trần Trung Kiên",
    role: "specialist",
    team: "clients",
    sortOrder: 70,
    // Chủ website chốt ngày 22/10/2026: chức danh "Phát triển khách hàng" (thay
    // "Phó phòng Phát triển khách hàng" đặt cùng ngày). Tóm tắt chỉ nêu ông
    // thuộc phòng này, không thêm chức danh công ty chưa cung cấp.
    position: {
      vi: "Phát triển khách hàng",
      en: "Client Development",
      zh: "客户发展",
    },
    summary: {
      vi: `Thành viên phòng Phát triển khách hàng của ${FIRM}.`,
      en: `Member of the Client Development team at ${FIRM}.`,
      zh: `${FIRM} 客户发展部成员。`,
    },
    seoDescription: {
      vi: "Trần Trung Kiên — Phát triển khách hàng, Công ty Luật TNHH Vũ Khang Solutions & Partners tại Đồng Nai.",
      en: "Trần Trung Kiên — Client Development at Vũ Khang Solutions & Partners law firm in Đồng Nai, Vietnam.",
      zh: "Trần Trung Kiên——Vũ Khang Solutions & Partners 律师事务所客户发展部（越南同奈）。",
    },
    publishOnCreate: true,
    portrait: {
      // Ảnh vest gửi ngày 22/10/2026, thay ảnh áo polo; cắt cùng chuẩn 4:5.
      file: "tran-trung-kien-2026-10-22.jpg",
      replaces: ["tran-trung-kien-2026-10.jpg"],
      alt: "Chân dung Trần Trung Kiên — Phát triển khách hàng",
      previousAlts: ["Chân dung Phó phòng Phát triển khách hàng Trần Trung Kiên"],
      credit: FIRM,
      rights: PROVIDED_1022,
    },
  },
];
