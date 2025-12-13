import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BuildingSearchClient } from "./building-search-client";

export const metadata: Metadata = {
  title: "一棟ビル・一棟マンション売買物件検索",
  description: "一棟ビル・一棟マンション売買物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <BuildingSearchClient />
      </Suspense>
    </div>
  );
}
