import { getPayload } from "payload";
import config from "../src/payload.config";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
const payload = await getPayload({ config });
const records = await payload.find({ collection: "users", limit: 1 });
if (!records.docs.length) {
  const password = randomBytes(20).toString("base64url");
  await payload.create({
    collection: "users",
    data: {
      email: "admin@local.invalid",
      name: "Quản trị phát triển",
      password,
      role: "admin",
    },
    overrideAccess: true,
  });
  await fs.mkdir(".local", { recursive: true });
  await fs.writeFile(
    ".local/admin-access.txt",
    "Admin: http://localhost:3000/admin\nEmail: admin@local.invalid\nPassword: " +
      password +
      "\nLocal development only. Change before deployment.\n",
  );
  console.log(
    "Local admin created. Credentials saved in .local/admin-access.txt (not committed).",
  );
} else console.log("Existing users preserved.");
await payload.destroy();
process.exit();
