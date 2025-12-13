import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PropertySearchFilters, SearchPagination } from "@/schemas/searchSchema";

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

  // 旧実装（admin統合時に確認のためコメントアウトで残す）
  // 検索結果とローディング状態はTanStack Queryで管理することを推奨
  // results: SearchResult[];
  // isLoading: boolean;
  // error: string | null;
  // setResults: (results: SearchResult[]) => void;
  // setLoading: (isLoading: boolean) => void;
  // setError: (error: string | null) => void;
  // performSearch: (filters: PropertySearchFilters) => Promise<void>;
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

      // 旧実装（admin統合時に確認のためコメントアウトで残す）
      // 検索結果とローディング状態はTanStack Queryで管理することを推奨
      // results: [],
      // isLoading: false,
      // error: null,
      //
      // setResults: (results) => {
      //   set({ results });
      // },
      //
      // setLoading: (isLoading) => {
      //   set({ isLoading });
      // },
      //
      // setError: (error) => {
      //   set({ error });
      // },
      //
      // performSearch: async (filters) => {
      //   set({ isLoading: true, error: null });
      //
      //   try {
      //     // TODO: 実際のAPI呼び出しに置き換え
      //     // 現在はダミーデータを使用（既存のロジックを参考）
      //     await new Promise((resolve) => setTimeout(resolve, 1000)); // API遅延をシミュレート
      //
      //     // ダミー検索結果（分離済み）
      //     const dummyResults: SearchResult[] = mockSearchResults;
      //
      //     const searchTime = Date.now();
      //     set({
      //       filters,
      //       results: dummyResults,
      //       pagination: {
      //         ...initialPagination,
      //         totalItems: dummyResults.length,
      //       },
      //       lastSearchTime: searchTime,
      //       isLoading: false,
      //     });
      //   } catch (error) {
      //     set({
      //       error: error instanceof Error ? error.message : "検索中にエラーが発生しました",
      //       isLoading: false,
      //     });
      //   }
      // },
    }),
    {
      name: "search-storage",
      partialize: (state) => ({
        filters: state.filters,
        lastSearchTime: state.lastSearchTime,
        // results は検索ごとに新しく取得するため、永続化しない
        // 検索結果はTanStack Queryで管理することを推奨
      }),
    }
  )
);
