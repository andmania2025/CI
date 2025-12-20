"use client";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  type Company,
  CompanyList,
} from "@/components/search/AppraisalCompanyList";
import {
  AppraisalSearchForm,
  type AppraisalSearchFormData,
} from "@/components/search/AppraisalSearchForm";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type AppraisalCompany,
  mockAppraisalCompanies,
} from "@/data/mockAppraisalCompanies";
import { Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const SKELETON_IDS = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`);

// 動的コンテンツ（不動産査定業者一覧）のローディング状態を管理
function CompanyListWithSuspense({
  companies,
  totalItems,
  isLoading,
  onInquiryClick,
}: {
  companies: AppraisalCompany[];
  totalItems: number;
  isLoading: boolean;
  onInquiryClick: (company: Company) => void;
}) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* 結果件数のスケルトン */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* 不動産査定業者カードのスケルトン - 2グリッドレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SKELETON_IDS.map((id) => (
            <div
              key={id}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative"
            >
              {/* Header: Company Info & Buttons */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2 flex-1 mr-4">
                  {/* Company Name */}
                  <Skeleton className="h-7 w-3/4" />
                  {/* Address */}
                  <Skeleton className="h-4 w-1/2" />
                </div>
                {/* Buttons (Top Right) */}
                <div className="flex flex-col gap-2 items-end">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>

              <div className="space-y-5">
                {/* 取扱物件種別 */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-32 rounded-md" />
                  </div>
                </div>

                {/* 不動産種別 */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-28 rounded-md" />
                  </div>
                </div>

                {/* 物件特徴 */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-36 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ページネーションのスケルトン */}
        <div className="flex justify-end items-center space-x-2 pt-6">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <CompanyList
      title="不動産査定業者一覧"
      companies={companies}
      totalItems={totalItems}
      showCheckboxes={true}
      showActionButtons={true}
      onInquiryClick={onInquiryClick}
    />
  );
}

// useSearchParamsを使用するコンポーネントを分離
function RealEstateAppraisalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [_searchData, setSearchData] = useState<
    AppraisalSearchFormData | undefined
  >();
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"sale" | "rental">("sale");
  const [companies, setCompanies] = useState<AppraisalCompany[]>(
    mockAppraisalCompanies,
  );
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "rental") setSearchType("rental");
  }, [searchParams]);

  const propertyType = searchParams.get("propertyType");

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産査定検索" },
  ];

  const handleSearch = (data: AppraisalSearchFormData) => {
    setIsSearching(true);
    setSearchData(data);

    // 動的データの読み込みをシミュレート
    setIsLoadingCompanies(true);

    // 検索結果に基づいてデータを更新（現在はモックデータをそのまま使用）
    setIsSearching(false);
    setIsLoadingCompanies(false);
    setCompanies(mockAppraisalCompanies);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              不動産査定検索
            </h1>
            <p className="text-gray-600">
              不動産査定に関する検索・条件指定が行えます。
            </p>
          </div>

          <AppraisalSearchForm
            onSearch={handleSearch}
            searchType={searchType}
            initialPropertyType={propertyType}
          />

          {isSearching ? (
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#093893]" />
                <span className="ml-3 text-gray-600">検索中...</span>
              </div>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="space-y-6">
                  {/* 結果件数のスケルトン */}
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                    <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                  </div>

                  {/* 不動産査定業者カードのスケルトン - 2グリッドレイアウト */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {SKELETON_IDS.map((id) => (
                      <div
                        key={id}
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
          )}
        </div>
      </main>
    </>
  );
}

// メインのクライアントコンポーネント
export function RealEstateAppraisalClient() {
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
                { label: "不動産査定検索" },
              ]}
              className="mb-0"
            />
          </div>
          <main className="pt-4 pb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  不動産査定検索
                </h1>
                <p className="text-gray-600">
                  不動産査定に関する検索・条件指定が行えます。
                </p>
              </div>
              <div className="space-y-6">
                {/* 結果件数のスケルトン */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* 不動産査定業者カードのスケルトン - 2グリッドレイアウト */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {SKELETON_IDS.map((id) => (
                    <div
                      key={id}
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
      <RealEstateAppraisalContent />
    </Suspense>
  );
}
