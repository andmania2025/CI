---
alwaysApply: true
---

### フロントエンドおよびベースルールの拡張

このファイルは `01_base.mdc` と `02_frontend.mdc` を拡張します。フロントエンドルールで定義されているすべてのコンポーネント設計原則、スタイリングガイドライン、および状態管理ルールに従ってください。

### Webアプリのコンテキスト

あなたは **ユーザー向けWebアプリケーション** を開発しています。以下に焦点を当ててください：

- ユーザーエクスペリエンスとコンバージョン最適化
- パブリックマーケティングページとユーザーオンボーディング
- ユーザー認証とサブスクリプション管理
- SEO最適化とパフォーマンス
- モバイルファーストのレスポンシブデザイン

### Web固有のディレクトリ構造

```
apps/web/src/
├── app/
│   ├── (public)/              # パブリックマーケティングページ（認証不要）
│   │   ├── page.tsx           # ランディングページ - コンバージョンに焦点
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx       # Stripe統合を含む料金ページ
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── layout.tsx         # マーケティングヘッダー/フッター付きパブリックレイアウト
│   ├── (auth)/                # ユーザー認証フロー
│   │   ├── login/
│   │   │   └── page.tsx       # ソーシャルプロバイダーによるログイン
│   │   ├── register/
│   │   │   └── page.tsx       # メール確認付き登録
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx         # 中央配置の認証レイアウト
│   ├── (protected)/           # ユーザーダッシュボード（認証必須）
│   │   ├── dashboard/
│   │   │   ├── page.tsx       # ユーザーダッシュボード概要
│   │   │   └── loading.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── subscription/
│   │   │   ├── page.tsx       # サブスクリプション管理
│   │   │   ├── billing/
│   │   │   │   └── page.tsx
│   │   │   └── plans/
│   │   │       └── page.tsx
│   │   └── layout.tsx         # ユーザーサイドバー付き保護レイアウト
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts   # Supabase認証コールバック
│   │   ├── webhook/
│   │   │   ├── stripe/
│   │   │   │   └── route.ts   # サブスクリプション用Stripe webhook
│   │   │   └── supabase/
│   │   │       └── route.ts
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts
│   ├── layout.tsx             # プロバイダー付きルートレイアウト
│   ├── providers.tsx          # TanStack Query, Auth, Theme プロバイダー
│   ├── globals.css            # グローバルスタイル（ベースレイヤーのみ）
│   ├── loading.tsx            # グローバルローディングUI
│   ├── error.tsx              # グローバルエラーバウンダリ
│   └── not-found.tsx          # ナビゲーション付き404ページ
├── components/
│   ├── ui/                    # From @repo/ui + shadcn/ui components
│   ├── auth/                  # 認証機能コンポーネント
│   │   ├── LoginForm.tsx      # React Hook Form + Zod バリデーション
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── AuthGuard.tsx      # ルート保護コンポーネント
│   │   └── SocialLogin.tsx    # ソーシャルプロバイダーボタン
│   ├── billing/               # サブスクリプション＆支払いコンポーネント
│   │   ├── PricingCard.tsx    # 価格表示コンポーネント
│   │   ├── SubscriptionForm.tsx # Stripe Elements 統合
│   │   ├── PaymentMethod.tsx   # 支払い方法管理
│   │   ├── BillingHistory.tsx  # 請求履歴
│   │   └── PlanUpgrade.tsx     # プラン変更インターフェース
│   ├── dashboard/             # ユーザーダッシュボードコンポーネント
│   │   ├── StatsOverview.tsx   # ユーザーメトリクス概要
│   │   ├── RecentActivity.tsx  # アクティビティフィード
│   │   ├── QuickActions.tsx    # アクションショートカット
│   │   └── UserMetrics.tsx     # ユーザー固有のアナリティクス
│   ├── marketing/             # ランディングページコンポーネント
│   │   ├── HeroSection.tsx     # CTA付きヒーロー
│   │   ├── FeaturesSection.tsx # 機能ハイライト
│   │   ├── Testimonials.tsx    # 社会的証明（導入事例など）
│   │   ├── CtaSection.tsx      # コールトゥアクションセクション
│   │   └── PricingSection.tsx  # 価格表示
│   ├── layout/                # レイアウトコンポーネント
│   │   ├── Header.tsx          # ナビゲーション付きパブリックヘッダー
│   │   ├── Footer.tsx          # リンク付きフッター
│   │   ├── Sidebar.tsx         # 保護エリア用サイドバー
│   │   ├── MobileNav.tsx       # モバイルナビゲーションメニュー
│   │   └── Breadcrumbs.tsx     # パンくずリストナビゲーション
│   └── common/                # 共通ユーティリティコンポーネント
│       ├── ErrorBoundary.tsx   # エラーバウンダリ実装
│       ├── LoadingSpinner.tsx  # ローディング状態
│       ├── DataTable.tsx       # ユーザーデータテーブル
│       └── EmptyState.tsx      # 空状態のイラスト
├── features/                  # 機能ベースの構成 (02_frontend.mdcに従う)
│   ├── auth/                  # ユーザー認証機能
│   │   ├── components/        # 機能固有のコンポーネント
│   │   ├── hooks/
│   │   │   ├── useAuth.ts     # 認証状態管理
│   │   │   └── useLogout.ts   # ログアウト機能
│   │   ├── types/
│   │   │   └── auth.types.ts  # 認証関連の型
│   │   └── utils/
│   │       └── authUtils.ts   # 認証ユーティリティ関数
│   ├── billing/               # サブスクリプション管理機能
│   │   ├── components/
│   │   ├── hooks/
│   │   │   ├── useSubscription.ts # TanStack Queryを使用したサブスクリプション状態
│   │   │   └── useBilling.ts      # 請求操作
│   │   ├── types/
│   │   └── utils/
│   ├── dashboard/             # ユーザーダッシュボード機能
│   │   ├── components/
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts # ダッシュボードデータ取得
│   │   ├── types/
│   │   └── utils/
│   └── profile/               # ユーザープロファイル管理
│       ├── components/
│       ├── hooks/
│       │   └── useProfile.ts  # プロファイル管理
│       ├── types/
│       └── utils/
├── hooks/                     # 共有Reactフック (02_frontend.mdcに従う)
│   ├── useAuth.ts
│   ├── useSubscription.ts
│   ├── useToast.ts
│   ├── useMediaQuery.ts
│   └── useLocalStorage.ts
├── lib/
│   ├── supabase/              # Supabase設定
│   │   ├── client.ts          # クライアントサイドSupabase
│   │   ├── server.ts          # サーバーサイドSupabase
│   │   └── middleware.ts      # 認証ミドルウェア
│   ├── stripe/                # Stripe統合
│   │   ├── client.ts          # Stripeクライアント設定
│   │   ├── server.ts          # Stripeサーバー設定
│   │   └── products.ts        # プロダクト定義
│   ├── tanstack-query/        # TanStack Query設定 (02_frontend.mdcに従う)
│   │   ├── provider.tsx
│   │   └── queries/
│   │       ├── authQueries.ts
│   │       ├── userQueries.ts
│   │       ├── subscriptionQueries.ts
│   │       └── billingQueries.ts
│   ├── utils/
│   │   ├── cn.ts              # clsxユーティリティ (02_frontend.mdcより)
│   │   ├── format.ts          # フォーマットユーティリティ
│   │   ├── validation.ts      # バリデーションヘルパー
│   │   └── seo.ts             # SEOユーティリティ
│   └── constants/
│       ├── routes.ts          # ルート定義
│       ├── config.ts          # アプリ設定
│       └── plans.ts           # サブスクリプションプラン
├── stores/                    # Zustandストア (02_frontend.mdcに従う)
│   ├── authStore.ts           # グローバル認証状態
│   ├── uiStore.ts             # UI状態（モーダル、テーマ）
│   ├── billingStore.ts        # 請求/サブスクリプション状態
│   └── cartStore.ts           # ショッピングカート状態
├── schemas/                   # Zodバリデーションスキーマ (02_frontend.mdcに従う)
│   ├── authSchema.ts
│   ├── userSchema.ts
│   ├── billingSchema.ts
│   └── commonSchema.ts
├── types/
│   ├── global.d.ts
│   ├── api.types.ts
│   ├── auth.types.ts
│   ├── billing.types.ts
│   └── database.types.ts      # @repo/databaseから生成
└── middleware.ts              # 認証用Next.jsミドルウェア
```

