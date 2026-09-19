/**
 * Nhận diện công ty trong trang quản trị, thay cho logo Payload mặc định.
 * Ảnh lấy từ public/brand (sinh bởi scripts/generate-brand-assets.mjs).
 */
export function AdminLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        justifyContent: "center",
      }}
    >
      <img
        src="/brand/logo-192.webp"
        alt=""
        width={64}
        height={64}
        style={{ display: "block", width: 64, height: 64 }}
      />
      <div style={{ lineHeight: 1.2, textAlign: "left" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em" }}>
          CÔNG TY LUẬT TNHH
        </div>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 26,
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          VŨ KHANG
        </div>
        <div style={{ fontSize: 10, letterSpacing: "0.18em" }}>
          SOLUTIONS &amp; PARTNERS
        </div>
      </div>
    </div>
  );
}
export function AdminIcon() {
  return (
    <img
      src="/brand/logo-192.webp"
      alt="Vũ Khang"
      width={28}
      height={28}
      style={{ display: "block", width: 28, height: 28 }}
    />
  );
}
