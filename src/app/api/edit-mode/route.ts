import { NextResponse } from "next/server";
import { getEditor, EDIT_COOKIE } from "@/lib/editor";

/** Bật/tắt chế độ sửa. Chuyển hướng về trang vừa đứng để thanh quản trị đổi ngay. */
export async function POST(request: Request) {
  if (!(await getEditor()))
    return NextResponse.json({ error: "Cần đăng nhập." }, { status: 403 });
  const form = await request.formData();
  const on = form.get("on") === "1";
  const referer = request.headers.get("referer");
  let back = "/vi";
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin)
        back = url.pathname + url.search;
    } catch {}
  }
  const response = NextResponse.redirect(new URL(back, request.url), 303);
  if (on)
    response.cookies.set(EDIT_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
    });
  else response.cookies.set(EDIT_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
