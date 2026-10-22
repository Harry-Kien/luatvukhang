import { ArrowUpRight } from "lucide-react";
import { FIRM_MEMBER, type EcosystemMember } from "@/lib/ecosystem";
import { t, type Locale } from "@/lib/content";

/**
 * Logo trong ô trắng bo góc kiểu biểu tượng ứng dụng: rõ trên cả nền tối.
 * Thành viên có website thì cả thẻ là liên kết mở tab mới, có mũi tên ↗ và tên
 * miền để người xem biết mình sắp rời website công ty luật.
 *
 * Danh sách thành viên do công ty sửa trong admin: Cài đặt → "Hệ sinh thái".
 */
function Member({
  member,
  locale,
  className,
  detailed = false,
}: {
  member: EcosystemMember;
  locale: Locale;
  className: string;
  /** Thêm câu giới thiệu và tên miền — dùng cho thẻ ở trang Về chúng tôi. */
  detailed?: boolean;
}) {
  const body = (
    <>
      <span className="ecosystem-icon">
        <img src={member.logo} alt="" width={96} height={96} loading="lazy" />
      </span>
      <span className="ecosystem-text">
        <strong>{member.name}</strong>
        {member.role && <small>{member.role}</small>}
        {detailed && member.summary && <span>{member.summary}</span>}
        {detailed && member.site && (
          <span className="ecosystem-site">{member.site}</span>
        )}
      </span>
      {member.href && (
        <ArrowUpRight className="ecosystem-arrow" size={18} aria-hidden />
      )}
    </>
  );
  if (!member.href) return <div className={className}>{body}</div>;
  const label = `${member.name} — ${member.site ?? member.href} (${t(
    locale,
    "mở trong tab mới",
    "opens in a new tab",
  )})`;
  return (
    <a
      className={className}
      href={member.href}
      rel="noopener"
      target="_blank"
      aria-label={label}
      title={label}
    >
      {body}
    </a>
  );
}

/** Dải "Hệ sinh thái" ở chân trang mọi trang — như các tập đoàn gắn logo thành viên. */
export function EcosystemStrip({
  locale,
  members,
}: {
  locale: Locale;
  members?: EcosystemMember[] | null;
}) {
  if (!members?.length) return null;
  return (
    <div className="footer-ecosystem">
      <span className="footer-ecosystem-label">
        {t(locale, "Hệ sinh thái Luật Vũ Khang", "Vũ Khang Law ecosystem")}
      </span>
      <ul>
        {members.map((member) => (
          <li key={member.key}>
            <Member
              member={member}
              locale={locale}
              className="ecosystem-chip"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mục giới thiệu hệ sinh thái trên trang Về chúng tôi: công ty luật đứng đầu. */
export function EcosystemSection({
  locale,
  members,
  firmName,
}: {
  locale: Locale;
  members?: EcosystemMember[] | null;
  firmName: string;
}) {
  if (!members?.length) return null;
  const firm: EcosystemMember = {
    ...FIRM_MEMBER,
    name: firmName,
    role: FIRM_MEMBER.role[locale],
    summary: FIRM_MEMBER.summary[locale],
  };
  return (
    <section className="ecosystem-section" aria-labelledby="ecosystem-heading">
      <h2 id="ecosystem-heading">
        {t(locale, "Hệ sinh thái Luật Vũ Khang", "Vũ Khang Law ecosystem")}
      </h2>
      <p>
        {t(
          locale,
          "Hệ sinh thái Luật Vũ Khang gồm công ty luật và các thành viên dưới đây.",
          "The Vũ Khang Law ecosystem brings together the law firm and the members below.",
        )}
      </p>
      <div className="ecosystem-grid">
        {[firm, ...members].map((member) => (
          <Member
            key={member.key}
            member={member}
            locale={locale}
            className="ecosystem-card"
            detailed
          />
        ))}
      </div>
    </section>
  );
}
