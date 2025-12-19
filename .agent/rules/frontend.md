---
description: コンポーネント設計、ディレクトリ構造、スタイリング、状態管理、Next.js 16 パフォーマンス最適化などのフロントエンド開発ガイドライン
globs:
alwaysApply: true
---

# フロントエンド共通ルール

## コンポーネント設計の哲学

### 1. 単一責任の原則 (SRP)

- 各コンポーネントは、変更する理由が1つだけでなければなりません
- あまりにも多くのことを行う「神コンポーネント」の作成は避けてください

### 2. 継承よりコンポジション

- シンプルで再利用可能なコンポーネントを組み合わせて複雑なUIを構築します
- 複雑な継承パターンよりも、コンポーネントの合成とprops（`children`）の受け渡しを優先してください

### 3. Prop Drilling vs 状態管理

- 「Prop Drilling」（多くのコンポーネント層を通してpropsを渡すこと）は避けてください
- Propが2〜3レベルを超えて渡される場合は：
  - コンポーネントの合成を使用する
  - 状態を引き上げる
  - グローバル状態マネージャー（Zustand）に移動する

### 4. リファクタリングの指針（3のルール）

- コードの一部を3回目にコピー＆ペーストしていることに気づいたら、再利用可能なコンポーネントまたはユーティリティ関数にリファクタリングすべき
- リファクタリングの際は、純粋でロジックのない「dumb」コンポーネントを抽出し、状態とロジックを「smart」なコンテナコンポーネントに保つ

## ファイルとディレクトリ構造

### コンポーネントの命名

- コンポーネントのファイルとディレクトリは `PascalCase` にする
- 例：`src/components/ui/UserProfile.tsx`

### ディレクトリ構成

```
src/
├── components/
│   ├── ui/              # 再利用可能なUIプリミティブ (Button, Input, Card)
│   ├── [feature]/       # 機能別コンポーネント
│   └── layout/          # レイアウトコンポーネント
├── features/
│   └── [feature-name]/
│       ├── components/  # 機能固有のコンポーネント
│       ├── hooks/       # 機能固有のフック
│       ├── schemas/     # Zodスキーマ
│       └── types/       # 型定義
└── hooks/               # 共有カスタムフック
```

## コンポーネント定義とProps

### 関数定義

コンポーネントは常に `const` に割り当てられたアロー関数として定義：

```typescript
// ✅ 良い例
export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ 悪い例
export default function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### エクスポート

- コンポーネントと関数には常に**名前付きエクスポート**を使用
- **デフォルトエクスポートは禁止**（ページコンポーネントを除く）

### Props インターフェース

```typescript
// コンポーネント定義の直上で型を定義
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick 
}: ButtonProps) => {
  // ...
};
```

## スタイリング

### Tailwind CSS v4

- **ユーティリティファースト:** JSX内で直接Tailwind CSSのユーティリティクラスを使用
- **カスタムCSSファイルなし:** 別の `.css` ファイルにカスタムCSSを書かない
- **`globals.css` の制限:** ベーススタイル（`@layer base`）またはサードパーティライブラリの上書きにのみ使用

### 条件付きスタイル

```typescript
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// clsx + twMerge のユーティリティ
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// cva でバリアント管理
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

## 状態管理

### サーバー状態 (TanStack Query)

データのフェッチ、キャッシュ、ミューテーションには **TanStack Query** を使用：

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 取得
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5分
  });
};

// ミューテーション
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

### グローバルクライアント状態 (Zustand)

複数のページや深いコンポーネントツリーで共有される状態には **Zustand** を使用：

```typescript
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
```

### ローカル状態

単一のコンポーネントにローカルな状態には `useState` または `useReducer` を使用。

## フォーム

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, '8文字以上で入力してください'),
});

type FormData = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    // 送信処理
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* フォームフィールド */}
    </form>
  );
};
```

## アクセシビリティ (a11y)

- すべてのインタラクティブな要素が完全にアクセス可能であることを確認
- セマンティックHTMLを使用
- 必要に応じてARIA属性（`aria-label`, `role` など）を追加
- ボタン以外のインタラクティブな要素（`onClick` を持つ `div` など）には `role="button"` と `tabIndex={0}` を設定

## Next.js 16 パフォーマンス最適化

### Request Memoization (React Cache)

同一リクエスト内での重複したデータ取得を排除：

```typescript
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } });
});
```

### Data Cache (Next.js Cache)

サーバーリクエストやデプロイを跨いでデータを永続化：

```typescript
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id) => db.user.findUnique({ where: { id } }),
  ['user-cache'],
  { revalidate: 3600 }
);
```

### Partial Prerendering (PPR)

```typescript
import { unstable_noStore } from 'next/cache';

export const DynamicSection = () => {
  unstable_noStore(); // 動的としてマーク
  // 動的コンテンツ
};
```

### ベストプラクティス

- 静的なServer Component（ヘッダー、フッター）に `cache()` を適用
- 動的データをフェッチするコンポーネントには `unstable_noStore()` を使用
- PPRとSuspenseバウンダリを組み合わせる
- React 19の並行機能を活用

## 画像最適化

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="説明文"
  width={1200}
  height={600}
  priority  // ATFの重要な画像
  placeholder="blur"
/>
```

## 動的インポート

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false, // 必要に応じて
  }
);
```
