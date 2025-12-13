// Zustand Stores
// ルール: 02_frontend.mdc に従い、グローバルクライアント状態は Zustand で管理

// 作成済みのストア
export { useFavoritesStore } from "./favoritesStore";
export { useSearchStore } from "./searchStore";
export { useUiStore } from "./uiStore";

// 型エクスポート（必要に応じて）
export type {
  FavoriteItem,
  FavoriteFilter,
  FavoriteCounts,
} from "@/schemas/favoritesSchema";
export type {
  PropertySearchFilters,
  SearchResult,
} from "@/schemas/searchSchema";
