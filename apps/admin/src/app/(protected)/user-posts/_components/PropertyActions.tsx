import { Button } from "@/components/ui/button";
import { Download, Search, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import type { PropertyActionsProps } from "./types";

export const PropertyActions: React.FC<PropertyActionsProps> = ({
  selectedProperties,
  onSearch,
  onDownload,
  onUpload: _onUpload,
  onBulkDelete,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onBulkDelete();
    setIsDeleteModalOpen(false);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedProperties.length > 0 && (
            <>
              <span className="text-sm text-gray-600">{selectedProperties.length}件選択中</span>
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
            onClick={onSearch}
            className="bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        selectedCount={selectedProperties.length}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
