import searchOptionsData from "@/services/search-options.json";
import type { SearchOption, SearchOptions } from "@/types/search";

// Mock data for now, will be replaced by DB calls
const data: SearchOptions = searchOptionsData as SearchOptions;

export const searchDal = {
  getAreas: async (): Promise<SearchOption[]> => {
    return data.areas;
  },

  getPrefectures: async (): Promise<SearchOption[]> => {
    return data.prefectures;
  },

  getCities: async (prefecture?: string): Promise<SearchOption[]> => {
    // Mock logic from original service
    const citiesByPrefecture: Record<string, SearchOption[]> = {
      tokyo: [
        { value: "chiyoda", label: "千代田区" },
        { value: "chuo", label: "中央区" },
        { value: "minato", label: "港区" },
        { value: "shinjuku", label: "新宿区" },
        { value: "bunkyo", label: "文京区" },
        { value: "taito", label: "台東区" },
        { value: "sumida", label: "墨田区" },
        { value: "koto", label: "江東区" },
        { value: "shinagawa", label: "品川区" },
        { value: "meguro", label: "目黒区" },
        { value: "shibuya", label: "渋谷区" },
        { value: "nakano", label: "中野区" },
        { value: "suginami", label: "杉並区" },
        { value: "toshima", label: "豊島区" },
        { value: "kita", label: "北区" },
        { value: "arakawa", label: "荒川区" },
        { value: "itabashi", label: "板橋区" },
        { value: "nerima", label: "練馬区" },
        { value: "adachi", label: "足立区" },
        { value: "katsushika", label: "葛飾区" },
        { value: "edogawa", label: "江戸川区" },
      ],
      kanagawa: [
        { value: "yokohama", label: "横浜市" },
        { value: "kawasaki", label: "川崎市" },
        { value: "yokosuka", label: "横須賀市" },
        { value: "odawara", label: "小田原市" },
        { value: "kamakura", label: "鎌倉市" },
      ],
      saitama: [
        { value: "saitama-shi", label: "さいたま市" },
        { value: "kawagoe", label: "川越市" },
        { value: "kawaguchi", label: "川口市" },
        { value: "omiya", label: "大宮市" },
        { value: "urawa", label: "浦和市" },
      ],
      chiba: [
        { value: "chiba-shi", label: "千葉市" },
        { value: "funabashi", label: "船橋市" },
        { value: "matsudo", label: "松戸市" },
        { value: "narita", label: "成田市" },
      ],
    };

    if (prefecture && citiesByPrefecture[prefecture]) {
      return citiesByPrefecture[prefecture];
    }
    return [];
  },

  getRoutes: async (): Promise<SearchOption[]> => {
    return data.routes;
  },

  getStations: async (route?: string): Promise<SearchOption[]> => {
    if (route) {
      return data.stations;
    }
    return data.stations;
  },

  getFloorPlans: async (): Promise<SearchOption[]> => {
    return data.floorPlans;
  },

  getPropertyTypes: async (): Promise<SearchOption[]> => {
    return data.propertyTypes;
  },

  getRealEstateCompanies: async (): Promise<SearchOption[]> => {
    return data.realEstateCompanies;
  },
};
