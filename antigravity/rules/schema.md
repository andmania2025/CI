# Schema.prisma ドキュメント

このドキュメントは、`prisma/schema.prisma` のデータモデルを色分けで分類し、理解しやすくするためのリファレンスです。

## 色分け凡例

| 色 | 用途 | 対象テーブル/モデル |
|:---:|------|-------------------|
| 🟡 **Yellow** | ユーザー・権限系 | `User`, `UserRole`, `UserStatus` |
| 🔵 **Blue** | 不動産会社系 | `RealEstateAgent`, `AgentStatus`, `AccountType` |
| 🟢 **Green** | 物件本体・履歴 | `Property`, `PropertyStatus`, `TransactionType` |
| 🟠 **Orange** | 物件画像 | `PropertyImage`, `ImageType` |
| 🟣 **Purple** | 物件設備・特徴 | `PropertyFeature`, `FeatureMaster`, `FeatureCategory` |
| 🩵 **Light Blue** | マスタデータ全般 | `RouteMaster`, `Station`, `PropertyTypeMaster`, `PropertyCategoryMaster`, `LayoutType` |
| 🩷 **Pink** | ユーザーアクション | `Favorite`, `PropertyView`（※閲覧履歴は `viewCount` で実装） |
| 🔴 **Red** | 問い合わせ | `Inquiry`, `SiteInquiry`, `AgentInquiry`, `InquirySourceType`, `InquiryType`, `InquiryStatus` |
| 🩶 **Gray** | システム・共通 | `Mail`, `FileBox`, `MailStatus`, `MailType` |
| 🫧 **Cyan** | Q&A | `Question`, `Answer`, `QuestionCategory`, `QuestionCategoryType` |
| 🌊 **Teal** | 査定 | `BulkAssessment`, `AssessmentStatus` |

---

## 詳細分類

### 🟡 ユーザー・権限系 (Yellow)

ユーザー認証・認可に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `User` | ユーザーマスタ（一般ユーザー、管理者、営業担当、不動産業者） |
| `UserRole` | ユーザー権限 enum（ADMIN, STAFF, SALES, REALTOR, USER） |
| `UserStatus` | ユーザー状態 enum（ACTIVE, INACTIVE, PENDING, CANCELLED, INVALID） |
| `Gender` | 性別 enum（MALE, FEMALE, OTHER） |

---

### 🔵 不動産会社系 (Blue)

不動産業者・仲介会社に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `RealEstateAgent` | 不動産業者マスタ（企業情報、免許情報、対応エリア等） |
| `AgentStatus` | 業者承認状態 enum（PENDING, APPROVED, REJECTED, SUSPENDED） |
| `AccountType` | アカウント種別 enum（FREE, PAID） |

---

### 🟢 物件本体・履歴 (Green)

物件情報の中核となるモデル。

| モデル/Enum | 説明 |
|------------|------|
| `Property` | 物件マスタ（フラット構造、売買/賃貸両対応） |
| `PropertyType` | 物件種別 enum（MANSION, HOUSE, LAND, BUILDING, APARTMENT, STORE, LODGING, PARKING, OTHER） |
| `PropertyStatus` | 物件状態 enum（AVAILABLE, SOLD, RENTED, RESERVED, PROCESSING, CANCELLED） |
| `TransactionType` | 取引形態 enum（OWNER, AGENT, BROKER） |
| `SaleOrRent` | 売買/賃貸区分 enum（SALE, RENT） |
| `PublicScope` | 公開範囲 enum（PUBLIC, PRIVATE, MEMBERS） |
| `PublicationStatus` | 公開状態 enum（PUBLISHED, UNPUBLISHED, DRAFT） |
| `Featured` | おすすめ区分 enum（FEATURED, NORMAL） |

---

### 🟠 物件画像 (Orange)

物件の画像・メディアに関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `PropertyImage` | 物件画像テーブル（メイン画像、物件画像、間取り図） |
| `ImageType` | 画像種別 enum（MAIN, EXTERIOR, INTERIOR, FLOOR_PLAN, MAP, OTHER） |

---

### 🟣 物件設備・特徴 (Purple)

物件の設備・特徴情報に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `PropertyFeature` | 物件-特徴の中間テーブル |
| `FeatureMaster` | 特徴マスタ（正規化されたマスタデータ） |
| `FeatureCategory` | 特徴カテゴリ enum（EQUIPMENT, CONDITION, APPEAL, STRUCTURE, REFORM, ENVIRONMENT, TRANSPORT, OTHER） |

