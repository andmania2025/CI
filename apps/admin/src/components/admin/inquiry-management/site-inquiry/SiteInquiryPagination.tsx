import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface SiteInquiryPaginationProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export const SiteInquiryPagination: React.FC<SiteInquiryPaginationProps> = ({
  totalItems,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-baseline mt-2 pt-2">
      <span className="text-sm text-gray-600 leading-none">
        {totalItems}件中 {startIndex + 1}-{Math.min(endIndex, totalItems)}件表示
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          前へ
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          次へ
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
