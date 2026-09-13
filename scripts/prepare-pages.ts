/**
 * Tạo bản nháp cho năm trang nền, cả ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-pages.ts
 *
 * Trước đây script này viết cứng ["vi", "en"] từ thời website mới có hai ngôn
 * ngữ. Hậu quả trên một cài đặt mới: bản tiếng Trung không có bản ghi trang nào
 * trong CMS, nên công ty không sửa được nội dung tiếng Trung, và `release:check`
 * báo thiếu zh/privacy với zh/terms mãi mãi vì hai trang đó chưa từng tồn tại.
 *
 * Chạy lại nhiều lần không tạo bản trùng.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales, type Locale } from "../src/lib/locales";
import { policyDrafts } from "../src/lib/policy-drafts";
import { zhPolicies } from "../src/lib/zh-content";

type Section = readonly [string, string];

const PAGES = ["home", "about", "contact", "privacy", "terms"] as const;
type PageSlug = (typeof PAGES)[number];

const TITLES: Record<PageSlug, Record<Locale, string>> = {
  home: {
    vi: "Thấu hiểu vấn đề. Vững vàng quyết định.",
    en: "Understand the matter. Decide with confidence.",
    zh: "深入理解问题，从容作出决策。",
  },
  about: {
    vi: "Về Công ty Luật Vũ Khang Solutions & Partners",
    en: "About Vũ Khang",
    zh: "关于 Công ty Luật Vũ Khang Solutions & Partners",
  },
  contact: { vi: "Liên hệ", en: "Contact", zh: "联系我们" },
  privacy: { vi: "Quyền riêng tư", en: "Privacy", zh: "隐私政策" },
  terms: { vi: "Điều khoản sử dụng", en: "Terms of use", zh: "使用条款" },
};

const SUMMARIES: Record<Locale, string> = {
  vi: "Nội dung dự thảo của Công ty Luật Vũ Khang Solutions & Partners — cần rà soát trước khi xuất bản.",
  en: "Draft content for Công ty Luật Vũ Khang Solutions & Partners — review before publication.",
  zh: "Công ty Luật Vũ Khang Solutions & Partners 的内容草案 — 发布前须经审核。",
};

/** Dự thảo chính sách tiếng Trung nằm ở tệp riêng, không nằm trong policyDrafts. */
function policySections(slug: PageSlug, language: Locale): Section[] {
  if (slug !== "privacy" && slug !== "terms") return [];
  return language === "zh"
    ? (zhPolicies[slug] as unknown as Section[])
    : (policyDrafts[slug][language] as unknown as Section[]);
}

const cms = await getPayload({ config });
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin)
  throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let created = 0;
let skipped = 0;

for (const language of locales)
  for (const slug of PAGES) {
    const exists = await cms.count({
      collection: "pages",
      where: {
        and: [{ slug: { equals: slug } }, { language: { equals: language } }],
      },
    });
    if (exists.totalDocs) {
      skipped += 1;
      continue;
    }
    await cms.create({
      collection: "pages",
      user: admin,
      draft: true,
      data: {
        title: TITLES[slug][language],
        slug,
        language,
        translationKey: slug,
        summary: SUMMARIES[language],
        reviewState: "working",
        _status: "draft",
        blocks: policySections(slug, language).map(([heading, body]) => ({
          blockType: "callout" as const,
          visible: true,
          heading,
          body,
        })),
      },
    });
    created += 1;
    console.log("da tao", language, slug);
  }

console.log(
  `\nTao moi: ${created} trang. Bo qua vi da co: ${skipped}.\n` +
    "Tat ca deu la NHAP. Vao /admin de ra soat va xuat ban.",
);
await cms.destroy();
process.exit(0);
