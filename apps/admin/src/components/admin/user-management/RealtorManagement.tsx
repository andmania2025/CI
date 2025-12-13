import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Eye,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const RealtorManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    companyPermission: {
      valid: false,
      invalid: false,
    },
    accountType: {
      free: false,
      paid: false,
    },
    accountStatus: {
      valid: false,
      invalid: false,
    },
    displayCount: "20",
  });

  const [selectedRealtors, setSelectedRealtors] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプル不動産業者データ
  const realtors = [
    {
      id: "r001",
      companyName: "株式会社エーゼットプランニング",
      representative: "田中太郎",
      licenseNumber: "東京都知事(1)第12345号",
      accountType: "有料アカウント",
      status: "有効",
      registrationDate: "2024/01/15",
      lastLogin: "2025/01/18",
      propertyCount: 45,
    },
    {
      id: "r002",
      companyName: "株式会社実営進不動産",
      representative: "佐藤花子",
      licenseNumber: "長野県知事(2)第67890号",
      accountType: "無料アカウント",
      status: "有効",
      registrationDate: "2024/03/22",
      lastLogin: "2025/01/17",
      propertyCount: 23,
    },
    {
      id: "r003",
      companyName: "有限会社山田不動産",
      representative: "山田次郎",
      licenseNumber: "大阪府知事(3)第11111号",
      accountType: "有料アカウント",
      status: "無効",
      registrationDate: "2023/11/08",
      lastLogin: "2024/12/25",
      propertyCount: 12,
    },
    {
      id: "r004",
      companyName: "鈴木不動産株式会社",
      representative: "鈴木三郎",
      licenseNumber: "神奈川県知事(1)第22222号",
      accountType: "無料アカウント",
      status: "有効",
      registrationDate: "2024/06/10",
      lastLogin: "2025/01/16",
      propertyCount: 8,
    },
    {
      id: "r005",
      companyName: "株式会社高橋ホーム",
      representative: "高橋美咲",
      licenseNumber: "愛知県知事(2)第33333号",
      accountType: "有料アカウント",
      status: "有効",
      registrationDate: "2024/02/28",
      lastLogin: "2025/01/18",
      propertyCount: 67,
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (category: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as any),
        [field]: checked,
      },
    }));
  };

  const handleSearch = () => {
    console.log("検索実行:", formData);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      companyPermission: {
        valid: false,
        invalid: false,
      },
      accountType: {
        free: false,
        paid: false,
      },
      accountStatus: {
        valid: false,
        invalid: false,
      },
      displayCount: "20",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedRealtors(realtors.map((r) => r.id));
    } else {
      setSelectedRealtors([]);
    }
  };

  const handleSelectRealtor = (realtorId: string, checked: boolean) => {
    if (checked) {
      setSelectedRealtors((prev) => [...prev, realtorId]);
    } else {
      setSelectedRealtors((prev) => prev.filter((id) => id !== realtorId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択された不動産業者を削除:", selectedRealtors);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5" />
        <h2 className="text-xl font-semibold">不動産業者様管理</h2>
        <span className="text-gray-500">不動産業者様一覧</span>
      </div>

      {/* 不動産業者一覧セクション */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 検索アコーディオンヘッダー */}
        <div
          className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between cursor-pointer hover:bg-blue-800 transition-colors"
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="font-medium">検索</span>
          </div>
          {isSearchExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                {/* フリーワード */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    フリーワード
                  </label>
                  <input
                    type="text"
                    value={formData.freeword}
                    onChange={(e) => handleInputChange("freeword", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="会社名、代表者名、免許番号等で検索"
                  />
                </div>

                {/* 物件公開権限 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    物件公開権限
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.companyPermission.valid}
                        onChange={(e) =>
                          handleCheckboxChange("companyPermission", "valid", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">有効</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.companyPermission.invalid}
                        onChange={(e) =>
                          handleCheckboxChange("companyPermission", "invalid", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">無効</span>
                    </label>
                  </div>
                </div>

                {/* 有料アカウント */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    有料アカウント
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accountType.free}
                        onChange={(e) =>
                          handleCheckboxChange("accountType", "free", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">無料アカウント</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accountType.paid}
                        onChange={(e) =>
                          handleCheckboxChange("accountType", "paid", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">有料アカウント</span>
                    </label>
                  </div>
                </div>

                {/* アカウント状態 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    アカウント状態
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accountStatus.valid}
                        onChange={(e) =>
                          handleCheckboxChange("accountStatus", "valid", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">有効</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accountStatus.invalid}
                        onChange={(e) =>
                          handleCheckboxChange("accountStatus", "invalid", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">無効</span>
                    </label>
                  </div>
                </div>

                {/* 表示件数 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">表示件数</label>
                  <select
                    value={formData.displayCount}
                    onChange={(e) => handleInputChange("displayCount", e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="20">20件</option>
                    <option value="50">50件</option>
                    <option value="100">100件</option>
                  </select>
                </div>
              </div>

              {/* Right Column - Empty for spacing */}
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
        )}

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200 flex gap-3">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            業者登録
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSVインポート
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            検索結果をCSVダウンロード
          </button>
        </div>

        {/* 不動産業者一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">不動産業者様一覧</h3>

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
            <span className="text-sm text-gray-600">125件中 1-20件表示</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                4
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                5
              </button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
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
                  <tr key={realtor.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedRealtors.includes(realtor.id)}
                        onChange={(e) => handleSelectRealtor(realtor.id, e.target.checked)}
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
                    <td className="border border-gray-300 p-3 text-sm">
                      {realtor.registrationDate}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{realtor.lastLogin}</td>
                    <td className="border border-gray-300 p-3 text-sm text-center">
                      {realtor.propertyCount}件
                    </td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          詳細
                        </button>
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          編集
                        </button>
                        <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                          削除
                        </button>
                      </div>
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
        description={`選択された ${selectedRealtors.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default RealtorManagement;
