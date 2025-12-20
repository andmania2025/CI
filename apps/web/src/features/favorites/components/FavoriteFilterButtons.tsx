import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FavoriteFilter } from "../hooks/useFavorites";

interface FavoriteFilterButtonsProps {
  filter: FavoriteFilter;
  onFilterChange: (filter: FavoriteFilter) => void;
  counts: {
    all: number;
    sale: number;
    rental: number;
  };
  onClearAll?: () => void;
}

export const FavoriteFilterButtons = ({
  filter,
  onFilterChange,
  counts,
  onClearAll,
}: FavoriteFilterButtonsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-3">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => onFilterChange("all")}
          className={cn(
            "px-6 py-2 rounded-md transition-colors font-medium",
            filter === "all"
              ? "bg-[#093893] text-white hover:bg-[#072d6f]"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          すべて ({counts.all})
        </Button>
        <Button
          variant={filter === "sale" ? "default" : "outline"}
          onClick={() => onFilterChange("sale")}
          className={cn(
            "px-6 py-2 rounded-md transition-colors font-medium",
            filter === "sale"
              ? "bg-[#093893] text-white hover:bg-[#072d6f]"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          売買物件 ({counts.sale})
        </Button>
        <Button
          variant={filter === "rental" ? "default" : "outline"}
          onClick={() => onFilterChange("rental")}
          className={cn(
            "px-6 py-2 rounded-md transition-colors font-medium",
            filter === "rental"
              ? "bg-[#093893] text-white hover:bg-[#072d6f]"
              : "border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          賃貸物件 ({counts.rental})
        </Button>
      </div>
      {counts.all > 0 && onClearAll && (
        <Button
          variant="outline"
          onClick={onClearAll}
          className="text-red-600 border-red-600 hover:bg-red-50 px-4 py-2"
        >
          すべて削除
        </Button>
      )}
    </div>
  );
};
