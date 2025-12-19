## プロジェクト概要

不動産の専門家が創った画期的な不動産 SNS プラットフォームです。

### 主な機能

- **物件検索**: マンション・アパート・戸建ての検索
- **一括査定**: 無料で物件の査定が可能
- **不動産相談**: 専門家に無料で相談
- **お気に入り**: 気になる物件を保存・管理
- **詳細検索**: 豊富な検索条件で理想の物件を発見

## 技術スタック

### フロントエンド

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **React**: [React 19](https://react.dev/) (最新版)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (最新版)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

### 開発環境

- **Node.js**: >=20.0.0
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Type Checking**: TypeScript
- **Pre-commit Hooks**: [Lefthook](https://github.com/evilmartians/lefthook)

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # 公開ページ
│   ├── (property)/        # 物件関連ページ
│   ├── (protected)/       # 認証が必要なページ
│   ├── api/               # API Routes
│   ├── layout.tsx         # ルートレイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # 再利用可能なコンポーネント
│   ├── ui/                # UI基本コンポーネント
│   ├── layout/            # レイアウトコンポーネント
│   └── common/            # 共通コンポーネント
├── features/              # 機能別コンポーネント
│   ├── properties/        # 物件関連機能
│   ├── favorites/         # お気に入り機能
│   └── search/            # 検索機能
├── hooks/                 # カスタムReact Hooks
├── lib/                   # ユーティリティ関数
├── stores/                # 状態管理
├── types/                 # TypeScript型定義
└── schemas/               # Zodスキーマ
```

## スタイリング

このプロジェクトでは**Tailwind CSS v4**を使用しています：

- ユーティリティファーストの CSS フレームワーク
- レスポンシブデザイン対応
- ダークモード対応
- カスタムカラーパレット
- 日本語フォント（Noto Sans JP）対応

## データベース (Prisma)

このプロジェクトでは ORM として **Prisma** (v7.x) を使用しています。
データベーススキーマはルートディレクトリの `prisma/schema.prisma` で一元管理されています。

### 開発フロー

1. **スキーマの変更**: ルートの `prisma/schema.prisma` を編集
2. **マイグレーション**: `docker compose exec web pnpm exec prisma migrate dev` を実行
3. **クライアント生成**: `docker compose exec web pnpm exec prisma generate` (変更後に自動的に実行されます)

Server Actions や Route Handlers 内でデータベースにアクセスする際は、生成された Prisma Client を使用してください。

## 開発ガイドライン

### コンポーネント設計

- **PascalCase**でコンポーネント名を命名
- **名前付きエクスポート**を使用（デフォルトエクスポートは禁止）
- **TypeScript interface**で props を定義

### スタイリング

- **Tailwind CSS**のユーティリティクラスを使用
- 条件付きスタイルには`clsx`を使用
- カスタム CSS 文は避ける

### 状態管理

### 状態管理

- **ローカル状態**: `useState`, `useReducer`
- **グローバル状態**: `Zustand`（アプリケーション全体で共有する状態）
- **フォーム状態**: `React Hook Form`
- **サーバー状態**: `TanStack Query`（APIデータの取得・キャッシュ・更新）

## SEO 対応

- **メタタグ**: 各ページに適切なメタデータを設定
- **Open Graph**: SNS シェア対応
- **構造化データ**: JSON-LD によるリッチスニペット対応
- **サイトマップ**: 自動生成される sitemap.xml
- **robots.txt**: 検索エンジンクローラー向け設定

## レスポンシブデザイン

- **モバイルファースト**設計
- **Tailwind CSS**のブレークポイント使用
- **タッチフレンドリー**なインターフェース

## Docker 環境での起動

このプロジェクトは Docker 環境での開発を前提として構築されています。

### コンテナ構成

- **PostgreSQL**: データベース (ポート 5432)
- **Web App**: Next.js アプリケーション (ポート 3001)
- **Admin App**: 管理画面アプリケーション (ポート 3000)

### 開発フロー

```bash
# コンテナのビルドと起動
docker compose up -d

# ログの確認
docker compose logs -f

# コンテナの停止
docker compose down
```


### パッケージの追加時

新しいパッケージを追加した場合は、コンテナの再ビルドが必要です：

```bash
# コンテナを停止・削除
docker compose down -v

# 再ビルドして起動
docker compose up -d --build
```

### 注意事項

- 本番環境（Vercel）では Docker は使用されません。
- ホスト側での `pnpm dev` の実行は不要です。

## デプロイ

このプロジェクトは[Vercel](https://vercel.com/)でのデプロイに最適化されています。

### Vercel へのデプロイ手順

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定（必要に応じて）
3. 自動的にビルド・デプロイが実行されます

**注意**: 本番環境は Vercel でデプロイするため、Docker コンテナは使用しません。`pnpm run build`コマンドでビルドが実行されます。

## 貢献

プロジェクトへの貢献を歓迎します。プルリクエストを送信する前に：

1. コードスタイルガイドラインに従ってください
2. `docker compose exec web pnpm run lint`でコードをチェックしてください
3. `docker compose exec web pnpm run type-check`で型チェックを実行してください

### Pre-commit フック (Lefthook)

このプロジェクトでは、**Lefthook** を使用してコミット前に自動的に以下が実行されます：

- **Biome**: 変更されたファイルの lint/format チェックと自動修正
- **TypeScript**: 全プロジェクトの型チェック

これにより、コードの品質と一貫性が保たれます。
