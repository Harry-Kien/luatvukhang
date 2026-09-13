import {zhGuideSteps,zhGuideFaq} from "@/lib/zh-content";
import Link from "next/link";
import { JsonLd } from "./json-ld";
import { faqJsonLd } from "@/lib/seo";
import { PageHeading } from "./content";
import { t, type Locale } from "@/lib/content";
export function ClientGuide({ locale }: { locale: Locale }) {
  const steps = locale === "zh" ? zhGuideSteps : locale === "vi"
      ? [
          [
            "Chuẩn bị bối cảnh",
            "Ghi ngắn gọn vấn đề, mục tiêu và thời hạn cần lưu ý. Có thể chuẩn bị danh sách tài liệu đang có; chưa gửi hồ sơ mật qua biểu mẫu.",
          ],
          [
            "Gửi yêu cầu",
            "Nhập thông tin liên hệ và lĩnh vực quan tâm. Kiểm tra email, số điện thoại và đọc thông báo quyền riêng tư trước khi gửi.",
          ],
          [
            "Lưu mã tham chiếu",
            "Khi lưu thành công, hệ thống hiển thị mã tham chiếu. Mã này xác nhận tiếp nhận dữ liệu, chưa xác nhận lịch hẹn hoặc nhận vụ việc.",
          ],
          [
            "Thống nhất trước khi bắt đầu",
            "Trong cuộc trao đổi tiếp theo, làm rõ phạm vi hỗ trợ, người phụ trách, tài liệu cần thiết, phí và thời hạn. Công việc và lịch hẹn cần được xác nhận riêng.",
          ],
        ]
      : [
          [
            "Prepare the context",
            "Outline your matter, objectives and relevant deadlines. Prepare a document list, but do not send confidential files through the form.",
          ],
          [
            "Send an enquiry",
            "Enter your contact details and area of interest. Check your email and telephone number and read the privacy notice before submitting.",
          ],
          [
            "Keep your reference",
            "Once saved, the system displays a reference. This confirms receipt of the data, not an appointment or acceptance of the matter.",
          ],
          [
            "Agree before proceeding",
            "Discuss scope, responsibility, documents, fees and timing. Work and appointments must be confirmed separately.",
          ],
        ];
  const faq = locale === "zh" ? zhGuideFaq : locale === "vi"
      ? [
          [
            "Gửi biểu mẫu có nghĩa là đã đặt lịch thành công không?",
            "Chưa. Chỉ khi người tiếp nhận liên hệ và xác nhận thời gian thì lịch hẹn mới được thống nhất.",
          ],
          [
            "Tôi có nên gửi giấy tờ cá nhân hoặc hồ sơ vụ việc ngay không?",
            "Biểu mẫu dành cho mô tả ngắn, không có chức năng tải hồ sơ. Hãy thống nhất kênh chuyển tài liệu với người tiếp nhận trước khi gửi dữ liệu nhạy cảm.",
          ],
          [
            "Website có tự xác định phí dịch vụ không?",
            "Không. Phạm vi công việc và phí cần được trao đổi riêng; việc gửi yêu cầu không thể hiện rằng bạn đã chấp thuận một mức phí.",
          ],
          [
            "Nếu gửi không thành công thì làm thế nào?",
            "Giữ nguyên nội dung trên màn hình, kiểm tra kết nối và thông báo lỗi rồi thử lại. Chỉ coi là đã tiếp nhận khi hệ thống hiển thị mã tham chiếu.",
          ],
          [
            "Tôi cần xử lý việc có thời hạn gấp thì sao?",
            "Nêu rõ thời hạn trong mô tả. Không dựa vào việc gửi biểu mẫu để cho rằng công ty đã nhận xử lý hoặc thời hạn được gia hạn.",
          ],
          [
            "Có thể xem trước chính sách xử lý thông tin không?",
            "Có. Liên kết quyền riêng tư và điều khoản nằm ngay trước ô đồng ý trên biểu mẫu và ở cuối mỗi trang.",
          ],
        ]
      : [
          [
            "Does submission confirm an appointment?",
            "No. An appointment is agreed only after a member of the team contacts you and confirms the time.",
          ],
          [
            "Should I send identity documents or case files now?",
            "The form is for a brief description and does not accept uploads. Agree on a suitable channel before sending sensitive documents.",
          ],
          [
            "Does the website determine service fees?",
            "No. Scope and fees require a separate discussion. Submitting a request does not indicate acceptance of a fee.",
          ],
          [
            "What if submission fails?",
            "Keep the entered information, check your connection and the error message, then retry. Receipt is confirmed only when the system displays a reference.",
          ],
          [
            "What about urgent deadlines?",
            "Mention the deadline in your description. Submitting a form does not mean the firm has accepted the matter or that a deadline is extended.",
          ],
          [
            "Can I read the privacy notice first?",
            "Yes. Privacy and terms links appear before the consent checkbox and in the footer.",
          ],
        ];
  return (
    <>
      <JsonLd
        data={faqJsonLd(faq.map(([question, answer]) => ({ question, answer })))}
      />
      <PageHeading
        locale={locale}
        path={`/${locale}/guide`}
        title={t(locale, "Hướng dẫn khách hàng", "Client guide")}
        summary={t(
          locale,
          "Rõ ràng từ bước chuẩn bị đến xác nhận phạm vi công việc.",
          "Clarity from preparing your enquiry to agreeing the scope of work.",
        )}
      />
      <section className="section content-grid">
        <article className="article-body">
          <h2>
            {t(locale, "Bắt đầu một yêu cầu tư vấn", "Starting an enquiry")}
          </h2>
          <ol className="detail-process">
            {steps.map(([title, body]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <h2>
            {t(locale, "Những điều cần biết", "Frequently asked questions")}
          </h2>
          <div className="faq-list">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </article>
        <aside className="sidebar">
          <span className="eyebrow dark">Công ty Luật Vũ Khang Solutions & Partners</span>
          <h2>{t(locale, "Bạn đã sẵn sàng trao đổi?", "Ready to talk?")}</h2>
          <p>
            {t(
              locale,
              "Chia sẻ ngắn nhu cầu để bắt đầu bước tiếp nhận.",
              "Briefly describe your needs to start the enquiry process.",
            )}
          </p>
          <Link className="button red" href={`/${locale}/consultation`}>
            {t(locale, "Gửi yêu cầu", "Send an enquiry")} ↗
          </Link>
          <p>
            <Link href={`/${locale}/privacy`}>
              {t(locale, "Quyền riêng tư", "Privacy")}
            </Link>
            {" · "}
            <Link href={`/${locale}/terms`}>
              {t(locale, "Điều khoản", "Terms")}
            </Link>
          </p>
        </aside>
      </section>
    </>
  );
}
