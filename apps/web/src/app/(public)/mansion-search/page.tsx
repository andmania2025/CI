import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MansionSearchClient } from "./mansion-search-client";

export const metadata: Metadata = {
  title: "マンション検索",
  description: "マンション検索のページです。",
};

export default function MansionSearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <MansionSearchClient />
      </Suspense>
    </div>
  );
}
