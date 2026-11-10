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
 *   4. Khi mục Ngành nghề đang tắt (industriesEnabled), gỡ các ngành đã xuất
 *      bản và chuyển hướng cả trang danh sách lẫn từng ngành về trang Chuyên
 *      môn. Bản ghi giữ ở dạng nháp; publish-drafts không đăng lại.
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
import { industriesEnabled } from "./content/industries";

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

/**
 * Mô tả tìm kiếm đã nạp lên máy chủ ở các đợt sau bản 25/09/2026 và đã được
 * thay tiếp trong practice-areas.ts. Ô còn đúng nguyên văn một trong các bản
 * này cũng được cập nhật như bản gốc.
 */
const supersededSeoDescriptions: Record<
  string,
  Partial<Record<"vi" | "en" | "zh", string[]>>
> = {
  // dau-tu-doanh-nghiep/en đầu tiên: dài 176 ký tự, Google cắt mất phần cuối
  // (thay ngày 18/10/2026). Còn lại: mô tả trước ngày 10/11/2026, thay bằng
  // bản nêu "tại Đồng Nai" để nhắm tìm kiếm địa phương.
  "dau-tu-doanh-nghiep": {
    vi: [
      "Luật sư doanh nghiệp và thương mại: thành lập, thay đổi đăng ký, soạn và rà soát hợp đồng, thu hồi công nợ, tranh chấp thương mại và cổ đông, giải thể.",
    ],
    en: [
      "Corporate and commercial lawyers in Vietnam: incorporation, registration changes, contract drafting and review, debt recovery, commercial and shareholder disputes, dissolution.",
      "Corporate and commercial lawyers in Vietnam: incorporation, registration changes, contracts, debt recovery, commercial and shareholder disputes, dissolution.",
    ],
    zh: [
      "越南企业与商事律师：设立企业、变更登记、起草与审查合同、追收欠款、商事与股东纠纷、解散。",
    ],
  },
  "giai-quyet-tranh-chap": {
    vi: [
      "Luật sư dân sự và tranh chấp: tranh chấp hợp đồng, đòi nợ, tài sản, thừa kế, bồi thường thiệt hại, thương lượng và hòa giải, thi hành án dân sự.",
    ],
    en: [
      "Civil and dispute lawyers in Vietnam: contract disputes, debt claims, property, inheritance, compensation, negotiation and mediation, enforcement of judgments.",
    ],
    zh: [
      "越南民事与纠纷律师：合同纠纷、追讨欠款、财产、继承、损害赔偿、协商与调解、民事判决执行。",
    ],
  },
  "lao-dong-nhan-su": {
    vi: [
      "Luật sư lao động và quản trị nội bộ: hợp đồng lao động, nội quy, quy chế quản trị, kỷ luật và chấm dứt hợp đồng, tranh chấp lao động.",
    ],
    en: [
      "Employment and governance lawyers in Vietnam: employment contracts, workplace rules, internal regulations, discipline and termination, employment disputes.",
    ],
    zh: [
      "越南劳动与内部治理律师：劳动合同、劳动规章、内部管理制度、纪律处分与解除合同、劳动争议。",
    ],
  },
  "dat-dai-bat-dong-san": {
    vi: [
      "Luật sư đất đai và nhà ở: tranh chấp quyền sử dụng đất, ranh giới, chuyển nhượng, thừa kế nhà đất, sang tên, cấp và đính chính sổ, khiếu nại thu hồi đất.",
    ],
    en: [
      "Land and housing lawyers in Vietnam: land use right disputes, boundaries, transfers, inherited property, title transfer, certificates, land recovery complaints.",
    ],
    zh: [
      "越南土地与住房律师：土地使用权纠纷、地界、转让、房地产继承、过户、颁证与更正、征地申诉。",
    ],
  },
  "hon-nhan-gia-dinh": {
    vi: [
      "Luật sư hôn nhân và gia đình: ly hôn thuận tình, ly hôn đơn phương, ly hôn có yếu tố nước ngoài, quyền nuôi con, cấp dưỡng, chia tài sản khi ly hôn.",
    ],
    en: [
      "Marriage and family lawyers in Vietnam: consensual and contested divorce, divorce with a foreign element, child custody, maintenance, property on divorce.",
    ],
    zh: [
      "越南婚姻家庭律师：协议离婚、诉讼离婚、涉外离婚、子女抚养权、抚养费、离婚财产分割。",
    ],
  },
  "hinh-su": {
    vi: [
      "Bào chữa và bảo vệ quyền lợi trong vụ án hình sự: tham gia từ giai đoạn đầu, nghiên cứu hồ sơ, chuẩn bị cho từng bước tố tụng, bảo mật thông tin.",
    ],
    en: [
      "Criminal defence in Vietnam: early involvement, case file review, preparation for each stage of proceedings, and strict confidentiality.",
    ],
    zh: [
      "刑事案件辩护与权益维护：自初期阶段介入、研究案卷、为各诉讼阶段做好准备，并严格保密。",
    ],
  },
  "san-pham-phap-ly-tieu-chuan": {
    vi: [
      "Sản phẩm pháp lý tiêu chuẩn: soạn đơn theo yêu cầu, bộ mẫu đơn và mẫu hợp đồng, kiểm tra hồ sơ pháp lý trực tuyến, mẫu đơn cho sàn thương mại điện tử.",
    ],
    en: [
      "Standard legal products in Vietnam: applications drafted on request, form and contract template sets, online document review, e-commerce platform forms.",
    ],
    zh: [
      "标准化法律产品：按需起草文书、文书与合同范本、在线材料审查、电商平台文书范本。",
    ],
  },
  "luat-su-rieng-tu-van-dinh-ky": {
    vi: [
      "Luật sư riêng và tư vấn pháp lý định kỳ: luật sư gia đình, luật sư riêng cho doanh nghiệp các gói Basic, Pro, Premium, cố vấn pháp lý cho chủ doanh nghiệp.",
    ],
    en: [
      "Retained counsel in Vietnam: family lawyer, retained lawyer for businesses on Basic, Pro and Premium packages, legal adviser to business owners.",
    ],
    zh: [
      "常年法律顾问：家庭律师、企业常年律师（基础、专业、高级套餐）、企业主法律顾问。",
    ],
  },
};

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
      (same(seo.description, old.seoDescription[language]) ||
        (supersededSeoDescriptions[area.slug]?.[language] ?? []).some((text) =>
          same(seo.description, text),
        )) &&
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

