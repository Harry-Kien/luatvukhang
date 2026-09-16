import Anthropic from "@anthropic-ai/sdk";
import { GLOSSARY } from "./glossary";

export class TranslationUnavailable extends Error {}
export class TranslationTooLarge extends Error {}

export const MAX_CHARS = 60000;
const LANGUAGE = {
  en: "English",
  zh: "Simplified Chinese (简体中文)",
} as const;

/** Nhà cung cấp đang dùng: Claude khi có khóa, giả lập khi kiểm thử, null khi chưa cấu hình. */
export function translationProvider(): "claude" | "mock" | null {
  // Bản giả lập nối " [en]" vào câu gốc thay vì dịch. Hữu ích khi kiểm thử,
  // nhưng nếu lọt vào bản chạy thật thì nút "Dịch" ghi chuỗi tiếng Việt kèm
  // đuôi đó thẳng vào nội dung tiếng Anh của website.
  if (
    process.env.TRANSLATION_PROVIDER === "mock" &&
    process.env.NODE_ENV !== "production"
  )
    return "mock";
  if (process.env.ANTHROPIC_API_KEY) return "claude";
  return null;
}

const SYSTEM = `You translate content for the website of a Vietnamese law firm, Công ty Luật TNHH Vũ Khang Solutions & Partners.
Rules:
- Translate from Vietnamese into the requested language, formal register, plain and precise.
- Keep unchanged: the firm's name, personal names, legal document numbers (e.g. "Luật số 59/2020/QH14"), phone numbers, email addresses, URLs, and placeholders in braces.
- Do not add, drop or summarise content. Preserve line breaks exactly.
- Use this glossary when the term appears:
${GLOSSARY.map((g) => `  "${g.vi}" -> en: "${g.en}", zh: "${g.zh}"`).join("\n")}
Return only JSON of the form {"items": [...]} with exactly one translated string per input string, same order.`;

async function claude(items: string[], target: "en" | "zh"): Promise<string[]> {
  const client = new Anthropic();
  const message = await client.messages
    .stream({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: [
        { type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } },
      ],
      output_config: {
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              items: { type: "array", items: { type: "string" } },
            },
            required: ["items"],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Target language: ${LANGUAGE[target]}.\nInput strings as JSON:\n${JSON.stringify(items)}`,
        },
      ],
    })
    .finalMessage();
  if (message.stop_reason === "refusal")
    throw new Error("Dịch vụ dịch từ chối nội dung này.");
  const text = message.content.find((b) => b.type === "text")?.text ?? "";
  const parsed = JSON.parse(text) as { items: unknown };
  if (!Array.isArray(parsed.items) || parsed.items.length !== items.length)
    throw new Error("Kết quả dịch không khớp số đoạn.");
  console.log(
    `[translate] ${target} ${items.length} đoạn, ${message.usage.input_tokens} in / ${message.usage.output_tokens} out tokens`,
  );
  return parsed.items.map(String);
}

/** Dịch một mảng chuỗi. Nhà cung cấp giả lập chỉ cho kiểm thử tự động. */
export async function translateStrings(
  items: string[],
  target: "en" | "zh",
  _context: { kind: string },
): Promise<string[]> {
  const total = items.reduce((n, s) => n + s.length, 0);
  if (total > MAX_CHARS)
    throw new TranslationTooLarge(
      `Nội dung quá dài (${total} ký tự, tối đa ${MAX_CHARS}).`,
    );
  if (!items.length) return [];
  const provider = translationProvider();
  if (provider === "mock") return items.map((s) => `${s} [${target}]`);
  if (provider === "claude") return claude(items, target);
  throw new TranslationUnavailable(
    "Chưa cấu hình dịch máy: đặt ANTHROPIC_API_KEY trong tệp .env.",
  );
}
