import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RealEstateConsultationClient } from "./real-estate-consultation-client";

export const metadata: Metadata = {
  title: "不動産質問・相談 - 専門家に無料相談",
  description:
    "ウチカツで不動産の質問・相談を受付中。売買・賃貸・投資・相続など、不動産のプロが無料でお答えします。どんな不動産のお悩みでもお気軽にご相談ください。",
  keywords: [
    "不動産相談",
    "不動産質問",
    "無料相談",
    "売買相談",
    "賃貸相談",
    "投資相談",
    "相続相談",
    "不動産",
    "専門家",
    "ウチカツ",
    "UCIKATU",
  ],
  openGraph: {
    title: "不動産質問・相談 - 専門家に無料相談 | ウチカツ",
    description:
      "ウチカツで不動産の質問・相談を受付中。売買・賃貸・投資・相続など、不動産のプロが無料でお答えします。",
    url: "/real-estate-consultation",
    type: "website",
  },
  alternates: {
    canonical: "/real-estate-consultation",
  },
};

export default function RealEstateConsultationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <RealEstateConsultationClient />
      </Suspense>
    </div>
  );
}
