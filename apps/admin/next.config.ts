import path from "node:path";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  // cacheComponents は dynamic = "force-dynamic" と互換性がないため削除
  // 管理画面はSSRを基本方針とするため、force-dynamicを優先
  experimental: {
    turbopackFileSystemCacheForDev: true,
    serverComponentsExternalPackages: [
      "@prisma/client",
      "prisma",
      "pg",
      "@prisma/adapter-pg",
    ],
  },
};

export default nextConfig;
