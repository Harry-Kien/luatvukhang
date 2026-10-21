import { test, expect } from "@playwright/test";
import { matchesPerson } from "../src/lib/people-search";

/**
 * Ô tìm kiếm trên trang Đội ngũ: tên công ty có trong phần giới thiệu của mọi
 * người không được làm mọi hồ sơ cùng khớp, và gõ có dấu thì so đúng dấu.
 */
const FIRM = "Công ty Luật TNHH Vũ Khang Solutions & Partners";
const people = [
  {
    title: "Trần Lê Kim Bình",
    position: "Chuyên viên",
    summary: `Chuyên viên của ${FIRM}, cử nhân luật. Lĩnh vực dân sự, hôn nhân và gia đình.`,
  },
  {
    title: "Hoàng Vũ",
    position: "Trưởng phòng Phát triển khách hàng",
    summary: `Trưởng phòng Phát triển khách hàng của ${FIRM}.`,
  },
  {
    title: "Lê Trần Đoan Khang",
    position: "Phó phòng Phát triển khách hàng",
    summary: `Phó phòng Phát triển khách hàng của ${FIRM}.`,
  },
];
const find = (q: string) =>
  people.filter((p) => matchesPerson(p, q)).map((p) => p.title);

test("tìm tên nhân sự không bị tên công ty kéo theo cả đội ngũ", () => {
  expect(find("Khang")).toEqual(["Lê Trần Đoan Khang"]);
  expect(find("khang")).toEqual(["Lê Trần Đoan Khang"]);
  expect(find("Vũ")).toEqual(["Hoàng Vũ"]);
});

test("gõ có dấu so đúng dấu, gõ không dấu tìm rộng", () => {
  // "vu" không dấu khớp cả "vực" trong "lĩnh vực" — chấp nhận được khi khách
  // không gõ dấu; gõ "Vũ" thì chỉ ra đúng người.
  expect(find("vu")).toEqual(["Trần Lê Kim Bình", "Hoàng Vũ"]);
  expect(find("Phát triển")).toEqual(["Hoàng Vũ", "Lê Trần Đoan Khang"]);
  expect(find("phat trien")).toEqual(["Hoàng Vũ", "Lê Trần Đoan Khang"]);
  expect(find("")).toHaveLength(3);
});
