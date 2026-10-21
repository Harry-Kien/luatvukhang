import { test, expect } from "@playwright/test";
import {
  inPeopleGroups,
  inPeopleOrder,
  PEOPLE_ORDER,
} from "../src/lib/people-order";

/**
 * Thứ tự đội ngũ là thứ bậc do công ty nêu, dùng chung cho trang Đội ngũ, dữ
 * liệu có cấu trúc và llms-full.txt. Không được phụ thuộc vào bảng chữ cái hay
 * lần sửa gần nhất.
 */
test("đội ngũ đứng theo thứ tự công ty nêu, người mới đứng sau cùng", () => {
  const person = (slug: string, title: string, role = "lawyer") => ({
    slug,
    title,
    role,
  });
  const shuffled = [
    person("tran-thi-anh-nhu", "Trần Thị Anh Như", "specialist"),
    person("nguoi-moi-chuyen-vien", "An Văn Mới", "specialist"),
    person("tran-le-kim-binh", "Trần Lê Kim Bình", "specialist"),
    person("nguoi-moi-luat-su", "Zương Thị Mới"),
    person("tran-phuong-lan-anh", "Trần Phương Lan Anh"),
    person("phan-thuy-trang", "Phan Thùy Trang"),
  ];
  expect(inPeopleOrder(shuffled).map((p) => p.slug)).toEqual([
    "phan-thuy-trang",
    "tran-phuong-lan-anh",
    "tran-le-kim-binh",
    "tran-thi-anh-nhu",
    // Chưa được xếp: luật sư trước nhân sự khác, dù tên đứng sau trong bảng chữ cái.
    "nguoi-moi-luat-su",
    "nguoi-moi-chuyen-vien",
  ]);
  expect(PEOPLE_ORDER.slice(0, 2)).toEqual([
    "phan-thuy-trang",
    "tran-phuong-lan-anh",
  ]);
  // Không sửa mảng đầu vào: getRecords trả kết quả đã ghi nhớ cho cả lượt render.
  expect(shuffled[0].slug).toBe("tran-thi-anh-nhu");
});

/**
 * Trang Đội ngũ chia theo khối: ban lãnh đạo, chuyên viên pháp lý, kinh doanh
 * & đối ngoại. Người chưa thuộc khối nào vẫn hiện — ở nhóm cuối — chứ không
 * biến mất khỏi trang.
 */
test("đội ngũ chia theo khối, người chưa xếp khối vào nhóm cuối", () => {
  const person = (slug: string, title: string, role = "specialist") => ({
    slug,
    title,
    role,
  });
  const people = inPeopleOrder([
    person("hoang-vu", "Hoàng Vũ"),
    person("tran-thi-anh-nhu", "Trần Thị Anh Như"),
    person("phan-thuy-trang", "Phan Thùy Trang", "lawyer"),
    person("nguoi-moi", "Người Mới"),
    person("le-tran-doan-khang", "Lê Trần Đoan Khang"),
    person("tran-phuong-lan-anh", "Trần Phương Lan Anh", "lawyer"),
  ]);
  const groups = inPeopleGroups(people).map((group) => [
    group.key,
    group.people.map((p) => p.slug),
  ]);
  expect(groups).toEqual([
    ["leadership", ["phan-thuy-trang", "tran-phuong-lan-anh"]],
    ["legal", ["tran-thi-anh-nhu"]],
    ["business", ["le-tran-doan-khang", "hoang-vu"]],
    ["others", ["nguoi-moi"]],
  ]);
});
