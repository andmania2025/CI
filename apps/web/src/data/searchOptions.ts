import type { TTag } from "@/components/ui/multiple-select";

// 取扱物件種別のオプション
export const PROPERTY_TYPE_OPTIONS: TTag[] = [
  { key: "sale", name: "売買不動産", category: "transaction" },
  { key: "other", name: "その他", category: "other" },
  { key: "rental", name: "賃貸不動産", category: "transaction" },
  { key: "investment", name: "投資用・事業用不動産", category: "transaction" },
];

// 取引形態のオプション
export const TRANSACTION_TYPE_OPTIONS: TTag[] = [
  { key: "seller", name: "売主 (不動産買取)", category: "transaction" },
  { key: "lender", name: "貸主", category: "transaction" },
  { key: "broker", name: "仲介 (不動産媒介)", category: "transaction" },
];

// 不動産種別のオプション
export const PROPERTY_CATEGORY_OPTIONS: TTag[] = [
  { key: "ikkodate", name: "一戸建て", category: "residential" },
  { key: "mansion", name: "マンション", category: "residential" },
  { key: "land", name: "土地", category: "land" },
  { key: "apartment", name: "アパート", category: "residential" },
  {
    key: "commercial",
    name: "店舗・事務所・倉庫・工場",
    category: "commercial",
  },
  { key: "accommodation", name: "宿泊施設", category: "commercial" },
  { key: "leased_land", name: "底地・借地", category: "land" },
  { key: "parking", name: "駐車場", category: "commercial" },
  { key: "entire_building", name: "一棟ビル", category: "commercial" },
  { key: "entire_mansion", name: "一棟マンション", category: "residential" },
  { key: "other", name: "その他", category: "other" },
  { key: "none", name: "該当なし", category: "other" },
];

// 物件特徴のオプション
export const PROPERTY_FEATURES_OPTIONS: TTag[] = [
  { key: "general", name: "一般物件", category: "condition" },
  { key: "leased_land", name: "底地・借地", category: "condition" },
  { key: "urban_control", name: "市街地調整区域・農地", category: "condition" },
  { key: "sloping_land", name: "傾斜地・擁壁", category: "condition" },
  { key: "row_house", name: "連棟式建物", category: "condition" },
  { key: "disclosure", name: "告知事項", category: "condition" },
  { key: "forest", name: "山林", category: "condition" },
  { key: "private_road", name: "私道", category: "condition" },
  { key: "no_rebuild", name: "再建築不可", category: "condition" },
  { key: "co_ownership", name: "共有持分", category: "condition" },
  { key: "auction", name: "競売・任意売却", category: "condition" },
  { key: "other", name: "その他", category: "condition" },
  { key: "none", name: "該当なし", category: "condition" },
];
