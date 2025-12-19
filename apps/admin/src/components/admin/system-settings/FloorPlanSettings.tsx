import { Plus, Search, Settings } from "lucide-react";
import type React from "react";
import { useState } from "react";

const FloorPlanSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
  });

  const [selectedFloorPlans, setSelectedFloorPlans] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // サンプル間取りデータ
  const floorPlans = [
    { id: "fp001", name: "1R", status: "使用中", order: 5 },
    { id: "fp002", name: "1K", status: "使用中", order: 10 },
    { id: "fp003", name: "1DK", status: "使用中", order: 15 },
    { id: "fp004", name: "1LDK", status: "使用中", order: 20 },
    { id: "fp005", name: "2K", status: "使用中", order: 25 },
    { id: "fp006", name: "2DK", status: "使用中", order: 30 },
    { id: "fp007", name: "2LDK", status: "使用中", order: 35 },
    { id: "fp008", name: "3K", status: "使用中", order: 40 },
    { id: "fp009", name: "3DK", status: "使用中", order: 45 },
    { id: "fp010", name: "3LDK", status: "使用中", order: 50 },
    { id: "fp011", name: "4K", status: "使用中", order: 55 },
    { id: "fp012", name: "4DK", status: "使用中", order: 60 },
    { id: "fp013", name: "4LDK", status: "使用中", order: 65 },
    { id: "fp014", name: "5K", status: "使用中", order: 70 },
    { id: "fp015", name: "5DK", status: "使用中", order: 75 },
    { id: "fp016", name: "5LDK以上", status: "使用中", order: 80 },
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
      setSelectedFloorPlans(floorPlans.map((fp) => fp.id));
    } else {
      setSelectedFloorPlans([]);
    }
  };

  const handleSelectFloorPlan = (floorPlanId: string, checked: boolean) => {
    if (checked) {
      setSelectedFloorPlans((prev) => [...prev, floorPlanId]);
    } else {
      setSelectedFloorPlans((prev) => prev.filter((id) => id !== floorPlanId));
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">マスター管理</h2>
        <span className="text-gray-500">間取り設定一覧</span>
      </div>

      {/* 間取り設定一覧セクション */}
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
                <label htmlFor="freeword" className="block text-sm font-medium text-gray-700 mb-2">
                  フリーワード
                </label>
                <input
                  id="freeword"
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
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              条件をリセット
            </button>
            <button
              type="button"
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
          <button
            type="button"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            間取り追加
          </button>
        </div>

        {/* 間取り設定一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">間取り設定一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button type="button" className="text-blue-600 hover:text-blue-800 text-sm underline">
              選択リストを削除
            </button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">16件中 1-16件表示</span>
            <div className="flex gap-1">
              <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </button>
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
                {floorPlans.map((floorPlan) => (
                  <tr key={floorPlan.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedFloorPlans.includes(floorPlan.id)}
                        onChange={(e) => handleSelectFloorPlan(floorPlan.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {floorPlan.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{floorPlan.status}</td>
                    <td className="border border-gray-300 p-3 text-sm text-center">
                      {floorPlan.order}
                    </td>
                    <td className="border border-gray-300 p-3">
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                      >
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
    </div>
  );
};

export default FloorPlanSettings;
