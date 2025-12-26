FROM oven/bun:alpine AS development

WORKDIR /app

# ルートのpackage.jsonと設定をコピー
COPY package.json bun.lock* ./

# apps/webのpackage.jsonをコピー
COPY apps/web/package.json ./apps/web/

# 依存関係をインストール
RUN bun install

# ソースコードをコピー
COPY apps/web ./apps/web

# ポート3000を公開（コンテナ内）
EXPOSE 3000

WORKDIR /app/apps/web

# 開発サーバーを起動（ホットリロード有効）
CMD ["bun", "run", "dev"]
