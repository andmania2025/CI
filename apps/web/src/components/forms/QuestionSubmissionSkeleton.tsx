"use client";

import type React from "react";

interface QuestionSubmissionSkeletonProps {
  isInquiryMode?: boolean;
}

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="flex items-start space-x-8 p-6 bg-gray-50 rounded-lg">
      {/* 左側：画像プレースホルダーのスケルトン */}
      <div className="shrink-0">
        <div className="w-32 h-32 bg-gray-300 rounded-lg" />
      </div>

      {/* 右側：会社情報のスケルトン */}
      <div className="flex-1 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  </div>
);

const SkeletonForm = () => (
  <div className="animate-pulse">
    <div className="bg-card rounded-lg border border-black/20 p-10 space-y-6">
      {/* 基本情報セクションのスケルトン */}
      <section>
        <div className="space-y-4">
          {/* タイトル */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-16" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>

          {/* 都道府県 */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>

          {/* 市区町村 */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>
        </div>
      </section>

      {/* 質問カテゴリセクションのスケルトン */}
      <section>
        <div className="space-y-4">
          {/* 質問カテゴリ */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-24" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>

          {/* 不動産種別 */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-24" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>

          {/* 物件特徴 */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>
        </div>
      </section>

      {/* 個人情報セクションのスケルトン */}
      <section>
        <div className="space-y-4">
          {/* ニックネーム */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>

          {/* メールアドレス */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-28" />
            <div className="h-10 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>
        </div>
      </section>

      {/* 質問内容セクションのスケルトン */}
      <section>
        <div className="space-y-4">
          {/* 質問内容 */}
          <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-32 bg-gray-300 rounded w-full max-w-[720px]" />
          </div>
        </div>
      </section>

      {/* 同意事項のスケルトン */}
      <section className="text-center bg-[#f2f7ff] rounded-md p-6 w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-64" />
        </div>
      </section>

      {/* 送信ボタンのスケルトン */}
      <div className="flex justify-center">
        <div className="h-12 bg-gray-300 rounded w-32" />
      </div>
    </div>
  </div>
);

export const QuestionSubmissionSkeleton: React.FC<QuestionSubmissionSkeletonProps> = ({
  isInquiryMode = false,
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 対象の不動産業者セクションのスケルトン */}
      {isInquiryMode && (
        <div className="bg-white rounded-lg p-6">
          <div className="h-6 bg-gray-300 rounded w-48 mb-4 animate-pulse" />
          <SkeletonCard />
        </div>
      )}

      {/* フォームのスケルトン */}
      <SkeletonForm />
    </div>
  );
};
