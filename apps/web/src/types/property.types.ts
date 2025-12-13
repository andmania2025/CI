// 統一された物件型定義

// 基本的な物件詳細情報
export interface PropertyDetails {
  location: string;
  access: string;
  buildingType?: string;
  floor?: string;
  rooms?: string;
  area?: string;
  year?: string;
  deposit?: string;
  keyMoney?: string;
}

// 基本的な物件情報
export interface BaseProperty {
  id: string;
  title: string;
  price: string;
  image: string;
  description?: string;
  details: PropertyDetails;
  type: "sale" | "rental";
}

// お気に入り用の物件情報（既存のFavoriteItem形式に対応）
export interface FavoritePropertyItem {
  id: string;
  type: "sale" | "rental";
  title: string;
  image: string;
  price?: string; // 売買物件の場合
  rent?: string; // 賃貸物件の場合
  description: string;
  details: PropertyDetails;
}

// 検索結果用の物件情報
export interface SearchPropertyResult extends BaseProperty {
  relevanceScore?: number;
  highlightedTitle?: string;
  isPromoted?: boolean;
}

// マーケティング用の物件情報（MockPropertyとの互換性を保持）
export interface MarketingProperty {
  id: string;
  imageSrc: string;
  title: string;
  location: string;
  station: string;
  price: string;
  area?: string;
  builtYear?: string;
  layout?: string;
  floor?: string;
  landArea?: string;
  buildingArea?: string;
  constructionYear?: string;
  structure?: string;
  yieldRate?: string;
  transportation?: string; // 交通手段
  isRental?: boolean;
  linkUrl?: string; // 外部リンク
}

// 型変換ユーティリティ関数
export const convertMarketingToBase = (marketing: MarketingProperty): BaseProperty => {
  return {
    id: marketing.id,
    title: marketing.title,
    price: marketing.price,
    image: marketing.imageSrc,
    description: `${marketing.location} ${marketing.station}`,
    details: {
      location: marketing.location,
      access: marketing.station,
      buildingType: marketing.structure || "不明",
      floor: marketing.floor || "",
      rooms: marketing.layout || "",
      area: marketing.area || marketing.landArea || marketing.buildingArea || "",
      year: marketing.builtYear || marketing.constructionYear || "",
      deposit: marketing.isRental ? "要相談" : undefined,
      keyMoney: marketing.isRental ? "要相談" : undefined,
    },
    type: marketing.isRental ? "rental" : "sale",
  };
};

export const convertBaseToFavorite = (base: BaseProperty): FavoritePropertyItem => {
  return {
    id: base.id,
    type: base.type,
    title: base.title,
    image: base.image,
    price: base.type === "sale" ? base.price : undefined,
    rent: base.type === "rental" ? base.price : undefined,
    description: base.description || "",
    details: base.details,
  };
};

// プロパティリスト関連の型
export interface PropertyListProps {
  properties: BaseProperty[];
  layout?: "grid" | "list";
  showPagination?: boolean;
  itemsPerPage?: number;
}

export interface PropertyGridProps {
  properties: BaseProperty[];
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

// 検索・フィルタリング関連
export interface PropertyFilters {
  type?: "sale" | "rental" | "all";
  location?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  area?: {
    min?: number;
    max?: number;
  };
  rooms?: string[];
  buildingType?: string[];
}

// API応答型
export interface PropertyApiResponse {
  properties: BaseProperty[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PropertyDetailApiResponse extends BaseProperty {
  additionalImages?: string[];
  contactInfo?: {
    agentName: string;
    phone: string;
    email: string;
  };
  virtualTourUrl?: string;
  nearbyFacilities?: {
    schools: string[];
    stations: string[];
    shopping: string[];
  };
}
