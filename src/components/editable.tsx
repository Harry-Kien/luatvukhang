import { isEditMode } from "@/lib/editor";

export type EditTarget =
  | { collection: string; id: string | number }
  | { global: "site-layout"; tab: "header" | "home" | "footer" | "contact" }
  | { global: "site-settings" };

export function editHref(target: EditTarget) {
  if ("collection" in target)
    return `/admin/collections/${target.collection}/${target.id}/preview`;
  if (target.global === "site-layout")
    return `/admin/globals/site-layout#tab-${target.tab}`;
  return "/admin/globals/site-settings";
}

/**
 * Khách và người biên tập chưa bật chế độ sửa nhận về đúng children — không
 * thêm phần tử, không thêm lớp. Chỉ khi chế độ sửa bật mới bọc thêm khung và
 * liên kết bút chì tới màn hình biên tập tương ứng.
 */
export async function Editable({
  target,
  label,
  children,
}: {
  target: EditTarget;
  label: string;
  children: React.ReactNode;
}) {
  if (!(await isEditMode())) return <>{children}</>;
  return (
    <div className="editable">
      <a className="editable-link" href={editHref(target)}>
        ✎ Sửa {label}
      </a>
      {children}
    </div>
  );
}
