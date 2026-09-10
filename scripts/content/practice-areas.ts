/**
 * Nội dung dự thảo cho bốn lĩnh vực chuyên môn, ba ngôn ngữ.
 *
 * Đây là mô tả phạm vi hỗ trợ và quy trình làm việc — không khẳng định kết quả,
 * không nêu tên khách hàng, không dẫn số liệu. Câu hỏi thường gặp cố ý giữ ở
 * mức quy trình chứ không tư vấn pháp lý cụ thể, vì nội dung tư vấn phải do
 * luật sư của công ty soạn và chịu trách nhiệm.
 *
 * Mọi bản ghi được nạp ở trạng thái nháp, chờ công ty rà soát và xuất bản.
 */
export type Localised = { vi: string; en: string; zh: string };
export type Step = { heading: Localised; description: Localised };
export type Faq = { question: Localised; answer: Localised };
export type PracticeArea = {
  slug: string;
  title: Localised;
  summary: Localised;
  audience: Localised;
  scope: Localised[];
  process: Step[];
  faq: Faq[];
  seoDescription: Localised;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "dau-tu-doanh-nghiep",
    title: {
      vi: "Đầu tư & doanh nghiệp",
      en: "Investment & corporate",
      zh: "投资与企业",
    },
    summary: {
      vi: "Từ quyết định đầu tư ban đầu đến hoạt động thường ngày của doanh nghiệp: cơ cấu phù hợp, thủ tục đúng trình tự và quản trị nội bộ vận hành được.",
      en: "From the initial investment decision to everyday operations: an appropriate structure, procedures in the right order, and internal governance that actually works.",
      zh: "从最初的投资决策到企业日常经营：合适的架构、依序完成的手续，以及真正可运行的内部治理。",
    },
    audience: {
      vi: "Nhà đầu tư đang cân nhắc vào thị trường Việt Nam, doanh nghiệp chuẩn bị thành lập hoặc tái cơ cấu, và bộ phận pháp chế cần rà soát lại nền tảng quản trị hiện có.",
      en: "Investors considering the Vietnamese market, businesses preparing to incorporate or restructure, and in-house teams reviewing the governance foundations already in place.",
      zh: "正在考虑进入越南市场的投资者、准备设立或重组的企业，以及需要重新审视既有治理基础的法务部门。",
    },
    scope: [
      {
        vi: "Lựa chọn hình thức đầu tư và cơ cấu sở hữu",
        en: "Choice of investment form and ownership structure",
        zh: "投资形式与股权架构的选择",
      },
      {
        vi: "Thủ tục đăng ký đầu tư và đăng ký doanh nghiệp",
        en: "Investment registration and enterprise registration procedures",
        zh: "投资登记与企业登记手续",
      },
      {
        vi: "Điều lệ, thỏa thuận cổ đông và phân định thẩm quyền nội bộ",
        en: "Charter, shareholders' agreement and allocation of internal authority",
        zh: "章程、股东协议与内部权限划分",
      },
      {
        vi: "Rà soát pháp lý trước giao dịch mua bán, sáp nhập hoặc chuyển nhượng vốn",
        en: "Legal due diligence ahead of an acquisition, merger or capital transfer",
        zh: "并购或股权转让交易前的法律尽职调查",
      },
      {
        vi: "Điều kiện kinh doanh theo ngành nghề và nghĩa vụ tuân thủ định kỳ",
        en: "Sector-specific business conditions and recurring compliance obligations",
        zh: "行业经营条件与定期合规义务",
      },
      {
        vi: "Thay đổi cơ cấu, tăng giảm vốn, tạm ngừng và chấm dứt hoạt động",
        en: "Structural changes, capital increases and reductions, suspension and dissolution",
        zh: "架构变更、增减资本、暂停与终止经营",
      },
    ],
    process: [
      {
        heading: {
          vi: "Làm rõ mục tiêu thương mại",
          en: "Clarify the commercial objective",
          zh: "厘清商业目标",
        },
        description: {
          vi: "Cơ cấu pháp lý phù hợp phụ thuộc vào điều bạn muốn đạt được: tỷ lệ chi phối, khả năng thoái vốn, hay tốc độ đưa hoạt động vào vận hành. Bước đầu tiên là thống nhất thứ tự ưu tiên giữa các mục tiêu đó.",
          en: "The right legal structure depends on what you want to achieve: control, an exit route, or speed to operation. The first step is agreeing how those objectives rank against each other.",
          zh: "合适的法律架构取决于您想达成什么：控制权、退出通道，还是尽快投入运营。第一步是就这些目标的优先次序达成一致。",
        },
      },
      {
        heading: {
          vi: "Đối chiếu điều kiện áp dụng",
          en: "Check the conditions that apply",
          zh: "核对适用条件",
        },
        description: {
          vi: "Ngành nghề, nguồn vốn và địa bàn quyết định thủ tục nào bắt buộc, thời hạn dự kiến và hồ sơ cần chuẩn bị. Việc đối chiếu sớm giúp tránh phải làm lại từ đầu.",
          en: "Sector, source of capital and location determine which procedures are mandatory, the likely timeline and the documents to prepare. Checking early avoids having to start over.",
          zh: "行业、资金来源与经营地决定哪些手续是强制的、预计需时多久、需要准备哪些材料。及早核对可避免推倒重来。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị hồ sơ và văn kiện nội bộ",
          en: "Prepare filings and internal instruments",
          zh: "准备申报材料与内部文件",
        },
        description: {
          vi: "Hồ sơ nộp cơ quan nhà nước và văn kiện nội bộ được soạn đồng bộ, để những gì đăng ký với cơ quan quản lý khớp với cách doanh nghiệp thực sự vận hành.",
          en: "Filings for the authorities and internal instruments are drafted together, so what is registered matches how the business will actually be run.",
          zh: "向主管机关提交的材料与内部文件同步起草，使登记内容与企业实际运作方式一致。",
        },
      },
      {
        heading: {
          vi: "Bàn giao và theo dõi nghĩa vụ định kỳ",
          en: "Hand over and track recurring obligations",
          zh: "交接并跟踪定期义务",
        },
        description: {
          vi: "Kết thúc công việc, bạn nhận danh mục nghĩa vụ định kỳ kèm mốc thời gian, để bộ phận nội bộ tiếp quản mà không phải tra lại từ đầu.",
          en: "At handover you receive a schedule of recurring obligations with their deadlines, so your own team can take over without reconstructing it.",
          zh: "工作结束时您将收到附有期限的定期义务清单，便于内部团队直接接手。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Cần chuẩn bị gì cho buổi trao đổi đầu tiên?",
          en: "What should I prepare for the first conversation?",
          zh: "第一次沟通需要准备什么？",
        },
        answer: {
          vi: "Mô tả ngắn về hoạt động dự kiến, cơ cấu sở hữu mong muốn và mốc thời gian bạn đang nhắm tới. Nếu đã có văn kiện nào — biên bản ghi nhớ, dự thảo điều lệ, giấy tờ pháp nhân của bên đầu tư — hãy mang theo để việc đánh giá sát thực tế hơn.",
          en: "A short description of the intended activity, the ownership structure you have in mind and the timeline you are working towards. If any documents already exist — a memorandum of understanding, a draft charter, corporate documents of the investing entity — bring them so the assessment is grounded in the actual position.",
          zh: "对拟开展业务的简要说明、期望的股权架构，以及您设定的时间节点。如果已有文件——谅解备忘录、章程草案、投资方的法人证件——请一并提供，以便评估更贴近实际。",
        },
      },
      {
        question: {
          vi: "Thời gian hoàn tất thủ tục là bao lâu?",
          en: "How long do the procedures take?",
          zh: "办理手续需要多长时间？",
        },
        answer: {
          vi: "Thời hạn phụ thuộc vào ngành nghề, hình thức đầu tư và tính đầy đủ của hồ sơ. Thời hạn luật định chỉ là một phần; thực tế còn phụ thuộc vào yêu cầu bổ sung của cơ quan tiếp nhận. Chúng tôi ước lượng mốc thời gian cụ thể sau khi xem hồ sơ, và nói rõ đâu là phần nằm ngoài khả năng kiểm soát.",
          en: "The timeline depends on the sector, the form of investment and how complete the file is. Statutory deadlines are only part of it; in practice much depends on requests for additional documents from the receiving authority. We give a specific estimate after reviewing the file, and say plainly which parts are outside anyone's control.",
          zh: "所需时间取决于行业、投资形式以及材料的完备程度。法定期限只是其中一部分，实践中还取决于受理机关是否要求补充材料。我们会在查看材料后给出具体预估，并明确说明哪些环节不可控。",
        },
      },
      {
        question: {
          vi: "Có bắt buộc dùng luật sư cho các thủ tục này không?",
          en: "Is a lawyer required for these procedures?",
          zh: "办理这些手续必须请律师吗？",
        },
        answer: {
          vi: "Không bắt buộc. Doanh nghiệp có thể tự thực hiện. Vai trò của luật sư nằm ở chỗ nhận diện sớm những lựa chọn khó đảo ngược — cơ cấu sở hữu, phân định thẩm quyền, cam kết trong thỏa thuận — vì sửa sau thường tốn kém hơn nhiều so với cân nhắc kỹ từ đầu.",
          en: "No. A company may handle them itself. A lawyer's role is to identify early the choices that are hard to reverse — ownership structure, allocation of authority, undertakings in agreements — because correcting them later usually costs considerably more than thinking them through at the outset.",
          zh: "并非必须，企业可以自行办理。律师的作用在于及早识别难以逆转的选择——股权架构、权限划分、协议中的承诺——因为事后更正的代价通常远高于起初的审慎考虑。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý về đầu tư và doanh nghiệp tại Việt Nam: cơ cấu sở hữu, thủ tục đăng ký, điều lệ và thỏa thuận cổ đông, rà soát trước giao dịch, tuân thủ định kỳ.",
      en: "Legal support for investment and corporate matters in Vietnam: ownership structure, registration procedures, charters and shareholders' agreements, pre-transaction due diligence and recurring compliance.",
      zh: "越南投资与企业法律支持：股权架构、登记手续、章程与股东协议、交易前尽职调查及定期合规。",
    },
  },
  {
    slug: "giai-quyet-tranh-chap",
    title: {
      vi: "Giải quyết tranh chấp",
      en: "Dispute resolution",
      zh: "争议解决",
    },
    summary: {
      vi: "Nhìn rõ vị thế của mình trước khi chọn cách đi: đánh giá chứng cứ, cân nhắc thương lượng hay tố tụng, và chuẩn bị hồ sơ cho phương án đã chọn.",
      en: "See your position clearly before choosing a route: assess the evidence, weigh negotiation against proceedings, and prepare the file for whichever path you take.",
      zh: "在选择路径前先看清自身处境：评估证据、权衡协商与诉讼，并为既定方案准备材料。",
    },
    audience: {
      vi: "Doanh nghiệp và cá nhân đang có bất đồng chưa thành vụ việc, đang nhận được yêu cầu từ đối tác, hoặc đã bị khởi kiện và cần đánh giá lại phương án.",
      en: "Businesses and individuals with a disagreement that has not yet become a case, those receiving demands from a counterparty, and those already sued who need to reassess their options.",
      zh: "尚未形成案件的争议方、正在收到对方要求的一方，以及已被起诉、需要重新评估方案的企业与个人。",
    },
    scope: [
      {
        vi: "Đánh giá hồ sơ, chứng cứ và vị thế pháp lý",
        en: "Assessment of the file, the evidence and your legal position",
        zh: "对材料、证据与法律地位的评估",
      },
      {
        vi: "Rà soát thời hiệu và điều khoản giải quyết tranh chấp trong hợp đồng",
        en: "Review of limitation periods and the dispute clause in the contract",
        zh: "审查时效及合同中的争议解决条款",
      },
      {
        vi: "Thư yêu cầu, thương lượng và hòa giải",
        en: "Demand letters, negotiation and mediation",
        zh: "催告函、协商与调解",
      },
      {
        vi: "Chuẩn bị hồ sơ khởi kiện hoặc hồ sơ trọng tài",
        en: "Preparation of court filings or arbitration submissions",
        zh: "起诉材料或仲裁申请的准备",
      },
      {
        vi: "Đại diện và tham gia tố tụng theo phạm vi được ủy quyền",
        en: "Representation and participation in proceedings within the scope of the mandate",
        zh: "在授权范围内代理并参与诉讼程序",
      },
      {
        vi: "Vấn đề thi hành sau khi có phán quyết",
        en: "Enforcement issues once a decision has been made",
        zh: "裁决作出后的执行问题",
      },
    ],
    process: [
      {
        heading: {
          vi: "Dựng lại diễn biến sự việc",
          en: "Reconstruct what happened",
          zh: "还原事件经过",
        },
        description: {
          vi: "Trước khi bàn về phương án, cần một dòng thời gian thống nhất: điều gì đã xảy ra, có văn bản nào ghi nhận, và bên kia đã nói gì. Phần lớn kết quả đánh giá phụ thuộc vào bước này.",
          en: "Before discussing options, an agreed timeline is needed: what happened, what documents record it, and what the other side has said. Most of the assessment rests on this step.",
          zh: "在讨论方案之前，需要一条各方认可的时间线：发生了什么、有哪些文件记录、对方说了什么。评估结论在很大程度上取决于这一步。",
        },
      },
      {
        heading: {
          vi: "Đánh giá thẳng thắn về vị thế",
          en: "An honest assessment of your position",
          zh: "对自身处境的坦率评估",
        },
        description: {
          vi: "Bạn nhận được đánh giá về điểm mạnh, điểm yếu và những gì còn chưa rõ — kể cả khi kết luận là nên thương lượng thay vì theo đuổi tố tụng. Không cam kết về kết quả.",
          en: "You receive an assessment of the strengths, the weaknesses and what remains uncertain — including where the conclusion is that settlement serves you better than proceedings. No outcome is promised.",
          zh: "您将获得关于优势、劣势与不确定之处的评估——包括结论是协商优于诉讼的情形。不对结果作出承诺。",
        },
      },
      {
        heading: {
          vi: "Chọn phương án và thống nhất phạm vi",
          en: "Choose a route and agree the scope",
          zh: "选择方案并确定范围",
        },
        description: {
          vi: "Mỗi phương án có chi phí, thời gian và mức rủi ro khác nhau. Sau khi bạn quyết định, phạm vi công việc, phí và người phụ trách được xác định bằng văn bản trước khi bắt đầu.",
          en: "Each route carries a different cost, timeline and level of risk. Once you decide, the scope of work, the fee and the responsible lawyer are set out in writing before work starts.",
          zh: "每种方案在成本、时间与风险上各不相同。您作出决定后，工作范围、费用与负责律师将在开始前以书面形式确定。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Tôi nên liên hệ luật sư ở thời điểm nào?",
          en: "When should I contact a lawyer?",
          zh: "我应该在什么时候联系律师？",
        },
        answer: {
          vi: "Càng sớm càng tốt, và đặc biệt là trước khi trả lời bằng văn bản cho bên kia. Một thư trả lời gửi đi có thể được viện dẫn về sau. Thời hiệu khởi kiện cũng là lý do không nên trì hoãn.",
          en: "As early as possible, and in particular before replying in writing to the other side. A letter once sent can be relied on later. Limitation periods are a further reason not to wait.",
          zh: "越早越好，尤其是在以书面形式答复对方之前。已发出的函件日后可能被援引。诉讼时效也是不宜拖延的原因。",
        },
      },
      {
        question: {
          vi: "Thương lượng có làm mất quyền khởi kiện không?",
          en: "Does negotiating give up my right to sue?",
          zh: "协商会不会丧失起诉权？",
        },
        answer: {
          vi: "Việc thương lượng tự nó không làm mất quyền khởi kiện, nhưng nội dung bạn thừa nhận trong quá trình thương lượng có thể ảnh hưởng đến vụ việc, và thời gian thương lượng kéo dài có thể chạm tới thời hiệu. Đây là lý do nên xác định trước điều gì được trao đổi và trao đổi theo hình thức nào.",
          en: "Negotiating does not in itself give up the right to sue, but what you concede during negotiation can affect the case, and a long negotiation can run into the limitation period. That is why it is worth settling in advance what will be discussed and in what form.",
          zh: "协商本身并不导致起诉权丧失，但协商过程中所作的承认可能影响案件，且协商拖延可能触及时效。因此宜事先确定沟通的内容与形式。",
        },
      },
      {
        question: {
          vi: "Chi phí theo đuổi một vụ việc là bao nhiêu?",
          en: "What does pursuing a matter cost?",
          zh: "推进一起案件的费用是多少？",
        },
        answer: {
          vi: "Chi phí phụ thuộc vào phương án, giá trị tranh chấp và mức độ phức tạp của chứng cứ. Ngoài phí dịch vụ còn có án phí, lệ phí và chi phí phát sinh khác. Chúng tôi ước lượng theo từng giai đoạn sau khi xem hồ sơ, thay vì đưa một con số trọn gói khi chưa rõ phạm vi.",
          en: "It depends on the route, the amount in dispute and how complex the evidence is. Beyond professional fees there are court fees, charges and other outlays. We estimate stage by stage after reviewing the file, rather than quoting a single figure before the scope is known.",
          zh: "费用取决于方案、争议金额与证据的复杂程度。除服务费外，还有诉讼费、规费及其他支出。我们会在查看材料后分阶段预估，而不会在范围未明时给出一口价。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ giải quyết tranh chấp: đánh giá chứng cứ và vị thế pháp lý, rà soát thời hiệu, thương lượng và hòa giải, chuẩn bị hồ sơ khởi kiện hoặc trọng tài.",
      en: "Dispute resolution support: assessment of evidence and legal position, limitation review, negotiation and mediation, preparation of court or arbitration filings.",
      zh: "争议解决支持：证据与法律地位评估、时效审查、协商与调解、起诉或仲裁材料准备。",
    },
  },
  {
    slug: "hop-dong-thuong-mai",
    title: {
      vi: "Hợp đồng & thương mại",
      en: "Contracts & commerce",
      zh: "合同与商事",
    },
    summary: {
      vi: "Làm rõ quyền, nghĩa vụ và rủi ro trước khi đặt bút ký — và xử lý được khi hợp đồng đi chệch khỏi dự kiến.",
      en: "Clarify rights, obligations and risk before signing — and be able to act when a contract departs from what was planned.",
      zh: "在签署前厘清权利、义务与风险——并在合同偏离预期时仍能应对。",
    },
    audience: {
      vi: "Doanh nghiệp ký kết thường xuyên và cần bộ mẫu dùng lại được, bên chuẩn bị đàm phán một giao dịch quan trọng, và bên đang gặp vướng mắc khi thực hiện hợp đồng đã ký.",
      en: "Businesses that contract regularly and need a reusable set of templates, parties preparing to negotiate a significant transaction, and those meeting difficulties in performing a contract already signed.",
      zh: "经常签约并需要可复用范本的企业、准备就重要交易展开谈判的一方，以及在履行既有合同时遇到困难的一方。",
    },
    scope: [
      {
        vi: "Soạn thảo và rà soát hợp đồng theo từng giao dịch",
        en: "Drafting and review of contracts for a specific transaction",
        zh: "针对具体交易起草与审查合同",
      },
      {
        vi: "Xây dựng bộ hợp đồng mẫu dùng lại cho hoạt động thường xuyên",
        en: "Building a reusable set of templates for recurring business",
        zh: "为常规业务建立可复用的合同范本",
      },
      {
        vi: "Hỗ trợ đàm phán và ghi nhận kết quả thống nhất",
        en: "Negotiation support and recording what has been agreed",
        zh: "谈判支持及对已达成事项的记录",
      },
      {
        vi: "Điều khoản bảo đảm, phạt vi phạm và giới hạn trách nhiệm",
        en: "Security, penalty and limitation-of-liability provisions",
        zh: "担保、违约金与责任限制条款",
      },
      {
        vi: "Điều khoản giải quyết tranh chấp và luật áp dụng",
        en: "Dispute resolution clauses and governing law",
        zh: "争议解决条款与适用法律",
      },
      {
        vi: "Xử lý vướng mắc khi thực hiện, sửa đổi và chấm dứt hợp đồng",
        en: "Handling performance issues, amendment and termination",
        zh: "履行障碍处理、变更与合同终止",
      },
    ],
    process: [
      {
        heading: {
          vi: "Hiểu giao dịch trước khi đọc bản thảo",
          en: "Understand the deal before reading the draft",
          zh: "在阅读草案前先理解交易",
        },
        description: {
          vi: "Một điều khoản chỉ đánh giá được khi biết nó phục vụ điều gì. Chúng tôi bắt đầu bằng dòng tiền, nghĩa vụ giao nhận và điều bạn lo ngại nhất nếu mọi việc không như dự kiến.",
          en: "A clause can only be judged once you know what it is for. We start with the money flow, the delivery obligations and what worries you most if things do not go to plan.",
          zh: "只有知道条款的用途才能对其作出判断。我们从资金流向、交付义务，以及一旦不顺利您最担心的事项入手。",
        },
      },
      {
        heading: {
          vi: "Chỉ rõ rủi ro và đề xuất thay thế",
          en: "Name the risks and propose alternatives",
          zh: "指出风险并提出替代方案",
        },
        description: {
          vi: "Bản rà soát nêu rõ điều khoản nào bất lợi, bất lợi ở mức nào, và phương án thay thế có thể đưa ra đàm phán — kèm nhận định điều gì nhiều khả năng bên kia chấp nhận.",
          en: "The review states which clauses are unfavourable, how unfavourable they are, and what alternative can be put on the table — with a view on what the other side is likely to accept.",
          zh: "审查意见将明确指出哪些条款不利、不利到何种程度，以及可提交谈判的替代方案，并附上对方接受可能性的判断。",
        },
      },
      {
        heading: {
          vi: "Ghi nhận đúng điều đã thống nhất",
          en: "Record exactly what was agreed",
          zh: "准确记录已达成的内容",
        },
        description: {
          vi: "Phần lớn tranh chấp hợp đồng bắt nguồn từ chỗ hai bên hiểu khác nhau về cùng một câu chữ. Bản cuối được rà lại để câu chữ khớp với điều hai bên thực sự thống nhất.",
          en: "Most contract disputes start where the two sides read the same words differently. The final version is checked so the wording matches what was actually agreed.",
          zh: "多数合同争议源于双方对同一措辞理解不同。最终文本会再次核对，确保措辞与双方实际共识一致。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Dùng hợp đồng mẫu tải trên mạng có được không?",
          en: "Can I use a template found online?",
          zh: "可以使用网上下载的合同范本吗？",
        },
        answer: {
          vi: "Được, nhưng nên hiểu giới hạn của nó. Mẫu có sẵn thường viết cho một loại giao dịch khác, đôi khi theo pháp luật của nước khác, và thường thiếu đúng những điều khoản quan trọng nhất với trường hợp của bạn. Rà soát một bản mẫu thường nhanh và ít tốn kém hơn nhiều so với xử lý hậu quả về sau.",
          en: "You can, provided you understand its limits. A ready-made template is usually written for a different kind of transaction, sometimes under another country's law, and often omits precisely the provisions that matter most in your case. Having a template reviewed is usually far quicker and cheaper than dealing with the consequences later.",
          zh: "可以，但应了解其局限。现成范本通常针对另一类交易撰写，有时依据他国法律，且往往恰恰缺少对您最重要的条款。请人审查范本，通常远比事后处理后果更快也更省。",
        },
      },
      {
        question: {
          vi: "Hợp đồng đã ký rồi có sửa được không?",
          en: "Can a contract already signed be changed?",
          zh: "已签署的合同还能修改吗？",
        },
        answer: {
          vi: "Có, nếu các bên cùng thống nhất bằng phụ lục hoặc văn bản sửa đổi theo đúng hình thức mà hợp đồng và pháp luật yêu cầu. Điều cần lưu ý là cách sửa: một phụ lục soạn vội có thể tạo ra mâu thuẫn với điều khoản gốc thay vì giải quyết được vấn đề.",
          en: "Yes, where the parties agree through an appendix or amendment made in the form the contract and the law require. What matters is how it is done: a hastily drafted appendix can contradict the original clauses instead of resolving the issue.",
          zh: "可以，只要各方通过附件或变更文件达成一致，并符合合同与法律要求的形式。关键在于修改方式：仓促起草的附件可能与原条款产生矛盾，而非解决问题。",
        },
      },
      {
        question: {
          vi: "Rà soát một hợp đồng mất bao lâu?",
          en: "How long does reviewing a contract take?",
          zh: "审查一份合同需要多久？",
        },
        answer: {
          vi: "Phụ thuộc vào độ dài, mức độ phức tạp và việc bạn cần bản rà soát ở mức nào — nêu rủi ro chính, hay soạn lại toàn bộ. Sau khi xem bản thảo, chúng tôi báo lại mốc thời gian và phạm vi cụ thể trước khi bắt đầu.",
          en: "It depends on length, complexity and the depth you need — flagging the main risks, or redrafting throughout. After seeing the draft we confirm a timeline and a defined scope before starting.",
          zh: "取决于篇幅、复杂程度以及您需要的深度——是指出主要风险，还是全面重拟。我们在查看草案后会先确认时间安排与具体范围，再开始工作。",
        },
      },
    ],
    seoDescription: {
      vi: "Soạn thảo và rà soát hợp đồng thương mại: phân định quyền và nghĩa vụ, điều khoản bảo đảm và giới hạn trách nhiệm, hỗ trợ đàm phán, xử lý vướng mắc khi thực hiện.",
      en: "Commercial contract drafting and review: allocation of rights and obligations, security and liability provisions, negotiation support and handling performance issues.",
      zh: "商事合同起草与审查：权利义务划分、担保与责任限制条款、谈判支持及履行障碍处理。",
    },
  },
  {
    slug: "so-huu-tri-tue",
    title: {
      vi: "Sở hữu trí tuệ & công nghệ",
      en: "Intellectual property & technology",
      zh: "知识产权与科技",
    },
    summary: {
      vi: "Xác lập quyền đối với tài sản trí tuệ, giữ được quyền đó khi hợp tác với bên ngoài, và đặt nền pháp lý cho hoạt động số.",
      en: "Establish rights over intellectual assets, keep them when working with outside parties, and put a legal footing under digital operations.",
      zh: "确立知识产权、在与外部合作时保住这些权利，并为数字化运营奠定法律基础。",
    },
    audience: {
      vi: "Doanh nghiệp có thương hiệu cần bảo hộ, bên đặt hàng hoặc nhận gia công sản phẩm công nghệ, và tổ chức xử lý dữ liệu cá nhân trong hoạt động thường ngày.",
      en: "Businesses with a brand to protect, parties commissioning or delivering technology work, and organisations that process personal data as part of daily operations.",
      zh: "需要保护品牌的企业、委托或承接技术开发的一方，以及在日常运营中处理个人数据的机构。",
    },
    scope: [
      {
        vi: "Rà soát danh mục tài sản trí tuệ hiện có và khoảng trống bảo hộ",
        en: "Review of the existing intellectual asset portfolio and gaps in protection",
        zh: "梳理现有知识产权资产及保护空缺",
      },
      {
        vi: "Đăng ký nhãn hiệu và các đối tượng sở hữu công nghiệp khác",
        en: "Trademark registration and other industrial property filings",
        zh: "商标注册及其他工业产权申请",
      },
      {
        vi: "Quyền tác giả với phần mềm, nội dung và tài liệu thiết kế",
        en: "Copyright in software, content and design materials",
        zh: "软件、内容与设计资料的著作权",
      },
      {
        vi: "Hợp đồng phát triển, chuyển giao và cấp phép sử dụng",
        en: "Development, transfer and licensing agreements",
        zh: "开发、转让与许可使用合同",
      },
      {
        vi: "Thỏa thuận bảo mật và điều khoản về quyền với kết quả công việc",
        en: "Confidentiality agreements and clauses on ownership of work product",
        zh: "保密协议及关于工作成果权属的条款",
      },
      {
        vi: "Đánh giá hoạt động xử lý dữ liệu cá nhân và tài liệu tuân thủ kèm theo",
        en: "Assessment of personal data processing and the accompanying compliance records",
        zh: "个人数据处理活动评估及相应合规文件",
      },
    ],
    process: [
      {
        heading: {
          vi: "Xác định tài sản và ai đang nắm quyền",
          en: "Identify the assets and who currently holds the rights",
          zh: "确认资产及权利现由谁持有",
        },
        description: {
          vi: "Nhiều doanh nghiệp phát hiện muộn rằng quyền với phần mềm hoặc bộ nhận diện của mình vẫn thuộc về đơn vị gia công, vì hợp đồng ban đầu không nói tới. Bước đầu là dựng lại bức tranh quyền thực tế.",
          en: "Many businesses discover late that the rights in their software or brand assets still sit with a contractor, because the original agreement was silent. The first step is to establish who actually holds what.",
          zh: "不少企业很晚才发现，其软件或品牌资产的权利仍归外包方所有，只因当初合同未作约定。第一步是厘清权利的实际归属。",
        },
      },
      {
        heading: {
          vi: "Chọn hình thức bảo hộ tương xứng",
          en: "Choose protection proportionate to the asset",
          zh: "选择与资产相称的保护方式",
        },
        description: {
          vi: "Không phải tài sản nào cũng cần đăng ký, và không phải hình thức nào cũng phù hợp. Việc lựa chọn dựa trên giá trị thương mại, khả năng bị sao chép và chi phí duy trì.",
          en: "Not every asset needs registration, and not every form of protection fits. The choice rests on commercial value, how easily it can be copied and the cost of maintenance.",
          zh: "并非每项资产都需要注册，也并非每种保护形式都合适。选择取决于商业价值、被复制的难易程度与维持成本。",
        },
      },
      {
        heading: {
          vi: "Đưa quyền vào hợp đồng với bên thứ ba",
          en: "Write the rights into third-party contracts",
          zh: "将权利写入与第三方的合同",
        },
        description: {
          vi: "Bảo hộ chỉ có ý nghĩa nếu hợp đồng với nhân sự, đơn vị gia công và đối tác phản ánh đúng ai được làm gì với tài sản đó. Đây thường là phần bị bỏ sót.",
          en: "Protection only means something if contracts with staff, contractors and partners reflect who may do what with the asset. This is the part most often left out.",
          zh: "只有当与员工、外包方及合作伙伴的合同准确反映谁可以对该资产做什么时，保护才有意义。这恰恰是最常被遗漏的部分。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Chưa đăng ký nhãn hiệu thì có quyền gì không?",
          en: "Do I have any rights if the trademark is not registered?",
          zh: "未注册商标是否仍享有权利？",
        },
        answer: {
          vi: "Có một số cơ chế bảo vệ nhất định, nhưng phạm vi hẹp hơn nhiều và việc chứng minh khó hơn đáng kể so với khi đã đăng ký. Nếu thương hiệu đang được sử dụng thực tế trong kinh doanh, việc đăng ký sớm thường là lựa chọn ít tốn kém hơn về lâu dài.",
          en: "Some protection exists, but its scope is much narrower and proving it is considerably harder than where the mark is registered. If the brand is already in commercial use, registering early is usually the less expensive course in the long run.",
          zh: "存在一定的保护机制，但范围窄得多，举证也远比已注册的情形困难。若品牌已在实际经营中使用，尽早注册通常在长期看更为经济。",
        },
      },
      {
        question: {
          vi: "Thuê ngoài viết phần mềm thì ai giữ quyền?",
          en: "Who owns software written by an outside developer?",
          zh: "外包开发的软件权利归谁？",
        },
        answer: {
          vi: "Điều này phụ thuộc vào thỏa thuận giữa hai bên. Nếu hợp đồng không quy định rõ việc chuyển giao quyền, bên đặt hàng có thể chỉ có quyền sử dụng chứ không phải quyền sở hữu — và điều đó trở thành vấn đề đúng lúc doanh nghiệp cần bán, gọi vốn hoặc đổi nhà cung cấp.",
          en: "It depends on what the parties agreed. Where the contract does not clearly provide for transfer, the commissioning party may hold only a right to use rather than ownership — which becomes a problem at exactly the moment the business wants to sell, raise capital or change supplier.",
          zh: "这取决于双方的约定。若合同未明确约定权利转让，委托方可能仅享有使用权而非所有权——而这恰恰会在企业出售、融资或更换供应商时成为问题。",
        },
      },
      {
        question: {
          vi: "Doanh nghiệp nhỏ có phải quan tâm đến quy định về dữ liệu cá nhân không?",
          en: "Do small businesses need to care about personal data rules?",
          zh: "小企业需要关注个人数据规定吗？",
        },
        answer: {
          vi: "Nghĩa vụ về dữ liệu cá nhân gắn với việc bạn xử lý dữ liệu gì và như thế nào, không gắn với quy mô doanh nghiệp. Một website thu thập thông tin liên hệ của khách đã phát sinh nghĩa vụ. Mức độ tài liệu cần có thì tương xứng với thực tế hoạt động.",
          en: "Obligations follow from what data you process and how, not from the size of the business. A website that collects visitors' contact details already triggers them. The volume of documentation required, however, is proportionate to what you actually do.",
          zh: "个人数据义务取决于您处理何种数据以及如何处理，而非企业规模。收集访客联系方式的网站即已产生相关义务。至于所需文件的多寡，则与实际业务规模相称。",
        },
      },
    ],
    seoDescription: {
      vi: "Sở hữu trí tuệ và công nghệ: rà soát tài sản trí tuệ, đăng ký nhãn hiệu, quyền tác giả phần mềm, hợp đồng phát triển và cấp phép, đánh giá xử lý dữ liệu cá nhân.",
      en: "Intellectual property and technology: asset review, trademark registration, software copyright, development and licensing agreements, personal data processing assessment.",
      zh: "知识产权与科技：知识产权资产梳理、商标注册、软件著作权、开发与许可合同、个人数据处理评估。",
    },
  },
];
