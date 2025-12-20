"use client";

import { Button } from "@/components/ui/button";
import { mockCompanies } from "@/data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export interface Company {
  id: string;
  name: string;
  location: string;
  propertyTypes: string[];
  propertyFeatures: string[];
  appraisalMethods: string[];
}

interface CompanyListProps {
  title: string;
  companies: Company[];
  totalItems: number;
  showCheckboxes?: boolean;
  showActionButtons?: boolean;
  onInquiryClick?: (company: Company) => void;
}

interface CompanyCardProps {
  company: Company;
  showCheckboxes: boolean;
  showActionButtons: boolean;
  onInquiryClick?: (company: Company) => void;
}

export function CompanyList({
  title,
  companies,
  totalItems,
  showCheckboxes = false,
  showActionButtons = false,
  onInquiryClick,
}: CompanyListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ページネーション処理
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = companies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const CompanyCard = ({
    company,
    showCheckboxes,
    showActionButtons,
    onInquiryClick,
  }: CompanyCardProps) => {
    const [_isChecked, _setIsChecked] = useState(false);

    // 取扱物件種別の分類
    const propertyTypeCategories = {
      売買不動産: ["一戸建て", "マンション", "土地", "アパート"],
      その他: ["駐車場", "その他"],
      投資用・事業用不動産: [
        "店舗・事務所・倉庫・工場",
        "宿泊施設",
        "一棟ビル",
        "一棟マンション",
      ],
    };

    // 不動産種別の分類
    const realEstateTypes = [
      "一戸建て",
      "マンション",
      "土地",
      "アパート",
      "店舗・事務所・倉庫・工場",
      "宿泊施設",
      "一棟ビル",
      "一棟マンション",
      "その他",
    ];

    // 物件特徴の分類
    const propertyFeatures = [
      "一般物件",
      "市街地調整区域・農地",
      "告知事項",
      "山林",
      "競売・任意売却",
    ];

    // 各カテゴリで該当する項目をフィルタリング
    const getPropertyTypeHandled = () => {
      const result = [];
      for (const [category, types] of Object.entries(propertyTypeCategories)) {
        if (types.some((type) => company.propertyTypes.includes(type))) {
          result.push(category);
        }
      }
      return result;
    };

    const getRealEstateTypes = () => {
      return realEstateTypes.filter((type) =>
        company.propertyTypes.includes(type),
      );
    };

    const getPropertyFeatures = () => {
      return propertyFeatures.filter((feature) =>
        company.propertyFeatures.includes(feature),
      );
    };

    const handleInquiryClick = () => {
      if (onInquiryClick) {
        onInquiryClick(company);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          {/* 会社名と所在地（左上）とアクションボタン（右上） */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#093893] mb-2">
                {company.name}
              </h3>
              <p className="text-gray-700">所在地 {company.location}</p>
            </div>

            {/* 右側のアクションボタン */}
            {showActionButtons && (
              <div className="flex flex-col gap-2 ml-4">
                <Button
                  onClick={handleInquiryClick}
                  className="bg-[#093893] text-white border border-[#093893] hover:bg-white hover:text-[#093893] px-4 py-2 rounded-md text-sm font-medium transition-colors h-auto"
                >
                  お問い合わせ
                </Button>
                <Button className="border-gray-600 text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm rounded h-auto">
                  <span className="mr-1">👍</span>
                  Good数:18
                </Button>
              </div>
            )}
          </div>

          {/* 物件情報のカテゴリ表示 */}
          <div className="space-y-4">
            {/* 取扱物件種別 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                取扱物件種別
              </h4>
              <div className="flex flex-wrap gap-2">
                {getPropertyTypeHandled().map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border border-[#093893] text-[#093893] bg-white"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* 不動産種別 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                不動産種別
              </h4>
              <div className="flex flex-wrap gap-2">
                {getRealEstateTypes().map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border border-[#093893] text-[#093893] bg-white"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* 物件特徴 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                物件特徴
              </h4>
              <div className="flex flex-wrap gap-2">
                {getPropertyFeatures().map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border border-[#093893] text-[#093893] bg-white"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* ヘッダー部分 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* 左側: タイトル */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* 右側: 表示件数とページネーション */}
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600">
              {totalItems}件中{startIndex + 1}~{Math.min(endIndex, totalItems)}
              件を表示
            </div>

            {/* ページネーション */}
            <nav className="flex items-center gap-1">
              {/* 前のページボタン */}
              <Button
                variant="ghost"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md border h-auto",
                  currentPage === 1
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:block">前へ</span>
              </Button>

              {/* ページ番号 */}
              {pageNumbers.map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant="ghost"
                  onClick={() => handlePageChange(pageNumber)}
                  className={cn(
                    "inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-md border p-0",
                    currentPage === pageNumber
                      ? "bg-[#093893] text-white border-[#093893]"
                      : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
                  )}
                >
                  {pageNumber}
                </Button>
              ))}

              {/* 次のページボタン */}
              <Button
                variant="ghost"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md border h-auto",
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
                )}
              >
                <span className="hidden sm:block">次へ</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* 検索結果 */}
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentCompanies.map((company, _index) => (
              <CompanyCard
                key={company.id}
                company={company}
                showCheckboxes={showCheckboxes}
                showActionButtons={showActionButtons}
                onInquiryClick={onInquiryClick}
              />
            ))}
          </div>
        </div>

        {/* 下部のページネーション */}
        <div className="flex justify-end mt-8">
          <nav className="flex items-center gap-1">
            {/* 前のページボタン */}
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md border h-auto",
                currentPage === 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:block">前へ</span>
            </Button>

            {/* ページ番号 */}
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                variant="ghost"
                onClick={() => handlePageChange(pageNumber)}
                className={cn(
                  "inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-md border p-0",
                  currentPage === pageNumber
                    ? "bg-[#093893] text-white border-[#093893]"
                    : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
                )}
              >
                {pageNumber}
              </Button>
            ))}

            {/* 次のページボタン */}
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md border h-auto",
                currentPage === totalPages
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[#093893] text-[#093893] bg-white hover:bg-[#093893] hover:text-white",
              )}
            >
              <span className="hidden sm:block">次へ</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

// 後方互換性のため、AppraisalCompanyListもエクスポート
export function AppraisalCompanyList() {
  return (
    <CompanyList
      title="不動産査定業者一覧"
      companies={mockCompanies}
      totalItems={469}
      showCheckboxes={true}
      showActionButtons={true}
    />
  );
}
