import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client のシングルトンインスタンス
 *
 * 開発環境では、ホットリロード時に複数のインスタンスが作成されるのを防ぐため、
 * グローバルオブジェクトにキャッシュします。
 *
 * Prisma 7+: datasourceUrl をコンストラクタで指定
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
