import type { SearchDataService, SearchOption, SearchOptions } from "./types";

// ダミーデータをインポート
import searchOptionsData from "./search-options.json";

// 将来的にDBから取得する際のサービス実装
export class SearchDataServiceImpl implements SearchDataService {
  private data: SearchOptions = searchOptionsData as SearchOptions;

  // エリア一覧を取得
  async getAreas(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.areas;
  }

  // 都道府県一覧を取得
  async getPrefectures(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.prefectures;
  }

  // 市区町村一覧を取得（都道府県でフィルタリング可能）
  async getCities(prefecture?: string): Promise<SearchOption[]> {
    // 都道府県別の市区町村ダミーデータ
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

    // 都道府県が指定されていて、ダミーデータに存在する場合はそれを返す
    if (prefecture && citiesByPrefecture[prefecture]) {
      return citiesByPrefecture[prefecture];
    }

    // デフォルトは空配列を返す（都道府県が選択されていない場合）
    return [];
  }

  // 路線一覧を取得
  async getRoutes(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.routes;
  }

  // 駅一覧を取得（路線でフィルタリング可能）
  async getStations(route?: string): Promise<SearchOption[]> {
    // 将来的にはDBから取得し、路線でフィルタリング
    if (route) {
      // 路線に応じた駅を返すロジック
      return this.data.stations;
    }
    return this.data.stations;
  }

  // 間取り一覧を取得
  async getFloorPlans(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.floorPlans;
  }

  // 物件種別一覧を取得
  async getPropertyTypes(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.propertyTypes;
  }

  // 不動産業者一覧を取得
  async getRealEstateCompanies(): Promise<SearchOption[]> {
    // 将来的にはDBから取得
    return this.data.realEstateCompanies;
  }
}

// シングルトンインスタンス
export const searchDataService = new SearchDataServiceImpl();
