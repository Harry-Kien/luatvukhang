import { test, expect } from "@playwright/test";
import {
  addressRegion,
  areaServed,
  organizationJsonLd,
  serviceJsonLd,
} from "../src/lib/seo";
import { seoTitles, seoDescriptions } from "../scripts/content/seo-titles";
import { practiceAreas } from "../scripts/content/practice-areas";

/**
 * Tìm kiếm địa phương ("luật sư Đồng Nai", "luật sư Biên Hòa"): Google cần biết
 * văn phòng ở tỉnh nào, và tiêu đề/mô tả phải chứa đúng cụm người ta gõ.
 */
const ADDRESS =
  "1808 đường Nguyễn Ái Quốc, phường Trấn Biên, Thành phố Đồng Nai";
const SUFFIX = " | Vũ Khang";

test("khu vực phục vụ: tỉnh/thành có văn phòng trước, rồi cả nước", () => {
  expect(addressRegion(ADDRESS)).toBe("Đồng Nai");
  expect(addressRegion("Đồng Nai")).toBeUndefined();
  expect(areaServed(ADDRESS)).toEqual([
    { "@type": "AdministrativeArea", name: "Đồng Nai" },
    { "@type": "Country", name: "Vietnam" },
  ]);
  // Chưa có địa chỉ đủ ba phần: chỉ nêu cả nước, không đoán tỉnh.
  expect(areaServed(null)).toEqual({ "@type": "Country", name: "Vietnam" });
  const service = serviceJsonLd(
    { title: "Hình sự", summary: "Bào chữa." } as never,
    "vi",
    "/vi/services/hinh-su",
    ADDRESS,
  ) as Record<string, unknown>;
  expect(service.areaServed).toEqual(areaServed(ADDRESS));
});

test("hồ sơ tổ chức nêu Biên Hòa, Đồng Nai, khu vực phục vụ và ảnh", () => {
  for (const locale of ["vi", "en", "zh"] as const) {
    const org = organizationJsonLd(
      { companyName: "Vũ Khang", address: ADDRESS },
      locale,
      { services: [{ slug: "hinh-su", title: "Hình sự" }] },
    ) as Record<string, any>;
    expect(org.areaServed[0]).toEqual({
      "@type": "AdministrativeArea",
      name: "Đồng Nai",
    });
    expect(org.image).toMatch(/\/opengraph-image\.png$/);
    expect(org.description, locale).toMatch(/Biên Hòa|边和/);
    expect(org.description, locale).toMatch(/Đồng Nai|同奈/);
    expect(org.description, locale).toContain("Hình sự");
  }
});

test("tiêu đề tìm kiếm trang dịch vụ nêu Đồng Nai và không bị Google cắt", () => {
  for (const [key, title] of Object.entries(seoTitles)) {
    for (const language of ["vi", "en"] as const)
      expect(
        (title[language] + SUFFIX).length,
        `${key}/${language}`,
      ).toBeLessThanOrEqual(65);
    expect((title.zh + SUFFIX).length, `${key}/zh`).toBeLessThanOrEqual(40);
    if (!key.startsWith("services/")) continue;
    expect(title.vi, key).toContain("Đồng Nai");
    expect(title.en, key).toContain("Đồng Nai");
    expect(title.zh, key).toContain("同奈");
  }
  expect(seoTitles["pages/contact"].vi).toContain("Biên Hòa");
});

test("mô tả tìm kiếm trang dịch vụ và trang chủ nêu Đồng Nai, đủ độ dài", () => {
  for (const area of practiceAreas) {
    const d = area.seoDescription;
    for (const language of ["vi", "en"] as const) {
      expect(d[language], `${area.slug}/${language}`).toContain("Đồng Nai");
      expect(
        d[language].length,
        `${area.slug}/${language}`,
      ).toBeGreaterThanOrEqual(70);
      expect(
        d[language].length,
        `${area.slug}/${language}`,
      ).toBeLessThanOrEqual(160);
    }
    expect(d.zh, `${area.slug}/zh`).toContain("同奈");
    expect(d.zh.length, `${area.slug}/zh`).toBeLessThanOrEqual(120);
  }
  const home = seoDescriptions["pages/home"];
  expect(home.vi).toContain("Đồng Nai");
  expect(home.vi).toContain("Biên Hòa");
  expect(home.en).toContain("Đồng Nai");
});
