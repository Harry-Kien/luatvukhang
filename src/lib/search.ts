import { fold } from "./content";
import type { ContentRecord } from "./cms";

/**
 * Tách theo khoảng trắng, dấu câu và ký hiệu — KHÔNG tách theo "mọi ký tự không
 * phải a-z0-9". Cách viết cũ coi mọi chữ Hán là dấu phân cách, nên truy vấn
 * tiếng Trung tách ra thành mảng rỗng và tìm kiếm tiếng Trung trả về 0 kết quả
 * cho mọi từ khóa, kể cả tiêu đề chính xác của lĩnh vực đang hiển thị.
 */
const SEPARATOR = /[\s\p{P}\p{S}]+/u;
/** Chữ Hán viết liền, không có khoảng trắng giữa các từ. */
const CJK = /[㐀-䶿一-鿿豈-﫿]/u;

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

/**
 * Các trường ngắn và cô đọng: phạm vi hỗ trợ, tên bước, câu hỏi thường gặp.
 * Người tìm thường gõ đúng những chữ ở đây, trong khi phần diễn giải dài lại
 * chứa rất nhiều từ thông dụng dùng chung cho mọi lĩnh vực.
 */
function signalText(record: ContentRecord): string {
  return [
    record.audience,
    record.position,
    ...(record.scope || []).map((s) => s.item),
    ...(record.process || []).map((s: any) => s.heading),
    ...(record.faq || []).map((s: any) => s.question),
    ...(record.blocks || [])
      .filter((b: any) => b.visible !== false)
      .map((b: any) => b.heading),
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Khớp trọn âm tiết hoặc phần đầu âm tiết, không khớp chuỗi con giữa từ.
 *
 * Khớp chuỗi con từng khiến "nhãn hiệu" ăn điểm tiêu đề của "Lao động & nhân
 * sự" — bỏ dấu xong thì "nhãn" và "nhân" đều thành "nhan", và "nhan" lại nằm
 * lọt trong "nhanh". Cho phép khớp phần đầu để người dùng gõ dở vẫn ra kết quả.
 */
function hasWord(tokens: string[], word: string, text: string): boolean {
  // Tiếng Trung không đặt khoảng trắng giữa các từ, nên "合同" là một phần nằm
  // trong "施工合同" chứ không phải một âm tiết đứng riêng. Ranh giới âm tiết ở
  // đây vô nghĩa; phải dò chuỗi con.
  if (CJK.test(word)) return text.includes(word);
  return tokens.some((token) => token === word || token.startsWith(word));
}

export function searchScore(record: ContentRecord, query: string): number {
  const phrase = fold(query.trim()).replace(/\s+/g, " ");
  const words = phrase.split(SEPARATOR).filter(Boolean);
  if (!words.length) return 0;

  // Trọng số giảm dần theo mức cô đọng của trường.
  const fields = [
    { text: fold(record.title || ""), word: 10, phrase: 40 },
    {
      text: fold([record.summary, record.keywords].filter(Boolean).join(" ")),
      word: 4,
      phrase: 16,
    },
    { text: fold(signalText(record)), word: 3, phrase: 12 },
    { text: fold(searchableText(record)), word: 1, phrase: 5 },
  ].map((field) => ({
    ...field,
    tokens: field.text.split(SEPARATOR).filter(Boolean),
  }));

  // Mọi âm tiết phải xuất hiện ở đâu đó: thà không có kết quả còn hơn trả về
  // một lĩnh vực chỉ trùng một chữ thông dụng.
  let score = 0;
  for (const word of words) {
    let best = 0;
    for (const field of fields)
      if (hasWord(field.tokens, word, field.text))
        best = Math.max(best, field.word);
    if (!best) return 0;
    score += best;
  }

  /**
   * Thưởng cụm từ. "nhãn hiệu" đứng liền nhau mang nghĩa hoàn toàn khác hai âm
   * tiết nằm rải rác, và đây là điều phân biệt lĩnh vực đúng với lĩnh vực chỉ
   * tình cờ chứa đủ các chữ.
   */
  const bigrams = words.slice(0, -1).map((w, i) => w + " " + words[i + 1]);
  for (const field of fields) {
    if (field.text.includes(phrase)) score += field.phrase;
    for (const bigram of bigrams)
      if (field.text.includes(bigram)) score += Math.round(field.phrase / 2);
  }
  return score;
}
