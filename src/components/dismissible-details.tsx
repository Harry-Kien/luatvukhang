"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * <details> đóng lại như một menu thông thường: bấm ra ngoài, nhấn Esc, hoặc
 * chọn xong một liên kết bên trong. Không có JavaScript thì vẫn mở/đóng bằng
 * chính nút tóm tắt như <details> gốc.
 */
export function DismissibleDetails({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const outside = (event: PointerEvent) => {
      if (element.open && !element.contains(event.target as Node))
        element.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (element.open && event.key === "Escape") {
        element.open = false;
        element.querySelector("summary")?.focus();
      }
    };
    const chosen = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) element.open = false;
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    element.addEventListener("click", chosen);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      element.removeEventListener("click", chosen);
    };
  }, []);
  return (
    <details ref={ref} className={className}>
      {children}
    </details>
  );
}
