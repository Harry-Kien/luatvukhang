import { getEditor, isEditMode } from "@/lib/editor";
import type { Locale } from "@/lib/content";
import { EditThisPage } from "./admin-bar-client";

const ROLE_LABEL: Record<string, string> = {
  admin: "Quản trị",
  editor: "Biên tập",
  reviewer: "Duyệt chuyên môn",
  publisher: "Xuất bản",
};

/** Chỉ hiện với phiên Payload thật; khách không nhận được một byte nào của thanh này. */
export async function AdminBar({
  locale,
  preview = false,
}: {
  locale: Locale;
  preview?: boolean;
}) {
  const editor = await getEditor();
  if (!editor) return null;
  const editing = await isEditMode();
  return (
    <div className="admin-bar" role="region" aria-label="Thanh quản trị">
      <span className="admin-bar-user">
        <strong>{editor.name || editor.email}</strong>
        <span>{ROLE_LABEL[editor.role] || editor.role}</span>
        {editor.name && (
          <span className="admin-bar-email">{editor.email}</span>
        )}
      </span>
      <nav className="admin-bar-actions" aria-label="Công cụ biên tập">
        <EditThisPage locale={locale} />
        <a href="/admin">Bảng điều khiển</a>
        <form method="post" action="/api/edit-mode">
          <input type="hidden" name="on" value={editing ? "0" : "1"} />
          <button type="submit" className={editing ? "on" : ""}>
            {editing ? "Tắt chế độ sửa" : "Bật chế độ sửa"}
          </button>
        </form>
        {preview && (
          <span className="admin-bar-preview">Đang xem bản nháp</span>
        )}
        <a href="/admin/logout">Đăng xuất</a>
      </nav>
    </div>
  );
}
