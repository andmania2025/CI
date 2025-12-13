import type { AnswerData, QuestionData } from "@/data";
import Link from "next/link";
import type React from "react";

interface TargetCompanySectionProps {
  questionData: QuestionData | null;
  answers: AnswerData[];
}

export const TargetCompanySection: React.FC<TargetCompanySectionProps> = ({
  questionData,
  answers,
}) => {
  if (!questionData || answers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">対象の不動産業者</h2>
      <div className="space-y-4">
        {answers.map((answer) => (
          <Link key={answer.id} href={`/company-detail/${answer.id}`} className="block">
            <div className="flex items-start space-x-8 p-6 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors duration-200 cursor-pointer">
              {/* 左側：画像プレースホルダー */}
              <div className="shrink-0">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                  <span className="text-gray-500 text-sm font-medium">Image</span>
                </div>
              </div>

              {/* 右側：会社情報 */}
              <div className="flex-1 space-y-2">
                <div className="text-lg font-semibold text-gray-900">{answer.company}</div>

                <div className="text-sm text-gray-700">神奈川県大和市大和南2-2-6</div>

                <div className="text-sm text-gray-700">
                  小田急線・相鉄線「大和」駅から徒歩3分
                  店舗前に駐車スペースを3台分ご用意しております。
                </div>

                <div className="text-sm text-gray-700">03-1234-5678</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
