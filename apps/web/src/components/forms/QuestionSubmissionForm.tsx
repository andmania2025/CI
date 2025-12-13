"use client";

import { Button } from "@/components/ui/button";
import { mockAnswers, mockQuestions } from "@/data";
import { useQuestionForm } from "@/hooks/useQuestionForm";
import type React from "react";
import { AgreementSection } from "./AgreementSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { QuestionCategorySection } from "./QuestionCategorySection";
import { QuestionContentSection } from "./QuestionContentSection";
import { QuestionSubmissionSkeleton } from "./QuestionSubmissionSkeleton";
import { TargetCompanySection } from "./TargetCompanySection";
import { TermsModal } from "./TermsModal";

interface QuestionSubmissionFormProps {
  questionId?: string | null;
  answerId?: string | null;
  isInquiryMode?: boolean;
  isLoading?: boolean;
  selectedCategory?: string | null;
}

export const QuestionSubmissionForm: React.FC<QuestionSubmissionFormProps> = ({
  questionId,
  answerId,
  isInquiryMode = false,
  isLoading = false,
  selectedCategory = null,
}) => {
  const {
    formData,
    errors,
    modalState,
    canCheckAgreement,
    handleInputChange,
    openModal,
    closeModal,
    handleSubmit,
  } = useQuestionForm({
    isInquiryMode,
    selectedCategory,
  });

  // 質問詳細データと回答データを取得
  const questionData = questionId ? mockQuestions[questionId] : null;
  const allAnswers = questionId ? mockAnswers[questionId] || [] : [];

  // answerIdが指定されている場合は、その回答者のみを表示
  const answers = answerId ? allAnswers.filter((answer) => answer.id === answerId) : allAnswers;

  // ローディング状態の場合はスケルトンを表示
  if (isLoading) {
    return <QuestionSubmissionSkeleton isInquiryMode={isInquiryMode} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 対象の不動産業者セクション（お問い合わせモードの場合のみ表示） */}
      {isInquiryMode && <TargetCompanySection questionData={questionData} answers={answers} />}

      {/* 質問投稿フォーム */}
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-lg border border-black/20 p-10 space-y-6"
      >
        {/* 基本情報セクション */}
        <BasicInfoSection formData={formData} errors={errors} onInputChange={handleInputChange} />

        {/* 質問カテゴリセクション */}
        <QuestionCategorySection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* 個人情報セクション */}
        <PersonalInfoSection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* 質問内容セクション */}
        <QuestionContentSection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* 同意事項 */}
        <AgreementSection
          formData={formData}
          errors={errors}
          canCheckAgreement={canCheckAgreement}
          onInputChange={handleInputChange}
          onOpenModal={openModal}
        />

        {/* 送信ボタン */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3 text-lg bg-[#093893] text-white border border-[#093893] hover:bg-white hover:text-[#093893] transition-colors"
          >
            お問い合わせ
          </Button>
        </div>
      </form>

      {/* モーダル */}
      {modalState.isOpen && modalState.type && (
        <TermsModal isOpen={modalState.isOpen} onClose={closeModal} type={modalState.type} />
      )}
    </div>
  );
};
