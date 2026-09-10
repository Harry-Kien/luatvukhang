/**
 * Sinh biến thể responsive cho ảnh tĩnh trong public/images.
 *
 * Ảnh hero gốc là 1800x2700. Không có biến thể thì điện thoại rộng 390px vẫn
 * tải đủ 366 KB cho một vùng hiển thị nhỏ hơn nhiều lần.
 *
 *   node scripts/optimize-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public/images");

/** Bề rộng bám theo bố cục thật: ~93vw trên điện thoại, ~49vw trên máy tính. */
const WIDTHS = [800, 1200];
const SOURCES = ["architecture", "saigon"];

for (const name of SOURCES) {
  const source = join(dir, `${name}.jpg`);
  const original = await sharp(source).metadata();
  for (const width of WIDTHS) {
    if (width >= (original.width ?? 0)) continue;
    const target = join(dir, `${name}-${width}.webp`);
    await sharp(source)
      .resize({ width })
      .webp({ quality: 78 })
      .toFile(target);
    const { size } = await stat(target);
    console.log(`${name}-${width}.webp  ${Math.round(size / 1024)} KB`);
  }
}

const files = await readdir(dir);
console.log("\nThư mục public/images sau khi sinh:");
for (const file of files.sort()) {
  const { size } = await stat(join(dir, file));
  console.log(`  ${file.padEnd(28)} ${Math.round(size / 1024)} KB`);
}
