/**
 * Bài viết dự thảo cho mục Góc nhìn pháp lý, ba ngôn ngữ.
 *
 * Nguyên tắc: chỉ nói về quy trình, cách chuẩn bị và quy định chung có dẫn
 * nguồn; không tư vấn cho tình huống cụ thể, không khẳng định kết quả, không
 * nêu tên khách hàng. Mọi bài nạp ở trạng thái nháp, chờ luật sư của công ty
 * rà soát, ghi tên tác giả chịu trách nhiệm rồi mới xuất bản.
 */
import type { Localised, Section } from "./people";

export type DraftArticle = {
  slug: string;
  title: Localised;
  summary: Localised;
  keywords: string;
  sections: Section[];
  sources: { label: string; url: string }[];
  seoDescription: Localised;
};

const search = (number: string) =>
  "https://thuvienphapluat.vn/page/tim-van-ban.aspx?keyword=" + encodeURIComponent(number);

export const draftArticles: DraftArticle[] = [
  {
    slug: "khi-nao-can-luat-su-ra-soat-hop-dong",
    title: {
      vi: "Khi nào doanh nghiệp cần luật sư rà soát hợp đồng?",
      en: "When should a business have a lawyer review a contract?",
      zh: "企业何时需要律师审查合同？",
    },
    summary: {
      vi: "Không phải hợp đồng nào cũng cần luật sư. Bài viết nêu năm dấu hiệu cho thấy nên rà soát trước khi ký, và những gì việc rà soát thực sự bao gồm.",
      en: "Not every contract needs a lawyer. Five signs that a review is worth it before signing, and what a review actually covers.",
      zh: "并非每份合同都需要律师。本文列出五个签署前值得审查的信号，以及审查实际包含的内容。",
    },
    keywords:
      "rà soát hợp đồng, luật sư hợp đồng, ra soat hop dong, ký hợp đồng, rủi ro hợp đồng",
    sections: [
      {
        heading: {
          vi: "Năm dấu hiệu nên rà soát trước khi ký",
          en: "Five signs a review is worth it",
          zh: "五个值得审查的信号",
        },
        body: {
          vi: "Giá trị hợp đồng lớn so với quy mô doanh nghiệp. Đối tác là bên soạn thảo và không cho sửa mẫu. Có điều khoản phạt, bồi thường hoặc chấm dứt mà bạn đọc chưa hiểu hết. Hợp đồng có yếu tố nước ngoài, luật áp dụng hoặc cơ quan giải quyết tranh chấp ở ngoài Việt Nam. Hợp đồng kéo dài nhiều năm hoặc tự động gia hạn.",
          en: "The value is large relative to the size of your business. The other side drafted it and will not accept changes. It contains penalty, indemnity or termination clauses you do not fully understand. It has a foreign element: governing law or a dispute forum outside Vietnam. It runs for several years or renews automatically.",
          zh: "合同金额相对企业规模较大；对方起草且不接受修改；含有您尚未完全理解的违约金、赔偿或终止条款；涉及涉外因素，适用法律或争议解决机构在越南境外；期限跨多年或自动续期。",
        },
      },
      {
        heading: {
          vi: "Rà soát hợp đồng thực sự gồm những gì",
          en: "What a contract review actually covers",
          zh: "合同审查实际包含哪些内容",
        },
        body: {
          vi: "Luật sư đối chiếu từng điều khoản với quy định bắt buộc của Bộ luật Dân sự và luật chuyên ngành, chỉ ra điều khoản có thể vô hiệu, điều khoản đặt rủi ro lệch về một bên, và những khoảng trống chưa được quy định như thời hạn nghiệm thu, cách tính thiệt hại, thủ tục chấm dứt. Kết quả bàn giao thường là bản hợp đồng đánh dấu sửa đổi kèm ghi chú giải thích, để bạn tự quyết định điểm nào cần đàm phán.",
          en: "The lawyer checks each clause against the mandatory rules of the Civil Code and sector legislation, flags clauses that may be void, clauses that shift risk to one side, and gaps such as acceptance deadlines, how damages are calculated and termination procedure. The deliverable is usually a marked-up contract with explanatory notes so you can decide what to negotiate.",
          zh: "律师逐条对照《民法典》及专门法律的强制性规定，指出可能无效的条款、风险明显偏向一方的条款，以及验收期限、损失计算方式、终止程序等尚未约定的空白。交付成果通常是带修改标记和说明的合同版本，由您决定哪些点需要谈判。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị gì để việc rà soát nhanh và rẻ hơn",
          en: "How to make the review faster and cheaper",
          zh: "如何让审查更快、更省",
        },
        body: {
          vi: "Gửi bản hợp đồng ở định dạng có thể sửa, các phụ lục và thư từ trao đổi trước đó. Nói rõ điều gì quan trọng nhất với bạn: giá, tiến độ, độc quyền hay quyền chấm dứt. Cho biết thời hạn ký dự kiến. Ba thông tin này giúp luật sư tập trung đúng chỗ thay vì rà đều toàn bộ văn bản.",
          en: "Send the contract in an editable format, together with annexes and earlier correspondence. Say what matters most to you: price, timeline, exclusivity or the right to exit. State the intended signing date. These three things let the lawyer focus where it counts instead of reading everything with equal weight.",
          zh: "以可编辑格式发送合同、附件及此前的往来函件；说明对您最重要的事项：价格、进度、排他性或退出权；告知预计签署日期。这三点能让律师聚焦重点，而不是平均用力通读全文。",
        },
      },
    ],
    sources: [
      {
        label: "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 117, 385, 398, 428",
        url: search("91/2015/QH13"),
      },
      {
        label: "Luật Thương mại 2005 (số 36/2005/QH11): Điều 300 đến 316 về chế tài",
        url: search("36/2005/QH11"),
      },
    ],
    seoDescription: {
      vi: "Năm dấu hiệu doanh nghiệp nên để luật sư rà soát hợp đồng trước khi ký, việc rà soát gồm những gì và cần chuẩn bị gì. Công ty Luật TNHH Vũ Khang Solutions & Partners.",
      en: "Five signs a business should have a lawyer review a contract before signing, what a review covers and how to prepare. Vũ Khang Solutions & Partners.",
      zh: "企业签署前应请律师审查合同的五个信号、审查内容及准备事项。武康 Solutions & Partners 律师事务所。",
    },
  },
  {
    slug: "cac-buoc-truoc-khi-khoi-kien-doi-tac",
    title: {
      vi: "Đối tác vi phạm hợp đồng: các bước trước khi khởi kiện",
      en: "When a partner breaches a contract: steps before you sue",
      zh: "合作方违约：起诉前的几个步骤",
    },
    summary: {
      vi: "Khởi kiện là bước cuối, không phải bước đầu. Bài viết trình bày trình tự thông thường từ lưu chứng cứ, thông báo vi phạm, thương lượng đến lựa chọn giữa tòa án và trọng tài.",
      en: "Litigation is the last step, not the first. The usual sequence: preserve evidence, give notice of breach, negotiate, then choose between court and arbitration.",
      zh: "起诉是最后一步，而非第一步。本文介绍从保全证据、发出违约通知、协商，到在法院与仲裁之间作出选择的通常顺序。",
    },
    keywords:
      "vi phạm hợp đồng, khởi kiện, tranh chấp hợp đồng, trọng tài thương mại, tranh chap hop dong",
    sections: [
      {
        heading: {
          vi: "Bước 1: Lưu chứng cứ ngay, trước khi tranh cãi",
          en: "Step 1: preserve evidence before arguing",
          zh: "第一步：先保全证据，再谈对错",
        },
        body: {
          vi: "Tập hợp hợp đồng đã ký, phụ lục, hóa đơn, biên bản giao nhận, email và tin nhắn liên quan theo thứ tự thời gian. Không xóa, không sửa. Chứng cứ điện tử nên được sao lưu kèm thời điểm. Đây là việc rẻ nhất nhưng quyết định nhiều nhất về sau.",
          en: "Collect the signed contract, annexes, invoices, delivery records, emails and messages in chronological order. Do not delete or edit anything. Back up electronic evidence with timestamps. This is the cheapest step and the one that matters most later.",
          zh: "按时间顺序整理已签合同、附件、发票、交接记录、邮件和聊天记录。不要删除或修改。电子证据应带时间戳备份。这是成本最低、却对后续影响最大的一步。",
        },
      },
      {
        heading: {
          vi: "Bước 2: Thông báo vi phạm bằng văn bản",
          en: "Step 2: give written notice of breach",
          zh: "第二步：书面发出违约通知",
        },
        body: {
          vi: "Nhiều hợp đồng quy định bên bị vi phạm phải thông báo và cho một thời hạn khắc phục trước khi áp dụng chế tài. Thông báo nên nêu điều khoản bị vi phạm, thiệt hại đang phát sinh và yêu cầu cụ thể kèm thời hạn. Gửi theo địa chỉ và phương thức mà hợp đồng quy định.",
          en: "Many contracts require the injured party to give notice and a cure period before remedies apply. The notice should identify the clause breached, the loss being incurred and a specific demand with a deadline, sent by the address and method the contract specifies.",
          zh: "许多合同要求受损方在采取救济措施前先发出通知并给予补救期限。通知应写明被违反的条款、正在发生的损失、具体要求及期限，并按合同约定的地址和方式送达。",
        },
      },
      {
        heading: {
          vi: "Bước 3: Thương lượng có chuẩn bị",
          en: "Step 3: negotiate with preparation",
          zh: "第三步：有准备地协商",
        },
        body: {
          vi: "Trước khi gặp, tính rõ con số bạn sẵn sàng chấp nhận, chi phí và thời gian nếu phải kiện, và khả năng thi hành nếu thắng. Một thỏa thuận nhận lại 70% trong ba tháng thường tốt hơn bản án 100% sau hai năm không chắc thu được. Kết quả thương lượng cần lập thành văn bản có chữ ký.",
          en: "Before meeting, work out the figure you would accept, the cost and time of litigation, and whether a judgment could actually be enforced. Recovering 70 percent in three months is often better than a 100 percent judgment two years later that may not be collectible. Record any settlement in a signed document.",
          zh: "会谈前先算清您可接受的数字、诉讼的成本和时间，以及胜诉后能否实际执行。三个月内收回70%，往往好过两年后未必能执行的100%判决。协商结果须形成有签字的书面文件。",
        },
      },
      {
        heading: {
          vi: "Bước 4: Tòa án hay trọng tài",
          en: "Step 4: court or arbitration",
          zh: "第四步：法院还是仲裁",
        },
        body: {
          vi: "Nếu hợp đồng có điều khoản trọng tài hợp lệ, tòa án sẽ từ chối thụ lý; khi đó phải khởi kiện tại trung tâm trọng tài đã thỏa thuận. Trọng tài nhanh và kín hơn nhưng phí cao hơn và phán quyết là chung thẩm. Tòa án rẻ hơn, có hai cấp xét xử, nhưng thời gian dài hơn. Lưu ý thời hiệu khởi kiện tranh chấp hợp đồng là ba năm kể từ ngày biết quyền bị xâm phạm.",
          en: "If the contract has a valid arbitration clause, the court will decline the case and you must file with the agreed arbitration centre. Arbitration is faster and confidential but costs more, and the award is final. Court is cheaper with two instances but takes longer. Note that the limitation period for contract disputes is three years from the date you knew your rights were infringed.",
          zh: "若合同含有效仲裁条款，法院将不予受理，须向约定的仲裁中心提起仲裁。仲裁更快、更保密，但费用更高且裁决为终局。法院费用较低、有两审，但耗时更长。注意合同纠纷的诉讼时效为自知道权利受侵害之日起三年。",
        },
      },
    ],
    sources: [
      {
        label: "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 351 đến 364, Điều 429",
        url: search("91/2015/QH13"),
      },
      {
        label: "Luật Trọng tài thương mại 2010 (số 54/2010/QH12): Điều 5, 6, 61",
        url: search("54/2010/QH12"),
      },
      {
        label: "Bộ luật Tố tụng dân sự 2015 (số 92/2015/QH13): Điều 186, 189",
        url: search("92/2015/QH13"),
      },
    ],
    seoDescription: {
      vi: "Đối tác vi phạm hợp đồng nên làm gì trước khi khởi kiện: lưu chứng cứ, thông báo vi phạm, thương lượng, chọn tòa án hay trọng tài, thời hiệu ba năm.",
      en: "What to do before suing a partner for breach of contract in Vietnam: preserve evidence, notice, negotiation, court versus arbitration, the three-year limitation period.",
      zh: "在越南遇到合作方违约、起诉前应做什么：保全证据、违约通知、协商、法院与仲裁的选择、三年诉讼时效。",
    },
  },
  {
    slug: "chuan-bi-gi-cho-buoi-gap-luat-su-dau-tien",
    title: {
      vi: "Chuẩn bị gì cho buổi gặp luật sư đầu tiên",
      en: "How to prepare for your first meeting with a lawyer",
      zh: "首次与律师会面前的准备",
    },
    summary: {
      vi: "Một buổi gặp đầu được chuẩn bị tốt tiết kiệm cả thời gian lẫn chi phí. Danh sách giấy tờ nên mang, câu hỏi nên hỏi, và những gì bạn có quyền được biết về phí.",
      en: "A well-prepared first meeting saves both time and money. What to bring, what to ask, and what you are entitled to know about fees.",
      zh: "准备充分的首次会面能同时节省时间和费用。应携带的材料、应提出的问题，以及您有权了解的收费信息。",
    },
    keywords:
      "gặp luật sư, tư vấn pháp lý lần đầu, phí luật sư, chuẩn bị hồ sơ, gap luat su",
    sections: [
      {
        heading: {
          vi: "Mang gì đến",
          en: "What to bring",
          zh: "携带什么",
        },
        body: {
          vi: "Giấy tờ gốc hoặc bản chụp rõ của mọi văn bản liên quan: hợp đồng, quyết định, thông báo, giấy chứng nhận. Một tờ tóm tắt sự việc theo thời gian, nửa trang là đủ. Danh sách các bên liên quan và vai trò của họ. Nếu đã trao đổi với luật sư khác hoặc cơ quan nào, mang theo kết quả trao đổi đó.",
          en: "Originals or clear copies of every relevant document: contracts, decisions, notices, certificates. A half-page timeline of events. A list of the parties involved and their roles. If you have already spoken with another lawyer or an authority, bring the outcome of that exchange.",
          zh: "所有相关文件的原件或清晰复印件：合同、决定、通知、证书；半页篇幅的事件时间线；相关各方及其角色的清单；若已与其他律师或机关沟通过，请带上沟通结果。",
        },
      },
      {
        heading: {
          vi: "Nên hỏi gì",
          en: "What to ask",
          zh: "应该问什么",
        },
        body: {
          vi: "Vấn đề của tôi thuộc loại nào và có những hướng xử lý nào. Mỗi hướng mất bao lâu và chi phí ước tính ra sao. Điều gì có thể làm xấu tình hình nếu tôi tự làm. Ai sẽ trực tiếp phụ trách hồ sơ của tôi. Cách liên lạc và tần suất cập nhật.",
          en: "What kind of matter this is and what the options are. How long each option takes and what it is likely to cost. What could make things worse if I act alone. Who will actually handle my file. How we communicate and how often I get updates.",
          zh: "我的问题属于哪一类，有哪些处理方向；每个方向需要多长时间、预计费用多少；如果我自行处理，哪些做法可能使情况恶化；谁将具体负责我的案件；沟通方式和更新频率。",
        },
      },
      {
        heading: {
          vi: "Bạn có quyền được biết gì về phí",
          en: "What you are entitled to know about fees",
          zh: "关于收费您有权知道什么",
        },
        body: {
          vi: "Luật Luật sư quy định mức thù lao và cách tính phải được thỏa thuận trong hợp đồng dịch vụ pháp lý bằng văn bản. Bạn có quyền được nêu rõ phí tính theo giờ, theo vụ việc hay theo tỷ lệ, những chi phí nào tính riêng như lệ phí tòa án, phí dịch thuật, đi lại, và phí có thay đổi khi phạm vi công việc thay đổi hay không. Chưa rõ thì chưa ký.",
          en: "The Law on Lawyers requires fees and the basis of calculation to be agreed in a written legal services contract. You are entitled to know whether fees are hourly, fixed per matter or percentage-based, which costs are charged separately such as court fees, translation and travel, and whether the fee changes if the scope changes. If it is not clear, do not sign yet.",
          zh: "《律师法》规定律师费及计算方式须在书面法律服务合同中约定。您有权明确费用是按小时、按案件固定还是按比例收取；哪些费用另计，如诉讼费、翻译费、差旅费；以及工作范围变化时费用是否调整。不清楚就先不签。",
        },
      },
    ],
    sources: [
      {
        label: "Luật Luật sư 2006 (số 65/2006/QH11, sửa đổi 2012): Điều 26, 55, 56",
        url: search("65/2006/QH11"),
      },
    ],
    seoDescription: {
      vi: "Chuẩn bị cho buổi gặp luật sư đầu tiên: giấy tờ cần mang, câu hỏi nên hỏi, và quyền được biết về phí theo Luật Luật sư.",
      en: "Preparing for a first meeting with a lawyer in Vietnam: documents to bring, questions to ask, and your right to clear fee terms under the Law on Lawyers.",
      zh: "在越南首次会见律师的准备：应带文件、应问问题，以及依据《律师法》了解收费的权利。",
    },
  },
];
