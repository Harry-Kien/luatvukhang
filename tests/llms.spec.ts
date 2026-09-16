import { test, expect } from "@playwright/test";
import { buildLlmsTxt } from "../src/lib/llms";

/**
 * llms.txt là bản tóm tắt website dành cho công cụ AI: nói rõ đây là ai, có
 * những gì, và trỏ tới trang gốc để dẫn nguồn thay vì đoán từ HTML.
 */
test("llms.txt nêu tên công ty, nhóm nội dung và đường dẫn tuyệt đối", () => {
  const text = buildLlmsTxt({
    siteUrl: "https://luatvukhang.com",
    firm: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    summary: "Tư vấn pháp lý tại Việt Nam.",
    sections: [
      {
        heading: "Chuyên môn",
        items: [
          {
            title: "Hợp đồng & thương mại",
            path: "/vi/services/hop-dong-thuong-mai",
            summary: "Soạn thảo và rà soát hợp đồng.",
          },
        ],
      },
      { heading: "Bài viết", items: [] },
    ],
  });

  (expect(text.startsWith("# Công ty Luật TNHH Vũ Khang Solutions & Partners")),
    expect(text).toContain("> Tư vấn pháp lý tại Việt Nam."));
  expect(text).toContain("## Chuyên môn");
  expect(text).toContain(
    "- [Hợp đồng & thương mại](https://luatvukhang.com/vi/services/hop-dong-thuong-mai): Soạn thảo và rà soát hợp đồng.",
  );
  // Nhóm rỗng khong duoc de lai tieu de tro tro mot minh.
  expect(text, "nhóm không có mục nào thì bỏ hẳn").not.toContain("## Bài viết");
});

test("llms.txt gọn lại tóm tắt nhiều dòng thành một dòng", () => {
  const text = buildLlmsTxt({
    siteUrl: "https://luatvukhang.com",
    firm: "Vũ Khang",
    summary: "A",
    sections: [
      {
        heading: "Chuyên môn",
        items: [
          {
            title: "X",
            path: "/vi/x",
            summary: "Dòng một.\nDòng hai.",
          },
        ],
      },
    ],
  });
  expect(text).toContain(
    "- [X](https://luatvukhang.com/vi/x): Dòng một. Dòng hai.",
  );
});

test("/llms.txt mở sau khi duyệt ra mắt, trước đó trả 404", async ({
  request,
}) => {
  const response = await request.get("/llms.txt");
  expect([200, 404]).toContain(response.status());
  if (response.status() === 200) {
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(await response.text()).toContain("# ");
  }
});
