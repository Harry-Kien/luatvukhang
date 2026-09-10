import { Phone } from "lucide-react";
import { t, type Locale } from "@/lib/content";
import { contactChannels } from "@/lib/contact";

/**
 * Dấu hiệu nhận biết Zalo vẽ bằng SVG nội tuyến.
 *
 * Không tải logo từ máy chủ của Zalo: Content-Security-Policy chỉ cho phép ảnh
 * cùng nguồn, và một liên kết ảnh bên ngoài sẽ hỏng lặng lẽ. Đây là ký hiệu
 * dẫn hướng kèm chữ "Zalo" hiển thị bên cạnh, không phải bản sao bộ nhận diện.
 */
export function ZaloMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 2.5h14A2.5 2.5 0 0 1 21.5 5v10a2.5 2.5 0 0 1-2.5 2.5h-5.4L8.5 21.4V17.5H5A2.5 2.5 0 0 1 2.5 15V5A2.5 2.5 0 0 1 5 2.5Z"
        fill="currentColor"
      />
      <path
        d="M8.2 7.1h6.1v1.5l-4 4.6h4.1v1.6H7.9v-1.5l4-4.6H8.2z"
        fill="#fff"
      />
    </svg>
  );
}

type Props = {
  locale: Locale;
  phone?: string | null;
  /** "bar" cho thanh tiện ích, "stack" cho footer và menu, "dock" cho nút nổi. */
  variant?: "bar" | "stack" | "dock";
};

/**
 * Hai kênh liên hệ tức thời. Ẩn hoàn toàn khi Cài đặt chưa có số điện thoại,
 * để website không mời gọi một hành động không thực hiện được.
 */
export function ContactChannels({ locale, phone, variant = "stack" }: Props) {
  const channels = contactChannels(phone);
  if (!channels) return null;
  const callLabel = t(locale, "Gọi", "Call");
  const callTitle = t(
    locale,
    "Gọi " + channels.display,
    "Call " + channels.display,
  );
  const zaloTitle = t(
    locale,
    "Nhắn Zalo tới " + channels.display,
    "Message " + channels.display + " on Zalo",
  );
  if (variant === "dock")
    return (
      <div
        className="contact-dock"
        role="complementary"
        aria-label={t(locale, "Liên hệ nhanh", "Quick contact")}
      >
        {/* Nhãn đặt bằng aria-label vì chữ hiển thị bị ẩn trên màn hình hẹp. */}
        <a
          className="dock-call"
          href={"tel:" + channels.tel}
          aria-label={callTitle}
          title={callTitle}
        >
          <Phone size={19} aria-hidden="true" />
          <span className="dock-text">{callLabel}</span>
        </a>
        <a
          className="dock-zalo"
          href={channels.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            zaloTitle +
            " — " +
            t(locale, "mở trong tab mới", "opens in a new tab")
          }
          title={zaloTitle}
        >
          <ZaloMark size={19} />
          <span className="dock-text">Zalo</span>
        </a>
      </div>
    );
  return (
    <div className={"contact-channels " + variant}>
      <a href={"tel:" + channels.tel} title={callTitle}>
        <Phone size={variant === "bar" ? 14 : 17} aria-hidden="true" />
        <span>{channels.display}</span>
      </a>
      <a
        href={channels.zalo}
        target="_blank"
        rel="noopener noreferrer"
        title={zaloTitle}
      >
        <ZaloMark size={variant === "bar" ? 14 : 17} />
        <span>Zalo</span>
        <span className="visually-hidden">
          {t(locale, "mở trong tab mới", "opens in a new tab")}
        </span>
      </a>
    </div>
  );
}
