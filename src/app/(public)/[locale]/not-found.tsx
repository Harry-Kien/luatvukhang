"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NotFound() {
  const zh = usePathname().startsWith("/zh");
  const en = usePathname().startsWith("/en");
  return (
    <section className="section">
      <span className="eyebrow dark">404</span>
      <h1>{zh ? "未找到页面" : en ? "Page not found" : "Không tìm thấy trang"}</h1>
      <p>
        {zh ? "内容可能暂时不可用，或尚未发布。请稍后重试。" : en
          ? "The address may have changed, or this content has not been published."
          : "Đường dẫn có thể đã thay đổi hoặc nội dung chưa được công bố."}
      </p>
      <Link className="button red" href={zh ? "/zh" : en ? "/en" : "/vi"}>
        {zh ? "返回首页" : en ? "Go to homepage" : "Về trang chủ"} →
      </Link>
    </section>
  );
}
