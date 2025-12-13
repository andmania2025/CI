import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ChevronDown, ChevronUp, FileText, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";

const RealtorAnswerManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    realEstateCompany: "",
    questionType: "",
    questionCategory: "",
    questionCategoryGeneral: "",
    publicStatus: {
      public: false,
      nonPublic: false,
    },
    answerDateFrom: "",
    answerDateTo: "",
    displayCount: "20",
  });

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプル不動産業者回答データ
  const answers = [
    {
      id: "ra001",
      answerDate: "2025/05/24 11:32:26",
      company: "富士土地開発株式会社",
      representative: "鈴木 太人",
      questionTitle: "4号地2階の洗い場に関する質問です。土地の価格について（神奈川県横浜市港南区）",
    },
    {
      id: "ra002",
      answerDate: "2025/04/12 00:39:24",
      company: "丸一不動産 株式会社",
      representative: "太田・新本・内海 合",
      questionTitle: "営業の実情について（大阪府豊中市北条）",
    },
    {
      id: "ra003",
      answerDate: "2025/04/12 00:33:36",
      company: "丸一不動産 株式会社",
      representative: "太田・新本・内海 合",
      questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
    },
    {
      id: "ra004",
      answerDate: "2025/04/08 22:31:32",
      company: "合同会社富山興産",
      representative: "FP・鑑定・不動産 富山哲也",
      questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
    },
    {
      id: "ra005",
      answerDate: "2025/04/08 22:27:02",
      company: "株式会社エステ",
      representative: "立花 雅彦",
      questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
    },
    {
      id: "ra006",
      answerDate: "2025/03/26 17:28:04",
      company: "株式会社インフィニクス",
      representative: "古橋 英",
      questionTitle:
        "ショップハウス（企業物件投資に関する質問をお寄せいただきありがとうございます（宮城県仙台市青葉区）",
    },
    {
      id: "ra007",
      answerDate: "2025/03/13 16:36:40",
      company: "立興株式会社",
      representative: "渡辺 幸和",
      questionTitle: "田舎の山の売却について（神奈川県横浜市港南区）",
    },
    {
      id: "ra008",
      answerDate: "2025/03/04 17:26:53",
      company: "株式会社ハウスオーション",
      representative: "石橋",
      questionTitle: "営業の実情について（大阪府豊中市北条）",
    },
    {
      id: "ra009",
      answerDate: "2025/03/04 06:39:56",
      company: "合同会社富山興産",
      representative: "FP・鑑定・不動産 富山哲也",
      questionTitle: "営業の実情について（大阪府豊中市北条）",
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
      realEstateCompany: "",
      questionType: "",
      questionCategory: "",
      questionCategoryGeneral: "",
      publicStatus: {
        public: false,
        nonPublic: false,
      },
      answerDateFrom: "",
      answerDateTo: "",
      displayCount: "20",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAnswers(answers.map((a) => a.id));
    } else {
      setSelectedAnswers([]);
    }
  };

  const handleSelectAnswer = (answerId: string, checked: boolean) => {
    if (checked) {
      setSelectedAnswers((prev) => [...prev, answerId]);
    } else {
      setSelectedAnswers((prev) => prev.filter((id) => id !== answerId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択された業者回答を削除:", selectedAnswers);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">質問管理</h2>
        <span className="text-gray-500">不動産業者様回答一覧</span>
      </div>

      {/* 不動産業者回答一覧セクション */}
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
                    placeholder="キーワードで検索"
                  />
                </div>

                {/* 不動産業者名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    不動産業者名
                  </label>
                  <div className="relative">
                    <button className="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-600 text-white text-left flex items-center justify-between">
                      <span>ラ不動産業者名検索</span>
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 不動産種別 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">不動産種別</label>
                  <select
                    value={formData.questionType}
                    onChange={(e) => handleInputChange("questionType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="house">一戸建て</option>
                    <option value="apartment">マンション</option>
                    <option value="land">土地</option>
                  </select>
                </div>

                {/* 質問種別 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">質問種別</label>
                  <select
                    value={formData.questionCategory}
                    onChange={(e) => handleInputChange("questionCategory", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="sale">売却について</option>
                    <option value="purchase">購入について</option>
                    <option value="rent">賃貸について</option>
                  </select>
                </div>

                {/* 質問カテゴリ（全般） */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    質問カテゴリ（全般）
                  </label>
                  <select
                    value={formData.questionCategoryGeneral}
                    onChange={(e) => handleInputChange("questionCategoryGeneral", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的な質問</option>
                    <option value="technical">技術的な質問</option>
                    <option value="legal">法的な質問</option>
                  </select>
                </div>

                {/* 公開状況 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">公開状況</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.publicStatus.public}
                        onChange={(e) =>
                          handleCheckboxChange("publicStatus", "public", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">公開</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.publicStatus.nonPublic}
                        onChange={(e) =>
                          handleCheckboxChange("publicStatus", "nonPublic", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">非公開</span>
                    </label>
                  </div>
                </div>

                {/* 回答日 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">回答日</label>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.answerDateFrom}
                        onChange={(e) => handleInputChange("answerDateFrom", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.answerDateTo}
                        onChange={(e) => handleInputChange("answerDateTo", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
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

        {/* 不動産業者回答一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">不動産業者様回答一覧</h3>

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
            <span className="text-sm text-gray-600">210件中 1-20件表示</span>
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
                  <th className="border border-gray-300 p-3 text-left">回答日時</th>
                  <th className="border border-gray-300 p-3 text-left">回答者</th>
                  <th className="border border-gray-300 p-3 text-left">質問タイトル</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer) => (
                  <tr key={answer.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedAnswers.includes(answer.id)}
                        onChange={(e) => handleSelectAnswer(answer.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{answer.answerDate}</td>
                    <td className="border border-gray-300 p-3 text-sm">
                      <div>
                        <div className="font-medium">{answer.company}</div>
                        <div className="text-gray-600">{answer.representative}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {answer.questionTitle}
                    </td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          詳細
                        </button>
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          編集
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
        description={`選択された ${selectedAnswers.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default RealtorAnswerManagement;
