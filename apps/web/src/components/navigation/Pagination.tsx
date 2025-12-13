"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (onPageChange && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant="ghost"
            size="sm"
            className={cn("w-8 h-8 p-0", isActive && "bg-primary text-white")}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </div>
  );
};
