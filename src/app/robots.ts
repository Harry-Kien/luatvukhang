import type { MetadataRoute } from "next";
import { launched } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
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
