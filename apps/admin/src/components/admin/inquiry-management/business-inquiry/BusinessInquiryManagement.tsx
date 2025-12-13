"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { BusinessInquiryPagination } from "./BusinessInquiryPagination";
import { BusinessInquirySearchForm } from "./BusinessInquirySearchForm";
import { BusinessInquiryTable } from "./BusinessInquiryTable";

export const BusinessInquiryManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // モックデータ（実際のデータに置き換える）
  const mockInquiries = [
    {
      id: "b001",
      date: "2025/01/15 16:45:20",
      companyName: "株式会社ABC建設",
      contactPerson: "山田太郎",
      inquiryType: "協業について",
      email: "yamada@abc-const.co.jp",
      status: "対応中",
    },
    {
      id: "b002",
      date: "2025/01/15 14:20:15",
      companyName: "XYZ不動産",
      contactPerson: "田中花子",
      inquiryType: "物件情報提供",
      email: "tanaka@xyz-realestate.co.jp",
      status: "完了",
    },
    {
      id: "b003",
      date: "2025/01/15 11:30:45",
      companyName: "DEF住宅",
      contactPerson: "佐藤一郎",
      inquiryType: "パートナーシップ",
      email: "sato@def-housing.co.jp",
      status: "未対応",
    },
  ];

  const totalItems = mockInquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = mockInquiries.slice(startIndex, endIndex);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailSearch = (searchData: any) => {
    console.log("検索:", searchData);
    // 実際の検索ロジックを実装
  };

  const handleReset = () => {
    setFormData({
      search: "",
      dateFrom: "",
      dateTo: "",
      status: "",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedInquiries(currentInquiries.map((inquiry) => inquiry.id));
    } else {
      setSelectedInquiries([]);
    }
  };

  const handleSelectInquiry = (inquiryId: string, checked: boolean) => {
    if (checked) {
      setSelectedInquiries((prev) => [...prev, inquiryId]);
    } else {
      setSelectedInquiries((prev) => prev.filter((id) => id !== inquiryId));
    }
  };

  return (
    <div className="bg-white rounded-lg flex-1 flex flex-col h-full overflow-hidden">
      <div className="pl-0 pr-4 pt-4 pb-4 flex-1 flex flex-col h-full overflow-hidden">
        {/* 検索フォーム */}
        <BusinessInquirySearchForm
          formData={formData}
          isDetailSearchOpen={isDetailSearchOpen}
          onInputChange={handleInputChange}
          onDetailSearchOpenChange={setIsDetailSearchOpen}
          onDetailSearch={handleDetailSearch}
          onReset={handleReset}
        />

        {/* テーブルとページネーション */}
        <div className="flex flex-col flex-1 min-h-0 mt-6">
          <div className="flex-1 min-h-0">
            <BusinessInquiryTable
              inquiries={currentInquiries}
              selectedInquiries={selectedInquiries}
              selectAll={selectAll}
              onSelectAll={handleSelectAll}
              onSelectInquiry={handleSelectInquiry}
            />
          </div>

          <div className="mt-2 flex-shrink-0">
            <BusinessInquiryPagination
              totalItems={totalItems}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
