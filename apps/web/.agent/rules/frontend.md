---
description:
globs:
alwaysApply: true
---

### コンポーネント設計とリファクタリングの哲学

1.  **単一責任の原則 (SRP):** 各コンポーネントは、変更する理由が1つだけでなければなりません。あまりにも多くのことを行う「神コンポーネント」の作成は避けてください。
2.  **継承よりコンポジション:** シンプルで再利用可能なコンポーネントを組み合わせて複雑なUIを構築します。複雑な継承パターンよりも、コンポーネントの合成とprops（`children`）の受け渡しを優先してください。
3.  **Prop Drilling vs コンテキスト/状態管理:**
    - 「Prop Drilling」（多くのコンポーネント層を通してpropsを渡すこと）は避けてください。
    - Propが2〜3レベルを超えて渡される場合は、コンポーネントの合成を使用するか、状態を引き上げるか、グローバル状態マネージャー（Zustand）に状態を移動させる合図と考えてください。
4.  **リファクタリングの指針（3のルール）:**
    - コードの一部を3回目にコピー＆ペーストしていることに気づいたら、それは再利用可能なコンポーネントまたはユーティリティ関数にリファクタリングすべきという強いシグナルです。
    - リファクタリングの際は、純粋でロジックのない「dumb」コンポーネントを抽出し、状態とロジックを「smart」なコンテナコンポーネントに保つことを目指してください。

### ファイルとディレクトリ構造

- **コンポーネントの命名:** コンポーネントのファイルとディレクトリは `PascalCase` にする必要があります（例：`src/components/ui/UserProfile.tsx`）。
- **ディレクトリ構成:**
  - `src/components/ui/`: 再利用可能でロジックを持たない、アプリケーションに依存しないUIプリミティブ（例：Button, Input, Card）。
  - `src/features/[feature-name]/components/`: 機能固有で、状態を持ち、UIプリミティブを調整する複合コンポーネント。
  - `src/hooks/`: 再利用可能なカスタムReactフック。

### コンポーネント定義とProps

- **関数定義:** コンポーネントは常に `const` に割り当てられたアロー関数として定義してください。
- **エクスポート:** コンポーネントと関数には常に名前付きエクスポート（Named Exports）を使用してください。デフォルトエクスポート（Default Exports）は禁止です。
- **Propsインターフェース:** コンポーネントのpropsはその公開APIです。コンポーネント定義の直上でTypeScriptの `interface` または `type` を使用して、明確かつ予測可能に定義してください。

### スタイリング

- **ユーティリティファースト:** JSX内で直接Tailwind CSS v4のユーティリティクラスを常に使用してください。
- **カスタムCSSファイルなし:** 別の `.css` ファイルにカスタムCSSを書かないでください。
- **`global.css` の制限:** `global.css` は、ベーススタイル（`@layer base`）またはサードパーティライブラリの上書きにのみ使用してください。
- **コンポーネントクラス:** 再利用可能なコンポーネントクラスが必要な場合は、`global.css` の `@layer components` 内で `@apply` を使用して定義してください。
- **条件付きスタイル:** 条件付きクラスの適用には常に `clsx` ユーティリティを使用してください。バリエーション（variants）には `cva` を使用してください。
- **Tailwind v4の機能:** 改善されたCSS-in-JSサポートや強化されたパフォーマンス最適化など、新しいTailwind v4の機能を活用してください。

### 状態管理

- **サーバー状態:** データのフェッチ、キャッシュ、ミューテーションには常に **TanStack Query** を使用してください。クエリ関数は、サーバーサイドロジック（例：Server Actions）を呼び出します。
- **グローバルクライアント状態:** 複数のページや深いコンポーネントツリーで共有されるクライアント状態には、常に **Zustand** を使用してください。
- **ローカル状態:** 単一のコンポーネントにローカルな状態には、`useState` または `useReducer` を使用してください。

### フォーム

- **実装:** 常に **React Hook Form** を使用してください。
- **バリデーション:** クライアントとサーバーの両方でのスキーマベースのバリデーションには、常に **Zod** を使用してください。

### アクセシビリティ (a11y)

- すべてのインタラクティブな要素が完全にアクセス可能であることを確認してください。セマンティックHTMLを使用し、必要に応じてARIA属性（`aria-label`, `role` など）を追加してください。
- ボタン以外のインタラクティブな要素（`onClick` を持つ `div` や `span` など）には、`role="button"` と `tabIndex={0}` を設定する必要があります。

### Next.js 16 パフォーマンス最適化

#### Cache Components

Next.js 16のキャッシュメカニズムは、主に以下の3種類に分類されます。それぞれの特性を理解し、適切に使い分けることが重要です。

1.  **Request Memoization (React Cache)**
    - **概要:** 同一リクエスト内での重複したデータ取得を排除します。
    - **使用法:** `react` の `cache` 関数を使用します。
    - **適用:** データ取得関数（fetchやDBクエリなど）をラップします。
    - **スコープ:** リクエスト単位（リクエスト終了後に破棄）。
    - **例:**
      ```typescript
      import { cache } from "react";
      import { db } from "@/lib/db";

      export const getUser = cache(async (id: string) => {
        return await db.user.findUnique({ where: { id } });
      });
      ```

2.  **Data Cache (Next.js Cache)**
    - **概要:** サーバーリクエストやデプロイを跨いでデータを永続化します。
    - **使用法:** `fetch` オプションの `next: { revalidate: ... }` または `unstable_cache` を使用します。
    - **適用:** 外部APIコールやDBクエリの結果をキャッシュします。
    - **スコープ:** 永続的（手動または時間経過で再検証）。
    - **例:**
      ```typescript
      // fetchの場合
      fetch('https://...', { next: { revalidate: 3600 } });

      // DBクエリの場合 (unstable_cache)
      import { unstable_cache } from "next/cache";
      const getCachedUser = unstable_cache(
        async (id) => db.user.findUnique({ where: { id } }),
        ['user-cache'],
        { revalidate: 3600 }
      );
      ```

3.  **Full Route Cache**
    - **概要:** ビルド時または再検証時に、ルート全体のHTMLとRSCペイロードをキャッシュします。
    - **使用法:** デフォルトで有効（動的関数や動的データ取得がない場合）。
    - **適用:** 静的なページ全体。
    - **無効化:** `dynamic = 'force-dynamic'` や `noStore()` の使用、動的データ取得によりオプトアウトされます。

#### Partial Prerendering (PPR)

- PPRは `next.config.js` の `cacheComponents: true` で有効化されます。
- 動的なセクションをマークするには `next/cache` の `unstable_noStore()` を使用します。
- 静的な部分はプリレンダリングされ、動的な部分はストリーミングされます。
- 例:
  ```typescript
  import { unstable_noStore } from "next/cache";
  
  export const DynamicComponent = () => {
    unstable_noStore(); // 動的としてマーク
    // ここに動的コンテンツ
  };
  ```

#### ベストプラクティス

- 静的なServer Component（ヘッダー、フッター、静的セクション）に `cache()` を適用します。
- 動的データをフェッチするコンポーネントには `unstable_noStore()` を使用します。
- 最適な読み込み状態のために、PPRとSuspenseバウンダリを組み合わせます。
- パフォーマンス向上のために、React 19の強化された並行機能を活用します。