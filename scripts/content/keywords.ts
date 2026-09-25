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
    vi: "thành lập công ty, mở công ty, đăng ký kinh doanh, giấy phép đầu tư, vốn điều lệ, góp vốn, cổ đông, chuyển nhượng vốn, mua bán doanh nghiệp, sáp nhập, chi nhánh, văn phòng đại diện, giải thể, tạm ngừng kinh doanh, soạn hợp đồng, rà soát hợp đồng, mẫu hợp đồng, vi phạm hợp đồng, phạt vi phạm, đặt cọc, thanh lý hợp đồng, hủy hợp đồng, mua bán hàng hóa, đại lý, phân phối, nhà cung cấp",
    en: "set up a company, company registration, business licence, investment certificate, charter capital, shareholders, share transfer, buy a business, merger, acquisition, branch office, representative office, dissolution, draft a contract, review a contract, contract template, breach of contract, penalty clause, deposit, terminate a contract, cancel a contract, sale of goods, agency, distribution, supplier",
    zh: "设立公司, 开公司, 工商登记, 投资许可, 注册资本, 出资, 股东, 股权转让, 收购公司, 合并, 分公司, 代表处, 解散, 起草合同, 审查合同, 合同模板, 违约, 违约金, 定金, 解除合同, 终止合同, 货物买卖, 代理, 经销, 供应商",
  },
  "giai-quyet-tranh-chap": {
    vi: "kiện, khởi kiện, kiện ra tòa, đơn khởi kiện, đòi nợ, tranh chấp, hòa giải, thương lượng, trọng tài, thi hành án, án phí, thắng kiện, vay tiền, cho vay, giấy vay nợ, bồi thường thiệt hại, tranh chấp tài sản",
    en: "sue, file a lawsuit, take to court, statement of claim, debt recovery, dispute, mediation, negotiation, arbitration, enforcement of judgment, court fees, personal loan, IOU, compensation claim, property dispute",
    zh: "起诉, 打官司, 上法院, 起诉状, 追讨欠款, 纠纷, 调解, 协商, 仲裁, 强制执行, 诉讼费, 借款, 借条, 损害赔偿, 财产纠纷",
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
  "san-pham-phap-ly-tieu-chuan": {
    vi: "mẫu đơn, mẫu hợp đồng, soạn đơn, viết đơn, đơn khiếu nại, đơn đề nghị, kiểm tra hồ sơ, xem hồ sơ, sàn thương mại điện tử, shopee, lazada, tiktok shop, khiếu nại sàn",
    en: "form template, contract template, draft an application, complaint letter, request letter, document check, review my papers, e-commerce platform, marketplace seller, platform complaint",
    zh: "文书范本, 合同范本, 起草申请书, 投诉信, 申请书, 材料审查, 电商平台, 网店卖家, 平台申诉",
  },
  "luat-su-rieng-tu-van-dinh-ky": {
    vi: "luật sư riêng, luật sư gia đình, luật sư doanh nghiệp, tư vấn pháp lý thường xuyên, tư vấn định kỳ, pháp chế thuê ngoài, cố vấn pháp lý, hợp đồng tư vấn pháp lý",
    en: "retained lawyer, family lawyer, company lawyer, ongoing legal advice, outsourced legal department, legal adviser, retainer",
    zh: "常年律师, 家庭律师, 企业律师, 常年法律顾问, 法务外包, 法律顾问合同",
  },
};
