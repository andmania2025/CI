---
description: 
globs: 
alwaysApply: true
---
# デバッグプロンプト

## デバッグアプローチ

### 1. 問題の特定

- 期待される動作は何か？
- 実際の動作は何か？
- この問題はいつ初めて発生したか？
- 問題を一貫して再現できるか？

### 2. 情報収集

- ブラウザコンソールでエラーを確認
- DevToolsでネットワークリクエストを確認
- 該当する場合はデータベースログを確認
- 最近のコード変更を確認

### 3. 体系的な調査

- 最も可能性の高い原因から始める
- デバッグツールを効果的に使用する
- 仮説を一つずつテストする
- 発見事項を進行中に記録する

## 一般的なデバッグシナリオ

### フロントエンドの問題

#### Reactコンポーネントの問題

- **Propsが更新されない**: 親コンポーネントの再レンダリングを確認
- **Stateが更新されない**: useState/useEffectの依存関係を確認
- **無限再レンダリング**: 依存関係配列の欠落を確認
- **コンポーネントがマウントされない**: 条件付きレンダリングロジックを確認

#### スタイリングの問題

- **Tailwindクラスが適用されない**: タイプミス、競合するクラスを確認
- **レイアウトが崩れている**: CSS Grid/Flexboxプロパティを検査
- **レスポンシブの問題**: 異なるブレークポイントでテスト

#### 状態管理の問題

- **TanStack Query**: クエリキー、staleTime、キャッシュ無効化を確認
- **Zustand**: ストアの更新とサブスクリプションを確認
- **フォーム状態**: React Hook Formのバリデーションと送信をデバッグ

### バックエンドの問題

#### Server Actions

- **認証エラー**: Supabaseセッションのバリデーションを確認
- **データベースエラー**: Prismaクエリと制約を確認
- **バリデーションエラー**: Zodスキーマが入力データと一致することを確認

#### APIルート

- **CORSの問題**: Next.js API設定を確認
- **リクエスト/レスポンス形式**: JSON構造を確認
- **レート制限**: リクエスト過多を確認

#### データベースの問題

- **接続の問題**: Supabase接続文字列を確認
- **クエリパフォーマンス**: 遅いクエリにはEXPLAIN ANALYZEを使用
- **マイグレーションの問題**: Prismaマイグレーション状態を確認

## デバッグツール

### ブラウザDevTools

\`\`\`javascript
// コンソールデバッグ
console.log("デバッグポイント:", { variable, state });
console.table(arrayData);
console.trace("関数呼び出しスタック");

// パフォーマンスデバッグ
console.time("操作");
// ... 計測するコード
console.timeEnd("操作");
\`\`\`

### React DevTools

- コンポーネントツリーの検査
- PropsとStateの可視化
- パフォーマンス分析用プロファイラー

### データベースデバッグ

\`\`\`sql
-- クエリパフォーマンスの確認
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- アクティブな接続の確認
SELECT * FROM pg_stat_activity;
\`\`\`

### ネットワークデバッグ

- DevToolsのNetworkタブ
- レスポンス/リクエストヘッダー
- タイミング情報

## デバッグチェックリスト

### 開始前

- [ ] 問題を確実に再現できる
- [ ] エラーメッセージを正確にメモする
- [ ] 最近のコード変更を確認
- [ ] 環境設定を確認

### デバッグ中

- [ ] 適切なデバッグツールを使用
- [ ] 一度に一つの仮説をテスト
- [ ] 発見事項を記録
- [ ] エラーのスクリーンショット/ログを取得

### 一般的な修正方法

- [ ] ブラウザキャッシュとlocalStorageをクリア
- [ ] 開発サーバーを再起動
- [ ] 環境変数を確認
- [ ] 依存関係のバージョンを確認
- [ ] 最近のGitコミットを確認
- [ ] データベース接続を確認
- [ ] APIエンドポイントを検証
- [ ] 異なるブラウザでテスト

### 修正後

- [ ] 修正が一貫して機能することを確認
- [ ] リグレッション防止のためテストを追加
- [ ] 解決策を文書化
- [ ] 同様の問題が他にないか検討

## エラーパターンと解決策

### "Cannot read property of undefined"

\`\`\`typescript
// 問題: データ読み込み前にプロパティにアクセス
user.name; // userがundefinedの場合エラー

// 解決策: オプショナルチェーンとローディング状態
user?.name;
{loading ? <Spinner /> : <UserProfile user={user} />}
\`\`\`

### "Hydration Mismatch"

\`\`\`typescript
// 問題: サーバーとクライアントのレンダリングが異なる
const timestamp = new Date().toISOString(); // サーバー/クライアントで異なる

// 解決策: クライアント専用コードにはuseEffectを使用
const [timestamp, setTimestamp] = useState("");
useEffect(() => {
  setTimestamp(new Date().toISOString());
}, []);
\`\`\`

### "Failed to fetch"

\`\`\`typescript
// 問題: ネットワークリクエストが失敗
fetch("/api/users"); // CORS、ネットワーク等で失敗する可能性

// 解決策: 適切なエラーハンドリング
try {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("ユーザー取得に失敗しました");
  const users = await response.json();
} catch (error) {
  console.error("ユーザー取得エラー:", error);
  // エラーを適切に処理
}
\`\`\`
