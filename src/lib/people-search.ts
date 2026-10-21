import { fold } from "./content";

/**
 * Ô tìm kiếm trên trang Đội ngũ.
 *
 * Hai lỗi đã gặp (rà soát 21/10/2026):
 *   - Tên công ty "Vũ Khang" có trong phần giới thiệu của mọi người, nên tìm
 *     "Khang" hay "Vũ" — tên của chính nhân sự — trả về cả đội ngũ. Phần giới
 *     thiệu được bỏ tên công ty trước khi tìm.
 *   - Bỏ dấu đi thì "Vũ" trùng với "vực" trong "lĩnh vực". Gõ có dấu thì so
 *     khớp đúng dấu; gõ không dấu ("vu", "khang") vẫn tìm không phân biệt dấu.
 */
const FIRM =
  /Công ty Luật TNHH Vũ Khang Solutions & Partners|Vũ Khang Solutions & Partners|Vũ Khang/gi;

type Person = {
  title: string;
  position?: string | null;
  summary?: string | null;
  languages?: string | null;
};

const exact = (text: string) => text.normalize("NFC").toLowerCase();

export function matchesPerson(person: Person, keyword: string) {
  if (!keyword.trim()) return true;
  const text = [
    person.title,
    person.position || "",
    (person.summary || "").normalize("NFC").replace(FIRM, " "),
    person.languages || "",
  ].join(" ");
  const accented = fold(keyword) !== exact(keyword);
  return accented
    ? exact(text).includes(exact(keyword.trim()))
    : fold(text).includes(fold(keyword.trim()));
}
