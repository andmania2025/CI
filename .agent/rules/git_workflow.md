---
description: 
globs: 
alwaysApply: true
---
# Git ワークフロー

## ブランチ戦略

### メインブランチ

- **`main`**: 本番用コード（Production-ready）
- **`develop`**: 開発統合ブランチ

### 機能ブランチ

- **`feature/[feature-name]`**: 新機能
- **`bugfix/[bug-description]`**: バグ修正
- **`hotfix/[hotfix-description]`**: 重大な本番環境の修正

## ワークフロー手順

### 1. 新しい作業の開始

```bash
# developブランチに切り替え
git checkout develop
# 履歴をきれいにするためにrebaseを使用（git config pull.rebase true 推奨）
git pull origin develop --rebase

# 機能ブランチを作成
git checkout -b feature/user-authentication

# バグ修正の場合
git checkout -b bugfix/login-validation-error
```

### 2. 開発プロセス

```bash
# 変更を行い、頻繁にコミットする
git add .
git commit -m "feat: add user authentication logic"

# 定期的にリモートへプッシュ
git push origin feature/user-authentication
```

### 3. プルリクエスト前

```bash
# developの最新状態でブランチを更新
git checkout develop
git pull origin develop --rebase
git checkout feature/user-authentication
git rebase develop

# テストとチェックを実行
# Lefthookによりコミット時に自動でBiomeチェックなどが走りますが、手動でも確認可能です
pnpm exec lefthook run pre-commit

# 個別に実行する場合
pnpm exec biome check .
pnpm run type-check
pnpm run build

# 発見された問題を修正
```

### 4. プルリクエストプロセス

1. **PR作成**: 機能ブランチから `develop` へのプルリクエストを作成
2. **テンプレート記入**: 提供されたテンプレートを使用
3. **レビュー依頼**: レビュアーを割り当て
4. **フィードバック対応**: 要求された変更を実施
5. **マージ**: 承認後、スカッシュしてマージ (Squash and merge)

### 5. デプロイメント

```bash
# 機能がdevelopにマージされた後
git checkout main
git pull origin main --rebase
git merge develop
git push origin main

# リリースのタグ付け
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## コミットメッセージ規約

### フォーマット

```
<type>(<scope>): <description>

<body>

<footer>
```

### Types (種類)

- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメントのみの変更
- **style**: フォーマット、セミコロン忘れなど（コードの動作に影響しない変更）
- **refactor**: バグ修正や機能追加を含まないコードの変更
- **test**: テストの追加・対応
- **chore**: ビルドタスク、パッケージマネージャー設定の更新など

### 例

```bash
feat(auth): add user authentication with Supabase

- Implement login/logout functionality
- Add session management
- Create auth middleware for protected routes

Closes #123
```

```bash
fix(ui): resolve mobile responsive issues in navigation

- Fix hamburger menu not closing on mobile
- Adjust breakpoints for tablet view
- Improve touch targets for better accessibility

Fixes #456
```

## ベストプラクティス

### コミット

- アトミックなコミットを行う（1コミットにつき1つの論理的な変更）
- 明確で記述的なコミットメッセージを書く
- 開発中は頻繁にコミットする
- 壊れたコードをコミットしない
  - **Lefthook + Biome**: `pre-commit` フックにより、コミット時に自動的にリントと型チェックが実行され、品質の低いコードの混入を防ぎます。

### ブランチ分け

- 機能ブランチは短命に保つ
- コンフリクトを避けるため、定期的に develop とリベースする
- マージされた機能ブランチは削除する
- 分かりやすいブランチ名を使用する

### プルリクエスト

- PRは焦点を絞り、レビューしやすくする（400行未満を推奨）
- 新機能にはテストを含める
- 必要に応じてドキュメントを更新する
- UIの変更にはスクリーンショットを追加する

### コードレビュー

- 迅速にレビューする（1営業日以内）
- フィードバックは建設的かつ具体的に行う
- 必要に応じてローカルで変更をテストする
- 変更内容に自信がある場合のみ承認する

## 緊急ホットフィックス

```bash
# mainからホットフィックスを作成
git checkout main
git pull origin main --rebase
git checkout -b hotfix/critical-security-fix

# 最小限の変更を行う
# 徹底的にテストする
# コミットしてプッシュ

# mainとdevelopの両方にマージ
git checkout main
git merge hotfix/critical-security-fix
git push origin main

git checkout develop
git merge hotfix/critical-security-fix
git push origin develop

# ホットフィックスブランチを削除
git branch -d hotfix/critical-security-fix
git push origin --delete hotfix/critical-security-fix
```

## 便利なGitコマンド

```bash
# Rebase設定（推奨）
git config --global pull.rebase true

# 現在のステータスを確認
git status
git log --oneline -10

# 変更を元に戻す
git checkout -- filename  # ステージされていない変更を取り消す
git reset HEAD filename    # ファイルをステージから外す
git reset --soft HEAD~1    # 前回のコミットを取り消す（変更は保持）
git reset --hard HEAD~1    # 前回のコミットを取り消す（変更は破棄）

# クリーンアップ
git branch -d feature-name           # ローカルブランチを削除
git push origin --delete feature-name # リモートブランチを削除
git remote prune origin              # リモート追跡ブランチを整理

# インタラクティブリベース（PR前のコミット整理）
git rebase -i HEAD~3
```

## トラブルシューティング

### マージコンフリクト

```bash
# リベース/マージ中
git status  # コンフリクトしたファイルを確認
# ファイルを編集してコンフリクトを解消
git add .
git rebase --continue  # またはマージの場合は git commit
```

### 間違ったブランチにコミットした場合

```bash
# まだプッシュしていない場合
git reset --soft HEAD~1
git stash
git checkout correct-branch
git stash pop
git add .
git commit -m "your message"
```

### 機能ブランチを更新する必要がある場合

```bash
git checkout develop
git pull origin develop --rebase
git checkout feature-branch
git rebase develop
# コンフリクトがあれば解消
git push --force-with-lease origin feature-branch
```
