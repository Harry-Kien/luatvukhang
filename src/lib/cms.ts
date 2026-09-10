import { cache } from "react";
import type { CollectionSlug } from "payload";
import type { Locale } from "./content";
import { demo } from "./content";
export type ContentRecord = {
  id: string | number;
  title: string;
  slug: string;
  summary: string;
  body?: any;
  blocks?: any[];
  scope?: { item: string }[];
  updatedAt?: string;
  position?: string;
  sources?: { label: string; url: string }[];
  seo?: { title?: string; description?: string };
  [key: string]: any;
};
export async function getCMS() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}
/**
 * Ghi nhớ theo từng lượt render: layout, generateMetadata, JSON-LD và trang
 * cùng hỏi một bộ nội dung, nên không truy vấn cơ sở dữ liệu lặp lại.
 */
export const getRecords = cache(async function getRecords(
  collection: string,
  locale: Locale,
): Promise<ContentRecord[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const cms = await getCMS();
    const result = await cms.find({
      collection: collection as CollectionSlug,
      where: {
        and: [
          { language: { equals: locale } },
          { _status: { equals: "published" } },
          { isSample: { not_equals: true } },
        ],
      },
      overrideAccess: false,
      depth: 1,
      pagination: false,
      sort: "-updatedAt",
      draft: false,
    });
    return result.docs as unknown as ContentRecord[];
  } catch (error) {
    if (demo) return [];
    throw error;
  }
});
/**
 * Bản ghi minh họa để công ty thấy trước bố cục và sửa trực tiếp trong CMS.
 *
 * Chỉ trả về khi đang ở chế độ demo, và mệnh đề `isSample` là bắt buộc: kể cả
 * khi bỏ qua kiểm tra quyền để đọc được bản nháp, truy vấn vẫn không thể chạm
 * tới bản nháp thường của biên tập viên. Nội dung minh họa không bao giờ được
 * xuất bản (publicationGuard chặn) và không phát dữ liệu có cấu trúc, nên khi
 * tắt demo lúc ra mắt thì nó tự biến mất khỏi website.
 */
export const getSampleRecords = cache(async function getSampleRecords(
  collection: string,
  locale: Locale,
): Promise<ContentRecord[]> {
  if (!demo || !process.env.DATABASE_URL) return [];
  try {
    const cms = await getCMS();
    const result = await cms.find({
      collection: collection as CollectionSlug,
      where: {
        and: [{ language: { equals: locale } }, { isSample: { equals: true } }],
      },
      overrideAccess: true,
      depth: 1,
      pagination: false,
      sort: "createdAt",
      draft: true,
    });
    return (result.docs as unknown as ContentRecord[]).filter(
      (doc) => doc.isSample === true,
    );
  } catch {
    return [];
  }
});
