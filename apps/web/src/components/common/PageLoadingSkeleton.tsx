import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type React from "react";

interface PageLoadingSkeletonProps {
  variant?: "default" | "search" | "form" | "list" | "property-search";
  showHeader?: boolean;
  className?: string;
}

export const PageLoadingSkeleton: React.FC<PageLoadingSkeletonProps> = ({
  variant = "default",
  showHeader = false,
  className = "",
}) => {
  const content = (
    <div className="container mx-auto px-4">
      {/* パンくずリストのスケルトン */}
      <div className="mb-4 flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* ページタイトルのスケルトン */}
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* コンテンツのスケルトン */}
      <div className="bg-white rounded-lg p-8">
        {variant === "property-search" && (
          <div className="space-y-8">
            {/* 検索フォームのスケルトン */}
            <div className="space-y-6">
              {/* 検索タイプ選択のスケルトン */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <div className="flex space-x-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>

              {/* 検索フィールドのスケルトン */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </div>

              {/* 詳細検索ボタンのスケルトン */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>

            {/* 検索結果エリアのスケルトン */}
            <div className="space-y-6">
              {/* 結果件数のスケルトン */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-32" />
              </div>

              {/* 物件カードのスケルトン */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }, (_, i) => i).map((index) => (
                  <div
                    key={index}
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

              {/* ページネーションのスケルトン - 右下に配置 */}
              <div className="flex justify-end items-center space-x-2 pt-6">
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-10 w-10 rounded" />
              </div>
            </div>
          </div>
        )}

        {variant === "search" && (
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
                {Array.from({ length: 6 }, (_, i) => i).map((index) => (
                  <div
                    key={index}
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
        )}

        {variant === "form" && (
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="space-y-4">
              {Array.from({ length: 8 }, (_, i) => i).map((index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        )}

        {variant === "list" && (
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => i).map((index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
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
        )}

        {variant === "default" && (
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
        )}
      </div>
    </div>
  );

  if (showHeader) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-24 pb-8">{content}</main>
      </div>
    );
  }

  return <div className={cn("py-8", className)}>{content}</div>;
};
