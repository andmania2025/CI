import { Search } from "lucide-react";
import type React from "react";
import type { RealtorAnswerFormData } from "../types";

interface RealtorAnswerSearchFormProps {
  formData: RealtorAnswerFormData;
  onInputChange: (field: string, value: string) => void;
  onCheckboxChange: (
    category: keyof RealtorAnswerFormData,
    field: string,
    checked: boolean,
  ) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const RealtorAnswerSearchForm: React.FC<
  RealtorAnswerSearchFormProps
> = ({ formData, onInputChange, onCheckboxChange, onSearch, onReset }) => {
  return (
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
              onChange={(e) => onInputChange("freeword", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="キーワードで検索"
            />
          </div>

          {/* 不動産業者名 */}
          <div>
            <label
              htmlFor="realEstateCompanySearch"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              不動産業者名
            </label>
            <div className="relative">
              <button
                id="realEstateCompanySearch"
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-600 text-white text-left flex items-center justify-between"
              >
                <span>不動産業者名検索</span>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 不動産種別 */}
          <div>
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              不動産種別
            </label>
            <select
              id="questionType"
              value={formData.questionType}
              onChange={(e) => onInputChange("questionType", e.target.value)}
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
            <label
              htmlFor="questionCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              質問種別
            </label>
            <select
              id="questionCategory"
              value={formData.questionCategory}
              onChange={(e) =>
                onInputChange("questionCategory", e.target.value)
              }
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
            <label
              htmlFor="questionCategoryGeneral"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              質問カテゴリ（全般）
            </label>
            <select
              id="questionCategoryGeneral"
              value={formData.questionCategoryGeneral}
              onChange={(e) =>
                onInputChange("questionCategoryGeneral", e.target.value)
              }
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
            <span className="block text-sm font-medium text-gray-700 mb-3">
              公開状況
            </span>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.publicStatus.public}
                  onChange={(e) =>
                    onCheckboxChange("publicStatus", "public", e.target.checked)
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
                    onCheckboxChange(
                      "publicStatus",
                      "nonPublic",
                      e.target.checked,
                    )
                  }
                  className="mr-2"
                />
                <span className="text-sm">非公開</span>
              </label>
            </div>
          </div>

          {/* 回答日 */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              回答日
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  id="answerDateFrom"
                  type="date"
                  aria-label="回答日（開始）"
                  value={formData.answerDateFrom}
                  onChange={(e) =>
                    onInputChange("answerDateFrom", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <span className="text-gray-500">〜</span>
              <div className="relative">
                <input
                  id="answerDateTo"
                  type="date"
                  aria-label="回答日（終了）"
                  value={formData.answerDateTo}
                  onChange={(e) =>
                    onInputChange("answerDateTo", e.target.value)
                  }
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
          type="button"
          onClick={onReset}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          条件をリセット
        </button>
        <button
          type="button"
          onClick={onSearch}
          className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          検索する
        </button>
      </div>
    </div>
  );
};
