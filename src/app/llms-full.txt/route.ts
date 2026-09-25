import { getRecords } from "@/lib/cms";
import { launched } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";
import { buildLlmsFull } from "@/lib/llms";
import { siteUrl } from "@/lib/seo";

export async function GET() {
  // Cùng điều kiện với llms.txt, robots.txt và feed.xml.
  if (!launched) return new Response("Not found", { status: 404 });

  const settings = (await getSiteSettings().catch(() => null)) as Record<
    string,
    any
  > | null;
  const firm =
    settings?.companyName || "Công ty Luật TNHH Vũ Khang Solutions & Partners";

  const [services, lawyers, pages] = await Promise.all([
    getRecords("services", "vi"),
    getRecords("lawyers", "vi"),
    getRecords("pages", "vi"),
  ]);
  const about = pages.find((page) => page.slug === "about");

  const text = buildLlmsFull({
    siteUrl,
    firm,
    summary:
      `${firm} — tư vấn pháp lý tại Việt Nam. Toàn văn phạm vi dịch vụ, quy ` +
      `trình làm việc và câu hỏi thường gặp, trích từ các trang đã công bố.`,
    note:
      `Bản tóm tắt ngắn: ${siteUrl}/llms.txt. Nội dung có ba ngôn ngữ: /vi, /en, ` +
      `/zh — cùng đường dẫn, chỉ khác tiền tố. Thông tin mang tính tham khảo ` +
      `chung, không phải ý kiến pháp lý cho một vụ việc cụ thể.`,
    contact: [
      { label: "Tên công ty", value: settings?.companyName },
      { label: "Tên tiếng Anh", value: settings?.englishName },
      { label: "Đăng ký hoạt động", value: settings?.registration },
      { label: "Điện thoại", value: settings?.phone },
      { label: "Email", value: settings?.email },
      { label: "Địa chỉ", value: settings?.address },
      { label: "Gửi yêu cầu tư vấn", value: `${siteUrl}/vi/consultation` },
    ],
    about: ((about?.blocks ?? []) as any[])
      .filter(
        (block) =>
          block.visible !== false &&
          block.blockType === "callout" &&
          block.heading &&
          block.body,
      )
      .map((block) => ({ heading: block.heading, body: block.body })),
    services: services.map((record: any) => ({
      title: record.title,
      path: `/vi/services/${record.slug}`,
      summary: record.summary,
      audience: record.audience,
      scope: (record.scope ?? []).map((row: any) => row.item).filter(Boolean),
      process: record.process ?? [],
      faq: record.faq ?? [],
    })),
    people: lawyers.map((record: any) => ({
      name: record.title,
      path: `/vi/lawyers/${record.slug}`,
      position: record.position,
      summary: record.summary,
    })),
  });

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
