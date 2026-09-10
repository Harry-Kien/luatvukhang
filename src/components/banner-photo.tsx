import type { CSSProperties } from "react";
import { t, type Locale } from "@/lib/content";
type Media = {
  url?: string;
  alt?: string;
  width?: number;
  sizes?: Record<string, { url?: string | null; width?: number | null } | null>;
};
/** Ảnh mặc định khi biên tập viên chưa tải ảnh riêng lên CMS. */
const FALLBACK = "/images/architecture.webp";
const FALLBACK_SRCSET = [
  "/images/architecture-800.webp 800w",
  "/images/architecture-1200.webp 1200w",
  "/images/architecture.webp 1800w",
].join(", ");
/** Ảnh chiếm ~93% bề rộng trên điện thoại và ~49% trên máy tính. */
const BANNER_SIZES = "(max-width: 700px) 93vw, 49vw";
/** Dựng srcset từ các kích thước Payload đã tạo sẵn cho ảnh tải lên CMS. */
function srcSetOf(media: Media | null) {
  if (!media?.url) return undefined;
  const variants = Object.values(media.sizes || {})
    .filter((v): v is { url: string; width: number } => Boolean(v?.url && v?.width))
    .map((v) => `${v.url} ${v.width}w`);
  if (media.width) variants.push(`${media.url} ${media.width}w`);
  return variants.length > 1 ? variants.join(", ") : undefined;
}
type Banner = {
  desktopImage?: Media | number;
  mobileImage?: Media | number;
  desktopX?: number;
  desktopY?: number;
  mobileX?: number;
  mobileY?: number;
  fit?: string;
  shade?: number;
  caption?: string;
};
export function BannerPhoto({
  banner,
  locale,
}: {
  banner?: Banner;
  locale: Locale;
}) {
  const desktop =
    typeof banner?.desktopImage === "object" ? banner.desktopImage : null;
  const mobile =
    typeof banner?.mobileImage === "object" ? banner.mobileImage : null;
  const custom = !!desktop?.url;
  const style = {
    "--banner-desktop-position": `${banner?.desktopX ?? 50}% ${banner?.desktopY ?? 50}%`,
    "--banner-mobile-position": `${banner?.mobileX ?? 50}% ${banner?.mobileY ?? 50}%`,
    "--banner-fit": banner?.fit === "contain" ? "contain" : "cover",
    "--banner-shade": (banner?.shade ?? 15) / 100,
  } as CSSProperties;
  return (
    <div
      className={`hero-photo${custom ? " personnel-banner" : ""}`}
      style={style}
    >
      <picture>
        {mobile?.url && (
          <source
            media="(max-width: 700px)"
            srcSet={srcSetOf(mobile) || mobile.url}
            sizes={srcSetOf(mobile) ? BANNER_SIZES : undefined}
          />
        )}
        <img
          src={desktop?.url || FALLBACK}
          srcSet={custom ? srcSetOf(desktop) : FALLBACK_SRCSET}
          sizes={custom && !srcSetOf(desktop) ? undefined : BANNER_SIZES}
          alt={
            desktop?.alt ||
            t(
              locale,
              "Những đường nét của một công trình kiến trúc kính hiện đại",
              "Geometric lines of a contemporary glass building",
            )
          }
          fetchPriority="high"
          className="banner-image"
        />
      </picture>
      <div className="hero-photo-shade" />
      {!custom && (
        <div className="photo-vertical">VŨ KHANG / LEGAL PERSPECTIVES</div>
      )}
      {(banner?.caption || !custom) && (
        <div className="hero-photo-caption">
          <span className="photo-marker" />
          <span>
            {banner?.caption ||
              t(
                locale,
                "Một góc nhìn rõ ràng.\nMột nền tảng vững chắc.",
                "A clear perspective.\nA sound foundation.",
              )}
          </span>
        </div>
      )}
      {!custom && (
        <span className="photo-credit-tag">
          {t(locale, "Ảnh kiến trúc minh họa", "Illustrative architecture")}
        </span>
      )}
    </div>
  );
}
