import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { contactChannels, zaloChannels } from "../src/lib/contact";

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
    await expect(
      page.locator(".contact-dock a.dock-zalo").first(),
    ).toBeVisible();
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
  const buttons = page.locator(".contact-dock a");
  expect(await buttons.count()).toBeGreaterThanOrEqual(2);
  for (const button of await buttons.all()) {
    await expect(button).toBeVisible();
    // Chữ trên nút ngắn hoặc bị ẩn, nên tên gọi đầy đủ đến từ aria-label.
    const name = await button.getAttribute("aria-label");
    expect(name).toBeTruthy();
    expect(name!.length).toBeGreaterThan(3);
  }
});

test("mỗi số Zalo có nút riêng, hiện vừa vặn trên máy tính và điện thoại", async ({
  page,
  request,
}) => {
  const settings = await (
    await request.get("/api/globals/site-settings")
  ).json();
  test.skip(!settings.phone, "Chưa nhập số điện thoại trong Cài đặt.");
  // Số chính và các số trong ô "Số Zalo bổ sung" của Cài đặt.
  const numbers = zaloChannels(settings.phone, settings.zaloNumbers);
  const dock = page.locator(".contact-dock");

  // Máy tính: cột nút tròn, mỗi số Zalo một nút, đúng thứ tự, trong khung nhìn.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/vi");
  const zalo = dock.locator("a.dock-zalo");
  await expect(zalo).toHaveCount(numbers.length);
  for (const [index, channel] of numbers.entries()) {
    const button = zalo.nth(index);
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("href", channel.zalo);
    await expect(button).toHaveAttribute("target", "_blank");
    await expect(button).toHaveAttribute("rel", /noopener/);
    await expect(button).toHaveAttribute(
      "aria-label",
      new RegExp(channel.display),
    );
    const box = (await button.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(800);
  }
  // Rê chuột vào nút thì hiện đúng số của nút đó.
  await zalo.last().hover();
  await expect(zalo.last().locator(".dock-label")).toHaveCSS("opacity", "1");
  await expect(zalo.last().locator(".dock-label")).toHaveText(
    numbers[numbers.length - 1].display,
  );

  // Điện thoại: thanh liên hệ ở đáy màn hình, chia đều, mỗi ô ghi số.
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/vi");
  const bar = (await dock.boundingBox())!;
  expect(bar.x).toBe(0);
  expect(Math.round(bar.width)).toBe(360);
  expect(Math.round(bar.y + bar.height)).toBe(740);
  const cells = dock.locator("a");
  await expect(cells).toHaveCount(numbers.length + 1);
  const widths = await cells.evaluateAll((els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().width)),
  );
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(2);
  for (const [index, channel] of numbers.entries())
    await expect(zalo.nth(index).locator(".dock-label")).toHaveText(
      channel.display,
    );
  // Chữ trong ô không bị cắt và trang không tràn ngang.
  const clipped = await dock
    .locator(".dock-label")
    .evaluateAll(
      (els) => els.filter((el) => el.scrollWidth > el.clientWidth + 1).length,
    );
  expect(clipped).toBe(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(361);
  // Thanh không che dòng cuối của chân trang.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footerBottom = await page
    .locator("footer .footer-bottom")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(footerBottom).toBeLessThanOrEqual(bar.y + 1);

  // Máy tính bảng: cũng dùng thanh đáy, ô ghi đủ số — cột nút nổi từng che chữ
  // "Hệ sinh thái" và dòng bản quyền ở cuối chân trang.
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/vi");
  const tablet = (await dock.boundingBox())!;
  expect(tablet.x).toBe(0);
  expect(Math.round(tablet.width)).toBe(768);
  expect(Math.round(tablet.y + tablet.height)).toBe(1024);
  await expect(dock.locator("a.dock-call .dock-label-wide")).toBeVisible();
  await expect(dock.locator("a.dock-call .dock-label-narrow")).toBeHidden();
  await expect(zalo.last().locator(".dock-label")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const tabletFooter = await page
    .locator("footer .footer-bottom")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(tabletFooter).toBeLessThanOrEqual(tablet.y + 1);
});

test("every page footer shows the office address and email from Settings", async ({
  page,
  request,
}) => {
  const settings = await (
    await request.get("/api/globals/site-settings")
  ).json();
  test.skip(!settings.address, "Chưa nhập địa chỉ trong Cài đặt.");
  for (const path of ["/vi", "/en/services", "/zh/lawyers"]) {
    await page.goto(path);
    const footer = page.locator("footer .footer-address");
    await expect(footer, path).toContainText(settings.address);
    if (settings.email)
      await expect(
        footer.locator(`a[href="mailto:${settings.email}"]`),
        path,
      ).toHaveCount(1);
  }
});

test("the quick-contact buttons step aside while a visitor types on a phone", async ({
  page,
  request,
}) => {
  const settings = await (
    await request.get("/api/globals/site-settings")
  ).json();
  test.skip(!settings.phone, "Chưa nhập số điện thoại trong Cài đặt.");
  // Bàn phím ảo đẩy ô đang gõ xuống sát đáy màn hình, đúng chỗ cụm nút đứng.
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/vi/consultation");
  const dock = page.locator(".contact-dock");
  await expect(dock).toBeVisible();
  await page.locator("form input:not([type=hidden])").first().focus();
  await expect(dock).toBeHidden();
  await page.locator("form input:not([type=hidden])").first().blur();
  await expect(dock).toBeVisible();
});

test("hồ sơ minh họa bị hồ sơ thật thay thế và không bao giờ được trình bày như luật sư đã công bố", async ({
  page,
  request,
}) => {
  // Tự dựng hồ sơ minh họa thay vì tìm trong dữ liệu đã nạp. Công ty đã có hồ sơ
  // luật sư thật nên hồ sơ mẫu không còn nằm sẵn trong CMS; bài kiểm thử dựa vào
  // dữ liệu nạp sẵn sẽ lặng lẽ bỏ qua, hoặc tệ hơn là chấm một hồ sơ thật.
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const key = "qa-minh-hoa-" + randomUUID();
  const created = await request.post("/api/lawyers?draft=true", {
    headers,
    data: {
      title: "QA Luật sư minh họa",
      slug: key,
      translationKey: key,
      language: "vi",
      position: "Hồ sơ kiểm thử",
      summary: "Dữ liệu kiểm thử tự động, sẽ được xóa sau khi kiểm tra.",
      isSample: true,
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const sample = (await created.json()).doc;
  try {
    await page.goto("/vi/lawyers");
    const realProfiles = await (
      await request.get(
        "/api/lawyers?where[_status][equals]=published&limit=1&depth=0",
      )
    ).json();

    if (realProfiles.totalDocs) {
      // Đã có hồ sơ thật thì hồ sơ minh họa phải nhường chỗ hoàn toàn: không
      // được đứng lẫn trong danh sách, và nhãn "minh họa" cũng không còn lý do.
      await expect(
        page.locator(".person-card", { hasText: sample.title }),
        "hồ sơ minh họa vẫn đứng lẫn với hồ sơ thật",
      ).toHaveCount(0);
      await expect(page.locator(".sample-badge")).toHaveCount(0);
    } else {
      // Chỉ có hồ sơ minh họa: người đọc phải được nói rõ điều đó.
      await expect(
        page.locator(".person-card", { hasText: sample.title }),
      ).toHaveCount(1);
      await expect(page.locator(".sample-badge")).toBeVisible();
      expect(
        (await page.locator(".sample-badge").innerText()).toLowerCase(),
      ).toContain("minh họa");
    }

    // Trang chi tiết vẫn mở được để công ty xem trước, nhưng không được mô tả
    // như một luật sư đã công bố.
    const detail = await page.goto("/vi/lawyers/" + sample.slug);
    expect(detail?.status()).toBe(200);
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    // Tên vẫn xuất hiện trong breadcrumb — điều đó bình thường. Thứ không được
    // có là một thực thể Person, tức lời khẳng định "đây là một luật sư".
    expect(
      scripts.join(" "),
      "Hồ sơ minh họa không được phát schema.org Person",
    ).not.toContain('"Person"');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  } finally {
    await request.delete("/api/lawyers/" + sample.id, { headers });
  }
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
  // Tự tạo bản ghi minh họa thay vì tìm trong dữ liệu đã nạp. Khi công ty đã có
  // hồ sơ luật sư thật, hồ sơ minh họa bị gỡ khỏi CMS — bài kiểm thử dựa vào
  // dữ liệu nạp sẵn sẽ lặng lẽ tự bỏ qua, và chốt chặn xuất bản mất người canh.
  const key = "qa-sample-" + randomUUID();
  const created = await request.post("/api/lawyers?draft=true", {
    headers,
    data: {
      title: "QA hồ sơ minh họa",
      slug: key,
      translationKey: key,
      language: "vi",
      position: "Hồ sơ kiểm thử",
      summary: "Dữ liệu kiểm thử tự động, sẽ được xóa sau khi kiểm tra.",
      isSample: true,
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const sample = (await created.json()).doc;
  try {
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
  } finally {
    await request.delete(`/api/lawyers/${sample.id}`, { headers });
  }
});

/**
 * Địa chỉ đã có thì phải mở được bản đồ.
 *
 * Địa chỉ in ra dạng chữ buộc khách tự bôi đen, sao chép, mở ứng dụng bản đồ,
 * dán vào. Trên điện thoại — nơi phần lớn khách đọc trang Liên hệ — đó là bốn
 * thao tác thừa giữa người cần luật sư và cánh cửa văn phòng. Liên kết bản đồ
 * suy ra được từ chính địa chỉ, không cần ai nhập thêm gì.
 */
for (const locale of ["vi", "en", "zh"] as const)
  test(`trang Liên hệ /${locale} mở được bản đồ tới địa chỉ văn phòng`, async ({
    page,
    request,
  }) => {
    const settings = await (
      await request.get("/api/globals/site-settings?depth=0")
    ).json();
    const address = String(settings?.address ?? "").trim();
    test.skip(!address, "Cài đặt chưa có địa chỉ văn phòng.");

    await page.goto(`/${locale}/contact`);
    const link = page.locator('main a[href*="google.com/maps"]');
    await expect(
      link,
      `trang Liên hệ /${locale} không có liên kết bản đồ`,
    ).toHaveCount(1);
    const href = await link.getAttribute("href");
    expect(
      decodeURIComponent(href!),
      "liên kết bản đồ phải trỏ đúng địa chỉ trong Cài đặt",
    ).toContain(address);
  });
