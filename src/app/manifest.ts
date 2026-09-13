import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Công ty Luật TNHH Vũ Khang",
    short_name: "Vũ Khang",
    description:
      "Góc nhìn pháp lý rõ ràng cho những quyết định quan trọng của doanh nghiệp và cá nhân.",
    lang: "vi",
    // Website mặc định tiếng Việt; "/" chuyển hướng về "/vi".
    start_url: "/vi",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#101d35",
    // Sinh bởi scripts/generate-brand-assets.mjs từ design/logo.jpg.
    icons: [
      { src: "/brand/logo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/logo-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/brand/logo-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
