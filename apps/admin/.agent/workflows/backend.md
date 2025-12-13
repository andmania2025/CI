---
description: バックエンド開発ガイドライン、Prisma/Supabase設定、Docker環境
---

### スキーマ管理

- データベーススキーマの唯一の信頼できる情報源は `/prisma/schema.prisma` ファイル（プロジェクトルートに保存）です。
- Supabase UIを通じてデータベーススキーマを直接変更しないでください。スキーマの変更を適用するには、常に `pnpm run db:migrate`（ルートから）または `pnpm run db:migrate`（アプリディレクトリから）を使用してください。
- `prisma/` ディレクトリは、すべてのモノレポアプリ（admin, web）で共有されます。マイグレーションはプロジェクト全体のデータベースに適用されます。
- 各アプリは、pnpmスクリプトで `--schema=../../prisma/schema.prisma` フラグを使用して `schema.prisma` を参照できます。

### データベースアクセス

- すべてのデータベースクエリは、**Prisma Client** を通じて実行する必要があります。直接テーブルアクセスにSupabase JSライブラリ（`supabase-js`）を使用しないでください。
- 単一の共有Prisma Clientインスタンスをインスタンス化し、中央ファイル（例：各アプリの `src/lib/prisma.ts`）からエクスポートしてください。
- Prisma Clientの生成は `/prisma/schema.prisma` で `provider = "prisma-client-js"` と設定されています。

### 認証と認可

- すべてのユーザー認証タスク（サインアップ、サインイン、セッション管理）には **Supabase Auth client** (`@supabase/ssr`) を使用してください。注: Next.js 16では、非推奨の `@supabase/auth-helpers-nextjs` の代わりに `@supabase/ssr` を使用します。
- バックエンドロジック（例：APIルート、Server Actions）は、機密性の高い操作を実行する前に、Supabaseからのユーザーセッションを検証する必要があります。
- 特にユーザー固有のデータを含むテーブルに対して、追加のデータ保護層としてSupabaseにRow-Level Security (RLS) ポリシーを実装してください。

### APIとサーバーロジック

- すべてのデータベースと対話するサーバーサイドロジックは、**Server Actions** またはAPIルートに配置してください。
- クライアントからの入力データ（例：フォーム送信）は、Prismaに渡される前にサーバー上で **Zod** を使用して検証する必要があります。
- ミューテーションや機密性の高い操作を実行するすべてのサーバーサイドロジックを `try/catch` ブロックでラップし、堅牢なエラーハンドリングを行ってください。

### データ同期

- 新しいユーザーがSupabase Auth経由でサインアップした際、データベーストリガーと関数、または専用のAPI呼び出しを使用して、パブリックな `users` テーブル（または類似のもの）に対応するレコードを作成してください。これにより、Supabaseの `auth.users` とパブリックユーザープロファイルが同期されます。

### モノレポ Prisma セットアップ

- **ルートレベルコマンド**（プロジェクトルートから実行）:
  - `pnpm run db:generate` - Prisma Clientを生成
  - `pnpm run db:migrate` - データベースマイグレーションを作成して適用
  - `pnpm run db:push` - スキーマ変更をデータベースにプッシュ
  - `pnpm run db:seed` - シードスクリプトを実行
  - `pnpm run db:studio` - Prisma Studioを開く

- **アプリレベルコマンド**（アプリディレクトリ、例：`apps/admin` から実行）:
  - `pnpm run db:*` - ルートと同じコマンドですが、自動的に `../../prisma/schema.prisma` を使用するように設定されています

- **環境変数**（Vercel経由ですべてのアプリで共有）:
  - `DATABASE_URL` - メインデータベース接続文字列
  - `DIRECT_URL` - 直接接続文字列（マイグレーション用）
  - ローカル開発には `.env.local` に両方が必要です
  - Docker開発環境には `.env` に両方が必要です

### Docker開発環境

**注意**: 本番環境へのデプロイはVercelを使用します。Dockerは開発環境のみです。

- **Dockerサポート:** ローカル開発用に完全なDockerコンテナ化が利用可能
- **ポート:** Docker環境内ではポート **3003** でアプリケーションが実行されます
- **設定:**
  - `Dockerfile` - 開発ビルド設定
  - `docker-compose.yml` - コンテナオーケストレーションと環境変数
  - `.dockerignore` - ビルドコンテキストの最適化
- **Docker内のPrisma:**
  - Prisma ClientはDockerビルド中に自動的に生成されます
  - Prismaスキーマの場所: `/prisma/schema.prisma`（プロジェクトルート）
  - データベース接続は `.env` ファイルの環境変数を使用します
- **開発ワークフロー:**
  - `docker-compose build` を使用してイメージをビルド
  - `docker-compose up -d` を使用してコンテナを起動
  - `docker-compose logs -f app` を使用してログを表示
  - 環境変数はコンテナ起動時に `.env` ファイルから読み込まれます
