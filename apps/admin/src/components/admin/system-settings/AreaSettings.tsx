import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Plus, Search, Settings } from "lucide-react";
import type React from "react";
import { useState } from "react";

const AreaSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
  });

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // サンプルエリアデータ
  const areas = [
    { id: "area001", name: "北海道", status: "使用中", order: 5 },
    { id: "area002", name: "東北", status: "使用中", order: 10 },
    { id: "area003", name: "関東", status: "使用中", order: 15 },
    { id: "area004", name: "北陸", status: "使用中", order: 20 },
    { id: "area005", name: "東海", status: "使用中", order: 25 },
    { id: "area006", name: "関西", status: "使用中", order: 30 },
    { id: "area007", name: "中国・四国", status: "使用中", order: 35 },
    { id: "area008", name: "九州・沖縄", status: "使用中", order: 40 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    console.log("検索実行:", formData);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAreas(areas.map((a) => a.id));
    } else {
      setSelectedAreas([]);
    }
  };

  const handleSelectArea = (areaId: string, checked: boolean) => {
    if (checked) {
      setSelectedAreas((prev) => [...prev, areaId]);
    } else {
      setSelectedAreas((prev) => prev.filter((id) => id !== areaId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択されたエリアを削除:", selectedAreas);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">マスター管理</h2>
        <span className="text-gray-500">エリア設定一覧</span>
      </div>

      {/* エリア設定一覧セクション */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 検索セクション */}
        <div className="bg-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="font-medium">検索</span>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 space-y-6">
              {/* フリーワード */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">フリーワード</label>
                <input
                  type="text"
                  value={formData.freeword}
                  onChange={(e) => handleInputChange("freeword", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="キーワードで検索"
                />
              </div>
            </div>
            <div className="col-span-6" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              条件をリセット
            </button>
            <button
              onClick={handleSearch}
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              検索する
            </button>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            エリア追加
          </button>
        </div>

        {/* エリア設定一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">エリア設定一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              選択リストを削除
            </button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">8件中 1-8件表示</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            </div>
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
                  <th className="border border-gray-300 p-3 text-left">項目名</th>
                  <th className="border border-gray-300 p-3 text-left">使用状況</th>
                  <th className="border border-gray-300 p-3 text-left">並び順</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area.id)}
                        onChange={(e) => handleSelectArea(area.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {area.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{area.status}</td>
                    <td className="border border-gray-300 p-3 text-sm text-center">{area.order}</td>
                    <td className="border border-gray-300 p-3">
                      <button className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                        編集
                      </button>
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
        description={`選択された ${selectedAreas.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default AreaSettings;
