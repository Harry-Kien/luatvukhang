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
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
