"use client";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SearchForm, type SearchFormData } from "@/components/search";
import { SearchResults } from "@/components/search";
import type { DetailedSearchData } from "@/components/search/DetailedSearchModal";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface SearchPageClientProps {
  searchType: "sale" | "rental";
  propertyType: string | null;
  propertyTypeLabel: string | null;
}

export const SearchPageClient = ({
  searchType: initialSearchType,
  propertyType,
  propertyTypeLabel,
}: SearchPageClientProps) => {
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState<SearchFormData | undefined>(undefined);
  const [detailedSearchData, setDetailedSearchData] = useState<DetailedSearchData | undefined>(
    undefined
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"sale" | "rental">(initialSearchType);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "rental") {
      setSearchType("rental");
    } else {
      setSearchType("sale");
    }
  }, [searchParams]);

  const handleSearch = (data: SearchFormData) => {
    setIsSearching(true);
    setSearchData(data);
    setDetailedSearchData(undefined);

    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleDetailedSearch = (data: DetailedSearchData) => {
    setIsSearching(true);
    setDetailedSearchData(data);
    setSearchData(undefined);

    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const getPageTitle = () => {
    const baseTitle = searchType === "rental" ? "賃貸物件検索" : "売買物件検索";
    return propertyTypeLabel ? `${propertyTypeLabel} ${baseTitle}` : baseTitle;
  };

  const getPageDescription = () => {
    const baseDescription =
      searchType === "rental"
        ? "賃貸物件の条件を指定して検索できます"
        : "売買物件の条件を指定して検索できます";
    return propertyTypeLabel ? `${propertyTypeLabel}の${baseDescription}` : baseDescription;
  };

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      label: propertyTypeLabel
        ? `${propertyTypeLabel} ${searchType === "rental" ? "賃貸物件検索" : "売買物件検索"}`
        : searchType === "rental"
          ? "賃貸物件検索"
          : "売買物件検索",
    },
  ];

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      {/* メインコンテンツ */}
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* ページタイトル */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
            <p className="text-gray-600">{getPageDescription()}</p>
          </div>

          {/* 検索フォーム */}
          <SearchForm
            onSearch={handleSearch}
            onDetailedSearch={handleDetailedSearch}
            searchType={searchType}
            initialPropertyType={propertyType}
          />

          {/* 検索結果 */}
          {isSearching ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <LoadingSkeleton variant="search" />
            </div>
          ) : (
            <SearchResults
              searchData={searchData}
              detailedSearchData={detailedSearchData}
              searchType={searchType}
              propertyType={propertyType}
            />
          )}
        </div>
      </main>
    </>
  );
};
