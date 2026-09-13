/**
 * Ngành nghề dự thảo cho mục Ngành nghề, ba ngôn ngữ.
 *
 * Mỗi ngành mô tả các vấn đề pháp lý thường gặp của doanh nghiệp trong ngành
 * và cách công ty hỗ trợ, ở mức quy trình. Không khẳng định số lượng khách
 * hàng, số năm hay kết quả. Nạp ở trạng thái nháp, chờ công ty rà soát và cắt
 * những ngành không thực sự phục vụ.
 */
import type { Localised, Section } from "./people";

export type DraftIndustry = {
  slug: string;
  title: Localised;
  summary: Localised;
  keywords: string;
  sections: Section[];
  seoDescription: Localised;
};

export const draftIndustries: DraftIndustry[] = [
  {
    slug: "san-xuat-va-xuat-khau",
    title: { vi: "Sản xuất và xuất khẩu", en: "Manufacturing and export", zh: "制造与出口" },
    summary: {
      vi: "Nhà máy, chuỗi cung ứng và hợp đồng với đối tác nước ngoài đặt ra những câu hỏi pháp lý gắn liền với từng lô hàng: điều kiện giao hàng, chất lượng, thanh toán và tuân thủ.",
      en: "Factories, supply chains and contracts with foreign counterparties raise legal questions tied to every shipment: delivery terms, quality, payment and compliance.",
      zh: "工厂、供应链及与境外伙伴的合同，让每一批货物都伴随着法律问题：交付条件、质量、付款与合规。",
    },
    keywords: "sản xuất, xuất khẩu, hợp đồng ngoại thương, san xuat, xuat khau, incoterms",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Điều khoản giao hàng và chuyển rủi ro trong hợp đồng mua bán quốc tế. Tranh chấp chất lượng và khiếu nại sau giao hàng. Điều kiện kinh doanh, giấy phép và kiểm tra chuyên ngành. Hợp đồng gia công, bảo mật quy trình và quyền sở hữu trí tuệ với đối tác. Quan hệ lao động tại nhà máy: nội quy, kỷ luật, tai nạn lao động.",
          en: "Delivery and risk-transfer terms in international sales contracts. Quality disputes and post-delivery claims. Business conditions, licences and specialised inspections. Processing contracts, protection of know-how and IP with partners. Labour relations at the plant: internal rules, discipline, workplace accidents.",
          zh: "国际货物买卖合同中的交付与风险转移条款；交货后的质量争议与索赔；经营条件、许可与专项检查；加工合同、对合作方的工艺保密与知识产权；工厂劳动关系：内部规章、纪律处分、工伤。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Rà soát và chuẩn hóa bộ hợp đồng mẫu với khách hàng và nhà cung cấp. Tư vấn trước khi ký hợp đồng có yếu tố nước ngoài, gồm luật áp dụng và nơi giải quyết tranh chấp. Đại diện xử lý khiếu nại và tranh chấp thương mại. Rà soát tuân thủ định kỳ về giấy phép, lao động và môi trường.",
          en: "Review and standardise your template contracts with customers and suppliers. Advise before signing contracts with a foreign element, including governing law and dispute forum. Represent you in claims and commercial disputes. Periodic compliance reviews covering licences, labour and environment.",
          zh: "审查并规范与客户及供应商的合同模板；在签署涉外合同前提供意见，包括适用法律与争议解决地；代理处理索赔与商事争议；定期进行许可、劳动与环境方面的合规审查。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý cho doanh nghiệp sản xuất và xuất khẩu: hợp đồng ngoại thương, khiếu nại chất lượng, giấy phép, lao động nhà máy.",
      en: "Legal support for manufacturers and exporters in Vietnam: international sales contracts, quality claims, licences, factory labour matters.",
      zh: "为越南制造与出口企业提供法律支持：国际买卖合同、质量索赔、许可、工厂劳动事务。",
    },
  },
  {
    slug: "bat-dong-san-va-xay-dung",
    title: { vi: "Bất động sản và xây dựng", en: "Real estate and construction", zh: "房地产与建筑" },
    summary: {
      vi: "Từ pháp lý dự án đến hợp đồng thi công và giao dịch chuyển nhượng, ngành này có nhiều bên, nhiều giai đoạn và nhiều loại giấy tờ phải khớp nhau.",
      en: "From project legal status to construction contracts and transfers, this sector involves many parties, many stages and many documents that must line up.",
      zh: "从项目法律状态到施工合同和转让交易，这一行业涉及多方、多阶段和众多必须相互一致的文件。",
    },
    keywords: "bất động sản, xây dựng, hợp đồng thi công, chuyển nhượng, pháp lý dự án, bat dong san",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Kiểm tra pháp lý bất động sản trước khi mua, thuê hoặc góp vốn. Hợp đồng thi công: tiến độ, nghiệm thu, thanh toán theo giai đoạn, phạt chậm. Hợp đồng đặt cọc, mua bán, thuê dài hạn và điều khoản bàn giao. Tranh chấp giữa chủ đầu tư, nhà thầu và người mua. Thủ tục đăng ký biến động và cấp giấy chứng nhận.",
          en: "Legal due diligence on property before buying, leasing or contributing it as capital. Construction contracts: schedule, acceptance, staged payment, delay penalties. Deposit, sale and long-term lease agreements and handover terms. Disputes among developers, contractors and buyers. Registration of changes and certificate procedures.",
          zh: "购买、租赁或以房地产出资前的法律尽职调查；施工合同：工期、验收、分期付款、延期违约金；定金、买卖、长期租赁合同及交付条款；开发商、承包商与购房人之间的纠纷；变更登记与证书办理手续。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Soát xét hồ sơ pháp lý và lập báo cáo rủi ro trước giao dịch. Soạn thảo, đàm phán hợp đồng thi công và hợp đồng giao dịch. Đại diện giải quyết tranh chấp tại tòa án hoặc trọng tài. Hướng dẫn thủ tục hành chính liên quan đến đất đai và xây dựng.",
          en: "Review the legal file and prepare a risk report before the transaction. Draft and negotiate construction and transaction contracts. Represent you in court or arbitration. Guide you through land and construction administrative procedures.",
          zh: "交易前审查法律文件并出具风险报告；起草并谈判施工合同与交易合同；在法院或仲裁中代理争议；指导土地与建筑相关行政手续。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý bất động sản và xây dựng: kiểm tra pháp lý trước giao dịch, hợp đồng thi công, tranh chấp chủ đầu tư và nhà thầu.",
      en: "Real estate and construction legal support in Vietnam: pre-transaction due diligence, construction contracts, developer and contractor disputes.",
      zh: "越南房地产与建筑法律支持：交易前尽职调查、施工合同、开发商与承包商纠纷。",
    },
  },
  {
    slug: "cong-nghe-va-thuong-mai-dien-tu",
    title: { vi: "Công nghệ và thương mại điện tử", en: "Technology and e-commerce", zh: "科技与电子商务" },
    summary: {
      vi: "Doanh nghiệp số làm việc với dữ liệu người dùng, phần mềm và giao dịch trực tuyến, nơi quy định thay đổi nhanh và trách nhiệm phát sinh ngay khi sản phẩm ra mắt.",
      en: "Digital businesses handle user data, software and online transactions, where rules change quickly and liability starts the moment a product launches.",
      zh: "数字企业处理用户数据、软件与在线交易，规则变化迅速，责任自产品上线之刻起即已产生。",
    },
    keywords: "công nghệ, thương mại điện tử, bảo vệ dữ liệu cá nhân, phần mềm, sàn giao dịch, thuong mai dien tu",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Bảo vệ dữ liệu cá nhân theo Nghị định 13/2023: chính sách, đồng ý, hồ sơ đánh giá tác động. Điều khoản sử dụng và chính sách của ứng dụng, website, sàn giao dịch. Hợp đồng phát triển phần mềm, cấp phép và quyền sở hữu mã nguồn. Đăng ký website và ứng dụng thương mại điện tử với Bộ Công Thương. Quan hệ với nhà cung cấp dịch vụ đám mây và thanh toán.",
          en: "Personal data protection under Decree 13/2023: policies, consent, impact assessment dossiers. Terms of use and policies for apps, websites and marketplaces. Software development, licensing and source code ownership. Registration of e-commerce websites and apps with the Ministry of Industry and Trade. Relationships with cloud and payment providers.",
          zh: "依据第13/2023号法令的个人数据保护：政策、同意、影响评估档案；应用、网站与平台的使用条款和政策；软件开发、许可与源代码归属；向工贸部登记电子商务网站与应用；与云服务及支付服务商的关系。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Soạn bộ chính sách pháp lý cho sản phẩm số bằng ngôn ngữ người dùng đọc được. Rà soát hợp đồng với đối tác công nghệ và khách hàng doanh nghiệp. Hướng dẫn thủ tục đăng ký, thông báo và hồ sơ dữ liệu cá nhân. Xử lý khiếu nại người dùng và yêu cầu từ cơ quan quản lý.",
          en: "Draft the legal policy set for digital products in language users can actually read. Review contracts with technology partners and enterprise customers. Guide registration, notification and personal data dossiers. Handle user complaints and regulator requests.",
          zh: "以用户读得懂的语言起草数字产品的法律政策文件；审查与技术合作方及企业客户的合同；指导登记、备案与个人数据档案；处理用户投诉及监管机关的要求。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý cho doanh nghiệp công nghệ và thương mại điện tử: dữ liệu cá nhân, điều khoản sử dụng, hợp đồng phần mềm, đăng ký sàn.",
      en: "Legal support for technology and e-commerce businesses in Vietnam: personal data, terms of use, software contracts, marketplace registration.",
      zh: "为越南科技与电商企业提供法律支持：个人数据、使用条款、软件合同、平台登记。",
    },
  },
  {
    slug: "thuong-mai-va-ban-le",
    title: { vi: "Thương mại và bán lẻ", en: "Trading and retail", zh: "商贸与零售" },
    summary: {
      vi: "Phân phối, nhượng quyền, mặt bằng và người tiêu dùng: bốn mối quan hệ pháp lý mà doanh nghiệp thương mại phải giữ cân bằng cùng lúc.",
      en: "Distribution, franchising, premises and consumers: four legal relationships a trading business has to balance at the same time.",
      zh: "分销、特许经营、经营场所与消费者：商贸企业需要同时平衡的四种法律关系。",
    },
    keywords: "phân phối, nhượng quyền, bán lẻ, bảo vệ người tiêu dùng, thuê mặt bằng, nhuong quyen",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Hợp đồng đại lý, phân phối độc quyền và điều khoản chấm dứt. Nhượng quyền thương mại: đăng ký, hợp đồng và bảo vệ thương hiệu. Hợp đồng thuê mặt bằng dài hạn, điều chỉnh giá và chấm dứt sớm. Trách nhiệm với người tiêu dùng: bảo hành, đổi trả, quảng cáo và khuyến mại. Đăng ký nhãn hiệu và xử lý hàng giả.",
          en: "Agency and exclusive distribution agreements and their termination terms. Franchising: registration, contracts and brand protection. Long-term premises leases, rent adjustment and early termination. Consumer obligations: warranty, returns, advertising and promotions. Trademark registration and counterfeit enforcement.",
          zh: "代理与独家分销合同及其终止条款；特许经营：登记、合同与品牌保护；长期场所租赁、租金调整与提前终止；对消费者的责任：保修、退换、广告与促销；商标注册与打击假冒。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Xây dựng bộ hợp đồng phân phối và nhượng quyền dùng lại được cho nhiều đối tác. Rà soát hợp đồng thuê trước khi ký và đàm phán lại khi cần. Tư vấn tuân thủ quảng cáo, khuyến mại và bảo vệ người tiêu dùng. Đại diện đăng ký nhãn hiệu và xử lý xâm phạm.",
          en: "Build reusable distribution and franchise contract sets for multiple partners. Review leases before signing and renegotiate when needed. Advise on advertising, promotion and consumer protection compliance. Represent you in trademark registration and infringement matters.",
          zh: "建立可对多家合作方重复使用的分销与特许经营合同体系；签约前审查租赁合同并在需要时重新谈判；提供广告、促销与消费者保护合规意见；代理商标注册与侵权处理。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý thương mại và bán lẻ: hợp đồng phân phối, nhượng quyền, thuê mặt bằng, bảo vệ người tiêu dùng, nhãn hiệu.",
      en: "Trading and retail legal support in Vietnam: distribution contracts, franchising, premises leases, consumer protection, trademarks.",
      zh: "越南商贸与零售法律支持：分销合同、特许经营、场所租赁、消费者保护、商标。",
    },
  },
  {
    slug: "giao-duc-va-y-te",
    title: { vi: "Giáo dục và y tế", en: "Education and healthcare", zh: "教育与医疗" },
    summary: {
      vi: "Hai ngành có điều kiện kinh doanh chặt, nhiều giấy phép và trách nhiệm trực tiếp với người học, người bệnh. Sai một thủ tục có thể dừng cả hoạt động.",
      en: "Two sectors with strict business conditions, many licences and direct responsibility to students and patients. One procedural mistake can halt operations.",
      zh: "两个经营条件严格、许可众多、对学员和患者负有直接责任的行业。一个程序错误就可能导致业务停摆。",
    },
    keywords: "giáo dục, y tế, phòng khám, trung tâm đào tạo, giấy phép hoạt động, giao duc, y te",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Giấy phép thành lập và hoạt động cho trường, trung tâm, phòng khám. Hợp đồng với người học, phụ huynh, người bệnh và điều khoản hoàn phí. Hợp đồng lao động với giáo viên, bác sĩ, kể cả người nước ngoài. Xử lý khiếu nại, sự cố và trách nhiệm bồi thường. Bảo mật hồ sơ học tập và hồ sơ sức khỏe.",
          en: "Establishment and operating licences for schools, centres and clinics. Contracts with students, parents and patients, including refund terms. Employment contracts with teachers and doctors, including foreign staff. Complaints, incidents and liability. Confidentiality of academic and health records.",
          zh: "学校、培训中心、诊所的设立与经营许可；与学员、家长、患者的合同及退费条款；与教师、医生（含外籍人员）的劳动合同；投诉、事故处理与赔偿责任；学业档案与健康档案的保密。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Rà soát điều kiện và chuẩn bị hồ sơ xin cấp, gia hạn giấy phép. Soạn hợp đồng dịch vụ và nội quy phù hợp quy định chuyên ngành. Tư vấn tuyển dụng và giấy phép lao động cho nhân sự nước ngoài. Đại diện xử lý khiếu nại và làm việc với cơ quan quản lý.",
          en: "Review conditions and prepare licence applications and renewals. Draft service contracts and internal rules that comply with sector regulation. Advise on recruitment and work permits for foreign staff. Represent you in complaints and dealings with regulators.",
          zh: "审查条件并准备许可申请与续期材料；起草符合行业规定的服务合同与内部规章；就外籍人员招聘与工作许可提供意见；代理处理投诉并与监管机关沟通。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý cho trường học, trung tâm đào tạo và cơ sở y tế: giấy phép hoạt động, hợp đồng với người học và người bệnh, nhân sự nước ngoài.",
      en: "Legal support for schools, training centres and healthcare providers in Vietnam: operating licences, student and patient contracts, foreign staff.",
      zh: "为越南学校、培训中心与医疗机构提供法律支持：经营许可、学员与患者合同、外籍人员。",
    },
  },
  {
    slug: "dich-vu-va-tai-chinh",
    title: { vi: "Dịch vụ và tài chính", en: "Services and finance", zh: "服务与金融" },
    summary: {
      vi: "Công ty dịch vụ, tư vấn, tài chính và bảo hiểm sống bằng hợp đồng và uy tín. Rủi ro lớn nhất thường nằm ở điều khoản trách nhiệm và cách xử lý khi khách hàng không hài lòng.",
      en: "Service, consulting, finance and insurance firms live on contracts and reputation. The biggest risks usually sit in liability clauses and in how dissatisfied clients are handled.",
      zh: "服务、咨询、金融与保险企业依靠合同与声誉生存。最大的风险通常存在于责任条款以及处理客户不满的方式中。",
    },
    keywords: "dịch vụ, tài chính, bảo hiểm, hợp đồng dịch vụ, trách nhiệm nghề nghiệp, tai chinh",
    sections: [
      {
        heading: { vi: "Vấn đề pháp lý thường gặp", en: "Common legal issues", zh: "常见法律问题" },
        body: {
          vi: "Hợp đồng dịch vụ: phạm vi, nghiệm thu, giới hạn trách nhiệm và bảo mật. Điều kiện kinh doanh với ngành có điều kiện như tài chính, bảo hiểm, kiểm toán. Thu hồi công nợ và xử lý khách hàng chậm thanh toán. Tranh chấp về chất lượng dịch vụ và trách nhiệm nghề nghiệp. Quan hệ đối tác, hoa hồng và xung đột lợi ích.",
          en: "Service contracts: scope, acceptance, limitation of liability and confidentiality. Business conditions in regulated sectors such as finance, insurance and audit. Debt recovery and late-paying clients. Disputes over service quality and professional liability. Partnerships, commissions and conflicts of interest.",
          zh: "服务合同：范围、验收、责任限制与保密；金融、保险、审计等特许行业的经营条件；债务追收与逾期付款客户的处理；服务质量与职业责任纠纷；合作关系、佣金与利益冲突。",
        },
      },
      {
        heading: { vi: "Cách chúng tôi hỗ trợ", en: "How we support", zh: "我们如何提供支持" },
        body: {
          vi: "Chuẩn hóa hợp đồng dịch vụ và điều khoản chung dùng cho mọi khách hàng. Xây dựng quy trình thu hồi công nợ từ nhắc nhở đến khởi kiện. Tư vấn tuân thủ điều kiện kinh doanh và báo cáo định kỳ. Đại diện thương lượng và giải quyết tranh chấp với khách hàng, đối tác.",
          en: "Standardise service contracts and general terms for all clients. Build a debt recovery process from reminder to litigation. Advise on business conditions and periodic reporting. Represent you in negotiations and disputes with clients and partners.",
          zh: "规范面向所有客户的服务合同与通用条款；建立从催收到起诉的债务追收流程；提供经营条件合规与定期报告的意见；代理与客户及合作方的谈判与争议解决。",
        },
      },
    ],
    seoDescription: {
      vi: "Tư vấn pháp lý cho doanh nghiệp dịch vụ và tài chính: hợp đồng dịch vụ, giới hạn trách nhiệm, thu hồi công nợ, điều kiện kinh doanh.",
      en: "Legal support for service and finance businesses in Vietnam: service contracts, limitation of liability, debt recovery, business conditions.",
      zh: "为越南服务与金融企业提供法律支持：服务合同、责任限制、债务追收、经营条件。",
    },
  },
];
