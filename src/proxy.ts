import { NextResponse, type NextRequest } from "next/server";
import { canonicalRedirect } from "@/lib/canonical-host";

export function proxy(request: NextRequest) {
  const target = canonicalRedirect(process.env.NEXT_PUBLIC_SITE_URL, {
    host:
      request.headers.get("x-forwarded-host") || request.headers.get("host"),
    path: request.nextUrl.pathname + request.nextUrl.search,
  });
  // 308 giữ nguyên phương thức: một POST gửi tới www vẫn là POST sau chuyển hướng.
  return target ? NextResponse.redirect(target, 308) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
