import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { memo } from "react";

interface MailPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

/**
 * ページネーションコンポーネント
 * memo化により不要な再レンダリングを防止
 */
export const MailPagination = memo(function MailPagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}: MailPaginationProps) {
  return (
    <div className="flex items-center justify-between w-full px-0 shrink-0">
      {/* 左端：表示件数情報 */}
      <div className="text-sm text-gray-500 whitespace-nowrap shrink-0">
        {totalItems}件中 {startIndex + 1}-{Math.min(endIndex, totalItems)}
        件を表示
      </div>

      {/* 右端：ページネーション */}
      <div className="flex items-center gap-2 shrink-0">
        <Pagination className="m-0">
          <PaginationContent className="flex items-center gap-2 m-0">
            {/* 前へボタン */}
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || totalPages <= 1}
                className="h-8 w-16"
              >
                前へ
              </Button>
            </PaginationItem>

            {/* ページ番号 */}
            <div className="flex items-center gap-1">
              {totalPages > 0 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
            </div>

            {/* 次へボタン */}
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || totalPages <= 1}
                className="h-8 w-16"
              >
                次へ
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
});
