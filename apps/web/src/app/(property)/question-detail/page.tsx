import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionDetailClient } from "./question-detail-client";

export const metadata: Metadata = {
  title: "質問詳細 - 不動産質問・相談 | ウチカツ",
  description:
    "不動産に関する質問の詳細と回答をご覧いただけます。専門家からのアドバイスや他のユーザーの経験談を参考にしてください。",
  keywords: [
    "質問詳細",
    "不動産相談",
    "不動産質問",
    "不動産アドバイス",
    "専門家回答",
    "ウチカツ",
    "UCIKATU",
  ],
  openGraph: {
    title: "質問詳細 - 不動産質問・相談 | ウチカツ",
    description:
      "不動産に関する質問の詳細と回答をご覧いただけます。専門家からのアドバイスや他のユーザーの経験談を参考にしてください。",
    url: "/question-detail",
    type: "website",
  },
  alternates: {
    canonical: "/question-detail",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuestionDetailPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton variant="default" />}>
        <QuestionDetailClient />
      </Suspense>
    </div>
  );
}
