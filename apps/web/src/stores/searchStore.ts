import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  PropertySearchFilters,
  SearchPagination,
} from "@/schemas/searchSchema";

interface SearchState {
  // 検索状態（フィルター状態のみを管理）
  filters: PropertySearchFilters;
  pagination: SearchPagination;
  lastSearchTime: number | null;

  // アクション
  setFilters: (filters: PropertySearchFilters) => void;
  setPagination: (pagination: SearchPagination) => void;
  clearSearch: () => void;
  resetFilters: () => void;
}

const initialPagination: SearchPagination = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 20,
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      // 初期状態
      filters: {},
      pagination: initialPagination,
      lastSearchTime: null,

      // アクション
      setFilters: (filters) => {
        set({ filters });
      },

      setPagination: (pagination) => {
        set({ pagination });
      },

      clearSearch: () => {
        set({
          pagination: initialPagination,
          lastSearchTime: null,
        });
      },

      resetFilters: () => {
        set({
          filters: {},
          pagination: initialPagination,
          lastSearchTime: null,
        });
      },
    }),
    {
      name: "search-storage",
      partialize: (state) => ({
        filters: state.filters,
        lastSearchTime: state.lastSearchTime,
        // results は検索ごとに新しく取得するため、永続化しない
        // 検索結果はTanStack Queryで管理することを推奨
      }),
    },
  ),
);
