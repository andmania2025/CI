"use client";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { type AnswerData, type QuestionData, mockAnswers, mockQuestions } from "@/data";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function QuestionDetailClient() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [answers, setAnswers] = useState<AnswerData[]>([]);

  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産質問・相談", href: "/real-estate-consultation" },
    { label: "質問詳細" },
  ];

  useEffect(() => {
    if (questionId && mockQuestions[questionId]) {
      setQuestionData(mockQuestions[questionId]);
      setAnswers(mockAnswers[questionId] || []);
    }
  }, [questionId]);

  if (!questionData) {
    return (
      <>
        <div className="pt-16 pb-0 pl-18 bg-white">
          <Breadcrumb items={breadcrumbItems} className="mb-0" />
        </div>
        <main className="pt-4 pb-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 bg-white">
            <div className="text-center py-8 text-gray-500">質問が見つかりませんでした。</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18 bg-white">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 bg-white">
          {/* 質問詳細カード */}
          <div className="bg-white rounded-lg border border-[#093893]/20 p-8 shadow-sm mb-8">
            {/* 質問タイトル */}
            <h1 className="text-xl font-bold text-gray-900 mb-6">{questionData.title}</h1>

            {/* 質問内容 */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {questionData.content}
              </p>
            </div>

            {/* タグとメタデータ */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* タグ */}
              <div className="flex flex-wrap gap-2">
                {[questionData.category, "一戸建て", "市街地調整区域・農地"].map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[#093893] text-white border-[#093893] hover:bg-white hover:text-[#093893] transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 質問メタデータ */}
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">{questionData.author}</div>
                <div className="text-xs text-gray-500">質問日 {questionData.postedAt} 22:38:20</div>
                <div className="text-xs text-gray-500">回答数 {questionData.replies}</div>
              </div>
            </div>
          </div>

          {/* 回答セクション */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">回答 ({answers.length})</h2>

            {answers.length > 0 ? (
              <Accordion
                type="multiple"
                className="space-y-4"
                defaultValue={answers.map((answer) => answer.id)}
              >
                {answers.map((answer) => (
                  <AccordionItem
                    key={answer.id}
                    value={answer.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{answer.company}</div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      {/* 回答内容 */}
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {answer.content}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-gray-500">
                回答はまだありません。最初の回答者になりませんか？
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