### Webアプリ固有のルール

#### ルートグループとナビゲーション

- マーケティングページには `(public)` を使用 - SEOとコンバージョン向けに最適化
- 認証フローには `(auth)` を使用 - ソーシャルログインオプションを実装
- ユーザーダッシュボードには `(protected)` を使用 - 認証ミドルウェアを必須とする
- 保護されたエリアでのUX向上のため、パンくずリストナビゲーションを実装

#### マーケティングとSEO重視

- コンバージョン向けにランディングページを最適化（A/Bテスト対応）
- Next.jsメタデータAPIを使用して適切なメタタグを実装
- リッチスニペットのために構造化データを使用
- Core Web Vitals (LCP, FID, CLS) を最適化
- 適切なOpen GraphとTwitter Cardタグを実装

#### 認証フロー (02_frontend.mdcフォームルールを拡張)

- すべての認証フォームに React Hook Form + Zod を使用
- メール/パスワードおよびソーシャルプロバイダーによるSupabase Authを実装
- 適切な認証エラー処理とバリデーションフィードバックを作成
- TanStack Queryで認証状態の変更を処理
- メール確認とパスワードリセットフローを実装

#### サブスクリプションと請求

- 安全な支払い処理のためにStripe Elementsを統合
- プランのアップグレード/ダウングレードを含むサブスクリプション管理インターフェースを作成
- ダウンロード可能な請求書を含む請求履歴を実装
- サブスクリプション状態の変更に対するwebhookイベントを処理
- 支払い処理中のUX向上のため、楽観的更新（Optimistic Updates）を使用

