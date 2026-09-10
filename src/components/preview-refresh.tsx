"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function PreviewRefresh() {
  const router = useRouter();
  useEffect(() => {
    const refresh = (event: MessageEvent) => {
      if (event.origin !== location.origin) return;
      if (
        event.data?.type === "payload-live-preview" ||
        event.data?.type === "payload-document-event"
      )
        router.refresh();
    };
    window.addEventListener("message", refresh);
    return () => window.removeEventListener("message", refresh);
  }, [router]);
  return (
    <div className="status" role="status">
      Xem trước bản nháp · Chỉ tài khoản biên tập được phép xem.
    </div>
  );
}
