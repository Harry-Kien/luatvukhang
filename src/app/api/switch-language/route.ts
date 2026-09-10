import { NextResponse } from "next/server";
import { getRecords } from "@/lib/cms";
import { demo, samples } from "@/lib/content";
import { resolveLocale, languagePath } from "@/lib/locales";
export async function GET(request: Request) {
  const input = new URL(request.url),
    target = resolveLocale(input.searchParams.get("locale"));
  const route = languagePath(input.searchParams.get("path") || "/vi", target);
  let path = route.path;
  if (route.slug && route.section) {
    const [records, translations] = await Promise.all([
      getRecords(route.section, route.source),
      getRecords(route.section, target),
    ]);
    const original = records.find((r) => r.slug === route.slug);
    const translated = original?.translationKey
      ? translations.find((r) => r.translationKey === original.translationKey)
      : null;
    if (translated) path += "/" + translated.slug;
    else if (
      !original &&
      demo &&
      route.section === "services" &&
      samples.some((s) => s.slug === route.slug)
    )
      path += "/" + route.slug;
    else path += "?translation=unavailable";
  }
  return NextResponse.redirect(
    new URL(path, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  );
}
