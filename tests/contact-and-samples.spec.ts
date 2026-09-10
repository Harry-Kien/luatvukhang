import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { contactChannels } from "../src/lib/contact";

test("phone numbers become both a call link and a Zalo link", () => {
  // Cách công ty nhập số không cố định; cả bốn dạng dưới đây đều là một thuê bao.
  for (const written of [
    "0832270898",
    "083 227 0898",
    "+84 832 270 898",
    "84832270898",
  ]) {
    const channels = contactChannels(written);
    expect(channels, written).not.toBeNull();
    expect(channels!.tel, written).toBe("+84832270898");
    expect(channels!.zalo, written).toBe("https://zalo.me/0832270898");
  }
  // Số thiếu chữ số phải bị loại: nút gọi hỏng còn tệ hơn không có nút.
  for (const invalid of [
    "",
    "   ",
    "0832",
    "khong phai so",
    "0832270898123456",
  ])
    expect(contactChannels(invalid), invalid).toBeNull();
  expect(contactChannels(null)).toBeNull();
  expect(contactChannels(undefined)).toBeNull();
});

test("every public page offers a call and a Zalo route to the firm", async ({
  page,
  request,
}) => {
  const settings = await (
    await request.get("/api/globals/site-settings")
  ).json();
  test.skip(
    !settings.phone,
    "Chưa nhập số điện thoại trong Cài đặt; không có gì để kiểm tra.",
  );
  const expected = contactChannels(settings.phone)!;
  for (const path of ["/vi", "/en/services", "/zh/contact"]) {
    await page.goto(path);
    const call = page.locator(`a[href="tel:${expected.tel}"]`);
    const zalo = page.locator(`a[href="${expected.zalo}"]`);
    expect(await call.count(), path + " thiếu liên kết gọi").toBeGreaterThan(0);
    expect(await zalo.count(), path + " thiếu liên kết Zalo").toBeGreaterThan(
      0,
    );
    // Nút nổi phải bấm được ngay, không cần cuộn.
    await expect(page.locator(".contact-dock a.dock-call")).toBeVisible();
    await expect(page.locator(".contact-dock a.dock-zalo")).toBeVisible();
    // Rời trang là hành động ngoài website: phải mở tab mới và chặn opener.
    await expect(zalo.first()).toHaveAttribute("rel", /noopener/);
  }
});

test("the quick-contact buttons keep an accessible name when their text is hidden", async ({
  page,
  request,
}) => {
  const settings = await (
    await request.get("/api/globals/site-settings")
  ).json();
  // Cơ sở dữ liệu mới chưa có số điện thoại nên cụm nút không được render.
  test.skip(!settings.phone, "Chưa nhập số điện thoại trong Cài đặt.");
  await page.setViewportSize({ width: 360, height: 720 });
  await page.goto("/vi");
  for (const selector of [".dock-call", ".dock-zalo"]) {
    const button = page.locator(".contact-dock " + selector);
    await expect(button).toBeVisible();
    // Chữ bị ẩn ở khung hẹp, nên tên gọi phải đến từ aria-label.
    const name = await button.getAttribute("aria-label");
    expect(name, selector).toBeTruthy();
    expect(name!.length, selector).toBeGreaterThan(3);
  }
});

test("illustrative profiles are visible for review but never presented as real", async ({
  page,
  request,
}) => {
  await page.goto("/vi/lawyers");
  const cards = page.locator(".person-card");
  test.skip(
    (await cards.count()) === 0,
    "Chưa nạp hồ sơ minh họa; chạy scripts/prepare-people.ts.",
  );
  const published = await request.get(
    "/api/lawyers?where[_status][equals]=published&limit=1",
  );
  const anonymous = await published.json();

  if (anonymous.totalDocs === 0) {
    // Chỉ có hồ sơ minh họa: người đọc phải được nói rõ điều đó.
    await expect(page.locator(".sample-badge")).toBeVisible();
    const notice = await page.locator(".sample-badge").innerText();
    expect(notice.toLowerCase()).toContain("minh họa");
  }

  // Trang chi tiết mở được nhưng không được mô tả như một luật sư đã công bố.
  const href = await cards.first().getAttribute("href");
  const detail = await page.goto(href!);
  expect(detail?.status()).toBe(200);
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(
    scripts.join(" "),
    "Hồ sơ minh họa không được phát schema.org Person",
  ).not.toContain('"Person"');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("illustrative records cannot be published, even by an administrator", async ({
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
  const found = await request.get(
    "/api/lawyers?where[isSample][equals]=true&draft=true&limit=1",
    { headers },
  );
  const sample = (await found.json()).docs?.[0];
  test.skip(!sample, "Chưa có hồ sơ minh họa nào để kiểm tra.");

  // Duyệt chuyên môn trước, để chắc chắn thứ chặn lại là cờ minh họa.
  await request.patch(`/api/lawyers/${sample.id}?draft=true`, {
    headers,
    data: { reviewState: "approved" },
  });
  const attempt = await request.patch(`/api/lawyers/${sample.id}`, {
    headers,
    data: { _status: "published" },
  });
  expect(
    attempt.ok(),
    "Nội dung minh họa không được phép xuất bản",
  ).toBeFalsy();

  const stillHidden = await request.get(`/api/lawyers/${sample.id}?depth=0`);
  expect(
    stillHidden.status(),
    "Hồ sơ minh họa vẫn phải ẩn với khách ẩn danh",
  ).toBe(404);
});
