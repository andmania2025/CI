import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionSubmissionClient } from "./question-submission-client";

export const metadata: Metadata = {
  title: "質問投稿 | ウチカツ",
  description: "不動産に関する質問を投稿できます。",
};

export default function QuestionSubmissionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <QuestionSubmissionClient />
      </Suspense>
    </div>
  );
}
