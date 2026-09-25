import { getRecords, getSampleRecords } from "./cms";
import type { Locale } from "./locales";

/**
 * Mục danh sách có thể còn trống. Không có "services": website công ty luật
 * luôn có lĩnh vực, và ở chế độ demo trang Chuyên môn tự lấp bằng danh mục mẫu.
 */
const OPTIONAL_SECTIONS = [
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
] as const;

/**
 * Mục chưa có bản ghi nào để hiện ở ngôn ngữ này.
 *
 * Liên kết tới "Kinh nghiệm" hay "Cơ hội nghề nghiệp" khi mục còn trống chỉ dẫn
 * khách tới dòng "Chưa có nội dung" — với một công ty luật, đó là dấu hiệu
 * website làm dở. Ẩn liên kết ở đây thay vì tắt mục menu trong CMS: bản ghi
 * đầu tiên được xuất bản là liên kết tự hiện lại, không ai phải nhớ bật lên.
 */
export async function emptySections(locale: Locale): Promise<Set<string>> {
  const empty = await Promise.all(
    OPTIONAL_SECTIONS.map(async (section) => {
      const records = await getRecords(section, locale);
      if (records.length) return null;
      const samples = await getSampleRecords(section, locale);
      return samples.length ? null : section;
    }),
  );
  return new Set(
    empty.filter((s): s is (typeof OPTIONAL_SECTIONS)[number] => !!s),
  );
}

/** Mục đầu tiên của đường dẫn nội bộ ("/careers?x" → "careers"). */
const sectionOf = (href?: string | null) =>
  href?.startsWith("/") ? href.slice(1).split(/[/?#]/)[0] : "";

/** Bỏ liên kết trỏ vào mục trống; liên kết ngoài và trang tĩnh giữ nguyên. */
export const withoutEmpty = <T extends { href?: string | null }>(
  links: T[],
  empty: Set<string>,
) => links.filter((link) => !empty.has(sectionOf(link.href)));
