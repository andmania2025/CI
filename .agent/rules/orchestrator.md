---
trigger: always_on
description: モノレポオーケストレーションガイドと信頼できる唯一の情報源
---

# モノレポ・オーケストレーションガイド

このドキュメントは、このモノレポ内で動作するエージェントの**頭脳**として機能します。タスクを**どこで**、**どのように**実行するかを決定するためにこれを使用してください。

## プロジェクト構造

```
ucikatu-monorepo/
├── apps/
│   ├── web/              # ユーザー向けWebアプリ
│   └── admin/            # 管理画面
├── packages/             # 共有パッケージ（将来的に使用）
├── prisma/
│   └── schema.prisma     # 中央データベーススキーマ
├── prisma.config.ts      # Prisma 7 設定
├── docker-compose.yml    # コンテナオーケストレーション
├── bun.lock              # Bun ロックファイル
└── package.json          # ルートスクリプト
```

## ワークスペース概要

| ワークスペース | パス | スコープ | ポート |
|---------------|------|----------|--------|
| **web** | `apps/web` | **パブリック/ユーザー向け**: 物件検索、ユーザーダッシュボード、問い合わせ | `3001` |
| **admin** | `apps/admin` | **内部/運用向け**: 物件管理、ユーザー監視、分析 | `3000` |

## コンテキスト判断

コードを書いたりコマンドを実行する前に、リクエストを分類してください：

| リクエスト例 | 対象 | アクション |
|-------------|------|----------|
| 「ログインページを修正して」 | **曖昧** | Web か Admin か確認する |
| 「新しいテーブルを追加して」 | ルート | `prisma/schema.prisma` を編集 |
| 「UIコンポーネントを更新して」 | 両方の可能性 | 共有か独立か確認する |
| 「管理画面のユーザー一覧を修正」 | Admin | `apps/admin` で作業 |
| 「物件検索ページを改善」 | Web | `apps/web` で作業 |

## 実行プロトコル

### 依存関係の追加

```bash
# ルートに追加
bun add <package>

# 特定のアプリに追加
bun add --cwd apps/web <package>
bun add --cwd apps/admin <package>

# 開発依存関係
bun add --cwd apps/web -D <package>
bun add --cwd apps/admin -D <package>
```

**⚠️ Docker環境での重要事項**: パッケージの追加・削除後は、以下のコマンドでコンテナを再構築する必要があります：

```bash
# ボリュームを含めて停止
docker compose down -v
# イメージの再ビルド
docker compose build
# 起動
docker compose up -d
```

**🚫 禁止**: `npm install` や `pnpm install` は絶対に使用しない

### スクリプトの実行

```bash
# 開発サーバー
bun run --cwd apps/web dev      # ポート 3001
bun run --cwd apps/admin dev    # ポート 3000

# ビルド
bun run --cwd apps/web build
bun run --cwd apps/admin build

# テスト
bun run --cwd apps/web test
bun run --cwd apps/admin test

# 型チェック
bun run --cwd apps/web type-check
bun run --cwd apps/admin type-check

# Lint
bun run --cwd apps/web lint
bun run --cwd apps/admin lint
```

### ルートスクリプト

```bash
bun run dev:web      # Web 開発サーバー
bun run dev:admin    # Admin 開発サーバー
bun run build:web    # Web ビルド
bun run build:admin  # Admin ビルド
bun run lint         # Lint
bun run test         # テスト
```

## データベース管理

### スキーマソース

`prisma/schema.prisma` が**唯一の信頼できる情報源**です。

### マイグレーション

```bash
# マイグレーション作成（ルートで実行）
bun x prisma migrate dev --name <descriptive_name>

# 本番適用
bun x prisma migrate deploy

# Prisma Client 再生成
bun run --cwd apps/admin db:generate

# Prisma Studio
bun run --cwd apps/admin db:studio
```

## Docker オペレーション

```bash
# Web のみ起動
docker compose --profile web up -d

# Admin のみ起動
docker compose --profile admin up -d

# 両方起動
docker compose up -d

# 停止
docker compose down

# 再構築（パッケージ変更時など）
docker compose down -v && docker compose build && docker compose up -d
```

## ワークフロールーティング

### 機能開発フロー

1. **DB変更が必要な場合**: `prisma/schema.prisma` を更新
2. `bun x prisma migrate dev --name feature_name` を実行
3. 対象アプリで Server Actions を実装
4. 対象アプリで UI を実装
5. テストで検証

### リファクタリングフロー

- 共有ロジックをリファクタリングする場合は、**両方**のアプリへの影響を確認
- コードを `packages/` に移動する場合は、エクスポートが正しく定義されていることを確認

### 横断的変更フロー

両アプリに影響する変更の場合:

1. `cross-app.md` のルールを参照
2. 両アプリで型チェックを実行
3. 両アプリでテストを実行
4. 両アプリでビルドを確認

## Vercel デプロイ

Vercel でのビルドは、ダッシュボードで以下の設定を行う必要があります：

| 設定項目 | 値 |
|----------|-----|
| Framework Preset | Next.js |
| Build Command | `bun run build` または `cd apps/web && bun run build` |
| Install Command | `bun install` |
| Output Directory | `.next` |

## メモリバンク

| 項目 | 値 |
|------|-----|
| Node バージョン | >=20.0.0 |
| パッケージマネージャー | **bun** |
| Prisma バージョン | 7.x |
| Next.js バージョン | 16.0.3 |
| React バージョン | 19.2.0 |
| TypeScript バージョン | ^5.x |
| Tailwind CSS バージョン | v4 |
