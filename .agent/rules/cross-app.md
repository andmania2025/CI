---
description: Web+Admin横断的な開発ルールと共通コンポーネント管理
globs:
  - "apps/**/*"
  - "packages/**/*"
alwaysApply: false
---

# 横断的開発ルール (Web + Admin)

## 概要

このドキュメントは、Web アプリケーションと Admin アプリケーションの両方に影響する変更を行う際のルールを定義します。

## 適用シナリオ

以下の作業を行う際、このルールを参照してください：

1. **共有コンポーネントの作成/変更** - 両アプリで使用されるUIコンポーネント
2. **共通型定義の変更** - 両アプリで使用される型
3. **認証/認可の変更** - ユーザー認証に関わる変更
4. **データベーススキーマの変更** - Prisma スキーマの変更
5. **共有ユーティリティの作成** - 両アプリで使用される関数

## コンテキスト判断フロー

```
タスクを受けたとき
    ↓
どちらのアプリに影響するか？
    ↓
┌─────────────────┬─────────────────┬─────────────────┐
│   Web のみ      │   Admin のみ    │     両方        │
│                 │                 │                 │
│ → web.md を     │ → admin.md を   │ → cross-app.md  │
│   参照          │   参照          │   を参照        │
└─────────────────┴─────────────────┴─────────────────┘
```

## 共通コンポーネント管理

### コンポーネントの配置基準

| 条件 | 配置場所 |
|------|----------|
| 両アプリで使用 & 安定した API | `packages/ui/` |
| 両アプリで使用 & 開発中/実験的 | 各アプリの `components/` に複製 |
| 1つのアプリでのみ使用 | そのアプリの `components/` |

### 共通化の判断基準

```typescript
// 共通化すべき ✅
// - 基本UIコンポーネント (Button, Input, Card)
// - 汎用レイアウトコンポーネント
// - ユーティリティ関数 (formatDate, cn)

// 共通化すべきでない ❌
// - ビジネスロジックを含むコンポーネント
// - アプリ固有のスタイリングに依存するコンポーネント
// - 頻繁に変更されるコンポーネント
```

## 認証/認可の統合

### 現在の構成

| アプリ | 認証方式 | 対象ユーザー |
|--------|----------|--------------|
| Web | Supabase Auth | 一般ユーザー |
| Admin | Supabase Auth + 権限チェック | 管理者 |

### 認証関連の変更手順

1. **Supabase設定の変更**
   - 両アプリに影響する可能性を確認
   - RLS ポリシーの変更は特に注意

2. **認証スキーマの変更**
   ```bash
   # 1. スキーマ変更
   # prisma/schema.prisma を編集
   
   # 2. マイグレーション
   pnpm exec prisma migrate dev --name auth_change
   
   # 3. 両アプリでの確認
   pnpm --filter web dev &
   pnpm --filter admin dev
   ```

3. **認証フローの変更**
   - Web: `apps/web/src/lib/supabase/`
   - Admin: `apps/admin/src/lib/supabase/`
   - 両方を同時に更新

## データベーススキーマ変更

### 変更手順

```bash
# 1. スキーマファイルの編集
# prisma/schema.prisma

# 2. マイグレーション生成（ルートで実行）
pnpm exec prisma migrate dev --name descriptive_name

# 3. 両アプリで型を再生成
pnpm --filter admin db:generate
pnpm --filter web db:generate  # もし web で prisma を使用する場合

# 4. 両アプリでの影響確認
pnpm --filter admin type-check
pnpm --filter web type-check

# 5. 両アプリでのテスト
pnpm --filter admin test
pnpm --filter web test
```

### スキーマ変更のチェックリスト

- [ ] 変更が両アプリに与える影響を確認
- [ ] マイグレーションをローカルでテスト
- [ ] RLS ポリシーの更新が必要か確認
- [ ] シードデータの更新が必要か確認
- [ ] 両アプリで型チェックが通ることを確認
- [ ] 両アプリでテストが通ることを確認

## 共有ユーティリティ関数

### packages/utils への抽出基準

```typescript
// 抽出すべきユーティリティ
// - 日付フォーマット関数
// - 数値フォーマット関数
// - バリデーションヘルパー
// - 文字列操作

// 例: packages/utils/src/format/date.ts
export const formatDate = (date: Date, format: string): string => {
  // 実装
};

export const formatRelativeTime = (date: Date): string => {
  // 実装
};
```

### 型定義の共有

```typescript
// packages/types/src/index.ts

// データベース関連の型
export type { User, Property, Content } from './database.types';

// API レスポンス型
export type { ApiResponse, PaginatedResponse } from './api.types';

// 共通ユーティリティ型
export type { Nullable, Optional } from './utility.types';
```

## 開発ワークフロー

### 両アプリに影響する変更の開発フロー

```bash
# 1. 機能ブランチを作成
git checkout -b feature/shared-component

# 2. 両アプリの開発サーバーを起動
pnpm --filter web dev &
pnpm --filter admin dev

# 3. 変更を実装
# packages/ または両アプリを同時に変更

# 4. 型チェック（両アプリ）
pnpm --filter web type-check
pnpm --filter admin type-check

# 5. テスト（両アプリ）
pnpm --filter web test
pnpm --filter admin test

# 6. ビルド確認（両アプリ）
pnpm --filter web build
pnpm --filter admin build

# 7. コミット
git add .
git commit -m "feat: add shared component for both apps"
```

### コードレビュー時の確認事項

両アプリに影響する変更のレビュー時:

- [ ] 両アプリでの動作確認
- [ ] インポートパスが正しいか
- [ ] 型の整合性
- [ ] スタイリングの一貫性
- [ ] パフォーマンスへの影響

## 環境変数

### 共通環境変数

```env
# 両アプリで共通
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

### アプリ固有環境変数

```env
# Web のみ
NEXT_PUBLIC_WEB_SPECIFIC=

# Admin のみ
NEXT_PUBLIC_ADMIN_SPECIFIC=
```

### 環境変数変更時の確認

- [ ] 両アプリの `.env.example` を更新
- [ ] 両アプリの `process.env` 使用箇所を確認
- [ ] デプロイ設定（Vercel）を更新

## デプロイ時の注意

### 依存関係の変更

packages/ の変更時:
1. 両アプリの `package.json` を確認
2. `pnpm install` でワークスペース依存関係を更新
3. 両アプリのビルドを確認

### データベースマイグレーション

本番環境へのマイグレーション:
1. ステージングで両アプリをテスト
2. マイグレーション適用
3. 両アプリのデプロイ
4. 両アプリでの動作確認

## トラブルシューティング

### 一方のアプリでのみエラーが発生

```bash
# 1. 依存関係の確認
pnpm --filter <app_name> ls

# 2. node_modules のクリア
rm -rf apps/<app_name>/node_modules
pnpm install

# 3. 型の再生成
pnpm --filter <app_name> db:generate
```

### 共有パッケージの変更が反映されない

```bash
# 1. パッケージのビルド（必要な場合）
pnpm --filter @repo/ui build

# 2. アプリの再起動
# 開発サーバーを再起動

# 3. キャッシュのクリア
rm -rf apps/<app_name>/.next
```

## ベストプラクティス

### DO ✅

- 変更前に影響範囲を確認する
- 両アプリでテストを実行する
- 型定義を共有する場合は `packages/types` を使用
- コミットメッセージに影響範囲を明記（例: `feat(web, admin): ...`）

### DON'T ❌

- 片方のアプリだけをテストして完了としない
- 共有コードにアプリ固有のロジックを入れない
- packages/ のコードで直接 apps/ のコードをインポートしない
- 環境変数をハードコードしない
