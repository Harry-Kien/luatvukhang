import { cache } from "react";
import { cookies, headers } from "next/headers";
import { getCMS } from "./cms";
import { roleOf } from "@/cms/access";

export const EDIT_COOKIE = "vk-edit";
const EDITOR_ROLES = ["admin", "editor", "reviewer", "publisher"];

export type Editor = {
  id: string | number;
  email: string;
  name?: string;
  role: string;
};

/**
 * Người biên tập đang đăng nhập, hoặc null. Bọc cache() để layout, trang và
 * mọi <Editable> trong cùng một lượt render chỉ xác thực một lần.
 */
export const getEditor = cache(
  async function getEditor(): Promise<Editor | null> {
    if (!process.env.DATABASE_URL) return null;
    try {
      const cms = await getCMS();
      const { user } = await cms.auth({ headers: await headers() });
      const role = roleOf(user);
      if (!user || !role || !EDITOR_ROLES.includes(role)) return null;
      return {
        id: user.id,
        email: user.email,
        name: (user as { name?: string }).name,
        role,
      };
    } catch {
      return null;
    }
  },
);

/** Chế độ sửa chỉ có ý nghĩa khi đã đăng nhập; cookie một mình không bật được gì. */
export const isEditMode = cache(async function isEditMode() {
  if (!(await getEditor())) return false;
  return (await cookies()).get(EDIT_COOKIE)?.value === "1";
});
