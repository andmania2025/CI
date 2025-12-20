import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type React from "react";

const range = (count: number) => Array.from({ length: count }, (_, i) => i);

interface LoadingSkeletonProps {
  variant?:
    | "default"
    | "search"
    | "form"
    | "list"
    | "property-results"
    | "property"
    | "favorites-grid";
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "default",
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "favorites-grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {range(6).map((id) => (
              <div
                key={id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="space-y-4 p-4">
                  {/* 物件画像のスケルトン - property-resultsと統一されたグレーデザイン */}
                  <Skeleton className="h-48 w-full rounded-lg" />

                  {/* 物件情報のスケルトン - property-resultsと統一されたグレーデザイン */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />

                    {/* タグのスケルトン - property-resultsと完全に統一されたスタイル */}
                    <div className="flex gap-2 flex-wrap">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-18 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-22 rounded-full" />
                      <Skeleton className="h-6 w-26 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "property":
        return (
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <div className="space-y-4 p-4">
              {/* 物件画像のスケルトン */}
              <Skeleton className="h-48 w-full rounded-lg" />

              {/* 物件情報のスケルトン */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />

                {/* タグのスケルトン */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>

                {/* ボタンのスケルトン */}
                <div className="pt-2">
                  <Skeleton className="h-8 w-full rounded" />
                </div>
              </div>
            </div>
          </div>
        );

      case "property-results":
        return (
          <div className="space-y-6">
            {/* 結果件数のスケルトン */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-32" />
            </div>

            {/* 物件カードのスケルトン */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {range(9).map((id) => (
                <div
                  key={id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="space-y-4 p-4">
                    {/* 物件画像のスケルトン */}
                    <Skeleton className="h-48 w-full rounded-lg" />

                    {/* 物件情報のスケルトン */}
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />

                      {/* タグのスケルトン */}
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-18 rounded-full" />
                      </div>

                      {/* 価格とボタンのスケルトン */}
                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-8 w-20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ページネーションのスケルトン */}
            <div className="flex justify-end items-center space-x-2 pt-6">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
            </div>
          </div>
        );

      case "search":
        return (
          <div className="space-y-6">
            {/* 検索フォームのスケルトン */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            {/* 検索結果のスケルトン */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {range(6).map((id) => (
                  <div
                    key={id}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="space-y-3">
                      <Skeleton className="h-48 w-full rounded-lg" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "form":
        return (
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="space-y-4">
              {range(8).map((id) => (
                <div key={id} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            {range(5).map((id) => (
              <div
                key={id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("animate-pulse", className)}>{renderSkeleton()}</div>
  );
};
