# 最新版 Eraser ER図

このドキュメントは `prisma/schema.prisma` の最新の状態を反映したEraser ER図です。

最終更新: 2025年12月26日
最終照合: Prisma Schema 全1074行と完全照合済み

## Eraser.io 用ERDコード

以下のコードを [Eraser.io](https://app.eraser.io/) のEntity Relationship Diagramエディタにコピー＆ペーストしてください。

```eraser
// ============================================
// 不動産管理システム ER図（Prisma Schema 完全準拠版）
// 最終同期: 2025年12月26日
// Prisma Schema: 1074行と完全照合済み
// ============================================

// ============================================
// ユーザー・権限管理 [yellow]
// ============================================

users [icon: user, color: yellow] {
  id string pk
  email string unique
  name string nullable
  furigana string nullable
  gender Gender nullable
  birthDate date nullable
  phone string nullable
  avatarUrl string nullable
  status UserStatus
  emailVerifiedAt timestamp nullable
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
  lastLoginAt timestamp nullable
}

roles [icon: shield, color: yellow] {
  id string pk
  name string unique
  permissions jsonb nullable
  description text nullable
  createdAt timestamp
}

user_roles [icon: link, color: yellow] {
  id string pk
  userId string fk
  roleId string fk
  createdAt timestamp
}

// ============================================
// 不動産会社・支店・担当者 [blue]
// ============================================

companies [icon: building, color: blue] {
  id string pk
  companyName string
  companyNameKana string nullable
  representativeName string
  postalCode string
  prefecture string
  city string
  address text
  latitude decimal nullable
  longitude decimal nullable
  phone string
  fax string nullable
  website string nullable
  licenseNumber string unique
  associationMembership string nullable
  accountType AccountType
  status CompanyStatus
  metadata jsonb nullable
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

branches [icon: git-branch, color: blue] {
  id string pk
  branchName string
  postalCode string
  prefecture string
  city string
  address text
  latitude decimal nullable
  longitude decimal nullable
  phone string
  fax string nullable
  businessHours string nullable
  isHeadquarters boolean
  companyId string fk
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

agents [icon: user-check, color: blue] {
  id string pk
  position string nullable
  department string nullable
  licenseNumber string nullable
  licenseExpireDate date nullable
  goodCount int
  responseRate decimal nullable
  avgResponseMinutes int nullable
  userId string fk unique
  branchId string fk
  isActive boolean
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

// ============================================
// 物件情報 [green]
// ============================================

properties [icon: home, color: green] {
  id string pk
  propertyCode string unique
  propertyName string
  propertyNameKana string nullable
  propertyTypeId string fk nullable
  propertyCategoryId string fk nullable
  areaId string fk nullable
  transactionType TransactionType nullable
  propertyCondition PropertyCondition nullable
  postalCode string nullable
  prefecture string nullable
  city string nullable
  town string nullable
  block string nullable
  building string nullable
  roomNumber string nullable
  fullAddress text nullable
  latitude decimal nullable
  longitude decimal nullable
  layoutNumber int nullable
  layoutTypeId string fk nullable
  layoutDisplay string nullable
  buildingArea decimal nullable
  landArea decimal nullable
  balconyArea decimal nullable
  buildingStructure string nullable
  constructionDate date nullable
  constructionYearMonth string nullable
  totalFloors int nullable
  floor int nullable
  currentPrice bigint nullable
  pricePerTsubo bigint nullable
  managementFee int nullable
  commonServiceFee int nullable
  depositMonths decimal nullable
  keyMoneyMonths decimal nullable
  mainImageUrl string nullable
  primaryStationName string nullable
  primaryStationWalkMinutes int nullable
  featureTags string[]
  viewCount int
  inquiryCount int
  favoriteCount int
  agentId string fk nullable
  userId string fk
  remarks text nullable
  internalMemo text nullable
  metadata jsonb nullable
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

property_publications [icon: globe, color: green] {
  id string pk
  propertyId string fk unique
  status PublicationStatus
  scope PublicScope
  featured boolean
  featuredOrder int nullable
  publishedAt timestamp nullable
  unpublishedAt timestamp nullable
  soldAt timestamp nullable
  expiresAt timestamp nullable
  createdAt timestamp
  updatedAt timestamp
}

property_price_histories [icon: trending-up, color: green] {
  id string pk
  propertyId string fk
  previousPrice bigint nullable
  newPrice bigint
  changePercent decimal nullable
  changeReason text nullable
  changedById string fk nullable
  createdAt timestamp
}

property_status_histories [icon: activity, color: green] {
  id string pk
  propertyId string fk
  previousStatus string nullable
  newStatus string
  changeReason text nullable
  changedById string fk nullable
  createdAt timestamp
}

// ============================================
// 物件メディア・設備 [orange/purple]
// ============================================

property_images [icon: image, color: orange] {
  id string pk
  propertyId string fk
  fileBoxId string fk nullable
  url string
  thumbnailUrl string nullable
  caption string nullable
  imageType ImageType
  displayOrder int
  isMain boolean
  width int nullable
  height int nullable
  createdAt timestamp
}

property_features [icon: check-square, color: purple] {
  id string pk
  propertyId string fk
  featureId string fk
}

property_stations [icon: navigation, color: gray] {
  id string pk
  propertyId string fk
  stationId string fk
  walkMinutes int nullable
  busMinutes int nullable
  busStopName string nullable
  isPrimary boolean
}

// ============================================
// ユーザーアクション [pink]
// ============================================

favorites [icon: heart, color: pink] {
  id string pk
  userId string fk
  propertyId string fk
  createdAt timestamp
}

property_views [icon: eye, color: pink] {
  id string pk
  propertyId string fk
  userId string fk nullable
  sessionId string nullable
  ipAddress string nullable
  userAgent text nullable
  referer text nullable
  viewedAt timestamp
  viewDurationSeconds int nullable
}

property_view_dailies [icon: bar-chart, color: pink] {
  id string pk
  propertyId string fk
  viewDate date
  totalViews int
  uniqueUsers int
  avgDurationSeconds decimal nullable
  createdAt timestamp
}

// ============================================
// 問い合わせ [red]
// ============================================

inquiries [icon: message-circle, color: red] {
  id string pk
  inquiryNumber string unique
  targetType TargetType
  targetId string fk nullable
  name string
  furigana string nullable
  email string
  phone string nullable
  companyName string nullable
  inquiryType InquiryType
  subject string nullable
  message text
  status InquiryStatus
  priority InquiryPriority
  userId string fk nullable
  assignedAgentId string fk nullable
  assignedAt timestamp nullable
  responseCount int
  lastRespondedAt timestamp nullable
  closedAt timestamp nullable
  closedReason text nullable
  source string nullable
  metadata jsonb nullable
  createdAt timestamp
  updatedAt timestamp
}

inquiry_messages [icon: message-square, color: red] {
  id string pk
  inquiryId string fk
  senderId string fk nullable
  senderType SenderType
  message text
  attachments jsonb nullable
  isInternal boolean
  createdAt timestamp
}

// ============================================
// 一括査定 [teal]
// ============================================

bulk_assessments [icon: file-text, color: teal] {
  id string pk
  assessmentNumber string unique
  propertyAddress text
  propertyTypeId string fk nullable
  buildingArea decimal nullable
  landArea decimal nullable
  constructionYear int nullable
  ownerName string
  email string
  phone string nullable
  preferredContactMethod string nullable
  preferredContactTime string nullable
  status AssessmentStatus
  agentCount int
  responseCount int
  userId string fk nullable
  metadata jsonb nullable
  createdAt timestamp
  completedAt timestamp nullable
}

bulk_assessment_responses [icon: check-circle, color: teal] {
  id string pk
  assessmentId string fk
  agentId string fk
  assessedPrice bigint nullable
  priceRangeMin bigint nullable
  priceRangeMax bigint nullable
  comments text nullable
  proposalDocument string nullable
  status ResponseStatus
  submittedAt timestamp nullable
  viewedAt timestamp nullable
  createdAt timestamp
}

// ============================================
// Q&A [cyan]
// ============================================

questions [icon: help-circle, color: cyan] {
  id string pk
  questionNumber string unique
  title string
  content text
  categoryId string fk nullable
  tags string[]
  viewCount int
  answerCount int
  status QuestionStatus
  authorId string fk
  bestAnswerId string fk nullable
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

answers [icon: message-square, color: cyan] {
  id string pk
  questionId string fk
  content text
  goodCount int
  isBestAnswer boolean
  authorId string fk nullable
  agentId string fk nullable
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

// ============================================
// マスタデータ [lightblue/purple]
// ============================================

feature_masters [icon: star, color: purple] {
  id string pk
  code string unique
  name string
  category FeatureCategory
  icon string nullable
  displayOrder int
  isActive boolean
}

region_masters [icon: globe, color: lightblue] {
  id string pk
  code string unique
  name string
  displayOrder int
  isActive boolean
}

area_masters [icon: map, color: lightblue] {
  id string pk
  regionId string fk nullable
  prefectureCode string
  prefecture string
  cityCode string nullable
  city string
  displayOrder int
  isActive boolean
}

property_type_masters [icon: home, color: lightblue] {
  id string pk
  code string unique
  name string
  description text nullable
  displayOrder int
  isActive boolean
}

property_category_masters [icon: tag, color: lightblue] {
  id string pk
  code string unique
  name string
  displayOrder int
  isActive boolean
}

floor_plan_masters [icon: grid, color: lightblue] {
  id string pk
  code string unique
  name string
  roomCount int nullable
  displayOrder int
  isActive boolean
}

route_masters [icon: navigation, color: lightblue] {
  id string pk
  code string unique
  name string
  companyName string nullable
  lineColor string nullable
  displayOrder int
  isActive boolean
}

stations [icon: map-pin, color: lightblue] {
  id string pk
  code string unique
  name string
  nameKana string nullable
  routeId string fk nullable
  prefecture string nullable
  city string nullable
  latitude decimal nullable
  longitude decimal nullable
  displayOrder int
  isActive boolean
}

question_categories [icon: folder, color: lightblue] {
  id string pk
  code string unique
  name string
  description text nullable
  displayOrder int
  isActive boolean
}

// ============================================
// システム・共通 [gray]
// ============================================

mails [icon: mail, color: gray] {
  id string pk
  fromEmail string
  fromName string nullable
  toEmail string
  toName string nullable
  ccEmail string[]
  bccEmail string[]
  subject string
  bodyText text
  bodyHtml text nullable
  status MailStatus
  mailType MailType
  templateCode string nullable
  templateVariables jsonb nullable
  errorMessage text nullable
  userId string fk nullable
  retryCount int
  scheduledAt timestamp nullable
  sentAt timestamp nullable
  createdAt timestamp
}

file_boxes [icon: file, color: gray] {
  id string pk
  bucketName string
  storagePath string
  fileName string
  originalName string
  publicUrl string nullable
  mimeType string
  fileSize bigint
  category string nullable
  metadata jsonb nullable
  userId string fk nullable
  isPublic boolean
  createdAt timestamp
  updatedAt timestamp
  deletedAt timestamp nullable
}

system_settings [icon: settings, color: gray] {
  id string pk
  key string unique
  value jsonb
  valueType string
  category string nullable
  description text nullable
  isPublic boolean
  updatedById string fk nullable
  createdAt timestamp
  updatedAt timestamp
}

audit_logs [icon: clipboard, color: gray] {
  id string pk
  tableName string
  recordId string
  action AuditAction
  oldData jsonb nullable
  newData jsonb nullable
  changedFields string[]
  userId string fk nullable
  userEmail string nullable
  ipAddress string nullable
  userAgent text nullable
  sessionId string nullable
  createdAt timestamp
}

notifications [icon: bell, color: gray] {
  id string pk
  userId string fk
  type string
  title string
  message text
  linkUrl string nullable
  isRead boolean
  readAt timestamp nullable
  metadata jsonb nullable
  createdAt timestamp
}

// ============================================
// リレーション定義
// ============================================

// ユーザー・権限
users.id < user_roles.userId
roles.id < user_roles.roleId

// 会社 → 支店 → エージェント
companies.id < branches.companyId
branches.id < agents.branchId
users.id - agents.userId

// 物件の所有者・担当者
users.id < properties.userId
agents.id < properties.agentId

// 物件詳細（1対1のサブテーブル）
properties.id - property_publications.propertyId

// 物件履歴
properties.id < property_price_histories.propertyId
properties.id < property_status_histories.propertyId
users.id < property_price_histories.changedById
users.id < property_status_histories.changedById

// 物件に紐づく多対多の中間テーブル
properties.id < property_images.propertyId
properties.id < property_features.propertyId
properties.id < property_stations.propertyId

// マスタ参照（物件）
property_type_masters.id < properties.propertyTypeId
property_category_masters.id < properties.propertyCategoryId
area_masters.id < properties.areaId
floor_plan_masters.id < properties.layoutTypeId
feature_masters.id < property_features.featureId
stations.id < property_stations.stationId

// FileBox
file_boxes.id < property_images.fileBoxId
users.id < file_boxes.userId

// ユーザーアクション
users.id < favorites.userId
properties.id < favorites.propertyId
users.id < property_views.userId
properties.id < property_views.propertyId
properties.id < property_view_dailies.propertyId

// 問い合わせ
users.id < inquiries.userId
agents.id < inquiries.assignedAgentId
properties.id < inquiries.targetId
inquiries.id < inquiry_messages.inquiryId

// 一括査定
users.id < bulk_assessments.userId
property_type_masters.id < bulk_assessments.propertyTypeId
bulk_assessments.id < bulk_assessment_responses.assessmentId
agents.id < bulk_assessment_responses.agentId

// Q&A
users.id < questions.authorId
question_categories.id < questions.categoryId
questions.id < answers.questionId
users.id < answers.authorId
agents.id < answers.agentId

// 駅・路線
route_masters.id < stations.routeId

// 地域・エリア
region_masters.id < area_masters.regionId

// メール
users.id < mails.userId

// 通知
users.id < notifications.userId

// 監査ログ・システム設定
users.id < audit_logs.userId
users.id < system_settings.updatedById
```

## 変更履歴

### 2025年12月26日（初版）
- Prisma Schema最新版を反映
- 以下の主要な変更を反映:
  - `Company` → `Branch` → `Agent` の3層構造
  - `UserRole` による柔軟な権限管理
  - `PropertyPublication` による公開設定の分離
  - `PropertyPriceHistory`, `PropertyStatusHistory` による履歴管理
  - `PropertyView`, `PropertyViewDaily` による閲覧統計
  - `InquiryMessage` による問い合わせスレッド対応
  - `BulkAssessmentResponse` による一括査定回答
  - `AuditLog` による監査ログ
  - `Notification` による通知機能

## 旧ER図との主な差異

| 項目 | 旧ER図 | 新ER図（Prisma準拠） |
|------|--------|---------------------|
| 住所マスタ | `addressMasters` | 物件に直接保存 |
| 物件種別サブテーブル | `propertyMansions`等 | 単一`properties`テーブル |
| 価格テーブル | `propertyPricings` | `properties`内 + `property_price_histories` |
| ユーザー権限 | `users.role`フィールド | `roles` + `user_roles` |
| 会社・エージェント | なし | `companies`, `branches`, `agents` |
| 問い合わせ | シンプル | `inquiries` + `inquiry_messages` |
| 履歴・統計 | なし | 各種履歴テーブル追加 |
