# 開発環境設定ガイド

## ツールスタック

| ツール | バージョン | 用途 |
|--------|------------|------|
| **bun** | >=1.3.x | パッケージマネージャー、ランタイム |
| **biome** | ^1.9.4 | リンター、フォーマッター |
| **lefthook** | ^2.0.12 | Git hooks 管理 |

## 環境別設定

### WSL 環境（メイン開発環境）

WSL は以下の作業を行うメイン環境です：
- コードの編集
- Git 操作（commit, push, pull）
- lint, format, type-check の実行
- テストの実行

#### 必須セットアップ

```bash
# 1. bun のインストール（未インストールの場合）
curl -fsSL https://bun.sh/install | bash

# 2. 依存関係のインストール
bun install

# 3. Git hooks のインストール（自動で prepare スクリプトが実行される）
# 手動で実行する場合:
bun x lefthook install
```

#### 確認コマンド

```bash
# bun の確認
bun --version

# biome の確認
bun x biome --version

# lefthook の確認
bun x lefthook --version

# Git hooks の確認
ls -la .git/hooks/pre-commit
```

### Docker 環境

Docker は**アプリケーション実行専用**です：
- 開発サーバーの起動
- 本番環境に近い状態でのテスト

#### ⚠️ 重要な注意点

1. **Git hooks は Docker 内では動作しない**
   - Git 操作は必ず WSL で行う
   - Docker コンテナ内で git commit しない

2. **パッケージの追加・削除後はコンテナの再構築が必要**
   ```bash
   docker compose down -v
   docker compose build
   docker compose up -d
   ```

#### 起動コマンド

```bash
# Web のみ起動（ポート 3009）
docker compose --profile web up -d

# Admin のみ起動（ポート 3006）
docker compose --profile admin up -d

# 両方起動
docker compose --profile web --profile admin up -d

# 停止
docker compose down
```

## Git Hooks

### pre-commit

コミット時に自動実行されます：

```yaml
# lefthook.yml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: bun x biome check --write --no-errors-on-unmatched --files-ignore-unknown=true {staged_files}
      stage_fixed: true
```

**動作内容:**
- ステージされたファイルに対して biome check を実行
- 自動修正可能な問題は自動で修正
- 修正されたファイルは自動的に再ステージ

### pre-push

プッシュ時に自動実行されます：

```yaml
pre-push:
  parallel: true
  commands:
    type-check-web:
      run: bun run --cwd apps/web type-check
    type-check-admin:
      run: bun run --cwd apps/admin type-check
```

**動作内容:**
- 両アプリの TypeScript 型チェック
- 型エラーがある場合はプッシュを中断

## Biome 設定

### 設定ファイル

ルートの `biome.json` で設定：

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### 手動実行

```bash
# lint チェック
bun run lint

# 特定ファイルのチェック
bun x biome check path/to/file.tsx

# 自動修正付きチェック
bun x biome check --write path/to/file.tsx

# フォーマットのみ
bun x biome format --write path/to/file.tsx
```

## トラブルシューティング

### lefthook が動作しない

```bash
# hooks を再インストール
bun x lefthook uninstall
bun x lefthook install

# 手動で pre-commit を実行してテスト
bun x lefthook run pre-commit
```

### biome のエラーが解消できない

```bash
# キャッシュをクリア
rm -rf node_modules/.cache

# 依存関係を再インストール
rm -rf node_modules
bun install
```

### Docker でパッケージが見つからない

```bash
# ボリュームを含めて完全に再構築
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

## ベストプラクティス

1. **コミット前に必ず WSL でテスト**
   ```bash
   bun run lint
   bun run --cwd apps/web type-check
   bun run --cwd apps/admin type-check
   ```

2. **Docker は開発サーバー用途のみ**
   - Git 操作は WSL で行う
   - パッケージ追加も WSL で行い、その後 Docker を再構築

3. **npm/pnpm は使用しない**
   - パッケージマネージャーは **bun のみ** を使用
   - `npm install` や `pnpm install` は禁止

4. **hooks をスキップする場合（緊急時のみ）**
   ```bash
   # pre-commit をスキップ
   git commit --no-verify -m "emergency fix"
   
   # pre-push をスキップ
   git push --no-verify
   ```
   ⚠️ 通常は使用しないこと
