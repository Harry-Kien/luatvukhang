import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

/**
 * Tìm kiếm tiếng Trung từng hỏng hoàn toàn: biểu thức tách từ chỉ nhận `a-z0-9`
 * nên mọi chữ Hán bị coi là dấu phân cách, truy vấn tách ra thành mảng rỗng và
 * mọi từ khóa đều trả về 0 kết quả — kể cả tiêu đề chính xác của một lĩnh vực
 * đang hiển thị. Không bài kiểm thử nào chạm tới /zh/search nên lỗi lọt qua.
 */
function resultCount(html: string): number {
  const match = html.match(/role="status">(\d+)/);
  return match ? Number(match[1]) : -1;
}

test("Chinese queries return results, not an empty page", async ({
  request,
}) => {
  const listing = await (await request.get("/zh/services")).text();
  const published = [
    ...new Set(
      [...listing.matchAll(/href="\/zh\/services\/([a-z0-9-]+)"/g)].map(
        (m) => m[1],
      ),
    ),
  ];
  test.skip(
    published.length === 0,
    "Chưa nạp lĩnh vực chuyên môn tiếng Trung.",
  );

  for (const query of ["合同", "劳动", "投资"]) {
    const html = await (
      await request.get("/zh/search?q=" + encodeURIComponent(query))
    ).text();
    expect(
      resultCount(html),
      `Tìm "${query}" trên /zh/search phải có kết quả`,
    ).toBeGreaterThan(0);
  }
});

test("the three languages all return results for their own wording", async ({
  request,
}) => {
  const probes: [string, string][] = [
    ["/vi/search?q=hop+dong", "vi"],
    ["/en/search?q=contract", "en"],
    ["/zh/search?q=" + encodeURIComponent("合同"), "zh"],
  ];
  for (const [path, locale] of probes) {
    const html = await (await request.get(path)).text();
    const count = resultCount(html);
    test.skip(count === -1, "Trang tìm kiếm không trả về ô trạng thái.");
    expect(count, `${locale}: ${path} không có kết quả nào`).toBeGreaterThan(0);
  }
});

test("site search reaches the standing pages, not only the practice areas", async ({
  request,
}) => {
  // Bộ trang hướng dẫn từng được gán đè lên toàn bộ kết quả nhóm "pages", nên
  // Về chúng tôi, Liên hệ và Trang chủ biến mất khỏi tìm kiếm.
  const html = await (
    await request.get("/vi/search?q=" + encodeURIComponent("Liên hệ"))
  ).text();
  test.skip(resultCount(html) <= 0, "Chưa nạp trang nền để tìm.");
  expect(html, "Trang Liên hệ phải tìm được").toContain('href="/vi/contact"');
});

test("the internal disclosure basis never leaves the CMS", async ({
  request,
}) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  expect(login.ok()).toBeTruthy();
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const secret = "CAN CU NOI BO " + Date.now();

  const created = await request.post("/api/experience?draft=true", {
    headers,
    data: {
      title: "QA experience " + Date.now(),
      slug: "qa-disclosure-" + Date.now(),
      language: "vi",
      translationKey: "qa-disclosure-" + Date.now(),
      summary: "Bản ghi kiểm thử cho quyền đọc ở mức trường.",
      disclosureApproval: secret,
      reviewState: "approved",
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const id = (await created.json()).doc.id;

  try {
    await request.patch(`/api/experience/${id}`, {
      headers,
      data: { _status: "published" },
    });

    // Quyền ở mức bộ sưu tập chỉ lọc BẢN GHI; nếu không chặn ở mức trường thì
    // bản ghi đã xuất bản mang theo cả căn cứ nội bộ ra API công khai.
    const anonymous = await request.get(`/api/experience/${id}?depth=0`);
    if (anonymous.ok())
      expect(
        await anonymous.text(),
        "Căn cứ được phép công bố bị lộ qua REST API",
      ).not.toContain(secret);

    const list = await request.get("/api/experience?limit=50&depth=0");
    expect(
      await list.text(),
      "Căn cứ được phép công bố bị lộ trong danh sách REST",
    ).not.toContain(secret);

    // Người biên tập vẫn phải đọc được, nếu không thì CMS mất chức năng.
    const editor = await request.get(`/api/experience/${id}?depth=0`, {
      headers,
    });
    expect(await editor.text()).toContain(secret);
  } finally {
    await request.delete(`/api/experience/${id}`, { headers });
  }
});
