import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RealEstateAgentSearchClient } from "./real-estate-agent-search-client";

export const metadata: Metadata = {
  title: 'ウチカツ(UCIKATU)"不動産SNS"|不動産業者一覧',
  description:
    "【ウチカツ(UCIKATU)】不動産業者を探すなら、不動産の専門家が創った不動産SNSウチカツにお任せ。不動産業者と言ってもそれぞれ専門が違います。うちかつでは不動産種別などに応じて専門の不動産業者を探すことが可能です！不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。",
  keywords:
    "不動産,一括査定,無料査定,一戸建て,新築一戸建て,中古一戸建て,マンション,アパート,住宅,売買,投資,相続,再建築不可,底地,借地,空き家,訳あり物件,ウチカツ,UCIKATU",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <RealEstateAgentSearchClient />
      </Suspense>
    </div>
  );
}
