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
    vi: "Luật sư Phan Thùy Trang — nguyên Thẩm phán",
    en: "Phan Thùy Trang — Director, Lawyer, former Judge",
    zh: "Phan Thùy Trang 律师 — 主任、曾任法官",
  },
  "lawyers/tran-phuong-lan-anh": {
    vi: "Luật sư Trần Phương Lan Anh — nguyên Phó Chánh án",
    en: "Trần Phương Lan Anh — Lawyer, former Deputy Chief Judge",
    zh: "Trần Phương Lan Anh 律师 — 曾任法院副院长",
  },
  "lawyers/tran-le-kim-binh": {
    vi: "Trần Lê Kim Bình — Chuyên viên pháp lý",
    en: "Trần Lê Kim Bình — Legal Specialist",
    zh: "Trần Lê Kim Bình — 法务专员",
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
