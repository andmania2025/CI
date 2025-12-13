import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { FavoriteFilter } from "../hooks/useFavorites";

interface FavoriteEmptyStateProps {
  filter: FavoriteFilter;
}

export const FavoriteEmptyState = ({ filter }: FavoriteEmptyStateProps) => {
  const router = useRouter();

  const getTitle = () => {
    switch (filter) {
      case "sale":
        return "お気に入りの売買物件がありません";
      case "rental":
        return "お気に入りの賃貸物件がありません";
      default:
        return "お気に入りの物件がありません";
    }
  };

  const getMessage = () => {
    return "物件詳細ページでハートアイコンをクリックしてお気に入りに追加してください。";
  };

  const handleSearchProperties = () => {
    router.push("/");
  };

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{getTitle()}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{getMessage()}</p>
      <Button
        onClick={handleSearchProperties}
        className="px-6 py-2 text-base font-medium border border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white hover:border-[#093893] transition-colors"
      >
        物件を探す
      </Button>
    </div>
  );
};
