import { Plus, Search, Settings } from "lucide-react";
import type React from "react";
import { useState } from "react";

const FeatureSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // サンプル特徴データ
  const features = [
    { id: "feat001", name: "駐車場付", status: "使用中", order: 1 },
    { id: "feat002", name: "エアコン", status: "使用中", order: 5 },
    { id: "feat003", name: "室内洗濯機置場", status: "使用中", order: 10 },
    { id: "feat004", name: "バス・トイレ別", status: "使用中", order: 15 },
    { id: "feat005", name: "2階以上", status: "使用中", order: 20 },
    { id: "feat006", name: "フローリング", status: "使用中", order: 25 },
    { id: "feat007", name: "対面キッチン", status: "使用中", order: 30 },
    { id: "feat008", name: "ペット可", status: "使用中", order: 35 },
    { id: "feat009", name: "南向き", status: "使用中", order: 40 },
    { id: "feat010", name: "ベランダ", status: "使用中", order: 45 },
    { id: "feat011", name: "ホームボックス", status: "使用中", order: 50 },
    { id: "feat012", name: "角部屋", status: "使用中", order: 55 },
    {
      id: "feat013",
      name: "最上階（3階建て以上）",
      status: "使用中",
      order: 60,
    },
    { id: "feat014", name: "分譲タイプ", status: "使用中", order: 65 },
    { id: "feat015", name: "外壁タイル張り", status: "使用中", order: 70 },
    { id: "feat016", name: "デザイナーズ", status: "使用中", order: 75 },
    { id: "feat017", name: "温水洗浄便座", status: "使用中", order: 80 },
    { id: "feat018", name: "追焚き機能付", status: "使用中", order: 85 },
    { id: "feat019", name: "安心の新築", status: "使用中", order: 90 },
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
      setSelectedFeatures(features.map((f) => f.id));
    } else {
      setSelectedFeatures([]);
    }
  };

  const handleSelectFeature = (featureId: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures((prev) => [...prev, featureId]);
    } else {
      setSelectedFeatures((prev) => prev.filter((id) => id !== featureId));
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">マスター管理</h2>
        <span className="text-gray-500">特徴設定一覧</span>
      </div>

      {/* 特徴設定一覧セクション */}
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
            特徴追加
          </button>
        </div>

        {/* 特徴設定一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">特徴設定一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button type="button" className="text-blue-600 hover:text-blue-800 text-sm underline">
              選択リストを削除
            </button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">54件中 1-20件表示</span>
            <div className="flex gap-1">
              <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                2
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                3
              </button>
              <span className="px-3 py-1">...</span>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                »
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
                {features.map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature.id)}
                        onChange={(e) => handleSelectFeature(feature.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {feature.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{feature.status}</td>
                    <td className="border border-gray-300 p-3 text-sm text-center">
                      {feature.order}
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

export default FeatureSettings;
