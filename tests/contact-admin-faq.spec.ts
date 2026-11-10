import { test, expect } from "@playwright/test";
import { validateExtraZalo, validateMainPhone } from "../src/lib/contact";
import { buildLocalFaq } from "../src/lib/local-faq";
import { policyDrafts } from "../src/lib/policy-drafts";
import { zhPolicies } from "../src/lib/zh-content";

/**
 * Cài đặt → "Điện thoại và Zalo": số chính là nút Gọi + Zalo 1, các dòng bên
 * dưới là Zalo 2, Zalo 3… Số sai hoặc trùng bị chặn ngay khi bấm Lưu, để không
 * sinh ra nút Zalo hỏng hay hai nút cùng một số.
 */
test("ô số điện thoại chính: để trống được, có nhập thì phải đúng số", () => {
  expect(validateMainPhone("")).toBe(true);
  expect(validateMainPhone(undefined)).toBe(true);
  for (const written of ["0977013358", "0977 013 358", "+84 977 013 358"])
    expect(validateMainPhone(written), written).toBe(true);
  expect(validateMainPhone("12345")).toMatch(/không hợp lệ/);
});

test("dòng Zalo bổ sung: đúng số, không trùng số chính, không trùng dòng khác", () => {
  const rows = [{ phone: "0976894548" }, { phone: "0382140336" }];
  expect(validateExtraZalo("0976894548", "0977013358", rows)).toBe(true);
  // Cùng thuê bao với số chính, chỉ khác cách viết.
  expect(validateExtraZalo("+84 977 013 358", "0977013358", rows)).toMatch(
    /trùng số điện thoại chính/,
  );
  expect(
    validateExtraZalo("0976894548", "0977013358", [
      ...rows,
      { phone: "0976 894 548" },
    ]),
  ).toMatch(/đã có ở một dòng Zalo khác/);
  expect(validateExtraZalo("abc", "0977013358", rows)).toMatch(/không hợp lệ/);
});

test("hỏi đáp trang chủ trả lời từ Cài đặt và hồ sơ đã đăng", () => {
  const faq = buildLocalFaq({
    locale: "vi",
    settings: {
      address:
        "1808 đường Nguyễn Ái Quốc, phường Trấn Biên, Thành phố Đồng Nai",
      phone: "0977013358",
      email: "luatvukhang@gmail.com",
      zaloNumbers: [
        { phone: "0976894548" },
        { phone: "+84 977 013 358" }, // trùng số chính: không nêu lại
      ],
    },
    services: [{ title: "Hình sự" }, { title: "Hôn nhân & gia đình" }],
    people: [
      { title: "Phan Thùy Trang", position: "Giám đốc", role: "lawyer" },
      { title: "Hoàng Vũ", position: "Trưởng phòng", role: "specialist" },
    ],
  });
  const text = faq
    .map((entry) => entry.question + " " + entry.answer)
    .join("\n");
  expect(faq[0].question).toContain("Đồng Nai");
  expect(faq[0].answer).toContain("1808 đường Nguyễn Ái Quốc");
  expect(faq[0].answer).toContain("Biên Hòa");
  expect(text).toContain("gọi 0977013358");
  expect(text).toContain("nhắn Zalo 0976894548.".slice(0, -1));
  expect(text).not.toContain("+84 977 013 358");
  expect(text).toContain("Hình sự, Hôn nhân & gia đình");
  expect(text).toContain("Luật sư Phan Thùy Trang — Giám đốc");
  // Nhân sự không phải luật sư không được gọi là luật sư.
  expect(text).not.toContain("Hoàng Vũ");
});

test("thiếu dữ liệu thì bỏ câu hỏi, không trả lời chung chung", () => {
  const faq = buildLocalFaq({
    locale: "en",
    settings: null,
    services: [],
    people: [],
  });
  expect(faq).toHaveLength(1);
  expect(faq[0].question).toMatch(/book an appointment/);
});

test("chính sách ghi số điện thoại chính hiện tại, không còn số cũ", () => {
  const all = JSON.stringify([policyDrafts, zhPolicies]);
  expect(all).not.toContain("0832270898");
  expect(all).not.toContain("832 270 898");
  expect(all).toContain("0977013358");
  expect(all).toContain("+84 977 013 358");
});
