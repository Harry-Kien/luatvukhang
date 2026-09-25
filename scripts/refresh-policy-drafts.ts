/**
 * Thay bản nháp Quyền riêng tư và Điều khoản bằng văn bản hoàn chỉnh mới.
 *
 *   node --env-file=.env --import tsx scripts/refresh-policy-drafts.ts
 *
 * Vì sao cần: prepare-pages chỉ tạo trang chưa có, nên máy chủ đã nạp bản dự
 * thảo khung (đầy "cần xác nhận", "chưa được công ty xác nhận") giữ nó mãi mãi
 * dù src/lib/policy-drafts.ts đã có văn bản hoàn chỉnh. Luật sư công ty mở
 * /admin sẽ chỉ thấy bản khung cũ.
 *
 * Chỉ thay khi trang CHƯA XUẤT BẢN và nội dung còn đúng nguyên văn bản khung
 * (policy-drafts-2026-09.json). Trang công ty đã sửa hoặc đã xuất bản được giữ
 * nguyên. Kết quả vẫn là NHÁP: chỉ có hiệu lực khi luật sư duyệt và xuất bản.
 * Chạy lại bao nhiêu lần cũng không làm gì thêm.
 */
import { readFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales, type Locale } from "../src/lib/locales";
import { policyDrafts } from "../src/lib/policy-drafts";
import { zhPolicies } from "../src/lib/zh-content";
import { POLICY_SUMMARIES, SUMMARIES } from "./content/page-summaries";

type Section = readonly [string, string];
type Slug = "privacy" | "terms";

const previous: Record<Slug, Record<Locale, Section[]>> = JSON.parse(
  readFileSync(
    new URL("./content/policy-drafts-2026-09.json", import.meta.url),
    "utf8",
  ),
);
const current = (slug: Slug, language: Locale) =>
  (language === "zh"
    ? zhPolicies[slug]
    : policyDrafts[slug][language]) as unknown as Section[];
const same = (a: Section[], b: Section[]) =>
  a.length === b.length &&
  a.every(([h, t], i) => h === b[i][0] && t === b[i][1]);

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

let changed = 0;
for (const slug of ["privacy", "terms"] as const)
  for (const language of locales) {
    const page = (
      await cms.find({
        collection: "pages",
        where: {
          and: [{ slug: { equals: slug } }, { language: { equals: language } }],
        },
        draft: true,
        limit: 1,
        depth: 0,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (!page || page._status === "published") continue;
    const sections: Section[] = (page.blocks ?? []).map(
      (b: Record<string, string>) => [b.heading ?? "", b.body ?? ""] as const,
    );
    if (!same(sections, previous[slug][language])) continue;
    await cms.update({
      collection: "pages",
      id: page.id,
      user: admin,
      draft: true,
      data: {
        blocks: current(slug, language).map(([heading, body]) => ({
          blockType: "callout",
          visible: true,
          heading,
          body,
        })),
        ...(page.summary === SUMMARIES[language]
          ? { summary: POLICY_SUMMARIES[slug][language] }
          : {}),
      } as never,
    });
    changed += 1;
    console.log(`da cap nhat ban nhap pages/${language}/${slug}`);
  }

console.log(
  changed
    ? `\nDa thay ${changed} ban nhap chinh sach. Van la NHAP: luat su ra soat ` +
        "va xuat ban trong /admin, roi danh dau 'Chinh sach quyen rieng tu da " +
        "duoc ra soat' trong Cai dat."
    : "Khong con ban nhap chinh sach nao can thay.",
);
await cms.destroy();
process.exit(0);
