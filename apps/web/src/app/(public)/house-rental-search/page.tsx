import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { HouseRentalSearchClient } from "./house-rental-search-client";

export const metadata: Metadata = {
  title: "一戸建て賃貸物件検索",
  description: "一戸建て賃貸物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <HouseRentalSearchClient />
      </Suspense>
    </div>
  );
}
