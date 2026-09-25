/**
 * Đưa website về đúng tám nhóm dịch vụ trong danh mục của công ty.
 *
 *   node --env-file=.env --import tsx scripts/apply-company-catalog.ts
 *
 * Vì sao cần script riêng: các script prepare-* chỉ điền ô đang trống, nên máy
 * chủ đã nạp mười hai lĩnh vực cũ sẽ giữ nguyên tên và phạm vi cũ mãi mãi.
 * Script này làm ba việc, và chạy lại bao nhiêu lần cũng không làm gì thêm:
 *
 *   1. Gỡ lĩnh vực không có trong danh mục (retiredPracticeAreas) khỏi website
 *      và chuyển hướng đường dẫn cũ sang nhóm gần nhất, để liên kết cũ và kết
 *      quả tìm kiếm đã lập chỉ mục không dẫn vào trang 404. Bản ghi được giữ ở
 *      dạng nháp chứ không xóa; publish-drafts bỏ qua chúng.
 *   2. Cập nhật tên, tóm tắt, phạm vi, từ khóa và thẻ SEO của sáu nhóm còn lại —
 *      CHỈ ô nào còn nguyên như bản nạp trước đây (practice-areas-2026-09.json).
 *      Ô công ty đã tự biên tập trong CMS được giữ nguyên.
 *   3. Thêm mục "Năm giá trị chúng tôi giữ" vào trang Về chúng tôi, nếu các mục
 *      của trang vẫn là bốn mục của bản nạp ban đầu.
 *
 * Hai nhóm mới (Sản phẩm pháp lý tiêu chuẩn, Luật sư riêng & tư vấn định kỳ) do
 * prepare-practice-areas.ts tạo ở dạng nháp như mọi nội dung khác.
 */
import { readFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";
import {
  practiceAreas,
  retiredPracticeAreas,
  type Localised,
} from "./content/practice-areas";
import { practiceKeywords } from "./content/keywords";
import { seoTitles } from "./content/seo-titles";
import { pageContent } from "./content/pages";

type Previous = {
  services: Record<
    string,
    {
      title: Localised;
      summary: Localised;
      seoDescription: Localised;
      scope: Localised[];
      keywords: Localised;
      seoTitle: Localised;
    }
  >;
  aboutHeadings: Localised[];
};
const previous: Previous = JSON.parse(
  readFileSync(
    new URL("./content/practice-areas-2026-09.json", import.meta.url),
    "utf8",
  ),
);

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

const findOne = async (
  collection: "services" | "pages",
  slug: string,
  language: string,
) =>
  (
    await cms.find({
      collection,
      where: {
        and: [{ slug: { equals: slug } }, { language: { equals: language } }],
      },
      draft: true,
      limit: 1,
      depth: 0,
    })
  ).docs[0] as Record<string, any> | undefined;

/** Ghi thay đổi mà vẫn giữ trạng thái đã xuất bản của bản ghi. */
const save = async (
  collection: "services" | "pages",
  doc: Record<string, any>,
  data: Record<string, unknown>,
) => {
  const live = doc._status === "published";
  await cms.update({
    collection,
    id: doc.id,
    user: admin,
    draft: !live,
    data: { ...data, ...(live ? { _status: "published" } : {}) } as never,
  });
};

const same = (a: unknown, b: unknown) =>
  String(a ?? "").trim() === String(b ?? "").trim();

// 1. Gỡ lĩnh vực không có trong danh mục.
let retired = 0;
for (const [slug, target] of Object.entries(retiredPracticeAreas))
  for (const language of locales) {
    const from = `/${language}/services/${slug}`;
    const done = await cms.count({
      collection: "redirects",
      where: { from: { equals: from } },
    });
    if (done.totalDocs) continue;
    const doc = await findOne("services", slug, language);
    if (!doc) continue;
    if (doc._status === "published")
      await cms.update({
        collection: "services",
        id: doc.id,
        user: admin,
        data: { _status: "draft" } as never,
      });
    await cms.create({
      collection: "redirects",
      user: admin,
      data: { from, to: `/${language}/services/${target}` },
    });
    retired += 1;
    console.log(`da go ${from} -> /${language}/services/${target}`);
  }

// 2. Cập nhật sáu nhóm còn lại, chỉ ở ô chưa bị biên tập.
let fields = 0;
for (const area of practiceAreas) {
  const old = previous.services[area.slug];
  if (!old) continue;
  for (const language of locales) {
    const doc = await findOne("services", area.slug, language);
    if (!doc) continue;
    const data: Record<string, unknown> = {};
    const swap = (
      key: string,
      current: unknown,
      before: string,
      next: string,
    ) => {
      if (same(current, before) && !same(current, next)) data[key] = next;
    };
    swap("title", doc.title, old.title[language], area.title[language]);
    swap("summary", doc.summary, old.summary[language], area.summary[language]);
    swap(
      "keywords",
      doc.keywords,
      old.keywords[language],
      practiceKeywords[area.slug][language],
    );
    const scopeNow = (doc.scope ?? []).map((row: any) => row.item);
    const scopeBefore = old.scope.map((row) => row[language]);
    const scopeNext = area.scope.map((row) => row[language]);
    if (
      JSON.stringify(scopeNow) === JSON.stringify(scopeBefore) &&
      JSON.stringify(scopeNow) !== JSON.stringify(scopeNext)
    )
      data.scope = scopeNext.map((item) => ({ item }));
    const seo = { ...(doc.seo ?? {}) };
    let seoChanged = false;
    const nextSeoTitle = seoTitles[`services/${area.slug}`]?.[language];
    if (
      nextSeoTitle &&
      same(seo.title, old.seoTitle[language]) &&
      !same(seo.title, nextSeoTitle)
    ) {
      seo.title = nextSeoTitle;
      seoChanged = true;
    }
    if (
      same(seo.description, old.seoDescription[language]) &&
      !same(seo.description, area.seoDescription[language])
    ) {
      seo.description = area.seoDescription[language];
      seoChanged = true;
    }
    if (seoChanged) data.seo = seo;
    if (!Object.keys(data).length) continue;
    await save("services", doc, data);
    fields += Object.keys(data).length;
    console.log(
      `da cap nhat ${area.slug}/${language}: ${Object.keys(data).join(", ")}`,
    );
  }
}

// 3. Thêm năm giá trị cốt lõi vào trang Về chúng tôi.
const about = pageContent.find((page) => page.slug === "about")!;
const values = about.sections[about.sections.length - 1];
let pages = 0;
for (const language of locales) {
  const doc = await findOne("pages", "about", language);
  if (!doc) continue;
  const blocks = (doc.blocks ?? []) as Record<string, any>[];
  const untouched =
    blocks.length === previous.aboutHeadings.length &&
    blocks.every(
      (block, index) =>
        block.blockType === "callout" &&
        same(block.heading, previous.aboutHeadings[index][language]),
    );
  if (!untouched) continue;
  await save("pages", doc, {
    blocks: [
      ...blocks.map(({ id, ...block }) => ({ id, ...block })),
      {
        blockType: "callout",
        visible: true,
        heading: values.heading[language],
        body: values.body[language],
      },
    ],
  });
  pages += 1;
  console.log(`da them gia tri cot loi vao about/${language}`);
}

console.log(
  `\nGo ${retired} trang linh vuc cu. Cap nhat ${fields} o. Them gia tri cot loi vao ${pages} trang.`,
);
await cms.destroy();
process.exit(0);
