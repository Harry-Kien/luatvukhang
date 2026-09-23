import { test, expect } from "@playwright/test";
import { languagePath, resolveLocale, languageInfo } from "../src/lib/locales";
test("language routing only accepts supported public paths", () => {
  expect(resolveLocale("CH")).toBe("vi");
  expect(languageInfo.zh.tag).toBe("zh-Hans");
  expect(languagePath("/vi/articles/legal-update", "zh")).toMatchObject({
    source: "vi",
    section: "articles",
    slug: "legal-update",
    path: "/zh/articles",
  });
  for (const path of [
    "https://example.com",
    "//example.com",
    "/vi/admin",
    "/vi/about?preview=true",
    "/vi/../../admin",
  ])
    expect(languagePath(path, "zh").path).toBe("/zh");
});
test("language switch stays internal and missing translations remain explicit", async ({
  request,
}) => {
  const unsafe = await request.get(
    "/api/switch-language?locale=zh&path=https%3A%2F%2Fexample.com",
    { maxRedirects: 0 },
  );
  const base = "http://127.0.0.1:3000";
  expect(new URL(unsafe.headers().location, base).pathname).toBe("/zh");
  const absent = await request.get(
    "/api/switch-language?locale=zh&path=%2Fvi%2Farticles%2Fmissing-test-translation",
    { maxRedirects: 0 },
  );
  const url = new URL(absent.headers().location, base);
  expect(url.pathname).toBe("/zh/articles");
  expect(url.searchParams.get("translation")).toBe("unavailable");
});

/**
 * Đổi ngôn ngữ phải giữ khách ở đúng tên miền họ đang xem.
 *
 * Chuyển hướng dựng từ NEXT_PUBLIC_SITE_URL thì mọi lần đổi ngôn ngữ đều ném
 * khách sang tên miền đã khai trong cấu hình. Website nào cũng trả lời ở cả
 * `ten-mien.vn` lẫn `www.ten-mien.vn`, nên khách vào bằng địa chỉ kia sẽ bị
 * nhảy host giữa chừng — mất phiên, mất cả ô đang điền dở. Trình duyệt còn
 * chặn luôn lượt tải trước vì `connect-src 'self'` trong CSP, nên nút đổi
 * ngôn ngữ mất phần tải sẵn và mỗi lần bấm là một vòng chờ mới.
 *
 * Địa chỉ tương đối không có tên miền nào để nhảy sang: trình duyệt tự ghép
 * vào đúng nơi khách đang đứng. Nó cũng không mở ra chuyển hướng ra ngoài,
 * vì `languagePath` đã ép đường dẫn bắt đầu bằng /vi, /en hoặc /zh.
 */
test("đổi ngôn ngữ chuyển hướng bằng địa chỉ tương đối, không kèm tên miền", async ({
  request,
}) => {
  for (const path of ["%2Fvi%2Fabout", "%2Fvi", "https%3A%2F%2Fexample.com"]) {
    const response = await request.get(
      `/api/switch-language?locale=en&path=${path}`,
      { maxRedirects: 0 },
    );
    const location = response.headers().location;
    expect(location, "thiếu header Location").toBeTruthy();
    expect(
      location.startsWith("/"),
      `Location phải tương đối, nhận được: ${location}`,
    ).toBe(true);
    expect(location.startsWith("//")).toBe(false);
  }
});
