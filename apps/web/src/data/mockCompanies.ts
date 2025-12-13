export interface Company {
  id: string;
  name: string;
  location: string;
  propertyTypes: string[];
  propertyFeatures: string[];
  appraisalMethods: string[];
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "有限会社エムズエステート",
    location: "三重県名張市希央台4番町53番地",
    propertyTypes: [
      "一戸建て",
      "マンション",
      "土地",
      "アパート",
      "店舗・事務所・倉庫・工場",
      "宿泊施設",
      "一棟ビル",
      "一棟マンション",
      "その他",
    ],
    propertyFeatures: ["一般物件", "市街地調整区域・農地", "告知事項", "山林", "競売・任意売却"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定", "成約価格査定"],
  },
  {
    id: "2",
    name: "伊勢崎市",
    location: "群馬県伊勢崎市今泉町二丁目410",
    propertyTypes: [
      "一戸建て",
      "マンション",
      "土地",
      "アパート",
      "店舗・事務所・倉庫・工場",
      "宿泊施設",
      "一棟ビル",
      "一棟マンション",
      "その他",
    ],
    propertyFeatures: ["一般物件", "市街地調整区域・農地", "告知事項", "山林", "競売・任意売却"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定", "成約価格査定"],
  },
  {
    id: "3",
    name: "株式会社 ジャパンリアルエステート",
    location: "大阪府吹田市朝日町13番2号",
    propertyTypes: ["土地", "店舗・事務所・倉庫・工場", "駐車場"],
    propertyFeatures: ["一般物件"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定"],
  },
  {
    id: "4",
    name: "徳島県板野郡北島町",
    location: "徳島県板野郡北島町北村字北村",
    propertyTypes: ["一戸建て", "マンション", "土地", "アパート"],
    propertyFeatures: ["一般物件", "市街地調整区域・農地"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定"],
  },
  {
    id: "5",
    name: "株式会社 アーバンライフ",
    location: "東京都新宿区西新宿1-1-1",
    propertyTypes: ["一戸建て", "マンション", "土地", "アパート", "店舗・事務所・倉庫・工場"],
    propertyFeatures: ["一般物件", "告知事項"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定", "成約価格査定"],
  },
  {
    id: "6",
    name: "横浜市",
    location: "神奈川県横浜市中区本町6-50-10",
    propertyTypes: [
      "一戸建て",
      "マンション",
      "土地",
      "アパート",
      "店舗・事務所・倉庫・工場",
      "宿泊施設",
    ],
    propertyFeatures: ["一般物件", "市街地調整区域・農地", "告知事項", "山林"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定", "成約価格査定"],
  },
  {
    id: "7",
    name: "株式会社 プロパティマネジメント",
    location: "大阪府大阪市北区梅田1-1-1",
    propertyTypes: ["一戸建て", "マンション", "土地", "アパート", "一棟ビル", "一棟マンション"],
    propertyFeatures: ["一般物件", "告知事項", "競売・任意売却"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定"],
  },
  {
    id: "8",
    name: "名古屋市",
    location: "愛知県名古屋市中区三の丸3-1-1",
    propertyTypes: [
      "一戸建て",
      "マンション",
      "土地",
      "アパート",
      "店舗・事務所・倉庫・工場",
      "宿泊施設",
      "一棟ビル",
      "一棟マンション",
    ],
    propertyFeatures: ["一般物件", "市街地調整区域・農地", "告知事項", "山林", "競売・任意売却"],
    appraisalMethods: ["売出し価格査定", "買取り価格査定", "成約価格査定"],
  },
];
