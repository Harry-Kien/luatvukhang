-- Bảng đếm hạn mức gửi biểu mẫu.
--
-- SQLite không có schema tách biệt như PostgreSQL, nên bảng nằm chung với các
-- bảng của CMS. Tên có tiền tố "operations_" để phân biệt: đây là dữ liệu vận
-- hành tạm thời, không phải nội dung, và xóa sạch bảng này không mất gì.
CREATE TABLE IF NOT EXISTS operations_consultation_rate_limits (
  bucket TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);
