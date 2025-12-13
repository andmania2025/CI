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

export interface SearchDataService {
  getAreas(): Promise<SearchOption[]>;
  getPrefectures(): Promise<SearchOption[]>;
  getCities(prefecture?: string): Promise<SearchOption[]>;
  getRoutes(): Promise<SearchOption[]>;
  getStations(route?: string): Promise<SearchOption[]>;
  getFloorPlans(): Promise<SearchOption[]>;
  getPropertyTypes(): Promise<SearchOption[]>;
  getRealEstateCompanies(): Promise<SearchOption[]>;
}
