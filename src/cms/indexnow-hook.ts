import type { CollectionAfterChangeHook } from "payload";

/**
 * IndexNow: báo ngay cho Bing (và các công cụ dùng chung giao thức như Yandex,
 * Seznam, Naver) khi một trang được xuất bản, sửa hoặc gỡ — thay vì chờ chúng
 * tự quét lại. ChatGPT Search và Microsoft Copilot lấy kết quả từ Bing, nên đây
 * là đường nhanh nhất để nội dung mới đến được các công cụ AI đó.
 *
 * Khóa IndexNow không phải bí mật: nó được công bố ở /<khóa>.txt để công cụ
 * tìm kiếm xác nhận website là chủ của các URL được báo.
 */
export const INDEXNOW_KEY = "5e4893a8f1d12d4bd7d08714212fc196";

/** Bộ sưu tập có trang công khai riêng; các bộ còn lại không có URL để báo. */
const PUBLIC_COLLECTIONS = new Set([
  "pages",
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
]);

type Doc = { _status?: string; language?: string; slug?: string } | null;

/** Đường dẫn công khai của một bản ghi, cùng quy ước với nút "Xem trên website". */
export function publicPath(collection: string, doc: Doc): string | null {
  if (!doc?.slug || !doc.language) return null;
  if (collection === "pages")
    return `/${doc.language}${doc.slug === "home" ? "" : "/" + doc.slug}`;
  return `/${doc.language}/${collection}/${doc.slug}`;
}

/**
 * Chỉ báo khi website đã ra mắt và chạy trên tên miền thật: bản phát triển,
 * bản demo hay máy local không được mời công cụ tìm kiếm vào.
 */
function liveSiteUrl(): string | null {
  const launched =
    process.env.SITE_LAUNCH_APPROVED === "true" &&
    process.env.NEXT_PUBLIC_DEMO_MODE !== "true";
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
  if (!launched || !site.startsWith("https://")) return null;
  if (/localhost|127\.0\.0\.1/.test(site)) return null;
  return site;
}

export async function submitToIndexNow(site: string, urls: string[]) {
  if (!urls.length) return;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(site).host,
      key: INDEXNOW_KEY,
      keyLocation: `${site}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
    signal: AbortSignal.timeout(8000),
  });
  // 200/202 là đã nhận. Lỗi khác chỉ ghi nhật ký: không được làm hỏng việc lưu bài.
  if (!response.ok && response.status !== 202)
    console.warn(`IndexNow trả ${response.status} cho ${urls.join(", ")}`);
}

export const notifyIndexNow: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  collection,
}) => {
  if (!PUBLIC_COLLECTIONS.has(collection.slug)) return doc;
  const published = doc?._status === "published";
  const wasPublished = previousDoc?._status === "published";
  // Bản nháp tự lưu không đổi gì trên website công khai.
  if (!published && !wasPublished) return doc;
  const site = liveSiteUrl();
  if (!site) return doc;

  const paths = new Set<string>();
  const current = publicPath(collection.slug, doc);
  if (current) paths.add(current);
  // Đổi đường dẫn hoặc gỡ bài: báo cả địa chỉ cũ để công cụ tìm kiếm cập nhật.
  const previous = wasPublished ? publicPath(collection.slug, previousDoc) : null;
  if (previous) paths.add(previous);

  // Không chờ: việc lưu bài trong admin không phải đợi máy chủ IndexNow.
  void submitToIndexNow(
    site,
    [...paths].map((path) => site + path),
  ).catch((error) => console.warn("IndexNow lỗi:", error?.message ?? error));
  return doc;
};
