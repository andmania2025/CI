# 開発用Dockerfile（モノレポ対応・ホットリロード）
FROM node:20-alpine AS development

# pnpmを有効化
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# pnpmストアのキャッシュを最適化
RUN pnpm config set store-dir /tmp/.pnpm-store

# ルートのpackage.jsonとpnpm設定をコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# apps/adminのpackage.jsonをコピー
COPY apps/admin/package.json ./apps/admin/

# Prismaスキーマと設定ファイルをコピー
COPY prisma ./prisma
COPY prisma.config.ts ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# Prismaクライアントを生成（Prisma 7: 設定ファイルベース）
ENV PRISMA_GENERATE_SKIP_AUTOINSTALL=true
RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy pnpm exec prisma generate

# ソースコードをコピー
COPY apps/admin ./apps/admin

# ポート3000を公開（コンテナ内）
EXPOSE 3000

WORKDIR /app/apps/admin

# 開発サーバーを起動
CMD ["pnpm", "run", "dev"]
