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
      en: "Investment and corporate law in Vietnam: ownership structure, registration, charters and shareholders' agreements, due diligence and compliance.",
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
      en: "Dispute resolution: assessing evidence and your legal position, limitation review, negotiation and mediation, court and arbitration filings.",
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
      vi: "Soạn thảo và rà soát hợp đồng thương mại: quyền và nghĩa vụ, điều khoản bảo đảm, giới hạn trách nhiệm, hỗ trợ đàm phán và xử lý vướng mắc.",
      en: "Commercial contracts: drafting and review, rights and obligations, security and liability clauses, negotiation support and performance issues.",
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
      vi: "Sở hữu trí tuệ và công nghệ: rà soát tài sản trí tuệ, đăng ký nhãn hiệu, quyền tác giả phần mềm, hợp đồng cấp phép và xử lý dữ liệu cá nhân.",
      en: "Intellectual property and technology: asset review, trademark registration, software copyright, licensing agreements and personal data checks.",
      zh: "知识产权与科技：知识产权资产梳理、商标注册、软件著作权、开发与许可合同、个人数据处理评估。",
    },
  },
  {
    slug: "lao-dong-nhan-su",
    title: {
      vi: "Lao động & nhân sự",
      en: "Employment & labour",
      zh: "劳动与人事",
    },
    summary: {
      vi: "Quan hệ lao động được giữ vững bằng giấy tờ: hợp đồng, nội quy, quy chế và trình tự xử lý. Chúng tôi hỗ trợ dựng bộ tài liệu đó và xử lý các tình huống nhân sự theo đúng thứ tự bắt buộc.",
      en: "An employment relationship stands on its paperwork: contracts, internal rules, policies and the order in which steps are taken. We help build that documentation and work through personnel matters in the sequence the law requires.",
      zh: "劳动关系依靠文件维系：劳动合同、内部规章、各项制度以及处理程序的先后顺序。我们协助搭建这套文件，并按法定顺序处理各类人事事项。",
    },
    audience: {
      vi: "Doanh nghiệp đang tuyển dụng hoặc mở rộng nhân sự, bộ phận nhân sự cần rà soát lại hệ thống văn bản nội bộ, và người lao động muốn hiểu rõ quyền và nghĩa vụ của mình trong quan hệ lao động.",
      en: "Companies hiring or expanding their workforce, HR teams reviewing the internal documents already in use, and employees who want to understand their rights and obligations within the relationship.",
      zh: "正在招聘或扩充人员的企业、需要重新梳理内部文件体系的人力资源部门，以及希望厘清自身权利与义务的劳动者。",
    },
    scope: [
      {
        vi: "Hợp đồng lao động, phụ lục và các thỏa thuận đi kèm",
        en: "Employment contracts, addenda and accompanying agreements",
        zh: "劳动合同、附件及相关配套协议",
      },
      {
        vi: "Nội quy lao động, thỏa ước lao động tập thể và quy chế nội bộ",
        en: "Internal labour rules, collective agreements and company policies",
        zh: "劳动规章制度、集体劳动协议与内部管理规定",
      },
      {
        vi: "Thủ tục đăng ký, thông báo và hồ sơ nhân sự bắt buộc",
        en: "Registrations, notifications and the personnel records required by law",
        zh: "登记备案、通知手续与法定人事档案",
      },
      {
        vi: "Kỷ luật lao động, trách nhiệm vật chất và trình tự xử lý",
        en: "Disciplinary action, liability for damage and the procedure to follow",
        zh: "劳动纪律处理、财产赔偿责任及处理程序",
      },
      {
        vi: "Chấm dứt hợp đồng, tái cơ cấu nhân sự và nghĩa vụ kèm theo",
        en: "Termination, workforce restructuring and the obligations that follow",
        zh: "合同终止、人员重组及随之产生的义务",
      },
      {
        vi: "Lao động nước ngoài: giấy phép lao động và giấy tờ cư trú",
        en: "Foreign employees: work permits and residence documents",
        zh: "外籍员工：工作许可与居留证件",
      },
    ],
    process: [
      {
        heading: {
          vi: "Rà soát văn bản đang áp dụng",
          en: "Review the documents currently in use",
          zh: "审查现行适用的文件",
        },
        description: {
          vi: "Trước khi bàn đến một tình huống cụ thể, chúng tôi xem lại hợp đồng mẫu, nội quy và quy chế mà doanh nghiệp đang dùng. Phần lớn vướng mắc nhân sự bắt nguồn từ văn bản nền chưa chặt chẽ chứ không từ sự việc phát sinh.",
          en: "Before turning to a specific situation, we look at the template contracts, internal rules and policies currently in use. Most personnel difficulties trace back to loosely drafted underlying documents rather than to the incident itself.",
          zh: "在讨论具体事项之前，我们会先查看企业正在使用的合同范本、劳动规章与各项制度。多数人事困扰源于基础文件不够严谨，而非事件本身。",
        },
      },
      {
        heading: {
          vi: "Xác định tình huống và trình tự bắt buộc",
          en: "Identify the situation and the required sequence",
          zh: "确定事项性质与必经程序",
        },
        description: {
          vi: "Mỗi tình huống nhân sự có trình tự riêng: thành phần tham gia, văn bản phải lập và thời hạn theo quy định hiện hành. Chúng tôi xác định rõ trình tự đó trước, để các bước sau không phải làm lại.",
          en: "Each personnel matter has its own sequence: who must take part, which documents must be created, and the time limits set by the rules in force. We map that sequence first so later steps do not have to be repeated.",
          zh: "每一类人事事项都有各自的程序：应当参与的人员、必须形成的文件，以及现行规定中的期限。我们先厘清这一顺序，避免后续步骤返工。",
        },
      },
      {
        heading: {
          vi: "Soạn văn bản và hướng dẫn thực hiện",
          en: "Draft the documents and guide the steps",
          zh: "起草文件并指导执行",
        },
        description: {
          vi: "Thông báo, biên bản, quyết định và các văn bản kèm theo được soạn thành bộ, kèm hướng dẫn về thứ tự ban hành và cách lưu hồ sơ. Bạn biết rõ ai ký, ký khi nào và giữ lại chứng từ nào.",
          en: "Notices, minutes, decisions and supporting documents are drafted as a set, with guidance on the order of issue and how the file should be kept. You know who signs, when, and what evidence to retain.",
          zh: "通知、会议记录、决定及配套文件成套起草，并附有出具顺序和归档方式的说明。您可以清楚知道由谁签署、何时签署、需要保留哪些凭证。",
        },
      },
      {
        heading: {
          vi: "Bàn giao quy trình cho bộ phận nhân sự",
          en: "Hand the process over to your HR team",
          zh: "将流程交接给人力资源部门",
        },
        description: {
          vi: "Kết thúc công việc, bạn nhận bộ biểu mẫu và mô tả trình tự để bộ phận nhân sự tự vận hành cho những lần sau. Chúng tôi nêu rõ trường hợp nào nên trao đổi lại với luật sư trước khi ra quyết định.",
          en: "At handover you receive the forms and a description of the sequence, so your HR team can run it themselves next time. We set out plainly which situations warrant speaking to a lawyer again before a decision is taken.",
          zh: "工作结束时，您将收到整套表单及流程说明，便于人力资源部门日后自行操作。我们也会明确指出哪些情形宜在作出决定前再次与律师沟通。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Cần chuẩn bị gì cho buổi trao đổi đầu tiên?",
          en: "What should I prepare for the first meeting?",
          zh: "第一次沟通需要准备什么？",
        },
        answer: {
          vi: "Hợp đồng lao động và phụ lục, nội quy lao động cùng các quy chế liên quan, và mô tả ngắn gọn diễn biến sự việc theo trình tự thời gian. Nếu đã có thông báo, biên bản hay email trao đổi giữa hai bên, hãy mang theo bản đầy đủ thay vì phần trích. Hồ sơ càng gần với thực tế thì đánh giá ban đầu càng ít phải điều chỉnh về sau.",
          en: "The employment contract and any addenda, the internal labour rules and related policies, and a short account of what happened in chronological order. If notices, minutes or emails have passed between the parties, bring them in full rather than in extract. The closer the file is to the actual position, the less the initial assessment has to be revised later.",
          zh: "劳动合同及其附件、劳动规章制度与相关内部规定，以及按时间顺序简要说明的事件经过。如果双方之间已有通知、会议记录或往来邮件，请提供完整件而非摘录。材料越贴近实际情况，初步评估日后需要调整的地方就越少。",
        },
      },
      {
        question: {
          vi: "Công ty có thể trả lời ngay một quyết định nhân sự là đúng hay sai không?",
          en: "Can you tell me straight away whether a personnel decision is sound?",
          zh: "能否当场判断某项人事决定是否妥当？",
        },
        answer: {
          vi: "Không. Trước khi đọc hợp đồng, nội quy và các văn bản đã ban hành, chúng tôi chỉ có thể nêu những yếu tố thường được xem xét, chứ không kết luận về vụ việc của bạn. Chúng tôi nói rõ phần nào đã đủ căn cứ để đánh giá và phần nào còn phải chờ tài liệu. Cách làm này giúp bạn không dựa vào một nhận định vội vàng để ra quyết định khó đảo ngược.",
          en: "No. Until we have read the contract, the internal rules and the documents already issued, we can only describe the factors usually taken into account, not reach a conclusion on your matter. We say clearly which parts we can already assess and which still depend on documents. That way you are not relying on a hasty view when taking a decision that is hard to undo.",
          zh: "不能。在阅读合同、规章制度及已出具的文件之前，我们只能说明通常需要考量的因素，而无法就您的具体事项下结论。我们会明确区分哪些部分已可评估、哪些仍需等待材料。这样可以避免您依据仓促意见作出难以逆转的决定。",
        },
      },
      {
        question: {
          vi: "Công ty hỗ trợ doanh nghiệp hay người lao động?",
          en: "Do you act for employers or for employees?",
          zh: "贵所是为企业还是为劳动者提供服务？",
        },
        answer: {
          vi: "Chúng tôi nhận công việc từ cả hai phía, nhưng không nhận hai bên trong cùng một vụ việc. Khi tiếp nhận, chúng tôi kiểm tra xung đột lợi ích trước, và từ chối nếu công việc mâu thuẫn với khách hàng đang có. Nếu phải từ chối, chúng tôi nói rõ lý do trong phạm vi cho phép để bạn kịp tìm phương án khác.",
          en: "We take instructions from either side, but never from both parties to the same matter. Before accepting work we run a conflict check, and we decline where the instruction would conflict with an existing client. If we do decline, we say why as far as confidentiality allows, so that you can look elsewhere without losing time.",
          zh: "双方我们都可以接受委托，但不会在同一事项中同时代理双方。接案前我们会先进行利益冲突核查，若与现有客户存在冲突则予以婉拒。如需婉拒，我们会在保密允许的范围内说明原因，以便您及时另作安排。",
        },
      },
      {
        question: {
          vi: "Một vụ việc lao động thường kéo dài bao lâu?",
          en: "How long does an employment matter usually take?",
          zh: "一件劳动事项通常需要多长时间？",
        },
        answer: {
          vi: "Việc rà soát văn bản nội bộ hoặc soạn một bộ hồ sơ thường gọn hơn nhiều so với vụ việc có tranh chấp. Khi đã phát sinh tranh chấp, thời gian phụ thuộc vào thủ tục được lựa chọn, thời hạn theo quy định hiện hành và mức độ hợp tác của bên còn lại. Chúng tôi ước lượng mốc thời gian sau khi xem hồ sơ, và nêu rõ phần nào nằm ngoài khả năng kiểm soát của cả hai bên.",
          en: "Reviewing internal documents or preparing a single set of paperwork is usually far shorter than a contested matter. Once a dispute has arisen, timing depends on the procedure chosen, the time limits under the rules in force and how far the other side engages. We give an estimate after reviewing the file and identify plainly which parts neither side can control.",
          zh: "审查内部文件或准备一套材料，所需时间通常远少于已产生争议的事项。一旦进入争议阶段，时间取决于所选择的程序、现行规定中的期限，以及对方的配合程度。我们会在查看材料后给出预估，并明确说明哪些环节双方都无法掌控。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý lao động và nhân sự: hợp đồng, nội quy, kỷ luật, chấm dứt hợp đồng, lao động nước ngoài và tranh chấp lao động tại Việt Nam.",
      en: "Employment and labour law in Vietnam: contracts, internal rules, discipline, termination, work permits and labour disputes.",
      zh: "越南劳动与人事法律支持：劳动合同、内部规章、纪律处理、合同终止、外籍员工手续与劳动争议。",
    },
  },
  {
    slug: "dat-dai-bat-dong-san",
    title: {
      vi: "Đất đai & bất động sản",
      en: "Land & real estate",
      zh: "土地与房地产",
    },
    summary: {
      vi: "Một giao dịch bất động sản an toàn bắt đầu từ hồ sơ chứ không từ hợp đồng: tình trạng pháp lý của thửa đất, tư cách của các bên, rồi mới đến điều khoản và thủ tục đăng ký.",
      en: "A sound property transaction begins with the file, not the contract: the legal status of the land, the standing of each party, and only then the terms and the registration steps.",
      zh: "一笔稳妥的房地产交易始于材料而非合同：先看土地的法律状态与各方主体资格，再谈条款与登记手续。",
    },
    audience: {
      vi: "Cá nhân và doanh nghiệp chuẩn bị mua, bán, cho thuê hoặc nhận chuyển nhượng bất động sản; bên sử dụng đất cho hoạt động sản xuất, kinh doanh; và người đang vướng mắc về hồ sơ hoặc bất đồng với bên liên quan.",
      en: "Individuals and companies preparing to buy, sell, lease or take a transfer of property; users of land for production or business premises; and anyone facing a problem with their paperwork or a disagreement with another party.",
      zh: "准备买卖、租赁或受让房地产的个人与企业；将土地用于生产经营的使用方；以及在权属材料上遇到障碍或与相关方存在分歧的当事人。",
    },
    scope: [
      {
        vi: "Kiểm tra tình trạng pháp lý thửa đất và tài sản gắn liền với đất",
        en: "Checking the legal status of the land and the assets attached to it",
        zh: "核查地块及地上附着资产的法律状态",
      },
      {
        vi: "Hợp đồng chuyển nhượng, mua bán, tặng cho và cho thuê",
        en: "Transfer, sale, gift and lease agreements",
        zh: "转让、买卖、赠与及租赁合同",
      },
      {
        vi: "Công chứng, đăng ký biến động và cấp giấy chứng nhận",
        en: "Notarisation, registration of changes and issue of certificates",
        zh: "公证、变更登记与证书办理",
      },
      {
        vi: "Thế chấp, đăng ký giao dịch bảo đảm và xử lý tài sản bảo đảm",
        en: "Mortgages, registration of security interests and enforcement over collateral",
        zh: "抵押、担保登记与担保物处置",
      },
      {
        vi: "Giao đất, thuê đất, chuyển mục đích sử dụng và nghĩa vụ tài chính",
        en: "Land allocation, land lease, change of use purpose and financial obligations",
        zh: "土地划拨、租赁、用途变更及相关财政义务",
      },
      {
        vi: "Thu hồi đất, bồi thường, tái định cư và tranh chấp về đất",
        en: "Land recovery, compensation, resettlement and land disputes",
        zh: "土地收回、补偿、安置与土地争议",
      },
    ],
    process: [
      {
        heading: {
          vi: "Kiểm tra hồ sơ trước khi cam kết",
          en: "Check the file before you commit",
          zh: "在作出承诺前先核查材料",
        },
        description: {
          vi: "Bước đầu tiên là đối chiếu giấy chứng nhận, hồ sơ địa chính và thông tin quy hoạch với hiện trạng thửa đất. Việc này nên làm trước khi đặt cọc, vì sau khi đã có ràng buộc thì lựa chọn của bạn hẹp lại đáng kể.",
          en: "The first step is to compare the certificate, the cadastral records and the planning information against the land as it actually stands. This belongs before any deposit: once you are committed, your options narrow considerably.",
          zh: "第一步是将权属证书、地籍档案与规划信息同地块实际状况逐一比对。这项工作应在支付定金之前完成，因为一旦形成约束，可选空间会明显收窄。",
        },
      },
      {
        heading: {
          vi: "Làm rõ tư cách của các bên và điều kiện giao dịch",
          en: "Clarify each party's standing and the conditions of the deal",
          zh: "厘清各方主体资格与交易条件",
        },
        description: {
          vi: "Bên chuyển nhượng có đủ quyền định đoạt hay không, tài sản có phải tài sản chung, có đang bị hạn chế nào — những điểm này quyết định giao dịch có thực hiện được không. Điều kiện áp dụng khác nhau tùy loại đất và tùy chủ thể tham gia.",
          en: "Whether the transferor has full power to dispose, whether the property is jointly owned, whether any restriction attaches — these determine whether the transaction can proceed at all. The applicable conditions differ by category of land and by who is taking part.",
          zh: "转让方是否具有完全处分权、标的是否属共同财产、是否存在权利限制，这些都决定交易能否推进。适用条件因土地类别和参与主体而异。",
        },
      },
      {
        heading: {
          vi: "Soạn hợp đồng và chuẩn bị hồ sơ thủ tục",
          en: "Draft the contract and assemble the filing",
          zh: "起草合同并准备办理材料",
        },
        description: {
          vi: "Hợp đồng được soạn gắn với lộ trình thanh toán và bàn giao, để mỗi khoản tiền chuyển đi đều tương ứng với một bước hồ sơ đã hoàn tất. Song song đó, hồ sơ công chứng và đăng ký được chuẩn bị để không gián đoạn giữa các bước.",
          en: "The contract is drafted alongside the payment and handover schedule, so that each sum released corresponds to a step in the paperwork that has actually been completed. The notarisation and registration files are prepared in parallel to avoid gaps between steps.",
          zh: "合同起草与付款、交付安排相衔接，使每一笔款项都对应一个已完成的材料环节。同时同步准备公证与登记材料，避免各步骤之间出现空档。",
        },
      },
      {
        heading: {
          vi: "Theo dõi đến khi hoàn tất đăng ký",
          en: "Follow through until registration is complete",
          zh: "跟进至登记完成",
        },
        description: {
          vi: "Giao dịch chỉ khép lại khi việc đăng ký hoàn tất và giấy tờ đứng tên đúng bên nhận. Chúng tôi theo dõi hồ sơ tại cơ quan tiếp nhận, xử lý yêu cầu bổ sung và bàn giao bộ giấy tờ hoàn chỉnh kèm danh mục nghĩa vụ còn lại.",
          en: "A transaction closes only when registration is done and the papers stand in the right name. We track the file with the receiving authority, respond to requests for additional documents, and hand over the completed set together with a list of any remaining obligations.",
          zh: "只有登记完成、证件登记于正确权利人名下，交易才算收尾。我们会在受理机关跟进材料、处理补充要求，并移交完整证件及尚存义务清单。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Cần mang theo giấy tờ gì cho buổi trao đổi đầu tiên?",
          en: "What documents should I bring to the first meeting?",
          zh: "第一次沟通需要带哪些文件？",
        },
        answer: {
          vi: "Giấy chứng nhận quyền sử dụng đất và quyền sở hữu tài sản gắn liền với đất, giấy tờ nhân thân hoặc pháp nhân của các bên, cùng mọi văn bản đã ký như biên nhận đặt cọc hay hợp đồng đặt cọc. Nếu có bản đồ, sơ đồ thửa đất hoặc thông tin quy hoạch đã tra cứu, hãy mang theo. Trường hợp bất động sản đang thế chấp hoặc đang cho thuê, hồ sơ liên quan cũng cần được xem cùng lúc.",
          en: "The land use right certificate together with the certificate covering attached assets, identity or corporate documents for each party, and anything already signed such as a deposit receipt or deposit agreement. Bring any survey drawing, plot plan or planning information you have obtained. Where the property is mortgaged or currently leased, those papers need to be looked at at the same time.",
          zh: "土地使用权及地上资产权属证书、各方的身份或法人证件，以及已签署的任何文件，例如定金收据或定金合同。若已取得测绘图、地块图或规划信息，也请一并带来。如果该房地产正处于抵押或出租状态，相关材料同样需要同时审阅。",
        },
      },
      {
        question: {
          vi: "Công ty có thể khẳng định một thửa đất không có vấn đề pháp lý không?",
          en: "Can you confirm that a plot is free of legal problems?",
          zh: "贵所能否确认某块土地不存在法律问题？",
        },
        answer: {
          vi: "Chúng tôi chỉ có thể nêu kết quả kiểm tra trên những gì đã xem được: giấy tờ do bạn cung cấp và thông tin tra cứu tại cơ quan có thẩm quyền. Đó không phải là lời bảo đảm tuyệt đối, vì vẫn có những yếu tố không thể hiện trên hồ sơ, chẳng hạn thỏa thuận miệng giữa các bên trước đây. Khi phát hiện điểm chưa rõ, chúng tôi nêu ra và đề xuất cách xác minh thêm. Nếu vẫn không xác minh được, chúng tôi nói thẳng để bạn cân nhắc mức rủi ro trước khi quyết định.",
          en: "We can report what the material we have seen shows: the documents you provide and information obtained from the competent authority. That is not an absolute guarantee, because some matters never appear in the file — an earlier oral arrangement between parties, for instance. Where something is unclear we flag it and suggest how it might be verified further. If it still cannot be verified, we say so plainly so that you can weigh the risk before deciding.",
          zh: "我们只能就已查阅的内容作出说明：您提供的文件以及在主管机关查询到的信息。这并非绝对保证，因为有些情况根本不会体现在材料中，例如各方此前的口头约定。发现不明之处时，我们会提出并建议进一步核实的途径。若最终仍无法核实，我们会如实告知，便于您在决定前权衡风险。",
        },
      },
      {
        question: {
          vi: "Đã đặt cọc rồi mới nhờ luật sư thì có muộn không?",
          en: "Is it too late to involve a lawyer after a deposit has been paid?",
          zh: "已经支付定金后再请律师是否太晚？",
        },
        answer: {
          vi: "Không muộn, nhưng phạm vi lựa chọn hẹp hơn. Trước khi đặt cọc, công việc chủ yếu là kiểm tra và điều chỉnh điều khoản; sau khi đã đặt cọc, công việc chuyển sang xem xét thỏa thuận đã ký và các phương án còn lại. Chúng tôi vẫn rà soát hồ sơ như bình thường và cho bạn biết ràng buộc hiện tại đến đâu. Điều quan trọng là mang theo bản đặt cọc đầy đủ, gồm cả phụ lục và giấy biên nhận.",
          en: "Not too late, but the range of options is narrower. Before a deposit the work is mainly checking and adjusting terms; afterwards it shifts to examining what has been signed and what routes remain. We still review the file as usual and tell you how far you are currently bound. What matters is bringing the deposit paperwork in full, including any addendum and receipts.",
          zh: "并不算晚，但可选空间会变窄。支付定金前，工作主要是核查与调整条款；支付之后，则转为审视已签文件和尚存的处理方案。我们仍会照常审阅材料，并告知您目前受约束的程度。关键是提供完整的定金文件，包括附件与收据。",
        },
      },
      {
        question: {
          vi: "Người nước ngoài hoặc doanh nghiệp có vốn nước ngoài tham gia được không?",
          en: "Can foreign individuals or foreign-invested companies take part?",
          zh: "外籍个人或外商投资企业可以参与吗？",
        },
        answer: {
          vi: "Điều kiện tham gia phụ thuộc vào loại bất động sản, hình thức sử dụng đất và tư cách của bên nhận, nên không có câu trả lời chung. Chúng tôi đối chiếu trường hợp cụ thể của bạn với quy định hiện hành sau khi xem hồ sơ, rồi nói rõ hình thức nào khả thi và hình thức nào không. Trường hợp cấu trúc dự kiến không thực hiện được, chúng tôi nêu điều đó ngay từ đầu thay vì để phát sinh ở khâu công chứng hoặc đăng ký.",
          en: "The conditions depend on the type of property, the form of land use and the standing of the party acquiring it, so there is no general answer. After reviewing the file we check your particular situation against the rules in force and set out which forms are workable and which are not. Where the intended structure cannot be carried through, we say so at the outset rather than letting it surface at notarisation or registration.",
          zh: "参与条件取决于房地产类型、土地使用形式以及受让方的主体资格，因此没有统一答案。我们会在查看材料后，将您的具体情形与现行规定逐项比对，明确说明哪些方式可行、哪些不可行。若拟议架构无法落实，我们会在一开始就指出，而不是拖到公证或登记环节才暴露。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý đất đai và bất động sản: kiểm tra hồ sơ thửa đất, hợp đồng chuyển nhượng, công chứng, đăng ký biến động, thế chấp và tranh chấp đất.",
      en: "Land and real estate law in Vietnam: title checks, transfer agreements, notarisation, registration, mortgages and land disputes.",
      zh: "越南土地与房地产法律支持：地块材料核查、转让合同、公证、变更登记、抵押及土地争议。",
    },
  },
  {
    slug: "thue-tai-chinh",
    title: {
      vi: "Thuế & tài chính doanh nghiệp",
      en: "Tax & corporate finance",
      zh: "税务与企业财务",
    },
    summary: {
      vi: "Nghĩa vụ thuế và dòng vốn của doanh nghiệp nhìn từ góc độ pháp lý: hiểu đúng nghĩa vụ đang áp dụng, ghi nhận giao dịch cho chuẩn và giữ được hồ sơ đủ để giải trình khi cần.",
      en: "The tax and funding side of a business seen from the legal angle: understanding which obligations apply, documenting transactions properly, and keeping records solid enough to explain later.",
      zh: "从法律角度审视企业的税务义务与资金安排：厘清适用义务、规范记录交易，并保留日后足以说明情况的凭证。",
    },
    audience: {
      vi: "Doanh nghiệp muốn rà soát lại nghĩa vụ thuế đang áp dụng cho mình, bên chuẩn bị một giao dịch có tác động về thuế, và tổ chức đang phải giải trình hồ sơ với cơ quan thuế.",
      en: "Businesses reviewing the tax obligations that apply to them, parties preparing a transaction with tax consequences, and organisations that need to explain their records to the tax authorities.",
      zh: "希望重新梳理自身税务义务的企业、正在筹划涉税交易的一方，以及需要向税务机关说明资料的机构。",
    },
    scope: [
      {
        vi: "Rà soát nghĩa vụ thuế phát sinh theo hoạt động và mô hình kinh doanh",
        en: "Review of the tax obligations arising from your activities and business model",
        zh: "根据业务活动与经营模式梳理应承担的税务义务",
      },
      {
        vi: "Đánh giá tác động về thuế của một giao dịch trước khi ký kết",
        en: "Assessment of the tax impact of a transaction before it is signed",
        zh: "交易签署前的税务影响评估",
      },
      {
        vi: "Hồ sơ, chứng từ và cơ sở giải trình cho các khoản mục trọng yếu",
        en: "Records, supporting documents and the basis for explaining material items",
        zh: "重要项目的资料、凭证与说明依据",
      },
      {
        vi: "Vấn đề thuế trong góp vốn, chuyển nhượng vốn và phân chia lợi nhuận",
        en: "Tax questions in capital contribution, transfer of capital and profit distribution",
        zh: "出资、股权转让与利润分配中的税务问题",
      },
      {
        vi: "Giao dịch có yếu tố nước ngoài và nghĩa vụ khấu trừ liên quan",
        en: "Cross-border transactions and the withholding obligations attached to them",
        zh: "涉外交易及相关代扣代缴义务",
      },
      {
        vi: "Làm việc với cơ quan thuế khi kiểm tra, thanh tra hoặc khi có kết luận cần phản hồi",
        en: "Dealing with the tax authorities during an inspection or audit, or where a finding calls for a response",
        zh: "税务检查、稽查以及需要回应结论时与税务机关的沟通",
      },
    ],
    process: [
      {
        heading: {
          vi: "Xác định phạm vi nghĩa vụ đang áp dụng",
          en: "Establish which obligations actually apply",
          zh: "确定实际适用的义务范围",
        },
        description: {
          vi: "Nghĩa vụ thuế của một doanh nghiệp phụ thuộc vào ngành nghề, hình thức pháp lý, nguồn vốn và cách các giao dịch được ghi nhận. Bước đầu là dựng lại bức tranh đó theo quy định hiện hành, thay vì suy đoán từ thực tiễn của một doanh nghiệp khác.",
          en: "What a business owes depends on its sector, legal form, source of capital and the way its transactions are recorded. The first step is to set that picture out under the rules in force, rather than reasoning from another company's situation.",
          zh: "企业的税务义务取决于行业、法律形式、资金来源以及交易的记录方式。第一步是依照现行规定还原这一全貌，而非套用其他企业的做法。",
        },
      },
      {
        heading: {
          vi: "Rà soát hồ sơ và chứng từ hiện có",
          en: "Review the records already in place",
          zh: "审查现有资料与凭证",
        },
        description: {
          vi: "Chúng tôi xem hợp đồng, chứng từ và cách ghi nhận các khoản mục trọng yếu để biết điều gì đã có cơ sở giải trình và điều gì còn thiếu. Kết quả rà soát nêu rõ khoảng trống, mức độ ưu tiên xử lý và những điểm cần trao đổi thêm với bộ phận kế toán.",
          en: "We look at the contracts, the supporting documents and the way material items are recorded, to see what can already be explained and what cannot. The review sets out the gaps, how urgent each one is, and the points to take up with your accounting team.",
          zh: "我们查阅合同、凭证以及重要项目的记录方式，以确定哪些已具备说明依据、哪些尚有欠缺。审查结果将列明缺口、处理的优先次序，以及需与会计部门进一步沟通的事项。",
        },
      },
      {
        heading: {
          vi: "Xử lý trước khi giao dịch được thực hiện",
          en: "Settle the position before the transaction closes",
          zh: "在交易实施前作出处理",
        },
        description: {
          vi: "Với giao dịch sắp thực hiện, cách ghi nhận và bộ hồ sơ đi kèm được chuẩn bị từ trước, vì phần lớn vướng mắc về thuế bắt nguồn từ cách một giao dịch được lập chứng từ chứ không phải từ bản thân giao dịch. Bạn nhận được các lựa chọn kèm rủi ro tương ứng của từng lựa chọn và tự quyết định.",
          en: "For a transaction still ahead, the way it will be documented is settled in advance, because most tax difficulties arise from how a deal is papered rather than from the deal itself. You receive the available options with the risk attached to each, and you make the decision.",
          zh: "对于尚未实施的交易，记录方式与配套资料会事先确定，因为多数税务问题源于交易的凭证处理方式，而非交易本身。我们提供各项选择及其相应风险，由您自行决定。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị giải trình và làm việc với cơ quan thuế",
          en: "Prepare explanations and deal with the authorities",
          zh: "准备说明并与税务机关沟通",
        },
        description: {
          vi: "Khi có yêu cầu giải trình hoặc có đợt kiểm tra, nội dung trả lời được chuẩn bị bằng văn bản, bám vào hồ sơ và quy định hiện hành. Phạm vi đại diện, ai làm việc trực tiếp và ai ký văn bản đều được thống nhất với bạn trước khi thực hiện.",
          en: "Where an explanation is requested or an inspection begins, the response is prepared in writing, based on the records and the rules in force. The scope of representation, who attends and who signs are agreed with you before anything is submitted.",
          zh: "在需要作出说明或接受检查时，答复内容将以书面形式准备，依据现有资料与现行规定。代理范围、由谁出面以及由谁签署文件，均事先与您确认。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Công ty đã có kế toán thì cần luật sư ở khâu nào?",
          en: "We already have accountants — where does a lawyer fit in?",
          zh: "公司已有会计，还需要律师做什么？",
        },
        answer: {
          vi: "Hai vai trò khác nhau và bổ sung cho nhau. Kế toán ghi nhận và kê khai theo nghiệp vụ phát sinh; luật sư xem xét cơ sở pháp lý của giao dịch, cách hợp đồng được soạn và mức độ vững của hồ sơ khi phải giải trình. Chúng tôi làm việc trực tiếp với bộ phận kế toán của bạn để tránh trùng lặp, và nói rõ phần nào thuộc phạm vi của chúng tôi, phần nào không.",
          en: "The two roles differ and complement each other. Accountants record and file what has occurred; a lawyer looks at the legal basis of a transaction, how the contract was drafted, and how well the file would stand up if it had to be explained. We work directly with your accounting team to avoid duplication, and are clear about what falls within our scope and what does not.",
          zh: "两者角色不同且相互补充。会计就已发生的业务进行记录与申报；律师则审视交易的法律依据、合同的起草方式，以及资料在需要说明时是否站得住脚。我们会与贵司会计部门直接配合以避免重复，并明确哪些属于我们的工作范围、哪些不属于。",
        },
      },
      {
        question: {
          vi: "Cần chuẩn bị tài liệu gì cho buổi làm việc đầu tiên?",
          en: "What should we bring to the first meeting?",
          zh: "第一次会面需要准备哪些材料？",
        },
        answer: {
          vi: "Giấy tờ pháp lý của doanh nghiệp, mô tả ngắn về hoạt động thực tế và các hợp đồng liên quan tới khoản mục bạn đang băn khoăn. Nếu đã có thông báo, biên bản hoặc yêu cầu giải trình từ cơ quan thuế, hãy mang theo bản đầy đủ kèm ngày nhận. Tài liệu càng sát thực tế thì đánh giá càng ít phải dựa trên giả định.",
          en: "The company's corporate documents, a short description of what the business actually does, and the contracts connected to the item you are concerned about. If a notice, a minute or a request for explanation has already been received, bring it in full together with the date of receipt. The closer the documents are to the real position, the less the assessment has to rest on assumptions.",
          zh: "企业的法律证照、对实际经营情况的简要说明，以及与您关注事项相关的合同。若已收到税务机关的通知、笔录或说明要求，请携带完整件并注明收到日期。资料越贴近实际，评估就越不必依赖假设。",
        },
      },
      {
        question: {
          vi: "Luật sư có thể cho biết chúng tôi phải nộp bao nhiêu không?",
          en: "Can you tell us how much we will have to pay?",
          zh: "律师能否告知我们应缴多少税？",
        },
        answer: {
          vi: "Một con số cụ thể chỉ có ý nghĩa khi dựa trên hồ sơ thực tế và quy định áp dụng tại thời điểm phát sinh, nên chúng tôi không ước lượng trước khi xem tài liệu. Quy định về thuế cũng thay đổi theo thời gian, vì vậy mọi ý kiến đều gắn với một thời điểm và với phạm vi hồ sơ đã xem. Phần tính toán thuộc về bộ phận kế toán; phần chúng tôi chịu trách nhiệm là cơ sở pháp lý của cách xử lý.",
          en: "A specific figure is meaningful only when it rests on the actual documents and the rules applicable at the time, so we do not estimate before reviewing the file. Tax rules also change over time, so any view we give is tied to a date and to the documents we have seen. The arithmetic sits with your accountants; what we take responsibility for is the legal basis of the treatment.",
          zh: "具体数字只有建立在实际资料以及当时适用规定的基础上才有意义，因此我们不会在查阅材料前给出估算。税务规定也会随时间变化，故我们的任何意见都与特定时点及所审阅的资料范围相关联。计算本身属于会计部门的工作；我们负责的是处理方式的法律依据。",
        },
      },
      {
        question: {
          vi: "Chúng tôi có được biết trước chi phí không?",
          en: "Will we know the cost in advance?",
          zh: "费用能否事先知晓？",
        },
        answer: {
          vi: "Phạm vi công việc, phí và người phụ trách được xác định bằng văn bản trước khi bắt đầu. Với công việc rà soát, phạm vi thường được chia theo giai đoạn để bạn quyết định có tiếp tục sau mỗi giai đoạn hay không. Nếu phát sinh nội dung nằm ngoài phạm vi đã thống nhất, chúng tôi trao đổi lại với bạn trước khi thực hiện.",
          en: "The scope of work, the fee and the responsible lawyer are set out in writing before work begins. For review work the scope is usually divided into stages, so you can decide after each stage whether to continue. If something arises outside the agreed scope, we discuss it with you before carrying it out.",
          zh: "工作范围、费用与负责律师将在开始前以书面形式确定。审查类工作通常分阶段进行，您可在每一阶段结束后决定是否继续。若出现约定范围之外的事项，我们会先与您沟通再行处理。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý về thuế và tài chính doanh nghiệp: rà soát nghĩa vụ, tác động thuế của giao dịch, hồ sơ giải trình và làm việc với cơ quan thuế.",
      en: "Tax and corporate finance in Vietnam: reviewing obligations, tax impact of transactions, supporting records and dealings with the tax authorities.",
      zh: "越南税务与企业财务法律支持：义务梳理、交易税务影响、说明资料准备及税务机关沟通。",
    },
  },
  {
    slug: "hon-nhan-gia-dinh",
    title: {
      vi: "Hôn nhân, gia đình & thừa kế",
      en: "Family & inheritance",
      zh: "婚姻家庭与继承",
    },
    summary: {
      vi: "Hỗ trợ pháp lý cho các việc trong gia đình: tài sản của vợ chồng, chấm dứt hôn nhân, sắp xếp liên quan tới con và việc chuyển giao tài sản giữa các thế hệ.",
      en: "Legal support for matters within a family: marital property, the ending of a marriage, arrangements concerning children, and the passing of property between generations.",
      zh: "为家庭事务提供法律支持：夫妻财产、婚姻的终止、与子女相关的安排，以及代际间的财产移转。",
    },
    audience: {
      vi: "Người đang cân nhắc thỏa thuận tài sản trước hoặc trong thời kỳ hôn nhân, người chuẩn bị hoặc đang trong quá trình ly hôn, và gia đình cần sắp xếp việc thừa kế hoặc thực hiện thủ tục sau khi có người thân qua đời.",
      en: "People considering a property agreement before or during a marriage, those preparing for or going through a divorce, and families arranging an inheritance or completing procedures after a relative has died.",
      zh: "考虑在婚前或婚姻存续期间订立财产协议的人、准备离婚或正在办理离婚的人，以及需要安排继承或在亲属过世后办理手续的家庭。",
    },
    scope: [
      {
        vi: "Thỏa thuận về tài sản trước và trong thời kỳ hôn nhân",
        en: "Property agreements before and during a marriage",
        zh: "婚前及婚姻存续期间的财产协议",
      },
      {
        vi: "Xác định và phân chia tài sản chung, tài sản riêng",
        en: "Identifying and dividing joint and separate property",
        zh: "共同财产与个人财产的认定及分割",
      },
      {
        vi: "Thủ tục ly hôn thuận tình và ly hôn theo yêu cầu của một bên",
        en: "Divorce by agreement and divorce at the request of one party",
        zh: "协议离婚与一方请求离婚的程序",
      },
      {
        vi: "Nuôi con, cấp dưỡng và quyền thăm nom sau khi ly hôn",
        en: "Care of children, maintenance and contact arrangements after a divorce",
        zh: "离婚后的子女抚养、抚养费与探视安排",
      },
      {
        vi: "Lập di chúc và sắp xếp việc chuyển giao tài sản khi còn sống",
        en: "Making a will and arranging transfers of property during your lifetime",
        zh: "订立遗嘱及生前的财产移转安排",
      },
      {
        vi: "Khai nhận di sản, thỏa thuận phân chia và tranh chấp về thừa kế",
        en: "Estate declaration, agreements on distribution and inheritance disputes",
        zh: "遗产申报、分割协议与继承争议",
      },
    ],
    process: [
      {
        heading: {
          vi: "Nghe trước, trao đổi phương án sau",
          en: "Listen first, discuss options after",
          zh: "先倾听，后讨论方案",
        },
        description: {
          vi: "Buổi làm việc đầu tiên dành để hiểu hoàn cảnh và điều bạn muốn đạt được, không phải để thúc bạn chọn một phương án. Thông tin bạn cung cấp được giữ bí mật theo quy tắc nghề nghiệp của luật sư, kể cả khi sau đó bạn quyết định không tiếp tục.",
          en: "The first meeting is for understanding your situation and what you want to achieve, not for pressing you towards a course of action. What you tell us is kept confidential under the professional rules that apply to lawyers, including if you afterwards decide not to proceed.",
          zh: "第一次会面用于了解您的处境与期望达成的目标，而非促使您尽快作出选择。您提供的信息依律师职业规范予以保密，即使您此后决定不再继续亦然。",
        },
      },
      {
        heading: {
          vi: "Làm rõ các lựa chọn và hệ quả đi kèm",
          en: "Set out the options and what each entails",
          zh: "厘清各项选择及其后果",
        },
        description: {
          vi: "Bạn nhận được mô tả về những hướng có thể đi, thủ tục và thời gian dự kiến của mỗi hướng, cùng những việc thường phát sinh trên thực tế. Chúng tôi không khẳng định kết quả và không thúc ép lựa chọn nào; quyết định thuộc về bạn.",
          en: "You receive a description of the routes available, the procedure and likely timeframe for each, and what commonly arises in practice. We do not promise outcomes and do not press any one option; the decision is yours.",
          zh: "您将了解可行的各条路径、各自的程序与预计所需时间，以及实践中常见的情况。我们不对结果作出承诺，也不推动您选择某一方案；决定权在您。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị giấy tờ và hồ sơ",
          en: "Prepare the documents and the file",
          zh: "准备证件与材料",
        },
        description: {
          vi: "Các việc trong lĩnh vực này phụ thuộc nhiều vào giấy tờ nhân thân, giấy tờ tài sản và sự thống nhất giữa chúng. Chúng tôi lập danh mục cụ thể, chỉ rõ giấy tờ nào cần bản gốc, giấy tờ nào cần xin cấp lại, và đồng hành trong quá trình bạn thu thập.",
          en: "Matters in this area depend heavily on identity and property documents, and on whether they are consistent with one another. We prepare a specific checklist, indicate which documents are needed in original and which have to be reissued, and stay alongside you while they are gathered.",
          zh: "此类事务在很大程度上取决于身份证件、财产证件以及两者之间是否一致。我们会列出具体清单，指明哪些需要原件、哪些需要补办，并在您收集材料的过程中提供协助。",
        },
      },
      {
        heading: {
          vi: "Thực hiện thủ tục trong phạm vi bạn ủy quyền",
          en: "Carry out the procedure within the mandate you give",
          zh: "在您授权的范围内办理手续",
        },
        description: {
          vi: "Phạm vi công việc, phí và người phụ trách được thống nhất bằng văn bản trước khi bắt đầu. Trong quá trình thực hiện, bạn được thông báo về từng bước và được hỏi ý kiến trước những nội dung ảnh hưởng tới quyền lợi của mình.",
          en: "The scope of work, the fee and the responsible lawyer are agreed in writing before anything starts. As the matter proceeds you are kept informed at each step and consulted before anything that affects your rights.",
          zh: "工作范围、费用与负责律师在开始前以书面形式确定。办理过程中，我们会就每一步骤向您通报，并在涉及您权益的事项上事先征询您的意见。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Trao đổi với luật sư có được giữ kín không?",
          en: "Is what I tell a lawyer kept confidential?",
          zh: "与律师的沟通是否保密？",
        },
        answer: {
          vi: "Có. Luật sư có nghĩa vụ giữ bí mật thông tin của khách hàng theo quy tắc nghề nghiệp, và nghĩa vụ này vẫn tiếp tục sau khi công việc kết thúc. Nếu bạn liên hệ để tìm hiểu rồi quyết định không tiếp tục, những gì đã trao đổi vẫn được giữ kín. Bạn có thể nói rõ ngay từ đầu về cách bạn muốn được liên hệ và những kênh nên tránh.",
          en: "Yes. A lawyer is bound by professional rules to keep a client's information confidential, and that duty continues after the work has ended. If you make contact to understand your position and then decide not to go further, what you have said remains confidential. You can tell us at the outset how you prefer to be contacted and which channels to avoid.",
          zh: "是的。律师依职业规范负有为客户保密的义务，该义务在工作结束后依然存续。若您只是前来了解情况，随后决定不再继续，所交流的内容同样予以保密。您可以在一开始就说明希望的联系方式，以及应当避免使用的渠道。",
        },
      },
      {
        question: {
          vi: "Hai vợ chồng có thể cùng nhờ một luật sư không?",
          en: "Can a couple instruct the same lawyer?",
          zh: "夫妻双方可以委托同一位律师吗？",
        },
        answer: {
          vi: "Điều này phụ thuộc vào việc quyền lợi của hai người có xung đột hay không. Khi hai bên đã thống nhất và chỉ cần hỗ trợ về thủ tục, một luật sư có thể làm việc với cả hai nếu cả hai cùng đồng ý và không có xung đột lợi ích. Khi còn bất đồng về tài sản hoặc về con, mỗi bên nên có luật sư riêng. Chúng tôi kiểm tra xung đột lợi ích trước khi nhận việc và nói rõ nếu không thể tiếp tục.",
          en: "It depends on whether the two positions conflict. Where the parties already agree and only need help with the procedure, one lawyer may work with both, provided both consent and there is no conflict of interest. Where property or the children remain in dispute, each party should have separate representation. We check for conflicts before accepting instructions and say plainly if we cannot continue to act.",
          zh: "这取决于双方利益是否存在冲突。若双方已达成一致、仅需程序上的协助，在两人均同意且不存在利益冲突的前提下，同一位律师可以同时协助。若在财产或子女问题上仍有分歧，双方宜各自聘请律师。我们在接受委托前会核查利益冲突，如无法继续代理会明确说明。",
        },
      },
      {
        question: {
          vi: "Nên chuẩn bị những gì khi người thân vừa qua đời?",
          en: "What should we prepare after a relative has died?",
          zh: "亲属过世后应准备什么？",
        },
        answer: {
          vi: "Trước hết là giấy chứng tử và các giấy tờ chứng minh quan hệ nhân thân giữa những người trong gia đình. Sau đó là giấy tờ về tài sản đứng tên người đã mất, và di chúc nếu có. Không cần chuẩn bị đầy đủ mọi thứ trước khi liên hệ; chúng tôi sẽ cùng bạn lập danh mục và chỉ rõ giấy tờ nào có thể xin cấp lại. Nếu trong gia đình còn ý kiến khác nhau, bạn có thể nói trước để việc trao đổi được sắp xếp phù hợp.",
          en: "First the death certificate and the documents evidencing the family relationships between those involved. Then the documents for property held in the deceased's name, and the will if there is one. You do not need everything in place before making contact; we will draw up the list with you and point out which documents can be reissued. If views within the family differ, you can say so in advance so that discussions are arranged accordingly.",
          zh: "首先是死亡证明以及能够证明家庭成员之间亲属关系的文件，其次是以逝者名义登记的财产资料，如有遗嘱亦请一并提供。联系我们之前不必备齐所有材料；我们会与您共同列出清单，并指出哪些证件可以补办。若家庭成员之间尚有不同意见，您可事先说明，以便相应安排沟通方式。",
        },
      },
      {
        question: {
          vi: "Việc này có bắt buộc phải đưa ra tòa không?",
          en: "Does this have to go to court?",
          zh: "这类事务是否必须诉诸法院？",
        },
        answer: {
          vi: "Không phải trường hợp nào cũng vậy. Nhiều việc trong lĩnh vực này được giải quyết bằng thỏa thuận giữa các bên cùng thủ tục công chứng, chứng thực theo quy định hiện hành. Tòa án là hướng cần đến khi các bên không thống nhất được, hoặc khi thủ tục bắt buộc phải qua tòa. Chúng tôi trình bày cả hai hướng cùng thời gian và chi phí dự kiến để bạn cân nhắc, chứ không mặc định chọn con đường tố tụng.",
          en: "Not always. Many matters in this area are resolved by agreement between the parties, together with notarisation or certification under the applicable rules. Court becomes necessary where the parties cannot agree, or where the procedure itself requires it. We set out both routes with the likely time and cost so that you can weigh them, rather than treating proceedings as the starting point.",
          zh: "并非总是如此。此类事务中有不少可通过各方协议，并按现行规定办理公证或认证来解决。只有在各方无法达成一致，或程序本身有此要求时，才需要通过法院。我们会将两条路径连同预计时间与费用一并说明，供您权衡，而不会默认选择诉讼。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý về hôn nhân, gia đình và thừa kế: thỏa thuận tài sản, ly hôn, sắp xếp về con cái, lập di chúc và thủ tục khai nhận di sản.",
      en: "Family and inheritance law in Vietnam: property agreements, divorce, arrangements for children, wills and estate procedures.",
      zh: "越南婚姻家庭与继承法律支持：夫妻财产协议、离婚程序、子女抚养安排、遗嘱订立与遗产申报手续。",
    },
  },
  {
    slug: "hinh-su",
    title: {
      vi: "Hình sự",
      en: "Criminal defence",
      zh: "刑事辩护",
    },
    summary: {
      vi: "Hỗ trợ pháp lý cho người bị tố giác, bị can, bị cáo và người bị hại trong quá trình tố tụng hình sự: làm rõ quyền của bạn ở từng giai đoạn và chuẩn bị cho những bước sắp diễn ra.",
      en: "Legal support for people under report, accused or charged, and for injured parties, through criminal proceedings: making your rights clear at each stage and preparing for what comes next.",
      zh: "为被举报人、犯罪嫌疑人、被告人及被害人在刑事诉讼过程中提供法律支持：厘清您在各阶段的权利，并为接下来的程序做好准备。",
    },
    audience: {
      vi: "Người vừa nhận được giấy triệu tập hoặc giấy mời làm việc, gia đình của người đang bị tạm giữ hoặc tạm giam, và người bị hại cần hiểu vai trò của mình trong vụ án.",
      en: "People who have just received a summons or an invitation to attend, families of someone held in custody, and injured parties who need to understand their role in the case.",
      zh: "刚收到传唤或工作通知的人、正被拘留或羁押者的家属，以及需要了解自身在案件中角色的被害人。",
    },
    scope: [
      {
        vi: "Bảo vệ quyền của người bị tố giác, bị can, bị cáo trong suốt quá trình tố tụng",
        en: "Protecting the rights of a person under report, accused or charged throughout the proceedings",
        zh: "在诉讼全程维护被举报人、犯罪嫌疑人、被告人的权利",
      },
      {
        vi: "Tham gia từ giai đoạn xác minh tin báo, tố giác và giai đoạn điều tra",
        en: "Involvement from the verification of reports and from the investigation stage",
        zh: "自举报核查阶段与侦查阶段起即介入",
      },
      {
        vi: "Có mặt khi lấy lời khai, hỏi cung theo quy định hiện hành",
        en: "Attendance when statements are taken and during questioning, as current rules provide",
        zh: "依现行规定在询问与讯问时到场",
      },
      {
        vi: "Nghiên cứu hồ sơ, sao chụp tài liệu và chuẩn bị luận cứ bào chữa",
        en: "Studying the case file, copying documents and preparing the defence submissions",
        zh: "研究案卷、复制材料并准备辩护意见",
      },
      {
        vi: "Bào chữa tại phiên tòa sơ thẩm và phúc thẩm",
        en: "Defence at first-instance and appellate hearings",
        zh: "在一审与二审庭审中进行辩护",
      },
      {
        vi: "Bảo vệ quyền lợi cho người bị hại và đương sự khác trong vụ án hình sự",
        en: "Representing injured parties and other participants within criminal proceedings",
        zh: "在刑事案件中维护被害人及其他当事人的权益",
      },
    ],
    process: [
      {
        heading: {
          vi: "Tiếp nhận thông tin trong điều kiện bảo mật",
          en: "Take in the situation, in confidence",
          zh: "在保密条件下了解情况",
        },
        description: {
          vi: "Buổi trao đổi đầu tiên tập trung vào những gì đã diễn ra: bạn đã nhận văn bản nào, cơ quan nào đang làm việc, sự việc đang ở giai đoạn nào. Mọi thông tin bạn cung cấp được giữ bí mật theo quy tắc nghề nghiệp của luật sư, kể cả khi sau đó bạn không ký hợp đồng dịch vụ.",
          en: "The first conversation focuses on what has actually happened: which documents you have received, which authority is dealing with the matter, and what stage it has reached. Everything you tell us is kept confidential under the professional rules that bind lawyers, including where you decide afterwards not to engage us.",
          zh: "第一次沟通聚焦于已经发生的事：您收到了哪些文书、哪个机关正在办理、案件处于哪个阶段。您提供的所有信息均依律师职业规则保密，即使您之后决定不签署委托合同亦然。",
        },
      },
      {
        heading: {
          vi: "Đăng ký người bào chữa",
          en: "Register as your defender",
          zh: "办理辩护人登记",
        },
        description: {
          vi: "Quyền có người bào chữa được pháp luật ghi nhận, và luật sư tham gia tố tụng sau khi hoàn tất thủ tục đăng ký theo quy định hiện hành. Chúng tôi tiến hành thủ tục này sớm nhất có thể, vì thời điểm tham gia quyết định phần thời gian còn lại để chuẩn bị.",
          en: "The right to a defender is recognised by law, and a lawyer joins the proceedings once the registration formalities required under current rules are complete. We start those formalities as early as we can, because the point at which a lawyer joins determines how much time remains for preparation.",
          zh: "获得辩护人的权利由法律确认，律师须依现行规定完成登记手续后方可参与诉讼。我们会尽早办理该手续，因为介入时点决定了余下可用于准备的时间。",
        },
      },
      {
        heading: {
          vi: "Nghiên cứu hồ sơ và trao đổi lại với bạn",
          en: "Study the file and go through it with you",
          zh: "研究案卷并与您逐项核对",
        },
        description: {
          vi: "Sau khi được tiếp cận hồ sơ theo quy định, chúng tôi đối chiếu tài liệu trong hồ sơ với diễn biến bạn trình bày và ghi nhận những điểm còn chưa rõ. Bạn được giải thích nội dung hồ sơ bằng ngôn ngữ dễ hiểu, cùng với quyền của bạn ở giai đoạn đang diễn ra.",
          en: "Once the file is accessible to us under the applicable rules, we compare what it contains with the account you have given and note where things remain unclear. You receive an explanation of the file in plain language, together with the rights you have at the stage the case has reached.",
          zh: "在依规定获准查阅案卷后，我们会将卷内材料与您陈述的经过逐一比对，并记录尚不清楚之处。我们会用通俗的语言向您说明卷宗内容，以及您在当前阶段所享有的权利。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị cho từng bước tố tụng",
          en: "Prepare for each step of the proceedings",
          zh: "为每一诉讼环节做好准备",
        },
        description: {
          vi: "Trước mỗi buổi làm việc hay phiên tòa, bạn được thông tin về trình tự sẽ diễn ra, quyền của bạn và tài liệu cần có. Chúng tôi không dự đoán và không cam kết về kết quả; công việc của luật sư là để hồ sơ, kiến nghị và phần trình bày được chuẩn bị đầy đủ trong khuôn khổ pháp luật.",
          en: "Before each working session or hearing, you are told what will happen, what your rights are and which documents are needed. We do not predict outcomes and make no promises about them; a lawyer's work is to ensure the file, the submissions and the presentation are fully prepared within the limits of the law.",
          zh: "在每次工作或开庭之前，您都会获知将要进行的流程、您的权利以及所需材料。我们不预测结果，也不作任何结果承诺；律师的工作是在法律框架内把卷宗、申请意见与庭上陈述准备充分。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Người thân tôi đang bị tạm giữ, trước tiên nên làm gì?",
          en: "A relative of mine is in custody. What should I do first?",
          zh: "我的家属正被拘留，首先应当做什么？",
        },
        answer: {
          vi: "Hãy ghi lại chính xác những gì bạn biết: thời điểm, cơ quan đang làm việc và các văn bản mà gia đình đã nhận, đồng thời giữ nguyên bản giấy tờ. Theo quy định hiện hành, người bị tạm giữ, tạm giam có quyền có người bào chữa, và người thân có thể mời luật sư cho họ. Nên liên hệ luật sư sớm để thủ tục đăng ký bào chữa được tiến hành ngay, vì thời gian ở giai đoạn đầu thường rất hạn chế. Chúng tôi không thể nói trước sự việc sẽ đi tới đâu, nhưng có thể giải thích rõ trình tự sắp diễn ra.",
          en: "Write down precisely what you know: when it happened, which authority is involved and which documents the family has received, and keep the originals. Under current rules a person held in custody has the right to a defender, and a family member may engage a lawyer on their behalf. Contact a lawyer early so the registration formalities can begin at once, because time is usually very short at this stage. We cannot say where the matter will lead, but we can explain clearly what happens next.",
          zh: "请准确记下您所知道的情况：发生时间、正在办理的机关、家属已收到的文书，并保管好原件。依现行规定，被拘留、羁押的人有权获得辩护人，家属可以为其委托律师。宜尽早联系律师以便立即启动辩护人登记手续，因为初期阶段的时间通常十分紧迫。我们无法预言案件走向，但可以清楚说明接下来的程序。",
        },
      },
      {
        question: {
          vi: "Tôi có buộc phải trả lời mọi câu hỏi khi được mời làm việc không?",
          en: "Do I have to answer every question when I am called in?",
          zh: "被通知配合工作时，我必须回答所有问题吗？",
        },
        answer: {
          vi: "Quyền và nghĩa vụ của bạn phụ thuộc vào tư cách tham gia trong vụ việc — người làm chứng, người bị tố giác hay bị can — và pháp luật quy định riêng cho từng tư cách. Đây là nội dung luật sư giải thích cho bạn trước buổi làm việc, dựa trên các văn bản bạn đã nhận. Chúng tôi không đưa ra một câu trả lời chung cho mọi trường hợp trên trang này, vì áp dụng sai bối cảnh có thể gây bất lợi cho chính bạn. Việc nên làm trước tiên là xác định rõ bạn được mời làm việc với tư cách nào.",
          en: "Your rights and obligations depend on the capacity in which you take part — witness, person under report, or accused — and the law sets them out separately for each. That is what a lawyer explains to you before the session, based on the documents you have received. We do not give a single answer for every situation on this page, because applying it in the wrong context can work against you. The first thing to establish is the capacity in which you have been called in.",
          zh: "您的权利与义务取决于您在案件中的参与身份——证人、被举报人还是犯罪嫌疑人——法律对各种身份分别作出规定。这正是律师会在工作之前，依据您已收到的文书向您说明的内容。我们不会在本页给出适用于所有情形的统一答案，因为用错场合反而可能对您不利。首先应当明确的是：您是以何种身份被通知配合工作的。",
        },
      },
      {
        question: {
          vi: "Mời luật sư sớm có ích gì khi sự việc còn chưa rõ ràng?",
          en: "What is the point of involving a lawyer early, while things are still unclear?",
          zh: "案情尚不明朗时，尽早委托律师有什么用？",
        },
        answer: {
          vi: "Càng sớm được đọc các văn bản đã ban hành, luật sư càng có nhiều thời gian chuẩn bị và càng ít phải xử lý những việc đã lỡ. Lời khai và tài liệu hình thành ở giai đoạn đầu thường được sử dụng lại trong suốt quá trình về sau. Thủ tục đăng ký bào chữa cũng cần thời gian, nên liên hệ sớm giúp luật sư có mặt đúng lúc. Ngay cả khi sự việc chưa rõ ràng, một buổi trao đổi để xác định bạn đang ở giai đoạn nào cũng đã có giá trị.",
          en: "The sooner a lawyer can read the documents already issued, the more time there is to prepare and the less there is to repair. Statements and documents created at the earliest stage are usually relied on for the rest of the proceedings. The registration formalities also take time, so contacting a lawyer early helps them be present when it matters. Even where the position is still unclear, a conversation that establishes which stage you are at is already worth having.",
          zh: "律师越早看到已出具的文书，可用于准备的时间就越多，需要事后补救的事情就越少。初期形成的陈述与材料，往往会在此后的全过程中被反复援用。辩护人登记手续也需要时间，尽早联系有助于律师在关键节点及时到场。即使案情尚不明朗，通过一次沟通确认您所处的阶段，本身就有价值。",
        },
      },
      {
        question: {
          vi: "Công ty có thể nói trước kết quả vụ án không?",
          en: "Can you tell me in advance how the case will end?",
          zh: "贵所能否预先告知案件结果？",
        },
        answer: {
          vi: "Không. Không ai có thể nói trước kết quả của một vụ án hình sự, và chúng tôi không đưa ra bất kỳ cam kết nào về kết quả. Chúng tôi cũng không nhận những việc nằm ngoài phạm vi hành nghề: công việc của luật sư diễn ra qua hồ sơ, văn bản kiến nghị và phần trình bày tại phiên tòa. Điều bạn có thể yêu cầu ở chúng tôi là sự chuẩn bị kỹ lưỡng, thông tin trung thực về tình trạng vụ việc và giải thích rõ từng bước sắp tới.",
          en: "No. No one can say in advance how a criminal case will end, and we give no undertakings about the outcome. Nor do we take on anything outside the proper scope of practice: a lawyer's work is done through the file, written submissions and argument at the hearing. What you may expect from us is careful preparation, honest information about where the matter stands, and a clear explanation of each step ahead.",
          zh: "不能。没有人能够预先断定刑事案件的结果，我们也不会就结果作出任何承诺。我们同样不承接执业范围之外的事项：律师的工作通过卷宗、书面意见与庭审陈述完成。您可以要求我们做到的是：充分的准备、关于案件进展的如实告知，以及对下一步程序的清楚说明。",
        },
      },
    ],
    seoDescription: {
      vi: "Bào chữa và bảo vệ quyền lợi trong vụ án hình sự: tham gia từ giai đoạn đầu, nghiên cứu hồ sơ, chuẩn bị cho từng bước tố tụng, bảo mật thông tin.",
      en: "Criminal defence in Vietnam: early involvement, case file review, preparation for each stage of proceedings, and strict confidentiality.",
      zh: "刑事案件辩护与权益维护：自初期阶段介入、研究案卷、为各诉讼阶段做好准备，并严格保密。",
    },
  },
  {
    slug: "hanh-chinh-giay-phep",
    title: {
      vi: "Hành chính & giấy phép",
      en: "Administrative & licensing",
      zh: "行政与许可",
    },
    summary: {
      vi: "Làm việc với cơ quan nhà nước theo đúng trình tự: xác định thủ tục áp dụng, chuẩn bị hồ sơ xin phép, và xử lý khi một quyết định hành chính ảnh hưởng tới hoạt động của bạn.",
      en: "Dealing with the authorities in the right order: identifying the procedure that applies, preparing licence applications, and responding when an administrative decision affects your operations.",
      zh: "依正确程序与行政机关打交道：确定适用手续、准备许可申请材料，并在行政决定影响您的经营时作出应对。",
    },
    audience: {
      vi: "Doanh nghiệp cần giấy phép để bắt đầu hoặc mở rộng hoạt động, đơn vị đang trong quá trình thanh tra, kiểm tra, và tổ chức hay cá nhân muốn xem xét lại một quyết định hành chính đã ban hành.",
      en: "Businesses that need a licence to start or expand, organisations going through an inspection, and organisations or individuals considering a review of a decision already issued.",
      zh: "需要许可以启动或扩大经营的企业、正在接受检查稽查的单位，以及希望对已作出的行政决定申请复核的组织与个人。",
    },
    scope: [
      {
        vi: "Xác định thủ tục hành chính và điều kiện áp dụng cho từng hoạt động",
        en: "Identifying the administrative procedure and the conditions that apply to a given activity",
        zh: "确定各项经营活动适用的行政手续与条件",
      },
      {
        vi: "Chuẩn bị hồ sơ xin cấp, sửa đổi, gia hạn và cấp lại giấy phép",
        en: "Preparing applications for the issue, amendment, renewal and re-issue of licences",
        zh: "准备许可的申领、变更、延期与补发材料",
      },
      {
        vi: "Điều kiện kinh doanh theo ngành nghề và các giấy phép chuyên ngành",
        en: "Sector-specific business conditions and specialised permits",
        zh: "行业经营条件与专项许可",
      },
      {
        vi: "Thủ tục về lao động nước ngoài và giấy tờ cư trú kèm theo",
        en: "Procedures for foreign employees and the accompanying residence documents",
        zh: "外籍人员用工手续及相关居留证件",
      },
      {
        vi: "Hỗ trợ trong quá trình thanh tra, kiểm tra và giải trình với cơ quan quản lý",
        en: "Support during inspections and in explaining matters to the authorities",
        zh: "检查、稽查过程中的支持及向主管机关的说明",
      },
      {
        vi: "Khiếu nại quyết định hành chính và khởi kiện vụ án hành chính theo quy định hiện hành",
        en: "Administrative complaints and administrative court claims under current rules",
        zh: "依现行规定提出行政复议申请及提起行政诉讼",
      },
    ],
    process: [
      {
        heading: {
          vi: "Xác định đúng thủ tục và cơ quan có thẩm quyền",
          en: "Identify the right procedure and the competent authority",
          zh: "确定正确的手续与主管机关",
        },
        description: {
          vi: "Cùng một hoạt động có thể thuộc thẩm quyền của những cơ quan khác nhau, tùy ngành nghề và địa bàn. Bước đầu tiên là xác định thủ tục áp dụng, cơ quan tiếp nhận và các điều kiện phải đáp ứng trước khi nộp hồ sơ.",
          en: "The same activity can fall to different authorities depending on the sector and the location. The first step is to establish which procedure applies, which body receives the file, and what conditions must be met before it is submitted.",
          zh: "同一项经营活动可能因行业与地域不同而归属不同机关管辖。第一步是确定适用手续、受理机关，以及提交材料前必须满足的条件。",
        },
      },
      {
        heading: {
          vi: "Đối chiếu hiện trạng với điều kiện phải đáp ứng",
          en: "Compare where you stand against the conditions",
          zh: "将现状与应满足的条件逐项比对",
        },
        description: {
          vi: "Chúng tôi rà soát những gì bạn đang có — cơ sở vật chất, nhân sự, tài liệu nội bộ — và chỉ ra phần còn thiếu so với điều kiện của thủ tục. Việc bổ sung được sắp xếp theo thứ tự hợp lý, để hồ sơ nộp một lần cho đủ thay vì bị trả lại nhiều lần.",
          en: "We review what you already have — premises, personnel, internal records — and identify what is missing against the conditions of the procedure. The gaps are then addressed in a sensible order, so the file can be submitted complete rather than returned repeatedly.",
          zh: "我们会梳理您现有的条件——场所、人员、内部文件——并指出与手续要求之间的差距。补充事项按合理顺序安排，使材料能够一次报齐，而非反复被退回。",
        },
      },
      {
        heading: {
          vi: "Chuẩn bị hồ sơ và theo dõi quá trình xử lý",
          en: "Prepare the file and follow the processing",
          zh: "准备材料并跟踪办理进程",
        },
        description: {
          vi: "Hồ sơ được soạn theo yêu cầu của cơ quan tiếp nhận, kèm phần giải trình cho những nội dung dễ phát sinh câu hỏi. Trong thời gian xử lý, chúng tôi theo dõi tiến độ và chuẩn bị nội dung phản hồi khi có yêu cầu bổ sung.",
          en: "The file is prepared to the requirements of the receiving authority, with written explanations for the points most likely to attract questions. While it is being processed, we follow progress and prepare responses to any request for further documents.",
          zh: "材料按受理机关的要求编制，并对容易引起询问之处附具说明。在办理期间，我们会跟踪进度，并在收到补充要求时准备回复内容。",
        },
      },
      {
        heading: {
          vi: "Xem xét phương án khi kết quả không như mong muốn",
          en: "Weigh the options if the result is not what you hoped",
          zh: "在结果不如预期时权衡方案",
        },
        description: {
          vi: "Nếu hồ sơ bị từ chối hoặc một quyết định hành chính gây bất lợi, bạn được giải thích các cơ chế xem xét lại theo quy định hiện hành và thời hạn tương ứng của từng cơ chế. Chúng tôi trình bày ưu và nhược điểm của mỗi hướng, kể cả khi kết luận là nên hoàn thiện và nộp lại hồ sơ thay vì theo đuổi khiếu nại. Không có cam kết nào về kết quả.",
          en: "If an application is refused or a decision goes against you, we explain the review mechanisms available under current rules and the time limits attaching to each. We set out the advantages and drawbacks of each route, including where the conclusion is that completing and re-submitting the file serves you better than pursuing a challenge. No outcome is promised.",
          zh: "若申请被拒或行政决定不利，我们会说明现行规定下可用的复核途径及各自对应的期限。我们会陈述每种途径的利弊，包括结论是完善后重新报送优于提起争议的情形。我们不对结果作出任何承诺。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Làm sao biết hoạt động của tôi có cần giấy phép hay không?",
          en: "How do I know whether my activity needs a licence?",
          zh: "如何判断我的业务是否需要许可？",
        },
        answer: {
          vi: "Điều này phụ thuộc vào nội dung hoạt động thực tế chứ không chỉ vào ngành nghề đã đăng ký, và còn thay đổi theo quy mô cùng địa bàn. Chúng tôi bắt đầu từ mô tả chi tiết những gì bạn dự định làm, sau đó đối chiếu với các thủ tục đang có hiệu lực. Kết quả bạn nhận được là danh sách thủ tục áp dụng, cơ quan có thẩm quyền và điều kiện đi kèm. Nếu hoạt động không thuộc diện phải xin phép, chúng tôi nói rõ điều đó.",
          en: "It depends on what you actually do rather than only on the lines of business registered, and it also varies with scale and location. We start from a detailed description of what you plan to do, then check it against the procedures currently in force. What you receive is a list of the procedures that apply, the competent authorities and the conditions attached. If no licence is required, we say so plainly.",
          zh: "这取决于实际经营内容，而不仅是已登记的经营范围，并且随规模与地域而不同。我们从您拟开展业务的详细描述入手，再与现行有效的手续要求逐项比对。您将得到一份清单：适用手续、主管机关及相应条件。若该业务无需申请许可，我们也会明确告知。",
        },
      },
      {
        question: {
          vi: "Hồ sơ bị trả lại nhiều lần thì nên xử lý thế nào?",
          en: "What should I do if the file keeps being returned?",
          zh: "材料被多次退回该如何处理？",
        },
        answer: {
          vi: "Trước hết nên tập hợp đầy đủ các văn bản yêu cầu bổ sung đã nhận, vì chúng cho thấy vướng mắc thực sự nằm ở đâu. Có trường hợp mỗi lần bổ sung lại phát sinh yêu cầu mới, khi đó rà soát lại toàn bộ hồ sơ từ đầu thường hiệu quả hơn là sửa từng phần. Chúng tôi đối chiếu yêu cầu của cơ quan với hồ sơ hiện có và xác định phần nào còn thiếu trên thực tế. Với những nội dung dễ hiểu khác nhau, phần giải trình bằng văn bản được chuẩn bị kèm theo.",
          en: "Start by gathering every written request for additional documents you have received, because together they show where the real obstacle lies. Sometimes each round of additions produces a fresh request; where that happens, reviewing the whole file from the beginning is usually more effective than patching parts of it. We compare the authority's requirements against the file as it stands and establish what is genuinely missing. Where a point is open to different readings, a written explanation is prepared alongside it.",
          zh: "首先应收齐已收到的所有补充材料通知，因为它们能显示症结究竟在何处。有时每补充一次就会产生新的要求，此时从头整体复核材料，通常比逐处修补更有效。我们会将机关的要求与现有材料比对，确定实际缺少的部分。对于容易产生不同理解的内容，会一并准备书面说明。",
        },
      },
      {
        question: {
          vi: "Khiếu nại và khởi kiện vụ án hành chính khác nhau ra sao?",
          en: "What is the difference between a complaint and an administrative court claim?",
          zh: "行政复议与行政诉讼有何区别？",
        },
        answer: {
          vi: "Khiếu nại là đề nghị chính cơ quan đã ban hành hoặc cơ quan cấp trên xem xét lại quyết định, còn khởi kiện vụ án hành chính là đưa vụ việc ra tòa án. Mỗi hướng có trình tự, hồ sơ và thời hạn riêng theo quy định hiện hành, và việc chọn hướng nào phụ thuộc vào loại quyết định cùng tài liệu bạn đang có. Chúng tôi giải thích trình tự của cả hai và những gì cần chuẩn bị cho từng hướng trước khi bạn quyết định. Vì thời hạn là yếu tố dễ bỏ lỡ, nên kiểm tra ngay khi nhận được quyết định.",
          en: "A complaint asks the issuing body, or the body above it, to reconsider the decision; an administrative claim brings the matter before a court. Each route has its own steps, documents and time limits under current rules, and the choice depends on the type of decision and the documents you hold. We explain how both work and what each requires before you decide. Because time limits are easy to miss, it is worth checking them as soon as a decision reaches you.",
          zh: "行政复议是请求作出决定的机关或其上级机关重新审查该决定，行政诉讼则是将案件提交法院。两条途径在现行规定下各有其程序、材料与期限，选择哪一条取决于决定的类型及您掌握的文件。我们会在您作出决定前说明两者的流程及各自所需准备。由于期限极易错过，收到决定后宜立即核对。",
        },
      },
      {
        question: {
          vi: "Khi có đoàn thanh tra, kiểm tra thì cần chuẩn bị những gì?",
          en: "What should we prepare when an inspection is announced?",
          zh: "面对检查组时需要准备什么？",
        },
        answer: {
          vi: "Nên bắt đầu từ văn bản: quyết định hoặc thông báo về nội dung, phạm vi và thời gian làm việc, vì đó là căn cứ để chuẩn bị đúng tài liệu. Cử một đầu mối phụ trách cung cấp hồ sơ và lưu giữ đầy đủ biên bản làm việc giúp nội dung trao đổi được ghi nhận chính xác. Chúng tôi hỗ trợ rà soát tài liệu trước, chuẩn bị phần giải trình bằng văn bản và theo dõi các mốc tiếp theo sau khi buổi làm việc kết thúc. Nếu phát sinh kết luận bất lợi, các cơ chế xem xét lại được giải thích ở bước sau đó.",
          en: "Begin with the paperwork: the decision or notice setting out the subject, the scope and the timing, since that is the basis for preparing the right documents. Appointing one person to hand over records and to keep the working minutes complete helps ensure that what was said is accurately recorded. We help review the documents beforehand, prepare written explanations and track what follows once the session ends. If the conclusions are unfavourable, the review mechanisms are explained at that later stage.",
          zh: "宜从文书入手：载明检查内容、范围与时间的决定或通知，这是准备正确材料的依据。指定一名对接人负责提供档案并完整保存工作记录，有助于准确留存沟通内容。我们会协助事先梳理材料、准备书面说明，并在工作结束后跟踪后续节点。若形成不利结论，复核途径将在其后的阶段另行说明。",
        },
      },
    ],
    seoDescription: {
      vi: "Thủ tục hành chính và giấy phép: xác định thủ tục áp dụng, chuẩn bị hồ sơ xin cấp và gia hạn, hỗ trợ khi thanh tra, khiếu nại và khởi kiện hành chính.",
      en: "Administrative and licensing work in Vietnam: identifying the right procedure, licence applications and renewals, inspection support and challenges.",
      zh: "行政手续与许可：确定适用程序、准备申领与延期材料、检查应对支持，以及复议与行政诉讼。",
    },
  },
  {
    slug: "ngan-hang-tin-dung",
    title: {
      vi: "Ngân hàng & tín dụng",
      en: "Banking & credit",
      zh: "银行与信贷",
    },
    summary: {
      vi: "Hồ sơ vay và văn kiện bảo đảm thường được ký dưới áp lực thời gian giải ngân. Công việc của chúng tôi là làm rõ nghĩa vụ bạn nhận về trước khi chữ ký được đặt xuống.",
      en: "Loan documents and security instruments are often signed under drawdown pressure. Our role is to make the obligations you are taking on clear before the signature goes down.",
      zh: "贷款文件与担保文书往往在放款时间压力下签署。我们的工作是在落笔之前，让您清楚将要承担的义务。",
    },
    audience: {
      vi: "Doanh nghiệp đang thu xếp hoặc cơ cấu lại khoản vay, bên bảo đảm và bên thứ ba dùng tài sản để bảo đảm nghĩa vụ. Bên cạnh đó là tổ chức tín dụng và công ty tài chính cần rà soát bộ hợp đồng mẫu cùng quy trình nội bộ.",
      en: "Businesses arranging or restructuring borrowings, guarantors, and third parties putting up assets as security. Also credit institutions and finance companies reviewing their standard documentation and internal procedures.",
      zh: "正在安排或重组借款的企业、保证人，以及以自身资产为他人义务提供担保的第三方；此外还有需要审查标准合同文本与内部流程的信贷机构和财务公司。",
    },
    scope: [
      {
        vi: "Rà soát và đàm phán hợp đồng tín dụng, hợp đồng vay và văn kiện giải ngân",
        en: "Review and negotiation of credit facilities, loan agreements and drawdown documents",
        zh: "授信合同、借款合同及放款文件的审查与谈判",
      },
      {
        vi: "Biện pháp bảo đảm: thế chấp, cầm cố, bảo lãnh, ký quỹ và bảo đảm bằng quyền tài sản",
        en: "Security arrangements: mortgage, pledge, guarantee, deposit and security over property rights",
        zh: "担保方式：抵押、质押、保证、保证金及以财产权利设定的担保",
      },
      {
        vi: "Đăng ký biện pháp bảo đảm và trình tự xử lý tài sản bảo đảm",
        en: "Registration of security interests and the procedure for enforcing collateral",
        zh: "担保措施登记与担保财产的处置程序",
      },
      {
        vi: "Khoản vay có yếu tố nước ngoài và thủ tục quản lý ngoại hối liên quan",
        en: "Cross-border borrowings and the related foreign exchange formalities",
        zh: "涉外借款及相关外汇管理手续",
      },
      {
        vi: "Bộ hợp đồng mẫu, điều kiện giao dịch chung và quy trình nội bộ của tổ chức tín dụng",
        en: "Standard form documents, general terms of business and internal procedures of credit institutions",
        zh: "信贷机构的标准合同文本、通用交易条件与内部流程",
      },
      {
        vi: "Cơ cấu lại khoản nợ, chuyển nhượng khoản vay và phương án thu hồi nợ",
        en: "Debt restructuring, loan transfers and debt recovery options",
        zh: "债务重组、贷款转让与债权回收方案",
      },
    ],
    process: [
      {
        heading: {
          vi: "Dựng lại cấu trúc khoản vay",
          en: "Map the financing structure",
          zh: "梳理融资结构",
        },
        description: {
          vi: "Trước khi đọc từng điều khoản, cần thấy rõ toàn cảnh: ai là bên vay, ai bảo đảm bằng tài sản nào, dòng tiền đi qua những đâu. Nhiều rủi ro chỉ lộ ra khi đặt các văn kiện cạnh nhau chứ không đọc riêng lẻ.",
          en: "Before going through individual clauses, the whole picture has to be visible: who borrows, who secures what with which assets, and how the money moves. Many risks only surface when the documents are read side by side rather than one at a time.",
          zh: "在逐条阅读之前，需要先看清全貌：谁是借款人、谁以何种资产提供担保、资金流向何处。许多风险只有在把各份文件并置阅读时才会显现。",
        },
      },
      {
        heading: {
          vi: "Rà soát nghĩa vụ và cam kết ràng buộc",
          en: "Review the obligations and undertakings",
          zh: "审查义务与承诺条款",
        },
        description: {
          vi: "Trọng tâm là những điều khoản có thể ràng buộc bạn về sau: cam kết duy trì, hạn chế giao dịch, điều kiện tiên quyết, sự kiện vi phạm và hệ quả kèm theo. Chúng tôi chỉ ra điều khoản nào bạn có thể thực hiện được trên thực tế và điều khoản nào cần đàm phán lại.",
          en: "The focus is on the terms that bind you afterwards: continuing covenants, restrictions on dealings, conditions precedent, events of default and what follows from them. We identify which terms you can realistically comply with and which are worth renegotiating.",
          zh: "重点在于日后对您形成约束的条款：持续性承诺、交易限制、先决条件、违约事件及其后果。我们会指出哪些条款在实际中可以履行，哪些值得重新谈判。",
        },
      },
      {
        heading: {
          vi: "Hoàn thiện văn kiện bảo đảm và thủ tục đăng ký",
          en: "Complete the security documents and registrations",
          zh: "完善担保文件与登记手续",
        },
        description: {
          vi: "Văn kiện bảo đảm được soạn hoặc chỉnh sửa để mô tả đúng tài sản và đúng nghĩa vụ được bảo đảm. Các thủ tục công chứng, chứng thực và đăng ký theo quy định hiện hành được sắp xếp theo đúng trình tự, kèm danh mục giấy tờ cần chuẩn bị.",
          en: "Security documents are drafted or amended so that they describe the asset and the secured obligation accurately. Notarisation, certification and registration steps required under prevailing regulations are sequenced properly, with a list of the documents to gather.",
          zh: "担保文件的起草或修改，须准确描述担保财产与所担保的义务。现行规定要求的公证、认证与登记环节按正确顺序安排，并附需准备的材料清单。",
        },
      },
      {
        heading: {
          vi: "Bàn giao danh mục nghĩa vụ sau giải ngân",
          en: "Hand over the post-drawdown obligations",
          zh: "交接放款后的义务清单",
        },
        description: {
          vi: "Sau khi hoàn tất, bạn nhận bản tổng hợp các nghĩa vụ phải theo dõi trong suốt thời hạn vay: báo cáo định kỳ, giới hạn phải duy trì, thời điểm gia hạn hoặc cập nhật đăng ký. Mục tiêu là bộ phận nội bộ tiếp quản được mà không phải đọc lại toàn bộ hợp đồng.",
          en: "Once the work is done you receive a consolidated list of what has to be monitored over the life of the facility: periodic reporting, limits to be maintained, and when registrations need renewing or updating. The aim is that your own team can take over without rereading every agreement.",
          zh: "工作完成后，您将收到贷款存续期内需持续跟踪的义务汇总：定期报告、须维持的各项限额、以及登记需要续期或更新的时点。目的是让内部团队无需重读全部合同即可接手。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Cần chuẩn bị gì trước khi rà soát hồ sơ vay?",
          en: "What should I prepare before a loan review?",
          zh: "在审查贷款文件前需要准备什么？",
        },
        answer: {
          vi: "Bản dự thảo hoặc bản chào của tổ chức tín dụng, kèm các phụ lục và biểu mẫu đi kèm. Nếu có tài sản dự kiến dùng để bảo đảm, hãy chuẩn bị giấy tờ chứng minh quyền sở hữu hoặc quyền sử dụng và thông tin về các nghĩa vụ đang tồn tại trên tài sản đó. Ngoài ra, bản mô tả ngắn về mục đích sử dụng vốn và nguồn trả nợ dự kiến sẽ giúp việc rà soát bám sát tình huống thật.",
          en: "The draft or term sheet from the lender, together with the schedules and forms attached to it. If an asset is intended as security, gather the documents evidencing ownership or use rights and details of any existing encumbrances on it. A short note on what the funds are for and how repayment is expected to be sourced also keeps the review grounded in the real position.",
          zh: "信贷机构提供的草案或条款清单，连同随附的附件与表格。如已确定用于担保的财产，请准备权属或使用权证明文件，以及该财产上现存负担的情况。此外，关于资金用途与预计还款来源的简要说明，有助于审查贴近实际情况。",
        },
      },
      {
        question: {
          vi: "Công ty có làm việc với ngân hàng thay tôi được không?",
          en: "Can the firm deal with the bank on my behalf?",
          zh: "贵所可以代表我与银行沟通吗？",
        },
        answer: {
          vi: "Trong phạm vi được ủy quyền, chúng tôi trao đổi với bên cho vay về nội dung văn kiện và các điểm pháp lý cần làm rõ. Cần nói rõ giới hạn: quyết định cấp tín dụng, hạn mức và lãi suất thuộc thẩm quyền của tổ chức tín dụng, dựa trên chính sách và đánh giá rủi ro của họ. Chúng tôi không tác động và không cam kết tác động đến quyết định đó, cũng không nhận làm nhanh bất kỳ khâu phê duyệt nào.",
          en: "Within the scope of the mandate we engage with the lender on the wording of the documents and the legal points that need clarifying. The limit should be stated plainly: the credit decision, the limit and the pricing rest with the credit institution, based on its own policy and risk assessment. We do not influence that decision, do not undertake to influence it, and do not offer to accelerate any approval step.",
          zh: "在授权范围内，我们会就文件措辞与需要澄清的法律问题与贷款方沟通。界限需要明确说明：授信决定、额度与定价属于信贷机构的职权，依据其自身政策与风险评估作出。我们不会也不承诺影响该决定，更不承接加快任何审批环节的事项。",
        },
      },
      {
        question: {
          vi: "Bảo lãnh cho công ty khác vay có khác gì tự mình vay?",
          en: "How is guaranteeing another company's loan different from borrowing?",
          zh: "为其他公司的借款提供担保与自行借款有何不同？",
        },
        answer: {
          vi: "Đây là câu hỏi cần xem văn kiện cụ thể mới trả lời được, vì phạm vi nghĩa vụ phụ thuộc hoàn toàn vào cách soạn thảo. Khi rà soát, chúng tôi tập trung vào những điểm thường quyết định mức độ rủi ro: nghĩa vụ được bảo đảm gồm những khoản nào, thời hạn ra sao, bên nhận bảo đảm được yêu cầu bạn thực hiện trong trường hợp nào. Kết quả bạn nhận là bản giải thích các cơ chế đó bằng ngôn ngữ thông thường, không phải kết luận chung cho mọi trường hợp.",
          en: "This can only be answered against the actual documents, because the extent of the obligation depends entirely on how they are drafted. On review we concentrate on the points that usually drive the exposure: which obligations are covered, for how long, and in what circumstances the beneficiary can call on you. What you receive is an explanation of those mechanics in plain language, not a conclusion that holds for every case.",
          zh: "这一问题须结合具体文件才能回答，因为义务范围完全取决于文本的拟定方式。审查时我们着重于通常决定风险敞口的要点：所担保的义务包括哪些、期限多长、受益方在何种情形下可向您主张。您将得到的是对这些机制的通俗解释，而非适用于所有情形的通用结论。",
        },
      },
      {
        question: {
          vi: "Khoản vay đã quá hạn thì công việc bắt đầu từ đâu?",
          en: "Where does the work start once a loan is already overdue?",
          zh: "贷款已逾期时，工作从何处入手？",
        },
        answer: {
          vi: "Bắt đầu bằng việc đọc lại bộ văn kiện và dựng dòng thời gian: các thông báo đã nhận, các khoản đã thanh toán, những trao đổi đã diễn ra với bên cho vay. Sau đó mới xác định các phương án còn mở, có thể là thương lượng cơ cấu lại, có thể là chuẩn bị cho khả năng xử lý tài sản bảo đảm. Chúng tôi trình bày ưu và nhược điểm của từng hướng, kể cả khi kết luận là nên chủ động làm việc với bên cho vay sớm. Không có cam kết nào về kết quả.",
          en: "It starts with rereading the documents and building a timeline: the notices received, the payments made, the exchanges already had with the lender. Only then are the remaining options identified, whether that is negotiating a restructuring or preparing for possible enforcement against the collateral. We set out the advantages and drawbacks of each direction, including where the conclusion is to approach the lender early. No outcome is promised.",
          zh: "首先是重新阅读全部文件并梳理时间线：已收到的通知、已支付的款项、与贷款方之间已有的往来。在此基础上再确定仍然可行的方案，可能是协商重组，也可能是为担保财产处置作准备。我们会说明每种方向的利弊，包括结论为宜尽早主动与贷款方沟通的情形。不对结果作出承诺。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý về ngân hàng và tín dụng: hợp đồng vay, biện pháp bảo đảm, đăng ký và xử lý tài sản bảo đảm, vay nước ngoài, cơ cấu lại nợ.",
      en: "Banking and credit law in Vietnam: loan documents, security arrangements, registration and enforcement of collateral, and debt restructuring.",
      zh: "越南银行与信贷法律支持：借款合同、担保方式、担保登记与处置、涉外借款、合规及债务重组。",
    },
  },
  {
    slug: "xay-dung-ha-tang",
    title: {
      vi: "Xây dựng & hạ tầng",
      en: "Construction & infrastructure",
      zh: "建设与基础设施",
    },
    summary: {
      vi: "Rủi ro của một dự án xây dựng thường nằm ở những chỗ ít được đọc kỹ: phạm vi công việc, cơ chế xử lý phát sinh và điều kiện thanh toán. Chúng tôi làm rõ các cơ chế đó trước khi công trường bắt đầu.",
      en: "The risk in a construction project usually sits in the parts least closely read: the scope of works, the mechanism for handling variations, and the payment conditions. We make those mechanics clear before work starts on site.",
      zh: "建设项目的风险往往藏在最少被细读的地方：工作范围、变更处理机制与付款条件。我们在开工之前把这些机制讲清楚。",
    },
    audience: {
      vi: "Chủ đầu tư, tổng thầu và nhà thầu phụ, đơn vị tư vấn thiết kế và giám sát. Cùng với đó là nhà đầu tư dự án hạ tầng cần rà soát hồ sơ pháp lý và bộ hợp đồng của dự án trước khi cam kết.",
      en: "Project owners, main contractors and subcontractors, design and supervision consultants. Also investors in infrastructure projects who need the project's legal file and contract suite reviewed before committing.",
      zh: "项目业主、总承包商与分包商、设计与监理单位；以及需要在作出承诺前审查项目法律文件与合同体系的基础设施项目投资方。",
    },
    scope: [
      {
        vi: "Hợp đồng thi công xây dựng, hợp đồng EPC và hợp đồng tư vấn",
        en: "Construction contracts, EPC contracts and consultancy appointments",
        zh: "施工合同、EPC 合同与咨询服务合同",
      },
      {
        vi: "Rà soát pháp lý dự án: quyền sử dụng đất, quy hoạch và các giấy phép liên quan",
        en: "Project legal review: land use rights, planning status and the relevant permits",
        zh: "项目法律审查：土地使用权、规划状况及相关许可",
      },
      {
        vi: "Cơ chế phát sinh khối lượng, gia hạn tiến độ và điều chỉnh giá hợp đồng",
        en: "Mechanisms for variations, extensions of time and adjustment of the contract price",
        zh: "工程量变更、工期顺延与合同价格调整机制",
      },
      {
        vi: "Bảo lãnh tạm ứng, bảo lãnh thực hiện hợp đồng và nghĩa vụ bảo hành công trình",
        en: "Advance payment and performance bonds, and defects liability obligations",
        zh: "预付款保函、履约保函与工程保修义务",
      },
      {
        vi: "Hồ sơ nghiệm thu, thanh toán theo giai đoạn và quyết toán hợp đồng",
        en: "Acceptance records, interim payment applications and final account settlement",
        zh: "验收资料、分期付款与合同结算",
      },
      {
        vi: "Khiếu nại, yêu cầu bồi thường và tranh chấp phát sinh trong quá trình thực hiện",
        en: "Claims, compensation demands and disputes arising during performance",
        zh: "履约过程中的索赔、赔偿请求与争议",
      },
    ],
    process: [
      {
        heading: {
          vi: "Dựng lại bức tranh pháp lý của dự án",
          en: "Establish the project's legal picture",
          zh: "还原项目的法律全貌",
        },
        description: {
          vi: "Trước hợp đồng là nền pháp lý của dự án: đất đai, quy hoạch, các chấp thuận và giấy phép theo quy định hiện hành. Bước này xác định những gì đã có, những gì còn thiếu và điều đó ảnh hưởng thế nào đến tiến độ dự kiến.",
          en: "Before the contract comes the project's legal foundation: land, planning, and the approvals and permits required under prevailing regulations. This step establishes what is in place, what is missing, and how that bears on the intended programme.",
          zh: "合同之前是项目的法律基础：土地、规划，以及现行规定要求的各项批准与许可。这一步确认哪些已经具备、哪些尚缺，以及由此对预定进度的影响。",
        },
      },
      {
        heading: {
          vi: "Rà soát hợp đồng theo dòng thời gian thi công",
          en: "Review the contract along the construction timeline",
          zh: "沿施工时间线审查合同",
        },
        description: {
          vi: "Bộ hợp đồng được đọc theo trình tự công việc thực tế sẽ diễn ra, từ khởi công đến bàn giao và bảo hành. Cách đọc này cho thấy rõ hơn điểm nào chưa quy định, điểm nào mâu thuẫn giữa hợp đồng chính và các phụ lục kỹ thuật.",
          en: "The contract suite is read in the order the work will actually unfold, from commencement through handover to the defects period. Read this way, gaps and inconsistencies between the main contract and the technical annexes become far easier to see.",
          zh: "合同体系按工作实际展开的顺序阅读，从开工到交付再到保修期。以这种方式阅读，主合同与技术附件之间的空白与矛盾更容易显现。",
        },
      },
      {
        heading: {
          vi: "Thiết lập cơ chế ghi nhận và lưu hồ sơ",
          en: "Set up the recording and record-keeping routine",
          zh: "建立记录与资料留存机制",
        },
        description: {
          vi: "Phần lớn tranh chấp xây dựng được quyết định bởi hồ sơ hiện trường chứ không bởi lập luận sau này. Chúng tôi thống nhất với bạn loại văn bản cần lập, thời điểm lập và cách lưu giữ, để mỗi phát sinh đều có dấu vết theo đúng cơ chế của hợp đồng.",
          en: "Most construction disputes turn on the site record rather than on arguments made afterwards. We agree with you which documents to issue, when to issue them and how to keep them, so that every variation leaves a trail that follows the contract's own mechanism.",
          zh: "多数建设争议取决于现场资料，而非事后的论辩。我们与您约定需要出具哪些文件、何时出具、如何保存，使每一项变更都按合同自身机制留下记录。",
        },
      },
      {
        heading: {
          vi: "Đồng hành khi phát sinh khiếu nại",
          en: "Support when a claim arises",
          zh: "索赔发生时的支持",
        },
        description: {
          vi: "Khi có khiếu nại về khối lượng, tiến độ hoặc thanh toán, công việc bắt đầu bằng việc đối chiếu hồ sơ với các bước mà hợp đồng yêu cầu. Bạn nhận đánh giá về vị thế của mình và các hướng xử lý, kèm phạm vi công việc và phí được xác định bằng văn bản trước khi bắt đầu.",
          en: "When a claim arises over quantities, programme or payment, the work begins by testing the records against the steps the contract requires. You receive an assessment of your position and the available directions, with the scope of work and the fee set out in writing before work starts.",
          zh: "当就工程量、工期或付款产生索赔时，工作从对照合同要求的步骤核查资料开始。您将获得对自身处境与可行方向的评估，工作范围与费用在开始前以书面形式确定。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Nên đưa luật sư vào ở giai đoạn nào của dự án?",
          en: "At what stage should a lawyer be brought in?",
          zh: "应在项目的哪个阶段引入律师？",
        },
        answer: {
          vi: "Thời điểm hữu ích nhất là trước khi ký hợp đồng, khi các cơ chế xử lý phát sinh và điều kiện thanh toán còn có thể đàm phán. Sau khi công trường đã khởi động, phạm vi công việc chuyển sang hướng khác: đọc lại hợp đồng đang có, kiểm tra hồ sơ hiện trường và xác định các bước còn kịp thực hiện. Cả hai giai đoạn đều làm được, chỉ khác nhau ở mức độ lựa chọn còn lại.",
          en: "The most useful point is before signature, while the variation mechanism and payment conditions can still be negotiated. Once the site is running, the work shifts: rereading the contract as it stands, checking the site record and identifying the steps that can still be taken in time. Both stages are workable; what differs is how many options remain.",
          zh: "最有价值的时点是在签约之前，此时变更机制与付款条件尚可谈判。工地启动之后，工作重心随之转变：重读既有合同、核查现场资料、确定仍来得及采取的步骤。两个阶段都可以介入，区别在于剩余选择的多寡。",
        },
      },
      {
        question: {
          vi: "Công ty có đánh giá về kỹ thuật hay khối lượng không?",
          en: "Does the firm assess technical or quantity questions?",
          zh: "贵所是否评估技术或工程量问题？",
        },
        answer: {
          vi: "Không. Đánh giá kỹ thuật, đo bóc khối lượng và định giá xây dựng thuộc chuyên môn của đơn vị tư vấn và đơn vị thẩm định, không thuộc phạm vi dịch vụ pháp lý. Vai trò của chúng tôi là làm việc trên kết quả do các đơn vị đó lập: kiểm tra xem hồ sơ có được lập đúng trình tự hợp đồng yêu cầu hay không và trình bày vấn đề theo đúng cơ chế đã thỏa thuận. Khi cần, chúng tôi phối hợp với đơn vị chuyên môn mà bạn chỉ định.",
          en: "No. Technical assessment, quantity take-off and construction valuation belong to consultants and appraisers, not to legal services. Our role is to work from what those specialists produce: to check whether the records were prepared through the steps the contract requires, and to present the issue through the agreed mechanism. Where needed, we coordinate with the specialist you appoint.",
          zh: "不评估。技术评定、工程量计算与造价评估属于咨询单位与评估机构的专业范围，不属于法律服务。我们的作用是在这些专业成果的基础上工作：核查资料是否按合同要求的步骤形成，并按约定机制提出问题。必要时，我们与您指定的专业单位配合。",
        },
      },
      {
        question: {
          vi: "Trong quá trình thi công cần giữ những hồ sơ nào?",
          en: "Which records should be kept during construction?",
          zh: "施工期间需要保存哪些资料？",
        },
        answer: {
          vi: "Danh mục cụ thể phụ thuộc vào từng hợp đồng, vì chính hợp đồng quy định loại văn bản nào có giá trị và phải lập theo cách nào. Nhìn chung, những gì ghi lại diễn biến theo thời gian đều đáng giữ: nhật ký công trường, biên bản hiện trường, văn bản trao đổi giữa các bên, chỉ dẫn thay đổi và hồ sơ nghiệm thu từng giai đoạn. Khi bắt đầu công việc, chúng tôi lập danh mục riêng cho dự án của bạn dựa trên hợp đồng đang áp dụng.",
          en: "The exact list depends on the contract, since the contract itself sets out which documents carry weight and how they must be issued. Broadly, anything that records events as they happen is worth keeping: site diaries, site minutes, correspondence between the parties, change instructions and stage acceptance records. At the outset of an engagement we prepare a list specific to your project, based on the contract actually in use.",
          zh: "具体清单取决于各份合同，因为合同本身规定了哪些文件具有效力、须以何种方式形成。总体而言，凡按时间记录事件经过的资料都值得保存：施工日志、现场记录、各方往来函件、变更指令与各阶段验收资料。工作开始时，我们会依据实际适用的合同，为您的项目编制专门清单。",
        },
      },
      {
        question: {
          vi: "Hai bên bất đồng về giá trị quyết toán thì xử lý thế nào?",
          en: "What happens when the parties disagree on the final account?",
          zh: "双方对结算金额存在分歧时如何处理？",
        },
        answer: {
          vi: "Bước đầu là tách phần đã thống nhất khỏi phần còn tranh chấp, rồi đối chiếu từng khoản chênh lệch với hồ sơ và với cơ chế mà hợp đồng quy định. Nhiều bất đồng thu hẹp đáng kể sau bước này, vì nguyên nhân thường nằm ở cách lập hồ sơ chứ không ở bản thân con số. Phần còn lại được cân nhắc giữa thương lượng, hòa giải và các phương thức giải quyết tranh chấp mà hợp đồng đã chọn. Chúng tôi trình bày chi phí và thời gian dự kiến của từng hướng, không cam kết về kết quả.",
          en: "The first step is to separate what is agreed from what is in dispute, then test each difference against the records and against the mechanism the contract lays down. Many disagreements narrow considerably after this, because the cause often lies in how the records were made rather than in the figures themselves. What remains is weighed between negotiation, mediation and the dispute route the contract has chosen. We set out the likely cost and timeline of each direction, without promising an outcome.",
          zh: "第一步是把已达成一致的部分与仍有争议的部分区分开，再逐项将差额与资料及合同规定的机制相对照。经过这一步，许多分歧会明显收窄，因为原因往往在于资料的形成方式而非数字本身。剩余部分则在协商、调解与合同已选定的争议解决方式之间权衡。我们会说明每种方向的预计费用与时间，但不对结果作出承诺。",
        },
      },
    ],
    seoDescription: {
      vi: "Hỗ trợ pháp lý về xây dựng và hạ tầng: hợp đồng thi công và EPC, giấy phép dự án, phát sinh khối lượng, nghiệm thu, quyết toán và khiếu nại.",
      en: "Construction and infrastructure law in Vietnam: works and EPC contracts, project permits, variations, acceptance, final accounts and claims.",
      zh: "建设与基础设施法律支持：施工与 EPC 合同、项目许可、工程量变更、验收结算与索赔。",
    },
  },
];
