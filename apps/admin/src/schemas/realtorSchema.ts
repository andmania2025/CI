import { z } from "zod";

/**
 * 不動産業者登録フォームのバリデーションスキーマ
 * アスタリスク（*）がついている項目は必須項目
 */

// Enum値の定義（const assertion付き）
const SALE_OR_RENT = ["sale", "rent"] as const;
const TRANSACTION_TYPE = ["owner", "agent", "broker"] as const;
const PROPERTY_TYPE = ["mansion", "house", "land", "building"] as const;
const PROPERTY_CONDITION = ["new", "used", "land"] as const;
const LAYOUT_TYPE = ["r", "k", "dk", "ldk"] as const;
const UTILITIES = ["complete", "partial", "incomplete"] as const;
const DIRECTION = ["east", "west", "south", "north", "southeast"] as const;
const LAND_TYPE = [
  "residential",
  "commercial",
  "industrial",
  "agricultural",
  "forest",
  "other",
] as const;
const CITY_PLANNING = ["urbanization", "controlled", "non-urbanization", "outside"] as const;
const LAND_CATEGORY = ["residential", "agricultural", "field", "forest"] as const;
const USE_DISTRICT = [
  "first-residential",
  "second-residential",
  "first-commercial",
  "industrial",
  "none",
] as const;
const PUBLICATION_STATUS = ["published", "unpublished"] as const;

export const realtorSchema = z.object({
  // ============================================
  // 基本情報（BasicInfoTab）
  // ============================================
  propertyName: z
    .string({ message: "物件名を入力してください" })
    .min(1, "物件名を入力してください"),
  contactPerson: z.string().optional().default(""),
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
  otherTransportation: z.string().optional().default(""),

  // ============================================
  // 物件詳細（PropertyDetailsTab）
  // ============================================
  layoutNumber: z
    .string({ message: "間取りを入力してください" })
    .min(1, "間取りを入力してください"),
  layoutType: z
    .enum(LAYOUT_TYPE, {
      message: "間取りタイプを選択してください",
    })
    .default("r"),
  buildingArea: z
    .string({ message: "建物面積（㎡）を入力してください" })
    .min(1, "建物面積（㎡）を入力してください"),
  landArea: z.string().optional().default(""),
  constructionDate: z.date({
    message: "建築年月を選択してください",
  }),
  buildingConfirmationNumber: z.string().optional().default(""),
  buildingStructure: z.string().optional().default(""),
  constructionCompany: z.string().optional().default(""),
  salePrice: z
    .string({ message: "販売価格（万円）を入力してください" })
    .min(1, "販売価格（万円）を入力してください"),
  totalUnits: z.string().optional().default(""),
  salesUnits: z.string().optional().default(""),
  floor: z.string().optional().default(""),
  utilities: z
    .enum(UTILITIES, {
      message: "上下水道・ガスを選択してください",
    })
    .default("complete"),
  balconyArea: z.string().optional().default(""),
  layoutDetail: z.string().optional().default(""),
  direction: z
    .enum(DIRECTION, {
      message: "開取りを選択してください",
    })
    .default("south"),
  directionDetail: z.string().optional().default(""),
  mainLighting: z.string().optional().default(""),
  unitPrice: z.string().optional().default(""),
  stampTax: z.string().optional().default(""),
  expectedRent: z.string().optional().default(""),
  usageFee: z.string().optional().default(""),

  // ============================================
  // 土地・建物（LandBuildingTab）
  // ============================================
  landType: z
    .enum(LAND_TYPE, {
      message: "土地種類を選択してください",
    })
    .default("residential"),
  landAreaSqm: z
    .string({ message: "土地面積（㎡）を入力してください" })
    .min(1, "土地面積（㎡）を入力してください"),
  setback: z.string().optional().default(""),
  privateRoadArea: z.string().optional().default(""),
  deliveryDate: z.date({
    message: "引渡（年月）を選択してください",
  }),
  currentStatus: z.string().optional().default(""),
  cityPlanning: z
    .enum(CITY_PLANNING, {
      message: "都市計画を選択してください",
    })
    .default("urbanization"),
  roadContact: z
    .string({ message: "接道状況を入力してください" })
    .min(1, "接道状況を入力してください"),
  landCategory: z
    .enum(LAND_CATEGORY, {
      message: "地目を選択してください",
    })
    .default("residential"),
  useDistrict: z
    .enum(USE_DISTRICT, {
      message: "用途地域を選択してください",
    })
    .default("first-residential"),
  buildingCoverageRatio: z.string().optional().default(""),
  floorAreaRatio: z.string().optional().default(""),
  totalProperties: z.string().optional().default(""),
  developmentPermitNumber: z.string().optional().default(""),
  developmentArea: z.string().optional().default(""),
  residentialPermitNumber: z.string().optional().default(""),
  easement: z.string().optional().default(""),
  nationalLandAct: z.string().optional().default(""),
  siteRights: z.string().optional().default(""),
  propertyStatus: z.string().optional().default(""),
  lotNumber: z.string().optional().default(""),

  // ============================================
  // 設備・特性（FacilitiesTab）
  // ============================================
  facilities: z.array(z.string()).optional().default([]),
  parkingAvailable: z.string().optional().default("none"),
  parkingFee: z.string().optional().default(""),
  parkingDetail: z.string().optional().default(""),
  managementFee: z
    .string({ message: "管理費・共益費（円）を入力してください" })
    .min(1, "管理費・共益費（円）を入力してください"),
  repairReserve: z.string().optional().default(""),
  managementType: z.string().optional().default(""),
  reform: z.string().optional().default(""),
  mainLightingFacilities: z.string().optional().default(""),
  expectedAnnualIncome: z.string().optional().default(""),
  surfaceYield: z.string().optional().default(""),

  // ============================================
  // 説明・環境（DescriptionTab）
  // ============================================
  environment: z.string().optional().default(""),
  expenses: z.string().optional().default(""),
  parkingInfo: z.string().optional().default(""),
  otherExpenses: z.string().optional().default(""),
  legalRestrictions: z.string().optional().default(""),
  otherConstructionInfo: z.string().optional().default(""),

  // ============================================
  // メディア・公開（MediaTab）
  // ============================================
  images: z.array(z.any()).optional().default([]),
  propertyCategory: z.string().optional().default("mansion"),
  inquiryCount: z.number().default(0),
  featured: z.string().optional().default("normal"),
  publicScope: z.string().optional().default("public"),
  publicationStatus: z
    .enum(PUBLICATION_STATUS, {
      message: "公開設定を選択してください",
    })
    .default("published"),
  nextUpdateDate: z.date({
    message: "次回更新予定日を選択してください",
  }),
  validUntilDate: z.date().optional(),
  publicationMedium: z.string().optional().default("web"),
  featurePeriodStart: z.date().optional(),
  featurePeriodEnd: z.date().optional(),
  publicScopeReservation: z.string().optional().default("none"),
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
  remarks: z.string().optional().default(""),
  adminMemo: z.string().optional().default(""),
});

export type RealtorFormData = z.infer<typeof realtorSchema>;
