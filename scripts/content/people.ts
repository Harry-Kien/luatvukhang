/**
 * Hồ sơ nhân sự MINH HỌA, ba ngôn ngữ.
 *
 * Mục đích: công ty nhìn thấy trước bố cục trang Đội ngũ, thử bộ lọc chuyên môn
 * và chỉnh sửa trực tiếp trong CMS thay vì phải tạo từ con số không.
 *
 * Toàn bộ bản ghi được nạp với cờ `isSample` — hệ thống chặn xuất bản nội dung
 * minh họa, và website chỉ hiển thị chúng khi còn ở chế độ demo.
 *
 * KHÔNG BỊA THÔNG TIN NGHỀ NGHIỆP. Trường `qualifications` cố ý để lại câu
 * nhắc việc thay vì số thẻ luật sư hay đoàn luật sư giả: một hồ sơ hành nghề
 * sai sự thật trên website công ty luật là rủi ro nghề nghiệp, không phải nội
 * dung mẫu. Phần mô tả chỉ nói về lĩnh vực phụ trách và cách làm việc, không
 * nêu số năm kinh nghiệm, giải thưởng, khách hàng hay kết quả vụ việc.
 */
export type Localised = { vi: string; en: string; zh: string };
export type Section = { heading: Localised; body: Localised };
export type SamplePerson = {
  slug: string;
  /** Danh từ riêng: giữ nguyên ở cả ba ngôn ngữ. */
  name: string;
  position: Localised;
  summary: Localised;
  languages: Localised;
  /** Liên kết tới bộ sưu tập services theo slug. */
  serviceSlugs: string[];
  sections: Section[];
};

/** Câu nhắc thay cho thông tin hành nghề — không dựng số thẻ luật sư giả. */
export const qualificationsPlaceholder: Localised = {
  vi: "Cần điền: số thẻ luật sư, đoàn luật sư, năm được cấp và nền tảng đào tạo đã xác minh.",
  en: "To be completed: bar card number, bar association, year admitted and verified education.",
  zh: "待填写：律师执业证号、所属律师协会、取得执业资格年份及已核实的教育背景。",
};

