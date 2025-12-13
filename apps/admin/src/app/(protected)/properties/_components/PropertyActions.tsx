import { Button } from "@/components/ui/button";
import { Download, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { CsvImportDialog } from "./CsvImportDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import type { PropertyActionsProps } from "./types";

export const PropertyActions: React.FC<PropertyActionsProps> = ({
  selectedProperties,
  onSearch,
  onDownload,
  onUpload: _onUpload,
  onBulkDelete,
}) => {
  const router = useRouter();
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCsvImport = () => {
    setIsCsvImportOpen(true);
  };

  const handleImportComplete = () => {
    // インポート完了後の処理（必要に応じてデータを再取得）
    window.location.reload(); // 簡単な実装例
  };

  const handleNewProperty = () => {
    router.push("/properties/new");
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onBulkDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedProperties.length > 0 && (
            <>
              <span className="text-sm text-gray-600">{selectedProperties.length}件選択中</span>
              <Button onClick={onDownload} variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                ダウンロード
              </Button>
              <Button
                onClick={handleDeleteClick}
                variant="outline"
                size="sm"
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                削除
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleNewProperty}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            title="新規登録"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            onClick={onSearch}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleCsvImport}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            CSVインポート
          </Button>
        </div>
      </div>

      {/* CSVインポートダイアログ */}
      <CsvImportDialog
        isOpen={isCsvImportOpen}
        onOpenChange={setIsCsvImportOpen}
        onImportComplete={handleImportComplete}
      />

      {/* 削除確認ダイアログ */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        selectedCount={selectedProperties.length}
      />
    </div>
  );
};
