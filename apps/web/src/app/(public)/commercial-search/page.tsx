import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CommercialSearchClient } from "./commercial-search-client";

export const metadata: Metadata = {
  title: "店舗・事務所・倉庫・工場売買物件検索",
  description: "店舗・事務所・倉庫・工場売買物件検索のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <CommercialSearchClient />
      </Suspense>
    </div>
  );
}
