import { useQuery } from "@tanstack/react-query";

/**
 * 市区町村データの型定義
 */
export interface CityOption {
  city: string;
  suburb: string;
}

/**
 * APIレスポンスの型定義
 */
interface CitiesApiResponse {
  success: boolean;
  data?: CityOption[];
  error?: string;
}

/**
 * 都道府県名から市区町村データを取得する関数
 * 
 * 注意: 将来的に郵便局の公式APIに接続予定
 * 現時点では既存の/api/cities routeを使用
 * 
 * @param prefectureName 都道府県名（例: "東京都"）
 * @returns 市区町村データの配列
 */
const fetchCities = async (prefectureName: string): Promise<CityOption[]> => {
  if (!prefectureName) {
    return [];
  }

  const response = await fetch(`/api/cities?prefecture=${encodeURIComponent(prefectureName)}`);
  
  if (!response.ok) {
    throw new Error(`市区町村データの取得に失敗しました: ${response.status}`);
  }

  const result: CitiesApiResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "市区町村データの取得に失敗しました");
  }

  return result.data;
};

/**
 * 都道府県名から市区町村データを取得するTanStack Query hook
 * 
 * @param prefectureName 都道府県名（例: "東京都"）
 * @param enabled クエリを有効にするかどうか（都道府県が選択されている場合のみ）
 * @returns TanStack Queryの結果
 */
export const useCitiesQuery = (prefectureName: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ["cities", prefectureName],
    queryFn: () => {
      if (!prefectureName) {
        throw new Error("都道府県名が指定されていません");
      }
      return fetchCities(prefectureName);
    },
    enabled: enabled && !!prefectureName,
    staleTime: 1000 * 60 * 10, // 10分間キャッシュ（市区町村データは頻繁に変更されないため）
    gcTime: 1000 * 60 * 30, // 30分間キャッシュを保持
  });
};

