import { Button } from "@/components/ui/button";
import { Download, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { CsvImportDialog } from "./CsvImportDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { RealtorSearchDialog } from "./RealtorSearchDialog";
import type { RealtorActionsProps } from "./types";

export const RealtorActions: React.FC<RealtorActionsProps> = ({
  selectedRealtors,
  onSearch: _onSearch,
  onDownload,
  onUpload: _onUpload,
  onBulkDelete,
}) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onBulkDelete();
    setIsDeleteModalOpen(false);
  };

  const handleNewRealtor = () => {
    router.push("/realtors/new");
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleCsvImportClick = () => {
    setIsCsvImportOpen(true);
  };

  const handleImportComplete = () => {
    // インポート完了後の処理（必要に応じてデータを再取得）
    window.location.reload(); // 簡単な実装例
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedRealtors.length > 0 && (
            <>
              <span className="text-sm text-gray-600">{selectedRealtors.length}件選択中</span>
              <Button
                onClick={onDownload}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                検索結果をCSVダウンロード
              </Button>
              <Button
                onClick={handleDeleteClick}
                variant="destructive"
                size="sm"
                className="text-white flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                削除
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleNewRealtor}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            title="新規登録"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSearchClick}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleCsvImportClick}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            CSVインポート
          </Button>
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        selectedCount={selectedRealtors.length}
        onConfirm={handleDeleteConfirm}
      />

      {/* 検索ダイアログ */}
      <RealtorSearchDialog
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        formData={{
          freeword: "",
          propertyPublicationPermission: "",
          paidAccount: "",
          status: "",
          displayCount: "20",
        }}
        onFormDataChange={(field, value) => {
          console.log("Form data change:", field, value);
        }}
        onSearch={() => {
          console.log("検索実行");
          setIsSearchModalOpen(false);
        }}
        onReset={() => {
          console.log("検索条件をリセット");
        }}
      />

      {/* CSVインポートダイアログ */}
      <CsvImportDialog
        isOpen={isCsvImportOpen}
        onOpenChange={setIsCsvImportOpen}
        onImportComplete={handleImportComplete}
      />
    </div>
  );
};
