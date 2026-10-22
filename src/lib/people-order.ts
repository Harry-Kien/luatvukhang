/**
 * Thứ tự và khối của đội ngũ — công ty tự đặt trong admin, ở hai ô của từng hồ
 * sơ: "Khối trên trang Đội ngũ" và "Thứ tự hiển thị" (từ 22/10/2026; trước đó
 * hai danh sách này ghi cứng trong mã).
 *
 * Một thứ tự dùng chung cho trang Đội ngũ, mục luật sư ở trang chủ, dữ liệu có
 * cấu trúc và llms-full.txt. Thứ tự người trong một công ty luật là thứ bậc
 * nghề nghiệp, không phải bảng chữ cái hay lần sửa gần nhất.
 *
 * Mỗi hồ sơ có ba bản ngôn ngữ; khối và thứ tự chỉ cần đặt ở bản tiếng Việt,
 * bản tiếng Anh/Trung theo bản tiếng Việt cùng mã liên kết bản dịch. Người chưa
 * có thứ tự đứng sau cùng — luật sư trước nhân sự khác, rồi theo tên — nên thêm
 * hồ sơ mới không bao giờ làm nó biến mất khỏi website.
 */
type Localised = { vi: string; en: string; zh: string };

/** Các khối theo thứ tự hiển thị trên trang Đội ngũ; khối không có ai thì ẩn. */
export const TEAMS: readonly { value: string; label: Localised }[] = [
  {
    value: "leadership",
    label: { vi: "Ban lãnh đạo", en: "Leadership", zh: "领导团队" },
  },
  { value: "lawyers", label: { vi: "Luật sư", en: "Lawyers", zh: "律师" } },
  {
    value: "legal",
    label: {
      vi: "Chuyên viên pháp lý",
      en: "Legal specialists",
      zh: "法务专员",
    },
  },
  {
    value: "clients",
    label: {
      vi: "Phát triển khách hàng",
      en: "Client development",
      zh: "客户发展部",
    },
  },
  {
    value: "operations",
    label: {
      vi: "Hành chính – Văn phòng",
      en: "Office & administration",
      zh: "行政与办公室",
    },
  },
];
const OTHERS: Localised = { vi: "Đội ngũ", en: "Our people", zh: "团队成员" };

/** Lựa chọn cho ô "Khối trên trang Đội ngũ" trong admin. */
export const TEAM_OPTIONS = TEAMS.map((team) => ({
  label: team.label.vi,
  value: team.value,
}));

type Person = {
  slug: string;
  title: string;
  role?: string | null;
  team?: string | null;
  sortOrder?: number | null;
  translationKey?: string | null;
};

const position = (person: Person) =>
  typeof person.sortOrder === "number" ? person.sortOrder : Infinity;
const roleRank = (person: Person) => (person.role === "specialist" ? 1 : 0);

export const inPeopleOrder = <T extends Person>(records: T[]) =>
  [...records].sort((a, b) => {
    const pa = position(a);
    const pb = position(b);
    return (
      (pa === pb ? 0 : pa - pb) ||
      roleRank(a) - roleRank(b) ||
      a.title.localeCompare(b.title, "vi")
    );
  });

/** Chia danh sách (đã xếp) thành các khối theo thứ tự TEAMS, bỏ khối trống. */
export const inPeopleGroups = <T extends Person>(records: T[]) => {
  const known = new Set(TEAMS.map((team) => team.value));
  const groups = TEAMS.map((team) => ({
    key: team.value,
    title: team.label,
    people: records.filter((record) => record.team === team.value),
  }));
  groups.push({
    key: "others",
    title: OTHERS,
    people: records.filter((record) => !known.has(record.team ?? "")),
  });
  return groups.filter((group) => group.people.length > 0);
};

/**
 * Bản tiếng Anh/Trung lấy khối và thứ tự của bản tiếng Việt cùng mã liên kết
 * bản dịch, để công ty chỉ phải đặt một lần.
 */
export const withVietnameseOrder = <T extends Person>(
  records: T[],
  vietnamese: Person[],
): T[] => {
  const byKey = new Map(
    vietnamese.map((person) => [person.translationKey || person.slug, person]),
  );
  return records.map((record) => {
    const source = byKey.get(record.translationKey || record.slug);
    return source
      ? {
          ...record,
          team: source.team ?? record.team,
          sortOrder: source.sortOrder ?? record.sortOrder,
        }
      : record;
  });
};
