import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import type { MockProperty } from "@/data/mockProperties";
import { cheapProperties, rentalProperties, saleProperties } from "@/data/mockProperties";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { PropertySliderSection } from "./PropertySliderSection";

interface NewPropertiesSectionProps {
  salePropertiesData?: MockProperty[];
  rentalPropertiesData?: MockProperty[];
  cheapPropertiesData?: MockProperty[];
}

export const NewPropertiesSection = ({
  salePropertiesData = saleProperties.slice(0, 6),
  rentalPropertiesData = rentalProperties.slice(0, 6),
  cheapPropertiesData = cheapProperties.slice(0, 8),
}: NewPropertiesSectionProps = {}) => {
  // 動的コンテンツとしてマーク
  unstable_noStore();
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-4 xl:px-8 2xl:px-12 pt-0 pb-8 md:pt-0 md:pb-10 xl:pt-0 xl:pb-12 2xl:pt-0 2xl:pb-16">
        {/* 2つのカードレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12 2xl:gap-16 relative overflow-visible">
          {/* 左側カード - 新着の売買物件 */}
          <Suspense fallback={<LoadingSkeleton variant="property" className="h-64" />}>
            <PropertySliderSection
              title="ウチカツ(UCIKATU) 新着の売買物件"
              properties={salePropertiesData}
              className="relative overflow-visible"
            />
          </Suspense>

          {/* 右側カード - 新着の賃貸物件 */}
          <Suspense fallback={<LoadingSkeleton variant="property" className="h-64" />}>
            <PropertySliderSection
              title="ウチカツ(UCIKATU) 新着の賃貸物件"
              properties={rentalPropertiesData}
              className="relative overflow-visible"
            />
          </Suspense>
        </div>

        {/* 下部の100万円以下物件情報（フルワイドで表示） */}
        <div className="mt-12 relative overflow-visible">
          <Suspense fallback={<LoadingSkeleton variant="property" className="h-64" />}>
            <PropertySliderSection
              title="ウチカツ(UCIKATU) 新着の100万円以下物件情報"
              properties={cheapPropertiesData}
              isFullWidth={true}
              className="relative overflow-visible"
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