// 4. Gỡ mục Ngành nghề khi đang tắt. Đánh dấu đã làm bằng chính bản ghi chuyển
// hướng: có rồi thì bỏ qua, nên công ty mở lại một ngành trong CMS sẽ không bị
// lần cập nhật sau gỡ xuống.
let industries = 0;
if (!industriesEnabled)
  for (const language of locales) {
    const target = `/${language}/services`;
    const docs = (
      await cms.find({
        collection: "industries",
        where: { language: { equals: language } },
        draft: true,
        pagination: false,
        depth: 0,
      })
    ).docs as Record<string, any>[];
    // Máy chưa từng có ngành nào (cài mới, CI) thì không cần chuyển hướng gì.
    if (!docs.length) continue;
    for (const path of [
      `/${language}/industries`,
      ...docs.map((doc) => `/${language}/industries/${doc.slug}`),
    ]) {
      const done = await cms.count({
        collection: "redirects",
        where: { from: { equals: path } },
      });
      if (done.totalDocs) continue;
      const slug = path.split("/")[3];
      const doc = slug ? docs.find((d) => d.slug === slug) : undefined;
      if (doc?._status === "published")
        await cms.update({
          collection: "industries",
          id: doc.id,
          user: admin,
          data: { _status: "draft" } as never,
        });
      await cms.create({
        collection: "redirects",
        user: admin,
        data: { from: path, to: target },
      });
      industries += 1;
      console.log(`da go ${path} -> ${target}`);
    }
  }

console.log(
  `\nGo ${retired} trang linh vuc cu, ${industries} trang nganh nghe. Cap nhat ${fields} o. Them gia tri cot loi vao ${pages} trang.`,
);
await cms.destroy();
process.exit(0);
