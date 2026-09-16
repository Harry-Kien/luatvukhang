/**
 * Thứ tự nạp nội dung nền, dùng chung cho hosting và cho CI.
 *
 * Vì sao là một tệp riêng: trước đây danh sách này chỉ nằm trong
 * hosting-setup.mjs, còn CI tự nạp hai script nó cần. Hai nơi trôi khỏi nhau
 * lúc nào không biết — thêm một script nội dung mới thì hosting có, CI không,
 * và bài kiểm thử đối chiếu nội dung đó hỏng trên CI chứ không hỏng ở máy ai
 * cả. Giữ một danh sách duy nhất thì không còn chỗ để trôi.
 *
 * Thứ tự có ràng buộc thật, không xếp tuỳ ý:
 *   - prepare-cross-links cần cả bài viết lẫn lĩnh vực đã có mặt.
 *   - prepare-categories cần bài viết đã có mặt.
 *   - prepare-seo-titles đi sau cùng trong nhóm nội dung, vì nó điền tiêu đề
 *     cho chính những bản ghi vừa nạp.
 *   - clean-empty-drafts đi cuối, dọn bản nháp rỗng mà tính năng tự lưu của CMS
 *     để lại.
 *
 * prepare-people.ts cố ý KHÔNG có trong danh sách: đó là hồ sơ minh họa, không
 * thuộc về một máy chủ thật. prepare-lawyers.ts nạp hồ sơ luật sư thật và đồng
 * thời gỡ hồ sơ minh họa còn sót lại từ những lần cài trước.
 *
 * Cờ --publish của prepare-lawyers.ts cũng cố ý không có ở đây: xuất bản hồ sơ
 * một con người là quyết định của công ty. Nếu để nó chạy mỗi lần triển khai,
 * công ty gỡ một hồ sơ xuống thì lần cập nhật kế tiếp sẽ tự đăng lại.
 */
export const CONTENT_SCRIPTS = [
  "prepare-pages.ts",
  "prepare-site-layout.ts",
  "prepare-practice-areas.ts",
  "prepare-keywords.ts",
  "prepare-page-content.ts",
  "prepare-editorial.ts",
  "prepare-lawyers.ts",
  "prepare-industry-details.ts",
  "prepare-cross-links.ts",
  "prepare-categories.ts",
  "prepare-seo-titles.ts",
  "clean-empty-drafts.ts",
];
