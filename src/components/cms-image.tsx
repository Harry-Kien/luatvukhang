type Size = { url?: string | null; width?: number | null } | null;
type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: { card?: Size; hero?: Size } | null;
};

/**
 * Ảnh từ CMS kèm srcset dựng từ các kích thước Payload đã tạo sẵn
 * (card 800px, hero 1600px). Không có bản này thì trình duyệt luôn tải ảnh gốc,
 * thường nặng gấp nhiều lần mức cần thiết trên điện thoại.
 */
export function CmsImage({
  media,
  fallbackAlt,
  sizes,
  className,
  priority = false,
}: {
  media: Media;
  /** Dùng khi biên tập viên chưa nhập mô tả ảnh. */
  fallbackAlt: string;
  /** Thuộc tính sizes của HTML, mô tả bề rộng hiển thị thực tế. */
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!media?.url) return null;
  const variants = [media.sizes?.card, media.sizes?.hero]
    .filter((variant): variant is { url: string; width: number } =>
      Boolean(variant?.url && variant?.width),
    )
    .map((variant) => `${variant.url} ${variant.width}w`);
  if (media.url && media.width) variants.push(`${media.url} ${media.width}w`);
  return (
    <img
      className={className}
      src={media.url}
      srcSet={variants.length > 1 ? variants.join(", ") : undefined}
      sizes={variants.length > 1 ? sizes : undefined}
      alt={media.alt || fallbackAlt}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
