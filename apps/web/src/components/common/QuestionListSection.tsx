"use client";

import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { type QuestionPost, mockQuestionPosts } from "@/data/mockQuestionPosts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { QuestionCard } from "./QuestionCard";

interface QuestionListSectionProps {
  questionsPerPage?: number;
  className?: string;
}

export const QuestionListSection: React.FC<QuestionListSectionProps> = ({
  questionsPerPage = 6,
  className,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // クライアントサイドでのみマウントされたかどうかを確認
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 質問データを取得（実際のアプリケーションではAPIから取得）
  const allQuestions = mockQuestionPosts;

  // ページネーション計算
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  const handleQuestionClick = (questionId: string) => {
    router.push(`/question-detail?id=${questionId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 質問一覧のグリッド部分にスクロール（少し余裕を持たせる）
    if (gridRef.current) {
      const elementTop = gridRef.current.offsetTop;
      const offsetPosition = elementTop - 100; // 100px上に余裕を持たせる

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // サーバーサイドレンダリング時はローディング状態を表示（スケルトン）
  if (!isMounted) {
    return (
      <section ref={sectionRef} id="question-list-section" className={cn("py-8", className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">投稿質問をみる</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: questionsPerPage }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm h-full flex flex-col"
              >
                {/* Header: Badge & Date */}
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2 space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>

                {/* Excerpt */}
                <div className="flex-1 space-y-2 mb-4 mt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Footer: Answers & Views */}
                <div className="flex items-center justify-between mt-auto border-t border-transparent pt-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="question-list-section" className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">投稿質問をみる</h2>
        </div>

        {currentQuestions.length > 0 ? (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {currentQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={handleQuestionClick}
                  className="h-full"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">質問がありません</p>
          </div>
        )}
      </div>
    </section>
  );
};
