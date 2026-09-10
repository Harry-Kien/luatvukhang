"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

/**
 * Bảng chữ khai tại chỗ thay vì dùng từ điển dùng chung: đây là component
 * client, nhập cả từ điển sẽ đẩy toàn bộ bản dịch xuống trình duyệt chỉ để
 * hiển thị một trang lỗi.
 */
const text = {
  vi: {
    title: "Không tìm thấy trang",
    body: "Đường dẫn có thể đã thay đổi, hoặc nội dung chưa được công bố. Bạn có thể bắt đầu lại từ một trong những mục dưới đây.",
    home: "Về trang chủ",
    sections: [
      ["services", "Chuyên môn"],
      ["lawyers", "Đội ngũ luật sư"],
      ["articles", "Góc nhìn pháp lý"],
      ["guide", "Hướng dẫn khách hàng"],
      ["contact", "Liên hệ"],
    ],
    searchLabel: "Hoặc tìm theo từ khóa",
    searchAction: "Tìm kiếm",
  },
  en: {
    title: "Page not found",
    body: "The address may have changed, or this content has not been published. You can start again from one of the sections below.",
    home: "Go to homepage",
    sections: [
      ["services", "Expertise"],
      ["lawyers", "Our people"],
      ["articles", "Legal insights"],
      ["guide", "Client guide"],
      ["contact", "Contact"],
    ],
    searchLabel: "Or search by keyword",
    searchAction: "Search",
  },
  zh: {
    title: "未找到页面",
    body: "该网址可能已变更，或相关内容尚未发布。您可以从以下栏目重新开始。",
    home: "返回首页",
    sections: [
      ["services", "专业领域"],
      ["lawyers", "律师团队"],
      ["articles", "法律视角"],
      ["guide", "客户指南"],
      ["contact", "联系我们"],
    ],
    searchLabel: "或按关键词搜索",
    searchAction: "搜索",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en")
    ? "en"
    : pathname.startsWith("/zh")
      ? "zh"
      : "vi";
  const t = text[locale];
  return (
    <section className="section not-found">
      <span className="eyebrow dark">404</span>
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      <nav className="not-found-links" aria-label={t.title}>
        {t.sections.map(([slug, label]) => (
          <Link key={slug} href={`/${locale}/${slug}`}>
            <span>{label}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <form className="not-found-search" action={`/${locale}/search`}>
        <label htmlFor="not-found-q">{t.searchLabel}</label>
        <div>
          <input id="not-found-q" name="q" maxLength={150} />
          <button className="button red">{t.searchAction}</button>
        </div>
      </form>
      <Link className="underlined" href={`/${locale}`}>
        {t.home} →
      </Link>
    </section>
  );
}
