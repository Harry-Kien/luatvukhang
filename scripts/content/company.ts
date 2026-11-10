/**
 * Thông tin pháp nhân chủ website đã xác nhận (xem docs/BUSINESS-INPUTS.md).
 *
 * Chỉ ghi ở đây giá trị công ty đã xác nhận kèm ngày; không đặt giá trị minh
 * họa. Ô nào chưa có xác nhận thì để trống — website ẩn ô trống thay vì bịa.
 */
export const confirmedCompany = {
  companyName: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
  // Đã xác nhận 10/11/2026 (công ty đổi trong admin; trước đây 0832270898).
  // Chỉ dùng điền ô còn trống — số công ty đặt trong admin không bị ghi đè.
  phone: "0977013358",
  // Ba ô dưới đã xác nhận 19/09/2026.
  email: "luatvukhang@gmail.com",
  address: "1808 đường Nguyễn Ái Quốc, phường Trấn Biên, Thành phố Đồng Nai",
  englishName: "VU KHANG SOLUTIONS & PARTNERS LAW COMPANY LIMITED",
} as const;
