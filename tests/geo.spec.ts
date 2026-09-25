import { test, expect } from "@playwright/test";
import { buildLlmsFull } from "../src/lib/llms";
import { organizationJsonLd, serviceJsonLd, absolute } from "../src/lib/seo";

/**
 * GEO/AEO: công cụ AI và công cụ tìm kiếm cần biết công ty làm gì, ai làm và
 * trang gốc nằm đâu. Hai bộ dựng dưới đây là nguồn của /llms-full.txt và của
 * hồ sơ tổ chức trong JSON-LD trên mọi trang.
 */
test("llms-full.txt có liên hệ, phạm vi, quy trình, hỏi đáp và đường dẫn gốc", () => {
  const text = buildLlmsFull({
    siteUrl: "https://luatvukhang.com",
    firm: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    summary: "Tư vấn pháp lý tại Việt Nam.",
    contact: [
      { label: "Điện thoại", value: "0832270898" },
      { label: "Email", value: "" },
    ],
    about: [
      { heading: "Năm giá trị", body: "Trách nhiệm — A\nTrung thực — B" },
    ],
    services: [
      {
        title: "Hình sự",
        path: "/vi/services/hinh-su",
        summary: "Bào chữa.",
        audience: "Bị can,\n gia đình.",
        scope: ["Bào chữa sơ thẩm"],
        process: [{ heading: "Tiếp nhận", description: "Nghe vụ việc." }],
        faq: [
          { question: "Khi nào mời luật sư?", answer: "Càng sớm càng tốt." },
        ],
      },
    ],
    people: [
      {
        name: "Phan Thùy Trang",
        path: "/vi/lawyers/phan-thuy-trang",
        position: "Giám đốc - Luật sư",
      },
    ],
  });

  expect(
    text.startsWith("# Công ty Luật TNHH Vũ Khang Solutions & Partners"),
  ).toBe(true);
  expect(text).toContain("- Điện thoại: 0832270898");
  expect(text, "ô trống không được in ra").not.toContain("- Email:");
  expect(text).toContain("Trách nhiệm — A\nTrung thực — B");
  expect(text).toContain(
    "Trang gốc: https://luatvukhang.com/vi/services/hinh-su",
  );
  expect(text).toContain("Phù hợp với: Bị can, gia đình.");
  expect(text).toContain("- Bào chữa sơ thẩm");
  expect(text).toContain("1. Tiếp nhận: Nghe vụ việc.");
  expect(text).toContain("**Khi nào mời luật sư?**\nCàng sớm càng tốt.");
  expect(text).toContain(
    "- [Phan Thùy Trang](https://luatvukhang.com/vi/lawyers/phan-thuy-trang) — Giám đốc - Luật sư",
  );
});

test("hồ sơ tổ chức nêu danh mục dịch vụ, chuyên môn, đầu mối liên hệ và luật sư", () => {
  const org = organizationJsonLd(
    { companyName: "Vũ Khang", phone: "0832270898" },
    "vi",
    {
      services: [{ slug: "hinh-su", title: "Hình sự" }],
      lawyers: [{ slug: "phan-thuy-trang", title: "Phan Thùy Trang" }],
    },
  ) as Record<string, any>;

  expect(org.knowsAbout).toEqual(["Hình sự"]);
  expect(org.hasOfferCatalog.itemListElement[0].itemOffered).toEqual({
    "@type": "Service",
    "@id": absolute("/vi/services/hinh-su") + "#service",
    name: "Hình sự",
    url: absolute("/vi/services/hinh-su"),
  });
  // Cùng @id với trang hồ sơ luật sư, để hai nơi là một thực thể.
  expect(org.employee[0]["@id"]).toBe(
    absolute("/vi/lawyers/phan-thuy-trang") + "#person",
  );
  expect(org.contactPoint).toMatchObject({
    "@type": "ContactPoint",
    telephone: "0832270898",
  });
  expect(org.contactPoint.email, "email chưa nhập thì bỏ hẳn").toBeUndefined();

  // Chưa có bản ghi xuất bản: không khai danh mục rỗng.
  const bare = organizationJsonLd({ companyName: "Vũ Khang" }, "vi") as Record<
    string,
    any
  >;
  for (const key of [
    "knowsAbout",
    "hasOfferCatalog",
    "employee",
    "contactPoint",
  ])
    expect(bare[key], key).toBeUndefined();
});

test("dịch vụ khai khu vực phục vụ và đối tượng khách hàng", () => {
  const service = serviceJsonLd(
    { title: "Hình sự", slug: "hinh-su", audience: "Bị can và gia đình" },
    "vi",
    "/vi/services/hinh-su",
  ) as Record<string, any>;
  expect(service["@id"]).toBe(absolute("/vi/services/hinh-su") + "#service");
  expect(service.areaServed).toEqual({ "@type": "Country", name: "Vietnam" });
  expect(service.audience).toEqual({
    "@type": "Audience",
    audienceType: "Bị can và gia đình",
  });
});
