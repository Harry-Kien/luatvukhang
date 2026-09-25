/**
 * Nội dung dự thảo cho tám nhóm dịch vụ, ba ngôn ngữ.
 *
 * Tám nhóm và danh sách dịch vụ trong ô "Phạm vi hỗ trợ" lấy theo danh mục sản
 * phẩm của công ty (Danh mục sản phẩm kinh doanh, 24/09/2026). Chỉ lấy tên dịch
 * vụ — bảng giá trong danh mục là khung giá nội bộ, không đưa lên website.
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
      vi: "Doanh nghiệp & thương mại",
      en: "Corporate & commercial",
      zh: "企业与商事",
    },
    summary: {
      vi: "Từ lúc thành lập đến những hợp đồng hằng ngày và cả khi chấm dứt hoạt động: thủ tục đúng trình tự, hợp đồng rõ quyền và nghĩa vụ, và cách xử lý khi đối tác hay thành viên không giữ cam kết.",
      en: "From incorporation through everyday contracts to winding up: procedures in the right order, contracts that make rights and obligations clear, and a way forward when a counterparty or co-owner does not keep their commitments.",
      zh: "从设立、日常合同到终止经营：依序完成的手续、权利义务清晰的合同，以及当合作方或股东未履行承诺时的应对之道。",
    },
    audience: {
      vi: "Nhà đầu tư đang cân nhắc vào thị trường Việt Nam, doanh nghiệp chuẩn bị thành lập hoặc tái cơ cấu, và bộ phận pháp chế cần rà soát lại nền tảng quản trị hiện có.",
      en: "Investors considering the Vietnamese market, businesses preparing to incorporate or restructure, and in-house teams reviewing the governance foundations already in place.",
      zh: "正在考虑进入越南市场的投资者、准备设立或重组的企业，以及需要重新审视既有治理基础的法务部门。",
    },
    scope: [
      {
        vi: "Thành lập doanh nghiệp",
        en: "Incorporating a company",
        zh: "设立企业",
      },
      {
        vi: "Thay đổi nội dung đăng ký doanh nghiệp",
        en: "Amending company registration details",
        zh: "变更企业登记事项",
      },
      {
        vi: "Soạn hợp đồng thương mại",
        en: "Drafting commercial contracts",
        zh: "起草商事合同",
      },
      {
        vi: "Rà soát hợp đồng trước khi ký",
        en: "Reviewing contracts before signing",
        zh: "签约前审查合同",
      },
      {
        vi: "Thu hồi công nợ doanh nghiệp",
        en: "Recovering business debts",
        zh: "追收企业欠款",
      },
      {
        vi: "Giải quyết tranh chấp thương mại",
        en: "Resolving commercial disputes",
        zh: "解决商事纠纷",
      },
      {
        vi: "Tranh chấp giữa thành viên, cổ đông",
        en: "Disputes between members and shareholders",
        zh: "股东、成员之间的纠纷",
      },
      {
        vi: "Giải thể doanh nghiệp",
        en: "Dissolving a company",
        zh: "解散企业",
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
      vi: "Luật sư doanh nghiệp và thương mại: thành lập, thay đổi đăng ký, soạn và rà soát hợp đồng, thu hồi công nợ, tranh chấp thương mại và cổ đông, giải thể.",
      en: "Corporate and commercial lawyers in Vietnam: incorporation, registration changes, contract drafting and review, debt recovery, commercial and shareholder disputes, dissolution.",
      zh: "越南企业与商事律师：设立企业、变更登记、起草与审查合同、追收欠款、商事与股东纠纷、解散。",
    },
  },
  {
    slug: "giai-quyet-tranh-chap",
    title: {
      vi: "Dân sự & tranh chấp",
      en: "Civil matters & disputes",
      zh: "民事与纠纷",
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
        vi: "Tư vấn vụ việc dân sự",
        en: "Advice on civil matters",
        zh: "民事事务咨询",
      },
      {
        vi: "Tranh chấp hợp đồng",
        en: "Contract disputes",
        zh: "合同纠纷",
      },
      {
        vi: "Đòi nợ và tranh chấp vay mượn",
        en: "Debt claims and loan disputes",
        zh: "追讨欠款与借贷纠纷",
      },
      {
        vi: "Tranh chấp tài sản",
        en: "Property disputes",
        zh: "财产纠纷",
      },
      {
        vi: "Tranh chấp thừa kế",
        en: "Inheritance disputes",
        zh: "继承纠纷",
      },
      {
        vi: "Yêu cầu bồi thường thiệt hại",
        en: "Claims for compensation",
        zh: "损害赔偿请求",
      },
      {
        vi: "Đại diện thương lượng, hòa giải",
        en: "Representation in negotiation and mediation",
        zh: "代理协商与调解",
      },
      {
        vi: "Thi hành án dân sự",
        en: "Enforcement of civil judgments",
        zh: "民事判决执行",
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
      vi: "Luật sư dân sự và tranh chấp: tranh chấp hợp đồng, đòi nợ, tài sản, thừa kế, bồi thường thiệt hại, thương lượng và hòa giải, thi hành án dân sự.",
      en: "Civil and dispute lawyers in Vietnam: contract disputes, debt claims, property, inheritance, compensation, negotiation and mediation, enforcement of judgments.",
      zh: "越南民事与纠纷律师：合同纠纷、追讨欠款、财产、继承、损害赔偿、协商与调解、民事判决执行。",
    },
  },
  {
    slug: "lao-dong-nhan-su",
    title: {
      vi: "Lao động & quản trị nội bộ",
      en: "Employment & internal governance",
      zh: "劳动与内部治理",
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
        vi: "Soạn hợp đồng lao động",
        en: "Drafting employment contracts",
        zh: "起草劳动合同",
      },
      {
        vi: "Xây dựng nội quy lao động",
        en: "Preparing workplace rules",
        zh: "制定劳动规章",
      },
      {
        vi: "Bộ quy chế quản trị nội bộ cho doanh nghiệp vừa và nhỏ",
        en: "Internal governance regulations for small and medium-sized businesses",
        zh: "为中小企业制定内部管理制度",
      },
      {
        vi: "Xử lý kỷ luật và chấm dứt hợp đồng lao động đúng trình tự",
        en: "Handling discipline and termination of employment in the correct order",
        zh: "依法定程序处理纪律处分与解除劳动合同",
      },
      {
        vi: "Tranh chấp lao động, cho người lao động hoặc doanh nghiệp",
        en: "Employment disputes, for employees or employers",
        zh: "劳动争议（代表劳动者或企业）",
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
      vi: "Luật sư lao động và quản trị nội bộ: hợp đồng lao động, nội quy, quy chế quản trị, kỷ luật và chấm dứt hợp đồng, tranh chấp lao động.",
      en: "Employment and governance lawyers in Vietnam: employment contracts, workplace rules, internal regulations, discipline and termination, employment disputes.",
      zh: "越南劳动与内部治理律师：劳动合同、劳动规章、内部管理制度、纪律处分与解除合同、劳动争议。",
    },
  },
  {
    slug: "dat-dai-bat-dong-san",
    title: {
      vi: "Đất đai & nhà ở",
      en: "Land & housing",
      zh: "土地与住房",
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
        vi: "Tư vấn tranh chấp đất đai",
        en: "Advice on land disputes",
        zh: "土地纠纷咨询",
      },
      {
        vi: "Tranh chấp quyền sử dụng đất",
        en: "Disputes over land use rights",
        zh: "土地使用权纠纷",
      },
      {
        vi: "Tranh chấp ranh giới, lối đi",
        en: "Boundary and right-of-way disputes",
        zh: "地界与通行纠纷",
      },
      {
        vi: "Tranh chấp hợp đồng chuyển nhượng bất động sản",
        en: "Disputes over real estate transfer contracts",
        zh: "不动产转让合同纠纷",
      },
      {
        vi: "Tranh chấp thừa kế nhà đất",
        en: "Inheritance disputes over land and houses",
        zh: "房地产继承纠纷",
      },
      {
        vi: "Sang tên, chuyển nhượng, tặng cho",
        en: "Title transfer, sale and gift of property",
        zh: "过户、转让与赠与",
      },
      {
        vi: "Hồ sơ cấp, đính chính Giấy chứng nhận",
        en: "Applications to issue or correct a land use right certificate",
        zh: "申请颁发或更正土地使用权证",
      },
      {
        vi: "Khiếu nại về thu hồi đất, bồi thường",
        en: "Complaints about land recovery and compensation",
        zh: "就土地征收与补偿提出申诉",
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
      vi: "Luật sư đất đai và nhà ở: tranh chấp quyền sử dụng đất, ranh giới, chuyển nhượng, thừa kế nhà đất, sang tên, cấp và đính chính sổ, khiếu nại thu hồi đất.",
      en: "Land and housing lawyers in Vietnam: land use right disputes, boundaries, transfers, inherited property, title transfer, certificates, land recovery complaints.",
      zh: "越南土地与住房律师：土地使用权纠纷、地界、转让、房地产继承、过户、颁证与更正、征地申诉。",
    },
  },
  {
    slug: "hon-nhan-gia-dinh",
    title: {
      vi: "Hôn nhân & gia đình",
      en: "Marriage & family",
      zh: "婚姻家庭",
    },
    summary: {
      vi: "Hỗ trợ pháp lý cho những việc khó nói trong gia đình: chấm dứt hôn nhân, sắp xếp cho con, cấp dưỡng và phân chia tài sản của vợ chồng.",
      en: "Legal support for the hardest conversations within a family: ending a marriage, arrangements for children, maintenance, and dividing marital property.",
      zh: "为家庭中最难开口的事务提供法律支持：终止婚姻、子女安排、抚养费以及夫妻财产分割。",
    },
    audience: {
      vi: "Người đang cân nhắc thỏa thuận tài sản trước hoặc trong thời kỳ hôn nhân, người chuẩn bị hoặc đang trong quá trình ly hôn, và gia đình cần sắp xếp việc thừa kế hoặc thực hiện thủ tục sau khi có người thân qua đời.",
      en: "People considering a property agreement before or during a marriage, those preparing for or going through a divorce, and families arranging an inheritance or completing procedures after a relative has died.",
      zh: "考虑在婚前或婚姻存续期间订立财产协议的人、准备离婚或正在办理离婚的人，以及需要安排继承或在亲属过世后办理手续的家庭。",
    },
    scope: [
      {
        vi: "Ly hôn thuận tình",
        en: "Divorce by mutual consent",
        zh: "协议离婚",
      },
      {
        vi: "Ly hôn theo yêu cầu của một bên",
        en: "Divorce at the request of one spouse",
        zh: "一方起诉离婚",
      },
      {
        vi: "Ly hôn có yếu tố nước ngoài",
        en: "Divorce involving a foreign element",
        zh: "涉外离婚",
      },
      {
        vi: "Tranh chấp quyền nuôi con",
        en: "Disputes over custody of children",
        zh: "子女抚养权纠纷",
      },
      {
        vi: "Tranh chấp cấp dưỡng",
        en: "Maintenance disputes",
        zh: "抚养费纠纷",
      },
      {
        vi: "Tranh chấp tài sản khi ly hôn",
        en: "Property disputes on divorce",
        zh: "离婚财产纠纷",
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
      vi: "Luật sư hôn nhân và gia đình: ly hôn thuận tình, ly hôn đơn phương, ly hôn có yếu tố nước ngoài, quyền nuôi con, cấp dưỡng, chia tài sản khi ly hôn.",
      en: "Marriage and family lawyers in Vietnam: consensual and contested divorce, divorce with a foreign element, child custody, maintenance, property on divorce.",
      zh: "越南婚姻家庭律师：协议离婚、诉讼离婚、涉外离婚、子女抚养权、抚养费、离婚财产分割。",
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
        vi: "Tư vấn ban đầu vụ việc hình sự",
        en: "Initial advice on a criminal matter",
        zh: "刑事案件初步咨询",
      },
      {
        vi: "Luật sư tham gia từ giai đoạn tạm giữ",
        en: "A lawyer present from the time of temporary detention",
        zh: "自临时羁押阶段起律师介入",
      },
      {
        vi: "Bào chữa trong giai đoạn điều tra",
        en: "Defence during the investigation stage",
        zh: "侦查阶段辩护",
      },
      {
        vi: "Bào chữa trong giai đoạn truy tố",
        en: "Defence during the prosecution stage",
        zh: "审查起诉阶段辩护",
      },
      {
        vi: "Bào chữa tại phiên tòa sơ thẩm",
        en: "Defence at first-instance trial",
        zh: "一审辩护",
      },
      {
        vi: "Bào chữa tại phiên tòa phúc thẩm",
        en: "Defence on appeal",
        zh: "二审辩护",
      },
      {
        vi: "Bảo vệ quyền lợi người bị hại",
        en: "Protecting the interests of victims",
        zh: "维护被害人权益",
      },
      {
        vi: "Soạn đơn tố giác, kiến nghị, khiếu nại",
        en: "Drafting crime reports, petitions and complaints",
        zh: "起草举报信、建议书与申诉书",
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
    slug: "san-pham-phap-ly-tieu-chuan",
    title: {
      vi: "Sản phẩm pháp lý tiêu chuẩn",
      en: "Standard legal products",
      zh: "标准化法律产品",
    },
    summary: {
      vi: "Những việc pháp lý có khuôn khổ rõ ràng, được làm theo phạm vi xác định trước: soạn một lá đơn đúng hình thức, bộ mẫu đơn và mẫu hợp đồng dùng lại được, hoặc để luật sư xem qua hồ sơ trước khi bạn quyết định bước tiếp theo.",
      en: "Legal work with a clear shape, done to a scope fixed in advance: a correctly formed application, reusable sets of forms and contract templates, or a lawyer's look at your documents before you decide what to do next.",
      zh: "范围清晰、事先确定的法律工作：一份格式正确的申请书、可重复使用的文书与合同范本，或在您决定下一步之前请律师先看一看材料。",
    },
    audience: {
      vi: "Cá nhân và doanh nghiệp nhỏ cần một văn bản đúng hình thức cho một việc cụ thể, người bán hàng trên sàn thương mại điện tử, và những ai muốn biết hồ sơ của mình đang ở đâu trước khi thuê dịch vụ đầy đủ.",
      en: "Individuals and small businesses who need a properly formed document for a specific purpose, sellers on e-commerce platforms, and anyone who wants to know where their papers stand before engaging a full service.",
      zh: "需要为具体事项准备格式正确文书的个人与小企业、电商平台卖家，以及希望在委托完整服务前先了解自身材料状况的人。",
    },
    scope: [
      {
        vi: "Soạn đơn pháp lý theo yêu cầu",
        en: "Drafting legal applications on request",
        zh: "按需起草法律文书",
      },
      {
        vi: "Bộ mẫu đơn pháp lý thông dụng",
        en: "Sets of common legal application forms",
        zh: "常用法律文书范本",
      },
      {
        vi: "Bộ mẫu hợp đồng cho cá nhân và doanh nghiệp",
        en: "Contract templates for individuals and businesses",
        zh: "个人与企业合同范本",
      },
      {
        vi: "Kiểm tra hồ sơ pháp lý trực tuyến",
        en: "Online review of legal documents",
        zh: "在线法律材料审查",
      },
      {
        vi: "Mẫu đơn dùng trên sàn thương mại điện tử",
        en: "Forms for use on e-commerce platforms",
        zh: "电商平台适用文书范本",
      },
    ],
    process: [
      {
        heading: {
          vi: "Cho biết việc bạn cần",
          en: "Tell us what you need",
          zh: "说明您的需求",
        },
        description: {
          vi: "Một vài dòng mô tả là đủ: văn bản dùng để làm gì, gửi cho ai, và mốc thời gian nếu có. Từ đó chúng tôi xác định đây là việc làm được theo khuôn khổ tiêu chuẩn hay cần một dịch vụ đầy đủ hơn.",
          en: "A few lines are enough: what the document is for, who it goes to, and any deadline. From that we can tell whether the job fits a standard format or needs a fuller service.",
          zh: "几句话即可：文书用途、提交对象，以及是否有时间节点。据此我们判断该事项适合标准化处理，还是需要更完整的服务。",
        },
      },
      {
        heading: {
          vi: "Thống nhất phạm vi trước khi làm",
          en: "Agree the scope before work starts",
          zh: "开始前确认范围",
        },
        description: {
          vi: "Bạn được báo rõ sẽ nhận được gì, khi nào bàn giao và phí bao nhiêu trước khi công việc bắt đầu. Không có khoản phát sinh ngoài phạm vi đã thống nhất.",
          en: "Before anything starts you are told exactly what you will receive, when it will be delivered and what it costs. Nothing is added outside the agreed scope.",
          zh: "开始前会明确告知您将获得什么、何时交付及费用多少。不会在约定范围之外另行增加。",
        },
      },
      {
        heading: {
          vi: "Soạn hoặc kiểm tra",
          en: "Draft or review",
          zh: "起草或审查",
        },
        description: {
          vi: "Văn bản được soạn theo đúng tình huống của bạn, hoặc hồ sơ được đối chiếu để chỉ ra điểm còn thiếu và điểm có rủi ro. Tài liệu được trao đổi qua kênh riêng, không qua biểu mẫu trên website.",
          en: "The document is drafted for your actual situation, or your papers are checked to point out what is missing and what carries risk. Documents are exchanged through a private channel, not the website form.",
          zh: "根据您的具体情况起草文书，或核对材料并指出缺漏与风险之处。材料通过专门渠道传递，而非网站表单。",
        },
      },
      {
        heading: {
          vi: "Bàn giao và giải thích cách dùng",
          en: "Hand over and explain how to use it",
          zh: "交付并说明使用方法",
        },
        description: {
          vi: "Bạn nhận văn bản kèm hướng dẫn điền, nộp hoặc gửi. Nếu trong lúc làm phát hiện vấn đề vượt quá một văn bản tiêu chuẩn, chúng tôi nói rõ để bạn cân nhắc.",
          en: "You receive the document with guidance on completing, filing or sending it. If the work reveals an issue beyond what a standard document can handle, we tell you so you can decide.",
          zh: "您将收到文书及填写、提交或寄送的说明。若过程中发现超出标准文书所能处理的问题，我们会如实告知供您考虑。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Dùng mẫu có thay được việc gặp luật sư không?",
          en: "Can a template replace seeing a lawyer?",
          zh: "使用范本能否代替咨询律师？",
        },
        answer: {
          vi: "Với những tình huống phổ biến và rõ ràng thì mẫu là đủ. Khi đã có tranh chấp, số tiền lớn hoặc có điểm bất thường trong hồ sơ, một mẫu chung không thay được việc luật sư xem xét tình huống cụ thể của bạn.",
          en: "For common, straightforward situations a template is enough. Where there is already a dispute, a large sum at stake or something unusual in the papers, a general template cannot replace a lawyer looking at your particular situation.",
          zh: "对于常见且清晰的情形，范本即已足够。若已发生争议、涉及金额较大或材料中有异常之处，通用范本无法替代律师针对您具体情况的审视。",
        },
      },
      {
        question: {
          vi: "Kiểm tra hồ sơ trực tuyến gồm những gì?",
          en: "What does an online document review involve?",
          zh: "在线材料审查包括哪些内容？",
        },
        answer: {
          vi: "Luật sư xem các tài liệu bạn gửi qua kênh riêng, chỉ ra điểm còn thiếu, điểm có rủi ro và bước nên làm tiếp theo. Đây là nhận xét trên những gì bạn cung cấp, chưa phải ý kiến pháp lý chính thức về toàn bộ vụ việc.",
          en: "A lawyer reads the documents you send through a private channel and points out what is missing, what carries risk and what to do next. It is a comment on what you have provided, not a formal legal opinion on the whole matter.",
          zh: "律师阅读您通过专门渠道发送的材料，指出缺漏、风险及建议的下一步。这是针对您所提供材料的意见，并非对整个事项的正式法律意见。",
        },
      },
      {
        question: {
          vi: "Phí được tính thế nào?",
          en: "How are fees worked out?",
          zh: "费用如何计算？",
        },
        answer: {
          vi: "Mỗi sản phẩm có phạm vi xác định, nên phí được báo trước khi làm. Nếu yêu cầu của bạn vượt ra ngoài phạm vi đó, chúng tôi trao đổi lại trước khi tiếp tục.",
          en: "Each product has a defined scope, so the fee is quoted before work begins. If your request goes beyond that scope, we discuss it with you before going further.",
          zh: "每项产品都有明确范围，因此会在开始前报价。若您的需求超出该范围，我们会先与您沟通再继续。",
        },
      },
    ],
    seoDescription: {
      vi: "Sản phẩm pháp lý tiêu chuẩn: soạn đơn theo yêu cầu, bộ mẫu đơn và mẫu hợp đồng, kiểm tra hồ sơ pháp lý trực tuyến, mẫu đơn cho sàn thương mại điện tử.",
      en: "Standard legal products in Vietnam: applications drafted on request, form and contract template sets, online document review, e-commerce platform forms.",
      zh: "标准化法律产品：按需起草文书、文书与合同范本、在线材料审查、电商平台文书范本。",
    },
  },
  {
    slug: "luat-su-rieng-tu-van-dinh-ky",
    title: {
      vi: "Luật sư riêng & tư vấn định kỳ",
      en: "Retained counsel",
      zh: "常年法律顾问",
    },
    summary: {
      vi: "Một luật sư theo sát công việc của gia đình hoặc doanh nghiệp theo hợp đồng định kỳ, để câu hỏi pháp lý được trả lời khi vừa xuất hiện, trước khi nó trở thành tranh chấp.",
      en: "A lawyer who follows the affairs of a family or a business under a standing engagement, so legal questions are answered as they arise, before they turn into disputes.",
      zh: "由律师依据常年委托持续跟进家庭或企业事务，让法律问题在出现之初即获解答，而不是等到演变成纠纷。",
    },
    audience: {
      vi: "Gia đình có nhu cầu pháp lý thường xuyên, doanh nghiệp vừa và nhỏ chưa có bộ phận pháp chế riêng, và chủ doanh nghiệp cần một người cố vấn cho cả quyết định kinh doanh lẫn việc riêng.",
      en: "Families with recurring legal needs, small and medium-sized businesses without their own legal department, and business owners who want an adviser for both business decisions and personal affairs.",
      zh: "有经常性法律需求的家庭、尚未设立法务部门的中小企业，以及希望在经营决策与个人事务上都有顾问的企业主。",
    },
    scope: [
      {
        vi: "Luật sư gia đình",
        en: "Family lawyer",
        zh: "家庭律师",
      },
      {
        vi: "Luật sư riêng cho doanh nghiệp, gói Basic",
        en: "Retained lawyer for businesses, Basic package",
        zh: "企业常年律师（基础套餐）",
      },
      {
        vi: "Luật sư riêng cho doanh nghiệp, gói Pro",
        en: "Retained lawyer for businesses, Pro package",
        zh: "企业常年律师（专业套餐）",
      },
      {
        vi: "Luật sư riêng cho doanh nghiệp, gói Premium",
        en: "Retained lawyer for businesses, Premium package",
        zh: "企业常年律师（高级套餐）",
      },
      {
        vi: "Cố vấn pháp lý cho chủ doanh nghiệp",
        en: "Legal adviser to business owners",
        zh: "企业主法律顾问",
      },
    ],
    process: [
      {
        heading: {
          vi: "Trao đổi về nhu cầu thực tế",
          en: "Talk through what you actually need",
          zh: "沟通实际需求",
        },
        description: {
          vi: "Loại việc thường phát sinh, tần suất và người sẽ làm việc với luật sư là những điều quyết định gói nào phù hợp. Buổi trao đổi đầu tiên dành để làm rõ những điều đó.",
          en: "The kind of matters that come up, how often, and who will be dealing with the lawyer decide which package fits. The first conversation is for working those out.",
          zh: "常见事务类型、发生频率以及由谁与律师对接，决定了哪种套餐合适。首次沟通即用于厘清这些问题。",
        },
      },
      {
        heading: {
          vi: "Thống nhất phạm vi bằng văn bản",
          en: "Agree the scope in writing",
          zh: "以书面形式确定范围",
        },
        description: {
          vi: "Hợp đồng ghi rõ những việc nằm trong gói, thời hạn phản hồi, người phụ trách và những việc sẽ được báo phí riêng. Không có gì được mặc định ngoài những điều đã ghi.",
          en: "The engagement sets out what the package covers, response times, the responsible lawyer and which matters are quoted separately. Nothing is assumed beyond what is written.",
          zh: "委托合同写明套餐涵盖的事项、回复时限、负责律师以及哪些事项另行报价。书面约定之外不作任何默认。",
        },
      },
      {
        heading: {
          vi: "Làm việc theo kỳ",
          en: "Work through the term",
          zh: "按期开展工作",
        },
        description: {
          vi: "Bạn liên hệ luật sư khi có việc, thay vì phải tìm người mới cho từng câu hỏi. Luật sư nắm bối cảnh của bạn nên câu trả lời sát thực tế hơn.",
          en: "You contact your lawyer when something comes up, instead of finding someone new for each question. Because the lawyer knows your background, the answers fit your situation better.",
          zh: "有事时直接联系您的律师，而不必为每个问题另找他人。律师了解您的背景，因而答复更贴近实际。",
        },
      },
      {
        heading: {
          vi: "Rà soát lại cuối kỳ",
          en: "Review at the end of the term",
          zh: "期末回顾",
        },
        description: {
          vi: "Cuối mỗi kỳ, hai bên nhìn lại những việc đã phát sinh để điều chỉnh phạm vi cho kỳ tiếp theo nếu cần.",
          en: "At the end of each term, both sides look back at what came up and adjust the scope for the next term if needed.",
          zh: "每期结束时，双方回顾期间发生的事务，并视需要调整下一期的范围。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Khác gì so với thuê luật sư theo từng vụ việc?",
          en: "How is this different from hiring a lawyer case by case?",
          zh: "与按案件聘请律师有何不同？",
        },
        answer: {
          vi: "Thuê theo vụ việc phù hợp khi vấn đề đã rõ và có điểm kết thúc. Luật sư riêng phù hợp khi câu hỏi phát sinh thường xuyên và điều quan trọng là có người nắm bối cảnh để trả lời sớm, trước khi chuyện nhỏ thành tranh chấp.",
          en: "Case-by-case engagement suits a matter that is already defined and has an end point. A retained lawyer suits situations where questions come up regularly and what matters is having someone who knows the background and can answer early, before a small issue becomes a dispute.",
          zh: "按案件委托适合问题已明确且有终点的情形。常年律师适合问题经常出现、且关键在于有了解背景的人能及早答复，以免小事演变为纠纷的情形。",
        },
      },
      {
        question: {
          vi: "Các gói Basic, Pro và Premium khác nhau thế nào?",
          en: "How do the Basic, Pro and Premium packages differ?",
          zh: "基础、专业与高级套餐有何区别？",
        },
        answer: {
          vi: "Các gói khác nhau về khối lượng công việc và mức độ tham gia của luật sư trong kỳ. Phạm vi cụ thể của từng gói được trao đổi và ghi trong hợp đồng, dựa trên nhu cầu thực tế của doanh nghiệp.",
          en: "The packages differ in the volume of work and how closely the lawyer is involved during the term. The exact scope of each is discussed and written into the engagement, based on what the business actually needs.",
          zh: "各套餐在工作量与律师参与程度上有所不同。每个套餐的具体范围会根据企业实际需求商定，并写入委托合同。",
        },
      },
    ],
    seoDescription: {
      vi: "Luật sư riêng và tư vấn pháp lý định kỳ: luật sư gia đình, luật sư riêng cho doanh nghiệp các gói Basic, Pro, Premium, cố vấn pháp lý cho chủ doanh nghiệp.",
      en: "Retained counsel in Vietnam: family lawyer, retained lawyer for businesses on Basic, Pro and Premium packages, legal adviser to business owners.",
      zh: "常年法律顾问：家庭律师、企业常年律师（基础、专业、高级套餐）、企业主法律顾问。",
    },
  },
];

/**
 * Lĩnh vực đã ngừng vì không có trong danh mục của công ty, kèm nhóm gần nhất
 * để chuyển hướng đường dẫn cũ. scripts/apply-company-catalog.ts gỡ chúng khỏi
 * website; scripts/publish-drafts.ts bỏ qua chúng để không vô tình đăng lại.
 */
export const retiredPracticeAreas: Record<string, string> = {
  "hop-dong-thuong-mai": "dau-tu-doanh-nghiep",
  "so-huu-tri-tue": "dau-tu-doanh-nghiep",
  "thue-tai-chinh": "dau-tu-doanh-nghiep",
  "hanh-chinh-giay-phep": "dat-dai-bat-dong-san",
  "ngan-hang-tin-dung": "giai-quyet-tranh-chap",
  "xay-dung-ha-tang": "dat-dai-bat-dong-san",
};
