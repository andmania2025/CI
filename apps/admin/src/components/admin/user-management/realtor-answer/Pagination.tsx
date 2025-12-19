import type React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page: number, isActive: boolean) => (
    <button
      key={page}
      type="button"
      onClick={() => handlePageChange(page)}
      className={
        isActive
          ? "px-3 py-1 bg-blue-600 text-white rounded"
          : "px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
      }
    >
      {page}
    </button>
  );

  // 表示するページ番号を計算（最大5ページ表示）
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-600">
        {totalItems}件中 {startItem}-{endItem}件表示
      </span>
      <div className="flex gap-1">
        {visiblePages.map((page) => renderPageButton(page, page === currentPage))}
        {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-3 py-1">...</span>}
        {totalPages > 5 && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
};
