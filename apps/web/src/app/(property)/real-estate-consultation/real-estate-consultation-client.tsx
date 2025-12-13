"use client";

import { QuestionListSection } from "@/components/common/QuestionListSection";
import { ConsultationCategoriesSection, ConsultationHeroSection } from "@/components/marketing";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Home } from "lucide-react";

// メインのコンテンツコンポーネント
function RealEstateConsultationContent() {
  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産質問・相談" },
  ];

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        {/* 1. Hero セクション */}
        <ConsultationHeroSection />

        {/* 2. カテゴリーセクション */}
        <ConsultationCategoriesSection />

        {/* 3. 投稿質問をみるセクション */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <QuestionListSection questionsPerPage={6} />
        </div>
      </main>
    </>
  );
}

// メインのクライアントコンポーネント
export function RealEstateConsultationClient() {
  return <RealEstateConsultationContent />;
}
