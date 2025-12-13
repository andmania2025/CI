"use client";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SearchForm, type SearchFormData } from "@/components/search";
import { SearchResults } from "@/components/search";
import type { DetailedSearchData } from "@/components/search/DetailedSearchModal";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export function BuildingSearchClient() {
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState<SearchFormData | undefined>();
  const [detailedSearchData, setDetailedSearchData] = useState<DetailedSearchData | undefined>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"sale" | "rental">("sale");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "rental") setSearchType("rental");
  }, [searchParams]);

  const propertyType = searchParams.get("propertyType");

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "一棟ビル・一棟マンション売買物件検索" },
  ];

  const handleSearch = (data: SearchFormData) => {
    setIsSearching(true);
    setSearchData(data);
    setDetailedSearchData(undefined);
    setTimeout(() => setIsSearching(false), 600);
  };

  const handleDetailedSearch = (data: DetailedSearchData) => {
    setIsSearching(true);
    setDetailedSearchData(data);
    setSearchData(undefined);
    setTimeout(() => setIsSearching(false), 600);
  };

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              一棟ビル・一棟マンション売買物件検索
            </h1>
            <p className="text-gray-600">
              一棟ビル・一棟マンションに関する検索・条件指定が行えます。
            </p>
          </div>

          <SearchForm
            onSearch={handleSearch}
            onDetailedSearch={handleDetailedSearch}
            searchType={searchType}
            initialPropertyType={propertyType}
          />

          {isSearching ? (
            <div className="bg-white rounded-lg p-8">
              <LoadingSkeleton variant="property-results" />
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
}
