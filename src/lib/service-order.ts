/**
 * Thứ tự nhóm dịch vụ theo danh mục chủ website cung cấp ngày 26/09/2026.
 *
 * Trước đây danh sách xếp theo lần sửa gần nhất, nên thứ tự trên menu, trang
 * chủ và trang Chuyên môn đổi mỗi khi ai đó lưu một lĩnh vực. Nhóm có trong
 * danh sách đứng đúng vị trí; nhóm mới chưa được xếp đứng sau cùng, giữ thứ tự
 * cũ giữa chúng — thêm lĩnh vực mới không bao giờ làm mất nó khỏi website.
 */
export const SERVICE_ORDER = [
  "hinh-su",
  "hon-nhan-gia-dinh",
  "dat-dai-bat-dong-san",
  "giai-quyet-tranh-chap",
  "dau-tu-doanh-nghiep",
  "lao-dong-nhan-su",
  "san-pham-phap-ly-tieu-chuan",
  "luat-su-rieng-tu-van-dinh-ky",
] as const;

const rank = (slug: string) => {
  const at = (SERVICE_ORDER as readonly string[]).indexOf(slug);
  return at < 0 ? SERVICE_ORDER.length : at;
};

/** Sắp xếp ổn định: cùng hạng thì giữ nguyên thứ tự đầu vào. */
export const inServiceOrder = <T extends { slug: string }>(records: T[]) =>
  records
    .map((record, i) => ({ record, i }))
    .sort((a, b) => rank(a.record.slug) - rank(b.record.slug) || a.i - b.i)
    .map(({ record }) => record);
