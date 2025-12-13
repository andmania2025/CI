import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LandSearchClient } from "./land-search-client";

export const metadata: Metadata = {
  title: "土地売買物件検索",
  description: "土地売買物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <LandSearchClient />
      </Suspense>
    </div>
  );
}
