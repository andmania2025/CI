import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Settings } from "lucide-react";
import type React from "react";
import { useState } from "react";

const PropertyTypeSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // サンプル物件種別データ
  const propertyTypes = [
    { id: "type001", name: "一戸建て", status: "使用中", order: 5 },
    { id: "type002", name: "土地", status: "使用中", order: 10 },
    { id: "type003", name: "マンション", status: "使用中", order: 15 },
    { id: "type004", name: "アパート", status: "使用中", order: 20 },
    { id: "type005", name: "店舗・事務所", status: "使用中", order: 25 },
    { id: "type006", name: "工場・倉庫", status: "使用中", order: 30 },
    {
      id: "type007",
      name: "一棟ビル・一棟マンション",
      status: "使用中",
      order: 35,
    },
    { id: "type008", name: "その他", status: "使用中", order: 40 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // TODO: 検索処理を実装
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedTypes(propertyTypes.map((t) => t.id));
    } else {
      setSelectedTypes([]);
    }
  };

  const handleSelectType = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, typeId]);
    } else {
      setSelectedTypes((prev) => prev.filter((id) => id !== typeId));
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">マスター管理</h2>
        <span className="text-gray-500">物件種別設定一覧</span>
      </div>

      {/* 物件種別設定一覧セクション */}
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
                <Label htmlFor="freeword" className="mb-2 block">
                  フリーワード
                </Label>
                <Input
                  id="freeword"
                  type="text"
                  value={formData.freeword}
                  onChange={(e) => handleInputChange("freeword", e.target.value)}
                  className="w-full"
                  placeholder="キーワードで検索"
                />
              </div>
            </div>
            <div className="col-span-6" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              条件をリセット
            </Button>
            <Button
              type="button"
              onClick={handleSearch}
              className="px-8 bg-gray-700 hover:bg-gray-800 gap-2"
            >
              <Search className="w-4 h-4" />
              検索する
            </Button>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200">
          <Button type="button" className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Plus className="w-4 h-4" />
            物件種別追加
          </Button>
        </div>

        {/* 物件種別設定一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">物件種別設定一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <Button
              type="button"
              variant="link"
              className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
            >
              選択リストを削除
            </Button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">8件中 1-8件表示</span>
            <div className="flex gap-1">
              <Button type="button" size="sm" className="bg-blue-600 hover:bg-blue-700">
                1
              </Button>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    />
                  </th>
                  <th className="border border-gray-300 p-3 text-left">項目名</th>
                  <th className="border border-gray-300 p-3 text-left">使用状況</th>
                  <th className="border border-gray-300 p-3 text-left">並び順</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {propertyTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <Checkbox
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={(checked) => handleSelectType(type.id, !!checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {type.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{type.status}</td>
                    <td className="border border-gray-300 p-3 text-sm text-center">{type.order}</td>
                    <td className="border border-gray-300 p-3">
                      <Button
                        type="button"
                        size="sm"
                        className="bg-gray-500 hover:bg-gray-600 text-xs h-7"
                      >
                        編集
                      </Button>
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

export default PropertyTypeSettings;
