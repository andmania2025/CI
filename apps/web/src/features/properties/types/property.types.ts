// 基本的な物件詳細情報
export interface PropertyDetails {
  location: string;
  access: string;
  buildingType: string;
  floor: string;
  rooms: string;
  area: string;
  year: string;
  deposit?: string;
  keyMoney?: string;
}

// 基本的な物件情報
export interface BaseProperty {
  id: number;
  title: string;
  image: string;
  description: string;
  details: PropertyDetails;
}

// 賃貸物件
export interface RentalProperty extends BaseProperty {
  type: "rental";
  rent: string;
}

// 売却物件
export interface SaleProperty extends BaseProperty {
  type: "sale";
  price: string;
}

// マンション物件（売却用）
export interface MansionProperty extends Omit<SaleProperty, "type"> {
  type: "mansion";
  price: string;
}

// ユニオン型で全物件タイプを表現
export type Property = RentalProperty | SaleProperty | MansionProperty;

// 検索フィルター
export interface PropertySearchFilters {
  propertyType?: string;
  location?: string;
  priceRange?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: string;
  area?: string;
}

// 検索結果
export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 検索パラメータ
export interface PropertySearchParams {
  filters: PropertySearchFilters;
  page?: number;
  limit?: number;
  sortBy?: "price" | "date" | "area";
  sortOrder?: "asc" | "desc";
}

// API レスポンス型
export interface PropertyApiResponse<T = Property[]> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// 物件カードのvariant
export type PropertyCardVariant = "horizontal" | "vertical";

// 物件タイプの定数
export const PROPERTY_TYPES = {
  RENTAL: "rental",
  SALE: "sale",
  MANSION: "mansion",
} as const;

export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

// 価格帯の定数
export const PRICE_RANGES = {
  UNDER_500: "0-500",
  UNDER_1000: "500-1000",
  UNDER_1500: "1000-1500",
  UNDER_2000: "1500-2000",
  OVER_2000: "2000+",
} as const;

export type PriceRange = (typeof PRICE_RANGES)[keyof typeof PRICE_RANGES];

// 都道府県の定数
export const PREFECTURES = {
  HOKKAIDO: "hokkaido",
  TOKYO: "tokyo",
  OSAKA: "osaka",
  KYOTO: "kyoto",
  HYOGO: "hyogo",
  SHIGA: "shiga",
} as const;

export type Prefecture = (typeof PREFECTURES)[keyof typeof PREFECTURES];
