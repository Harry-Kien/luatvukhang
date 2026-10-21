/**
 * Thứ tự nhân sự do chủ website nêu ngày 11/10/2026: Luật sư Phan Thùy Trang
 * đứng đầu, kế đến Luật sư Trần Phương Lan Anh.
 *
 * Trước đây trang Đội ngũ xếp "luật sư trước, rồi theo tên A→Z", còn dữ liệu có
 * cấu trúc và llms-full.txt xếp theo lần sửa gần nhất — ba nơi ba thứ tự, và
 * thứ tự đổi mỗi khi ai đó lưu một hồ sơ. Thứ tự người trong một công ty luật
 * là thứ bậc nghề nghiệp, không phải bảng chữ cái.
 *
 * Người có trong danh sách đứng đúng vị trí. Người mới chưa được xếp đứng sau
 * cùng — luật sư trước nhân sự khác, rồi theo tên — nên thêm hồ sơ mới không
 * bao giờ làm mất nó khỏi website.
 *
 * 21/10/2026: thêm khối kinh doanh & đối ngoại, đứng sau khối pháp lý — trên
 * website công ty luật, người khách cần gặp về pháp lý đứng trước. Trong khối,
 * chủ website xếp: Hoàng Vũ, Lê Trần Đoan Khang, Nguyễn Anh Tân.
 */
export const PEOPLE_ORDER = [
  "phan-thuy-trang",
  "tran-phuong-lan-anh",
  "tran-le-kim-binh",
  "tran-thi-anh-nhu",
  "hoang-vu",
  "le-tran-doan-khang",
  "nguyen-anh-tan",
] as const;

type Localised = { vi: string; en: string; zh: string };

/**
 * Các nhóm trên trang Đội ngũ, theo thứ tự hiển thị. Bảy người trong một lưới
 * liền đọc như một danh sách; tách theo khối thì khách thấy ngay ai điều hành,
 * ai làm pháp lý, ai lo kinh doanh và đối ngoại.
 *
 * Người chưa thuộc nhóm nào vào nhóm cuối "Đội ngũ", nên thêm hồ sơ mới trong
 * CMS không bao giờ làm nó biến mất khỏi trang.
 */
export const PEOPLE_GROUPS: {
  key: string;
  title: Localised;
  slugs: readonly string[];
}[] = [
  {
    key: "leadership",
    title: { vi: "Ban lãnh đạo", en: "Leadership", zh: "领导团队" },
    slugs: ["phan-thuy-trang", "tran-phuong-lan-anh"],
  },
  {
    key: "legal",
    title: {
      vi: "Chuyên viên pháp lý",
      en: "Legal specialists",
      zh: "法务专员",
    },
    slugs: ["tran-le-kim-binh", "tran-thi-anh-nhu"],
  },
  {
    key: "business",
    title: {
      vi: "Kinh doanh & Đối ngoại",
      en: "Business development & external relations",
      zh: "业务拓展与对外关系",
    },
    slugs: ["hoang-vu", "le-tran-doan-khang", "nguyen-anh-tan"],
  },
];
const OTHERS: Localised = { vi: "Đội ngũ", en: "Our people", zh: "团队成员" };

/** Chia danh sách (đã xếp theo PEOPLE_ORDER) thành các nhóm, bỏ nhóm trống. */
export const inPeopleGroups = <T extends Person>(records: T[]) => {
  const grouped = PEOPLE_GROUPS.map((group) => ({
    key: group.key,
    title: group.title,
    people: records.filter((r) => group.slugs.includes(r.slug)),
  }));
  const placed = new Set(PEOPLE_GROUPS.flatMap((group) => group.slugs));
  grouped.push({
    key: "others",
    title: OTHERS,
    people: records.filter((r) => !placed.has(r.slug)),
  });
  return grouped.filter((group) => group.people.length > 0);
};

type Person = { slug: string; title: string; role?: string | null };

const rank = (slug: string) => {
  const at = (PEOPLE_ORDER as readonly string[]).indexOf(slug);
  return at < 0 ? PEOPLE_ORDER.length : at;
};
const roleRank = (person: Person) => (person.role === "specialist" ? 1 : 0);

export const inPeopleOrder = <T extends Person>(records: T[]) =>
  [...records].sort(
    (a, b) =>
      rank(a.slug) - rank(b.slug) ||
      roleRank(a) - roleRank(b) ||
      a.title.localeCompare(b.title, "vi"),
  );
