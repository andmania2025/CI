"use client";

import { usePropertySearchQuery } from "@/lib/tanstack-query/queries/properties";
import { useCallback, useState } from "react";
import type {
  MansionProperty,
  PropertySearchFilters,
} from "../types/property.types";

/**
 * プロパティ検索hook（TanStack Queryベース）
 *
 * 旧実装からTanStack Queryに移行
 * フィルター状態はZustandで管理するか、このhook内で管理するか選択可能
 */
export const usePropertySearch = () => {
  const [filters, setFilters] = useState<PropertySearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  // TanStack Queryを使用してプロパティ検索を実行
  const {
    data: searchResult,
    isLoading,
    error: searchError,
  } = usePropertySearchQuery(
    {
      filters,
      page: currentPage,
      limit,
    },
    Object.keys(filters).length > 0, // フィルターが設定されている場合のみ検索を実行
  );

  // エラーが発生した場合はコンソールに出力（admin統合時に確認）
  if (searchError) {
    console.error("プロパティ検索エラー:", searchError);
  }

  const searchResults: MansionProperty[] = searchResult?.properties || [];
  const totalPages = searchResult?.totalPages || 0;

  const handleSearch = useCallback((searchFilters: PropertySearchFilters) => {
    setFilters(searchFilters);
    setCurrentPage(1); // 検索時は1ページ目に戻す
  }, []);

  const handleFiltersChange = useCallback(
    (newFilters: PropertySearchFilters) => {
      setFilters(newFilters);
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    filters,
    searchResults,
    isLoading,
    currentPage,
    totalPages,
    handleSearch,
    handleFiltersChange,
    handlePageChange,
  };
};
