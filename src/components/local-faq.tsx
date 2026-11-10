import { getRecords } from "@/lib/cms";
import { getSiteSettings } from "@/lib/site-settings";
import { buildLocalFaq } from "@/lib/local-faq";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import type { Locale } from "@/lib/content";

const HEADING = {
  vi: "Câu hỏi thường gặp về Luật Vũ Khang tại Đồng Nai",
  en: "Common questions about Vũ Khang in Đồng Nai",
  zh: "关于同奈 Vũ Khang 律师事务所的常见问题",
} as const;
const INDEX = { vi: "Hỏi đáp", en: "Questions", zh: "常见问题" } as const;

/**
 * Hỏi đáp cuối trang chủ, kèm FAQPage cho công cụ tìm kiếm và trợ lý AI. Nội
 * dung xem lib/local-faq.ts.
 */
export async function LocalFaq({
  locale,
  index,
}: {
  locale: Locale;
  index: string;
}) {
  const [settings, services, people] = await Promise.all([
    getSiteSettings(locale).catch(() => null),
    getRecords("services", locale),
    getRecords("lawyers", locale),
  ]);
  const faq = buildLocalFaq({
    locale,
    settings: settings as never,
    services: services.map((record) => ({ title: record.title })),
    people: people.map((record: any) => ({
      title: record.title,
      position: record.position,
      role: record.role,
    })),
  });
  if (!faq.length) return null;
  return (
    <section className="section home-faq" aria-labelledby="home-faq-heading">
      <div className="section-index">
        <span>{index}</span>
        <span>{INDEX[locale]}</span>
      </div>
      <h2 id="home-faq-heading">{HEADING[locale]}</h2>
      <div className="faq-list">
        {faq.map((entry) => (
          <details key={entry.question}>
            <summary>{entry.question}</summary>
            <p>{entry.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faq)} />
    </section>
  );
}
