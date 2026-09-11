import { permanentRedirect } from "next/navigation";
/**
 * Chuyển hướng vĩnh viễn (308), không phải tạm thời (307). Đây là địa chỉ nhận
 * mọi liên kết từ bên ngoài và danh thiếp; báo "tạm thời" khiến công cụ tìm
 * kiếm giữ "/" như một URL riêng và không dồn tín hiệu về bản tiếng Việt.
 */
export default function Root() {
  permanentRedirect("/vi");
}
