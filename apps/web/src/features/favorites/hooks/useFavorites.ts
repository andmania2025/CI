import type {
  FavoriteCounts,
  FavoriteFilter,
  FavoriteItem as ZustandFavoriteItem,
} from "@/schemas/favoritesSchema";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useCallback, useMemo } from "react";

// 既存のFavoriteItem型（addedAt付き）をインポート
import type { FavoriteItem } from "@/lib/services/favorites";

// 後方互換性のため、既存の型を再エクスポート
export type { FavoriteFilter, FavoriteCounts, FavoriteItem };

export const useFavorites = () => {
  // Zustand ストアから状態とアクションを取得
  const {
    favorites: zustandFavorites,
    filter,
    isLoading,
    loadFavorites,
    setFilter,
    addFavorite: storeAddFavorite,
    removeFavorite: storeRemoveFavorite,
    clearAllFavorites: storeClearAllFavorites,
    isFavorite: storeIsFavorite,
    // Supabase接続後の追加アクション（コメントアウト）
    // loadFavoritesFromSupabase,
  } = useFavoritesStore();

  // ZustandのFavoriteItemを既存のFavoriteItem（addedAt付き）に変換
  const favorites = useMemo((): FavoriteItem[] => {
    return zustandFavorites.map((item) => ({
      ...item,
      addedAt: new Date(), // 現在の日時を設定（実際のプロダクションでは保存された日時を使用）
    }));
  }, [zustandFavorites]);

  // フィルタリング済みのお気に入り
  const filteredFavorites = useMemo(() => {
    if (filter === "all") return favorites;
    return favorites.filter((item) => item.type === filter);
  }, [favorites, filter]);

  // カウント数の計算
  const counts = useMemo(
    (): FavoriteCounts => ({
      all: favorites.length,
      sale: favorites.filter((f) => f.type === "sale").length,
      rental: favorites.filter((f) => f.type === "rental").length,
    }),
    [favorites],
  );

  // 全てのお気に入りをクリア（確認ダイアログ付き）
  const clearAllFavorites = useCallback(async () => {
    if (window.confirm("すべてのお気に入りを削除しますか？")) {
      await storeClearAllFavorites();
    }
  }, [storeClearAllFavorites]);

  // 個別のお気に入りを削除
  const removeFavorite = useCallback(
    async (id: string, type: FavoriteItem["type"]) => {
      return await storeRemoveFavorite(id, type);
    },
    [storeRemoveFavorite],
  );

  // お気に入りに追加（既存のインターフェースを保持）
  const addFavorite = useCallback(
    async (item: Omit<FavoriteItem, "addedAt">) => {
      // Zustandストアで期待される形式に変換（addedAtを除外）
      const favoriteItem: ZustandFavoriteItem = {
        id: item.id,
        type: item.type,
        title: item.title,
        image: item.image,
        price: item.price,
        rent: item.rent,
        description: item.description,
        details: {
          location: item.details.location || "",
          access: item.details.access || "",
          buildingType: item.details.buildingType || "",
          floor: item.details.floor || "",
          rooms: item.details.rooms || "",
          area: item.details.area || "",
          year: item.details.year || "",
          // 追加フィールド
          landArea: item.details.landArea || "",
          buildingArea: item.details.buildingArea || "",
          structure: item.details.structure || "",
          yieldRate: item.details.yieldRate || "",
        },
      };

      return await storeAddFavorite(favoriteItem);
    },
    [storeAddFavorite],
  );

  // お気に入り状態を確認
  const isFavorite = useCallback(
    (id: string, type: FavoriteItem["type"]) => {
      return storeIsFavorite(id, type);
    },
    [storeIsFavorite],
  );

  // フィルターの変更
  const handleFilterChange = useCallback(
    (newFilter: FavoriteFilter) => {
      setFilter(newFilter);
    },
    [setFilter],
  );

  // 既存のインターフェースを保持してエクスポート
  return {
    favorites,
    filteredFavorites,
    filter,
    setFilter: handleFilterChange,
    clearAllFavorites,
    removeFavorite,
    addFavorite,
    isFavorite,
    loadFavorites,
    counts,
    isLoading, // 新しく追加（Zustand の利点）
    // 追加のヘルパー（既存の互換性を保持）
    isEmpty: favorites.length === 0,
    filteredIsEmpty: filteredFavorites.length === 0,
    // Supabase接続後の追加関数（コメントアウト）
    // loadFavoritesFromSupabase,
  };
};
