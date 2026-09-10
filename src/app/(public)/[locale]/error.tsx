"use client";
import { usePathname } from "next/navigation";
export default function Error({ reset }: { reset: () => void }) {
  const zh = usePathname().startsWith("/zh");
  const en = usePathname().startsWith("/en");
  return (
    <section className="section">
      <h1>{zh ? "暂时无法加载内容" : en ? "Content could not be loaded" : "Chưa thể tải nội dung"}</h1>
      <p>
        {zh ? "内容可能暂时不可用，或尚未发布。请稍后重试。" : en
          ? "Please try again. This content may be temporarily unavailable."
          : "Vui lòng thử lại. Nội dung bạn đang tìm có thể tạm thời không khả dụng."}
      </p>
      <button className="button red" onClick={reset}>
        {zh ? "重试" : en ? "Try again" : "Thử lại"}
      </button>
    </section>
  );
}
