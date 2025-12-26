# Schema.prisma ドキュメント (v3)

このドキュメントは、`prisma/schema.prisma` のデータモデルを色分けして分類し、各ドメインの役割を理解しやすくするためのリファレンスです。

## 色分け凡例

| 色 | 用途 | 対象テーブル/モデル |
|:---:|------|-------------------|
| 🟡 **Yellow** | ユーザー・権限系 | `User`, `Role`, `UserRole` |
| 🔵 **Blue** | 不動産会社・支店・担当者 | `Company`, `Branch`, `Agent` |
| 🟢 **Green** | 物件本体・履歴・公開設定 | `Property`, `PropertyPublication`, `PropertyPriceHistory`, `PropertyStatusHistory` |
| 🟠 **Orange** | 物件画像 | `PropertyImage` |
| 🟣 **Purple** | 物件設備・特徴 | `PropertyFeature`, `FeatureMaster` |
| 🩵 **Light Blue** | マスタデータ (地域・駅・種別) | `RegionMaster`, `AreaMaster`, `PropertyTypeMaster`, `PropertyCategoryMaster`, `FloorPlanMaster`, `RouteMaster`, `Station` |
| 🩷 **Pink** | ユーザーアクション (統計) | `Favorite`, `PropertyView`, `PropertyViewDaily` |
| 🔴 **Red** | 問い合わせスレッド | `Inquiry`, `InquiryMessage` |
| 🌊 **Teal** | 一括査定 | `BulkAssessment`, `BulkAssessmentResponse` |
| 🫧 **Cyan** | Q&A 掲示板 | `Question`, `Answer`, `QuestionCategory` |
| 🩶 **Gray** | システム・共通・監査ログ | `Mail`, `FileBox`, `SystemSetting`, `AuditLog`, `Notification` |
| 🔘 **Gray/Common** | 物件駅関連 | `PropertyStation` |

---

## 詳細分類

### 🟡 ユーザー・権限系 (Yellow)
認証と、きめ細やかな権限管理（RBAC）を担当します。

| モデル/Enum | 説明 |
|------------|------|
| `User` | ログインユーザー（一般、管理者、エージェント共通） |
| `Role` | 権限マスタ（パーミッションをJSON保持） |
| `UserRole` | ユーザーと権限の中間テーブル |
| `UserStatus` | 状態（ACTIVE, INACTIVE, PENDING, CANCELLED, INVALID） |

### 🔵 不動産会社・担当者系 (Blue)
B2B2Cの構造を支える「会社 ＞ 支店 ＞ 担当者」の3層構造です。

| モデル/Enum | 説明 |
|------------|------|
| `Company` | 不動産会社本体の情報・契約形態 |
| `Branch` | 各支店の情報・所在地 |
| `Agent` | 支店に所属する担当者（`User`と1:1） |
| `AccountType` | アカウント種別（FREE, PAID） |
| `CompanyStatus` | 状態（PENDING, APPROVED, REJECTED, SUSPENDED） |

### 🟢 物件本体・履歴・公開設定 (Green)
物件の属性情報に加え、公開状態の管理や価格・状態の変遷を記録します。

| モデル/Enum | 説明 |
|------------|------|
| `Property` | 物件の基本情報（非正規化項目含む） |
| `PropertyPublication` | 公開状態、公開範囲、おすすめフラグ |
| `PropertyPriceHistory` | 価格変更の履歴管理 |
| `PropertyStatusHistory` | ステータス（公開・成約等）の変遷記録 |
| `PublicationStatus` | 状態（PUBLISHED, UNPUBLISHED, DRAFT） |
| `PublicScope` | 範囲（PUBLIC, PRIVATE, MEMBERS） |

### 🟠 🟣 🩶 メディア・設備・交通
物件を補足する関連テーブル。

| モデル/Enum | 説明 |
|------------|------|
| `PropertyImage` (🟠) | 物件の画像。メインフラグ、表示順を保持 |
| `PropertyFeature` (🟣) | 物件と設備特徴（マスタ）の紐付け |
| `PropertyStation` (🔘) | 物件の利用可能駅、徒歩分数 |
| `FeatureMaster` (🟣) | 設備カテゴリー別の特徴定義 |

