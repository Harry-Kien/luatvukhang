/**
 * Thay năm mô tả tìm kiếm dài quá 160 ký tự bằng bản rút gọn.
 *
 *   node --env-file=.env --import tsx scripts/shorten-seo-descriptions.ts
 *
 * Vì sao cần script riêng: prepare-editorial chỉ tạo bài viết chưa có, nên máy
 * chủ đã nạp bài từ trước giữ mô tả cũ mãi mãi dù scripts/content/articles.ts
 * đã sửa. Google cắt mô tả quanh 155–160 ký tự, nên phần đuôi — thường là ý
 * chốt — bị thay bằng dấu "…".
 *
 * Chỉ thay khi ô còn ĐÚNG nguyên văn bản nạp ban đầu: mô tả công ty đã tự viết
 * lại trong CMS được giữ nguyên. Chạy lại bao nhiêu lần cũng không làm gì thêm.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { draftArticles } from "./content/articles";

/** Nguyên văn bản nạp trước ngày 25/09/2026, theo đường dẫn và ngôn ngữ. */
const previous: Record<string, Partial<Record<"vi" | "en" | "zh", string>>> = {
  "khi-nao-can-luat-su-ra-soat-hop-dong": {
    vi: "Năm dấu hiệu doanh nghiệp nên để luật sư rà soát hợp đồng trước khi ký, việc rà soát gồm những gì và cần chuẩn bị gì. Công ty Luật TNHH Vũ Khang Solutions & Partners.",
  },
  "cac-buoc-truoc-khi-khoi-kien-doi-tac": {
    en: "What to do before suing a partner for breach of contract in Vietnam: preserve evidence, notice, negotiation, court versus arbitration, the three-year limitation period.",
  },
  "kiem-tra-phap-ly-truoc-khi-dat-coc-mua-dat": {
    en: "What to check before paying a deposit on land in Vietnam: the certificate, zoning, mortgages, the seller's signing authority, and what the deposit agreement should say.",
  },
  "cham-dut-hop-dong-lao-dong-dung-trinh-tu": {
    en: "Ending an employment contract in Vietnam correctly: grounds under Article 34, notice obligations, severance allowance and what must be completed after the last working day.",
  },
  "thu-tuc-ly-hon-can-chuan-bi-gi": {
    en: "What to prepare for a divorce in Vietnam: mutual consent versus one-party request, the documents required, and why custody is best kept separate from property division.",
  },
};

const cms = await getPayload({ config });
// Bài đang xuất bản chỉ ghi lại được bằng tài khoản có quyền xuất bản.
const admin = (
  await cms.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    limit: 1,
  })
).docs[0];
if (!admin)
  throw Error("Cần có tài khoản quản trị trước. Chạy scripts/bootstrap.ts.");

let changed = 0;
for (const [slug, languages] of Object.entries(previous)) {
  const article = draftArticles.find((a) => a.slug === slug);
  if (!article) throw Error(`Không còn bài ${slug} trong articles.ts`);
  for (const [language, old] of Object.entries(languages) as [
    "vi" | "en" | "zh",
    string,
  ][]) {
    const found = (
      await cms.find({
        collection: "articles",
        where: {
          and: [{ slug: { equals: slug } }, { language: { equals: language } }],
        },
        draft: true,
        limit: 1,
        depth: 0,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (!found || found.seo?.description !== old) continue;
    const live = found._status === "published";
    await cms.update({
      collection: "articles",
      id: found.id,
      user: admin,
      draft: !live,
      data: {
        seo: { ...found.seo, description: article.seoDescription[language] },
        ...(live ? { _status: "published" } : {}),
      } as never,
    });
    changed += 1;
    console.log(`da rut gon articles/${language}/${slug}`);
  }
}

console.log(
  changed
    ? `\nDa rut gon ${changed} mo ta.`
    : "Khong con mo ta nao can rut gon.",
);
await cms.destroy();
process.exit(0);
