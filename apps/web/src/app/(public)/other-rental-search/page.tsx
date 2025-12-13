import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { OtherRentalSearchClient } from "./other-rental-search-client";

export const metadata: Metadata = {
  title: "その他（貸地、駐車場等）賃貸物件検索",
  description: "その他（貸地、駐車場等）賃貸物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <OtherRentalSearchClient />
      </Suspense>
    </div>
  );
}
