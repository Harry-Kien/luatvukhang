/**
 * Nạp danh mục cho mục Bài viết và gắn danh mục cho các bài đã có, ba ngôn ngữ.
 *
 *   node --env-file=.env --import tsx scripts/prepare-categories.ts
 *
 * Vì sao cần: trang Góc nhìn có sẵn bộ lọc theo danh mục, nhưng bảng Danh mục
 * trống nên bộ lọc không lọc được gì. Bài viết cũng không hiện thuộc chủ đề
 * nào, khiến người đọc xong một bài không biết còn bài nào cùng chủ đề.
 *
 * Danh mục là nhãn phân loại, không phải khẳng định về năng lực, nên soạn sẵn
 * được. Chạy lại nhiều lần không tạo bản trùng và không gỡ danh mục công ty đã
 * tự gắn.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { locales } from "../src/lib/locales";

type Localised = { vi: string; en: string; zh: string };

const categories: {
  slug: string;
  title: Localised;
  summary: Localised;
}[] = [
  {
    slug: "hop-dong",
    title: { vi: "Hợp đồng", en: "Contracts", zh: "合同" },
    summary: {
      vi: "Soạn thảo, rà soát và xử lý vướng mắc khi thực hiện hợp đồng.",
      en: "Drafting, reviewing and dealing with problems in performing contracts.",
      zh: "合同的起草、审查，以及履行过程中问题的处理。",
    },
  },
  {
    slug: "tranh-chap",
    title: { vi: "Tranh chấp", en: "Disputes", zh: "争议" },
    summary: {
      vi: "Chuẩn bị hồ sơ, thương lượng và các bước trước khi đưa vụ việc ra tòa án hoặc trọng tài.",
      en: "Preparing the file, negotiating, and the steps before a matter goes to court or arbitration.",
      zh: "案卷准备、协商，以及将事项提交法院或仲裁之前的步骤。",
    },
  },
  {
    slug: "dat-dai-nha-o",
    title: { vi: "Đất đai và nhà ở", en: "Land and housing", zh: "土地与住房" },
    summary: {
      vi: "Kiểm tra pháp lý trước giao dịch, chuyển nhượng, đặt cọc và thủ tục đăng ký.",
      en: "Legal checks before a transaction, transfers, deposits and registration procedures.",
      zh: "交易前的法律核查、转让、定金及登记手续。",
    },
  },
  {
    slug: "lao-dong",
    title: { vi: "Lao động", en: "Employment", zh: "劳动" },
    summary: {
      vi: "Hợp đồng lao động, chấm dứt hợp đồng, kỷ luật và quyền lợi của người lao động.",
      en: "Employment contracts, termination, discipline and employee entitlements.",
      zh: "劳动合同、合同终止、纪律处分与劳动者权益。",
    },
  },
  {
    slug: "hon-nhan-gia-dinh",
    title: {
      vi: "Hôn nhân và gia đình",
      en: "Marriage and family",
      zh: "婚姻与家庭",
    },
    summary: {
      vi: "Ly hôn, trông nom con, chia tài sản chung và các thủ tục liên quan.",
      en: "Divorce, care of children, division of marital property and related procedures.",
      zh: "离婚、子女照护、共同财产分割及相关手续。",
    },
  },
  {
    slug: "lam-viec-voi-luat-su",
    title: {
      vi: "Làm việc với luật sư",
      en: "Working with a lawyer",
      zh: "与律师合作",
    },
    summary: {
      vi: "Cần chuẩn bị gì, trao đổi ra sao và những điều nên hỏi trước khi bắt đầu.",
      en: "What to prepare, how to communicate, and what to ask before you begin.",
      zh: "需要准备什么、如何沟通，以及开始之前应当询问的事项。",
    },
  },
];

/** Đường dẫn bài viết -> các danh mục thuộc về. */
const assignments: Record<string, string[]> = {
  "khi-nao-can-luat-su-ra-soat-hop-dong": ["hop-dong"],
  "cac-buoc-truoc-khi-khoi-kien-doi-tac": ["tranh-chap", "hop-dong"],
  "chuan-bi-gi-cho-buoi-gap-luat-su-dau-tien": ["lam-viec-voi-luat-su"],
  "kiem-tra-phap-ly-truoc-khi-dat-coc-mua-dat": ["dat-dai-nha-o", "hop-dong"],
  "cham-dut-hop-dong-lao-dong-dung-trinh-tu": ["lao-dong"],
  "thu-tuc-ly-hon-can-chuan-bi-gi": ["hon-nhan-gia-dinh"],
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
  collection: "categories" | "articles",
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

let created = 0;
for (const category of categories)
  for (const language of locales) {
    if (await findOne("categories", category.slug, language)) continue;
    await cms.create({
      collection: "categories",
      user: admin,
      data: {
        title: category.title[language],
        slug: category.slug,
        language,
        translationKey: category.slug,
        summary: category.summary[language],
        seo: { description: category.summary[language] },
        reviewState: "approved",
        _status: "published",
      },
    });
    created += 1;
    console.log("da tao danh muc", category.slug, language);
  }

let linked = 0;
for (const [articleSlug, categorySlugs] of Object.entries(assignments))
  for (const language of locales) {
    const article = await findOne("articles", articleSlug, language);
    if (!article) {
      console.log(`khong thay bai ${articleSlug}/${language}`);
      continue;
    }
    const current = (article.categories ?? []).map((value: any) =>
      typeof value === "object" ? value.id : value,
    );
    const wanted = [...current];
    for (const slug of categorySlugs) {
      // Danh mục phải cùng ngôn ngữ với bài, nếu không trang tiếng Anh sẽ hiện
      // nhãn tiếng Việt.
      const category = await findOne("categories", slug, language);
      if (category && !wanted.includes(category.id)) wanted.push(category.id);
    }
    if (wanted.length === current.length) continue;
    const live = article._status === "published";
    await cms.update({
      collection: "articles",
      id: article.id,
      user: admin,
      draft: !live,
      data: {
        categories: wanted,
        ...(live ? { _status: "published" } : {}),
      },
    });
    linked += wanted.length - current.length;
    console.log(`da gan ${articleSlug}/${language}`);
  }

console.log(`\nTao moi ${created} danh muc. Gan them ${linked} lien ket.`);
await cms.destroy();
process.exit(0);
