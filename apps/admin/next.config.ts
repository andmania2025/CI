import path from "path";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  // cacheComponents は dynamic = "force-dynamic" と互換性がないため削除
  // 管理画面はSSRを基本方針とするため、force-dynamicを優先
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // Prisma generated client のパス解決
  // Turbopackはtsconfig.jsonのpaths設定を自動認識
  webpack: (config: Configuration) => {
    config.resolve.alias["@prisma/generated"] = path.resolve(
      __dirname,
      "../../generated/client",
    );
    return config;
  },
};

export default nextConfig;
