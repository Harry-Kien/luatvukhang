/**
 * Tiêu đề hiển thị trên kết quả tìm kiếm, ba ngôn ngữ.
 *
 * Vì sao cần viết riêng: khi ô này trống, website ghép tiêu đề bản ghi với tên
 * công ty — "Hợp đồng & thương mại | Vũ Khang". Đọc được, nhưng bỏ phí chỗ đặt
 * cụm từ khách thật sự gõ vào ô tìm kiếm ("luật sư hợp đồng"), và với trang
 * ngành nghề thì tiêu đề không cho biết đây là trang dành cho ai.
 *
 * Quy ước: KHÔNG kèm tên công ty — website tự nối " | Vũ Khang" phía sau. Giữ
 * dưới khoảng 60 ký tự để không bị cắt giữa chừng. Không hứa hẹn kết quả, không
 * dùng từ quảng cáo như "tốt nhất", "uy tín số một".
 */
export type Localised = { vi: string; en: string; zh: string };

/** Khóa là "bộ sưu tập/đường dẫn". */
/**
 * Tiêu đề đã nạp lên máy chủ rồi được thay trong tệp này. prepare-seo-titles
 * chỉ điền ô trống — trừ khi ô còn đúng nguyên văn một bản ở đây, tức chưa ai
 * sửa tay, thì thay bằng bản mới.
 */
export const replacedSeoTitles: Record<
  string,
  Partial<Record<keyof Localised, string[]>>
> = {
  "lawyers/phan-thuy-trang": {
    // 22/10/2026: tiêu đề nêu thêm chức Giám đốc.
    vi: ["Luật sư Phan Thùy Trang — nguyên Thẩm phán"],
  },
  "lawyers/tran-phuong-lan-anh": {
    // Tối 22/10/2026: Ls Lan Anh là Phó Giám đốc (chủ website xác nhận lại) —
    // tiêu đề nêu chức vụ ở công ty; chức vụ ở tòa án nằm trong mô tả.
    vi: ["Luật sư Trần Phương Lan Anh — nguyên Phó Chánh án"],
    en: [
      // Dài 66 ký tự sau khi nối " | Vũ Khang" (thay ngày 18/10/2026).
      "Trần Phương Lan Anh — Lawyer, former Deputy Chief Judge",
      "Trần Phương Lan Anh — Deputy Director & Lawyer",
      "Lawyer Trần Phương Lan Anh — ex-Deputy Chief Judge",
    ],
    zh: [
      // Dài 43 ký tự sau khi nối " | Vũ Khang" (thay ngày 22/10/2026).
      "Trần Phương Lan Anh 律师 — 曾任法院副院长",
      "Trần Phương Lan Anh 律师，前法院副院长",
    ],
  },
  // 21/10/2026: phòng Kinh doanh / Đối ngoại đổi thành Phát triển khách hàng.
  "lawyers/hoang-vu": {
    vi: ["Hoàng Vũ — Trưởng phòng Kinh doanh"],
    en: ["Hoàng Vũ — Head of Business Development"],
    zh: ["Hoàng Vũ — 业务拓展部经理"],
  },
  "lawyers/le-tran-doan-khang": {
    vi: ["Lê Trần Đoan Khang — Trưởng phòng Đối ngoại"],
    en: ["Lê Trần Đoan Khang — Head of External Relations"],
    zh: ["Lê Trần Đoan Khang — 对外关系部经理"],
  },
  // 22/10/2026: "Phó phòng Phát triển khách hàng" đổi thành "Phát triển khách hàng".
  "lawyers/tran-trung-kien": {
    vi: ["Trần Trung Kiên — Phó phòng Phát triển khách hàng"],
    en: ["Trần Trung Kiên — Deputy Head, Client Development"],
    zh: ["Trần Trung Kiên — 客户发展部副经理"],
  },
  // 26/10/2026: "Thành viên phòng Phát triển khách hàng" đổi thành "Phát triển
  // khách hàng" như ông Trần Trung Kiên.
  "lawyers/tran-anh-dung": {
    vi: ["Trần Anh Dũng — Thành viên phòng Phát triển khách hàng"],
    en: ["Trần Anh Dũng — Client Development Team"],
    zh: ["Trần Anh Dũng — 客户发展部成员"],
  },
};

