import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents は dynamic = "force-dynamic" と互換性がないため削除
  // 管理画面はSSRを基本方針とするため、force-dynamicを優先
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
