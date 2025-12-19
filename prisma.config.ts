import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma 7 Config
 * https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // seed: 'pnpm db:seed', // 必要に応じて追加
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
