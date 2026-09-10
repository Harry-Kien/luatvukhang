import { fold } from "./content";
import type { ContentRecord } from "./cms";
/** Only visible editorial fields; never serialize whole CMS documents or relationships. */
function richText(value: any): string {
  if (!value || typeof value !== "object") return "";
  return [
    typeof value.text === "string" ? value.text : "",
    ...(Array.isArray(value.children) ? value.children.map(richText) : []),
    value.root ? richText(value.root) : "",
  ].join(" ");
}
export function searchableText(record: ContentRecord): string {
  return [
    record.summary,
    richText(record.body),
    record.position,
    record.qualifications,
    record.languages,
    record.audience,
    ...(record.scope || []).map((s) => s.item),
    ...(record.process || []).map(
      (s: any) => `${s.heading || ""} ${s.description || ""}`,
    ),
    ...(record.faq || []).map(
      (s: any) => `${s.question || ""} ${s.answer || ""}`,
    ),
    ...(record.blocks || [])
      .filter((b: any) => b.visible !== false)
      .map((b: any) =>
        [
          b.heading,
          b.caption,
          b.blockType === "callout" ? b.body : richText(b.body),
        ].join(" "),
      ),
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
export function searchScore(record: ContentRecord, query: string): number {
  const words = fold(query.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const title = fold(record.title),
    summary = fold(record.summary || ""),
    body = fold(searchableText(record));
  if (!words.every((w) => title.includes(w) || body.includes(w))) return 0;
  return (
    words.reduce(
      (score, w) =>
        score + (title.includes(w) ? 10 : summary.includes(w) ? 4 : 1),
      0,
    ) + (title.includes(fold(query.trim())) ? 20 : 0)
  );
}
