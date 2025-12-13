import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ApartmentSaleSearchClient } from "./apartment-sale-search-client";

export const metadata: Metadata = {
  title: "アパート売買物件検索",
  description: "アパート売買物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <ApartmentSaleSearchClient />
      </Suspense>
    </div>
  );
}