#### パフォーマンス最適化

- すべての画像にNext.jsのImageコンポーネントを使用
- Suspenseバウンダリを使用して適切な読み込み状態を実装
- 可能な限り初期ページロードにサーバーコンポーネントを使用
- ルートレベルでのコード分割を実装
- 重いコンポーネントには動的インポートを使用してバンドルサイズを最適化
- パフォーマンス向上のため、React 19の改良された並行機能を活用
- Tailwind CSS v4の強化されたパフォーマンス最適化を活用
- **Next.js 16 の機能:**
  - 静的Server Component（ヘッダー、フッター、静的セクション）には `react` の `cache()` を使用
  - 動的コンテンツセクションをマークするには `next/cache` の `unstable_noStore()` を使用
  - `next.config.js` の `cacheComponents: true` で有効化されるPartial Prerendering (PPR) を活用
  - 最適な読み込み状態のためにPPRとSuspenseバウンダリを組み合わせる

#### モバイルファーストのレスポンシブデザイン

- Tailwind CSS v4のモバイルファーストブレークポイントシステムを使用
- すべてのフォームとインタラクションをモバイルデバイスでテスト
- タッチフレンドリーなナビゲーションとインタラクションを実装
- 適切なビューポート設定を確認
- 適切なテキストサイズとタッチターゲットを使用
- Tailwind v4の改良されたレスポンシブデザインユーティリティを活用

#### コンポーネントパターン (02_frontend.mdcを拡張)

- フロントエンドルールのSRP（単一責任の原則）とコンポジションパターンに従う
- すべてのサーバー状態管理にTanStack Queryを使用
- グローバルクライアント状態（認証、UI設定）にZustandを使用
- 機能レベルで適切なエラーバウンダリを実装
- コンポーネントライブラリの互換性のためにReact.forwardRefを使用
- React 19の強化された並行機能と自動バッチ処理を活用
- データ取得にReact 19の改良されたuse()フックを活用

#### フォーム処理 (02_frontend.mdcに従う)

- 常にReact Hook FormとZodバリデーションを使用
- コンポーネントコンポジションに従って再利用可能なフォームコンポーネントを作成
- 適切なエラー処理とユーザーフィードバックを実装
- マルチステップフロー（サブスクリプション登録）にフォーム進捗インジケーターを追加
- 適切な場合に楽観的更新を使用

### Web固有の命名規則

- ルートファイル: `kebab-case` （例：`forgot-password/page.tsx`）
- コンポーネント: `PascalCase` （例：`LoginForm.tsx`） - 02_frontend.mdcに従う
- フック: `camelCase` で接頭辞 `use` （例：`useAuth.ts`） - 02_frontend.mdcに従う
- ストアファイル: `camelCase` で接尾辞 `Store` （例：`authStore.ts`）
- クエリファイル: `camelCase` で接尾辞 `Queries` （例：`authQueries.ts`）

### 統合ノート

- このファイルは `02_frontend.mdc` と連携して動作します - コンポーネント設計ルールを複製しないでください
- Webアプリ固有のパターン（マーケティング、認証フロー、サブスクリプション管理）に焦点を当ててください
- すべての一般的なフロントエンドパターン（スタイリング、状態管理、フォーム）は `02_frontend.mdc` で処理されます
