import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CmsImage } from "./cms-image";
import { getRecords } from "@/lib/cms";
import { t, type Locale } from "@/lib/content";

/**
 * Các luật sư của công ty: ảnh, chức danh và thông tin nghề nghiệp đã xác nhận.
 *
 * Người tìm luật sư muốn biết trước ai sẽ làm việc với mình. Trước đây trang
 * chủ chỉ có một ô chữ dẫn sang trang Đội ngũ, còn trang Về chúng tôi không nhắc
 * tới luật sư nào — trong khi lý lịch của chính các luật sư là điều khác biệt
 * nhất mà công ty có thể nói một cách xác thực.
 *
 * Chỉ hiện hồ sơ ĐÃ XUẤT BẢN có vai trò luật sư, theo thứ tự công ty nêu
 * (people-order.ts). Chưa có hồ sơ nào thì không hiện gì.
 */
export async function LawyerHighlights({
  locale,
  index,
  className = "lawyer-highlights",
  stacked = false,
  cta = false,
}: {
  locale: Locale;
  /** Số thứ tự mục kiểu trang chủ ("04"); bỏ trống ở trang khác. */
  index?: string;
  className?: string;
  /** Xếp dọc từng người — dùng trong cột nội dung hẹp. */
  stacked?: boolean;
  /** Thêm nút gửi yêu cầu tư vấn ngay dưới danh sách. */
  cta?: boolean;
}) {
  const lawyers = (await getRecords("lawyers", locale)).filter(
    (record) => (record as { role?: string }).role !== "specialist",
  );
  if (!lawyers.length) return null;
  const headingId = `lawyer-highlights-${index ?? "list"}`;
  return (
    <section
      className={`${className} lawyer-highlights${stacked ? " stacked" : ""}`}
      aria-labelledby={headingId}
    >
      {index && (
        <div className="section-index">
          <span>{index}</span>
          <span>{t(locale, "Đội ngũ luật sư", "Our lawyers")}</span>
        </div>
      )}
      <h2 id={headingId}>{t(locale, "Luật sư của Vũ Khang", "Our lawyers")}</h2>
      <div className="lawyer-highlights-grid">
        {lawyers.map((record) => (
          <Link
            className="lawyer-highlight"
            href={`/${locale}/lawyers/${record.slug}`}
            key={record.id}
          >
            <div className="person-photo">
              {record.portrait?.url && (
                <CmsImage
                  media={record.portrait}
                  fallbackAlt={record.title}
                  sizes="(max-width: 700px) 30vw, 170px"
                />
              )}
            </div>
            <div className="lawyer-highlight-text">
              <p className="person-role">{record.position}</p>
              <h3>{record.title}</h3>
              {record.qualifications && <p>{record.qualifications}</p>}
              <span className="underlined">
                {t(locale, "Xem hồ sơ", "View profile")}
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {cta && (
        <Link className="button red" href={`/${locale}/consultation`}>
          {t(locale, "Gửi yêu cầu tư vấn", "Request a consultation")}
          <ArrowUpRight size={19} />
        </Link>
      )}
    </section>
  );
}
