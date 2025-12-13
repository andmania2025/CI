# 開発用Dockerfile（モノレポ対応・ホットリロード）
FROM node:20-alpine AS development

# pnpmを有効化
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# pnpmストアのキャッシュを最適化
RUN pnpm config set store-dir /tmp/.pnpm-store

# ルートのpackage.jsonとpnpm設定をコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# apps/webのpackage.jsonをコピー
COPY apps/web/package.json ./apps/web/

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY apps/web ./apps/web

# ポート3000を公開（コンテナ内）
EXPOSE 3000

WORKDIR /app/apps/web

# 開発サーバーを起動（ホットリロード有効）
CMD ["pnpm", "run", "dev"]
