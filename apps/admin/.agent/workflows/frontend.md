---
description: フロントエンド開発のガイドライン、コンポーネント設計、パフォーマンス最適化
---

### コンポーネント設計とリファクタリングの哲学

1.  **単一責任の原則 (SRP):** 各コンポーネントは、変更する理由が1つだけでなければなりません。「神コンポーネント」（多くのことをやりすぎるコンポーネント）の作成は避けてください。
2.  **継承よりコンポジション:** シンプルで再利用可能なコンポーネントを組み合わせて複雑なUIを構築します。複雑な継承パターンよりも、コンポーネントの合成やプロパティ（`children`）の受け渡しを優先してください。
3.  **Prop Drilling vs コンテキスト/状態管理:**
    - 「Prop Drilling」（多くのコンポーネント層を通してプロパティを渡すこと）は避けてください。
    - プロパティが2〜3階層を超えて渡される場合は、コンポーネントの合成を使用するか、状態をリフトアップするか、グローバル状態マネージャー（Zustand）に状態を移動するシグナルと考えてください。
4.  **リファクタリングのガイドライン（3回のルール）:**
    - コードの一部を3回目にコピー＆ペーストしようとしたとき、それは再利用可能なコンポーネントまたはユーティリティ関数にリファクタリングすべきという強いシグナルです。
    - リファクタリングの際は、純粋でロジックのない「ダム（dumb）」コンポーネントを抽出し、状態とロジックを「スマート（smart）」コンテナコンポーネントに保持することを目指してください。

### ファイルとディレクトリ構造

- **コンポーネントの命名:** コンポーネントファイルとディレクトリは `PascalCase` にする必要があります（例: `src/components/ui/UserProfile.tsx`）。
- **ディレクトリ構成:**
  - `src/components/ui/`: 再利用可能で、ロジックを持たない、アプリケーションに依存しないUIプリミティブ（例: Button, Input, Card）。
  - `src/features/[feature-name]/components/`: UIプリミティブを調整する、機能固有の、ステートフルな複合コンポーネント。
  - `src/hooks/`: 再利用可能なカスタムReactフック。

### コンポーネント定義とProps

- **関数定義:** コンポーネントは常に `const` に割り当てられたアロー関数として定義してください。
- **エクスポート:** コンポーネントと関数には常に名前付きエクスポートを使用してください。デフォルトエクスポートは禁止です。
- **Propsインターフェース:** コンポーネントのPropsはそのパブリックAPIです。コンポーネント定義の直上でTypeScriptの `interface` または `type` を使用して、明確かつ予測可能に定義してください。

### スタイリング

- **ユーティリティファースト:** JSX内で直接Tailwind CSS v4ユーティリティクラスを常に使用してください。
- **カスタムCSSファイルなし:** 別の `.css` ファイルにカスタムCSSを書かないでください。
- **`global.css` の制限:** `global.css` は、ベーススタイル（`@layer base`）またはサードパーティライブラリのオーバーライドにのみ使用してください。
- **コンポーネントクラス:** 再利用可能なコンポーネントクラスが必要な場合は、`global.css` の `@layer components` 内で `@apply` を使用して定義してください。
- **条件付きスタイル:** 条件付きクラス適用には常に `clsx` ユーティリティを使用してください。バリアントには `cva` を使用してください。
- **Tailwind v4機能:** 改善されたCSS-in-JSサポートや強化されたパフォーマンス最適化など、新しいTailwind v4機能を活用してください。

### 状態管理

- **サーバー状態:** データの取得、キャッシュ、ミューテーションには常に **TanStack Query** を使用してください。クエリ関数はサーバーサイドロジック（例: Server Actions）を呼び出します。
- **グローバルクライアント状態:** 複数のページや深いコンポーネントツリーで共有されるクライアント状態には、常に **Zustand** を使用してください。
- **ローカル状態:** 単一のコンポーネントにローカルな状態には `useState` または `useReducer` を使用してください。

### フォーム

- **実装:** 常に **React Hook Form** を使用してください。
- **バリデーション:** クライアントとサーバーの両方でのスキーマベースのバリデーションには常に **Zod** を使用してください。

### パフォーマンス最適化

#### レンダリング戦略の優先順位

