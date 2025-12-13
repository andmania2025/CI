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
- **Icons**: [Lucide React](https://lucide.dev/)

### 開発環境

- **Node.js**: >=20.0.0
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Type Checking**: TypeScript
- **Pre-commit Hooks**: Husky + lint-staged

## 前提条件

このプロジェクトを実行するには、以下がシステムにインストールされている必要があります：

- [Node.js](https://nodejs.org/en/) (v20.0.0 以上)
- [pnpm](https://pnpm.io/) (Node.js 20 以上では`corepack enable`で有効化可能)

## セットアップ

### 1. pnpm の有効化（初回のみ）

Node.js 20 以上を使用している場合、corepack で pnpm を有効化できます：

```bash
corepack enable
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 2.5. 環境変数の設定（初回のみ）

```bash
# .env.exampleをコピーして.env.localを作成
cp .env.example .env.local

# .env.localを編集して実際の値を設定
# 必要な環境変数:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY (サーバーサイドのみ)
# - DATABASE_URL
# - DIRECT_URL
```

### 3. 開発サーバーの起動

```bash
pnpm run dev
```

数秒後、プロジェクトは以下のアドレスでアクセス可能になります：  
**通常の開発サーバー**: [http://localhost:3000](http://localhost:3000)

**注意**: Docker を使用する場合は http://localhost:3001 でアクセス可能です（詳細は「Docker 環境での起動」セクションを参照）。

### 4. 本番ビルド

```bash
pnpm run build
```

### 5. 本番サーバーの起動

```bash
pnpm start
```

## 利用可能なスクリプト

- `pnpm run dev` - 開発サーバーを起動
- `pnpm run build` - 本番用ビルドを作成
- `pnpm start` - 本番サーバーを起動
- `pnpm run lint` - Biome によるコードチェック
- `pnpm run lint:fix` - Biome によるコードチェックと自動修正
- `pnpm run format` - Biome によるコードフォーマット
- `pnpm run type-check` - TypeScript の型チェック

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

- **ローカル状態**: `useState`, `useReducer`
- **フォーム状態**: React Hook Form
- **サーバー状態**: TanStack Query（将来実装予定）

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

## Docker 環境での起動（開発用のみ）

このプロジェクトは開発環境でのみ Docker を使用できます。本番環境は Vercel でデプロイするため、Docker コンテナは使用しません。

### 前提条件

- [Docker](https://www.docker.com/) がインストールされていること
- [Docker Compose](https://docs.docker.com/compose/) がインストールされていること

### 開発環境での起動

```bash
# 開発サーバーを起動（ホットリロード対応）
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

開発サーバーは http://localhost:3001 でアクセス可能です。

### 個別の Docker コマンド

```bash
# 開発用イメージをビルド
docker build -f Dockerfile -t front-dev .

# 開発用コンテナを起動（ボリュームマウント付きでホットリロード対応）
docker run -p 3001:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  -e NODE_ENV=development \
  front-dev
```

**注意**: ホットリロードを有効にするにはボリュームマウントが必要です。通常は`docker-compose up`の使用を推奨します。

### 停止・クリーンアップ

```bash
# コンテナを停止
docker-compose down

# イメージも含めて削除
docker-compose down --rmi all

# ボリュームも含めて完全削除
docker-compose down --volumes --rmi all
```

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
2. `pnpm run lint`でコードをチェックしてください
3. `pnpm run type-check`で型チェックを実行してください

### Pre-commit フック

このプロジェクトでは、コミット前に自動的に以下が実行されます：

- **Biome**: 変更されたファイルの lint/format チェックと自動修正
- **TypeScript**: 全プロジェクトの型チェック

これにより、コードの品質と一貫性が保たれます。
