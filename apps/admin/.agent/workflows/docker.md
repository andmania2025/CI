---
description: Docker環境のセットアップ、起動、トラブルシューティング
---

# Docker環境のセットアップ

このプロジェクトはDockerを使用してポート3003で実行できます。

**注意**: 本番環境へのデプロイはVercelを使用します。Dockerの本番環境ビルドは不要です。

## 前提条件

- Docker Desktopがインストールされていること
- Docker Composeが利用可能であること

## 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database
DATABASE_URL=postgresql://user:password@host:port/database
DIRECT_URL=postgresql://user:password@host:port/database
```

## 開発環境（ホットリロード対応）

開発環境では、コード変更が即座に反映されます。**再ビルドは不要**です。

```bash
# 開発環境の起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d --build

# ログの確認
docker-compose logs -f app

# 停止
docker-compose down
```

**特徴：**
- ✅ コード変更が即座に反映（ホットリロード）
- ✅ 再ビルド不要
- ✅ 開発サーバー（`next dev`）を使用
- ✅ ソースコードをボリュームマウント

## Docker環境の起動

```bash
# 1. 初回のみビルド（依存関係のインストール）
docker-compose build

# 2. コンテナの起動
docker-compose up -d

# 3. ログの確認
docker-compose logs -f app
```

## アクセス

アプリケーションは以下のURLでアクセスできます：

- **開発環境**: http://localhost:3003

## よくある操作

```bash
# コンテナの停止
docker-compose down

# コンテナの再起動
docker-compose restart

# ログの確認
docker-compose logs -f app

# コンテナの削除（ボリュームも含む）
docker-compose down -v

# イメージの再ビルド
docker-compose build --no-cache
docker-compose up -d
```

## トラブルシューティング

### ビルドエラーが発生する場合

1. キャッシュをクリアして再ビルド：
   ```bash
   docker-compose build --no-cache
   ```

2. ログを確認：
   ```bash
   docker-compose logs app
   ```

### ポート3003が既に使用されている場合

`docker-compose.yml`のポート設定を変更してください：

```yaml
ports:
  - "3004:3000"  # ホスト側のポートを変更
```

### 開発環境で変更が反映されない場合

1. ボリュームマウントが正しく設定されているか確認
2. Next.jsの開発サーバーが正常に起動しているか確認
3. ブラウザのキャッシュをクリア（Cmd+Shift+R）

### Prismaクライアントの生成エラー

Prismaスキーマが`prisma/schema.prisma`に存在することを確認してください。

開発環境では、コンテナ内で以下のコマンドを実行できます：

```bash
# コンテナ内に入る
docker-compose exec app sh

# Prismaクライアントを生成
pnpm prisma generate
```
