"use client";

import { QuestionListSection } from "@/components/common/QuestionListSection";
import { CompanyBasicInfoSection } from "@/components/company/CompanyBasicInfoSection";
import { CompanyImageSection } from "@/components/company/CompanyImageSection";
import { CompanyPropertySection } from "@/components/company/CompanyPropertySection";
import { CompanyTabSection } from "@/components/company/CompanyTabSection";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Button } from "@/components/ui/button";
import { type CompanyDetail, mockCompanyDetail } from "@/data/mockCompanyDetail";
import { asahiProperties } from "@/data/mockCompanyProperties";
import { type MockProperty, saleProperties } from "@/data/mockProperties";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";

export function CompanyDetailClient({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [company] = useState<CompanyDetail>(mockCompanyDetail);
  const [isGoodClicked, setIsGoodClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("詳細情報");

  // 朝日土地建物株式会社の物件データを取得
  const _companyProperties = saleProperties.filter((property) => property.companyId === companyId);

  // 朝日土地建物株式会社専用の物件データ（外部ファイルから取得）
  // const asahiProperties: MockProperty[] = [...]; // 外部ファイルに移動済み

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産業者検索", href: "/real-estate-agent-search" },
    { label: company.name },
  ];

  const handleGoodClick = useCallback(() => {
    setIsGoodClicked((prev) => !prev);
  }, []);

  const handleContactClick = useCallback(() => {
    router.push("/question-submission?questionId=1&answerId=1");
  }, [router]);

  return (
    <>
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* 画像レイアウトセクション */}
          <CompanyImageSection />

          {/* 会社基本情報セクション */}
          <CompanyBasicInfoSection
            company={company}
            isGoodClicked={isGoodClicked}
            onGoodClick={handleGoodClick}
          />

          {/* タブ切り替えセクション */}
          <CompanyTabSection company={company} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 取り扱い物件セクション（独立） */}
          <CompanyPropertySection properties={asahiProperties} />

          {/* 投稿質問をみるセクション（独立） */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <QuestionListSection questionsPerPage={6} />
          </div>

          {/* 問い合わせボタン */}
          <div className="text-center">
            <Button
              onClick={handleContactClick}
              variant="outline"
              className="bg-[#093893] text-white border-[#093893] hover:bg-white hover:text-[#093893] px-8 py-4 text-lg font-medium transition-colors"
            >
              この業者に問い合わせ
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
