import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import type React from "react";
import { MailEditDialog } from "./MailEditDialog";
import { MailSearchDialog } from "./MailSearchDialog";
import {
  MailActionButtons,
  MailPagination,
  MailTemplateTable,
  useMailManagement,
} from "./mail-management";

/**
 * メール管理コンポーネント
 *
 * リファクタリング済み:
 * - ロジックをuseMailManagementカスタムフックに分離
 * - テーブル、ページネーション、アクションボタンを個別コンポーネントに分離
 * - 型定義とモックデータを別ファイルに分離
 * - useMemo/useCallbackによるパフォーマンス最適化
 * - memoによる子コンポーネントの再レンダリング最適化
 */
const MailManagement: React.FC = () => {
  const {
    formData,
    selectedMails,
    selectAll,
    isSearchModalOpen,
    isEditDialogOpen,
    editingTemplate,
    mailVariables,
    currentPage,
    pagination,
    selectionStats,
    setIsSearchModalOpen,
    handleInputChange,
    handleCheckboxChange,
    handleSearch,
    handleReset,
    handleSelectAll,
    handleSelectMail,
    handleOpenNewTemplate,
    handleOpenEditTemplate,
    handleCloseEditDialog,
    handleSaveTemplate,
    handleChangeToDelivery,
    handleChangeToStop,
    handlePageChange,
  } = useMailManagement();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
      {/* アクションボタン */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* 必要に応じて他のアクションボタンをここに追加 */}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsSearchModalOpen(true)}
              className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleOpenNewTemplate}
              className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 自動メールテンプレート一覧セクション */}
      <div className="space-y-4 h-full max-h-screen flex flex-col overflow-hidden">
        {/* 一括操作ボタン */}
        <MailActionButtons
          stoppedCount={selectionStats.stoppedCount}
          deliveryCount={selectionStats.deliveryCount}
          onChangeToDelivery={handleChangeToDelivery}
          onChangeToStop={handleChangeToStop}
        />

        {/* ページネーション */}
        <MailPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          onPageChange={handlePageChange}
        />

        {/* テーブル */}
        <MailTemplateTable
          templates={pagination.currentTemplates}
          selectedMails={selectedMails}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSelectMail={handleSelectMail}
          onEditTemplate={handleOpenEditTemplate}
        />
      </div>

      {/* 検索ダイアログ */}
      <MailSearchDialog
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        formData={formData}
        onFormDataChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 編集ダイアログ */}
      <MailEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={handleCloseEditDialog}
        template={editingTemplate}
        variables={mailVariables}
        onSave={handleSaveTemplate}
      />
    </div>
  );
};

export default MailManagement;
