import type { Locale } from "./locales";
export type Trilingual = readonly [string, string, string];
export const localText = (value: Trilingual, locale: Locale) =>
  value[locale === "vi" ? 0 : locale === "en" ? 1 : 2];
export type PageResource = {
  title: Trilingual;
  intro: Trilingual;
  cards: [Trilingual, Trilingual][];
};
export const pageResources: Record<string, PageResource> = {
  lawyers: {
    title: [
      "Chọn người đồng hành từ những điều cụ thể",
      "Choose your contact with clear criteria",
      "以明确标准选择沟通对象",
    ],
    intro: [
      "Trước buổi trao đổi, hãy xác định vấn đề và những điều bạn cần làm rõ với người phụ trách.",
      "Before a conversation, identify your matter and what you need to clarify with your contact.",
      "沟通前，请先明确您的问题及需要向负责人了解的事项。",
    ],
    cards: [
      [
        ["Chuyên môn phù hợp", "Relevant expertise", "相关专业领域"],
        [
          "Nêu loại công việc, bối cảnh và giai đoạn hiện tại. Khi trao đổi, hỏi về phạm vi hỗ trợ phù hợp với hồ sơ của bạn.",
          "Describe the matter, its context and current stage. Ask which support is appropriate for your circumstances.",
          "说明事项类型、背景及当前阶段，并询问适合您情况的支持范围。",
        ],
      ],
      [
        [
          "Người phụ trách và cách liên hệ",
          "Responsibility and communication",
          "负责人及沟通方式",
        ],
        [
          "Làm rõ ai phụ trách chính, ai phối hợp, ngôn ngữ trao đổi và kênh cập nhật trước khi thống nhất công việc.",
          "Clarify the lead contact, other participants, working language and update channel before agreeing the work.",
          "确定工作前，请明确主要联系人、协作人员、沟通语言及进度更新渠道。",
        ],
      ],
      [
        ["Phạm vi và chi phí", "Scope and fees", "范围与费用"],
        [
          "Đề nghị làm rõ công việc bao gồm, phần ngoài phạm vi, cách tính phí và các khoản chi phí có thể phát sinh.",
          "Ask what is included, what falls outside scope, how fees are calculated and which additional expenses may arise.",
          "请了解工作包含哪些内容、哪些不在范围内、费用计算方式及可能发生的其他支出。",
        ],
      ],
    ],
  },
  experience: {
    title: [
      "Một hồ sơ rõ ràng giúp cuộc trao đổi đi đúng trọng tâm",
      "A clear brief makes the conversation more useful",
      "清晰的事项说明有助于有效沟通",
    ],
    intro: [
      "Các nội dung dưới đây là gợi ý chuẩn bị theo loại công việc, không phải danh sách vụ việc hoặc kết quả công ty đã thực hiện.",
      "The following are preparation prompts by matter type, not a list of the firm’s completed matters or results.",
      "以下内容为不同事项的准备建议，并非本公司的已办案例或成果。",
    ],
    cards: [
      [
        ["Giao dịch và hợp tác", "Transactions and partnerships", "交易与合作"],
        [
          "Tóm tắt mục tiêu hợp tác, vai trò các bên, giá trị dự kiến và thời điểm cần quyết định. Liệt kê các dự thảo hoặc văn bản đã ký để trao đổi sau.",
          "Summarise the objective, each party’s role, expected value and decision date. List drafts or signed documents for later discussion.",
          "概述合作目标、各方角色、预计金额及决策日期。列出草案或已签文件，供后续沟通。",
        ],
      ],
      [
        ["Bất đồng và tranh chấp", "Disagreements and disputes", "分歧与争议"],
        [
          "Sắp xếp sự kiện theo thời gian; ghi rõ yêu cầu của mỗi bên, các lần trao đổi và mốc thời gian đang được thông báo. Giữ nguyên tài liệu gốc.",
          "Arrange events chronologically, noting each side’s requests, prior communications and notified dates. Keep original documents intact.",
          "按时间顺序整理事件，记录各方诉求、过往沟通及已通知的日期，并保留原始文件。",
        ],
      ],
      [
        ["Hoạt động doanh nghiệp", "Business operations", "企业经营"],
        [
          "Mô tả mô hình kinh doanh, vấn đề đang vướng và kế hoạch sắp tới. Phân biệt điều đã xảy ra với phương án mới đang cân nhắc.",
          "Describe the business model, current issue and upcoming plans. Distinguish events that have occurred from options under consideration.",
          "说明业务模式、当前问题及后续计划，区分已发生的事实与正在考虑的方案。",
        ],
      ],
    ],
  },
  industries: {
    title: [
      "Nhìn vấn đề trong bối cảnh ngành nghề",
      "Put the matter in its industry context",
      "结合行业背景理解问题",
    ],
    intro: [
      "Những nhóm nhu cầu tham khảo dưới đây giúp bạn mô tả hoạt động kinh doanh. Phạm vi hỗ trợ cụ thể được xác định sau khi trao đổi.",
      "These reference topics help you describe your business. The specific scope of support is determined after discussion.",
      "以下参考主题有助于您描述经营活动，具体支持范围将在沟通后确定。",
    ],
    cards: [
      [
        ["Thương mại và phân phối", "Trade and distribution", "贸易与分销"],
        [
          "Chuỗi cung ứng, điều kiện giao nhận, thanh toán, đại lý và phân phối. Nêu thị trường hoạt động, vai trò của doanh nghiệp và đối tác liên quan.",
          "Supply chains, delivery terms, payments, agencies and distribution. Identify the market, your business’s role and relevant partners.",
          "供应链、交付条件、付款、代理及分销。请说明经营市场、企业角色及相关合作方。",
        ],
      ],
      [
        [
          "Công nghệ và dịch vụ số",
          "Technology and digital services",
          "科技与数字服务",
        ],
        [
          "Phát triển sản phẩm, hợp đồng dịch vụ, quyền đối với phần mềm và luồng dữ liệu. Mô tả sản phẩm, người dùng và cách phối hợp với nhà cung cấp.",
          "Product development, service contracts, software rights and data flows. Describe the product, its users and supplier arrangements.",
          "产品开发、服务合同、软件权利及数据流转。请描述产品、用户及供应商合作安排。",
        ],
      ],
      [
        ["Sản xuất và cung ứng", "Manufacturing and supply", "生产与供应"],
        [
          "Mua nguyên liệu, gia công, tiêu chuẩn bàn giao và trách nhiệm các bên. Chuẩn bị sơ đồ giao dịch và danh sách các văn bản liên quan.",
          "Materials procurement, outsourcing, delivery specifications and responsibilities. Prepare a transaction outline and list of relevant documents.",
          "原料采购、委托加工、交付标准及各方责任。请准备交易概况与相关文件清单。",
        ],
      ],
      [
        [
          "Dịch vụ và kinh doanh mới",
          "Services and new ventures",
          "服务业与新业务",
        ],
        [
          "Cơ cấu hợp tác, hợp đồng khách hàng, thương hiệu và kế hoạch phát triển. Nêu rõ hoạt động đã triển khai và hoạt động dự kiến.",
          "Partnership structures, customer contracts, branding and growth plans. Explain which activities have started and which are planned.",
          "合作架构、客户合同、品牌及发展计划。请说明已开展及计划开展的业务。",
        ],
      ],
    ],
  },
  careers: {
    title: [
      "Chuẩn bị cho một cơ hội phù hợp",
      "Prepare for a suitable opportunity",
      "为合适的机会做好准备",
    ],
    intro: [
      "Chỉ các vị trí được đăng bên trên mới là thông tin tuyển dụng hiện có. Phần dưới giúp bạn chuẩn bị hồ sơ khi có vị trí phù hợp.",
      "Only positions listed above are current recruitment notices. The guidance below helps you prepare when a suitable role is available.",
      "仅上方列出的职位属于当前招聘信息。以下建议供合适职位发布时准备申请材料使用。",
    ],
    cards: [
      [
        ["Hồ sơ có trọng tâm", "A focused application", "有重点的申请材料"],
        [
          "Trình bày học vấn, kinh nghiệm thực tế, ngôn ngữ làm việc và lĩnh vực quan tâm. Ưu tiên mô tả rõ vai trò của bạn trong từng công việc.",
          "Set out your education, practical experience, working languages and interests. Clearly describe your own role in each assignment.",
          "说明教育背景、实践经历、工作语言及兴趣领域，明确您在各项工作中的具体职责。",
        ],
      ],
      [
        [
          "Mẫu bài viết phù hợp",
          "An appropriate writing sample",
          "合适的写作样本",
        ],
        [
          "Nếu thông báo tuyển dụng yêu cầu, chọn bài viết do bạn thực hiện và được phép chia sẻ. Loại bỏ thông tin khách hàng và nội dung bảo mật.",
          "If a vacancy requests one, select your own work that you are permitted to share. Remove client information and confidential content.",
          "如招聘通知要求，请选择本人撰写且获准分享的作品，删除客户信息与保密内容。",
        ],
      ],
      [
        [
          "Đối chiếu thông báo tuyển dụng",
          "Check the vacancy notice",
          "核对招聘通知",
        ],
        [
          "Kiểm tra yêu cầu, địa điểm, thời hạn và kênh ứng tuyển của từng vị trí. Không gửi giấy tờ định danh hoặc hồ sơ ứng tuyển qua biểu mẫu tư vấn.",
          "Check the requirements, location, deadline and application channel for each role. Do not use the consultation form to send identity documents or applications.",
          "请核对每个职位的要求、地点、截止日期及申请渠道。请勿通过咨询表单发送身份证件或求职材料。",
        ],
      ],
    ],
  },
  articles: {
    title: [
      "Chuẩn bị trước khi tìm câu trả lời",
      "Prepare before looking for answers",
      "在寻找答案前做好准备",
    ],
    intro: [
      "Hướng dẫn thực hành để trình bày vấn đề rõ ràng hơn. Nội dung này không đưa ra kết luận pháp lý cho vụ việc cụ thể.",
      "Practical guidance for explaining a matter clearly. This content does not provide a legal conclusion for a specific case.",
      "以下实用建议帮助您清晰说明问题，不对具体案件作出法律结论。",
    ],
    cards: [
      [
        [
          "Viết bản tóm tắt trong một trang",
          "Write a one-page brief",
          "撰写一页事项概要",
        ],
        [
          "Ghi lại ai liên quan, chuyện gì đã xảy ra, điều bạn muốn đạt được và ngày cần phản hồi. Tách sự kiện có tài liệu chứng minh khỏi nhận định cá nhân.",
          "Note who is involved, what happened, the outcome you want and any response date. Separate documented facts from personal interpretations.",
          "记录相关人员、已发生事项、期望结果及回复日期，区分有材料支持的事实与个人判断。",
        ],
      ],
      [
        [
          "Lập danh mục tài liệu",
          "Create a document inventory",
          "建立文件清单",
        ],
        [
          "Ghi tên tài liệu, ngày lập, người gửi và phiên bản. Đánh dấu bản đã ký, bản dự thảo và tài liệu chưa có; chỉ chia sẻ qua kênh đã thống nhất.",
          "Record each document’s title, date, sender and version. Mark signed copies, drafts and missing items; share only through an agreed channel.",
          "记录文件名称、日期、发送人及版本，标注签署件、草案及缺失材料，仅通过约定渠道分享。",
        ],
      ],
      [
        [
          "Đọc thông tin trên mạng có đối chiếu",
          "Read online information in context",
          "结合背景核对网络信息",
        ],
        [
          "Xem tác giả, nguồn trích dẫn và thời điểm cập nhật. Một bài viết có chủ đề tương tự chưa chắc áp dụng cho hồ sơ của bạn; ghi lại câu hỏi để trao đổi.",
          "Check the author, cited sources and update date. An article on a similar topic may not apply to your circumstances; note questions for discussion.",
          "查看作者、引用来源及更新日期。相似主题的文章未必适用于您的情况，请记录疑问以便沟通。",
        ],
      ],
    ],
  },
};
