/**
 * Từ khóa tìm kiếm cho từng lĩnh vực chuyên môn, ba ngôn ngữ.
 *
 * Vì sao cần: nội dung trên website viết bằng thuật ngữ pháp lý chuẩn, còn
 * khách gõ vào ô tìm kiếm bằng cách nói thường ngày. "Sa thải" không xuất hiện
 * một lần nào trong bài về Lao động & nhân sự, nên trước khi có tệp này, tìm
 * "sa thải" trả về **không có kết quả nào** — đo bằng bộ dò truy vấn thật.
 *
 * Đây là bản khởi đầu, không phải danh sách đóng. Công ty bổ sung trực tiếp
 * trong CMS ở ô "Từ khóa khách hàng thường gõ" của từng lĩnh vực; cách tốt nhất
 * để biết cần thêm gì là xem khách thực sự gõ gì trong Search Console.
 *
 * Từ khóa chỉ dùng cho ô tìm kiếm nội bộ. Không hiển thị ra trang, không đưa
 * vào thẻ meta và không gửi cho công cụ tìm kiếm — nhồi từ khóa vào meta là
 * cách làm bị Google phạt từ lâu.
 */
export type Localised = { vi: string; en: string; zh: string };

export const practiceKeywords: Record<string, Localised> = {
  "dau-tu-doanh-nghiep": {
    vi: "thành lập công ty, mở công ty, đăng ký kinh doanh, giấy phép đầu tư, vốn điều lệ, góp vốn, cổ đông, chuyển nhượng vốn, mua bán doanh nghiệp, sáp nhập, chi nhánh, văn phòng đại diện, giải thể, tạm ngừng kinh doanh",
    en: "set up a company, company registration, business licence, investment certificate, charter capital, shareholders, share transfer, buy a business, merger, acquisition, branch office, representative office, dissolution",
    zh: "设立公司, 开公司, 工商登记, 投资许可, 注册资本, 出资, 股东, 股权转让, 收购公司, 合并, 分公司, 代表处, 解散",
  },
  "hop-dong-thuong-mai": {
    vi: "soạn hợp đồng, rà soát hợp đồng, mẫu hợp đồng, vi phạm hợp đồng, phạt vi phạm, đặt cọc, thanh lý hợp đồng, hủy hợp đồng, mua bán hàng hóa, đại lý, phân phối, nhà cung cấp",
    en: "draft a contract, review a contract, contract template, breach of contract, penalty clause, deposit, terminate a contract, cancel a contract, sale of goods, agency, distribution, supplier",
    zh: "起草合同, 审查合同, 合同模板, 违约, 违约金, 定金, 解除合同, 终止合同, 货物买卖, 代理, 经销, 供应商",
  },
  "giai-quyet-tranh-chap": {
    vi: "kiện, khởi kiện, kiện ra tòa, đơn khởi kiện, đòi nợ, tranh chấp, hòa giải, thương lượng, trọng tài, thi hành án, án phí, thắng kiện",
    en: "sue, file a lawsuit, take to court, statement of claim, debt recovery, dispute, mediation, negotiation, arbitration, enforcement of judgment, court fees",
    zh: "起诉, 打官司, 上法院, 起诉状, 追讨欠款, 纠纷, 调解, 协商, 仲裁, 强制执行, 诉讼费",
  },
  "so-huu-tri-tue": {
    vi: "đăng ký nhãn hiệu, đăng ký thương hiệu, bảo hộ logo, bản quyền, quyền tác giả, sáng chế, kiểu dáng công nghiệp, hàng giả, hàng nhái, vi phạm bản quyền, tên miền, phần mềm, dữ liệu cá nhân, chuyển giao công nghệ",
    en: "register a trademark, brand protection, logo protection, copyright, patent, industrial design, counterfeit goods, infringement, domain name, software licence, personal data, technology transfer",
    zh: "商标注册, 品牌保护, 标识保护, 著作权, 版权, 专利, 工业设计, 假冒商品, 侵权, 域名, 软件许可, 个人数据, 技术转让",
  },
  "lao-dong-nhan-su": {
    vi: "sa thải, đuổi việc, cho thôi việc, nghỉ việc, đơn phương chấm dứt, hợp đồng lao động, thử việc, trợ cấp thôi việc, bảo hiểm xã hội, kỷ luật lao động, nội quy lao động, tranh chấp lao động, tiền lương, làm thêm giờ, thai sản",
    en: "dismissal, fired, terminate an employee, resignation, unilateral termination, employment contract, probation, severance pay, social insurance, disciplinary action, internal labour rules, labour dispute, wages, overtime, maternity leave",
    zh: "解雇, 辞退, 开除, 辞职, 单方解除, 劳动合同, 试用期, 离职补偿, 社会保险, 劳动纪律, 劳动规章, 劳动争议, 工资, 加班, 产假",
  },
  "dat-dai-bat-dong-san": {
    vi: "sổ đỏ, sổ hồng, giấy chứng nhận quyền sử dụng đất, mua bán nhà, mua bán đất, sang tên, tách thửa, chuyển mục đích sử dụng đất, tranh chấp đất đai, giải phóng mặt bằng, đền bù, thuê nhà, thuê đất, hợp đồng đặt cọc nhà đất",
    en: "land use right certificate, land title, buy a house, buy land, transfer of title, land subdivision, change of land use, land dispute, site clearance, compensation, lease a property, lease land, property deposit agreement",
    zh: "土地使用权证, 房产证, 买房, 买地, 过户, 分割地块, 变更土地用途, 土地纠纷, 征地拆迁, 补偿, 租房, 租地, 购房定金合同",
  },
  "thue-tai-chinh": {
    vi: "quyết toán thuế, thanh tra thuế, kiểm tra thuế, truy thu thuế, hoàn thuế, thuế thu nhập doanh nghiệp, thuế thu nhập cá nhân, thuế giá trị gia tăng, hóa đơn, ưu đãi thuế, chuyển giá, nợ thuế",
    en: "tax finalisation, tax audit, tax inspection, tax arrears, tax refund, corporate income tax, personal income tax, value added tax, invoices, tax incentives, transfer pricing, tax debt",
    zh: "税务决算, 税务稽查, 税务检查, 补缴税款, 退税, 企业所得税, 个人所得税, 增值税, 发票, 税收优惠, 转让定价, 欠税",
  },
  "hon-nhan-gia-dinh": {
    vi: "ly hôn, ly dị, đơn ly hôn, ly hôn đơn phương, chia tài sản, tài sản chung, quyền nuôi con, giành quyền nuôi con, cấp dưỡng, thừa kế, chia thừa kế, di chúc, tranh chấp thừa kế, kết hôn với người nước ngoài, nhận con nuôi",
    en: "divorce, file for divorce, unilateral divorce, division of assets, marital property, child custody, child support, inheritance, division of an estate, will, inheritance dispute, marriage to a foreigner, adoption",
    zh: "离婚, 起诉离婚, 单方离婚, 财产分割, 夫妻共同财产, 子女抚养权, 抚养费, 继承, 遗产分割, 遗嘱, 继承纠纷, 涉外婚姻, 收养",
  },
  "hinh-su": {
    vi: "bị khởi tố, bị bắt, bị tạm giam, bị triệu tập, bào chữa, luật sư bào chữa, bị can, bị cáo, bị hại, tố giác tội phạm, điều tra, xét xử, kháng cáo, án treo, bảo lãnh tại ngoại",
    en: "charged with a crime, arrested, in custody, summoned, criminal defence, defence lawyer, accused, defendant, victim, report a crime, investigation, trial, appeal, suspended sentence, bail",
    zh: "被起诉, 被逮捕, 被羁押, 被传唤, 刑事辩护, 辩护律师, 犯罪嫌疑人, 被告人, 被害人, 报案, 侦查, 审判, 上诉, 缓刑, 取保候审",
  },
  "hanh-chinh-giay-phep": {
    vi: "giấy phép con, xin giấy phép, điều kiện kinh doanh, thu hồi giấy phép, xử phạt hành chính, phạt vi phạm hành chính, khiếu nại, tố cáo, kiện quyết định hành chính, thanh tra, kiểm tra chuyên ngành, gia hạn giấy phép",
    en: "sub-licence, apply for a permit, business conditions, licence revocation, administrative penalty, administrative fine, complaint, denunciation, challenge an administrative decision, inspection, licence renewal",
    zh: "子许可证, 申请许可, 经营条件, 吊销许可, 行政处罚, 罚款, 申诉, 举报, 起诉行政决定, 检查, 专项检查, 许可续期",
  },
  "ngan-hang-tin-dung": {
    vi: "vay ngân hàng, hợp đồng tín dụng, thế chấp, cầm cố, tài sản bảo đảm, nợ xấu, siết nợ, xử lý tài sản bảo đảm, bảo lãnh ngân hàng, lãi suất, cơ cấu nợ, thu hồi nợ",
    en: "bank loan, credit agreement, mortgage, pledge, collateral, bad debt, debt enforcement, realisation of collateral, bank guarantee, interest rate, debt restructuring, debt collection",
    zh: "银行贷款, 信贷合同, 抵押, 质押, 担保财产, 不良贷款, 催收, 处置担保物, 银行保函, 利率, 债务重组, 追收债务",
  },
  "xay-dung-ha-tang": {
    vi: "giấy phép xây dựng, nhà thầu, hợp đồng thi công, hợp đồng EPC, chậm tiến độ, phát sinh khối lượng, nghiệm thu, quyết toán công trình, bảo hành công trình, tranh chấp xây dựng, xây không phép, sai phép",
    en: "construction permit, contractor, works contract, EPC contract, delay, variations, acceptance of works, final account, defects liability, construction dispute, building without a permit",
    zh: "施工许可, 承包商, 施工合同, EPC 合同, 工期延误, 工程量变更, 竣工验收, 工程结算, 保修, 建设纠纷, 无证施工",
  },
};
