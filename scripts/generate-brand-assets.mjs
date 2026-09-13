/**
 * Sinh bộ nhận diện tĩnh cho website từ logo gốc `design/logo.jpg`:
 * favicon, biểu tượng iOS/Android, ảnh chia sẻ mạng xã hội, logo cho header.
 *
 * Chạy lại khi thay logo hoặc đổi màu thương hiệu:
 *   node scripts/generate-brand-assets.mjs
 *
 * Logo gốc là hình tròn viền vàng trên nền trắng. Script tự dò tâm và bán kính
 * của vòng tròn, cắt bỏ phần nền ngoài vòng (trong suốt) để cùng một huy hiệu
 * dùng được trên nền trắng của header lẫn nền navy của footer.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = resolve(root, "design/logo.jpg");
const NAVY = "#101d35";
const RED = "#c6283d";
const SERIF = "Noto Serif, Georgia, Times New Roman, serif";
const SANS = "Be Vietnam Pro, Segoe UI, Arial, sans-serif";

/** Dò vòng tròn của logo: hộp bao của mọi điểm ảnh không phải nền trắng. */
async function detectCircle() {
  const { data, info } = await sharp(MASTER)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  // Cắt lùi vào trong viền vài điểm ảnh để không lộ viền trắng răng cưa.
  const radius = Math.floor(Math.min(maxX - minX, maxY - minY) / 2) - 4;
  return {
    cx: Math.round((minX + maxX) / 2),
    cy: Math.round((minY + maxY) / 2),
    radius,
  };
}

function circleMask(size) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 0.5}" fill="#fff"/>
    </svg>`,
  );
}

/** Huy hiệu tròn, trong suốt bên ngoài vòng, ở kích thước cho trước. */
async function badge(circle, size) {
  const side = circle.radius * 2;
  return sharp(MASTER)
    .extract({
      left: circle.cx - circle.radius,
      top: circle.cy - circle.radius,
      width: side,
      height: side,
    })
    .resize(size, size, { kernel: "lanczos3" })
    .ensureAlpha()
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png()
    .toBuffer();
}

/** Huy hiệu đặt giữa nền đặc (iOS không nhận nền trong suốt). */
async function onSolid(badgePng, size, background) {
  const meta = await sharp(badgePng).metadata();
  const offset = Math.round((size - meta.width) / 2);
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: badgePng, left: offset, top: offset }])
    .png()
    .toBuffer();
}

/**
 * Đóng gói các PNG thành một tệp .ico (định dạng PNG-in-ICO, mọi trình duyệt
 * hiện đại đều đọc được; Safari và các bộ dò của Google/Zalo vẫn gọi
 * /favicon.ico bất kể thẻ <link>).
 */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, png } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)]);
}

/** Ảnh chia sẻ 1200x630 theo tỉ lệ Open Graph chuẩn: huy hiệu bên trái, chữ bên phải. */
async function ogImage(badge380) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="0" y="0" width="14" height="630" fill="${RED}"/>
  <g opacity="0.09" stroke="#ffffff" stroke-width="1" fill="none">
    <path d="M760 0 L1200 440"/>
    <path d="M860 0 L1200 340"/>
    <path d="M960 0 L1200 240"/>
    <path d="M1060 0 L1200 140"/>
  </g>
  <text x="558" y="204" font-family="${SANS}" font-size="22" font-weight="500"
        fill="#c8d2e0" letter-spacing="6">CÔNG TY LUẬT</text>
  <text x="556" y="292" font-family="${SERIF}" font-size="82" font-weight="600"
        fill="#ffffff" letter-spacing="5">VŨ KHANG</text>
  <rect x="558" y="322" width="86" height="4" fill="${RED}"/>
  <text x="558" y="378" font-family="${SANS}" font-size="26" font-weight="500"
        fill="#c8d2e0" letter-spacing="6">SOLUTIONS &amp; PARTNERS</text>
  <text x="558" y="442" font-family="${SANS}" font-size="22"
        fill="#8b98ab" letter-spacing="1">Góc nhìn pháp lý cho những quyết định quan trọng</text>
</svg>`;
  return sharp(Buffer.from(svg))
    .composite([{ input: badge380, left: 110, top: 125 }])
    .png()
    .toBuffer();
}

async function write(target, buffer) {
  const file = resolve(root, target);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buffer);
  console.log("đã tạo", target, `(${buffer.length} byte)`);
}

const circle = await detectCircle();
console.log("vòng tròn logo:", circle);

const [b16, b32, b48, b160, b192, b380, b400, b512] = await Promise.all(
  [16, 32, 48, 160, 192, 380, 400, 512].map((size) => badge(circle, size)),
);

// Logo dùng trong header/footer và schema.org.
await write("public/brand/logo-192.png", b192);
await write("public/brand/logo-512.png", b512);
// Biểu tượng "maskable" cho Android: huy hiệu nằm gọn trong vùng an toàn 80%.
await write("public/brand/logo-maskable-512.png", await onSolid(b400, 512, "#ffffff"));

// Các tệp Next tự gắn vào <head> theo quy ước tên trong src/app.
await write("src/app/favicon.ico", ico([
  { size: 16, png: b16 },
  { size: 32, png: b32 },
  { size: 48, png: b48 },
]));
await write("src/app/icon.png", b192);
await write("src/app/apple-icon.png", await onSolid(b160, 180, "#ffffff"));
await write("src/app/opengraph-image.png", await ogImage(b380));
