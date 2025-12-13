import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { OtherAccommodationSearchClient } from "./other-accommodation-search-client";

export const metadata: Metadata = {
  title: "その他（宿泊施設等）売買物件検索",
  description: "その他（宿泊施設等）売買物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <OtherAccommodationSearchClient />
      </Suspense>
    </div>
  );
}
