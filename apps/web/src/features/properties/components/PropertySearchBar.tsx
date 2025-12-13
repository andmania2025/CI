"use client";

import { PropertySearchDropdown } from "@/components/PropertySearchDropdown";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useCallback } from "react";
import type { PropertySearchFilters } from "../types/property.types";

// 定数を分離
const PREFECTURES = [
  { value: "", label: "都道府県を選択..." },
  { value: "hokkaido", label: "北海道" },
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" },
  { value: "kyoto", label: "京都府" },
  { value: "hyogo", label: "兵庫県" },
  { value: "shiga", label: "滋賀県" },
] as const;

const PRICE_RANGES = [
  { value: "", label: "価格帯を選択..." },
  { value: "0-500", label: "500万円以下" },
  { value: "500-1000", label: "1000万円以下" },
  { value: "1000-1500", label: "1500万円以下" },
  { value: "1500-2000", label: "2000万円以下" },
  { value: "2000+", label: "2000万円以上" },
] as const;

interface PropertySearchBarProps {
  filters?: PropertySearchFilters;
  onSearch?: (filters: PropertySearchFilters) => void;
  onFiltersChange?: (filters: PropertySearchFilters) => void;
}

export const PropertySearchBar = ({
  filters = {},
  onSearch,
  onFiltersChange,
}: PropertySearchBarProps) => {
  // メモ化されたフィルター更新関数
  const handleLocationChange = useCallback(
    (location: string) => {
      const newFilters = { ...filters, location };
      onFiltersChange?.(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handlePriceRangeChange = useCallback(
    (priceRange: string) => {
      const newFilters = { ...filters, priceRange };
      onFiltersChange?.(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleSearchClick = useCallback(() => {
    onSearch?.(filters);
  }, [filters, onSearch]);

  return (
    <div className="w-full bg-gray-50 p-4 mb-6 rounded-lg">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="w-full sm:w-[200px]">
          <PropertySearchDropdown />
        </div>

        <div className="w-full sm:w-[200px]">
          <Select
            value={filters.location || ""}
            onValueChange={(value) => handleLocationChange(value)}
          >
            <SelectTrigger className="w-full h-[40px] bg-white" aria-label="都道府県を選択">
              <SelectValue placeholder="都道府県を選択..." />
            </SelectTrigger>
            <SelectContent>
              {PREFECTURES.map((prefecture) => (
                <SelectItem
                  key={prefecture.value}
                  value={prefecture.value || "default_empty_val_replacement"}
                >
                  {prefecture.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[200px]">
          <Select
            value={filters.priceRange || ""}
            onValueChange={(value) => handlePriceRangeChange(value)}
          >
            <SelectTrigger className="w-full h-[40px] bg-white" aria-label="価格帯を選択">
              <SelectValue placeholder="価格帯を選択..." />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem
                  key={range.value}
                  value={range.value || "default_empty_val_replacement"}
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="h-[40px] px-6 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
          onClick={handleSearchClick}
          aria-label="検索を実行"
        >
          検索
        </Button>
      </div>
    </div>
  );
};