/**
 * Mô tả trên kết quả tìm kiếm cho những trang mà phần tóm tắt (dùng thay khi ô
 * mô tả trống) quá ngắn. Chỉ điền ô còn trống.
 */
export const seoDescriptions: Record<string, Partial<Localised>> = {
  // Tóm tắt tiếng Trung của trang chủ chỉ 29 ký tự — Google cắt còn rất ít
  // thông tin. Dòng chữ lớn đầu trang vẫn dùng tóm tắt ngắn.
  "pages/home": {
    zh: "Vũ Khang 律师事务所位于越南同奈，为企业与个人提供商事、民事纠纷、劳动、土地住房、婚姻家庭及刑事等法律服务，为重要决策提供清晰的法律视角。",
  },
};

export const seoTitles: Record<string, Localised> = {
  "services/dau-tu-doanh-nghiep": {
    vi: "Luật sư doanh nghiệp và thương mại",
    en: "Corporate and commercial lawyers in Vietnam",
    zh: "企业与商事法律顾问",
  },
  "services/giai-quyet-tranh-chap": {
    vi: "Luật sư dân sự và giải quyết tranh chấp",
    en: "Civil and dispute resolution lawyers",
    zh: "民事与纠纷解决律师",
  },
  "services/lao-dong-nhan-su": {
    vi: "Luật sư lao động và quản trị nội bộ",
    en: "Employment and governance lawyers in Vietnam",
    zh: "劳动与内部治理法律顾问",
  },
  "services/dat-dai-bat-dong-san": {
    vi: "Luật sư đất đai và nhà ở",
    en: "Land and housing lawyers in Vietnam",
    zh: "土地与住房法律顾问",
  },
  "services/hon-nhan-gia-dinh": {
    vi: "Luật sư hôn nhân và gia đình",
    en: "Marriage and family lawyers in Vietnam",
    zh: "婚姻家庭律师",
  },
  "services/hinh-su": {
    vi: "Luật sư bào chữa vụ án hình sự",
    en: "Criminal defence lawyers in Vietnam",
    zh: "刑事辩护律师",
  },
  "services/san-pham-phap-ly-tieu-chuan": {
    vi: "Soạn đơn, mẫu hợp đồng và kiểm tra hồ sơ",
    en: "Legal forms, contract templates and document checks",
    zh: "文书起草、合同范本与材料审查",
  },
  "services/luat-su-rieng-tu-van-dinh-ky": {
    vi: "Luật sư riêng cho gia đình và doanh nghiệp",
    en: "Retained lawyers for families and businesses",
    zh: "家庭与企业常年律师",
  },

  "industries/san-xuat-va-xuat-khau": {
    vi: "Tư vấn pháp lý cho doanh nghiệp sản xuất và xuất khẩu",
    en: "Legal support for manufacturers and exporters",
    zh: "为制造与出口企业提供法律支持",
  },
  "industries/bat-dong-san-va-xay-dung": {
    vi: "Tư vấn pháp lý ngành bất động sản và xây dựng",
    en: "Legal support for real estate and construction",
    zh: "为房地产与建筑行业提供法律支持",
  },
  "industries/cong-nghe-va-thuong-mai-dien-tu": {
    vi: "Tư vấn pháp lý cho công nghệ và thương mại điện tử",
    en: "Legal support for technology and e-commerce",
    zh: "为科技与电子商务提供法律支持",
  },
  "industries/thuong-mai-va-ban-le": {
    vi: "Tư vấn pháp lý ngành thương mại và bán lẻ",
    en: "Legal support for trading and retail businesses",
    zh: "为贸易与零售行业提供法律支持",
  },
  "industries/giao-duc-va-y-te": {
    vi: "Tư vấn pháp lý cho cơ sở giáo dục và y tế",
    en: "Legal support for education and healthcare providers",
    zh: "为教育与医疗机构提供法律支持",
  },
  "industries/dich-vu-va-tai-chinh": {
    vi: "Tư vấn pháp lý ngành dịch vụ và tài chính",
    en: "Legal support for services and finance businesses",
    zh: "为服务与金融行业提供法律支持",
  },

  "articles/khi-nao-can-luat-su-ra-soat-hop-dong": {
    vi: "Khi nào cần luật sư rà soát hợp đồng?",
    en: "When does a contract need a lawyer to review it?",
    zh: "何时需要律师审查合同？",
  },
  "articles/cac-buoc-truoc-khi-khoi-kien-doi-tac": {
    vi: "Các bước cần làm trước khi khởi kiện đối tác",
    en: "Steps to take before suing a business partner",
    zh: "起诉合作方之前应完成的步骤",
  },
  "articles/chuan-bi-gi-cho-buoi-gap-luat-su-dau-tien": {
    vi: "Chuẩn bị gì cho buổi gặp luật sư đầu tiên",
    en: "How to prepare for a first meeting with a lawyer",
    zh: "首次会见律师前应如何准备",
  },

  "articles/kiem-tra-phap-ly-truoc-khi-dat-coc-mua-dat": {
    vi: "Kiểm tra pháp lý trước khi đặt cọc mua đất",
    en: "Legal checks before paying a deposit on land",
    zh: "支付购地定金前的法律核查",
  },
  "articles/cham-dut-hop-dong-lao-dong-dung-trinh-tu": {
    vi: "Chấm dứt hợp đồng lao động đúng trình tự",
    en: "Ending an employment contract correctly",
    zh: "依法定程序终止劳动合同",
  },
  "articles/thu-tuc-ly-hon-can-chuan-bi-gi": {
    vi: "Thủ tục ly hôn cần chuẩn bị những gì",
    en: "What to prepare for a divorce in Vietnam",
    zh: "办理离婚需要准备什么",
  },

  // Tên người giữ nguyên ở cả ba ngôn ngữ, đúng như phần còn lại của website.
  // Đặt một tên tiếng Trung cho người thật là bịa danh tính, không phải dịch.
  "lawyers/phan-thuy-trang": {
    vi: "Luật sư Phan Thùy Trang — Giám đốc, nguyên Thẩm phán",
    en: "Phan Thùy Trang — Director, Lawyer, former Judge",
    zh: "Phan Thùy Trang 律师 — 主任、曾任法官",
  },
  "lawyers/tran-phuong-lan-anh": {
    // Tối 22/10/2026: Phó Giám đốc. Tiếng Trung 39 ký tự sau khi nối
    // " | Vũ Khang" (giới hạn 40).
    vi: "Luật sư Trần Phương Lan Anh — Phó Giám đốc",
    en: "Trần Phương Lan Anh — Deputy Director, former Judge",
    zh: "Trần Phương Lan Anh 律师 — 副主任",
  },
  "lawyers/tran-le-kim-binh": {
    vi: "Trần Lê Kim Bình — Chuyên viên pháp lý",
    en: "Trần Lê Kim Bình — Legal Specialist",
    zh: "Trần Lê Kim Bình — 法务专员",
  },
  "lawyers/hoang-vu": {
    vi: "Hoàng Vũ — Trưởng phòng Phát triển khách hàng",
    en: "Hoàng Vũ — Head of Client Development",
    zh: "Hoàng Vũ — 客户发展部经理",
  },
  "lawyers/le-tran-doan-khang": {
    vi: "Lê Trần Đoan Khang — Phó phòng Phát triển khách hàng",
    en: "Lê Trần Đoan Khang — Deputy Head, Client Development",
    zh: "Lê Trần Đoan Khang — 客户发展部副经理",
  },
  "lawyers/tran-trung-kien": {
    vi: "Trần Trung Kiên — Phát triển khách hàng",
    en: "Trần Trung Kiên — Client Development",
    zh: "Trần Trung Kiên — 客户发展",
  },
  "lawyers/tran-anh-dung": {
    vi: "Trần Anh Dũng — Phát triển khách hàng",
    en: "Trần Anh Dũng — Client Development",
    zh: "Trần Anh Dũng — 客户发展",
  },
  "lawyers/tran-thi-anh-nhu": {
    vi: "Trần Thị Anh Như — Chuyên viên pháp lý",
    en: "Trần Thị Anh Như — Legal Specialist",
    zh: "Trần Thị Anh Như — 法务专员",
  },

  "pages/about": {
    vi: "Về công ty luật Vũ Khang Solutions & Partners",
    en: "About Vũ Khang Solutions & Partners law firm",
    zh: "关于 Vũ Khang Solutions & Partners 律师事务所",
  },
  "pages/contact": {
    vi: "Liên hệ luật sư tư vấn pháp lý",
    en: "Contact our lawyers for legal advice",
    zh: "联系律师获取法律咨询",
  },
};
