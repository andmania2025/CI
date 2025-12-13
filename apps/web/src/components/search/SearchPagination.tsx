"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import React from "react";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * 検索結果のページネーションコンポーネント
 */
export const SearchPagination = React.memo<SearchPaginationProps>(
  ({ currentPage, totalPages, onPageChange }) => {
    // ページネーションの表示範囲を計算（useMemoでメモ化）
    const pageNumbers = useMemo(() => {
      const pages: number[] = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        // 全ページを表示
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 現在のページを中心に表示
        let start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
          start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }

      return pages;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-end w-full mt-8">
        <nav className="flex justify-end">
          <ul className="flex flex-row items-center gap-1">
            {/* 前のページボタン */}
            <li>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md text-[#093893]",
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                )}
              >
                <ChevronLeft className="text-[#093893]" />
                <span className="hidden sm:block text-[#093893]">前へ</span>
              </Button>
            </li>

            {/* ページ番号 */}
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onPageChange(pageNumber);
                  }}
                  className={cn(
                    "inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-md",
                    currentPage === pageNumber
                      ? "bg-[#093893] text-white border-[#093893] hover:bg-[#093893]/90 hover:text-white"
                      : "border-input bg-background hover:bg-accent text-[#093893]"
                  )}
                >
                  {pageNumber}
                </Button>
              </li>
            ))}

            {/* 次のページボタン */}
            <li>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md text-[#093893]",
                  currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                )}
              >
                <span className="hidden sm:block text-[#093893]">次へ</span>
                <ChevronRight className="text-[#093893]" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
);

SearchPagination.displayName = "SearchPagination";
