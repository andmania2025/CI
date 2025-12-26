import type {
  MansionProperty,
  PropertySearchFilters,
} from "@/features/properties/types/property.types";
import { useQuery } from "@tanstack/react-query";

/**
 * APIレスポンスの型定義
 */
interface PropertySearchApiResponse {
  properties: MansionProperty[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * プロパティ検索パラメータの型定義
 */
export interface PropertySearchParams {
  filters: PropertySearchFilters;
  page?: number;
  limit?: number;
}

/**
 * プロパティ検索を実行する関数
 *
 * @param params 検索パラメータ
 * @returns 検索結果
 */
const fetchProperties = async (
  params: PropertySearchParams,
): Promise<PropertySearchApiResponse> => {
  const { filters, page = 1, limit = 8 } = params;

  // クエリパラメータを構築
  const searchParams = new URLSearchParams();
  if (filters.location) {
    searchParams.append("location", filters.location);
  }
  if (filters.priceRange) {
    searchParams.append("priceRange", filters.priceRange);
  }
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());

  const response = await fetch(`/api/properties?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`プロパティ検索に失敗しました: ${response.status}`);
  }

  const result: PropertySearchApiResponse = await response.json();
  return result;
};

/**
 * プロパティ検索を実行するTanStack Query hook
 *
 * @param params 検索パラメータ
 * @param enabled クエリを有効にするかどうか
 * @returns TanStack Queryの結果
 */
export const usePropertySearchQuery = (
  params: PropertySearchParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: [
      "properties",
      "search",
      params.filters,
      params.page,
      params.limit,
    ],
    queryFn: () => fetchProperties(params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2分間キャッシュ
    gcTime: 1000 * 60 * 5, // 5分間キャッシュを保持
  });
};
