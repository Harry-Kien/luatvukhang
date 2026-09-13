/**
 * Đổi tên công ty trong dữ liệu CMS đã có: tiêu đề, tóm tắt và khối chú thích
 * của các trang, cùng tên trong Cài đặt website nếu đang là tên cũ.
 *
 * Chạy một lần trên mỗi máy chủ có dữ liệu (máy cá nhân và hosting):
 *   node --env-file=.env --import tsx scripts/rename-company.ts
 *
 * Giữ nguyên trạng thái xuất bản: trang đang là bản nháp vẫn là bản nháp.
 * Chỉ thay đúng chuỗi tên cũ; nội dung biên tập khác không bị đụng tới.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const OLD = "Công ty Luật TNHH Vũ Khang";
const NEW = "Công ty Luật Vũ Khang Solutions & Partners";
const swap = (value: unknown) =>
  typeof value === "string" && value.includes(OLD) ? value.split(OLD).join(NEW) : value;

const cms = await getPayload({ config });
try {
  const admin = (
    await cms.find({ collection: "users", where: { role: { equals: "admin" } }, limit: 1 })
  ).docs[0];
  if (!admin) throw new Error("Cần có tài khoản quản trị.");

  let changed = 0;
  const { docs } = await cms.find({ collection: "pages", draft: true, limit: 500 });
  for (const page of docs) {
    const title = swap(page.title);
    const summary = swap(page.summary);
    const blocks = (page.blocks ?? []).map((block) =>
      block.blockType === "callout" ? { ...block, body: swap(block.body) } : block,
    );
    const touched =
      title !== page.title ||
      summary !== page.summary ||
      JSON.stringify(blocks) !== JSON.stringify(page.blocks ?? []);
    if (!touched) continue;
    await cms.update({
      collection: "pages",
      id: page.id,
      user: admin,
      draft: page._status !== "published",
      data: { title, summary, blocks } as never,
    });
    changed++;
    console.log(`đã đổi: [${page.language}] ${page.slug} (${page._status})`);
  }

  const settings = await cms.findGlobal({ slug: "site-settings" });
  if (settings?.companyName?.includes(OLD)) {
    await cms.updateGlobal({
      slug: "site-settings",
      data: { companyName: swap(settings.companyName) as string },
    });
    changed++;
    console.log("đã đổi: Cài đặt website > Tên công ty");
  }
  console.log(changed ? `Xong, ${changed} bản ghi.` : "Không còn bản ghi nào mang tên cũ.");
} finally {
  await cms.destroy();
}
process.exit(0);
