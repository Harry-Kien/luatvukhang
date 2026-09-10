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
  expect(new URL(unsafe.headers().location).pathname).toBe("/zh");
  const absent = await request.get(
    "/api/switch-language?locale=zh&path=%2Fvi%2Farticles%2Fmissing-test-translation",
    { maxRedirects: 0 },
  );
  const url = new URL(absent.headers().location);
  expect(url.pathname).toBe("/zh/articles");
  expect(url.searchParams.get("translation")).toBe("unavailable");
});
