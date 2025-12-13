---
trigger: always_on
---

---
description: 
globs: 
alwaysApply: true
---
# リファクタリングプロンプト
## リファクタリングの目標
### 1. コード整理
- 3のルールに従って再利用可能なコンポーネントを抽出する
- プレゼンテーションとビジネスロジックの関心を分離する
- 共有ロジックをカスタムフックに移動する
- 適宜、機能単位でコードを整理する
### 2. パフォーマンス最適化
- 不要な再レンダリングを特定し修正する
- useMemo/useCallbackで重い計算を最適化する
- 適切なレイジーローディングを実装する
- データベースクエリを最適化しN+1問題を減らす
### 3. 保守性
- コードの重複を減らす
- 命名とドキュメントを改善する
- 複雑なロジックを簡素化する
- デッドコードと未使用のインポートを削除する
### 4. 型安全性
- TypeScriptの型を強化する
- any型を削除し型推論を改善する
- 適切なエラーバウンダリを追加する
- Zodスキーマでデータをバリデーションする
## リファクタリングプロセス
### リファクタリング前
1. **現在のコードを理解**: コードが何をしているのか、なぜそうしているのかを分析
2. **ペインポイントを特定**: コードスメルや困難な箇所を探す
3. **変更を計画**: リファクタリング手順の概要を作成
4. **テストカバレッジを確保**: テストがなければ作成する
### リファクタリング中
1. **小さな増分変更を行う**: 小さなステップでリファクタリング
2. **機能を維持**: 意図しない限り動作を変更しない
3. **頻繁にテスト**: 各変更後にテストを実行
4. **頻繁にコミット**: 各論理的変更ごとにアトミックなコミットを作成
### リファクタリング後
1. **すべてのテストがパスすることを確認**: 何も壊れていないことを確認
2. **ドキュメントを更新**: アーキテクチャの変更を反映
3. **パフォーマンスを確認**: 改善が達成されたことを確認
4. **チームレビューを受ける**: 他のメンバーに変更をレビューしてもらう
## 一般的なリファクタリングパターン
### コンポーネント抽出
```typescript
// 変更前: 複数のことを行う大きなコンポーネント
const UserDashboard = () => {
  // 100行以上の混在した関心事
};
// 変更後: 抽出された小さなコンポーネント
const UserDashboard = () => {
  return (
    <div>
      <UserProfile />
      <UserStats />
      <UserActions />
    </div>
  );
};
カスタムフック抽出
// 変更前: コンポーネント内に散らばったロジック
const [data, setData] = useState();
const [loading, setLoading] = useState(false);
// ... フェッチロジック
// 変更後: カスタムフックに抽出
const { data, loading, error } = useUserData(userId);
Server Actionの最適化
// 変更前: 複数のデータベース呼び出し
const getUserWithPosts = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const posts = await prisma.post.findMany({ where: { userId } });
  return { user, posts };
};
// 変更後: 単一の最適化されたクエリ
const getUserWithPosts = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });
};