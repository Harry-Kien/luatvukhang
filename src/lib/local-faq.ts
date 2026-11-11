import type { Locale } from "./content";
import {
  contactChannels,
  mainZalo,
  zaloChannels,
  type ZaloNumber,
} from "./contact";
import { officeLandmark } from "./local-area";

/**
 * Hỏi đáp ở cuối trang chủ: những câu người ta hỏi Google và trợ lý AI khi
 * tìm luật sư ở Đồng Nai ("văn phòng ở đâu", "liên hệ thế nào", "nhận việc gì",
 * "luật sư là ai"). Câu trả lời dựng từ Cài đặt và các bản ghi ĐÃ XUẤT BẢN, nên
 * đổi số điện thoại hay thêm luật sư trong admin là câu trả lời đổi theo.
 *
 * Không đưa vào điều công ty chưa xác nhận (phí tư vấn, ngôn ngữ làm việc, thời
 * gian phản hồi). Câu nào thiếu dữ liệu thì bỏ, không trả lời chung chung.
 */
export type LocalFaqInput = {
  locale: Locale;
  settings?: {
    address?: string | null;
    phone?: string | null;
    zaloPrimary?: string | null;
    email?: string | null;
    zaloNumbers?: ZaloNumber[] | null;
  } | null;
  services: { title: string }[];
  /** Hồ sơ đã xuất bản; chỉ người có vai trò luật sư được nêu tên. */
  people: { title: string; position?: string | null; role?: string | null }[];
};
export type FaqEntry = { question: string; answer: string };

const pick = (locale: Locale, vi: string, en: string, zh: string) =>
  locale === "en" ? en : locale === "zh" ? zh : vi;

