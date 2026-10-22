import { test, expect } from "@playwright/test";
import {
  inPeopleGroups,
  inPeopleOrder,
  TEAM_OPTIONS,
  withVietnameseOrder,
} from "../src/lib/people-order";

/**
 * Thứ tự và khối đội ngũ do công ty đặt trong admin ("Thứ tự hiển thị", "Khối
 * trên trang Đội ngũ"), dùng chung cho trang Đội ngũ, dữ liệu có cấu trúc và
 * llms-full.txt. Không phụ thuộc bảng chữ cái hay lần sửa gần nhất.
 */
const person = (
  slug: string,
  title: string,
  extra: { role?: string; team?: string; sortOrder?: number } = {},
) => ({ slug, title, translationKey: slug, role: "lawyer", ...extra });

test("đội ngũ đứng theo thứ tự đặt trong admin, người chưa có thứ tự đứng sau cùng", () => {
  const shuffled = [
    person("tran-thi-anh-nhu", "Trần Thị Anh Như", {
      role: "specialist",
      sortOrder: 40,
    }),
    person("nguoi-moi-chuyen-vien", "An Văn Mới", { role: "specialist" }),
    person("tran-le-kim-binh", "Trần Lê Kim Bình", {
      role: "specialist",
      sortOrder: 30,
    }),
    person("nguoi-moi-luat-su", "Zương Thị Mới"),
    person("tran-phuong-lan-anh", "Trần Phương Lan Anh", { sortOrder: 20 }),
    person("phan-thuy-trang", "Phan Thùy Trang", { sortOrder: 10 }),
  ];
  expect(inPeopleOrder(shuffled).map((p) => p.slug)).toEqual([
    "phan-thuy-trang",
    "tran-phuong-lan-anh",
    "tran-le-kim-binh",
    "tran-thi-anh-nhu",
    // Chưa có thứ tự: luật sư trước nhân sự khác, dù tên đứng sau trong bảng chữ cái.
    "nguoi-moi-luat-su",
    "nguoi-moi-chuyen-vien",
  ]);
  // Không sửa mảng đầu vào: getRecords trả kết quả đã ghi nhớ cho cả lượt render.
  expect(shuffled[0].slug).toBe("tran-thi-anh-nhu");
});

test("đội ngũ chia theo khối đặt trong admin, người chưa chọn khối vào nhóm cuối", () => {
  const people = inPeopleOrder([
    person("hoang-vu", "Hoàng Vũ", {
      role: "specialist",
      team: "clients",
      sortOrder: 50,
    }),
    person("tran-thi-anh-nhu", "Trần Thị Anh Như", {
      role: "specialist",
      team: "legal",
      sortOrder: 40,
    }),
    person("phan-thuy-trang", "Phan Thùy Trang", {
      team: "leadership",
      sortOrder: 10,
    }),
    person("nguoi-moi", "Người Mới", { role: "specialist" }),
    person("le-tran-doan-khang", "Lê Trần Đoan Khang", {
      role: "specialist",
      team: "clients",
      sortOrder: 60,
    }),
  ]);
  const groups = inPeopleGroups(people).map((group) => [
    group.key,
    group.people.map((p) => p.slug),
  ]);
  expect(groups).toEqual([
    ["leadership", ["phan-thuy-trang"]],
    ["legal", ["tran-thi-anh-nhu"]],
    ["clients", ["hoang-vu", "le-tran-doan-khang"]],
    ["others", ["nguoi-moi"]],
  ]);
  // Mỗi khối là một lựa chọn trong admin.
  expect(TEAM_OPTIONS.map((option) => option.value)).toContain("clients");
});

test("bản tiếng Anh/Trung theo khối và thứ tự của bản tiếng Việt", () => {
  const vietnamese = [
    person("hoang-vu", "Hoàng Vũ", { team: "clients", sortOrder: 50 }),
    person("phan-thuy-trang", "Phan Thùy Trang", {
      team: "leadership",
      sortOrder: 10,
    }),
  ];
  const english = [
    person("hoang-vu", "Hoàng Vũ"),
    person("phan-thuy-trang", "Phan Thùy Trang"),
  ];
  const merged = inPeopleOrder(withVietnameseOrder(english, vietnamese));
  expect(merged.map((p) => [p.slug, p.team, p.sortOrder])).toEqual([
    ["phan-thuy-trang", "leadership", 10],
    ["hoang-vu", "clients", 50],
  ]);
});
