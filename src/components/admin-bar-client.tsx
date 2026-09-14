"use client";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

const PAGE_SECTIONS = ["about", "contact", "privacy", "terms"];
const COLLECTIONS = [
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
];

/**
 * Màn hình biên tập tương ứng với đường dẫn đang xem. Danh sách có bộ lọc mở
 * đúng một bản ghi, người dùng bấm vào là sửa — không cần truy vấn ở thanh.
 */
export function editHrefFor(pathname: string, locale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  const [, section, slug] = parts;
  const filter = (collection: string, value: string) =>
    `/admin/collections/${collection}?where[slug][equals]=${encodeURIComponent(value)}&where[language][equals]=${locale}`;
  if (parts.length === 1) return "/admin/globals/site-layout#tab-home";
  if (!slug && section && PAGE_SECTIONS.includes(section))
    return filter("pages", section);
  if (slug && section && COLLECTIONS.includes(section))
    return filter(section, slug);
  return "/admin";
}

export function EditThisPage({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return <a href={editHrefFor(pathname, locale)}>Sửa trang này</a>;
}
