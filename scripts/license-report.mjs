import fs from "node:fs/promises";
const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
let out =
  "# Phụ thuộc và giấy phép\n\nPhiên bản đã cài theo package-lock.json. Ngày kiểm tra: 08/09/2026.\n\n| Gói | Phiên bản | Giấy phép | Phạm vi |\n|---|---|---|---|\n";
for (const [scope, deps] of Object.entries({
  runtime: pkg.dependencies,
  development: pkg.devDependencies,
}))
  for (const name of Object.keys(deps)) {
    const p = JSON.parse(
      await fs.readFile("node_modules/" + name + "/package.json", "utf8"),
    );
    out +=
      "| " +
      name +
      " | " +
      p.version +
      " | " +
      (typeof p.license === "string"
        ? p.license
        : JSON.stringify(p.license) || "Review package") +
      " | " +
      scope +
      " |\n";
  }
out +=
  "\nFont Noto Serif và Be Vietnam Pro: SIL Open Font License 1.1; bản giấy phép trong docs/licenses. PostgreSQL binaries dùng giấy phép PostgreSQL, wrapper embedded-postgres chỉ cho phát triển.\n\nPayload/Next.js/TypeScript/Tailwind/next-intl cung cấp nền CMS và giao diện; React Hook Form + Zod xử lý biểu mẫu; Lucide cho biểu tượng; pg cho giới hạn gửi; nodemailer cho SMTP; Playwright + axe cho kiểm thử. Không cài Tailark, Magic UI, Motion hoặc Superpowers vì chưa có chức năng cần chúng. Không tìm thấy Superpowers trong thư mục kỹ năng/plugin đã kiểm tra.\n\nKhông dùng npm audit fix --force. Còn cảnh báo moderate được ghi trong audit-report.json. Lockfile giữ toàn bộ cây phụ thuộc; danh sách này không thay thế rà soát pháp lý giấy phép khi phân phối.\n";
await fs.mkdir("docs/licenses", { recursive: true });
await fs.writeFile("docs/DEPENDENCIES.md", out);
await fs.copyFile(
  "node_modules/@fontsource-variable/noto-serif/LICENSE",
  "docs/licenses/Noto-Serif-OFL.txt",
);
await fs.copyFile(
  "node_modules/@fontsource/be-vietnam-pro/LICENSE",
  "docs/licenses/Be-Vietnam-Pro-OFL.txt",
);
