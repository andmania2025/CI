import { InfoBanner } from "@/components/common/InfoBanner";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import {
  FeaturesSection,
  HeroSection,
  NewPropertiesSection,
  QuestionCategoriesSection,
  StructuredData,
  VacantHouseBankSection,
} from "@/components/marketing";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ウチカツ(UCIKATU)|不動産 SNS 不動産業者と利用者を繋ぐコミュニティサイト",
  description:
    "【ウチカツ(UCIKATU)】不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。利用者様はどんな不動産でも検索、査定、相談可能です。横浜のドリームプランニングが提供",
  keywords: [
    "不動産",
    "住宅",
    "物件掲載",
    "一括査定",
    "不動産相談",
    "売買",
    "賃貸",
    "投資",
    "相続",
    "ウチカツ",
    "UCIKATU",
    "不動産SNS",
    "コミュニティサイト",
  ],
  openGraph: {
    title: "ウチカツ(UCIKATU)|不動産 SNS 不動産業者と利用者を繋ぐコミュニティサイト",
    description:
      "【ウチカツ(UCIKATU)】不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。",
    url: "/",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "ウチカツ - 不動産SNS ホーム",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

// 統一されたセクションpaddingクラス
const SECTION_PADDING = "py-8 md:py-10 xl:py-12 2xl:py-16";

export default function Page() {
  return (
    <>
      <StructuredData />

      <div className="w-full min-h-screen bg-white">
        <HeroSection />
        <div className={SECTION_PADDING}>
          <InfoBanner />
        </div>
        <div className="pt-0 pb-8 md:pt-0 md:pb-10 xl:pt-0 xl:pb-12 2xl:pt-0 2xl:pb-16">
          <Suspense fallback={<LoadingSkeleton variant="property-results" />}>
            <NewPropertiesSection />
          </Suspense>
        </div>
        <div className="pt-0 pb-8 md:pt-0 md:pb-10 xl:pt-0 xl:pb-12 2xl:pt-0 2xl:pb-16">
          <Suspense fallback={<LoadingSkeleton variant="default" />}>
            <FeaturesSection />
          </Suspense>
        </div>
        <div className={SECTION_PADDING}>
          <Suspense fallback={<LoadingSkeleton variant="default" />}>
            <QuestionCategoriesSection />
          </Suspense>
        </div>
        <div className={SECTION_PADDING}>
          <Suspense fallback={<LoadingSkeleton variant="default" />}>
            <VacantHouseBankSection />
          </Suspense>
        </div>
      </div>
    </>
  );
}
