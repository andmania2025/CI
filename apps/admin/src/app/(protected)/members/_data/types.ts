// 検索オプションの型定義
export interface SearchOption {
  value: string;
  label: string;
}

export interface SearchOptions {
  areas: SearchOption[];
  prefectures: SearchOption[];
  cities: SearchOption[];
  routes: SearchOption[];
  stations: SearchOption[];
  floorPlans: SearchOption[];
  propertyTypes: SearchOption[];
  realEstateCompanies: SearchOption[];
}

// 検索データを取得する関数の型定義
export interface SearchDataService {
  getAreas: () => Promise<SearchOption[]>;
  getPrefectures: () => Promise<SearchOption[]>;
  getCities: (prefecture?: string) => Promise<SearchOption[]>;
  getRoutes: () => Promise<SearchOption[]>;
  getStations: (route?: string) => Promise<SearchOption[]>;
  getFloorPlans: () => Promise<SearchOption[]>;
  getPropertyTypes: () => Promise<SearchOption[]>;
  getRealEstateCompanies: () => Promise<SearchOption[]>;
}
