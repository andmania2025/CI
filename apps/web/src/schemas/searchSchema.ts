import { z } from "zod";

// 検索フィルターのスキーマ
export const propertySearchFiltersSchema = z.object({
  propertyType: z.string().optional(),
  keyword: z.string().optional(),
  location: z.string().optional(),
  priceRange: z.string().optional(),
  area: z.string().optional(),
  access: z.string().optional(),
  buildingType: z.string().optional(),
  floor: z.string().optional(),
  rooms: z.string().optional(),
  year: z.string().optional(),
});

// 検索結果のページネーション
export const searchPaginationSchema = z.object({
  currentPage: z.number().min(1),
  totalPages: z.number().min(1),
  totalItems: z.number().min(0),
  itemsPerPage: z.number().min(1),
});

// 検索状態のスキーマ
export const searchStateSchema = z.object({
  filters: propertySearchFiltersSchema,
  pagination: searchPaginationSchema,
  isLoading: z.boolean(),
  error: z.string().nullable(),
  lastSearchTime: z.number().nullable(),
});

// フォーム用の検索スキーマ（PropertySearchFormで使用）
export const propertySearchFormSchema = z.object({
  propertyType: z.string().optional(),
  keyword: z.string().optional(),
});

// TypeScript型をエクスポート
export type PropertySearchFilters = z.infer<typeof propertySearchFiltersSchema>;
export type SearchPagination = z.infer<typeof searchPaginationSchema>;
export type SearchState = z.infer<typeof searchStateSchema>;
export type PropertySearchFormValues = z.infer<typeof propertySearchFormSchema>;

// 検索結果の型（物件データ用）
export const searchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["sale", "rental"]),
  price: z.string(),
  location: z.string(),
  image: z.string(),
  details: z.record(z.string(), z.string()),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
