import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Eye,
  Search,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const MemberManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    residence: "",
    gender: {
      male: false,
      female: false,
    },
    lastLoginDateFrom: "",
    lastLoginDateTo: "",
    registrationDateFrom: "",
    registrationDateTo: "",
    accountStatus: {
      valid: false,
      invalid: false,
    },
    displayCount: "20",
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [_selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプル会員データ
  const members = [
    {
      id: "m001",
      name: "田中太郎",
      email: "tanaka@example.com",
      residence: "東京都",
      gender: "男性",
      registrationDate: "2024/01/15",
      lastLogin: "2025/01/18",
      status: "有効",
      inquiryCount: 5,
    },
    {
      id: "m002",
      name: "佐藤花子",
      email: "sato@example.com",
      residence: "大阪府",
      gender: "女性",
      registrationDate: "2024/02/20",
      lastLogin: "2025/01/17",
      status: "有効",
      inquiryCount: 3,
    },
    {
      id: "m003",
      name: "山田次郎",
      email: "yamada@example.com",
      residence: "神奈川県",
      gender: "男性",
      registrationDate: "2024/03/10",
      lastLogin: "2024/12/25",
      status: "無効",
      inquiryCount: 1,
    },
    {
      id: "m004",
      name: "鈴木美咲",
      email: "suzuki@example.com",
      residence: "愛知県",
      gender: "女性",
      registrationDate: "2024/04/05",
      lastLogin: "2025/01/16",
      status: "無効",
      inquiryCount: 0,
    },
    {
      id: "m005",
      name: "高橋健一",
      email: "takahashi@example.com",
      residence: "福岡県",
      gender: "男性",
      registrationDate: "2024/05/12",
      lastLogin: "2025/01/18",
      status: "有効",
      inquiryCount: 8,
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
      residence: "",
      gender: {
        male: false,
        female: false,
      },
      lastLoginDateFrom: "",
      lastLoginDateTo: "",
      registrationDateFrom: "",
      registrationDateTo: "",
      accountStatus: {
        valid: false,
        invalid: false,
      },
      displayCount: "20",
    });
  };

  const _handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMembers(members.map((m) => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const _handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers((prev) => [...prev, memberId]);
    } else {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const _handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択された会員を削除:", selectedMembers);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5" />
        <h2 className="text-xl font-semibold">会員管理</h2>
        <span className="text-gray-500">会員一覧</span>
      </div>

      {/* 会員一覧セクション */}
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
                    placeholder="名前、メールアドレス等で検索"
                  />
                </div>

                {/* 住所（都道府県） */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    住所（都道府県）
                  </label>
                  <select
                    value={formData.residence}
                    onChange={(e) => handleInputChange("residence", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="hokkaido">北海道</option>
                    <option value="aomori">青森県</option>
                    <option value="iwate">岩手県</option>
                    <option value="miyagi">宮城県</option>
                    <option value="akita">秋田県</option>
                    <option value="yamagata">山形県</option>
                    <option value="fukushima">福島県</option>
                    <option value="ibaraki">茨城県</option>
                    <option value="tochigi">栃木県</option>
                    <option value="gunma">群馬県</option>
                    <option value="saitama">埼玉県</option>
                    <option value="chiba">千葉県</option>
                    <option value="tokyo">東京都</option>
                    <option value="kanagawa">神奈川県</option>
                    <option value="niigata">新潟県</option>
                    <option value="toyama">富山県</option>
                    <option value="ishikawa">石川県</option>
                    <option value="fukui">福井県</option>
                    <option value="yamanashi">山梨県</option>
                    <option value="nagano">長野県</option>
                    <option value="gifu">岐阜県</option>
                    <option value="shizuoka">静岡県</option>
                    <option value="aichi">愛知県</option>
                    <option value="mie">三重県</option>
                    <option value="shiga">滋賀県</option>
                    <option value="kyoto">京都府</option>
                    <option value="osaka">大阪府</option>
                    <option value="hyogo">兵庫県</option>
                    <option value="nara">奈良県</option>
                    <option value="wakayama">和歌山県</option>
                    <option value="tottori">鳥取県</option>
                    <option value="shimane">島根県</option>
                    <option value="okayama">岡山県</option>
                    <option value="hiroshima">広島県</option>
                    <option value="yamaguchi">山口県</option>
                    <option value="tokushima">徳島県</option>
                    <option value="kagawa">香川県</option>
                    <option value="ehime">愛媛県</option>
                    <option value="kochi">高知県</option>
                    <option value="fukuoka">福岡県</option>
                    <option value="saga">佐賀県</option>
                    <option value="nagasaki">長崎県</option>
                    <option value="kumamoto">熊本県</option>
                    <option value="oita">大分県</option>
                    <option value="miyazaki">宮崎県</option>
                    <option value="kagoshima">鹿児島県</option>
                    <option value="okinawa">沖縄県</option>
                  </select>
                </div>

                {/* 性別 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">性別</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.gender.male}
                        onChange={(e) => handleCheckboxChange("gender", "male", e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">男性</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.gender.female}
                        onChange={(e) => handleCheckboxChange("gender", "female", e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">女性</span>
                    </label>
                  </div>
                </div>

                {/* 最終ログイン日 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最終ログイン日
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.lastLoginDateFrom}
                        onChange={(e) => handleInputChange("lastLoginDateFrom", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.lastLoginDateTo}
                        onChange={(e) => handleInputChange("lastLoginDateTo", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 登録日 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">登録日</label>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.registrationDateFrom}
                        onChange={(e) => handleInputChange("registrationDateFrom", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.registrationDateTo}
                        onChange={(e) => handleInputChange("registrationDateTo", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
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
            会員登録
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSVインポート
          </button>
        </div>

        {/* 会員一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">会員一覧</h3>

          {/* 検索結果がない場合の表示 */}
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">検索データがありません。</p>
            <p className="text-gray-500">条件を変更して検索してください。</p>
          </div>

          {/* 実際のデータがある場合のテーブル（コメントアウト） */}
          {/*
          <div className="mb-4">
            <button 
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              選択リストを削除
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">85件中 1-20件表示</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">4</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">5</button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">»</button>
            </div>
          </div>

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
                  <th className="border border-gray-300 p-3 text-left">会員ID</th>
                  <th className="border border-gray-300 p-3 text-left">氏名</th>
                  <th className="border border-gray-300 p-3 text-left">メールアドレス</th>
                  <th className="border border-gray-300 p-3 text-left">住所</th>
                  <th className="border border-gray-300 p-3 text-left">性別</th>
                  <th className="border border-gray-300 p-3 text-left">登録日</th>
                  <th className="border border-gray-300 p-3 text-left">最終ログイン</th>
                  <th className="border border-gray-300 p-3 text-left">状態</th>
                  <th className="border border-gray-300 p-3 text-left">問い合わせ回数</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={(e) => handleSelectMember(member.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{member.id}</td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {member.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{member.email}</td>
                    <td className="border border-gray-300 p-3 text-sm">{member.residence}</td>
                    <td className="border border-gray-300 p-3 text-sm">{member.gender}</td>
                    <td className="border border-gray-300 p-3 text-sm">{member.registrationDate}</td>
                    <td className="border border-gray-300 p-3 text-sm">{member.lastLogin}</td>
                    <td className="border border-gray-300 p-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        member.status === '有効' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-center">{member.inquiryCount}回</td>
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
          */}
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="選択削除の確認"
        description={`選択された ${selectedMembers.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default MemberManagement;
