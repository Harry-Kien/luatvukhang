import { test, expect } from "@playwright/test";

/**
 * Phông dự phòng phải đọc được tiếng Việt.
 *
 * Website từng khai `Georgia` làm phông dự phòng cho chữ serif. Georgia không
 * có glyph cho nguyên âm mang hai dấu — ấ ầ ế ề ắ ố — nên trình duyệt tự ghép
 * và tiêu đề hiện ra thành "Thâ´u hiê`u" với dấu văng sang bên phải.
 *
 * Vì `font-display: swap`, lỗi này KHÔNG xuất hiện trên máy đã tải xong phông.
 * Nó chỉ hiện với khách vào lần đầu, và hiện vĩnh viễn nếu phông tải hỏng —
 * tức là đúng những người dễ mất nhất, còn người dựng website thì không thấy.
 */
const TWO_MARK_VOWELS = "ấầẩẫậắằẳẵặếềểễệốồổỗộớờởỡợứừửữự";

test("phông dự phòng của tiêu đề đọc được tiếng Việt", async ({ page }) => {
  await page.goto("/vi");
  await page.evaluate(() => document.fonts.ready);

  const stack = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    return h1 ? getComputedStyle(h1).fontFamily : "";
  });

  expect(stack, "tiêu đề phải dùng bộ phông serif đã khai").toContain(
    "Noto Serif",
  );
  expect(
    stack.toLowerCase(),
    "Georgia không có chữ Việt hai dấu — không được dùng làm dự phòng",
  ).not.toContain("georgia");
});

test("nội dung trang chủ giữ nguyên dạng ghép sẵn", async ({ page }) => {
  await page.goto("/vi");

  // Dấu kết hợp rời (U+0300–U+036F) nghĩa là nội dung bị tách dạng NFD. Trông
  // giống hệt lỗi phông ở trên nhưng nguyên nhân khác hẳn, nên tách ra kiểm
  // riêng để lần sau biết ngay phải sửa ở đâu.
  const text = await page.evaluate(() => document.body.innerText);
  expect(text.match(/[̀-ͯ]/g) ?? [], "nội dung phải ở dạng NFC")
    .toHaveLength(0);
  expect(text.normalize("NFC")).toBe(text);
});

test("phông tiếng Việt tải được và phủ đủ nguyên âm hai dấu", async ({
  page,
}) => {
  await page.goto("/vi");
  await page.evaluate(() => document.fonts.ready);

  const faces = await page.evaluate(() =>
    [...document.fonts]
      .filter((f) => f.status === "loaded")
      .map((f) => `${f.family}|${f.unicodeRange}`),
  );

  // Dải U+1EA0-1EF9 chứa toàn bộ nguyên âm hai dấu. Thiếu face phủ dải này thì
  // trình duyệt rơi xuống phông dự phòng, và ta quay lại đúng lỗi cũ.
  expect(
    faces.some((f) => f.includes("Noto Serif") && f.includes("1EA0")),
    `phải có face tiếng Việt cho Noto Serif; hiện có: ${faces.join(", ")}`,
  ).toBeTruthy();

  const missing = await page.evaluate(
    (vowels) =>
      [...vowels].filter(
        (c) => !document.fonts.check('700 60px "Noto Serif Variable"', c),
      ),
    TWO_MARK_VOWELS,
  );
  expect(missing, "mọi nguyên âm hai dấu phải nằm trong dải phông").toEqual([]);
});
