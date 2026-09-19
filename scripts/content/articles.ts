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
  "https://thuvienphapluat.vn/page/tim-van-ban.aspx?keyword=" +
  encodeURIComponent(number);

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
        label:
          "Luật Thương mại 2005 (số 36/2005/QH11): Điều 300 đến 316 về chế tài",
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
        label:
          "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 351 đến 364, Điều 429",
        url: search("91/2015/QH13"),
      },
      {
        label:
          "Luật Trọng tài thương mại 2010 (số 54/2010/QH12): Điều 5, 6, 61",
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
        label:
          "Luật Luật sư 2006 (số 65/2006/QH11, sửa đổi 2012): Điều 26, 55, 56",
        url: search("65/2006/QH11"),
      },
    ],
    seoDescription: {
      vi: "Chuẩn bị cho buổi gặp luật sư đầu tiên: giấy tờ cần mang, câu hỏi nên hỏi, và quyền được biết về phí theo Luật Luật sư.",
      en: "Preparing for a first meeting with a lawyer in Vietnam: documents to bring, questions to ask, and your right to clear fee terms under the Law on Lawyers.",
      zh: "在越南首次会见律师的准备：应带文件、应问问题，以及依据《律师法》了解收费的权利。",
    },
  },
  {
    slug: "kiem-tra-phap-ly-truoc-khi-dat-coc-mua-dat",
    title: {
      vi: "Kiểm tra pháp lý trước khi đặt cọc mua đất",
      en: "Legal checks before paying a deposit on land",
      zh: "支付购地定金前的法律核查",
    },
    summary: {
      vi: "Sau khi đã đặt cọc, phần lớn lựa chọn của bên mua đã bị thu hẹp. Bài viết nêu những gì cần kiểm tra trước, và vì sao thỏa thuận đặt cọc nên được viết kỹ như hợp đồng chính.",
      en: "Once a deposit is paid, most of the buyer's options have already narrowed. What to check first, and why the deposit agreement deserves as much care as the sale contract itself.",
      zh: "一旦支付定金，买方的选择余地已大为缩小。本文说明应先核查什么，以及定金协议为何值得与正式合同同样认真对待。",
    },
    keywords:
      "mua đất, đặt cọc, sổ đỏ, kiểm tra pháp lý, mua dat, dat coc, so do, chuyển nhượng quyền sử dụng đất",
    sections: [
      {
        heading: {
          vi: "Kiểm tra thửa đất trước khi nói tới giá",
          en: "Check the land before discussing price",
          zh: "谈价格之前先核查地块",
        },
        body: {
          vi: "Xem giấy chứng nhận quyền sử dụng đất bản gốc, đối chiếu số thửa, số tờ bản đồ và diện tích với thực địa. Tra cứu quy hoạch tại cơ quan quản lý đất đai địa phương để biết thửa đất có nằm trong diện thu hồi hay hành lang bảo vệ công trình không. Kiểm tra tình trạng thế chấp, kê biên hoặc tranh chấp đang có. Ba việc này làm trước khi đặt cọc thì còn rút được; làm sau thì chỉ còn cách thương lượng.",
          en: "Inspect the original land use right certificate and match the plot number, map sheet and area against what is on the ground. Check the zoning at the local land authority to see whether the plot falls within a planned acquisition or a protection corridor. Check for any mortgage, seizure or ongoing dispute. Do these three before the deposit and you can still walk away; do them after and negotiation is all that is left.",
          zh: "查看土地使用权证原件，将地块编号、图幅号与面积同现场核对；到当地土地管理机关查询规划，确认地块是否位于征收范围或工程保护走廊内；核查是否存在抵押、查封或正在进行的争议。这三件事在付定金前做还能抽身，付定金后就只剩谈判一途。",
        },
      },
      {
        heading: {
          vi: "Kiểm tra bên bán, không chỉ kiểm tra đất",
          en: "Check the seller, not just the land",
          zh: "不仅核查土地，也要核查卖方",
        },
        body: {
          vi: "Người ký có phải người đứng tên trên giấy chứng nhận không. Nếu đất là tài sản chung của vợ chồng thì cần cả hai cùng ký hoặc có văn bản ủy quyền hợp lệ. Nếu bên bán là người thừa kế thì hồ sơ khai nhận di sản đã hoàn tất chưa. Nếu ký qua người được ủy quyền thì văn bản ủy quyền còn hiệu lực và có đủ phạm vi cho việc chuyển nhượng không. Sai ở khâu thẩm quyền ký khiến giao dịch có thể bị tuyên vô hiệu dù giá cả đã thống nhất.",
          en: "Is the person signing the one named on the certificate? If the land is marital property, both spouses must sign or there must be a valid power of attorney. If the seller inherited it, has the estate declaration been completed? If an attorney-in-fact signs, is the authorisation still valid and wide enough to cover a transfer? A defect in signing authority can render the transaction void however well the price was agreed.",
          zh: "签字人是否为证书上的登记人？若土地属夫妻共同财产，须双方共同签署或持有有效授权书；若卖方为继承人，遗产申报手续是否已完成；若由受托人签署，授权是否仍有效且范围足以涵盖转让。签署权限上的瑕疵，可能使交易被认定无效，无论价格谈得多好。",
        },
      },
      {
        heading: {
          vi: "Viết thỏa thuận đặt cọc cho rõ",
          en: "Write the deposit agreement clearly",
          zh: "把定金协议写清楚",
        },
        body: {
          vi: "Đặt cọc được Bộ luật Dân sự quy định tại Điều 328: bên đặt cọc từ chối giao kết thì mất cọc, bên nhận cọc từ chối thì phải trả lại cọc và một khoản tương đương. Vì hậu quả nặng như vậy, thỏa thuận nên ghi rõ thời hạn ký hợp đồng công chứng, bên nào chịu thuế và lệ phí, xử lý thế nào nếu hồ sơ không công chứng được vì lý do từ phía bên bán, và điều kiện hoàn cọc khi kết quả kiểm tra quy hoạch không như thông tin đã cung cấp.",
          en: "Deposits are governed by Article 328 of the Civil Code: a buyer who backs out forfeits the deposit, a seller who backs out returns it plus an equivalent amount. Given those consequences, the agreement should state the deadline for signing the notarised contract, who bears taxes and fees, what happens if notarisation fails for reasons on the seller's side, and when the deposit is refundable if the zoning check contradicts what was represented.",
          zh: "定金由《民法典》第328条规定：交付定金一方拒绝订立合同的丧失定金，收受定金一方拒绝的应返还定金并支付相当金额。后果如此之重，协议应写明公证合同的签署期限、税费由谁承担、因卖方原因无法公证时如何处理，以及规划核查结果与所述不符时定金可退还的条件。",
        },
      },
    ],
    sources: [
      {
        label: "Bộ luật Dân sự 2015 (số 91/2015/QH13): Điều 328 về đặt cọc",
        url: search("91/2015/QH13"),
      },
      {
        label:
          "Luật Đất đai 2024 (số 31/2024/QH15): điều kiện thực hiện quyền chuyển nhượng quyền sử dụng đất",
        url: search("31/2024/QH15"),
      },
      {
        label:
          "Luật Công chứng 2014 (số 53/2014/QH13): công chứng hợp đồng chuyển nhượng",
        url: search("53/2014/QH13"),
      },
    ],
    seoDescription: {
      vi: "Cần kiểm tra gì trước khi đặt cọc mua đất: giấy chứng nhận, quy hoạch, thế chấp, thẩm quyền ký của bên bán và các điều khoản nên có trong thỏa thuận đặt cọc.",
      en: "What to check before paying a deposit on land in Vietnam: the certificate, zoning, mortgages, the seller's signing authority, and what the deposit agreement should say.",
      zh: "在越南支付购地定金前应核查什么：权属证书、规划、抵押、卖方签署权限，以及定金协议应写明的条款。",
    },
  },
  {
    slug: "cham-dut-hop-dong-lao-dong-dung-trinh-tu",
    title: {
      vi: "Chấm dứt hợp đồng lao động đúng trình tự",
      en: "Ending an employment contract in the right order",
      zh: "依法定程序终止劳动合同",
    },
    summary: {
      vi: "Phần lớn tranh chấp lao động không phát sinh từ quyết định chấm dứt, mà từ trình tự thực hiện quyết định đó. Bài viết nêu các căn cứ chấm dứt, nghĩa vụ báo trước và những việc phải hoàn tất sau ngày cuối cùng.",
      en: "Most employment disputes arise not from the decision to end a contract but from how that decision was carried out. The grounds for termination, notice obligations, and what must be completed after the final working day.",
      zh: "多数劳动争议并非源于终止决定本身，而是源于执行该决定的程序。本文说明终止事由、提前通知义务，以及最后工作日之后必须完成的事项。",
    },
    keywords:
      "chấm dứt hợp đồng lao động, sa thải, nghỉ việc, trợ cấp thôi việc, cham dut hop dong lao dong, sa thai, bao truoc",
    sections: [
      {
        heading: {
          vi: "Xác định đúng căn cứ chấm dứt",
          en: "Identify the correct ground",
          zh: "确定正确的终止事由",
        },
        body: {
          vi: "Bộ luật Lao động 2019 liệt kê các trường hợp chấm dứt hợp đồng tại Điều 34, trong đó có hết hạn hợp đồng, hai bên thỏa thuận, người lao động đơn phương chấm dứt theo Điều 35 và người sử dụng lao động đơn phương chấm dứt theo Điều 36. Mỗi căn cứ có điều kiện và thủ tục riêng, và việc chọn sai căn cứ ngay từ đầu thường là nguyên nhân khiến quyết định bị coi là trái pháp luật về sau — chứ không phải vì lý do chấm dứt không chính đáng.",
          en: "The 2019 Labour Code lists the grounds for termination in Article 34, including expiry, mutual agreement, unilateral termination by the employee under Article 35 and by the employer under Article 36. Each ground carries its own conditions and procedure, and choosing the wrong one at the outset is a common reason a decision is later held unlawful — not because the underlying reason was unjustified.",
          zh: "《2019年劳动法典》第34条列举了合同终止的情形，包括期满、双方协商一致、劳动者依第35条单方终止、用人单位依第36条单方终止。每种事由都有各自的条件与程序；起初选错事由，往往正是决定日后被认定违法的原因——而非终止理由本身不正当。",
        },
      },
      {
        heading: {
          vi: "Báo trước đúng thời hạn và đúng hình thức",
          en: "Give notice in the right form and time",
          zh: "以正确形式和期限提前通知",
        },
        body: {
          vi: "Thời hạn báo trước phụ thuộc vào loại hợp đồng và bên nào chấm dứt; một số trường hợp luật quy định không phải báo trước. Thông báo nên bằng văn bản, ghi rõ căn cứ và ngày chấm dứt, giao trực tiếp có ký nhận hoặc gửi theo cách chứng minh được đã gửi. Thông báo miệng có thể đúng về nội dung nhưng không chứng minh được khi phát sinh tranh chấp, và gánh nặng chứng minh thường thuộc về bên đưa ra quyết định.",
          en: "The notice period depends on the type of contract and which side is terminating; in some situations the law requires no notice at all. Notice should be in writing, state the ground and the end date, and be delivered against signature or by a method that can be evidenced. Verbal notice may be correct in substance but cannot be proved in a dispute, and the burden of proof usually falls on the party that made the decision.",
          zh: "提前通知期限取决于合同类型及由哪一方终止；在某些情形下法律规定无需提前通知。通知宜采用书面形式，写明事由与终止日期，并当面签收或以可举证的方式送达。口头通知在内容上可能正确，但发生争议时无法证明，而举证责任通常落在作出决定的一方。",
        },
      },
      {
        heading: {
          vi: "Hoàn tất nghĩa vụ sau ngày làm việc cuối cùng",
          en: "Complete the obligations after the last working day",
          zh: "完成最后工作日之后的义务",
        },
        body: {
          vi: "Điều 48 Bộ luật Lao động 2019 quy định trách nhiệm của hai bên khi chấm dứt hợp đồng, gồm thời hạn thanh toán các khoản liên quan đến quyền lợi và việc hoàn thành thủ tục xác nhận thời gian đóng bảo hiểm xã hội, trả lại giấy tờ đã giữ. Trợ cấp thôi việc được quy định tại Điều 46 cho những trường hợp đủ điều kiện. Hồ sơ nên lưu đủ: quyết định, thông báo, biên bản bàn giao, chứng từ thanh toán — vì khi tranh chấp xảy ra, đây là những gì được xem xét.",
          en: "Article 48 of the 2019 Labour Code sets out both parties' responsibilities on termination, including the deadline for settling entitlements, completing social insurance confirmation and returning documents held. Severance allowance is governed by Article 46 for those who qualify. Keep the full file: the decision, the notice, the handover record and the payment vouchers — these are what a dispute will be decided on.",
          zh: "《2019年劳动法典》第48条规定了合同终止时双方的责任，包括结清相关权益的期限、完成社会保险缴纳时间确认手续、归还所保管的证件。符合条件者的离职津贴由第46条规定。应完整留存档案：决定、通知、交接记录、付款凭证——争议发生时，正是依据这些材料作出判断。",
        },
      },
    ],
    sources: [
      {
        label:
          "Bộ luật Lao động 2019 (số 45/2019/QH14): Điều 34, 35, 36, 46, 48",
        url: search("45/2019/QH14"),
      },
    ],
    seoDescription: {
      vi: "Chấm dứt hợp đồng lao động đúng trình tự: căn cứ theo Điều 34, nghĩa vụ báo trước, trợ cấp thôi việc và các nghĩa vụ phải hoàn tất sau ngày làm việc cuối cùng.",
      en: "Ending an employment contract in Vietnam correctly: grounds under Article 34, notice obligations, severance allowance and what must be completed after the last working day.",
      zh: "在越南依程序终止劳动合同：第34条规定的事由、提前通知义务、离职津贴，以及最后工作日之后须完成的事项。",
    },
  },
  {
    slug: "thu-tuc-ly-hon-can-chuan-bi-gi",
    title: {
      vi: "Thủ tục ly hôn cần chuẩn bị những gì",
      en: "What a divorce procedure requires you to prepare",
      zh: "办理离婚需要准备什么",
    },
    summary: {
      vi: "Ly hôn thuận tình và ly hôn theo yêu cầu của một bên đi theo hai đường khác nhau. Bài viết nêu giấy tờ cần chuẩn bị, những vấn đề phải thống nhất trước, và vì sao phần con cái và tài sản nên tách riêng.",
      en: "Divorce by mutual consent and divorce at one party's request follow different paths. The documents to prepare, the matters to settle in advance, and why children and property are best handled separately.",
      zh: "协议离婚与一方请求离婚走的是两条不同路径。本文说明应准备的文件、需事先达成一致的事项，以及子女与财产为何宜分开处理。",
    },
    keywords:
      "ly hôn, thuận tình ly hôn, đơn phương ly hôn, chia tài sản, quyền nuôi con, ly hon, thuan tinh ly hon",
    sections: [
      {
        heading: {
          vi: "Hai con đường, hai bộ hồ sơ",
          en: "Two routes, two sets of papers",
          zh: "两条路径，两套材料",
        },
        body: {
          vi: "Luật Hôn nhân và gia đình 2014 phân biệt thuận tình ly hôn tại Điều 55 và ly hôn theo yêu cầu của một bên tại Điều 56. Thuận tình là khi hai bên đã thống nhất cả việc chấm dứt hôn nhân, việc trông nom con và chia tài sản; thiếu một trong ba thì vụ việc thường chuyển sang hướng còn lại. Xác định đúng đường đi ngay từ đầu tránh việc nộp hồ sơ rồi phải làm lại theo thủ tục khác.",
          en: "The 2014 Law on Marriage and Family distinguishes divorce by mutual consent under Article 55 from divorce at one party's request under Article 56. Mutual consent means both sides have agreed on ending the marriage, the care of any children and the division of property; if any of the three is unresolved, the matter usually moves to the other route. Identifying the right route at the start avoids filing and then having to start again under a different procedure.",
          zh: "《2014年婚姻家庭法》将第55条的协议离婚与第56条的一方请求离婚区分开来。协议离婚是指双方已就结束婚姻、子女照护及财产分割达成一致；三者缺一，案件通常转入另一路径。一开始就确定正确路径，可避免提交材料后又须按另一程序重新办理。",
        },
      },
      {
        heading: {
          vi: "Giấy tờ nên chuẩn bị trước",
          en: "Documents to prepare in advance",
          zh: "宜事先准备的文件",
        },
        body: {
          vi: "Bản chính giấy chứng nhận kết hôn, giấy tờ tùy thân của hai bên, giấy khai sinh của con, và giấy tờ về tài sản đứng tên một trong hai bên hoặc cả hai. Với tài sản hình thành trong thời kỳ hôn nhân, nên tập hợp chứng từ cho thấy nguồn gốc và thời điểm hình thành, vì đó là điều được xem xét khi chia. Thiếu bản chính giấy chứng nhận kết hôn là vướng mắc thường gặp nhất và có thủ tục riêng để xử lý.",
          en: "The original marriage certificate, both parties' identity documents, the children's birth certificates, and papers for property held in either or both names. For property acquired during the marriage, gather evidence of its origin and when it was acquired, since that is what is examined on division. A missing original marriage certificate is the most common obstacle and has its own procedure for resolution.",
          zh: "结婚证原件、双方身份证件、子女出生证明，以及登记在一方或双方名下的财产文件。对婚姻关系存续期间形成的财产，宜收集能显示来源与形成时间的凭证，因为分割时正是审查这些内容。缺少结婚证原件是最常见的障碍，并有专门的处理程序。",
        },
      },
      {
        heading: {
          vi: "Tách phần con cái ra khỏi phần tài sản",
          en: "Keep the children separate from the property",
          zh: "将子女事项与财产事项分开",
        },
        body: {
          vi: "Điều 81 Luật Hôn nhân và gia đình 2014 đặt việc trông nom, chăm sóc, giáo dục con sau ly hôn theo hướng bảo đảm quyền lợi của con, còn Điều 59 nêu nguyên tắc giải quyết tài sản. Đây là hai vấn đề được cân nhắc theo hai tiêu chí khác nhau. Gộp chúng vào một cuộc thương lượng — nhường tài sản để đổi lấy quyền nuôi con hoặc ngược lại — thường khiến cả hai phần đều khó đạt thỏa thuận và kéo dài vụ việc.",
          en: "Article 81 of the 2014 Law approaches the care, upbringing and education of children after divorce from the standpoint of the child's interests, while Article 59 sets out the principles for dividing property. These are weighed against different criteria. Merging them into one negotiation — conceding property in exchange for custody or the reverse — usually makes both harder to settle and lengthens the case.",
          zh: "《2014年婚姻家庭法》第81条从子女利益出发处理离婚后子女的照护、抚养与教育，第59条则规定财产分割原则。二者依不同标准衡量。把它们并入同一场谈判——以财产换取抚养权或反之——通常使两部分都更难达成一致，并拖长案件。",
        },
      },
    ],
    sources: [
      {
        label:
          "Luật Hôn nhân và gia đình 2014 (số 52/2014/QH13): Điều 51, 55, 56, 59, 81",
        url: search("52/2014/QH13"),
      },
      {
        label:
          "Bộ luật Tố tụng dân sự 2015 (số 92/2015/QH13): thẩm quyền và trình tự giải quyết",
        url: search("92/2015/QH13"),
      },
    ],
    seoDescription: {
      vi: "Thủ tục ly hôn cần chuẩn bị gì: phân biệt thuận tình và đơn phương, giấy tờ cần có, và vì sao phần con cái nên tách khỏi phần chia tài sản.",
      en: "What to prepare for a divorce in Vietnam: mutual consent versus one-party request, the documents required, and why custody is best kept separate from property division.",
      zh: "在越南办理离婚需准备什么：协议离婚与一方请求离婚的区别、所需文件，以及子女事项为何宜与财产分割分开处理。",
    },
  },
];
