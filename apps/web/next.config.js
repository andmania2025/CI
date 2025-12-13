/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 注意: 本番環境では型エラーを検出するため、将来的にはfalseに変更することを推奨
    // 現時点では開発中の型エラーを一時的に無視しています
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
