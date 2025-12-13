import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RealEstateAppraisalClient } from "./real-estate-appraisal-client";

export const metadata: Metadata = {
  title: "不動産査定",
  description: "不動産査定のページです。",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <RealEstateAppraisalClient />
      </Suspense>
    </div>
  );
}
