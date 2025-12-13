---
description: 管理画面アプリケーションのディレクトリ構造
globs: ["apps/admin/**/*"]
alwaysApply: false
---

### 管理画面固有のディレクトリ構造

```
apps/admin/src/
├── app/
│   ├── (auth)/                # 管理者認証
│   │   ├── login/
│   │   ├── setup/             # 初期管理者設定
│   │   └── layout.tsx         # 認証レイアウト
│   ├── dashboard/             # メイン管理ダッシュボード
│   │   ├── users/             # ユーザー管理 ([id], edit, new, bulk)
│   │   ├── products/          # 商品管理 (categories, inventory)
│   │   ├── orders/            # 注文管理 (refunds, fulfillment)
│   │   ├── content/           # CMS (posts, pages, media)
│   │   ├── analytics/         # レポート (traffic, revenue, users)
│   │   ├── support/           # カスタマーサポート (tickets, knowledge-base)
│   │   ├── settings/          # システム設定 (general, integrations, permissions, billing, audit)
│   │   ├── page.tsx           # ダッシュボード概要
│   │   └── layout.tsx         # 管理サイドバーレイアウト
│   ├── api/
│   │   ├── admin/             # 管理者固有API (users, analytics, settings, audit)
│   │   ├── webhook/           # 管理者Webhook
│   │   └── export/            # データエクスポートエンドポイント
│   ├── layout.tsx             # 管理者プロバイダー付きルートレイアウト
│   ├── providers.tsx          # 管理者固有プロバイダー
│   ├── globals.css            # 管理者グローバルスタイル
│   ├── loading.tsx            # グローバルローディング
│   ├── error.tsx              # エラーバウンダリ
│   └── not-found.tsx          # 404ページ
├── components/
│   ├── ui/                    # @repo/ui + shadcn/ui コンポーネント
│   ├── admin/                 # 管理者固有コンポーネント (UserTable, UserForm, StatsCard, etc.)
│   ├── tables/                # データテーブルコンポーネント (DataTable, Toolbar, Pagination, etc.)
│   ├── forms/                 # フォームコンポーネント (FormBuilder, FormWizard, etc.)
│   ├── charts/                # チャートコンポーネント (LineChart, BarChart, MetricCard, etc.)
│   ├── layout/                # レイアウトコンポーネント (AdminHeader, AdminSidebar, CommandPalette, etc.)
│   └── common/                # 共通管理者コンポーネント (ErrorBoundary, EmptyState, ConfirmationDialog, etc.)
├── features/                  # 機能ベースの構成 (02_frontend.mdcに従う)
│   ├── user-management/       # ユーザーCRUD (hooks, types, utils)
│   ├── analytics/             # アナリティクス & レポート
│   ├── content-management/    # CMS機能
│   ├── system-settings/       # システム設定
│   ├── support/               # カスタマーサポート
│   └── audit/                 # 監査ログ
├── hooks/                     # 共有管理者フック (useAdminAuth, usePermissions, useDataTable, useBulkActions, etc.)
├── lib/
│   ├── supabase/              # Supabase設定 (adminClient, rlsBypass)
│   ├── permissions/           # RBACシステム (roles, permissions, middleware)
│   ├── analytics/             # アナリティクスユーティリティ (metrics, reports, exporters)
│   ├── tanstack-query/        # クエリ設定 (provider, queries)
│   ├── utils/                 # 管理者ユーティリティ (format, validation, filters, export)
│   └── constants/             # 定数 (routes, config, permissions, roles)
├── stores/                    # Zustandストア (adminAuthStore, permissionsStore, uiStore, etc.)
├── schemas/                   # Zodスキーマ (userSchema, contentSchema, etc.)
├── types/                     # 共有型 (admin.types, permissions.types, etc.)
└── middleware.ts              # 管理者認証および権限ミドルウェア
```
