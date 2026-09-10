/**
 * Sinh bộ nhận diện tĩnh cho website: apple-icon và ảnh chia sẻ mạng xã hội.
 *
 * Chạy lại khi đổi màu thương hiệu:
 *   node scripts/generate-brand-assets.mjs
 *
 * favicon dùng src/app/icon.svg (vector, không cần sinh).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NAVY = "#101d35";
const RED = "#c6283d";
const SERIF = "Noto Serif, Georgia, Times New Roman, serif";
const SANS = "Be Vietnam Pro, Segoe UI, Arial, sans-serif";

/** Monogram VK trên nền navy, dùng cho biểu tượng ứng dụng. */
const appleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${NAVY}"/>
  <rect x="0" y="0" width="180" height="6" fill="${RED}"/>
  <text x="90" y="124" font-family="${SERIF}" font-size="86" font-weight="600"
        fill="#ffffff" text-anchor="middle" letter-spacing="2">VK</text>
</svg>`;

/** Ảnh chia sẻ 1200x630 theo tỉ lệ Open Graph chuẩn. */
const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="0" y="0" width="14" height="630" fill="${RED}"/>
  <g opacity="0.09" stroke="#ffffff" stroke-width="1" fill="none">
    <path d="M760 0 L1200 440"/>
    <path d="M860 0 L1200 340"/>
    <path d="M960 0 L1200 240"/>
    <path d="M1060 0 L1200 140"/>
  </g>
  <text x="96" y="266" font-family="${SERIF}" font-size="104" font-weight="600"
        fill="#ffffff" letter-spacing="6">VŨ KHANG</text>
  <rect x="98" y="318" width="86" height="4" fill="${RED}"/>
  <text x="98" y="392" font-family="${SANS}" font-size="30" font-weight="500"
        fill="#c8d2e0" letter-spacing="7">CÔNG TY LUẬT TNHH</text>
  <text x="98" y="536" font-family="${SANS}" font-size="25"
        fill="#8b98ab" letter-spacing="1">Góc nhìn pháp lý cho những quyết định quan trọng</text>
</svg>`;

async function write(target, svg) {
  const file = resolve(root, target);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, await sharp(Buffer.from(svg)).png().toBuffer());
  console.log("đã tạo", target);
}

await write("src/app/apple-icon.png", appleIcon);
await write("src/app/opengraph-image.png", ogImage);
