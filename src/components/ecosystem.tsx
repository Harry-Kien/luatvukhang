import { ECOSYSTEM, type EcosystemMember } from "@/lib/ecosystem";
import { t, type Locale } from "@/lib/content";

/** Logo trong ô trắng bo góc kiểu biểu tượng ứng dụng: rõ trên cả nền tối. */
function Member({
  member,
  locale,
  className,
}: {
  member: EcosystemMember;
  locale: Locale;
  className: string;
}) {
  const body = (
    <>
      <span className="ecosystem-icon">
        <img src={member.logo} alt="" width={96} height={96} loading="lazy" />
      </span>
      <span className="ecosystem-text">
        <strong>{member.name}</strong>
        <small>{member.role[locale]}</small>
      </span>
    </>
  );
  return member.href ? (
    <a className={className} href={member.href} rel="noopener" target="_blank">
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Dải "Hệ sinh thái" ở chân trang mọi trang — như các tập đoàn gắn logo thành viên. */
export function EcosystemStrip({ locale }: { locale: Locale }) {
  const members = ECOSYSTEM.filter((member) => !member.self);
  if (!members.length) return null;
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

/** Mục giới thiệu hệ sinh thái trên trang Về chúng tôi. */
export function EcosystemSection({ locale }: { locale: Locale }) {
  return (
    <section className="ecosystem-section" aria-labelledby="ecosystem-heading">
      <h2 id="ecosystem-heading">
        {t(locale, "Hệ sinh thái Luật Vũ Khang", "Vũ Khang Law ecosystem")}
      </h2>
      <p>
        {t(
          locale,
          "Hệ sinh thái Luật Vũ Khang gồm công ty luật và ứng dụng Luật Việt.",
          "The Vũ Khang Law ecosystem brings together the law firm and the Luật Việt app.",
        )}
      </p>
      <div className="ecosystem-grid">
        {ECOSYSTEM.map((member) => (
          <Member
            key={member.key}
            member={member}
            locale={locale}
            className="ecosystem-card"
          />
        ))}
      </div>
    </section>
  );
}
