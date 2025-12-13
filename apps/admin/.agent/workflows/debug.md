---
description: デバッグアプローチ、一般的なシナリオ、ツール、エラーパターンと解決策
---

# デバッグプロンプト

## デバッグアプローチ

### 1. 問題の特定

- 期待される動作は何か？
- 実際の動作は何か？
- この問題はいつ最初に現れたか？
- 問題を一貫して再現できるか？

### 2. 情報収集

- ブラウザコンソールでエラーを確認する
- DevTools でネットワークリクエストを確認する
- 該当する場合はデータベースログを調べる
- 最近のコード変更を探す

### 3. 体系的な調査

- 最も可能性の高い原因から始める
- デバッグツールを効果的に使用する
- 仮説を一つずつテストする
- 調査結果を記録する

## 一般的なデバッグシナリオ

### フロントエンドの問題

#### React コンポーネントの問題

- **Props が更新されない**: 親コンポーネントの再レンダリングを確認する
- **State が更新されない**: useState/useEffect の依存関係を確認する
- **無限再レンダリング**: 欠落している依存配列を探す
- **コンポーネントがマウントされない**: 条件付きレンダリングロジックを確認する

#### スタイリングの問題

- **Tailwind クラスが適用されない**: タイプミス、競合するクラスを確認する
- **レイアウトが崩れている**: CSS Grid/Flexbox プロパティを検査する
- **レスポンシブの問題**: 異なるブレークポイントをテストする

#### 状態管理の問題

- **TanStack Query**: クエリキー、ステール時間、キャッシュ無効化を確認する
- **Zustand**: ストアの更新とサブスクリプションを確認する
- **フォーム状態**: React Hook Form のバリデーションと送信をデバッグする

### バックエンドの問題

#### Server Actions

- **認証エラー**: Supabase セッション検証を確認する
- **データベースエラー**: Prisma クエリと制約を確認する
- **バリデーションエラー**: Zod スキーマが入力データと一致することを確認する

#### API ルート

- **CORS の問題**: Next.js API 設定を確認する
- **リクエスト/レスポンス形式**: JSON 構造を確認する
- **レート制限**: リクエスト過多を確認する

#### データベースの問題

- **接続の問題**: Supabase 接続文字列を確認する
- **クエリパフォーマンス**: 遅いクエリには EXPLAIN ANALYZE を使用する
- **マイグレーションの問題**: Prisma マイグレーションステータスを確認する

## デバッグツール

### ブラウザ DevTools

```javascript
// コンソールデバッグ
console.log("Debug point:", { variable, state });
console.table(arrayData);
console.trace("Function call stack");

// パフォーマンスデバッグ
console.time("operation");
// ... 計測するコード
console.timeEnd("operation");
```

### React DevTools

- コンポーネントツリーの検査
- Props と State の可視化
- パフォーマンス分析のためのプロファイラー

### データベースデバッグ

```sql
-- クエリパフォーマンスの確認
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- アクティブな接続の確認
SELECT * FROM pg_stat_activity;
```

### ネットワークデバッグ

- DevTools のネットワークタブ
- レスポンス/リクエストヘッダー
- タイミング情報

## デバッグチェックリスト

### 開始前

- [ ] 問題を確実に再現する
- [ ] エラーメッセージを正確にメモする
- [ ] 最近のコード変更を確認する
- [ ] 環境設定を確認する

### デバッグ中

- [ ] 適切なデバッグツールを使用する
- [ ] 一度に一つの仮説をテストする
- [ ] 調査結果を記録する
- [ ] エラーのスクリーンショット/ログを取る

### 一般的な修正

- [ ] ブラウザのキャッシュと localStorage をクリアする
- [ ] 開発サーバーを再起動する
- [ ] 環境変数を確認する
- [ ] 依存関係のバージョンを確認する
- [ ] 最近の Git コミットを確認する
- [ ] データベース接続を確認する
- [ ] API エンドポイントを検証する
- [ ] 異なるブラウザでテストする

### 修正後

- [ ] 修正が一貫して機能することを確認する
- [ ] 回帰を防ぐためにテストを追加する
- [ ] 解決策を文書化する
- [ ] 同様の問題が他の場所に存在するかどうかを検討する

## エラーパターンと解決策

### "Cannot read property of undefined"

```typescript
// 問題: データ読み込み前にプロパティにアクセスしている
user.name; // user が undefined の場合にエラー

// 解決策: オプショナルチェーンとローディング状態
user?.name;
{
  loading ? <Spinner /> : <UserProfile user={user} />;
}
```

### "Hydration Mismatch"

```typescript
// 問題: サーバーとクライアントでレンダリングが異なる
const timestamp = new Date().toISOString(); // サーバー/クライアントで異なる

// 解決策: クライアント専用コードに useEffect を使用する
const [timestamp, setTimestamp] = useState("");
useEffect(() => {
  setTimestamp(new Date().toISOString());
}, []);

// Next.js 16: Radix UI コンポーネントが動的 ID によりハイドレーションエラーを引き起こす可能性がある
// 解決策: Radix UI ルートコンポーネントに suppressHydrationWarning を追加する
<MenubarPrimitive.Root suppressHydrationWarning {...props} />
```

### "Failed to fetch"

```typescript
// 問題: ネットワークリクエストが失敗する
fetch("/api/users"); // CORS、ネットワークなどで失敗する可能性がある

// 解決策: 適切なエラーハンドリング
try {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  const users = await response.json();
} catch (error) {
  console.error("Error fetching users:", error);
  // エラーを適切に処理する
}
```
