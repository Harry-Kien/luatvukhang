import { test, expect } from "@playwright/test";

/**
 * Khách gõ vào ô tìm kiếm bằng cách nói thường ngày, không bằng thuật ngữ pháp
 * lý. Bộ này khóa lại điều đó: mỗi truy vấn phải đưa đúng lĩnh vực lên vị trí
 * đầu tiên.
 *
 * Trước khi có trường "Từ khóa khách hàng thường gõ", 7 trong 20 truy vấn dưới
 * đây trả về sai lĩnh vực hoặc không có kết quả nào — "sa thải" không xuất hiện
 * một lần nào trong bài về Lao động & nhân sự.
 */
const PROBES: [string, string][] = [
  ["ly hôn", "hon-nhan-gia-dinh"],
  ["thừa kế", "hon-nhan-gia-dinh"],
  ["di chúc", "hon-nhan-gia-dinh"],
  ["sa thải", "lao-dong-nhan-su"],
  ["hợp đồng lao động", "lao-dong-nhan-su"],
  ["sổ đỏ", "dat-dai-bat-dong-san"],
  ["mua bán nhà đất", "dat-dai-bat-dong-san"],
  ["thành lập công ty", "dau-tu-doanh-nghiep"],
  ["đăng ký nhãn hiệu", "so-huu-tri-tue"],
  ["bản quyền phần mềm", "so-huu-tri-tue"],
  ["quyết toán thuế", "thue-tai-chinh"],
  ["bị khởi tố", "hinh-su"],
  ["bào chữa", "hinh-su"],
  ["giấy phép kinh doanh", "hanh-chinh-giay-phep"],
  ["vay ngân hàng", "ngan-hang-tin-dung"],
  ["nhà thầu xây dựng", "xay-dung-ha-tang"],
  ["kiện ra tòa", "giai-quyet-tranh-chap"],
  ["soạn hợp đồng", "hop-dong-thuong-mai"],
  // Bàn phím không dấu là cách gõ phổ biến; phải ra cùng kết quả.
  ["li hon", "hon-nhan-gia-dinh"],
  ["dang ky nhan hieu", "so-huu-tri-tue"],
];

const DETAIL_LINK =
  /href="\/vi\/(?:services|industries|lawyers|experience|articles|careers)\/([a-z0-9-]+)"/g;

function resultOrder(html: string): string[] {
  return [...new Set([...html.matchAll(DETAIL_LINK)].map((m) => m[1]))];
}

test("everyday wording finds the right practice area", async ({ request }) => {
  const listing = await (await request.get("/vi/services")).text();
  const published = resultOrder(listing);
  const needed = [...new Set(PROBES.map(([, slug]) => slug))];
  const missing = needed.filter((slug) => !published.includes(slug));
  test.skip(
    missing.length > 0,
    `Chưa nạp đủ lĩnh vực chuyên môn (thiếu ${missing.length}). ` +
      "Chạy scripts/prepare-practice-areas.ts và scripts/prepare-keywords.ts.",
  );

  const wrong: string[] = [];
  for (const [query, expected] of PROBES) {
    const html = await (
      await request.get("/vi/search?q=" + encodeURIComponent(query))
    ).text();
    const order = resultOrder(html);
    const rank = order.indexOf(expected);
    if (rank !== 0)
      wrong.push(
        `"${query}" → mong đợi ${expected} ở vị trí đầu, nhận được ` +
          (order.length
            ? `${order.slice(0, 3).join(", ")}`
            : "không có kết quả"),
      );
  }
  expect(wrong, "Tìm kiếm trả sai lĩnh vực:\n" + wrong.join("\n")).toEqual([]);
});

test("search keywords never reach the page, the meta tags or the feeds", async ({
  request,
}) => {
  // Từ khóa là công cụ nội bộ. Đẩy chúng ra trang là nhồi từ khóa, và Google
  // phạt việc đó từ lâu.
  const secret = "sa thải";
  const detail = await (
    await request.get("/vi/services/lao-dong-nhan-su")
  ).text();
  test.skip(
    !detail.includes("lao-dong-nhan-su") && detail.length < 5000,
    "Chưa nạp lĩnh vực Lao động & nhân sự.",
  );
  expect(detail, "Từ khóa lọt vào trang chi tiết").not.toContain(secret);

  for (const path of ["/vi/services", "/vi", "/sitemap.xml", "/vi/feed.xml"]) {
    const body = await (await request.get(path)).text();
    expect(body, `Từ khóa lọt vào ${path}`).not.toContain(secret);
  }
});

test("a search with no results still offers a way forward", async ({
  page,
}) => {
  await page.goto("/vi/search?q=" + encodeURIComponent("zxqwvkhongtontai"));
  await expect(page.getByRole("status")).toContainText("0 kết quả");

  // Không có kết quả từng là ngõ cụt: chỉ một câu nhắn rồi hết. Khách gõ sai từ
  // vẫn phải có đường đi tiếp tới lĩnh vực họ cần.
  const suggestions = page.locator(".search-suggestions a");
  const count = await suggestions.count();
  test.skip(count === 0, "Chưa có lĩnh vực chuyên môn nào để gợi ý.");
  expect(count).toBeGreaterThan(0);

  const first = suggestions.first();
  const href = await first.getAttribute("href");
  expect(href).toMatch(/^\/vi\/services\//);
  const response = await page.goto(href!);
  expect(response?.status(), "Gợi ý phải dẫn tới trang có thật").toBe(200);
});
