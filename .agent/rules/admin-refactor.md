---
description: 管理画面アプリケーションのリファクタリング指針とコンポーネント最適化チェックリスト
globs:
  - "apps/admin/**/*"
alwaysApply: false
---

# Admin アプリ リファクタリング指針

## 現状分析

### ディレクトリ構造 (apps/admin/src/)

```
apps/admin/src/
├── app/                       # Next.js App Router
│   ├── (auth)/               # 管理者認証
│   │   ├── login/
│   │   ├── logout/
│   │   └── layout.tsx
│   ├── (protected)/          # 認証必須エリア (大量のページ)
│   ├── api/                  # APIルート
│   ├── login-info/           # ログイン情報
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── components/               # UIコンポーネント
│   ├── admin/                # 管理画面固有 (58ファイル)
│   ├── common/               # 共通コンポーネント
│   ├── layout/               # レイアウト
│   ├── property-details/     # 物件詳細
│   ├── property-forms/       # 物件フォーム
│   ├── providers/            # プロバイダー
│   ├── settings/             # 設定
│   ├── table-columns/        # テーブル列定義
│   ├── tables/               # テーブル
│   └── ui/                   # 基本UI (50ファイル)
├── config/                   # 設定
├── contexts/                 # Reactコンテキスト
├── data/                     # 静的データ
├── features/                 # 機能別モジュール (4機能)
├── hooks/                    # カスタムフック (5ファイル)
├── lib/                      # ライブラリ
├── schemas/                  # Zodスキーマ
├── server/                   # サーバーサイドロジック
├── services/                 # サービス層
├── stores/                   # Zustandストア
├── types/                    # 型定義
└── utils/                    # ユーティリティ
```

## 特に注目すべき問題点

### 1. components/admin/ の肥大化 (58ファイル)

**問題点:**
- 1つのディレクトリに大量のコンポーネントが存在
- 責務の分離が不明確

**分析すべき項目:**
- コンポーネント間の依存関係
- 機能による分類可能性
- 再利用可能性

## リファクタリング優先順位

### 🔴 高優先度 (Phase 1)

#### 1. components/admin/ の再構成

**推奨構造:**
```
components/
├── admin/
│   ├── user-management/      # ユーザー管理
│   │   ├── UserTable.tsx
│   │   ├── UserForm.tsx
│   │   ├── UserDetails.tsx
│   │   └── index.ts
│   ├── property-management/  # 物件管理
│   │   ├── PropertyList.tsx
│   │   ├── PropertyEditor.tsx
│   │   └── index.ts
│   ├── content-management/   # コンテンツ管理
│   │   ├── ContentList.tsx
│   │   ├── ContentEditor.tsx
│   │   └── index.ts
│   ├── analytics/            # アナリティクス
│   │   ├── Dashboard.tsx
│   │   ├── Charts/
│   │   └── index.ts
│   └── shared/               # 管理画面共通
│       ├── AdminHeader.tsx
│       ├── AdminSidebar.tsx
│       └── index.ts
└── ui/                       # 基本UI (shadcn/ui)
```

#### 2. (protected) ルートグループの整理

**現状:** 169個の子要素（ページ/コンポーネント）

**推奨構造:**
```
app/(protected)/
├── dashboard/                # ダッシュボード
│   └── page.tsx
├── users/                    # ユーザー管理
│   ├── page.tsx             # 一覧
│   ├── [id]/
│   │   ├── page.tsx         # 詳細
│   │   └── edit/
│   │       └── page.tsx     # 編集
│   └── new/
│       └── page.tsx         # 新規作成
├── properties/               # 物件管理
│   ├── page.tsx
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── edit/
│   └── new/
├── content/                  # コンテンツ管理
├── analytics/                # アナリティクス
├── settings/                 # 設定
└── layout.tsx               # 共通レイアウト
```

#### 3. テーブル関連コンポーネントの統合

**現状:**
- `components/tables/`
- `components/table-columns/`

**統合案:**
```
components/admin/data-table/
├── DataTable.tsx             # 汎用データテーブル
├── DataTableToolbar.tsx      # ツールバー
├── DataTablePagination.tsx   # ページネーション
├── DataTableFilters.tsx      # フィルター
├── columns/                  # 列定義
│   ├── userColumns.tsx
│   ├── propertyColumns.tsx
│   └── index.ts
└── index.ts
```

### 🟡 中優先度 (Phase 2)

#### 4. features/ ディレクトリの拡充

現在4機能のみ。以下を追加検討：

```
features/
├── user-management/          # ユーザー管理
│   ├── components/
│   ├── hooks/
│   │   ├── useUsers.ts
│   │   ├── useUserMutations.ts
│   │   └── useUserFilters.ts
│   ├── schemas/
│   ├── types/
│   └── utils/
├── property-management/      # 物件管理
├── content-management/       # コンテンツ管理
├── analytics/                # アナリティクス
├── audit-log/               # 監査ログ
└── settings/                # システム設定
```

#### 5. Server ディレクトリの整理

**チェック項目:**
- [ ] Server Actions が適切に分類されているか
- [ ] データベースアクセスが集約されているか
- [ ] エラーハンドリングが統一されているか

