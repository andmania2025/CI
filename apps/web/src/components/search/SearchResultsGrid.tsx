"use client";

import { PropertyCard } from "@/components/marketing/PropertyCard";
import type { MockProperty } from "@/data/mockProperties";
import React from "react";
import type { AppraisalSearchFormData } from "./AppraisalSearchForm";
import type { DetailedSearchData } from "./DetailedSearchModal";
import type { SearchFormData } from "./SearchForm";

interface SearchResultsGridProps {
  properties: MockProperty[];
  searchData?: SearchFormData | AppraisalSearchFormData;
  detailedSearchData?: DetailedSearchData;
}

/**
 * 検索結果のグリッド表示コンポーネント
 */
export const SearchResultsGrid = React.memo<SearchResultsGridProps>(
  ({ properties, searchData, detailedSearchData }) => {
    return (
      <>
        {/* 検索条件が指定されている場合のメッセージ */}
        {(searchData || detailedSearchData) && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">検索条件</h3>
            <div className="text-xs text-blue-700 space-y-1">
              {searchData?.prefecture && <p>都道府県: {searchData.prefecture}</p>}
              {searchData?.city && <p>市区町村: {searchData.city}</p>}
              {searchData && "propertyType" in searchData && searchData.propertyType && (
                <p>取扱物件種別: {searchData.propertyType}</p>
              )}
              {detailedSearchData?.propertyCategory && (
                <p>物件カテゴリー: {detailedSearchData.propertyCategory}</p>
              )}
            </div>
          </div>
        )}

        {/* 物件カードグリッド - 3カラム */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.map((property: MockProperty) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              images={property.images}
              title={property.title}
              location={property.location}
              station={property.station}
              price={property.price}
              area={property.area}
              builtYear={property.builtYear}
              layout={property.layout}
              floor={property.floor}
              landArea={property.landArea}
              buildingArea={property.buildingArea}
              constructionYear={property.constructionYear}
              structure={property.structure}
              yieldRate={property.yieldRate}
              isRental={property.isRental}
              isNew={property.isNew}
              linkUrl={property.linkUrl}
            />
          ))}
        </div>

        {/* 検索結果が0件の場合 */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              検索条件に一致する物件が見つかりませんでした
            </p>
            <p className="text-gray-400 text-sm">検索条件を変更してお試しください</p>
          </div>
        )}
      </>
    );
  }
);

SearchResultsGrid.displayName = "SearchResultsGrid";
