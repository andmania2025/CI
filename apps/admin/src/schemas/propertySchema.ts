import { z } from "zod";

/**
 * 物件登録フォームのバリデーションスキーマ
 * アスタリスク（*）がついている項目は必須項目
 */

// Enum値の定義（const assertion付き）
const SALE_OR_RENT = ["sale", "rent"] as const;
const TRANSACTION_TYPE = ["owner", "agent", "broker"] as const;
const PROPERTY_TYPE = ["mansion", "house", "land", "building"] as const;
const PROPERTY_CONDITION = ["new", "used", "land"] as const;
// Enum definitions removed for free-text fields
// LAYOUT_TYPE, UTILITIES, DIRECTION, LAND_TYPE, CITY_PLANNING, LAND_CATEGORY, USE_DISTRICT
const PUBLICATION_STATUS = ["published", "unpublished", "draft"] as const;

// Phase 2: 画像種別・問い合わせ種別（画像管理・問い合わせフォームで使用）
export const IMAGE_TYPE = ["exterior", "interior", "floor_plan", "map", "other"] as const;
export const INQUIRY_TYPE = ["general", "viewing", "document", "negotiation"] as const;

export const propertySchema = z.object({
  // ============================================
  // 基本情報（BasicInfoTab）
  // ============================================
  propertyName: z
    .string({ message: "物件名を入力してください" })
    .min(1, "物件名を入力してください"),
  saleOrRent: z.enum(SALE_OR_RENT, {
    message: "売賃・賃貸の選択をしてください",
  }),
  transactionType: z.enum(TRANSACTION_TYPE, {
    message: "取引態様を選択してください",
  }),
  propertyType: z.enum(PROPERTY_TYPE, {
    message: "物件種別を選択してください",
  }),
  propertyCondition: z.enum(PROPERTY_CONDITION, {
    message: "新築・中古・土地の選択をしてください",
  }),
  prefecture: z
    .string({ message: "都道府県を入力してください" })
    .min(1, "都道府県を入力してください"),
  city: z.string({ message: "市区町村を入力してください" }).min(1, "市区町村を入力してください"),
  address: z.string({ message: "町名番地を入力してください" }).min(1, "町名番地を入力してください"),
  otherTransportation: z.string().optional(),

  // ============================================
  // 物件詳細（PropertyDetailsTab）
  // ============================================
  layoutNumber: z
    .string({ message: "間取りを入力してください" })
    .min(1, "間取りを入力してください"),
  layoutType: z.string().optional(),
  buildingArea: z
    .string({ message: "建物面積（㎡）を入力してください" })
    .min(1, "建物面積（㎡）を入力してください"),
  landArea: z.string().optional(),
  constructionDate: z.date({
    message: "建築年月を選択してください",
  }),
  buildingConfirmationNumber: z.string().optional(),
  buildingStructure: z.string().optional(),
  constructionCompany: z.string().optional(),
  salePrice: z
    .string({ message: "販売価格（万円）を入力してください" })
    .min(1, "販売価格（万円）を入力してください"),
  totalUnits: z.string().optional(),
  salesUnits: z.string().optional(),
  floor: z.string().optional(),
  utilities: z.string().optional(),
  balconyArea: z.string().optional(),
  layoutDetail: z.string().optional(),
  direction: z.string().optional(),
  directionDetail: z.string().optional(),
  mainLighting: z.string().optional(),
  unitPrice: z.string().optional(),
  stampTax: z.string().optional(),
  expectedRent: z.string().optional(),
  usageFee: z.string().optional(),

  // ============================================
  // 土地・建物（LandBuildingTab）
  // ============================================
  landType: z.string().optional(),
  landAreaSqm: z
    .string({ message: "土地面積（㎡）を入力してください" })
    .min(1, "土地面積（㎡）を入力してください"),
  setback: z.string().optional(),
  privateRoadArea: z.string().optional(),
  deliveryDate: z.date({
    message: "引渡（年月）を選択してください",
  }),
  currentStatus: z.string().optional(),
  cityPlanning: z.string().optional(),
  roadContact: z
    .string({ message: "接道状況を入力してください" })
    .min(1, "接道状況を入力してください"),
  landCategory: z.string().optional(),
  useDistrict: z.string().optional(),
  buildingCoverageRatio: z.string().optional(),
  floorAreaRatio: z.string().optional(),
  totalProperties: z.string().optional(),
  developmentPermitNumber: z.string().optional(),
  developmentArea: z.string().optional(),
  residentialPermitNumber: z.string().optional(),
  easement: z.string().optional(),
  nationalLandAct: z.string().optional(),
  siteRights: z.string().optional(),
  propertyStatus: z.string().optional(),
  lotNumber: z.string().optional(),

  // ============================================
  // 設備・特性（FacilitiesTab）
  // ============================================
  facilities: z.array(z.string()).optional(),
  parkingAvailable: z.string().optional(),
  parkingFee: z.string().optional(),
  parkingDetail: z.string().optional(),
  managementFee: z
    .string({ message: "管理費・共益費（円）を入力してください" })
    .min(1, "管理費・共益費（円）を入力してください"),
  repairReserve: z.string().optional(),
  managementType: z.string().optional(),
  reform: z.string().optional(),
  mainLightingFacilities: z.string().optional(),
  expectedAnnualIncome: z.string().optional(),
  surfaceYield: z.string().optional(),

  // ============================================
  // 説明・環境（DescriptionTab）
  // ============================================
  environment: z.string().optional(),
  expenses: z.string().optional(),
  parkingInfo: z.string().optional(),
  otherExpenses: z.string().optional(),
  legalRestrictions: z.string().optional(),
  otherConstructionInfo: z.string().optional(),

  // ============================================
  // メディア・公開（MediaTab）
  // ============================================
  images: z.array(z.unknown()).optional(),
  propertyCategory: z.string().optional(),
  inquiryCount: z.number().default(0),
  featured: z.string().optional(),
  publicScope: z.string().optional(),
  publicationStatus: z.enum(PUBLICATION_STATUS, {
    message: "公開設定を選択してください",
  }),
  nextUpdateDate: z.date({
    message: "次回更新予定日を選択してください",
  }),
  validUntilDate: z.date().optional(),
  publicationMedium: z.string().optional(),
  featurePeriodStart: z.date().optional(),
  featurePeriodEnd: z.date().optional(),
  publicScopeReservation: z.string().optional(),
  reservedReleaseDate: z.date().optional(),

  // ============================================
  // その他（OtherTab）
  // ============================================
  sellerName: z
    .string({ message: "売主の名称または商号を入力してください" })
    .min(1, "売主の名称または商号を入力してください"),
  realEstateAgent: z
    .string({ message: "不動産業者様を入力してください" })
    .min(1, "不動産業者様を入力してください"),
  remarks: z.string().optional(),
  adminMemo: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
