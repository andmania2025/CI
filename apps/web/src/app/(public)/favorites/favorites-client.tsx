"use client";

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { FavoriteEmptyState } from "@/features/favorites/components/FavoriteEmptyState";
import { FavoriteFilterButtons } from "@/features/favorites/components/FavoriteFilterButtons";
import { FavoritePropertyCard } from "@/features/favorites/components/FavoritePropertyCard";
import {
  type FavoriteFilter,
  type FavoriteItem,
  useFavorites,
} from "@/features/favorites/hooks/useFavorites";
import { Home } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const breadcrumbItems = [
  { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
  { label: "お気に入り" },
];

// プロパティカードの部分のみをSuspenseでラップするコンポーネント
function FavoritesGrid({
  filteredFavorites,
  filter,
}: {
  filteredFavorites: FavoriteItem[];
  filter: FavoriteFilter;
}) {
  if (filteredFavorites.length === 0) {
    return <FavoriteEmptyState filter={filter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFavorites.map((property) => (
        <FavoritePropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export function FavoritesClient() {
  const {
    filteredFavorites,
    filter,
    setFilter,
    clearAllFavorites,
    counts,
    favorites,
    isLoading,
    addFavorite,
    loadFavorites,
  } = useFavorites();

  const [hasInitialized, setHasInitialized] = useState(false);

  // 初回データ読み込みとローディング状態管理
  useEffect(() => {
    // 初回のみデータを読み込み
    if (!hasInitialized && !isLoading) {
      loadFavorites();
      setHasInitialized(true);
    }
  }, [hasInitialized, isLoading, loadFavorites]);

  // ヘッダー部分は常に表示（レイアウトずれを防ぐ）
  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* ヘッダー部分 - 常に表示（レイアウトずれを防ぐ） */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">お気に入り</h1>
          </div>

          {/* フィルターボタン - 常に表示（レイアウトずれを防ぐ） */}
          <FavoriteFilterButtons
            filter={filter}
            onFilterChange={setFilter}
            counts={counts}
            onClearAll={clearAllFavorites}
          />

          {/* プロパティカードの部分のみSuspenseでラップ */}
          <Suspense fallback={<LoadingSkeleton variant="favorites-grid" />}>
            <FavoritesGrid filteredFavorites={filteredFavorites} filter={filter} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
