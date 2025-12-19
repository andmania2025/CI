---
description: 管理画面アプリケーションの開発ガイドライン、ルール、およびパターン
globs:
  - "apps/admin/**/*"
alwaysApply: false
---

# Admin アプリケーション開発ルール

## 関連ルール

このファイルは以下のルールを拡張します。必ず参照してください：
- `system.md` - ペルソナ、原則
- `frontend.md` - コンポーネント設計、スタイリング、状態管理
- `backend.md` - データベース、認証

リファクタリング作業時は `admin-refactor.md` も参照してください。

## Admin アプリのコンテキスト

あなたは **管理ダッシュボードアプリケーション** (`apps/admin`) を開発しています。以下に焦点を当ててください：

- 効率的なインターフェースによるデータ管理とCRUD操作
- システム分析、レポート作成、ビジネスインテリジェンス
- ユーザー管理、モデレーション、カスタマーサポートツール
- コンテンツ管理とシステム設定
- ロールベースのアクセス制御（RBAC）と監査ログ
- キーボードショートカットと一括操作によるパワーユーザー向けワークフロー

## ディレクトリ構造

```
apps/admin/src/
├── app/                       # Next.js App Router
│   ├── (auth)/               # 認証ルート
│   │   ├── login/            # ログイン
│   │   ├── logout/           # ログアウト
│   │   └── layout.tsx
│   ├── (protected)/          # 保護されたルート（サイドバー付き）
│   │   ├── dashboard/        # ホーム
│   │   ├── members/          # 会員管理
│   │   ├── properties/       # 物件管理
│   │   ├── realtors/         # 不動産業者管理
│   │   ├── realtor-replies/  # 業者返信管理
│   │   ├── user-posts/       # ユーザー投稿管理
│   │   ├── inquiry-management/ # 問い合わせ管理
│   │   ├── bulk-assessment/  # 一括査定
│   │   ├── content/          # コンテンツ管理
│   │   ├── file-box/         # ファイルボックス
│   │   ├── settings/         # システム設定
│   │   └── layout.tsx        # ProtectedLayoutClient 含む
│   ├── api/                  # APIルート
│   │   ├── auth/             # 認証API
│   │   └── trpc/             # tRPC エンドポイント
│   ├── globals.css           # グローバルスタイル (Tailwind v4)
│   ├── layout.tsx            # ルートレイアウト
│   └── providers.tsx         # TanStack Query, tRPC, Theme
├── components/               # UIコンポーネント
│   ├── admin/                # 管理画面固有 (content-management, inquiry-management等)
│   ├── common/               # 共通 (ConfirmDialog, LoadingSpinner等)
│   ├── layout/               # レイアウト (AppSidebar, SiteHeader, NavUser等)
│   ├── tables/               # データテーブル (GenericDataTable, TableToolbar等)
│   ├── table-columns/        # テーブルのカラム定義
│   ├── property-details/     # 物件詳細表示
│   ├── property-forms/       # 物件編集フォーム
│   └── ui/                   # 基本UI (shadcn/ui プリミティブ 47+)
├── features/                 # 機能別モジュール (auth等)
├── hooks/                    # カスタムフック (useDataTable, useManagementForm, useRolePermissions等)
├── lib/                      # ライブラリ (prisma, supabase, utils)
├── server/                   # サーバーサイドロジック
│   ├── api/                 # tRPC ルーター設定 (root.ts, trpc.ts)
│   │   └── routers/         # 機能別 tRPC ルーター
│   └── dal/                 # Data Access Layer (search.ts等)
├── schemas/                  # Zod スキーマ (propertySchema, realtorSchema等)
├── stores/                   # Zustand ストア (sidebarStore等)
├── types/                    # 型定義 (models.ts, role.ts等)
├── services/                 # 外部サービス/検索サービス
└── utils/                    # ユーティリティ (api.ts)
```

## 認証と認可

### 管理者認証

管理画面では、Supabase Auth を使用し、必要に応じて RLS をバイパスする `adminClient` を使用します。

### ロールベースアクセス制御 (RBAC)

Admin 内では Role と Permission を定義し、UI レベルでのガードと Server サイドでの検証を徹底します。

```typescript
// 管理画面固有の権限管理
export type Permission = 'properties.read' | 'properties.write' | 'users.admin' | ...;
```

## データテーブルパターン

TanStack Table を利用した `GenericDataTable` を基本とし、以下の機能を標準装備します：
- ページネーション（サーバーサイド推奨）
- フィルタリングと検索
- 行選択と一括操作（Bulk Actions）
- ソート

## 監査ログ

重要な操作（物件の削除、ユーザー権限の変更など）は、必ず実行ログ（Action Log）を記録してください。

## フォームパターン

React Hook Form + Zod を使用します。
- バリデーションエラーの即時表示
- 送信中のローディング状態（Button の disabled 制御）
- 成功/失敗のトースト通知 (Sonner)

## tRPC (Admin 固有)

Admin アプリケーションでは、型安全な API 通信のために tRPC を積極的に活用します。

## パフォーマンス最適化

- **仮想スクロール**: 数百行を超えるテーブルでは `@tanstack/react-virtual` を検討。
- **重い計算**: 分析ページなどでは `useMemo` による最適化。
- **PPR (Partial Prerendering)**: ダッシュボードのレイアウトは静的に、データ部分は動的に Suspense でラップ。

## 命名規則

| 項目 | 規則 | 例 |
|------|------|-----|
| ルートグループ | `(group)` | `(protected)` |
| ページ/ディレクトリ | `kebab-case` | `property-management` |
| コンポーネント | `PascalCase` | `PropertyTable.tsx` |
| 型定義 | `PascalCase` | `PropertyType` |

## 開発サーバー

```bash
pnpm --filter admin dev
# ポート: 3000
```
