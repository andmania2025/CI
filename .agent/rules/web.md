---
description: ユーザー向けWebアプリケーションの開発ガイドライン、ルール、およびパターン
globs:
  - "apps/web/**/*"
alwaysApply: false
---

# Web アプリケーション開発ルール

## 関連ルール

このファイルは以下のルールを拡張します。必ず参照してください：
- `system.md` - ペルソナ、原則
- `frontend.md` - コンポーネント設計、スタイリング、状態管理
- `backend.md` - データベース、認証

リファクタリング作業時は `web-refactor.md` も参照してください。

## Web アプリのコンテキスト

あなたは **ユーザー向けWebアプリケーション** (`apps/web`) を開発しています。以下に焦点を当ててください：

- ユーザーエクスペリエンスとコンバージョン最適化
- パブリックマーケティングページとユーザーオンボーディング
- ユーザー認証とセッション管理
- SEO最適化とパフォーマンス
- モバイルファーストのレスポンシブデザイン

## ディレクトリ構造

```
apps/web/src/
├── app/                       # Next.js App Router
│   ├── (auth)/               # 認証フロー (login, register, etc.)
│   ├── (property)/           # 物件関連ページ
│   ├── (protected)/          # 認証必須エリア (dashboard, profile)
│   ├── (public)/             # パブリックページ (landing, about)
│   ├── api/                  # APIルート
│   ├── auth/                 # 認証コールバック
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── sitemap.ts            # サイトマップ生成
├── components/               # UIコンポーネント
│   ├── ui/                   # 基本UI (Button, Input, Card)
│   ├── auth/                 # 認証コンポーネント
│   ├── cards/                # カードコンポーネント
│   ├── common/               # 共通コンポーネント
│   ├── forms/                # フォームコンポーネント
│   ├── layout/               # レイアウト (Header, Footer, Sidebar)
│   ├── marketing/            # マーケティング (Hero, Features, CTA)
│   ├── navigation/           # ナビゲーション
│   └── search/               # 検索コンポーネント
├── data/                     # 静的データ
├── features/                 # 機能別モジュール
│   ├── auth/                 # 認証機能
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── types/
│   └── [feature-name]/       # その他の機能
├── hooks/                    # 汎用カスタムフック
├── lib/                      # ライブラリ・ユーティリティ
│   ├── supabase/            # Supabase設定
│   ├── utils/               # ユーティリティ関数
│   └── constants/           # 定数
├── schemas/                  # Zodスキーマ（共通）
├── stores/                   # Zustandストア
├── types/                    # 型定義
└── test/                     # テスト設定
```

## ルートグループとナビゲーション

| グループ | 目的 | 認証 |
|----------|------|------|
| `(public)` | マーケティング、LP | 不要 |
| `(auth)` | ログイン、登録 | 不要 |
| `(property)` | 物件検索、詳細 | 不要 |
| `(protected)` | ダッシュボード | 必須 |

## コンポーネントパターン

### 1. ページコンポーネント

```typescript
// app/(public)/page.tsx
import { HeroSection } from '@/components/marketing/HeroSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';

export const metadata = {
  title: 'ホーム | サービス名',
  description: 'サービスの説明',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
```

### 2. マーケティングコンポーネント

```typescript
// components/marketing/HeroSection.tsx
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const HeroSection = ({
  title = 'デフォルトタイトル',
  subtitle,
  ctaText = '今すぐ始める',
  ctaHref = '/register',
}: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        <Button asChild className="mt-8">
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
};
```

### 3. 認証コンポーネント

```typescript
// components/auth/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/schemas/authSchema';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* フォームフィールド */}
      </form>
    </Form>
  );
};
```

## SEO最適化

### メタデータ

```typescript
// app/(public)/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要 | サービス名',
  description: '私たちについての詳細な説明',
  openGraph: {
    title: '会社概要 | サービス名',
    description: '私たちについての詳細な説明',
    type: 'website',
  },
};
```

### 構造化データ

```typescript
// 必要に応じてJSON-LDを追加
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'サービス名',
      // ...
    }),
  }}
/>
```

## パフォーマンス最適化

### 画像

```typescript
import Image from 'next/image';

// 常に next/image を使用
<Image
  src="/hero-image.jpg"
  alt="説明文"
  width={1200}
  height={600}
  priority // ATFの重要な画像
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### 動的インポート

```typescript
import dynamic from 'next/dynamic';

// 重いコンポーネントは動的インポート
const HeavyChart = dynamic(() => import('@/components/charts/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

### キャッシュ

```typescript
import { cache } from 'react';

// リクエストメモ化
export const getProperty = cache(async (id: string) => {
  // データ取得
});
```

## モバイルファースト

```typescript
// Tailwind のモバイルファーストアプローチ
<div className="
  px-4 py-6           // モバイル (デフォルト)
  md:px-8 md:py-12    // タブレット
  lg:px-16 lg:py-20   // デスクトップ
">
  {/* コンテンツ */}
</div>
```

## 状態管理

### サーバー状態 (TanStack Query)

```typescript
// features/property/hooks/useProperties.ts
import { useQuery } from '@tanstack/react-query';

export const useProperties = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 5 * 60 * 1000, // 5分
  });
};
```

### クライアント状態 (Zustand)

```typescript
// stores/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
```

## 命名規則

| 項目 | 規則 | 例 |
|------|------|-----|
| ルートファイル | `kebab-case` | `forgot-password/page.tsx` |
| コンポーネント | `PascalCase` | `LoginForm.tsx` |
| フック | `camelCase` + `use` 接頭辞 | `useAuth.ts` |
| ストア | `camelCase` + `Store` 接尾辞 | `authStore.ts` |
| スキーマ | `camelCase` + `Schema` 接尾辞 | `authSchema.ts` |
| 型ファイル | `<name>.types.ts` | `auth.types.ts` |

## テスト

```bash
# テスト実行
pnpm --filter web test

# カバレッジ付き
pnpm --filter web test:coverage

# UI付き
pnpm --filter web test:ui
```

## 開発サーバー

```bash
# 開発サーバー起動
pnpm --filter web dev

# ポート: 3001 (デフォルト)
```
