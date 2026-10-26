// Gửi mọi địa chỉ trong sitemap.xml của website đang chạy lên IndexNow (Bing…).
// Dùng một lần ngay sau khi ra mắt; về sau mỗi lần xuất bản bài, website tự báo.
//
//   npm run indexnow:submit                       # https://luatvukhang.com
//   npm run indexnow:submit -- https://ten-mien-khac.com
import { readFileSync } from "node:fs";

const site = (process.argv[2] || "https://luatvukhang.com").replace(/\/+$/, "");
const key = readFileSync(
  new URL("../src/cms/indexnow-hook.ts", import.meta.url),
  "utf8",
).match(/INDEXNOW_KEY = "([0-9a-f]+)"/)?.[1];
if (!key) throw new Error("Không đọc được INDEXNOW_KEY trong src/cms/indexnow-hook.ts");

const keyFile = await fetch(`${site}/${key}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== key)
  throw new Error(`${site}/${key}.txt chưa mở được — cập nhật mã nguồn lên hosting trước.`);

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length)
  throw new Error("sitemap.xml chưa có địa chỉ nào — website đã được duyệt ra mắt chưa?");

// IndexNow nhận tối đa 10.000 địa chỉ mỗi lần.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(site).host,
      key,
      keyLocation: `${site}/${key}.txt`,
      urlList: batch,
    }),
  });
  console.log(`IndexNow: ${batch.length} địa chỉ → HTTP ${response.status}`);
  if (!response.ok && response.status !== 202) process.exitCode = 1;
}
