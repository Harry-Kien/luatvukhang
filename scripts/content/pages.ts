/**
 * Nội dung dự thảo cho các trang nền, ba ngôn ngữ.
 *
 * Chỉ viết về cách làm việc, quy trình và giới hạn dịch vụ — không nêu số năm
 * kinh nghiệm, quy mô đội ngũ, giải thưởng hay khách hàng, vì đó là những
 * khẳng định chỉ công ty mới xác nhận được.
 */
export type Localised = { vi: string; en: string; zh: string };
export type Section = { heading: Localised; body: Localised };
export type PageContent = {
  slug: string;
  summary: Localised;
  sections: Section[];
};

export const pageContent: PageContent[] = [
  {
    slug: "about",
    summary: {
      vi: "Vũ Khang làm việc với những vấn đề pháp lý phát sinh từ hoạt động kinh doanh và đời sống thực tế — nơi câu trả lời đúng phụ thuộc vào bối cảnh nhiều như phụ thuộc vào quy định.",
      en: "Vũ Khang works on the legal questions that arise out of real business and personal circumstances — where the right answer depends on context as much as on the rules.",
      zh: "Vũ Khang处理源于真实经营与生活情境的法律问题——在这些问题上，正确答案既取决于规定，也同样取决于具体情境。",
    },
    sections: [
      {
        heading: {
          vi: "Bắt đầu từ vấn đề, không từ điều khoản",
          en: "Start with the problem, not the provision",
          zh: "从问题出发，而非从条文出发",
        },
        body: {
          vi: "Cùng một quy định có thể dẫn tới lời khuyên khác nhau tùy vào điều bạn đang cố đạt được. Vì vậy công việc bắt đầu bằng việc hiểu mục tiêu thương mại, ràng buộc về thời gian và mức rủi ro bạn chấp nhận được — rồi mới đến việc tra cứu và phân tích.",
          en: "The same rule can lead to different advice depending on what you are trying to achieve. So the work begins by understanding the commercial objective, the time constraints and the level of risk you can live with — and only then turns to research and analysis.",
          zh: "同一条规定，依据您想达成的目标不同，可能得出不同的建议。因此工作始于理解商业目标、时间限制与您可接受的风险程度，之后才进入检索与分析。",
        },
      },
      {
        heading: {
          vi: "Nói rõ điều chưa chắc chắn",
          en: "Say plainly what is uncertain",
          zh: "明确说明不确定之处",
        },
        body: {
          vi: "Không phải câu hỏi pháp lý nào cũng có câu trả lời dứt khoát. Khi thực tiễn áp dụng còn khác nhau hoặc hồ sơ chưa đủ, chúng tôi nói rõ điều đó thay vì đưa ra một kết luận chắc nịch mà bạn không kiểm chứng được. Bạn cần biết mình đang quyết định trên nền thông tin nào.",
          en: "Not every legal question has a definite answer. Where practice varies or the file is incomplete, we say so rather than offering a confident conclusion you have no way to test. You need to know what your decision actually rests on.",
          zh: "并非每个法律问题都有确定答案。当实践做法不一或材料不足时，我们会如实说明，而不是给出一个您无从验证的笃定结论。您需要知道自己的决定建立在什么基础之上。",
        },
      },
      {
        heading: {
          vi: "Phạm vi công việc được xác định trước",
          en: "Scope is agreed before work begins",
          zh: "工作范围事先确定",
        },
        body: {
          vi: "Trước khi bắt đầu, hai bên thống nhất bằng văn bản về phạm vi công việc, phí dịch vụ và người phụ trách. Buổi trao đổi ban đầu để xác định vấn đề và phương án — tự nó chưa thiết lập quan hệ luật sư–khách hàng và chưa phải là ý kiến pháp lý chính thức.",
          en: "Before work starts, the scope, the fee and the responsible lawyer are agreed in writing. An initial conversation exists to identify the issue and the options — it does not by itself create a lawyer–client relationship and is not a formal legal opinion.",
          zh: "工作开始前，双方将以书面形式就工作范围、服务费用与负责律师达成一致。初次沟通旨在明确问题与可选方案——其本身尚未建立律师与客户关系，也不构成正式法律意见。",
        },
      },
      {
        heading: {
          vi: "Thông tin bạn chia sẻ được giữ kín",
          en: "What you share stays confidential",
          zh: "您所提供的信息予以保密",
        },
        body: {
          vi: "Nghĩa vụ giữ bí mật thông tin của khách hàng là nguyên tắc nghề nghiệp, áp dụng cả khi hai bên cuối cùng không làm việc cùng nhau. Riêng với biểu mẫu trên website, xin đừng gửi tài liệu mật hay hồ sơ vụ việc chi tiết — hãy để dành cho kênh trao đổi trực tiếp sau đó.",
          en: "The duty of confidentiality is a professional obligation and applies even where the two sides do not end up working together. For the website form specifically, please do not send confidential documents or a detailed case file — keep those for the direct channel that follows.",
          zh: "保密义务是职业准则，即使双方最终未展开合作亦然。但就网站表单而言，请勿发送机密文件或详细案卷——请留待其后的直接沟通渠道。",
        },
      },
    ],
  },
  {
    slug: "contact",
    summary: {
      vi: "Gửi yêu cầu qua biểu mẫu hoặc liên hệ trực tiếp. Mô tả ngắn gọn vấn đề là đủ để bắt đầu — phần chi tiết sẽ trao đổi sau.",
      en: "Send an enquiry through the form or get in touch directly. A brief description of the matter is enough to start — the detail comes later.",
      zh: "可通过表单提交需求或直接联系。简要说明问题即可开始，细节可稍后沟通。",
    },
    sections: [
      {
        heading: {
          vi: "Nên chuẩn bị gì",
          en: "What to have ready",
          zh: "建议准备什么",
        },
        body: {
          vi: "Ba điều giúp buổi trao đổi đầu tiên hiệu quả: vấn đề bạn đang gặp, kết quả bạn mong muốn, và mốc thời gian nếu có. Nếu đã có văn bản liên quan, chỉ cần cho biết là có — chưa cần gửi kèm ngay.",
          en: "Three things make the first conversation productive: the problem you face, the outcome you want, and any deadline you are working to. If relevant documents exist, simply say so — there is no need to attach them yet.",
          zh: "三点有助于首次沟通更有成效：您面临的问题、期望达成的结果，以及是否有时间节点。若已有相关文件，说明有即可，暂无需一并发送。",
        },
      },
      {
        heading: {
          vi: "Sau khi gửi yêu cầu",
          en: "After you send an enquiry",
          zh: "提交需求之后",
        },
        body: {
          vi: "Bạn nhận được mã tham chiếu ngay trên màn hình để đối chiếu về sau. Nhân viên tiếp nhận sẽ liên hệ riêng để xác nhận. Việc gửi biểu mẫu chưa đồng nghĩa với đặt lịch thành công — lịch hẹn chỉ được xác nhận sau khi hai bên trao đổi.",
          en: "A reference appears on screen straight away so you can quote it later. A member of the team will then contact you separately to confirm. Submitting the form is not the same as booking an appointment — an appointment is confirmed only after we have spoken.",
          zh: "提交后屏幕上会立即显示参考编号，便于日后查询。随后将有工作人员单独与您联系确认。提交表单并不等于预约成功——预约须经双方沟通后方可确认。",
        },
      },
      {
        heading: {
          vi: "Đừng gửi thông tin nhạy cảm qua biểu mẫu",
          en: "Do not send sensitive information through the form",
          zh: "请勿通过表单发送敏感信息",
        },
        body: {
          vi: "Biểu mẫu trên website phù hợp để mô tả vấn đề ở mức khái quát. Tài liệu mật, giấy tờ định danh và hồ sơ vụ việc chi tiết nên được trao đổi qua kênh riêng sau khi đã xác nhận liên hệ.",
          en: "The website form is suited to describing a matter in general terms. Confidential documents, identity papers and detailed case files should go through a separate channel once contact has been confirmed.",
          zh: "网站表单适合概要描述问题。机密文件、身份证件与详细案卷宜在确认联系后通过单独渠道传送。",
        },
      },
    ],
  },
  {
    slug: "home",
    summary: {
      vi: "Góc nhìn pháp lý rõ ràng cho những quyết định quan trọng — từ hoạt động kinh doanh đến việc bảo vệ quyền và lợi ích của bạn.",
      en: "A clear legal perspective on the decisions that matter — from business operations to protecting your rights and interests.",
      zh: "为重要决策提供清晰的法律视角——从企业经营到您权益的保护。",
    },
    sections: [
      {
        heading: {
          vi: "Bắt đầu bằng một cuộc trao đổi",
          en: "It starts with a conversation",
          zh: "从一次沟通开始",
        },
        body: {
          vi: "Không cần chuẩn bị hồ sơ đầy đủ mới liên hệ được. Phần lớn công việc bắt đầu từ một mô tả ngắn về điều đang khiến bạn băn khoăn, và buổi trao đổi đầu tiên thường đủ để xác định vấn đề trọng tâm cùng những bước cần làm tiếp theo.",
          en: "You do not need a complete file before getting in touch. Most matters begin with a short description of what is troubling you, and a first conversation is usually enough to identify the central issue and the steps that follow.",
          zh: "无需备齐材料才能联系我们。多数事务始于对困扰您之事的简短描述，而首次沟通通常足以确定核心问题与后续步骤。",
        },
      },
    ],
  },
];

