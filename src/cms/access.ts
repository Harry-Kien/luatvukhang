import { APIError, type Access, type CollectionBeforeChangeHook, type FieldAccess } from "payload";
/** Lỗi 400 mang thông điệp: Payload giấu thông điệp của Error thường thành "Something went wrong". */
const refuse = (message: string) => {
  const error = new APIError(message, 400, {}, true);
  // Tên lớp có thể bị rút gọn khi đóng gói; Payload dựa vào tên để trả thông điệp.
  error.name = "APIError";
  return error;
};
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
    throw refuse("Chỉ người duyệt chuyên môn được phê duyệt nội dung.");
  const contentChanged = Object.keys(data).some(
    (key) =>
      ![
        "reviewState",
        "_status",
        "updatedAt",
        "id",
        "createdAt",
        "machineTranslated",
        "reviewedBy",
        "reviewedAt",
      ].includes(key) &&
      JSON.stringify(data[key]) !== JSON.stringify(originalDoc?.[key]),
  );
  // Bản dịch máy: ghi nhận ai rà soát và chặn xuất bản khi chưa rà soát.
  const wasMachine = originalDoc?.machineTranslated === true;
  const isMachine = data.machineTranslated ?? originalDoc?.machineTranslated;
  if (wasMachine && data.machineTranslated === false) {
    data.reviewedBy = req.user?.id;
    data.reviewedAt = new Date().toISOString();
  }
  if (contentChanged && !["admin", "reviewer"].includes(role || ""))
    data.reviewState = "working";
  if (data._status === "published") {
    if (!["admin", "publisher"].includes(role || ""))
      throw refuse("Bạn không có quyền xuất bản.");
    if ((data.reviewState ?? originalDoc?.reviewState) !== "approved")
      throw refuse("Nội dung cần được duyệt chuyên môn trước khi xuất bản.");
    if (data.isSample ?? originalDoc?.isSample)
      throw refuse("Không được xuất bản nội dung minh họa.");
    if (isMachine === true)
      throw refuse(
        "Bản dịch máy phải được rà soát trước khi xuất bản. Bấm 'Đã rà soát bản dịch' trong cột phải.",
      );
  }
  return data;
};
