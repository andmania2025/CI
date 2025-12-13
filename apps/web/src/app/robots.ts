import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/private/",
        "/_next/",
        "/favorites", // 個人的なページは除外
      ],
    },
    sitemap: "https://ucikatu.com/sitemap.xml",
  };
}
