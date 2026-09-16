import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs/promises";

/**
 * Chuyển ngôn ngữ thì không được còn chữ của ngôn ngữ khác trên trang.
 *
 * Menu chính, ba thẻ khám phá, ba bước quy trình và liên kết thêm ở chân trang
 * đều là mảng trong global "Giao diện website". Nhãn bên trong mảng được dịch
 * theo từng ngôn ngữ, nên đây là chỗ dễ sót nhất: phần chữ đơn lẻ đã đúng từ
 * lâu mà bốn mảng này vẫn hiện tiếng Việt ở bản tiếng Anh và tiếng Trung.
 */
const LABELS = {
  vi: [
    "Về chúng tôi",
    "Chuyên môn",
    "Đội ngũ",
    "Kinh nghiệm",
    "Góc nhìn",
    "Liên hệ",
    "Tìm chuyên môn phù hợp",
    "Tìm hiểu đội ngũ luật sư",
    "Gửi yêu cầu tư vấn",
    "Lắng nghe bối cảnh",
    "Làm rõ phạm vi",
    "Thống nhất bước tiếp theo",
    "Ngành nghề",
    "Cơ hội nghề nghiệp",
    "Hướng dẫn khách hàng",
    "Tìm kiếm",
    "Đặt lịch tư vấn",
  ],
  en: [
    "Our firm",
    "Expertise",
    "People",
    "Experience",
    "Insights",
    "Contact",
    "Find the right expertise",
    "Meet the legal team",
    "Request a consultation",
    "Understand the context",
    "Clarify the scope",
    "Agree on next steps",
    "Industries",
    "Careers",
    "Client guide",
    "Search",
    "Request an appointment",
  ],
  zh: [
    "关于我们",
    "专业领域",
    "律师团队",
    "项目经验",
    "法律视角",
    "联系",
    "寻找适合的专业支持",
    "了解律师团队",
    "申请咨询",
    "了解背景",
    "明确范围",
    "商定下一步",
    "行业",
    "招聘",
    "客户指南",
    "搜索",
    "申请预约",
  ],
} as const;

/**
 * Ở khung điện thoại menu chính nằm trong ngăn kéo; đóng thì `innerText` không
 * thấy nhãn nào cả. Mở ra trước khi đọc, nếu không bài kiểm thử sẽ "đạt" chỉ vì
 * chữ đang bị ẩn. Nút mở nhận diện theo lớp CSS, không theo nhãn — chính nhãn
 * là thứ đang được kiểm tra.
 */
async function openMobileMenu(page: Page) {
  if (test.info().project.name !== "mobile") return;
  const toggle = page.locator("button.menu-toggle");
  await expect(toggle).toBeVisible();
  // Cú bấm rơi vào khoảng trước khi React gắn sự kiện thì không có gì xảy ra và
  // ngăn kéo không bao giờ mở. Bấm lại cho tới khi nó thực sự mở.
  await expect(async () => {
    if ((await toggle.getAttribute("aria-expanded")) !== "true")
      await toggle.click();
    await expect(page.locator("#mobile-menu")).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 20000 });
}

for (const locale of ["en", "zh"] as const) {
  test(`trang /${locale} dùng đúng nhãn giao diện của ngôn ngữ mình`, async ({
    page,
  }) => {
    await page.goto("/" + locale);
    await openMobileMenu(page);
    const text = await page.locator("body").innerText();
    for (const label of LABELS[locale])
      expect(text, `thiếu nhãn "${label}" trên /${locale}`).toContain(label);
  });

  test(`trang /${locale} không lẫn nhãn giao diện tiếng Việt`, async ({
    page,
  }) => {
    for (const path of ["/" + locale, "/" + locale + "/services"]) {
      await page.goto(path);
      await openMobileMenu(page);
      const text = await page.locator("body").innerText();
      for (const label of LABELS.vi)
        expect(
          text,
          `nhãn tiếng Việt "${label}" lọt vào ${path}`,
        ).not.toContain(label);
    }
  });
}