```
server/
├── actions/                  # Server Actions
│   ├── users/
│   │   ├── getUsers.ts
│   │   ├── createUser.ts
│   │   ├── updateUser.ts
│   │   └── deleteUser.ts
│   ├── properties/
│   └── content/
├── queries/                  # 読み取り専用クエリ
│   ├── users.ts
│   ├── properties.ts
│   └── analytics.ts
└── utils/                   # サーバーユーティリティ
    ├── auth.ts
    └── db.ts
```

#### 6. Services ディレクトリの活用

**現状:** 2ファイルのみ

**拡充案:**
```
services/
├── api/                      # 外部API連携
│   ├── supabase.ts
│   └── stripe.ts
├── email/                    # メール送信
├── storage/                  # ファイルストレージ
└── notification/             # 通知
```

### 🟢 低優先度 (Phase 3)

#### 7. パフォーマンス最適化

**管理画面特有の最適化:**
- [ ] データテーブルの仮想スクロール導入
- [ ] 大量データ表示時のページネーション最適化
- [ ] チャート/グラフの遅延読み込み
- [ ] 重いダッシュボードコンポーネントのメモ化

#### 8. 共有パッケージへの抽出

`packages/` への抽出候補:
- [ ] `components/ui/` の基本コンポーネント (Web と共通化)
- [ ] 汎用テーブルコンポーネント
- [ ] 共通型定義

## コンポーネント最適化チェックリスト

### 管理画面固有のパターン

#### 1. データテーブルコンポーネント

```typescript
// 最適化されたテーブルコンポーネント
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  // ページネーション
  pagination?: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  };
  onPaginationChange?: (pagination: PaginationState) => void;
  // 選択
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  // 一括操作
  bulkActions?: BulkAction<T>[];
}

export const DataTable = <T,>({ 
  data,
  columns,
  isLoading,
  pagination,
  onPaginationChange,
  enableRowSelection,
  onRowSelectionChange,
  bulkActions,
}: DataTableProps<T>) => {
  // TanStack Table 使用
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // ...
  });

  if (isLoading) {
    return <DataTableSkeleton columns={columns.length} />;
  }

  return (
    <div>
      {bulkActions && <BulkActionToolbar actions={bulkActions} />}
      <Table>
        {/* テーブル実装 */}
      </Table>
      {pagination && <DataTablePagination table={table} />}
    </div>
  );
};
```

#### 2. フォームコンポーネント

```typescript
// 管理画面フォームの標準パターン
interface AdminFormProps<T extends z.ZodObject<any>> {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  isLoading?: boolean;
}

export const AdminForm = <T extends z.ZodObject<any>>({
  schema,
  defaultValues,
  onSubmit,
  isLoading,
}: AdminFormProps<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* フォームフィールド */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '保存中...' : '保存'}
        </Button>
      </form>
    </Form>
  );
};
```

#### 3. 権限ガード

```typescript
// 権限ベースのレンダリング
interface PermissionGuardProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGuard = ({
  permission,
  fallback = null,
  children,
}: PermissionGuardProps) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return <>{children}</>;
};

// 使用例
<PermissionGuard permission="users.delete" fallback={<span>権限がありません</span>}>
  <DeleteUserButton userId={user.id} />
</PermissionGuard>
```

## リファクタリング実施手順

### 1. 準備

```bash
# 現在の状態でテストを実行
pnpm --filter admin test

# 型チェック
pnpm --filter admin type-check

# Lint
pnpm --filter admin lint
```

### 2. components/admin/ のリファクタリング

```bash
# 1. 現在のファイル一覧を確認
ls -la apps/admin/src/components/admin/

# 2. 機能別にグループ化
# 例: user-management, property-management, analytics

# 3. 段階的に移動
mkdir -p apps/admin/src/components/admin/user-management
# ファイルを移動し、インポートを更新
```

### 3. 検証

```bash
# 全テスト実行
pnpm --filter admin test:run

# 型チェック
pnpm --filter admin type-check

# ビルド確認
pnpm --filter admin build
```

## 具体的なリファクタリングタスク

### タスク1: admin コンポーネントの機能別分類

1. 全58ファイルをリストアップ
2. 機能カテゴリに分類:
   - ユーザー管理
   - 物件管理
   - コンテンツ管理
   - アナリティクス
   - 共通/レイアウト
3. 段階的に移動

### タスク2: テーブル関連の統合

```typescript
// 統合されたDataTableコンポーネント
// components/admin/data-table/DataTable.tsx

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: keyof TData;
  filterComponent?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  filterComponent,
}: DataTableProps<TData, TValue>) {
  // 汎用実装
}
```

### タスク3: Server Actions の整理

```bash
# 現在の構造を確認
ls -la apps/admin/src/server/

# 推奨構造に再編成
mkdir -p apps/admin/src/server/actions/{users,properties,content}
mkdir -p apps/admin/src/server/queries
```

## 注意事項

- **機能を壊さない**: 管理画面は業務に直結するため、特に注意
- **段階的に実施**: 一度にすべてを変更しない
- **テストカバレッジ**: 重要な操作にはテストを追加
- **監査ログ**: リファクタリング後も監査ログが正しく動作することを確認
