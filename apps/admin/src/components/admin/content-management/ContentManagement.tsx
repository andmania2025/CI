import { ConfirmDialog } from "@/components/common/ConfirmDialog";
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
    console.log("選択されたコンテンツカテゴリを削除:", selectedCategories);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">コンテンツ管理</h2>
        <span className="text-gray-500">コンテンツカテゴリ</span>
      </div>

      {/* コンテンツカテゴリセクション */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            コンテンツを作成する
          </button>
        </div>

        {/* コンテンツカテゴリ一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">コンテンツカテゴリ</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              選択リストを削除
            </button>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="border border-gray-300 p-3 text-left">カテゴリ名</th>
                  <th className="border border-gray-300 p-3 text-left">コンテンツ数</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => handleSelectCategory(category.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      <div>
                        <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {category.name}
                        </div>
                        {category.description && (
                          <div className="text-gray-600 text-xs mt-1">{category.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-center">
                      {category.contentCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