/**
 * Mục menu do biên tập viên thêm mới là phép thử thật: dòng dùng chung cho ba
 * ngôn ngữ, nhưng lúc thêm chỉ có nhãn tiếng Việt. Bản tiếng Anh và tiếng Trung
 * phải bỏ qua mục đó, chứ không mượn tạm chữ tiếng Việt.
 */
test("mục menu mới thêm ở bản tiếng Việt không rò sang bản khác", async ({
  page,
  request,
}) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  const auth = { Authorization: "JWT " + (await login.json()).token };
  const before = await (
    await request.get("/api/globals/site-layout?locale=vi&fallback-locale=none")
  ).json();
  const existing = before.header.menu.map((item: Record<string, unknown>) => ({
    label: item.label,
    href: item.href,
    visible: item.visible,
  }));
  // Chèn vào giữa, không nối vào cuối: mục mới phải được nhận ra theo đường
  // dẫn của chính nó, chứ không theo vị trí — nếu theo vị trí thì nó sẽ mượn
  // nhãn của mục mặc định đang đứng ở chỗ đó.
  const menu = [
    ...existing.slice(0, 2),
    { label: "QA Hướng dẫn", href: "/guide", visible: true },
    ...existing.slice(2),
  ];
  try {
    const patch = await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: { header: { menu } },
    });
    expect(patch.ok(), await patch.text()).toBeTruthy();

    await page.goto("/vi");
    await openMobileMenu(page);
    expect(await page.locator("header").innerText()).toContain("QA Hướng dẫn");

    // Lưu menu ở một ngôn ngữ xoá nhãn của hai ngôn ngữ còn lại — các dòng dùng
    // chung, chỉ nhãn mới tách theo ngôn ngữ. Menu của hai bản kia phải còn
    // nguyên, và mục mới chưa có nhãn thì tạm ẩn thay vì mượn chữ tiếng Việt.
    for (const locale of ["en", "zh"] as const) {
      await page.goto("/" + locale);
      await openMobileMenu(page);
      const header = await page.locator("header").innerText();
      expect(header, `nhãn tiếng Việt rò sang /${locale}`).not.toContain(
        "QA Hướng dẫn",
      );
      for (const label of LABELS[locale].slice(0, 6))
        expect(header, `menu /${locale} mất mục "${label}"`).toContain(label);
      await expect(
        page.locator(`header a[href="/${locale}/guide"]`),
        `mục chưa dịch vẫn hiện ở /${locale} kèm nhãn mượn của mục khác`,
      ).toHaveCount(0);
    }
  } finally {
    await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: { header: { menu: before.header.menu } },
    });
  }
});

/**
 * Nhà cung cấp dịch giả lập nối thêm " [en]" / " [zh]" vào câu gốc thay vì dịch.
 * Đó là công cụ kiểm thử, và nó từng ghi thẳng chuỗi tiếng Việt kèm đuôi "[en]"
 * vào menu tiếng Anh của website. Bản chạy thật không được phép gọi tới nó.
 */
test("bản production không dùng nhà cung cấp dịch giả lập", async () => {
  const { translationProvider } =
    await import("../src/cms/translation/provider");
  // NODE_ENV được khai là hằng chỉ đọc ở mức kiểu; đổi tạm trong bài kiểm thử
  // cần một tham chiếu không mang kiểu hẹp đó.
  const env = process.env as Record<string, string | undefined>;
  const mode = env.NODE_ENV;
  const provider = env.TRANSLATION_PROVIDER;
  try {
    env.TRANSLATION_PROVIDER = "mock";
    env.NODE_ENV = "development";
    expect(translationProvider()).toBe("mock");
    env.NODE_ENV = "production";
    expect(translationProvider()).not.toBe("mock");
  } finally {
    env.NODE_ENV = mode;
    env.TRANSLATION_PROVIDER = provider;
  }
});