### 🩷 ユーザーアクション・統計 (Pink)
ユーザーの「興味」を可視化し、分析に役立てます。

| モデル/Enum | 説明 |
|------------|------|
| `Favorite` | お気に入り登録 |
| `PropertyView` | 個別の閲覧ログ（IP、UA保持） |
| `PropertyViewDaily` | 物件ごとの日次集計データ（デイリーPV等） |

### 🔴 問い合わせ・チャットスレッド (Red)
特定の物件やユーザーからの、担当者へのメッセージング。

| モデル/Enum | 説明 |
|------------|------|
| `Inquiry` | 問い合わせの親チケット |
| `InquiryMessage` | スレッド内の個別チャットメッセージ |
| `InquiryType` | 種別（VIEWING, DETAIL, PRICE, etc.） |
| `InquiryStatus` | 状態（NEW, READ, IN_PROGRESS, COMPLETED） |

### 🌊 一括査定 (Teal)
不動産の売却を希望するユーザーと、複数エージェントのマッチング。

| モデル/Enum | 説明 |
|------------|------|
| `BulkAssessment` | ユーザーからの査定依頼 |
| `BulkAssessmentResponse` | エージェントからの返答・査定額提示 |
| `AssessmentStatus` | 依頼状態（PENDING, COMPLETED, etc.） |

### 🫧 Q&A 掲示板 (Cyan)
ユーザーの疑問にエージェントや他のユーザーが答えるナレッジベース。

| モデル/Enum | 説明 |
|------------|------|
| `Question` | 投稿された質問 |
| `Answer` | 質問に対する各回答 |
| `QuestionCategory` | 質問のジャンル分け |

### 🩵 マスタデータ (Light Blue)
システム全体で整合性を保つための基盤データ。

| モデル | 説明 |
|--------|------|
| `RegionMaster` / `AreaMaster` | 地域、都道府県、市区町村 |
| `PropertyTypeMaster` / `PropertyCategoryMaster` | 物件種別の詳細な分類 |
| `FloorPlanMaster` | 間取りの詳細（1DK、3LDK等） |
| `RouteMaster` / `Station` | 路線情報、駅情報（緯度経度含む） |

### 🩶 システム・共通・監査ログ (Gray)
裏側で動作する運用・証跡管理。

| モデル | 説明 |
|--------|------|
| `AuditLog` | 全レコードの変更履歴（変更前後の差分をJSON保存） |
| `Notification` | ユーザー、エージェントへのシステム通知 |
| `Mail` | メール送信履歴、スケジュール管理 |
| `FileBox` | Supabase Storage上のファイル実体へのリンク |
| `SystemSetting` | サイト全体の設定値 |

---

## ER図との対応

ER図（[Eraser ERD](file:///home/user/dev/CI/docs/eraser-erd-latest.md)）は、このドキュメントと同じ色分けスキーマを採用しています。

### 主な動作フロー
1. **ログイン**: `User` (🟡) が `Inquiry` (🔴) を送る。
2. **管理**: エージェントが `Company/Branch` (🔵) に紐づき `Property` (🟢) を登録・公開する。
3. **分析**: `PropertyView` (🩷) のデータが `PropertyViewDaily` へ集約される。
4. **証跡**: 重要なデータ変更は自動的に `AuditLog` (�) へ記録される。

---

## 運用上のルール

1. **スキーマ変更時**: このドキュメントの分類表も更新してください。
2. **色の一貫性**: ER図（Eraser）、コメント、ドキュメントで同じ色分けを徹底してください。
3. **コマンド**: スキーマに関する操作はすべて **Bun** を使用します。
   ```bash
   # マイグレーション
   bun x prisma migrate dev --name <migration_name>
   # クライアント生成
   bun x prisma generate
   ```

---

## 参照

- **スキーマファイル**: `prisma/schema.prisma`
- **ER図ドキュメント**: `docs/eraser-erd-latest.md`
- **環境設定**: `prisma.config.ts`
