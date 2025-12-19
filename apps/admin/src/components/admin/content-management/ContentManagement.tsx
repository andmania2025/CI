import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

const ContentManagement: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // サンプルコンテンツカテゴリデータ
  const categories = [
    {
      id: "cat001",
      name: "カテゴリ名",
      description: "すべてのコンテンツ",
      contentCount: 75,
    },
    {
      id: "cat002",
      name: "ウチカツ",
      description: "",
      contentCount: 75,
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedCategories(categories.map((c) => c.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    // TODO: 削除処理を実装
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">コンテンツ管理</h2>
        <span className="text-gray-500">コンテンツカテゴリ</span>
      </div>

      {/* コンテンツカテゴリセクション */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            コンテンツを作成する
          </Button>
        </div>

        {/* コンテンツカテゴリ一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">コンテンツカテゴリ</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <Button
              variant="link"
              onClick={handleDeleteSelected}
              className="text-blue-600 p-0 h-auto font-normal underline"
              disabled={selectedCategories.length === 0}
            >
              選択リストを削除
            </Button>
          </div>

          {/* テーブル */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>カテゴリ名</TableHead>
                  <TableHead className="text-center">コンテンツ数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleSelectCategory(category.id, !!checked)}
                        aria-label={`Select ${category.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-600 hover:underline cursor-pointer">
                          {category.name}
                        </div>
                        {category.description && (
                          <div className="text-gray-500 text-xs mt-1">{category.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm">
                      {category.contentCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="選択削除の確認"
        description={`選択された ${selectedCategories.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default ContentManagement;
