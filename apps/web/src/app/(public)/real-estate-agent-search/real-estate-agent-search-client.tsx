"use client";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SearchForm, type SearchFormData } from "@/components/search";
import { CompanyList } from "@/components/search/AppraisalCompanyList";
import type { Company } from "@/components/search/AppraisalCompanyList";
import { mockCompanies } from "@/data";
import { Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

// 不動産会社検索用のモックデータ（分離済み）
const mockAgentCompanies = mockCompanies;

// 動的コンテンツ（不動産業者一覧）のローディング状態を管理
function CompanyListWithSuspense({
  companies,
  totalItems,
  isLoading,
  onInquiryClick,
}: {
  companies: typeof mockAgentCompanies;
  totalItems: number;
  isLoading: boolean;
  onInquiryClick: (company: Company) => void;
}) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* 結果件数のスケルトン */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* 不動産業者カードのスケルトン - 2グリッドレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6 space-y-4">
                {/* 会社名と所在地のスケルトン */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  </div>
                  {/* ボタンのスケルトン */}
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>

                {/* カテゴリのスケルトン */}
                <div className="space-y-4">
                  {/* 取扱物件種別 */}
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                  </div>

                  {/* 不動産種別 */}
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    <div className="flex gap-2 flex-wrap">
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-18 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                  </div>

                  {/* 物件特徴 */}
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                    <div className="flex gap-2 flex-wrap">
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-md" />
                      <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ページネーションのスケルトン - 右下に配置 */}
        <div className="flex justify-end items-center space-x-2 pt-6">
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <CompanyList
      title="不動産業者一覧"
      companies={companies}
      totalItems={totalItems}
      showCheckboxes={false}
      showActionButtons={true}
      onInquiryClick={onInquiryClick}
    />
  );
}

// useSearchParamsを使用するコンポーネントを分離
function RealEstateAgentSearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchType, setSearchType] = useState<"sale" | "rental">("sale");
  const [companies, setCompanies] = useState(mockAgentCompanies);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "rental") setSearchType("rental");
  }, [searchParams]);

  const propertyType = searchParams.get("propertyType");

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産業者検索" },
  ];

  const handleSearch = (_data: SearchFormData) => {
    // 動的データの読み込みをシミュレート
    setIsLoadingCompanies(true);

    // 検索結果に基づいてデータを更新（現在はモックデータをそのまま使用）
    setIsLoadingCompanies(false);
    setCompanies(mockAgentCompanies);
  };

  const handleDetailedSearch = (_data: unknown) => {
    // 動的データの読み込みをシミュレート
    setIsLoadingCompanies(true);

    // 検索結果に基づいてデータを更新（現在はモックデータをそのまま使用）
    setIsLoadingCompanies(false);
    setCompanies(mockAgentCompanies);
  };

  const handleInquiryClick = (_company: Company) => {
    router.push("/question-submission?questionId=1&answerId=1");
  };

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">不動産業者検索</h1>
            <p className="text-gray-600">不動産業者に関する検索・条件指定が行えます。</p>
          </div>

          <SearchForm
            onSearch={handleSearch}
            onDetailedSearch={handleDetailedSearch}
            searchType={searchType}
            initialPropertyType={propertyType}
          />

          <Suspense
            fallback={
              <div className="space-y-6">
                {/* 結果件数のスケルトン */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* 不動産業者カードのスケルトン - 2グリッドレイアウト */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200"
                    >
                      <div className="p-6 space-y-4">
                        {/* 会社名と所在地のスケルトン */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1 space-y-2">
                            <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                          </div>
                          {/* ボタンのスケルトン */}
                          <div className="flex flex-col gap-2 ml-4">
                            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                          </div>
                        </div>

                        {/* カテゴリのスケルトン */}
                        <div className="space-y-4">
                          {/* 取扱物件種別 */}
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2">
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>

                          {/* 不動産種別 */}
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2 flex-wrap">
                              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-18 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>

                          {/* 物件特徴 */}
                          <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2 flex-wrap">
                              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ページネーションのスケルトン - 右下に配置 */}
                <div className="flex justify-end items-center space-x-2 pt-6">
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            }
          >
            <CompanyListWithSuspense
              companies={companies}
              totalItems={companies.length}
              isLoading={isLoadingCompanies}
              onInquiryClick={handleInquiryClick}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}

// メインのクライアントコンポーネント
export function RealEstateAgentSearchClient() {
  return (
    <Suspense
      fallback={
        <>
          <div className="pt-16 pb-0 pl-18">
            <Breadcrumb
              items={[
                {
                  label: "ウチカツ",
                  href: "/",
                  icon: <Home className="w-4 h-4" />,
                },
                { label: "不動産業者検索" },
              ]}
              className="mb-0"
            />
          </div>
          <main className="pt-4 pb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">不動産業者検索</h1>
                <p className="text-gray-600">不動産業者に関する検索・条件指定が行えます。</p>
              </div>
              <div className="space-y-6">
                {/* 結果件数のスケルトン */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* 不動産業者カードのスケルトン - 2グリッドレイアウト */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200"
                    >
                      <div className="p-6 space-y-4">
                        {/* 会社名と所在地のスケルトン */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1 space-y-2">
                            <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                          </div>
                          {/* ボタンのスケルトン */}
                          <div className="flex flex-col gap-2 ml-4">
                            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                          </div>
                        </div>

                        {/* カテゴリのスケルトン */}
                        <div className="space-y-4">
                          {/* 取扱物件種別 */}
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2">
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>

                          {/* 不動産種別 */}
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2 flex-wrap">
                              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-18 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>

                          {/* 物件特徴 */}
                          <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                            <div className="flex gap-2 flex-wrap">
                              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-md" />
                              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ページネーションのスケルトン - 右下に配置 */}
                <div className="flex justify-end items-center space-x-2 pt-6">
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </main>
        </>
      }
    >
      <RealEstateAgentSearchContent />
    </Suspense>
  );
}