- **SSGをデフォルトにする**: 可能な限り静的サイト生成（Static Site Generation）を優先してください。
- **半動的コンテンツにはISRを使用**: 更新頻度の低いコンテンツにはインクリメンタル静的再生成（Incremental Static Regeneration）を実装してください。
- **ユーザー固有データにはSSRを限定**: 認証やリアルタイムデータが必要な場合にのみサーバーサイドレンダリング（Server-Side Rendering）を使用してください。
- **ビルド時に事前生成**: 最適なパフォーマンスのために、ビルド時の生成を最大化してください。
- **CDNキャッシュの活用**: SSGページは、グローバルパフォーマンスのためにCDNエッジキャッシュの恩恵を受けます。

#### パフォーマンスのためのReactフック

- **useCallback**: 以下の場合に、子コンポーネントにプロパティとして渡される関数に使用してください:
  - 関数が頻繁に変更されない安定した依存関係を持っている場合
  - 子コンポーネントが `React.memo` でラップされており、不必要な再レンダリングが発生する場合
  - 関数が他のフックの依存配列で使用されている場合
  - 例: イベントハンドラー、API呼び出し、複雑な計算

- **useMemo**: 以下の場合に、高価な計算やオブジェクト/配列の参照に使用してください:
  - 計算が計算量的に高価な場合（大きな配列のフィルタリング、複雑な計算）
  - メモ化されたコンポーネントにプロパティとして渡されるオブジェクトや配列を作成する場合
  - 依存関係が安定しており、レンダリングごとに変更されない場合
  - 例: フィルタリング/ソートされたデータ、派生状態、フォーマットされた値

#### useCallback/useMemoを使用すべきでない場合

- **過剰な最適化を避ける**: 単純な計算や頻繁に変更される依存関係には使用しないでください。
- **頻繁に変更される依存配列**: 依存関係がレンダリングごとに変更される場合、メモ化は利益をもたらしません。
- **単純な関数**: 基本的なイベントハンドラーや単純な計算の場合、オーバーヘッドが利益を上回る可能性があります。
- **時期尚早な最適化**: まずプロファイリングし、次に最適化してください - React DevTools Profilerを使用して実際のボトルネックを特定してください。

#### パフォーマンスのベストプラクティス

- 安定したPropsを受け取るコンポーネントには `React.memo` を使用してください。
- 適切な依存配列を実装してください - 依存関係が不足しているとバグの原因になります。
- レンダリング時の高価なオブジェクト/配列作成には `useMemo` の使用を検討してください。
- 他のフックの依存関係である関数には `useCallback` を使用してください。
- 最適化の前後にパフォーマンスをプロファイリングしてください。
- 複雑なメモ化戦略よりもコンポジションを優先してください。

#### Next.js 16 キャッシュ戦略

Next.js 16では、データ取得とコンポーネントレンダリングを最適化するための強力なキャッシュ機能が導入されています。

##### "use cache" ディレクティブ

安定したデータを返す関数やコンポーネントには `"use cache"` ディレクティブを使用してください:

```typescript
// データ取得関数でのキャッシュ
export async function getProductList() {
  "use cache";
  const res = await fetch("https://api.example.com/products");
  return res.json();
}

// サーバーコンポーネントでのキャッシュ
export default async function ProductList() {
  "use cache";
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
```

**"use cache" を使用すべき場合:**
- 静的または半静的なデータ（商品カタログ、ブログ記事、ユーザープロフィール）
- 更新頻度の低いデータ（毎時、毎日、または毎週）
- 高価な計算やAPI呼び出し
- リアルタイム更新を必要としないデータ

**"use cache" を使用すべきでない場合:**
- 頻繁に変更されるユーザー固有のデータ
- リアルタイムデータ（チャットメッセージ、通知）
- 即時の整合性を必要とするデータ
- ユーザーごとに異なる認証依存データ

##### React cache() 関数

単一のリクエスト内で関数呼び出しをメモ化するには、Reactの `cache()` 関数を使用してください:

```typescript
import { cache } from "react";

// 同じリクエスト内で複数回呼ばれても1回だけ実行される
const getUserData = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
});

// 使用例
export default async function UserProfile({ userId }: { userId: string }) {
  // 同じuserIdで複数回呼ばれても、1回だけDBクエリが実行される
  const user = await getUserData(userId);
  const userPosts = await getUserPosts(userId); // 別の関数
  return <Profile user={user} posts={userPosts} />;
}
```

