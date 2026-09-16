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
