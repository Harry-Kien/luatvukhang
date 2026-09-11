import type { Access, CollectionBeforeChangeHook, FieldAccess } from "payload";
export const roleOf = (user: unknown) =>
  (user as { role?: string } | null)?.role;
export const isAdmin: Access = ({ req }) => roleOf(req.user) === "admin";
export const editorial: Access = ({ req }) =>
  ["admin", "editor", "reviewer", "publisher"].includes(roleOf(req.user) || "");
export const reception: Access = ({ req }) =>
  ["admin", "reception"].includes(roleOf(req.user) || "");
/**
 * Trường chỉ dành cho người làm nội dung.
 *
 * Quyền ở mức bộ sưu tập chỉ quyết định trả về BẢN GHI nào, không quyết định
 * trả về TRƯỜNG nào — nên một bản ghi đã xuất bản vẫn mang theo mọi trường nội
 * bộ khi đọc qua REST API. Dùng cái này cho những trường không bao giờ hiển thị
 * ra website.
 */
export const editorialField: FieldAccess = ({ req }) =>
  ["admin", "editor", "reviewer", "publisher"].includes(roleOf(req.user) || "");
export const canPublish: FieldAccess = ({ req }) =>
  ["admin", "publisher"].includes(roleOf(req.user) || "");
export const publicRead: Access = ({ req }) =>
  ["admin", "editor", "reviewer", "publisher"].includes(roleOf(req.user) || "")
    ? true
    : { _status: { equals: "published" } };
export const publicationGuard: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  const role = roleOf(req.user);
  if (
    data.reviewState === "approved" &&
    !["admin", "reviewer"].includes(role || "") &&
    originalDoc?.reviewState !== "approved"
  )
    throw new Error("Chỉ người duyệt chuyên môn được phê duyệt nội dung.");
  const contentChanged = Object.keys(data).some(
    (key) =>
      !["reviewState", "_status", "updatedAt", "id", "createdAt"].includes(
        key,
      ) && JSON.stringify(data[key]) !== JSON.stringify(originalDoc?.[key]),
  );
  if (contentChanged && !["admin", "reviewer"].includes(role || ""))
    data.reviewState = "working";
  if (data._status === "published") {
    if (!["admin", "publisher"].includes(role || ""))
      throw new Error("Bạn không có quyền xuất bản.");
    if ((data.reviewState ?? originalDoc?.reviewState) !== "approved")
      throw new Error("Nội dung cần được duyệt chuyên môn trước khi xuất bản.");
    if (data.isSample ?? originalDoc?.isSample)
      throw new Error("Không được xuất bản nội dung minh họa.");
  }
  return data;
};
