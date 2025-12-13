import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RealEstateAgentRegistrationClient } from "./real-estate-agent-registration-client";

export const metadata: Metadata = {
  title: "不動産業者登録 | ウチカツ",
  description:
    "不動産業者の登録フォームです。企業情報、連絡先情報、取扱物件情報などを入力してください。",
};

export default function RealEstateAgentRegistrationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="property-search" />}>
        <RealEstateAgentRegistrationClient />
      </Suspense>
    </div>
  );
}
