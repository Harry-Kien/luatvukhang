import { getRecords } from "@/lib/cms";
import { launched } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";
import { buildLlmsTxt, type LlmsSection } from "@/lib/llms";
import { siteUrl } from "@/lib/seo";

/** Nhóm nội dung đưa vào bản tóm tắt, theo thứ tự khách hay cần. */
const SECTIONS = [
  ["Lĩnh vực chuyên môn", "services"],
  ["Ngành nghề phục vụ", "industries"],
  ["Bài viết chuyên môn", "articles"],
  ["Đội ngũ", "lawyers"],
] as const;

export async function GET() {
  // Cùng điều kiện với robots.txt và feed.xml: chưa duyệt ra mắt thì website
  // không mời công cụ nào đọc cả.
  if (!launched) return new Response("Not found", { status: 404 });

  const settings = (await getSiteSettings().catch(() => null)) as Record<
    string,
    any
  > | null;
  const firm =
    settings?.companyName || "Công ty Luật TNHH Vũ Khang Solutions & Partners";

  const sections: LlmsSection[] = [];
  for (const [heading, collection] of SECTIONS) {
    // Bản tiếng Việt là bản gốc; hai ngôn ngữ còn lại nêu ở phần ghi chú thay
    // vì nhân ba danh sách, để tệp vẫn đọc được trong một lần.
    const records = await getRecords(collection, "vi");
    sections.push({
      heading,
      items: records.map((record) => ({
        title: record.title,
        path: `/vi/${collection}/${record.slug}`,
        summary: record.seo?.description || record.summary,
      })),
    });
  }

  const text = buildLlmsTxt({
    siteUrl,
    firm,
    summary:
      `${firm} — tư vấn pháp lý tại Việt Nam. Website giới thiệu phạm vi hỗ trợ ` +
      `theo từng lĩnh vực, quy trình làm việc và cách gửi yêu cầu tư vấn.`,
    note:
      `Nội dung có ba ngôn ngữ: tiếng Việt tại /vi, tiếng Anh tại /en, tiếng ` +
      `Trung tại /zh — cùng đường dẫn, chỉ khác tiền tố. Toàn văn phạm vi dịch ` +
      `vụ, quy trình và câu hỏi thường gặp: ${siteUrl}/llms-full.txt. Thông tin ` +
      `trên website mang tính tham khảo chung, không phải ý kiến pháp lý cho một ` +
      `vụ việc cụ thể.`,
    sections,
  });

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
