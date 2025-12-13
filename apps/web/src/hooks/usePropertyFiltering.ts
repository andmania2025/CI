"use client";

import type { MockProperty } from "@/data/mockProperties";
import { PROPERTY_TYPE_MAP, SALE_PROPERTY_TYPE_MAP } from "@/lib/constants/propertyTypeMaps";
import { useMemo } from "react";
import type { AppraisalSearchFormData } from "../components/search/AppraisalSearchForm";
import type { DetailedSearchData } from "../components/search/DetailedSearchModal";
import type { SearchFormData } from "../components/search/SearchForm";

interface UsePropertyFilteringProps {
  allProperties: MockProperty[];
  searchData?: SearchFormData | AppraisalSearchFormData;
  detailedSearchData?: DetailedSearchData;
  propertyType?: string | null;
}

/**
 * 物件フィルタリングロジックを管理するカスタムフック
 */
export const usePropertyFiltering = ({
  allProperties,
  searchData,
  detailedSearchData,
  propertyType,
}: UsePropertyFilteringProps) => {
  const filteredProperties = useMemo(() => {
    if (!searchData && !detailedSearchData && !propertyType) {
      return allProperties;
    }

    return allProperties.filter((property) => {
      // 物件種別フィルタリング（最優先）
      if (propertyType) {
        const targetPropertyType = PROPERTY_TYPE_MAP[propertyType];
        if (targetPropertyType && property.propertyType !== targetPropertyType) {
          return false;
        }
      }

      // 基本検索条件のフィルタリング
      if (searchData) {
        // 都道府県フィルタリング
        if (searchData.prefecture && !property.location.includes(searchData.prefecture)) {
          return false;
        }

        // 市区町村フィルタリング
        if (searchData.city && !property.location.includes(searchData.city)) {
          return false;
        }

        // 取扱物件種別フィルタリング（propertyTypeフィールドを使用）
        if ("propertyType" in searchData && searchData.propertyType) {
          const targetType = SALE_PROPERTY_TYPE_MAP[searchData.propertyType];
          if (targetType && property.propertyType !== targetType) {
            return false;
          }
        }
      }

      // 詳細検索条件のフィルタリング
      if (detailedSearchData) {
        // 物件カテゴリーフィルタリング（propertyTypeフィールドを使用）
        if (detailedSearchData.propertyCategory) {
          const targetType = SALE_PROPERTY_TYPE_MAP[detailedSearchData.propertyCategory];
          if (targetType && property.propertyType !== targetType) {
            return false;
          }
        }
      }

      return true;
    });
  }, [allProperties, searchData, detailedSearchData, propertyType]);

  return { filteredProperties };
};
