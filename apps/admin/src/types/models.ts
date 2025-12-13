// 物件画像の型定義
export interface PropertyImage {
  id: string;
  url: string;
  imageType: "EXTERIOR" | "INTERIOR" | "FLOOR_PLAN" | "MAP" | "OTHER"; // Phase 2: Prismaスキーマと一致
  caption?: string; // alt/titleをcaptionに統合
  alt?: string; // 後方互換性のため
  title?: string; // 後方互換性のため
  order: number;
  isMain?: boolean; // メイン画像フラグ（UI用）
  createdAt?: string;
  uploadedAt?: string; // 後方互換性のため
}

// 物件データの型定義
export interface Property {
  id: string;
  title: string;
  publicationStatus: string;
  updateDate: string;
  nextUpdateDate: string;
  inquiryCount: number;
  actions: string;

  // 基本情報
  realEstateCompany?: string;
  prefecture?: string;
  city?: string;
  town?: string;
  nearestStation?: string;

  // 物件詳細
  propertyType?: string;
  price?: number;
  priceType?: "rent" | "sale"; // 賃料 or 売買
  managementFee?: number;
  deposit?: number;
  keyMoney?: number;
  securityDeposit?: number;
  floorPlan?: string;
  exclusiveArea?: number;
  landArea?: number;
  buildingAge?: number;
  buildingStructure?: string;
  totalFloors?: number;
  floor?: number;
  availableFrom?: string;
  contractPeriod?: string;
  contractValidityPeriod?: string;
  petAllowed?: boolean;
  instrumentAllowed?: boolean;

  // 追加された物件詳細項目
  buildingConditions?: string; // 建築条件
  buildingArea?: number; // 建物面積・専有面積
  floorPlanDetails?: string; // 間取り詳細
  contractor?: string; // 施工業者
  constructionDate?: string; // 建築年月
  buildingConfirmationNumber?: string; // 建築確認番号
  balconyArea?: number; // バルコニー面積
  repairReserve?: number; // 修繕積立金
  managementType?: string; // 管理形態
  renovation?: string; // リフォーム
  mainLighting?: string; // 主要採光面
  estimatedAnnualIncome?: number; // 想定年間収入

  // 土地・建物詳細項目
  totalUnits?: number; // 総戸数・総区画数
  saleUnits?: number; // 販売戸数・販売区画数
  landRights?: string; // 土地権利
  setback?: number; // セットバック
  privateRoadBurden?: number; // 私道負担面積
  delivery?: string; // 引渡
  currentStatus?: string; // 現況
  cityPlanning?: string; // 都市計画
  roadSituation?: string; // 接道状況
  landUse?: string; // 地目
  zoning?: string; // 用途地域
  buildingCoverageRatio?: number; // 建ぺい率
  floorAreaRatio?: number; // 容積率
  developmentPermitNumber?: string; // 開発許可番号
  developmentArea?: number; // 開発面積
  landReadjustmentPermitNumber?: string; // 宅地造成工事許可番号
  easement?: string; // 地役権
  landTransactionNotification?: string; // 国土法届出
  waterSupply?: string; // 上水道
  sewerage?: string; // 下水道
  gas?: string; // ガス

  // 追加された物件詳細項目
  surfaceYield?: number; // 表面利回り
  otherExpenses?: string; // その他費用等
  legalRestrictions?: string; // 法令上制限
  otherImportantMatters?: string; // その他重要事項等

  // 設備・特徴
  kitchen?: {
    ihStove?: boolean;
    gasStove?: boolean;
    systemKitchen?: boolean;
  };
  bathroom?: {
    separateBathToilet?: boolean;
    reheating?: boolean;
    bathDryer?: boolean;
  };
  cooling?: {
    airConditioner?: boolean;
    floorHeating?: boolean;
  };
  security?: {
    autoLock?: boolean;
    securityCamera?: boolean;
    tvIntercom?: boolean;
  };
  storage?: {
    walkInCloset?: boolean;
    shoebox?: boolean;
  };
  otherEquipment?: {
    elevator?: boolean;
    deliveryBox?: boolean;
    parking?: boolean;
    bicycleParking?: boolean;
  };
  internet?: string;
  characteristics?: string[];
  remarks?: string;
  description?: string;

  // 掲載設定
  category?: string;
  portalSites?: string[];
  publicScope?: string;
  priorityDisplay?: string;
  publicationStartDate?: string;
  publicationEndDate?: string;
  staffInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  freeFields?: Record<string, string>;

  // 画像管理
  images?: PropertyImage[];
}

// Phase 3: 特徴マスタ対応
export interface FeatureMaster {
  id: string;
  name: string;
  category: "SECURITY" | "FACILITY" | "LOCATION" | "STRUCTURE" | "OTHER";
  displayOrder: number;
  isActive: boolean;
}

export interface PropertyFeature {
  id: string;
  featureId: string;
  feature?: FeatureMaster;
  propertyId: string;
}
