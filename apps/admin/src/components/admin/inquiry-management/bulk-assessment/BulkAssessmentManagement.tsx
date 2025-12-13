import { type BulkAssessment, mockBulkAssessments } from "@/data/inquiry-data";
import type React from "react";
import { useState } from "react";
import { BulkAssessmentPagination } from "./BulkAssessmentPagination";
import { BulkAssessmentSearchForm } from "./BulkAssessmentSearchForm";
import { BulkAssessmentTable } from "./BulkAssessmentTable";

const BulkAssessmentManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    propertyAddress: "",
    ownerName: "",
    propertyType: "",
    gender: {
      male: false,
      female: false,
    },
    actualGender: {
      male: false,
      female: false,
    },
    inquiryType: {
      wantToSee: false,
      wantToKnow: false,
      wantToConsult: false,
      wantToVisit: false,
      wantToContact: false,
      wantToInquire: false,
      wantToRequest: false,
      wantToAsk: false,
      wantToCheck: false,
    },
    selectedInquiryType: "",
    inquiryDateFrom: "",
    inquiryDateTo: "",
  });

  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const itemsPerPage = 10;

  // ダミーデータ（最終的に削除予定）
  const assessments: BulkAssessment[] = mockBulkAssessments;

  // ページネーション計算
  const totalItems = assessments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssessments = assessments.slice(startIndex, endIndex);

  const handleInputChange = (field: string, value: string) => {
    if (field === "gender" || field === "actualGender") {
      const parsedValue = JSON.parse(value);
      setFormData((prev) => ({
        ...prev,
        [field]: parsedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleDetailSearch = () => {
    console.log("検索実行:", formData);
    setIsDetailSearchOpen(false);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      propertyAddress: "",
      ownerName: "",
      propertyType: "",
      gender: {
        male: false,
        female: false,
      },
      actualGender: {
        male: false,
        female: false,
      },
      inquiryType: {
        wantToSee: false,
        wantToKnow: false,
        wantToConsult: false,
        wantToVisit: false,
        wantToContact: false,
        wantToInquire: false,
        wantToRequest: false,
        wantToAsk: false,
        wantToCheck: false,
      },
      inquiryDateFrom: "",
      inquiryDateTo: "",
      selectedInquiryType: "",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAssessments(assessments.map((assessment) => assessment.id));
    } else {
      setSelectedAssessments([]);
    }
  };

  const handleSelectAssessment = (assessmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssessments((prev) => [...prev, assessmentId]);
    } else {
      setSelectedAssessments((prev) => prev.filter((id) => id !== assessmentId));
      setSelectAll(false);
    }
  };

  return (
    <div className="bg-white rounded-lg flex-1 flex flex-col h-full overflow-hidden">
      <div className="pl-0 pr-4 pt-4 pb-4 flex-1 flex flex-col h-full overflow-hidden">
        {/* 検索フォーム */}
        <BulkAssessmentSearchForm
          formData={formData}
          isDetailSearchOpen={isDetailSearchOpen}
          onInputChange={handleInputChange}
          onDetailSearchOpenChange={setIsDetailSearchOpen}
          onDetailSearch={handleDetailSearch}
          onReset={handleReset}
        />

        {/* テーブルとページネーション */}
        <div className="flex flex-col flex-1 min-h-0 mt-4">
          <div className="flex-1 min-h-0 max-h-[calc(100vh-20rem)]">
            <BulkAssessmentTable
              assessments={currentAssessments}
              selectedAssessments={selectedAssessments}
              selectAll={selectAll}
              onSelectAll={handleSelectAll}
              onSelectAssessment={handleSelectAssessment}
            />
          </div>

          <div className="mt-2 flex-shrink-0">
            <BulkAssessmentPagination
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

export { BulkAssessmentManagement };
