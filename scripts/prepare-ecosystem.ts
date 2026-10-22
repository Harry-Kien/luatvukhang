/**
 * Nạp sẵn ô "Hệ sinh thái" trong Cài đặt — đúng một lần trên mỗi cơ sở dữ liệu.
 *
 *   node --env-file=.env --import tsx scripts/prepare-ecosystem.ts
 *
 * Trước 22/10/2026 thẻ Luật Việt ghi cứng trong mã. Nay công ty tự thêm, xóa,
 * sửa trong admin; script này chỉ chuyển dữ liệu cũ sang (tải logo lên thư viện
 * ảnh, điền tên, vai trò và câu giới thiệu ba ngôn ngữ, đường dẫn) rồi đánh dấu
 * đã nạp. Công ty xóa hết thành viên thì lần cài sau không tự thêm lại; công ty
 * đã tự nhập trước thì giữ nguyên.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { DEFAULT_ECOSYSTEM } from "../src/lib/ecosystem";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cms = await getPayload({ config });
const current = (await cms.findGlobal({
  slug: "site-settings",
  depth: 0,
})) as unknown as { ecosystemSeeded?: boolean; ecosystem?: unknown[] };

if (current.ecosystemSeeded) {
  console.log(
    "He sinh thai: da nap truoc day, giu nguyen noi dung trong admin.",
  );
} else if (current.ecosystem?.length) {
  await cms.updateGlobal({
    slug: "site-settings",
    data: { ecosystemSeeded: true },
  });
  console.log("He sinh thai: cong ty da tu nhap, giu nguyen.");
} else {
  const members = [];
  for (const member of DEFAULT_ECOSYSTEM) {
    const filename = path.basename(member.logoFile);
    const existing = (
      await cms.find({
        collection: "media",
        where: { filename: { equals: filename } },
        limit: 1,
        depth: 0,
      })
    ).docs[0];
    const logo =
      existing ??
      (await cms.create({
        collection: "media",
        filePath: path.resolve(root, member.logoFile),
        data: {
          alt: "Logo " + member.name,
          credit: member.name,
          rights:
            "Chủ website cung cấp ngày 21/10/2026 để hiện trong mục Hệ sinh thái.",
        },
      }));
    members.push({ member, logo: logo.id });
  }
  const saved = (await cms.updateGlobal({
    slug: "site-settings",
    locale: "vi",
    depth: 0,
    data: {
      ecosystemSeeded: true,
      ecosystem: members.map(({ member, logo }) => ({
        name: member.name,
        role: member.role.vi,
        summary: member.summary.vi,
        logo,
        url: member.url,
      })),
    },
  })) as unknown as { ecosystem: { id: string }[] };
  // Vai trò và câu giới thiệu có ba ngôn ngữ: ghi bản tiếng Anh, tiếng Trung
  // vào cùng các dòng vừa tạo (giữ nguyên id dòng).
  for (const locale of ["en", "zh"] as const)
    await cms.updateGlobal({
      slug: "site-settings",
      locale,
      depth: 0,
      data: {
        ecosystem: members.map(({ member, logo }, index) => ({
          id: saved.ecosystem[index].id,
          name: member.name,
          role: member.role[locale],
          summary: member.summary[locale],
          logo,
          url: member.url,
        })),
      },
    });
  console.log(
    "Da nap he sinh thai vao Cai dat:",
    members.map(({ member }) => member.name).join(", "),
  );
}
await cms.destroy();
process.exit(0);
