"use client";
import { useRowLabel } from "@payloadcms/ui";

/**
 * Nhãn từng dòng trong ô "Zalo 2, Zalo 3…" của Cài đặt: "Zalo 2 · 0976894548".
 * Số chính ở trên đã là Zalo 1, nên dòng đầu tiên của danh sách là Zalo 2 —
 * đúng thứ tự nút Zalo khách thấy trên website.
 */
export function ZaloRowLabel() {
  const { data, rowNumber } = useRowLabel<{ phone?: string | null }>();
  const position = (rowNumber ?? 0) + 2;
  const phone = data?.phone?.trim();
  return (
    <span>{phone ? `Zalo ${position} · ${phone}` : `Zalo ${position}`}</span>
  );
}
