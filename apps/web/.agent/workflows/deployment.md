---
description: 
globs: 
alwaysApply: true
---
# デプロイメントワークフロー

## 環境概要

### 環境

- **Development**: ローカル開発環境
- **Staging**: プレプロダクションテスト (Vercel プレビューデプロイ)
- **Production**: 本番アプリケーション (Vercel 本番環境)

### サービス

- **Frontend**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

### 重要事項: 将来の統合について

**将来の統合について**:
- このプロジェクト（front）は将来的にback（管理画面）と統合され、単一のVercelプロジェクトとしてデプロイされます
- 統合時にはback側のVercel設定（`vercel.json`）やGitHub Actionsワークフローを使用します
- 現段階ではfront側にVercel設定ファイルやGitHub Actionsは不要です
- 統合前はVercelのGitHub連携による自動デプロイのみを使用します

## デプロイメントプロセス

### 1. デプロイ前チェックリスト

#### コード品質

- [ ] すべてのテストが通過すること (`pnpm run test`)
- [ ] Lintエラーがないこと (`pnpm run lint`)
- [ ] TypeScriptのコンパイルが成功すること (`pnpm run type-check`)
- [ ] ビルドが成功すること (`pnpm run build`)
- [ ] 開発環境でコンソールエラーがないこと

#### データベース

- [ ] スキーママイグレーションがローカルでテストされていること
- [ ] Prismaスキーマが最新であること
- [ ] シードデータが最新であること（該当する場合）
- [ ] RLSポリシーが正しく設定されていること

#### 環境変数

- [ ] すべての必須環境変数が設定されていること
- [ ] シークレットがVercelで正しく設定されていること
- [ ] Supabase接続文字列が正しいこと

### 2. 開発環境のデプロイ

```bash
# ローカル開発
pnpm run dev

# ローカルビルドの確認
pnpm run build
pnpm start

# テストの実行
pnpm run test
pnpm run test:e2e

# Docker開発（オプション、ローカル開発のみ）
docker-compose up
# http://localhost:3001 でアクセス
```

**注**: 本番デプロイにはVercelを使用します。Dockerはローカル開発専用です。

### 3. ステージング環境のデプロイ

#### 自動ステージング（プレビューデプロイ）

- 任意のブランチへのプッシュで自動的にプレビューデプロイが作成されます
- Vercelがテスト用のユニークなURLを生成します
- データベースは通常、ステージング/開発用のSupabaseプロジェクトを指します

#### 手動ステージング

```bash
# Vercelステージングへのデプロイ
vercel --env staging

# またはGitHub連携を使用
# developブランチへのプッシュがステージングデプロイをトリガーします
```

### 4. 本番環境のデプロイ

#### 自動本番デプロイ（推奨）

```bash
# 1. mainブランチへのマージ
git checkout main
git merge develop
git push origin main

# 2. Vercelがmainブランチから自動的にデプロイ
# 3. Vercelダッシュボードでデプロイを監視
```

#### 手動本番デプロイ

```bash
# 本番環境へのデプロイ
vercel --prod

# リリースのタグ付け
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## データベースマイグレーション戦略

### 開発からステージングへ

```bash
# マイグレーションの生成
npx prisma migrate dev --name feature_description

# ステージングデータベースへの適用
npx prisma migrate deploy
```

### ステージングから本番へ

```bash
# ステージングでのマイグレーションテストを確認
# 本番環境への適用（通常はCI/CD経由）
npx prisma migrate deploy

# 必要に応じて手動実行
DATABASE_URL="production_url" npx prisma migrate deploy
```

## 環境変数

### 必須変数

#### Next.js

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Supabase

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Database

```env
DATABASE_URL=your_postgres_connection_string
DIRECT_URL=your_direct_postgres_connection_string
```

### Vercel設定

1. Vercelダッシュボードに移動
2. プロジェクトを選択
3. Settings > Environment Variables に移動
4. 各環境（Production, Preview, Development）に変数を追加

## ロールバック戦略

### クイックロールバック (Vercel)

1. Vercelダッシュボードに移動
2. Deployments に移動
3. 以前の正常なデプロイを見つける
4. "Promote to Production" をクリック

### Gitロールバック

```bash
# 前のコミットに戻す
git checkout main
git revert HEAD
git push origin main

# または特定のコミットにリセット（危険）
git reset --hard <previous_commit_hash>
git push --force origin main
```

### データベースロールバック

```bash
# マイグレーションをロールバックする必要がある場合
npx prisma migrate reset  # 開発環境のみ！

# 本番環境の場合、逆マイグレーションを作成
npx prisma migrate dev --name rollback_feature_name
```

## 監視とヘルスチェック

### デプロイ後の検証

- [ ] アプリケーションがエラーなく読み込まれること
- [ ] 認証が正しく機能すること
- [ ] データベース接続が安定していること
- [ ] すべての重要なユーザーフローが機能すること
- [ ] パフォーマンスメトリクスが許容範囲内であること

### 監視ツール

- **Vercel Analytics**: パフォーマンスと使用状況のメトリクス
- **Supabase Dashboard**: データベースの健全性とパフォーマンス
- **Error Tracking**: エラー監視の設定（Sentryなど）
- **Uptime Monitoring**: 外部監視サービス

## トラブルシューティング

### 一般的なデプロイの問題

#### ビルド失敗

```bash
# Vercelダッシュボードでビルドログを確認
# 一般的な原因:
# - TypeScriptエラー
# - 環境変数の不足
# - インポート/エクスポートの問題
# - パッケージ依存関係
```

#### データベース接続の問題

```bash
# 環境変数の確認
echo $DATABASE_URL

# 接続テスト
npx prisma db pull

# Supabaseダッシュボードで接続制限を確認
```

#### 認証の問題

```bash
# Supabaseキーの確認
# SupabaseダッシュボードでリダイレクトURLを確認
# CORS設定が正しいことを確認
```

### 緊急時の手順

#### 完全なロールバック

1. 直前のVercelデプロイに即座にロールバック
2. 関係者に問題を通知
3. 必要に応じてホットフィックスブランチを作成
4. 再デプロイ前に徹底的にテスト

#### データベースの緊急事態

1. Supabaseダッシュボードで問題を確認
2. 最近のマイグレーションを確認
3. 必要に応じて読み取り専用モードを検討
4. インフラの問題であればSupabaseサポートに連絡

## CI/CD パイプライン

### 現在のセットアップ（統合前）

- **Vercel GitHub Integration**: GitHubからの自動デプロイ
- `main` ブランチへのプッシュで本番デプロイをトリガー
- 他のブランチへのプッシュでプレビューデプロイを作成
- 現段階ではカスタムGitHub Actionsワークフローは不要

### 将来のセットアップ（Backとの統合後）

統合後はback側のGitHub Actionsワークフローを使用します。back側に以下のような設定が存在する場合、front側では追加の設定は不要です：

- Vercelデプロイメントワークフロー
- CI/CDパイプライン
- ビルドとテストの自動化

### GitHub Actions 例（参考のみ）

以下の例は統合前の参考用です。統合後はback側のワークフローを使用してください：

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run tests
        run: pnpm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## セキュリティ考慮事項

### デプロイのセキュリティ

- リポジトリにシークレットをコミットしない
- すべての機密データに環境変数を使用する
- APIキーとトークンを定期的にローテーションする
- 不正アクセスを監視する
- 依存関係を最新の状態に保つ

### データベースのセキュリティ

- コネクションプーリングを使用する
- RLSポリシーを有効にする
- 定期的なセキュリティ監査を実施する
- バックアップ戦略を整備する
- 異常なアクティビティを監視する
