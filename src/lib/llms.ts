/**
 * Dựng nội dung /llms.txt — bản tóm tắt website dành cho công cụ AI.
 *
 * Mục đích khác sitemap.xml: sitemap liệt kê URL cho máy thu thập, còn tệp này
 * nói cho mô hình ngôn ngữ biết đây là ai, có những nhóm nội dung nào và trang
 * gốc của từng mục nằm đâu — để khi trả lời câu hỏi pháp lý, công cụ dẫn đúng
 * nguồn thay vì suy đoán từ HTML.
 */
export type LlmsItem = { title: string; path: string; summary?: string | null };
export type LlmsSection = { heading: string; items: LlmsItem[] };

/** Tóm tắt xuống dòng sẽ phá cấu trúc danh sách; gộp lại thành một dòng. */
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

export function buildLlmsTxt({
  siteUrl,
  firm,
  summary,
  sections,
  note,
}: {
  siteUrl: string;
  firm: string;
  summary: string;
  sections: LlmsSection[];
  note?: string;
}): string {
  const lines = [`# ${firm}`, "", `> ${oneLine(summary)}`, ""];
  if (note) lines.push(oneLine(note), "");
  for (const section of sections) {
    // Tiêu đề nhóm không có mục nào chỉ làm nhiễu bản tóm tắt.
    if (!section.items.length) continue;
    lines.push(`## ${section.heading}`, "");
    for (const item of section.items)
      lines.push(
        `- [${oneLine(item.title)}](${siteUrl}${item.path})` +
          (item.summary ? `: ${oneLine(item.summary)}` : ""),
      );
    lines.push("");
  }
  return lines.join("\n");
}

export type LlmsFullService = {
  title: string;
  path: string;
  summary?: string | null;
  audience?: string | null;
  scope?: string[];
  process?: { heading: string; description: string }[];
  faq?: { question: string; answer: string }[];
};
export type LlmsFullPerson = {
  name: string;
  path: string;
  position?: string | null;
  summary?: string | null;
};

/**
 * Dựng /llms-full.txt — toàn văn nội dung dịch vụ bằng Markdown.
 *
 * llms.txt chỉ là mục lục; công cụ AI muốn trả lời "Vũ Khang nhận những việc
 * gì, quy trình ra sao, liên hệ thế nào" vẫn phải mở từng trang HTML và đoán
 * đâu là nội dung chính. Tệp này đưa sẵn phần nội dung đó, mỗi mục kèm đường
 * dẫn gốc để dẫn nguồn. Chỉ gồm những gì đã xuất bản trên website — không có
 * giá, không có thông tin nội bộ.
 */
export function buildLlmsFull({
  siteUrl,
  firm,
  summary,
  contact,
  about,
  services,
  people,
  note,
}: {
  siteUrl: string;
  firm: string;
  summary: string;
  contact: { label: string; value?: string | null }[];
  about?: { heading: string; body: string }[];
  services: LlmsFullService[];
  people: LlmsFullPerson[];
  note?: string;
}): string {
  const lines = [`# ${firm}`, "", `> ${oneLine(summary)}`, ""];
  if (note) lines.push(oneLine(note), "");

  const known = contact.filter((entry) => entry.value?.trim());
  if (known.length) {
    lines.push("## Thông tin liên hệ", "");
    for (const entry of known)
      lines.push(`- ${entry.label}: ${oneLine(entry.value!)}`);
    lines.push("");
  }

  if (about?.length) {
    lines.push("## Về công ty", "");
    for (const section of about) {
      lines.push(`### ${oneLine(section.heading)}`, "");
      // Giữ xuống dòng của đoạn liệt kê (ví dụ năm giá trị cốt lõi).
      lines.push(
        ...section.body
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean),
        "",
      );
    }
  }

  if (services.length) {
    lines.push("## Lĩnh vực dịch vụ", "");
    for (const service of services) {
      lines.push(`### ${oneLine(service.title)}`, "");
      lines.push(`Trang gốc: ${siteUrl}${service.path}`, "");
      if (service.summary) lines.push(oneLine(service.summary), "");
      if (service.audience)
        lines.push(`Phù hợp với: ${oneLine(service.audience)}`, "");
      if (service.scope?.length) {
        lines.push("Phạm vi hỗ trợ:");
        for (const item of service.scope) lines.push(`- ${oneLine(item)}`);
        lines.push("");
      }
      if (service.process?.length) {
        lines.push("Quy trình:");
        service.process.forEach((step, index) =>
          lines.push(
            `${index + 1}. ${oneLine(step.heading)}: ${oneLine(step.description)}`,
          ),
        );
        lines.push("");
      }
      for (const entry of service.faq ?? [])
        lines.push(`**${oneLine(entry.question)}**`, oneLine(entry.answer), "");
    }
  }

  if (people.length) {
    lines.push("## Đội ngũ", "");
    for (const person of people)
      lines.push(
        `- [${oneLine(person.name)}](${siteUrl}${person.path})` +
          (person.position ? ` — ${oneLine(person.position)}` : "") +
          (person.summary ? `. ${oneLine(person.summary)}` : ""),
      );
    lines.push("");
  }
  return lines.join("\n");
}