---

### 🩵 マスタデータ全般 (Light Blue)

各種マスタデータ・参照データ。

| モデル/Enum | 説明 |
|------------|------|
| `RouteMaster` | 路線マスタ（鉄道路線） |
| `Station` | 駅マスタ |
| `PropertyTypeMaster` | 物件種別マスタ |
| `PropertyCategoryMaster` | 物件カテゴリマスタ |
| `LayoutType` | 間取りタイプ enum（R, K, DK, LDK, SK, SDK, SLDK） |

---

### 🩷 ユーザーアクション (Pink)

ユーザーの行動履歴・お気に入りに関連するモデル。

| モデル | 説明 |
|--------|------|
| `Favorite` | お気に入りテーブル（ユーザー × 物件） |

> **Note:** 閲覧履歴は `Property.viewCount` で集計。個別の閲覧履歴テーブル `PropertyView` は未実装。

---

### 🔴 問い合わせ (Red)

各種問い合わせに関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `Inquiry` | 物件問い合わせ（特定物件への問い合わせ） |
| `SiteInquiry` | サイト問い合わせ（一般的な問い合わせ） |
| `AgentInquiry` | 業者問い合わせ（業者登録や連携依頼） |
| `InquirySourceType` | 問い合わせ経路 enum（WEB, PHONE, EMAIL, OTHER） |
| `InquiryType` | 問い合わせ種別 enum（VIEWING, DETAIL, PRICE, NEGOTIATION, MOVE_IN, OTHER） |
| `InquiryStatus` | 問い合わせ状態 enum（NEW, READ, IN_PROGRESS, COMPLETED, CANCELLED） |

---

### 🩶 システム・共通 (Gray)

システム運用・共通機能に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `Mail` | メール送信履歴 |
| `FileBox` | ファイルボックス（ファイル管理） |
| `MailStatus` | メール状態 enum（DRAFT, SENT, FAILED） |
| `MailType` | メール種別 enum（GENERAL, INQUIRY, NEWSLETTER, SYSTEM） |

---

### 🫧 Q&A (Cyan)

質問・回答掲示板機能に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `Question` | 質問テーブル（掲示板の質問） |
| `Answer` | 回答テーブル（質問への回答、業者回答） |
| `QuestionCategory` | 質問カテゴリマスタ |
| `QuestionCategoryType` | カテゴリ種別 enum（GENERAL, SPECIAL） |

---

### 🌊 査定 (Teal)

一括査定機能に関連するモデル。

| モデル/Enum | 説明 |
|------------|------|
| `BulkAssessment` | 一括査定依頼 |
| `AssessmentStatus` | 査定状態 enum（PENDING, IN_PROGRESS, COMPLETED, CANCELLED） |

---

## ER図との対応

ER図を作成・閲覧する際は、この色分けを使用してテーブル間の関連性を視覚的に把握してください。

### 主なリレーション

```
User (🟡)
  ├── Property (🟢) [1:N] - ユーザーが登録した物件
  ├── Favorite (🩷) [1:N] - お気に入り
  ├── Inquiry (🔴) [1:N] - 問い合わせ
  └── Question (🫧) [1:N] - 質問投稿

RealEstateAgent (🔵)
  ├── Property (🟢) [1:N] - 業者が担当する物件
  ├── Answer (🫧) [1:N] - 業者からの回答
  └── AgentInquiry (🔴) [1:N] - 業者への問い合わせ

Property (🟢)
  ├── PropertyImage (🟠) [1:N] - 物件画像
  ├── PropertyFeature (🟣) [N:M via FeatureMaster] - 物件特徴
  ├── Favorite (🩷) [1:N] - お気に入り
  └── Inquiry (🔴) [1:N] - 問い合わせ

RouteMaster (🩵)
  └── Station (🩵) [1:N] - 路線と駅
```

---

## 使用上の注意

1. **スキーマ変更時**: このドキュメントも更新してください
2. **色の一貫性**: ER図、コメント、ドキュメントで同じ色分けを使用
3. **Enumの管理**: 各セクションに関連する Enum も同じ色で分類

---

## 参照

- **スキーマファイル**: `prisma/schema.prisma`
- **ER図ドキュメント**: `docs/schema-erd.md`
- **マイグレーション**: `pnpm exec prisma migrate dev`
