"use client";

import { Card } from "@/components/ui/card";
import { rentalProperties, saleProperties } from "@/data/mockProperties";
import { usePropertyFiltering } from "@/hooks/usePropertyFiltering";
import { getPropertyTypeLabel as getPropertyTypeLabelFromMap } from "@/lib/constants/propertyTypeMaps";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AppraisalSearchFormData } from "./AppraisalSearchForm";
import type { DetailedSearchData } from "./DetailedSearchModal";
import type { SearchFormData } from "./SearchForm";
import { SearchPagination } from "./SearchPagination";
import { SearchResultsGrid } from "./SearchResultsGrid";
import { SearchResultsHeader } from "./SearchResultsHeader";

interface SearchResultsProps {
  searchData?: SearchFormData | AppraisalSearchFormData;
  detailedSearchData?: DetailedSearchData;
  searchType?: "sale" | "rental";
  propertyType?: string | null;
}

export const SearchResults = ({
  searchData,
  detailedSearchData,
  searchType = "sale",
  propertyType,
}: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // 検索タイプに応じてデータを選択
  const allProperties = useMemo(() => {
    return searchType === "rental" ? rentalProperties : saleProperties;
  }, [searchType]);

  // カスタムフックを使用してフィルタリング
  const { filteredProperties } = usePropertyFiltering({
    allProperties,
    searchData,
    detailedSearchData,
    propertyType,
  });

  const itemsPerPage = 9; // 3カラム × 3行
  const totalItems = filteredProperties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 現在のページの物件を取得
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // 検索条件が変更された時にページを1に戻す
  // 検索条件や結果が変更された時にページを1に戻す
  useEffect(() => {
    if (filteredProperties) {
      setCurrentPage(1);
    }
  }, [filteredProperties]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleViewModeChange = useCallback((mode: "list" | "map") => {
    setViewMode(mode);
  }, []);

  // 検索タイプと物件種別に応じたタイトルを取得
  const getTitle = useCallback(() => {
    const baseType =
      searchType === "rental" ? "賃貸物件検索一覧" : "売買物件検索一覧";
    const propertyTypeLabel = getPropertyTypeLabelFromMap(propertyType || null);

    if (propertyTypeLabel) {
      return `${baseType}(${propertyTypeLabel})`;
    }
    // デフォルトのタイトル
    if (searchType === "rental") {
      return "賃貸物件検索一覧(アパート)";
    }
    return "売買物件検索一覧(マンション)";
  }, [searchType, propertyType]);

  const title = getTitle();

  return (
    <Card className="shadow-sm">
      {/* ヘッダー部分 */}
      <SearchResultsHeader
        title={title}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* 検索結果表示エリア */}
      <div className="p-6">
        {viewMode === "list" ? (
          <>
            <SearchResultsGrid
              properties={currentProperties}
              searchData={searchData}
              detailedSearchData={detailedSearchData}
            />

            {/* ページネーション */}
            <SearchPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          /* 地図表示モード */
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="text-gray-500 mb-2">地図表示機能</div>
              <div className="text-sm text-gray-400">
                地図での表示は現在開発中です
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
