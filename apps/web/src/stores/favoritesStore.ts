import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  FavoriteCounts,
  FavoriteFilter,
  FavoriteItem,
} from "@/schemas/favoritesSchema";

// 既存の favorites サービスを import（移行期間中）
import {
  addToFavorites,
  isFavorite as checkIsFavorite,
  clearFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/lib/services/favorites";

// Supabase接続後のインポート（コメントアウト）
// import { createClient } from '@supabase/supabase-js';

interface FavoritesState {
  // 状態
  favorites: FavoriteItem[];
  filter: FavoriteFilter;
  isLoading: boolean;

  // 計算済みプロパティ
  filteredFavorites: FavoriteItem[];
  counts: FavoriteCounts;

  // アクション
  loadFavorites: () => void;
  setFilter: (filter: FavoriteFilter) => void;
  addFavorite: (item: FavoriteItem) => Promise<boolean>;
  removeFavorite: (id: string, type: FavoriteItem["type"]) => Promise<boolean>;
  clearAllFavorites: () => Promise<boolean>;
  isFavorite: (id: string, type: FavoriteItem["type"]) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      // 初期状態
      favorites: [],
      filter: "all",
      isLoading: false,

      // 計算済みプロパティのゲッター
      get filteredFavorites() {
        const { favorites, filter } = get();
        if (filter === "all") return favorites;
        return favorites.filter((item) => item.type === filter);
      },

      get counts() {
        const { favorites } = get();
        return {
          all: favorites.length,
          sale: favorites.filter((f) => f.type === "sale").length,
          rental: favorites.filter((f) => f.type === "rental").length,
        };
      },

      // アクション
      loadFavorites: () => {
        // DB接続前のローカルストレージからの読み込み
        try {
          const favoritesWithDate = getFavorites();
          // addedAtプロパティを除去してZustandスキーマに合わせる
          const favorites = favoritesWithDate.map((fullItem) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { addedAt, ...item } = fullItem;
            return item;
          });

          // 現在の状態と比較して、変更がある場合のみ更新
          const currentState = get();
          if (
            JSON.stringify(favorites) !== JSON.stringify(currentState.favorites)
          ) {
            set({ favorites });
          }
        } catch (error) {
          console.error("Failed to load favorites from localStorage:", error);
          // エラーが発生した場合は空の配列を設定
          set({ favorites: [] });
        }
      },

      setFilter: (filter) => {
        set({ filter });
      },

      addFavorite: async (item) => {
        const result = addToFavorites(item);
        if (result.success) {
          const { favorites } = get();
          set({ favorites: [...favorites, item] });
        }
        return result.success;
      },

      removeFavorite: async (id, type) => {
        const result = removeFromFavorites(id, type);
        if (result.success) {
          const { favorites } = get();
          set({
            favorites: favorites.filter(
              (item) => !(item.id === id && item.type === type),
            ),
          });
        }
        return result.success;
      },

      clearAllFavorites: async () => {
        const result = clearFavorites();
        if (result.success) {
          set({ favorites: [] });
        }
        return result.success;
      },

      isFavorite: (id, type) => {
        return checkIsFavorite(id, type);
      },
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        filter: state.filter,
      }),
      // 初期化時にローカルストレージから読み込み
      onRehydrateStorage: () => (state) => {
        if (state) {
          // ストアが復元された後にローカルストレージから最新データを読み込み
          state.loadFavorites();
        }
      },
    },
  ),
);
