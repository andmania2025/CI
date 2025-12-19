---
trigger: always_on
description: モノレポのデプロイメントワークフローと環境設定
---

# デプロイメントワークフロー

## 環境概要

### 環境

| 環境 | 用途 | プラットフォーム |
|------|------|-----------------|
| **Development** | ローカル開発 | Docker / pnpm dev |
| **Preview** | PRプレビュー | Vercel Preview |
| **Production** | 本番 | Vercel Production |

### サービス構成

| サービス | 用途 |
|----------|------|
| **Frontend (Web)** | Vercel - ユーザー向けアプリ |
| **Frontend (Admin)** | Vercel - 管理画面 |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Storage** | Supabase Storage |

## デプロイ前チェックリスト

### コード品質

```bash
# Web アプリ
pnpm --filter web type-check
pnpm --filter web lint
pnpm --filter web test
pnpm --filter web build

# Admin アプリ
pnpm --filter admin type-check
pnpm --filter admin lint
pnpm --filter admin test
pnpm --filter admin build
```

### チェック項目

- [ ] TypeScriptエラーがないこと
- [ ] Lintエラーがないこと
- [ ] すべてのテストが通過すること
- [ ] ビルドが成功すること
- [ ] コンソールエラーがないこと

### データベース

- [ ] マイグレーションがローカルでテスト済み
- [ ] RLSポリシーが正しく設定されている
- [ ] シードデータが最新（該当する場合）

### 環境変数

- [ ] すべての必須環境変数が設定されている
- [ ] Vercelで各環境の変数が正しく設定されている

## 開発環境

### ローカル開発

```bash
# 両アプリを起動
pnpm --filter web dev &
pnpm --filter admin dev

# または Docker で起動
docker compose up -d
```

### ポート

| アプリ | ローカル | Docker |
|--------|----------|--------|
| Web | 3001 | 3000 |
| Admin | 3000 | 3006 |

## Preview デプロイ

### 自動デプロイ

- PRを作成すると自動的にPreviewデプロイが作成される
- Vercelが各アプリのプレビューURLを生成

### 確認事項

- [ ] Previewデプロイが正常に完了
- [ ] 基本的な機能が動作
- [ ] UIが正しく表示

## Production デプロイ

### 自動デプロイ（推奨）

```bash
# 1. developブランチで開発
git checkout develop
# ... 開発作業 ...

# 2. mainにマージ
git checkout main
git merge develop
git push origin main

# 3. Vercelが自動的にデプロイ
```

### 手動デプロイ

```bash
# Vercel CLIを使用
vercel --prod
```

## データベースマイグレーション

### 開発 → ステージング

```bash
# マイグレーション作成
pnpm exec prisma migrate dev --name descriptive_name

# ステージングに適用（Previewデプロイ時）
pnpm exec prisma migrate deploy
```

### ステージング → 本番

```bash
# 本番環境への適用
DATABASE_URL="$PRODUCTION_DATABASE_URL" pnpm exec prisma migrate deploy
```

### 注意事項

- 本番マイグレーションは慎重に実行
- 破壊的変更は段階的に行う
- バックアップを確認してから実行

## 環境変数

### 共通変数

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database
DATABASE_URL=
DIRECT_URL=
```

### Vercel設定手順

1. Vercelダッシュボードにアクセス
2. プロジェクトを選択
3. Settings > Environment Variables
4. 各環境（Production, Preview, Development）に変数を追加

## ロールバック

### クイックロールバック（Vercel）

1. Vercelダッシュボード → Deployments
2. 以前の正常なデプロイを選択
3. "Promote to Production" をクリック

### Git ロールバック

```bash
# 前のコミットに戻す
git revert HEAD
git push origin main

# 特定のコミットに戻す（危険）
git reset --hard <commit_hash>
git push --force origin main
```

### データベースロールバック

```bash
# 逆マイグレーションを作成
pnpm exec prisma migrate dev --name rollback_feature_name

# 開発環境でのみリセット可能
pnpm exec prisma migrate reset  # 全データ削除
```

## 監視

### デプロイ後の検証

- [ ] アプリケーションがエラーなく読み込まれる
- [ ] 認証が正しく機能する
- [ ] データベース接続が安定している
- [ ] 重要なユーザーフローが機能する

### 監視ツール

| ツール | 用途 |
|--------|------|
| Vercel Analytics | パフォーマンス、使用状況 |
| Supabase Dashboard | DB健全性、パフォーマンス |
| Sentry（任意） | エラー監視 |

## トラブルシューティング

### ビルド失敗

```bash
# ローカルでビルドを確認
pnpm --filter <app> build

# よくある原因
# - TypeScriptエラー
# - 環境変数の不足
# - 依存関係の問題
```

### データベース接続問題

```bash
# 接続テスト
pnpm exec prisma db pull

# 環境変数確認
echo $DATABASE_URL
```

### 緊急時対応

1. **即座にロールバック** - Vercelで前のデプロイに戻す
2. **関係者に通知**
3. **ホットフィックスブランチ作成** - `hotfix/issue-name`
4. **テスト後に再デプロイ**

## セキュリティ

### デプロイのセキュリティ

- リポジトリにシークレットをコミットしない
- 環境変数を使用する
- APIキーを定期的にローテーション
- 依存関係を最新に保つ

### データベースのセキュリティ

- コネクションプーリングを使用
- RLSポリシーを有効化
- 定期的なバックアップ確認