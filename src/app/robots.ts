import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { launched } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
export default async function robots(): Promise<MetadataRoute.Robots> {
  // Next mặc định đóng băng robots.txt lúc build. Đọc theo từng yêu cầu để
  // luôn khớp với sitemap và trạng thái ra mắt đang chạy.
  await connection();
  if (!launched)
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Trang tìm kiếm và phân trang vẫn cho thu thập để công cụ tìm kiếm đọc
      // được thẻ noindex; chỉ chặn khu vực quản trị, API và bản xem trước.
      disallow: ["/admin", "/api", "/*?preview=", "/*?translation="],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    // Chỉ thị Host nhận tên miền trần, không kèm giao thức.
    host: new URL(siteUrl).host,
  };
}
