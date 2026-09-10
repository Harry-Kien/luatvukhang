/**
 * Nhúng dữ liệu có cấu trúc schema.org.
 *
 * JSON.stringify không làm sạch chuỗi nguy hiểm, nên ký tự "<" được thay bằng
 * mã unicode tương đương để nội dung do biên tập viên nhập không thể đóng thẻ
 * script và chèn mã vào trang.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
