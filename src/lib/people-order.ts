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
 */
export const PEOPLE_ORDER = [
  "phan-thuy-trang",
  "tran-phuong-lan-anh",
  "tran-le-kim-binh",
  "tran-thi-anh-nhu",
] as const;

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
