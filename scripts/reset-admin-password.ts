/**
 * Lấy lại quyền vào trang quản trị khi quên tài khoản hoặc mật khẩu.
 *
 * Chạy trong Terminal của máy chủ (cần quyền vào máy chủ, nên không ai ngoài
 * người quản lý hosting dùng được):
 *
 *   node --import tsx scripts/reset-admin-password.ts
 *       → liệt kê các tài khoản (email, vai trò), không đổi gì.
 *
 *   node --import tsx scripts/reset-admin-password.ts ten@email.com
 *       → đặt mật khẩu ngẫu nhiên mới cho tài khoản đó, mở khóa nếu đang bị khóa
 *         vì nhập sai nhiều lần, và in mật khẩu mới ra màn hình MỘT lần.
 *
 * Mật khẩu chỉ in ra màn hình, không ghi vào tệp nào. Đăng nhập xong nên đổi
 * ngay sang mật khẩu của riêng bạn (Tài khoản → Đổi mật khẩu).
 */
import "./load-env";
import { randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../src/payload.config";

const ROLE_LABELS: Record<string, string> = {
  admin: "Quản trị hệ thống",
  editor: "Biên tập viên",
  reviewer: "Người duyệt chuyên môn",
  publisher: "Người xuất bản",
  reception: "Nhân viên tiếp nhận",
};

const target = process.argv[2]?.trim().toLowerCase();
const payload = await getPayload({ config });
let exitCode = 0;
try {
  const { docs } = await payload.find({
    collection: "users",
    limit: 100,
    depth: 0,
    overrideAccess: true,
    // lockUntil là trường ẩn; cần để báo tài khoản nào đang bị khóa.
    showHiddenFields: true,
    sort: "createdAt",
  });

  if (!target) {
    if (!docs.length) {
      console.log(
        "Chưa có tài khoản nào. Chạy: node --import tsx scripts/bootstrap.ts",
      );
    } else {
      console.log("Các tài khoản trang quản trị:");
      for (const user of docs) {
        const locked =
          user.lockUntil && new Date(user.lockUntil) > new Date()
            ? "  (đang bị khóa do nhập sai nhiều lần)"
            : "";
        console.log(
          `  - ${user.email}  —  ${ROLE_LABELS[user.role] ?? user.role}${locked}`,
        );
      }
      console.log(
        "\nĐặt lại mật khẩu: node --import tsx scripts/reset-admin-password.ts <email>",
      );
    }
  } else {
    const user = docs.find((doc) => doc.email.toLowerCase() === target);
    if (!user) {
      console.error(
        `Không có tài khoản ${target}. Chạy lệnh không kèm email để xem danh sách.`,
      );
      exitCode = 1;
    } else {
      const password = randomBytes(15).toString("base64url");
      await payload.update({
        collection: "users",
        id: user.id,
        data: { password, loginAttempts: 0, lockUntil: null },
        overrideAccess: true,
      });
      console.log(
        [
          "Đã đặt mật khẩu mới.",
          `  Đăng nhập: ${process.env.NEXT_PUBLIC_SITE_URL || "https://luatvukhang.com"}/admin`,
          `  Email:     ${user.email}`,
          `  Mật khẩu:  ${password}`,
          "Mật khẩu này chỉ hiện một lần. Đăng nhập xong hãy đổi sang mật khẩu của riêng bạn.",
        ].join("\n"),
      );
    }
  }
} finally {
  await payload.destroy();
}
process.exit(exitCode);
