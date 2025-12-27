FROM oven/bun:alpine AS development

WORKDIR /app

# ルートのpackage.jsonと設定をコピー
COPY package.json bun.lock* ./

# apps/adminのpackage.jsonをコピー
COPY apps/admin/package.json ./apps/admin/

# Prismaスキーマと設定ファイルをコピー
COPY prisma ./prisma
COPY prisma.config.ts ./

# 依存関係をインストール
RUN bun install

# Prismaクライアントを生成（Prisma 7: 設定ファイルベース）
ENV PRISMA_GENERATE_SKIP_AUTOINSTALL=true
RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy bun x prisma generate --schema=./prisma/schema.prisma

# ソースコードをコピー
COPY apps/admin ./apps/admin

# ポート3000を公開（コンテナ内）
EXPOSE 3000

WORKDIR /app/apps/admin

# 開発サーバーを起動
CMD ["bun", "run", "dev"]
