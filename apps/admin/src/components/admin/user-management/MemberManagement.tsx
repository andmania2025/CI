import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search, Upload, Users } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface MemberFormState {
  freeword: string;
  residence: string;
  gender: {
    male: boolean;
    female: boolean;
  };
  lastLoginDateFrom: string;
  lastLoginDateTo: string;
  registrationDateFrom: string;
  registrationDateTo: string;
  accountStatus: {
    valid: boolean;
    invalid: boolean;
  };
  displayCount: string;
}

const MemberManagement: React.FC = () => {
  const [formData, setFormData] = useState<MemberFormState>({
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

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプル会員データ
  const _members = [
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

  const handleCheckboxChange = <K extends "gender" | "accountStatus">(
    category: K,
    field: keyof MemberFormState[K],
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
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
        <button
          type="button"
          className="w-full bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between cursor-pointer hover:bg-blue-800 transition-colors"
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
        </button>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                {/* フリーワード */}
                <div>
                  <label
                    htmlFor="freeword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    フリーワード
                  </label>
                  <input
                    id="freeword"
                    type="text"
                    value={formData.freeword}
                    onChange={(e) =>
                      handleInputChange("freeword", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="名前、メールアドレス等で検索"
                  />
                </div>

                {/* 住所（都道府県） */}
                <div>
                  <label
                    htmlFor="residence"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    住所（都道府県）
                  </label>
                  <select
                    id="residence"
                    value={formData.residence}
                    onChange={(e) =>
                      handleInputChange("residence", e.target.value)
                    }
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
                  <div className="block text-sm font-medium text-gray-700 mb-3">
                    性別
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.gender.male}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "gender",
                            "male",
                            e.target.checked,
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">男性</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.gender.female}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "gender",
                            "female",
                            e.target.checked,
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">女性</span>
                    </label>
                  </div>
                </div>

                {/* 最終ログイン日 */}
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    最終ログイン日
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.lastLoginDateFrom}
                        onChange={(e) =>
                          handleInputChange("lastLoginDateFrom", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.lastLoginDateTo}
                        onChange={(e) =>
                          handleInputChange("lastLoginDateTo", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 登録日 */}
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    登録日
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.registrationDateFrom}
                        onChange={(e) =>
                          handleInputChange(
                            "registrationDateFrom",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.registrationDateTo}
                        onChange={(e) =>
                          handleInputChange(
                            "registrationDateTo",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* アカウント状態 */}
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-3">
                    アカウント状態
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.accountStatus.valid}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "accountStatus",
                            "valid",
                            e.target.checked,
                          )
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
                          handleCheckboxChange(
                            "accountStatus",
                            "invalid",
                            e.target.checked,
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">無効</span>
                    </label>
                  </div>
                </div>

                {/* 表示件数 */}
                <div>
                  <label
                    htmlFor="displayCount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    表示件数
                  </label>
                  <select
                    id="displayCount"
                    value={formData.displayCount}
                    onChange={(e) =>
                      handleInputChange("displayCount", e.target.value)
                    }
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
              <Button
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                条件をリセット
              </Button>
              <Button
                onClick={handleSearch}
                className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                検索する
              </Button>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200 flex gap-3">
          <Button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            会員登録
          </Button>
          <Button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSVインポート
          </Button>
        </div>

        {/* 会員一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">会員一覧</h3>

          {/* 検索結果がない場合の表示 */}
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">検索データがありません。</p>
            <p className="text-gray-500">条件を変更して検索してください。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
