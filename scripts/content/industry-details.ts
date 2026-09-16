/**
 * Phần chiều sâu cho 6 trang Ngành nghề: đối tượng phù hợp, quy trình hỗ trợ
 * và câu hỏi thường gặp — ba ngôn ngữ.
 *
 * Vì sao tách khỏi industries.ts: tệp kia đã nạp xong và 18 bản ghi đang được
 * xuất bản. Phần này bổ sung vào bản ghi có sẵn, chỉ điền ô còn trống.
 *
 * Giữ đúng giới hạn của nội dung dự thảo: mô tả cách làm việc và quy trình,
 * không khẳng định kết quả, không nêu tên khách hàng, không dẫn số liệu. Câu
 * hỏi thường gặp trả lời ở mức quy trình và điều cần chuẩn bị — không phải ý
 * kiến pháp lý cho một vụ việc cụ thể, vì nội dung đó phải do luật sư của công
 * ty soạn và chịu trách nhiệm.
 */
export type Localised = { vi: string; en: string; zh: string };
export type Step = { heading: Localised; description: Localised };
export type Faq = { question: Localised; answer: Localised };
export type IndustryDetail = {
  slug: string;
  audience: Localised;
  process: Step[];
  faq: Faq[];
};

export const industryDetails: IndustryDetail[] = [
  {
    slug: "san-xuat-va-xuat-khau",
    audience: {
      vi: "Doanh nghiệp có nhà máy tại Việt Nam, đơn vị gia công cho đối tác nước ngoài, và nhà xuất khẩu đang chuẩn hóa lại bộ hợp đồng với khách hàng và nhà cung cấp.",
      en: "Businesses operating a plant in Vietnam, processing partners working for foreign principals, and exporters standardising their contract set with customers and suppliers.",
      zh: "在越南设有工厂的企业、为境外客户从事加工的厂商，以及正在规范与客户及供应商合同体系的出口商。",
    },
    process: [
      {
        heading: {
          vi: "Đọc cả chuỗi hợp đồng theo dòng hàng",
          en: "Read the whole contract chain along the goods",
          zh: "沿着货物流向通读整条合同链",
        },
        description: {
          vi: "Một lô hàng đi qua nhiều hợp đồng: mua nguyên liệu, gia công, vận chuyển, bán ra. Chúng tôi đọc cả chuỗi để tìm chỗ nghĩa vụ hoặc rủi ro bị bỏ trống giữa hai hợp đồng.",
          en: "A shipment passes through several contracts: raw materials, processing, carriage, sale. We read the chain as a whole to find where an obligation or a risk falls into the gap between two of them.",
          zh: "一批货物要经过多份合同：原料采购、加工、运输、销售。我们通读整条链条，找出义务或风险在两份合同之间落空的地方。",
        },
      },
      {
        heading: {
          vi: "Chốt điều kiện giao hàng và thanh toán",
          en: "Settle delivery and payment terms",
          zh: "确定交付与付款条件",
        },
        description: {
          vi: "Điều kiện giao hàng, thời điểm chuyển rủi ro, chứng từ thanh toán và cách kiểm hàng được viết rõ trong hợp đồng, để khi có khiếu nại thì căn cứ nằm ở hợp đồng chứ không nằm rải rác trong email.",
          en: "Delivery terms, the moment risk passes, payment documents and inspection arrangements are written into the contract, so that a later claim rests on the contract rather than on scattered emails.",
          zh: "将交付条件、风险转移时点、付款单据与验货安排写入合同，使日后索赔的依据落在合同上，而不是散落在往来邮件中。",
        },
      },
      {
        heading: {
          vi: "Rà soát tuân thủ trước khi mở rộng",
          en: "Review compliance before you expand",
          zh: "在扩产前复核合规事项",
        },
        description: {
          vi: "Trước khi thêm dây chuyền, đổi mặt hàng hay mở thị trường mới, kiểm tra lại giấy phép, điều kiện chuyên ngành và hồ sơ lao động, để việc mở rộng không dừng lại vì thủ tục.",
          en: "Before adding a line, changing the product or opening a new market, we recheck licences, sector conditions and labour records so the expansion is not held up by paperwork.",
          zh: "在增设生产线、变更产品或开拓新市场之前，重新检查许可、行业条件与劳动档案，避免扩张因手续而停滞。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Hợp đồng với đối tác nước ngoài nên chọn luật nước nào?",
          en: "Which governing law should a contract with a foreign partner use?",
          zh: "与境外伙伴签约应选择哪国法律？",
        },
        answer: {
          vi: "Không có câu trả lời chung. Điều cần cân nhắc là tài sản của đối tác nằm ở đâu, khả năng thi hành phán quyết tại nơi đó, và chi phí theo đuổi vụ việc. Chúng tôi phân tích các lựa chọn theo từng giao dịch trước khi bạn quyết định.",
          en: "There is no general answer. What matters is where the counterparty holds assets, whether a judgment or award can be enforced there, and the cost of pursuing the matter. We set out the options for each transaction before you decide.",
          zh: "没有通用答案。需要考量的是对方资产所在地、判决或裁决在当地能否执行，以及追索的成本。我们会针对每笔交易列出各种选择，供您决定。",
        },
      },
      {
        question: {
          vi: "Đối tác khiếu nại chất lượng sau khi đã nhận hàng, chúng tôi cần giữ lại gì?",
          en: "A buyer claims a quality defect after delivery — what should we keep?",
          zh: "买方在收货后提出质量索赔，我们应保留什么？",
        },
        answer: {
          vi: "Giữ nguyên hồ sơ lô hàng theo đúng thứ tự thời gian: hợp đồng, đơn đặt, chứng từ giao nhận, biên bản kiểm hàng, ảnh và toàn bộ trao đổi với đối tác. Thời hạn và thủ tục khiếu nại thường nằm ngay trong hợp đồng, nên đó là chỗ cần xem trước tiên.",
          en: "Keep the shipment file intact and in date order: contract, purchase order, delivery documents, inspection records, photographs and the full exchange with the buyer. The claim deadline and notice procedure are usually in the contract itself, so that is the first place to look.",
          zh: "按时间顺序完整保留该批货物的档案：合同、订单、交接单据、验货记录、照片以及与对方的全部往来。索赔期限与通知程序通常就写在合同中，应先从那里查起。",
        },
      },
      {
        question: {
          vi: "Chúng tôi gia công theo mẫu của khách, quy trình của chúng tôi có được bảo vệ không?",
          en: "We process to the customer design — is our own know-how protected?",
          zh: "我们按客户图纸加工，自有工艺是否受保护？",
        },
        answer: {
          vi: "Quyền đối với bản vẽ, khuôn mẫu và quy trình phụ thuộc vào cách hợp đồng gia công phân định. Hợp đồng im lặng về điểm này thì tranh chấp về sau rất khó xử lý, nên đây là điều khoản cần làm rõ trước đơn hàng đầu tiên.",
          en: "Rights over drawings, moulds and process know-how depend on how the processing contract allocates them. If the contract is silent, a later dispute becomes very hard to resolve, so this is a clause to settle before the first order.",
          zh: "图纸、模具与工艺诀窍的权利归属取决于加工合同如何约定。合同若对此沉默，日后争议将极难处理，因此应在首批订单前明确该条款。",
        },
      },
    ],
  },
  {
    slug: "bat-dong-san-va-xay-dung",
    audience: {
      vi: "Chủ đầu tư và nhà thầu đang triển khai dự án, doanh nghiệp thuê hoặc nhận chuyển nhượng mặt bằng, và cá nhân chuẩn bị giao dịch một bất động sản có giá trị lớn.",
      en: "Developers and contractors running a project, businesses leasing or taking assignment of premises, and individuals preparing a significant property transaction.",
      zh: "正在推进项目的开发商与承包商、承租或受让场地的企业，以及准备进行大额不动产交易的个人。",
    },
    process: [
      {
        heading: {
          vi: "Kiểm tra pháp lý trước khi đặt cọc",
          en: "Check the legal status before any deposit",
          zh: "在支付定金前核查法律状态",
        },
        description: {
          vi: "Tình trạng thửa đất, quy hoạch, thế chấp và tư cách của bên bán được kiểm tra trước, vì sau khi đã đặt cọc thì phần lớn lựa chọn của bạn đã bị thu hẹp.",
          en: "The status of the land, zoning, any mortgage and the seller standing are checked first, because once a deposit is paid most of your options have already narrowed.",
          zh: "先行核查地块状态、规划、抵押情况及出让方资格，因为一旦支付定金，您可选择的余地已大为缩小。",
        },
      },
      {
        heading: {
          vi: "Gắn hợp đồng với tiến độ thật",
          en: "Tie the contract to the real schedule",
          zh: "让合同与实际进度相扣",
        },
        description: {
          vi: "Mốc nghiệm thu, đợt thanh toán, xử lý khối lượng phát sinh và hậu quả của chậm tiến độ được viết theo cách thi công thực tế, không theo mẫu chung.",
          en: "Acceptance milestones, payment stages, treatment of variations and the consequences of delay are written to match how the work is actually carried out, not to a generic template.",
          zh: "验收节点、付款批次、变更工程量的处理以及延误后果，均按实际施工方式书写，而非套用通用范本。",
        },
      },
      {
        heading: {
          vi: "Giữ hồ sơ để dùng được khi cần",
          en: "Keep records that will hold up later",
          zh: "留存日后能用得上的记录",
        },
        description: {
          vi: "Biên bản, nhật ký công trình và văn bản trao đổi được sắp xếp ngay trong quá trình thực hiện. Phần lớn tranh chấp xây dựng được quyết định bằng hồ sơ có sẵn, không bằng lập luận thêm về sau.",
          en: "Minutes, site diaries and correspondence are organised as the work proceeds. Most construction disputes are decided on the records that already exist, not on arguments built afterwards.",
          zh: "在施工过程中同步整理会议纪要、施工日志与往来文件。多数建设工程争议取决于既有记录，而非事后补充的论述。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Trước khi mua hoặc thuê mặt bằng, cần kiểm tra những giấy tờ nào?",
          en: "What documents should we check before buying or leasing premises?",
          zh: "购买或承租场地前应核查哪些文件？",
        },
        answer: {
          vi: "Tối thiểu là giấy chứng nhận quyền sử dụng đất, hồ sơ quy hoạch, tình trạng thế chấp và giấy tờ chứng minh thẩm quyền của người ký. Với nhà xưởng hoặc mặt bằng kinh doanh còn cần kiểm tra công năng sử dụng có phù hợp với hoạt động dự kiến hay không.",
          en: "At minimum the land use right certificate, zoning records, any mortgage, and proof that the signatory has authority. For a factory or commercial unit you also need to check that the permitted use matches the activity you intend to carry on.",
          zh: "至少包括土地使用权证、规划资料、抵押情况，以及签署人具有权限的证明。若为厂房或商业场地，还须核查其许可用途是否与拟开展的经营活动相符。",
        },
      },
      {
        question: {
          vi: "Khối lượng phát sinh ngoài hợp đồng được xử lý thế nào?",
          en: "How are variations outside the contract handled?",
          zh: "合同之外的变更工程量如何处理？",
        },
        answer: {
          vi: "Phụ thuộc vào cơ chế mà hợp đồng đặt ra: ai được yêu cầu, xác nhận bằng hình thức nào và thanh toán theo đơn giá nào. Nếu hợp đồng không có cơ chế này, phần phát sinh thường trở thành tranh chấp, nên đó là điều khoản cần thống nhất từ đầu.",
          en: "It depends on the mechanism the contract sets up: who may instruct a variation, in what form it is confirmed, and at what rates it is paid. Without such a mechanism variations usually become a dispute, so it is a clause to agree at the outset.",
          zh: "取决于合同设定的机制：谁有权指示变更、以何种形式确认、按何种单价结算。缺乏该机制时，变更部分通常演变为争议，因此应在一开始就约定清楚。",
        },
      },
      {
        question: {
          vi: "Bên kia chậm bàn giao, chúng tôi nên làm gì trước?",
          en: "The other side is late in handing over — what comes first?",
          zh: "对方延迟交付，我们应先做什么？",
        },
        answer: {
          vi: "Trước hết xác định hợp đồng quy định thế nào về thời hạn, thông báo và quyền của bên bị chậm. Thông báo đúng hình thức và đúng thời điểm thường là điều kiện để giữ được quyền yêu cầu về sau, nên cần làm sớm chứ không chờ tới khi thương lượng bế tắc.",
          en: "First establish what the contract says about the deadline, notice and the remedies of the affected party. Giving notice in the right form and at the right time is often a condition for preserving your claim, so it should be done early rather than after negotiations stall.",
          zh: "首先确认合同对期限、通知及受影响方权利的约定。以正确形式、在正确时点发出通知，往往是日后保留请求权的前提，因此应尽早进行，而非等到谈判陷入僵局。",
        },
      },
    ],
  },
  {
    slug: "cong-nghe-va-thuong-mai-dien-tu",
    audience: {
      vi: "Công ty phần mềm và đơn vị phát triển theo hợp đồng, sàn và cửa hàng trực tuyến, cùng doanh nghiệp đang xử lý dữ liệu cá nhân của người dùng ở quy mô đáng kể.",
      en: "Software companies and contract development teams, marketplaces and online stores, and businesses processing personal data at meaningful scale.",
      zh: "软件公司与承接开发的团队、电商平台与网店，以及正在较大规模处理用户个人数据的企业。",
    },
    process: [
      {
        heading: {
          vi: "Làm rõ ai sở hữu cái gì",
          en: "Clarify who owns what",
          zh: "厘清各方拥有什么",
        },
        description: {
          vi: "Mã nguồn, tài liệu thiết kế, dữ liệu và thành phần mã nguồn mở đi kèm được phân định ngay trong hợp đồng phát triển, kể cả phần tiếp tục bảo trì sau nghiệm thu.",
          en: "Source code, design materials, data and any open-source components are allocated in the development contract itself, including what happens to maintenance after acceptance.",
          zh: "在开发合同中即明确源代码、设计文档、数据及所含开源组件的归属，包括验收后的维护安排。",
        },
      },
      {
        heading: {
          vi: "Rà soát dòng dữ liệu cá nhân",
          en: "Trace the flow of personal data",
          zh: "梳理个人数据的流向",
        },
        description: {
          vi: "Dữ liệu được thu từ đâu, lưu ở đâu, chuyển cho ai và giữ trong bao lâu. Bản mô tả này là nền để viết chính sách quyền riêng tư đúng với việc thực sự đang làm.",
          en: "Where data is collected, where it is stored, who it is shared with and how long it is kept. That map is the basis for a privacy policy that matches what actually happens.",
          zh: "数据从何处收集、存于何处、共享给谁、保留多久。这份梳理是撰写与实际做法相符的隐私政策的基础。",
        },
      },
      {
        heading: {
          vi: "Viết điều khoản người dùng đọc được",
          en: "Write terms a user can actually read",
          zh: "撰写用户读得懂的条款",
        },
        description: {
          vi: "Điều khoản sử dụng, chính sách đổi trả và quy trình xử lý khiếu nại được viết gọn và khớp với vận hành thật, vì điều khoản không phản ánh thực tế thì khó dựa vào khi có tranh chấp.",
          en: "Terms of use, returns policy and complaint handling are written concisely and in line with real operations, because terms that do not reflect practice are hard to rely on in a dispute.",
          zh: "使用条款、退换货政策与投诉处理流程应简明并与实际运营一致；与实践脱节的条款在争议中难以援引。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Thuê ngoài phát triển phần mềm, ai giữ quyền đối với mã nguồn?",
          en: "If we outsource development, who holds the rights to the code?",
          zh: "外包开发时，代码权利归谁？",
        },
        answer: {
          vi: "Phụ thuộc vào thỏa thuận trong hợp đồng, chứ không mặc nhiên thuộc về bên trả tiền. Cần nêu rõ phạm vi chuyển giao, quyền sử dụng thành phần có sẵn của bên phát triển và điều gì xảy ra nếu hợp tác kết thúc giữa chừng.",
          en: "It depends on what the contract says; it does not automatically belong to whoever paid. The assignment scope, the developer rights in pre-existing components, and what happens if the engagement ends early all need to be stated.",
          zh: "取决于合同约定，并不自动归付款方所有。需明确转让范围、开发方对既有组件的权利，以及合作中途终止时的处理方式。",
        },
      },
      {
        question: {
          vi: "Website của chúng tôi thu thập dữ liệu người dùng, cần chuẩn bị gì?",
          en: "Our site collects user data — what do we need in place?",
          zh: "我们的网站收集用户数据，需要准备什么？",
        },
        answer: {
          vi: "Trước hết là bản mô tả thật về dữ liệu đang thu, mục đích, nơi lưu trữ, bên thứ ba có tiếp cận và thời hạn lưu. Chính sách quyền riêng tư và cơ chế lấy sự đồng ý được viết từ bản mô tả đó, không viết từ mẫu có sẵn.",
          en: "First, an accurate description of what you collect, why, where it is stored, which third parties can access it and how long it is kept. The privacy policy and consent mechanism are then written from that description rather than from a template.",
          zh: "首先需要一份关于所收集数据、目的、存储地点、可接触的第三方及保留期限的真实说明。隐私政策与同意机制应据此撰写，而非套用模板。",
        },
      },
      {
        question: {
          vi: "Bán hàng qua sàn thì trách nhiệm với người mua thuộc về ai?",
          en: "Selling through a marketplace — who is responsible to the buyer?",
          zh: "通过平台销售时，对买家的责任由谁承担？",
        },
        answer: {
          vi: "Thường được phân chia giữa người bán và sàn theo quy chế hoạt động của sàn và quy định về bảo vệ người tiêu dùng. Nên đọc kỹ quy chế trước khi mở gian hàng, vì phần lớn nghĩa vụ về mô tả hàng hóa, đổi trả và xử lý khiếu nại nằm ở người bán.",
          en: "It is usually split between seller and platform under the marketplace operating rules and consumer protection requirements. Read those rules before opening a store, since most obligations on product description, returns and complaints sit with the seller.",
          zh: "通常依平台运营规则与消费者保护规定在卖家与平台之间划分。开店前应仔细阅读这些规则，因为商品描述、退换货与投诉处理的多数义务落在卖家一方。",
        },
      },
    ],
  },
  {
    slug: "thuong-mai-va-ban-le",
    audience: {
      vi: "Nhà phân phối và đại lý, chuỗi cửa hàng đang mở thêm điểm bán, bên nhận hoặc nhượng quyền thương mại, và doanh nghiệp thuê mặt bằng bán lẻ dài hạn.",
      en: "Distributors and agents, retail chains opening further outlets, franchisees and franchisors, and businesses taking long leases on retail space.",
      zh: "经销商与代理商、正在增设门店的连锁企业、特许经营的受许方与授权方，以及长期承租零售场地的企业。",
    },
    process: [
      {
        heading: {
          vi: "Dựng bộ hợp đồng dùng lại được",
          en: "Build a contract set you can reuse",
          zh: "建立可复用的合同体系",
        },
        description: {
          vi: "Phân phối, đại lý, ký gửi và khuyến mại mỗi loại có cấu trúc riêng. Một bộ mẫu thống nhất giúp việc mở thêm điểm bán không phải đàm phán lại từ đầu mỗi lần.",
          en: "Distribution, agency, consignment and promotion each have their own structure. One consistent template set means opening another outlet does not start the negotiation from scratch.",
          zh: "经销、代理、寄售与促销各有其结构。一套统一的范本可使新增门店无需每次从头谈判。",
        },
      },
      {
        heading: {
          vi: "Xem điều khoản thuê theo vòng đời cửa hàng",
          en: "Read the lease across the life of the store",
          zh: "按门店生命周期审视租约",
        },
        description: {
          vi: "Thời hạn, điều kiện gia hạn, chi phí cải tạo, quyền chuyển nhượng và cách chấm dứt sớm quan trọng không kém giá thuê, vì đó là phần quyết định khi bạn muốn đóng hoặc chuyển điểm bán.",
          en: "Term, renewal conditions, fit-out costs, assignment rights and early termination matter as much as the rent, because they decide what happens when you want to close or move the store.",
          zh: "租期、续租条件、装修费用、转让权与提前终止，其重要性不亚于租金，因为它们决定了您想关店或迁址时的处境。",
        },
      },
      {
        heading: {
          vi: "Kiểm tra nhãn hiệu và thông tin hàng hóa",
          en: "Check trade marks and product information",
          zh: "核查商标与商品信息",
        },
        description: {
          vi: "Tên thương hiệu, nhãn hàng hóa và nội dung quảng cáo được rà soát cùng lúc, vì cả ba đều là chỗ dễ phát sinh khiếu nại từ người tiêu dùng hoặc từ đối thủ.",
          en: "Brand names, product labelling and advertising copy are reviewed together, since all three are common sources of complaints from consumers or competitors.",
          zh: "品牌名称、商品标签与广告内容一并审查，因为这三者都是消费者或竞争对手投诉的常见来源。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Hợp đồng phân phối và hợp đồng đại lý khác nhau ở đâu?",
          en: "What is the difference between distribution and agency?",
          zh: "经销合同与代理合同有何不同？",
        },
        answer: {
          vi: "Khác nhau chủ yếu ở chỗ ai là người bán cho khách cuối và ai chịu rủi ro hàng hóa. Sự khác biệt đó kéo theo cách tính thuế, trách nhiệm với người tiêu dùng và quyền đối với dữ liệu khách hàng, nên cần chọn đúng loại từ đầu.",
          en: "The main difference is who sells to the end customer and who carries the risk in the goods. That distinction flows through to tax treatment, responsibility to consumers and rights over customer data, so the right form should be chosen at the outset.",
          zh: "主要区别在于谁向最终客户销售、谁承担货物风险。这一区别会延伸到税务处理、对消费者的责任以及客户数据权利，因此应在一开始就选对类型。",
        },
      },
      {
        question: {
          vi: "Chúng tôi muốn nhượng quyền thương hiệu, cần chuẩn bị những gì?",
          en: "We want to franchise our brand — what do we need first?",
          zh: "我们想做品牌特许经营，需要先准备什么？",
        },
        answer: {
          vi: "Trước hết là quyền đối với nhãn hiệu đã được xác lập, bộ tài liệu vận hành, và điều kiện đăng ký hoạt động nhượng quyền theo quy định. Hợp đồng nhượng quyền chỉ viết được sau khi ba phần này đã rõ.",
          en: "First, established rights in the trade mark, an operations manual, and the registration conditions that apply to franchising. The franchise agreement can only be drafted once those three are settled.",
          zh: "首先是已确立的商标权、一套运营手册，以及适用于特许经营的登记条件。只有这三项明确后，特许经营合同才能起草。",
        },
      },
      {
        question: {
          vi: "Khách hàng khiếu nại về hàng hóa, đến mức nào thì cần luật sư?",
          en: "A customer complains about a product — when do we need a lawyer?",
          zh: "客户就商品提出投诉，何时需要律师介入？",
        },
        answer: {
          vi: "Khi khiếu nại liên quan tới an toàn, tới một lô hàng lớn, hoặc khi có yêu cầu bồi thường vượt quá chính sách đổi trả thông thường. Ở những trường hợp này, cách trả lời đầu tiên và hồ sơ được lập lúc đó thường ảnh hưởng tới toàn bộ diễn biến sau đó.",
          en: "When the complaint concerns safety, affects a whole batch, or seeks compensation beyond your normal returns policy. In those cases the first response and the file created at that moment usually shape everything that follows.",
          zh: "当投诉涉及安全、影响整批商品，或索赔金额超出常规退换货政策时。在这些情形中，最初的答复与当时形成的档案，往往决定后续全部走向。",
        },
      },
    ],
  },
  {
    slug: "giao-duc-va-y-te",
    audience: {
      vi: "Trường học và trung tâm đào tạo, phòng khám và cơ sở y tế tư nhân, cùng các đơn vị có sử dụng chuyên gia hoặc giáo viên là người nước ngoài.",
      en: "Schools and training centres, private clinics and healthcare facilities, and organisations employing foreign teachers or specialists.",
      zh: "学校与培训机构、民营诊所与医疗机构，以及聘用外籍教师或专家的单位。",
    },
    process: [
      {
        heading: {
          vi: "Bắt đầu từ điều kiện hoạt động",
          en: "Start from the operating conditions",
          zh: "从经营条件入手",
        },
        description: {
          vi: "Hai ngành này hoạt động theo giấy phép có điều kiện. Chúng tôi xác định đúng loại hình, điều kiện phải đáp ứng và thủ tục cần làm trước, rồi mới bàn tới hợp đồng và vận hành.",
          en: "Both sectors operate under conditional licences. We identify the correct category, the conditions to be met and the procedures required first, and only then turn to contracts and operations.",
          zh: "这两个行业均依附条件许可经营。我们先确定正确的类别、须满足的条件与应办理的手续，之后再讨论合同与运营。",
        },
      },
      {
        heading: {
          vi: "Viết hợp đồng với người học và người bệnh cho rõ",
          en: "Make agreements with learners and patients clear",
          zh: "让与学员及患者的协议清晰可读",
        },
        description: {
          vi: "Phạm vi dịch vụ, học phí hoặc chi phí, điều kiện hoàn trả và cách xử lý khiếu nại được viết bằng ngôn ngữ người đọc hiểu được — đây là nhóm khách hàng được pháp luật bảo vệ chặt.",
          en: "Scope of service, fees, refund conditions and complaint handling are written in language the reader understands — these are groups the law protects closely.",
          zh: "服务范围、费用、退费条件与投诉处理，应以读者能理解的语言书写——这类对象受法律的严格保护。",
        },
      },
      {
        heading: {
          vi: "Sắp xếp hồ sơ nhân sự và dữ liệu",
          en: "Order the personnel files and the data",
          zh: "整理人事档案与数据",
        },
        description: {
          vi: "Hợp đồng lao động, chứng chỉ hành nghề, giấy phép lao động cho người nước ngoài và cách lưu giữ hồ sơ người học, người bệnh được rà soát cùng nhau, vì đây là những phần hay được kiểm tra.",
          en: "Employment contracts, professional certificates, work permits for foreign staff and the way learner or patient records are kept are reviewed together, because these are the areas most often inspected.",
          zh: "劳动合同、执业证书、外籍员工工作许可，以及学员或患者档案的保管方式，应一并审查，因为这些是最常被检查的环节。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Mở trung tâm đào tạo cần giấy phép gì?",
          en: "What licences does opening a training centre require?",
          zh: "开办培训中心需要哪些许可？",
        },
        answer: {
          vi: "Phụ thuộc vào loại hình đào tạo, đối tượng người học và địa phương nơi đặt cơ sở. Điều nên làm trước là xác định đúng loại hình, vì chính nó quyết định điều kiện về cơ sở vật chất, chương trình và nhân sự.",
          en: "It depends on the type of training, who the learners are and where the centre is located. The first step is to identify the correct category, since that determines the requirements on premises, curriculum and staff.",
          zh: "取决于培训类型、学员对象及机构所在地。首要步骤是确定正确的类别，因为它决定了对场地、课程与师资的要求。",
        },
      },
      {
        question: {
          vi: "Chúng tôi tuyển giáo viên nước ngoài, thủ tục thế nào?",
          en: "We are hiring foreign teachers — what is the procedure?",
          zh: "我们要聘用外籍教师，手续如何？",
        },
        answer: {
          vi: "Thường gồm chấp thuận nhu cầu sử dụng lao động nước ngoài, giấy phép lao động và thẻ tạm trú, kèm hồ sơ chứng minh trình độ đã được hợp pháp hóa. Thời gian chuẩn bị hồ sơ thường dài hơn dự kiến, nên nên bắt đầu trước ngày dự định đứng lớp.",
          en: "Usually approval of the need for foreign labour, a work permit and a temporary residence card, together with legalised evidence of qualifications. Preparing the file usually takes longer than expected, so start well before the intended first day of teaching.",
          zh: "通常包括使用外国劳动者需求的批准、工作许可与临时居留卡，并附经认证的学历证明。备件耗时往往超出预期，应在拟定开课日之前尽早启动。",
        },
      },
      {
        question: {
          vi: "Hồ sơ người học và người bệnh được lưu giữ thế nào cho đúng?",
          en: "How should learner and patient records be kept?",
          zh: "学员与患者档案应如何保管？",
        },
        answer: {
          vi: "Cần xác định rõ loại thông tin đang lưu, mục đích, người được tiếp cận và thời hạn lưu giữ. Thông tin sức khỏe và thông tin của trẻ em được bảo vệ chặt hơn thông tin thông thường, nên phần này nên rà soát riêng.",
          en: "Identify what information you hold, for what purpose, who may access it and how long it is kept. Health information and information about children are protected more strictly than ordinary data, so that part deserves a separate review.",
          zh: "需明确所保存的信息类型、目的、可接触人员及保存期限。健康信息与儿童信息受到比一般数据更严格的保护，该部分应单独审查。",
        },
      },
    ],
  },
  {
    slug: "dich-vu-va-tai-chinh",
    audience: {
      vi: "Doanh nghiệp cung cấp dịch vụ theo hợp đồng dài hạn, đơn vị tư vấn và thuê ngoài, cùng doanh nghiệp đang xử lý công nợ hoặc rà soát lại điều kiện kinh doanh của mình.",
      en: "Businesses delivering services under long-term contracts, consultancies and outsourcing providers, and companies working through receivables or reviewing their own licensing conditions.",
      zh: "以长期合同提供服务的企业、咨询与外包服务方，以及正在处理应收账款或复核自身经营条件的公司。",
    },
    process: [
      {
        heading: {
          vi: "Định nghĩa dịch vụ bằng thứ đo được",
          en: "Define the service in measurable terms",
          zh: "用可衡量的方式定义服务",
        },
        description: {
          vi: "Phạm vi công việc, tiêu chí hoàn thành và cách nghiệm thu được viết bằng những thứ kiểm chứng được. Hợp đồng dịch vụ mô tả chung chung là nguyên nhân phổ biến nhất của tranh chấp thanh toán.",
          en: "Scope of work, completion criteria and acceptance are written in terms that can be verified. Vaguely described service contracts are the most common cause of payment disputes.",
          zh: "工作范围、完成标准与验收方式，应以可核验的方式书写。描述含糊的服务合同是付款争议最常见的成因。",
        },
      },
      {
        heading: {
          vi: "Đặt giới hạn trách nhiệm ở mức chịu được",
          en: "Set liability at a level you can carry",
          zh: "将责任限制在可承受的范围",
        },
        description: {
          vi: "Giới hạn trách nhiệm, loại trừ thiệt hại gián tiếp và yêu cầu về bảo hiểm được cân nhắc theo giá trị hợp đồng, chứ không sao chép từ một mẫu của giao dịch khác quy mô.",
          en: "Liability caps, exclusion of indirect loss and insurance requirements are set against the contract value, not copied from a template drawn for a deal of a different size.",
          zh: "责任上限、间接损失的排除与保险要求，应对照合同金额设定，而非照搬为不同规模交易所拟的范本。",
        },
      },
      {
        heading: {
          vi: "Xử lý công nợ theo trình tự",
          en: "Work through receivables in order",
          zh: "按顺序处理应收账款",
        },
        description: {
          vi: "Đối chiếu công nợ, thông báo yêu cầu thanh toán, thương lượng phương án trả dần, rồi mới tính tới khởi kiện. Mỗi bước để lại chứng cứ dùng được cho bước sau.",
          en: "Reconcile the balance, issue a demand, negotiate an instalment arrangement, and only then consider proceedings. Each step leaves evidence that the next one can use.",
          zh: "先核对账目、发出付款要求、协商分期方案，之后才考虑诉讼。每一步都留下可供下一步使用的证据。",
        },
      },
    ],
    faq: [
      {
        question: {
          vi: "Khách hàng chậm thanh toán, khi nào nên chuyển sang bước pháp lý?",
          en: "A client is late paying — when should we escalate?",
          zh: "客户逾期付款，何时应转入法律程序？",
        },
        answer: {
          vi: "Thường là khi thương lượng không còn tiến triển, hoặc khi thời hiệu khởi kiện bắt đầu đáng lo. Trước đó nên hoàn tất đối chiếu công nợ và gửi thông báo yêu cầu thanh toán bằng văn bản, vì đây là những chứng cứ được dùng ở mọi bước sau.",
          en: "Usually when negotiation stops making progress, or when the limitation period starts to matter. Before that, complete the reconciliation and send a written demand, since these become evidence at every later stage.",
          zh: "通常是在协商不再取得进展时，或诉讼时效开始值得担忧时。在此之前应完成账目核对并发出书面付款要求，因为这些将成为后续每一步的证据。",
        },
      },
      {
        question: {
          vi: "Giới hạn trách nhiệm trong hợp đồng dịch vụ có luôn có hiệu lực không?",
          en: "Is a liability cap in a service contract always effective?",
          zh: "服务合同中的责任限制总是有效吗？",
        },
        answer: {
          vi: "Không phải trong mọi trường hợp. Hiệu lực phụ thuộc vào cách điều khoản được soạn và loại thiệt hại đang bàn tới. Đây là điều khoản nên được soạn riêng cho từng loại hợp đồng thay vì dùng lại một câu chung.",
          en: "Not in every case. Whether it holds depends on how the clause is drafted and the kind of loss in question. This is a clause to draft for each type of contract rather than reuse as a standard sentence.",
          zh: "并非在所有情形下都有效。其效力取决于条款的拟定方式及所涉损失类型。该条款应针对每类合同单独拟定，而非作为通用语句重复使用。",
        },
      },
      {
        question: {
          vi: "Ngành của chúng tôi có thuộc diện kinh doanh có điều kiện không?",
          en: "Is our line of business subject to conditional licensing?",
          zh: "我们所处行业是否属于附条件经营？",
        },
        answer: {
          vi: "Cần đối chiếu hoạt động thực tế với danh mục ngành nghề đầu tư kinh doanh có điều kiện, chứ không chỉ dựa vào ngành nghề đã đăng ký. Nhiều doanh nghiệp phát hiện khác biệt khi mở rộng sang một dịch vụ mới.",
          en: "Compare what you actually do against the list of conditional business lines, not merely your registered activities. Many businesses find a gap when they expand into a new service.",
          zh: "应将实际经营活动与附条件投资经营行业目录相对照，而不仅依据已登记的经营范围。许多企业在拓展新服务时才发现两者存在差距。",
        },
      },
    ],
  },
];
