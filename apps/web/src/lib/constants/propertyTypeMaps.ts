/**
 * 物件種別マッピング定数
 * 売買物件と賃貸物件の種別を統一管理
 */

// 売買物件の種別マッピング
export const SALE_PROPERTY_TYPE_MAP: Record<string, string> = {
  mansion: "マンション",
  house: "一戸建て",
  land: "土地",
  commercial: "店舗・事務所・倉庫・工場",
  building: "一棟ビル・一棟マンション",
  apartment: "アパート",
  other: "その他（宿泊施設等）",
};

// 賃貸物件の種別マッピング
export const RENTAL_PROPERTY_TYPE_MAP: Record<string, string> = {
  rental_apartment: "アパート・マンション",
  rental_house: "一戸建て",
  rental_commercial: "店舗・事務所・倉庫・工場",
  rental_other: "その他(貸土地、駐車場等)",
};

// 全物件種別マッピング（売買 + 賃貸）
export const PROPERTY_TYPE_MAP: Record<string, string> = {
  ...SALE_PROPERTY_TYPE_MAP,
  ...RENTAL_PROPERTY_TYPE_MAP,
};

/**
 * 物件種別キーから表示ラベルを取得
 * @param propertyTypeKey - 物件種別のキー（例: "mansion", "rental_apartment"）
 * @returns 表示ラベル（見つからない場合はnull）
 */
export const getPropertyTypeLabel = (propertyTypeKey: string | null): string | null => {
  if (!propertyTypeKey) return null;
  return PROPERTY_TYPE_MAP[propertyTypeKey] || null;
};

/**
 * 売買物件の種別キーから表示ラベルを取得
 * @param propertyTypeKey - 売買物件種別のキー
 * @returns 表示ラベル（見つからない場合はnull）
 */
export const getSalePropertyTypeLabel = (propertyTypeKey: string | null): string | null => {
  if (!propertyTypeKey) return null;
  return SALE_PROPERTY_TYPE_MAP[propertyTypeKey] || null;
};

/**
 * 賃貸物件の種別キーから表示ラベルを取得
 * @param propertyTypeKey - 賃貸物件種別のキー
 * @returns 表示ラベル（見つからない場合はnull）
 */
export const getRentalPropertyTypeLabel = (propertyTypeKey: string | null): string | null => {
  if (!propertyTypeKey) return null;
  return RENTAL_PROPERTY_TYPE_MAP[propertyTypeKey] || null;
};
