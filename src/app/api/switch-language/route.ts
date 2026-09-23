import { NextResponse } from "next/server";
import { getRecords } from "@/lib/cms";
import { demo, samples } from "@/lib/content";
import { resolveLocale, languagePath } from "@/lib/locales";
export async function GET(request: Request) {
  const input = new URL(request.url),
    target = resolveLocale(input.searchParams.get("locale"));
  const route = languagePath(input.searchParams.get("path") || "/vi", target);
  let path = route.path;
  if (route.slug && route.section) {
    const [records, translations] = await Promise.all([
      getRecords(route.section, route.source),
      getRecords(route.section, target),
    ]);
    const original = records.find((r) => r.slug === route.slug);
    const translated = original?.translationKey
      ? translations.find((r) => r.translationKey === original.translationKey)
      : null;
    if (translated) path += "/" + translated.slug;
    else if (
      !original &&
      demo &&
      route.section === "services" &&
      samples.some((s) => s.slug === route.slug)
    )
      path += "/" + route.slug;
    else path += "?translation=unavailable";
  }
  /**
   * Chuyển hướng bằng địa chỉ TƯƠNG ĐỐI, không dựng từ NEXT_PUBLIC_SITE_URL.
   *
   * Dựng từ biến cấu hình thì mọi lần đổi ngôn ngữ đều ném khách sang đúng tên
   * miền đã khai ở đó. Website nào cũng trả lời ở cả `ten-mien.vn` lẫn
   * `www.ten-mien.vn`, nên khách vào bằng địa chỉ còn lại bị nhảy host giữa
   * chừng; trình duyệt còn chặn luôn lượt tải trước vì `connect-src 'self'`,
   * nên nút đổi ngôn ngữ mất phần tải sẵn.
   *
   * Địa chỉ tương đối được trình duyệt ghép vào đúng nơi khách đang đứng —
   * đúng tên miền, đúng giao thức, không phụ thuộc cấu hình. Không mở ra
   * chuyển hướng ra ngoài: `languagePath` đã ép đường dẫn bắt đầu bằng /vi,
   * /en hoặc /zh.
   */
  return new NextResponse(null, {
    status: 307,
    headers: { Location: path, "Cache-Control": "no-store" },
  });
}