##### データ取得のための unstable_cache

タグと再検証によるきめ細かいキャッシュ制御には `unstable_cache` を使用してください:

```typescript
import { unstable_cache } from "next/cache";

// タグ付きキャッシュ（特定のタグで再検証可能）
export const getCachedProducts = unstable_cache(
  async (category: string) => {
    return prisma.product.findMany({
      where: { category },
    });
  },
  ["products"], // キャッシュキーの一部
  {
    tags: ["products", "catalog"], // 再検証用タグ
    revalidate: 3600, // 1時間で自動再検証
  }
);

// タグで再検証
import { revalidateTag } from "next/cache";

export async function updateProduct(productId: string, data: ProductData) {
  await prisma.product.update({
    where: { id: productId },
    data,
  });
  // 商品更新時にキャッシュを無効化
  revalidateTag("products");
}
```

##### キャッシュ再検証戦略

```typescript
import { revalidatePath, revalidateTag } from "next/cache";

// パスベースの再検証（特定のページを再生成）
export async function createPost(data: PostData) {
  await prisma.post.create({ data });
  revalidatePath("/blog"); // /blogページを再生成
  revalidatePath("/blog/[slug]", "page"); // 動的ルート
}

// タグベースの再検証（関連するすべてのキャッシュを無効化）
export async function updateUser(userId: string, data: UserData) {
  await prisma.user.update({ where: { id: userId }, data });
  revalidateTag("users"); // "users"タグのすべてのキャッシュを無効化
  revalidateTag(`user-${userId}`); // 特定ユーザーのキャッシュを無効化
}

// 時間ベースの再検証（ISR）
export const revalidate = 3600; // 1時間ごとに再生成
```

##### キャッシュ戦略ガイドライン

1. **静的コンテンツ**: ほとんど変更されないコンテンツには `"use cache"` を使用してください。
2. **半動的コンテンツ**: 定期的に更新されるコンテンツには `unstable_cache` と `revalidate` を使用してください。
3. **ユーザー固有データ**: キャッシュを避けるか、ユーザー固有のキャッシュキーで短いTTLを使用してください。
4. **リアルタイムデータ**: キャッシュしないでください。Server ActionsまたはAPIルートを使用してください。
5. **データベースクエリ**: 単一リクエスト内でのクエリ重複排除には `cache()` を使用してください。
6. **APIレスポンス**: 外部API呼び出しには `"use cache"` または `unstable_cache` を使用してください。

##### キャッシュタグ命名規則

```typescript
// 推奨されるタグ命名規則
const cacheTags = {
  // エンティティベース
  users: "users",
  user: (id: string) => `user-${id}`,
  products: "products",
  product: (id: string) => `product-${id}`,
  
  // 機能ベース
  dashboard: "dashboard",
  analytics: "analytics",
  
  // 階層的タグ
  catalog: "catalog",
  catalogCategory: (category: string) => `catalog-${category}`,
};
```

##### 例: 最適化されたデータ取得パターン

```typescript
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

// リクエスト内での重複を防ぐ
const getCachedUser = cache(async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId } });
});

// 長時間キャッシュ（1時間）
const getCachedProducts = unstable_cache(
  async () => {
    return prisma.product.findMany();
  },
  ["products"],
  {
    tags: ["products"],
    revalidate: 3600,
  }
);

// 使用例
export default async function ProductPage({ userId }: { userId: string }) {
  // 同じリクエスト内で複数回呼ばれても1回だけ実行
  const user = await getCachedUser(userId);
  
  // キャッシュされた商品リスト（1時間有効）
  const products = await getCachedProducts();
  
  return <ProductList user={user} products={products} />;
}

// 商品更新時の再検証
export async function updateProduct(id: string, data: ProductData) {
  await prisma.product.update({ where: { id }, data });
  revalidateTag("products"); // キャッシュを無効化
}
```

### アクセシビリティ (a11y)

- すべてのインタラクティブな要素が完全にアクセス可能であることを確認してください。セマンティックHTMLを使用し、必要に応じてARIA属性（`aria-label`、`role`など）を追加してください。
- インタラクティブな非ボタン要素（`onClick`を持つ `div` や `span` など）には、`role="button"` と `tabIndex={0}` を設定する必要があります。
