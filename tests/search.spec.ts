import { test, expect } from "@playwright/test";
import { searchScore, searchableText } from "../src/lib/search";
test("search matches visible content and excludes private and hidden fields", () => {
  const r = {
    id: 1,
    title: "Hợp đồng",
    slug: "hop-dong",
    summary: "Hướng dẫn",
    body: { root: { children: [{ text: "Điều khoản thanh toán" }] } },
    blocks: [
      { visible: false, heading: "Bí mật ẩn" },
      { visible: true, blockType: "callout", body: "Bảo lãnh ngân hàng" },
    ],
    disclosureApproval: "Nội bộ tuyệt mật",
  };
  expect(searchScore(r, "thanh toan")).toBeGreaterThan(0);
  expect(searchScore(r, "bao lanh")).toBeGreaterThan(0);
  expect(searchScore(r, "bi mat")).toBe(0);
  expect(searchableText(r)).not.toContain("Nội bộ");
  expect(searchScore(r, "hop dong")).toBeGreaterThan(
    searchScore(r, "thanh toan"),
  );
});
test("search filter keeps query and gives appropriate results", async ({
  page,
}) => {
  await page.goto("/vi/search?q=dau+tu");
  await page
    .getByRole("navigation", { name: "Loại kết quả" })
    .getByRole("link", { name: "Đội ngũ", exact: true })
    .click();
  await expect(page).toHaveURL(/kind=lawyers/);
  await expect(page.locator("#q")).toHaveValue("dau tu");
  await expect(page.getByRole("status")).toContainText("0 kết quả");
  await expect(
    page.getByText("Thử từ khóa ngắn hơn hoặc một lĩnh vực liên quan."),
  ).toBeVisible();
});
