import type React from "react";
import type { RealtorAnswer } from "../types";

interface RealtorAnswerTableProps {
  answers: RealtorAnswer[];
  selectedAnswers: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectAnswer: (answerId: string, checked: boolean) => void;
}

export const RealtorAnswerTable: React.FC<RealtorAnswerTableProps> = ({
  answers,
  selectedAnswers,
  selectAll,
  onSelectAll,
  onSelectAnswer,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 p-3 text-left">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => onSelectAll(e.target.checked)}
                aria-label="全て選択"
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
                  onChange={(e) => onSelectAnswer(answer.id, e.target.checked)}
                  aria-label={`${answer.company} の回答を選択`}
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
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                  >
                    詳細
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                  >
                    編集
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