export const samplePeople: SamplePerson[] = [
  {
    slug: "mau-luat-su-dieu-hanh",
    name: "Vũ Minh Khang",
    position: {
      vi: "Luật sư điều hành",
      en: "Managing partner",
      zh: "执行合伙人",
    },
    summary: {
      vi: "Phụ trách định hướng chuyên môn chung và chất lượng công việc bàn giao cho khách hàng. Tham gia trực tiếp vào các vấn đề đầu tư và cơ cấu doanh nghiệp.",
      en: "Responsible for the firm's overall professional direction and the quality of work delivered to clients. Works directly on investment and corporate structuring matters.",
      zh: "负责事务所整体专业方向及交付给客户的工作质量，并直接参与投资与企业架构事务。",
    },
    languages: {
      vi: "Tiếng Việt, English",
      en: "Vietnamese, English",
      zh: "越南语、英语",
    },
    serviceSlugs: ["dau-tu-doanh-nghiep", "hop-dong-thuong-mai"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Bắt đầu từ mục tiêu thương mại của khách hàng rồi mới đến cấu trúc pháp lý, để phương án đưa ra vận hành được trên thực tế chứ không chỉ đúng trên giấy tờ.",
          en: "Starts from the client's commercial objective before turning to legal structure, so that what is proposed can actually be operated rather than merely being correct on paper.",
          zh: "先从客户的商业目标出发，再考虑法律架构，使方案在实务中真正可行，而不仅是纸面上正确。",
        },
      },
      {
        heading: {
          vi: "Phạm vi phụ trách",
          en: "Areas of responsibility",
          zh: "负责范围",
        },
        body: {
          vi: "Rà soát cơ cấu sở hữu, văn kiện nội bộ và các giao dịch có yếu tố đầu tư. Điều phối nhóm làm việc khi vấn đề trải rộng nhiều lĩnh vực.",
          en: "Reviews ownership structures, internal instruments and transactions with an investment element. Coordinates the team when a matter spans several practice areas.",
          zh: "审查股权架构、内部文件及涉及投资的交易；当事项跨越多个专业领域时负责协调团队。",
        },
      },
    ],
  },
  {
    slug: "mau-luat-su-thanh-vien-doanh-nghiep",
    name: "Nguyễn Thị Lan Anh",
    position: {
      vi: "Luật sư thành viên",
      en: "Partner",
      zh: "合伙人",
    },
    summary: {
      vi: "Tập trung vào thủ tục đầu tư, đăng ký doanh nghiệp và nghĩa vụ tuân thủ định kỳ của doanh nghiệp có vốn nước ngoài.",
      en: "Focuses on investment procedures, enterprise registration and the recurring compliance obligations of foreign-invested businesses.",
      zh: "专注于投资手续、企业登记，以及外商投资企业的定期合规义务。",
    },
    languages: {
      vi: "Tiếng Việt, English",
      en: "Vietnamese, English",
      zh: "越南语、英语",
    },
    serviceSlugs: ["dau-tu-doanh-nghiep", "thue-tai-chinh"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Đối chiếu điều kiện áp dụng ngay từ đầu và nêu rõ mốc thời gian dự kiến, để khách hàng biết hồ sơ cần chuẩn bị trước khi bắt đầu thủ tục.",
          en: "Checks the applicable conditions at the outset and sets out the likely timeline, so clients know what to prepare before a procedure begins.",
          zh: "在起步阶段即核对适用条件并说明预计时间节点，使客户在启动手续前清楚需要准备哪些材料。",
        },
      },
    ],
  },
  {
    slug: "mau-luat-su-thanh-vien-tranh-chap",
    name: "Trần Quốc Bảo",
    position: {
      vi: "Luật sư thành viên",
      en: "Partner",
      zh: "合伙人",
    },
    summary: {
      vi: "Phụ trách đánh giá hồ sơ tranh chấp, chuẩn bị phương án thương lượng và tài liệu phục vụ giải quyết tại cơ quan có thẩm quyền.",
      en: "Handles the assessment of disputed matters, preparation of negotiation strategies and the documents required for resolution before the competent authority.",
      zh: "负责争议案件的评估、谈判方案的准备，以及向主管机关提交解决所需的文件。",
    },
    languages: { vi: "Tiếng Việt", en: "Vietnamese", zh: "越南语" },
    serviceSlugs: ["giai-quyet-tranh-chap", "hop-dong-thuong-mai"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Đánh giá điểm mạnh và điểm yếu của hồ sơ trước khi bàn tới phương án, để khách hàng cân nhắc giữa thương lượng và theo đuổi thủ tục trên cơ sở thông tin đầy đủ.",
          en: "Assesses the strengths and weaknesses of a file before discussing strategy, so the client can weigh negotiation against formal proceedings on a full picture.",
          zh: "在讨论方案之前先评估案件材料的强项与弱点，使客户能在信息充分的基础上权衡谈判与正式程序。",
        },
      },
    ],
  },
  {
    slug: "mau-luat-su-cap-cao-so-huu-tri-tue",
    name: "Lê Thu Hương",
    position: {
      vi: "Luật sư cấp cao",
      en: "Senior associate",
      zh: "高级律师",
    },
    summary: {
      vi: "Làm việc với tài sản sở hữu trí tuệ, hợp đồng công nghệ và các vấn đề pháp lý phát sinh từ hoạt động xử lý dữ liệu.",
      en: "Works on intellectual property assets, technology contracts and the legal questions arising from data processing activities.",
      zh: "处理知识产权资产、技术合同，以及数据处理活动所引发的法律问题。",
    },
    languages: {
      vi: "Tiếng Việt, English",
      en: "Vietnamese, English",
      zh: "越南语、英语",
    },
    serviceSlugs: ["so-huu-tri-tue", "hop-dong-thuong-mai"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Bắt đầu bằng việc xác định doanh nghiệp đang nắm giữ tài sản trí tuệ nào và quyền đó đứng tên ai, vì phần lớn vướng mắc về sau bắt nguồn từ hai câu hỏi này.",
          en: "Begins by establishing which intellectual assets the business holds and in whose name those rights stand, since most later difficulties trace back to these two questions.",
          zh: "首先确认企业持有哪些知识产权资产、这些权利登记在谁名下——日后多数纠纷都源于这两个问题。",
        },
      },
    ],
  },
  {
    slug: "mau-luat-su-lao-dong-bat-dong-san",
    name: "Phạm Hoàng Nam",
    position: {
      vi: "Luật sư",
      en: "Associate",
      zh: "律师",
    },
    summary: {
      vi: "Hỗ trợ các vấn đề quan hệ lao động, nội quy và hồ sơ nhân sự, cùng thủ tục liên quan đến quyền sử dụng đất và giao dịch bất động sản.",
      en: "Supports employment relations, internal rules and personnel records, together with procedures relating to land use rights and real estate transactions.",
      zh: "协助处理劳动关系、内部规章与人事档案，以及与土地使用权和房地产交易相关的手续。",
    },
    languages: { vi: "Tiếng Việt", en: "Vietnamese", zh: "越南语" },
    serviceSlugs: ["lao-dong-nhan-su", "dat-dai-bat-dong-san"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Rà soát hồ sơ hiện có trước khi đề xuất thay đổi, vì nhiều vướng mắc lao động và đất đai xuất phát từ giấy tờ đã ký chứ không từ quy định.",
          en: "Reviews the existing paperwork before proposing changes, since many employment and land difficulties originate in documents already signed rather than in the rules.",
          zh: "在提出修改建议前先审查现有文件，因为许多劳动与土地方面的问题源于已签署的文件，而非规定本身。",
        },
      },
    ],
  },
  {
    slug: "mau-luat-su-gia-dinh-hinh-su",
    name: "Đỗ Khánh Linh",
    position: {
      vi: "Luật sư",
      en: "Associate",
      zh: "律师",
    },
    summary: {
      vi: "Đồng hành trong các vấn đề hôn nhân, gia đình và thừa kế, cùng việc bảo vệ quyền lợi hợp pháp trong quá trình tố tụng hình sự.",
      en: "Assists with marriage, family and inheritance matters, and with protecting lawful rights and interests during criminal proceedings.",
      zh: "协助处理婚姻、家庭与继承事务，并在刑事诉讼过程中维护当事人的合法权益。",
    },
    languages: { vi: "Tiếng Việt", en: "Vietnamese", zh: "越南语" },
    serviceSlugs: ["hon-nhan-gia-dinh", "hinh-su"],
    sections: [
      {
        heading: {
          vi: "Cách tiếp cận công việc",
          en: "Approach to the work",
          zh: "工作方式",
        },
        body: {
          vi: "Giữ trao đổi ở mức bình tĩnh và rõ ràng, nêu đúng những gì có thể và chưa thể xác định trước khi xem hồ sơ, đồng thời tôn trọng quyết định của người trong cuộc.",
          en: "Keeps the conversation calm and clear, stating plainly what can and cannot be determined before the papers are reviewed, and respecting the decisions of those involved.",
          zh: "保持沟通冷静清晰，如实说明在查阅材料前哪些可以确定、哪些尚不能确定，并尊重当事人自己的决定。",
        },
      },
    ],
  },
];
