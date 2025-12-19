import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Upload } from "lucide-react";
import type React from "react";
import type { Realtor } from "./types";

interface RealtorListSectionProps {
  realtors: Realtor[];
  selectedRealtors: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectRealtor: (id: string, checked: boolean) => void;
  onDeleteSelected: () => void;
}

export const RealtorListSection: React.FC<RealtorListSectionProps> = ({
  realtors,
  selectedRealtors,
  selectAll,
  onSelectAll,
  onSelectRealtor,
  onDeleteSelected,
}) => {
  return (
    <>
      {/* アクションボタン */}
      <div className="p-4 border-b border-gray-200 flex gap-3 bg-white rounded-t-lg shadow-sm mt-6">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">業者登録</Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2">
          <Upload className="w-4 h-4" />
          CSVインポート
        </Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2">
          <Download className="w-4 h-4" />
          検索結果をCSVダウンロード
        </Button>
      </div>

      {/* 不動産業者一覧 */}
      <div className="bg-white rounded-b-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">不動産業者様一覧</h3>

        {/* 選択リストを削除ボタン */}
        <div className="mb-4">
          <Button
            variant="link"
            onClick={onDeleteSelected}
            className="text-blue-600 hover:text-blue-800 hover:no-underline p-0 h-auto"
            disabled={selectedRealtors.length === 0}
          >
            選択リストを削除
          </Button>
        </div>

        {/* ページネーション情報 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">125件中 1-20件表示</span>
          <div className="flex gap-1">
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              1
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
              2
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
              3
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
              4
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
              5
            </Button>
            <span className="px-3 py-1">...</span>
            <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
              »
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
                    onCheckedChange={(checked) => onSelectAll(checked === true)}
                  />
                </th>
                <th className="border border-gray-300 p-3 text-left">業者ID</th>
                <th className="border border-gray-300 p-3 text-left">会社名</th>
                <th className="border border-gray-300 p-3 text-left">代表者名</th>
                <th className="border border-gray-300 p-3 text-left">免許番号</th>
                <th className="border border-gray-300 p-3 text-left">アカウント種別</th>
                <th className="border border-gray-300 p-3 text-left">状態</th>
                <th className="border border-gray-300 p-3 text-left">登録日</th>
                <th className="border border-gray-300 p-3 text-left">最終ログイン</th>
                <th className="border border-gray-300 p-3 text-left">物件数</th>
                <th className="border border-gray-300 p-3 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {realtors.map((realtor) => (
                <tr key={realtor.id} className="hover:bg-gray-5">
                  <td className="border border-gray-300 p-3">
                    <Checkbox
                      checked={selectedRealtors.includes(realtor.id)}
                      onCheckedChange={(checked) => onSelectRealtor(realtor.id, checked === true)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-sm">{realtor.id}</td>
                  <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {realtor.companyName}
                  </td>
                  <td className="border border-gray-300 p-3 text-sm">{realtor.representative}</td>
                  <td className="border border-gray-300 p-3 text-sm">{realtor.licenseNumber}</td>
                  <td className="border border-gray-300 p-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        realtor.accountType === "有料アカウント"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {realtor.accountType}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        realtor.status === "有効"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {realtor.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-sm">{realtor.registrationDate}</td>
                  <td className="border border-gray-300 p-3 text-sm">{realtor.lastLogin}</td>
                  <td className="border border-gray-300 p-3 text-sm text-center">
                    {realtor.propertyCount}件
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="bg-gray-500 hover:bg-gray-600 text-white h-7 text-xs"
                      >
                        詳細
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-500 hover:bg-gray-600 text-white h-7 text-xs"
                      >
                        編集
                      </Button>
                      <Button size="sm" variant="destructive" className="h-7 text-xs">
                        削除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