export function buildLocalFaq({
  locale,
  settings,
  services,
  people,
}: LocalFaqInput): FaqEntry[] {
  const faq: FaqEntry[] = [];
  const address = settings?.address?.trim();
  if (address)
    faq.push({
      question: pick(
        locale,
        "Văn phòng Luật Vũ Khang ở đâu tại Đồng Nai?",
        "Where is the Vũ Khang office in Đồng Nai?",
        "Vũ Khang 律师事务所在同奈的什么位置？",
      ),
      answer: pick(
        locale,
        `Văn phòng ở ${address} — ${officeLandmark.vi}. Lịch gặp luật sư được xác nhận sau khi bạn liên hệ qua điện thoại, Zalo hoặc biểu mẫu trên website.`,
        `The office is at ${address}, in ${officeLandmark.en}. A meeting with a lawyer is confirmed after you contact us by phone, Zalo or the form on this website.`,
        `办公室地址：${address}，位于${officeLandmark.zh}。通过电话、Zalo 或网站表单联系后，再确认与律师会面的时间。`,
      ),
    });

  const main = contactChannels(settings?.phone);
  const zaloList = zaloChannels(mainZalo(settings), settings?.zaloNumbers);
  // Số nút Gọi cũng là một số Zalo thì nói gọn trong cùng một ý.
  const mainOnZalo = zaloList.some((channel) => channel.zalo === main?.zalo);
  const extraZalo = zaloList
    .filter((channel) => channel.zalo !== main?.zalo)
    .map((channel) => channel.display);
  const email = settings?.email?.trim();
  if (main || email) {
    const parts = [
      main &&
        (mainOnZalo
          ? pick(
              locale,
              `gọi ${main.display} (số này cũng nhắn Zalo được)`,
              `call ${main.display} (also on Zalo)`,
              `致电 ${main.display}（也可通过 Zalo 联系）`,
            )
          : pick(
              locale,
              `gọi ${main.display}`,
              `call ${main.display}`,
              `致电 ${main.display}`,
            )),
      extraZalo.length &&
        pick(
          locale,
          `nhắn Zalo ${extraZalo.join(", ")}`,
          `message us on Zalo at ${extraZalo.join(", ")}`,
          `通过 Zalo 联系 ${extraZalo.join("、")}`,
        ),
      email &&
        pick(
          locale,
          `gửi email ${email}`,
          `email ${email}`,
          `发送邮件至 ${email}`,
        ),
    ].filter(Boolean) as string[];
    faq.push({
      question: pick(
        locale,
        "Liên hệ luật sư Vũ Khang bằng cách nào?",
        "How do I contact a Vũ Khang lawyer?",
        "如何联系 Vũ Khang 律师？",
      ),
      answer: pick(
        locale,
        `Bạn có thể ${parts.join(", ")}, hoặc gửi yêu cầu ở trang Liên hệ — mã tham chiếu hiện ngay trên màn hình.`,
        `You can ${parts.join(", ")}, or send a request on the Contact page — a reference number appears on screen straight away.`,
        `您可以${parts.join("、")}，或在“联系我们”页面提交申请——提交后屏幕上会立即显示参考编号。`,
      ),
    });
  }

  if (services.length) {
    const titles = services.map((service) => service.title);
    faq.push({
      question: pick(
        locale,
        "Luật Vũ Khang nhận những loại vụ việc nào?",
        "What kinds of matters does Vũ Khang handle?",
        "Vũ Khang 承办哪些类型的事务？",
      ),
      answer: pick(
        locale,
        `Các lĩnh vực: ${titles.join(", ")}. Mỗi lĩnh vực có trang riêng nêu phạm vi hỗ trợ, quy trình và câu hỏi thường gặp.`,
        `Practice areas: ${titles.join(", ")}. Each has its own page setting out the scope of support, the process and common questions.`,
        `业务领域：${titles.join("、")}。每个领域均有单独页面，说明服务范围、流程与常见问题。`,
      ),
    });
  }

  const lawyers = people.filter(
    (person) => person.role !== "specialist" && person.position,
  );
  if (lawyers.length)
    faq.push({
      question: pick(
        locale,
        "Những luật sư nào làm việc tại Vũ Khang?",
        "Which lawyers work at Vũ Khang?",
        "哪些律师在 Vũ Khang 执业？",
      ),
      answer:
        lawyers
          .map((person) =>
            pick(
              locale,
              `Luật sư ${person.title} — ${person.position}`,
              `${person.title} — ${person.position}`,
              `${person.title} 律师——${person.position}`,
            ),
          )
          .join(pick(locale, "; ", "; ", "；")) + pick(locale, ".", ".", "。"),
    });

  // Người tìm "công ty luật uy tín" cần biết cách tự kiểm tra. Câu trả lời
  // chỉ nêu điều Luật Luật sư quy định, không tự khen và không hứa kết quả.
  faq.push({
    question: pick(
      locale,
      "Làm sao biết một công ty luật ở Đồng Nai hoạt động hợp pháp và đáng tin cậy?",
      "How can I tell whether a law firm in Đồng Nai is properly licensed and trustworthy?",
      "如何判断同奈的律师事务所是否合法执业、值得信赖？",
    ),
    answer: pick(
      locale,
      "Theo Luật Luật sư, công ty luật phải được Sở Tư pháp nơi đặt trụ sở cấp Giấy đăng ký hoạt động, và người trực tiếp tư vấn phải là luật sư có Chứng chỉ hành nghề, là thành viên một Đoàn luật sư và có Thẻ luật sư. Bạn có quyền đề nghị xem các giấy tờ này, yêu cầu hợp đồng dịch vụ pháp lý bằng văn bản ghi rõ công việc và thù lao, và nên thận trọng với lời hứa chắc chắn thắng kiện. Hồ sơ từng luật sư của Vũ Khang có trên trang Đội ngũ.",
      "Under the Law on Lawyers, a law firm must hold a certificate of registration issued by the Department of Justice where it is based, and the person advising you must be a lawyer with a practising certificate, a member of a bar association and holder of a lawyer's card. You may ask to see these documents and ask for a written legal services contract setting out the work and the fees; be wary of any promise of a guaranteed win. Profiles of Vũ Khang's lawyers are on the Team page.",
      "根据越南《律师法》，律师事务所须取得所在地司法厅颁发的执业登记证，为您提供咨询的人须为持有执业证书、隶属某一律师协会并持有律师证的律师。您有权要求查看上述文件，并要求签订载明工作内容和费用的书面法律服务合同；对“保证胜诉”的承诺应保持谨慎。Vũ Khang 各位律师的简介可在“团队”页面查看。",
    ),
  });

  faq.push({
    question: pick(
      locale,
      "Gửi yêu cầu tư vấn đã là đặt lịch với luật sư chưa?",
      "Does sending a request book an appointment with a lawyer?",
      "提交咨询申请是否等于预约了律师？",
    ),
    answer: pick(
      locale,
      "Chưa. Gửi yêu cầu chưa đồng nghĩa với xác nhận lịch hẹn hay thiết lập quan hệ luật sư–khách hàng; nhân viên tiếp nhận sẽ liên hệ riêng để xác nhận.",
      "No. Sending a request does not confirm an appointment or establish a lawyer–client relationship; a member of the team will contact you separately to confirm.",
      "不是。提交申请并不代表预约已确认，也不构成律师与客户关系；工作人员会另行联系您确认。",
    ),
  });
  return faq;
}
