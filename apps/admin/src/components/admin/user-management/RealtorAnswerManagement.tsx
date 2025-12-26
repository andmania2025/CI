import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ChevronDown, ChevronUp, FileText, Search } from "lucide-react";
import type React from "react";
import {
  Pagination,
  RealtorAnswerSearchForm,
  RealtorAnswerTable,
  useRealtorAnswerManagement,
} from "./realtor-answer";

const RealtorAnswerManagement: React.FC = () => {
  const {
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleSearch,
    handleReset,
    selectedAnswers,
    selectAll,
    handleSelectAll,
    handleSelectAnswer,
    confirmOpen,
    setConfirmOpen,
    handleDeleteSelected,
    executeDelete,
    isSearchExpanded,
    setIsSearchExpanded,
    answers,
  } = useRealtorAnswerManagement();

  return (
    <div>
      {/* ヘッダー */}
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">質問管理</h2>
        <span className="text-gray-500">不動産業者様回答一覧</span>
      </div>

      {/* メインコンテンツ */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 検索アコーディオンヘッダー */}
        <button
          type="button"
          className="w-full bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between cursor-pointer hover:bg-blue-800 transition-colors"
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="font-medium">検索</span>
          </div>
          {isSearchExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <RealtorAnswerSearchForm
            formData={formData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        )}

        {/* 不動産業者回答一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">不動産業者様回答一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              選択リストを削除
            </button>
          </div>

          {/* ページネーション */}
          <Pagination totalItems={210} currentPage={1} itemsPerPage={20} />

          {/* テーブル */}
          <RealtorAnswerTable
            answers={answers}
            selectedAnswers={selectedAnswers}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSelectAnswer={handleSelectAnswer}
          />
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="選択削除の確認"
        description={`選択された ${selectedAnswers.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default RealtorAnswerManagement;
