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
    vi: "Luật sư tư vấn đầu tư và doanh nghiệp",
    en: "Investment and corporate lawyers in Vietnam",
    zh: "投资与企业法律顾问",
  },
  "services/giai-quyet-tranh-chap": {
    vi: "Luật sư giải quyết tranh chấp và tố tụng",
    en: "Dispute resolution and litigation lawyers",
    zh: "争议解决与诉讼律师",
  },
  "services/hop-dong-thuong-mai": {
    vi: "Luật sư hợp đồng và thương mại",
    en: "Contract and commercial lawyers in Vietnam",
    zh: "合同与商事法律顾问",
  },
  "services/so-huu-tri-tue": {
    vi: "Luật sư sở hữu trí tuệ và công nghệ",
    en: "Intellectual property and technology lawyers",
    zh: "知识产权与科技法律顾问",
  },
  "services/lao-dong-nhan-su": {
    vi: "Luật sư lao động và nhân sự doanh nghiệp",
    en: "Employment and HR lawyers in Vietnam",
    zh: "劳动与人力资源法律顾问",
  },
  "services/dat-dai-bat-dong-san": {
    vi: "Luật sư đất đai và bất động sản",
    en: "Land and real estate lawyers in Vietnam",
    zh: "土地与房地产法律顾问",
  },
  "services/thue-tai-chinh": {
    vi: "Luật sư thuế và tài chính doanh nghiệp",
    en: "Tax and corporate finance lawyers",
    zh: "税务与企业财务法律顾问",
  },
  "services/hon-nhan-gia-dinh": {
    vi: "Luật sư hôn nhân, gia đình và thừa kế",
    en: "Family, matrimonial and inheritance lawyers",
    zh: "婚姻家庭与继承法律顾问",
  },
  "services/hinh-su": {
    vi: "Luật sư bào chữa vụ án hình sự",
    en: "Criminal defence lawyers in Vietnam",
    zh: "刑事辩护律师",
  },
  "services/hanh-chinh-giay-phep": {
    vi: "Luật sư thủ tục hành chính và giấy phép",
    en: "Administrative procedure and licensing lawyers",
    zh: "行政手续与许可法律顾问",
  },
  "services/ngan-hang-tin-dung": {
    vi: "Luật sư ngân hàng và tín dụng",
    en: "Banking and credit lawyers in Vietnam",
    zh: "银行与信贷法律顾问",
  },
  "services/xay-dung-ha-tang": {
    vi: "Luật sư xây dựng và hạ tầng",
    en: "Construction and infrastructure lawyers",
    zh: "建筑与基础设施法律顾问",
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
