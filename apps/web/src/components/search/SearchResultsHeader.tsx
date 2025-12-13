"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface SearchResultsHeaderProps {
  title: string;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  viewMode: "list" | "map";
  onViewModeChange: (mode: "list" | "map") => void;
}

/**
 * 検索結果のヘッダーコンポーネント
 */
export const SearchResultsHeader = React.memo<SearchResultsHeaderProps>(
  ({ title, totalItems, startIndex, endIndex, viewMode, onViewModeChange }) => {
    return (
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* 左側: タイトル */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* 右側: 表示件数と表示モード切り替え */}
          <div className="flex items-center gap-4">
            {/* 表示件数 */}
            <div className="text-sm text-gray-600">
              {totalItems}件中{startIndex + 1}~{Math.min(endIndex, totalItems)}件を表示
            </div>

            {/* 表示モード切り替え */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors h-auto rounded-none first:rounded-l-md last:rounded-r-md hover:bg-gray-50",
                  viewMode === "list"
                    ? "bg-[#093893] text-white hover:bg-[#093893] hover:text-white"
                    : "bg-white text-gray-700"
                )}
              >
                一覧表示
              </Button>
              <Button
                variant="ghost"
                onClick={() => onViewModeChange("map")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors h-auto rounded-none first:rounded-l-md last:rounded-r-md hover:bg-gray-50",
                  viewMode === "map"
                    ? "bg-[#093893] text-white hover:bg-[#093893] hover:text-white"
                    : "bg-white text-gray-700"
                )}
              >
                地図で表示
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SearchResultsHeader.displayName = "SearchResultsHeader";
