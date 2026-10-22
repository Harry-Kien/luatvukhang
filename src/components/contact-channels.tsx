import { Phone } from "lucide-react";
import { t, type Locale } from "@/lib/content";
import { DismissibleDetails } from "./dismissible-details";
import { contactChannels, zaloChannels, type ZaloNumber } from "@/lib/contact";

/**
 * Chữ hiệu Zalo chính thức.
 *
 * Dữ liệu đường dẫn lấy từ bộ Simple Icons (tệp icon phát hành theo CC0);
 * nhãn hiệu Zalo thuộc về VNG và ở đây chỉ dùng để chỉ đúng kênh liên hệ, theo
 * đúng mục đích của nó. Xem `docs/DEPENDENCIES.md`.
 *
 * Vẽ nội tuyến chứ không tải từ máy chủ Zalo: `img-src` trong CSP chỉ cho phép
 * ảnh cùng nguồn, nên ảnh ngoài sẽ bị chặn mà không báo lỗi.
 *
 * Chữ hiệu tự nó đọc thành "Zalo" nên không kèm thêm nhãn chữ bên cạnh; tên gọi
 * cho trình đọc màn hình đặt bằng `aria-label` trên chính thẻ liên kết.
 */
export function ZaloMark({ height = 14 }: { height?: number }) {
  return (
    <svg
      // Khung cắt sát chữ: đường dẫn gốc chỉ chiếm khoảng y 7.8–16.2 của ô 24×24.
      viewBox="0 7.4 24 9.2"
      height={height}
      width={Math.round((height * 24) / 9.2)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"
      />
    </svg>
  );
}

type Props = {
  locale: Locale;
  phone?: string | null;
  /** Ô "Số Zalo bổ sung" trong Cài đặt. */
  zalo?: ZaloNumber[] | null;
  /** "bar" cho thanh tiện ích, "stack" cho footer và menu, "dock" cho nút nổi. */
  variant?: "bar" | "stack" | "dock";
};

/**
 * Gọi điện và nhắn Zalo (số chính cùng các số Zalo bổ sung trong Cài đặt).
 * Ẩn hoàn toàn khi Cài đặt chưa có số điện thoại, để website không mời gọi
 * một hành động không thực hiện được.
 */
export function ContactChannels({
  locale,
  phone,
  zalo,
  variant = "stack",
}: Props) {
  const channels = contactChannels(phone);
  if (!channels) return null;
  const zaloList = zaloChannels(phone, zalo);
  // Ghép nhãn từ chuỗi tĩnh rồi mới nối số: chuỗi dựng động không lọt vào
  // scripts/check-translations.ts, nên bản tiếng Trung sẽ âm thầm rơi về tiếng
  // Anh mà không có gì báo.
  const callTitle = t(locale, "Gọi", "Call") + " " + channels.display;
  const newTab = t(locale, "mở trong tab mới", "opens in a new tab");
  const zaloTitle = (display: string) =>
    t(locale, "Nhắn tin Zalo tới", "Chat on Zalo with") + " " + display;
  if (variant === "dock")
    return (
      /**
       * Neo ở cạnh trái. Hầu hết bộ chatbot nhúng (Zalo OA, Crisp, Tawk…) tự đặt
       * mình ở góc phải dưới và không phải bộ nào cũng cho đổi, nên góc phải
       * được giữ trống sẵn cho phần tích hợp sau này.
       */
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
          <Phone size={21} aria-hidden="true" />
        </a>
        {zaloList.length === 1 ? (
          <a
            className="dock-zalo"
            href={zaloList[0].zalo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={zaloTitle(zaloList[0].display) + " — " + newTab}
            title={zaloTitle(zaloList[0].display)}
          >
            <ZaloMark height={17} />
          </a>
        ) : (
          /**
           * Nhiều số Zalo gom vào một nút: mỗi số một nút tròn thì cụm nút nổi
           * cao gần 240px, che chữ ở cạnh trái trên điện thoại. Bấm nút Zalo là
           * bung danh sách số để chọn; bấm ra ngoài, nhấn Esc hay chọn xong là đóng.
           */
          <DismissibleDetails className="dock-zalo-group">
            <summary
              className="dock-zalo"
              aria-label={t(
                locale,
                "Nhắn tin Zalo — chọn số",
                "Chat on Zalo — choose a number",
              )}
              title={t(
                locale,
                "Nhắn tin Zalo — chọn số",
                "Chat on Zalo — choose a number",
              )}
            >
              <ZaloMark height={17} />
            </summary>
            <ul className="dock-zalo-menu">
              {zaloList.map((zaloChannel) => (
                <li key={zaloChannel.zalo}>
                  <a
                    href={zaloChannel.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={zaloTitle(zaloChannel.display) + " — " + newTab}
                  >
                    <ZaloMark height={12} />
                    <span>{zaloChannel.display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </DismissibleDetails>
        )}
      </div>
    );
  return (
    <div className={"contact-channels " + variant}>
      <a href={"tel:" + channels.tel} title={callTitle}>
        <Phone size={variant === "bar" ? 14 : 17} aria-hidden="true" />
        <span>{channels.display}</span>
      </a>
      {zaloList.map((zaloChannel) => (
        <a
          className="zalo-link"
          href={zaloChannel.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={zaloTitle(zaloChannel.display) + " — " + newTab}
          title={zaloTitle(zaloChannel.display)}
          key={zaloChannel.zalo}
        >
          <ZaloMark height={variant === "bar" ? 11 : 15} />
          <span>{zaloChannel.display}</span>
        </a>
      ))}
    </div>
  );
}
