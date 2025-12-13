"use client";

import { QuestionSubmissionForm } from "@/components/forms/QuestionSubmissionForm";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type ReactNode, Suspense } from "react";

// useSearchParamsを使用する部分を分離
function QuestionSubmissionContent() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId");
  const answerId = searchParams.get("answerId");
  const category = searchParams.get("category");
  const isInquiryMode = !!questionId; // questionIdが存在するかどうかで判定

  /*
   * BreadcrumbItem type definition to avoid 'any'
   */
  const breadcrumbItems: { label: string; href?: string; icon?: ReactNode }[] = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産質問・相談", href: "/real-estate-consultation" },
  ];

  if (questionId) {
    breadcrumbItems.push({
      label: "質問詳細",
      href: `/question-detail?id=${questionId}`,
    });
    breadcrumbItems.push({
      label: answerId ? "特定業者へのお問い合わせ" : "お問い合わせ",
    });
  } else {
    breadcrumbItems.push({ label: "質問投稿" });
  }

  const pageTitle = questionId ? "不動産事業者へ問い合わせ" : "質問投稿";
  const pageDescription = questionId
    ? answerId
      ? "選択された不動産事業者にお問い合わせください。"
      : "不動産事業者にお問い合わせください。"
    : "不動産に関する質問を投稿してください。";

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </div>

          <QuestionSubmissionForm
            questionId={questionId}
            answerId={answerId}
            isInquiryMode={isInquiryMode}
            isLoading={false}
            selectedCategory={category}
          />
        </div>
      </main>
    </>
  );
}

// ローディングコンポーネント
function QuestionSubmissionLoading() {
  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb
          items={[
            {
              label: "ウチカツ",
              href: "/",
              icon: <Home className="w-4 h-4" />,
            },
            { label: "不動産質問・相談", href: "/real-estate-consultation" },
            { label: "質問投稿" },
          ]}
          className="mb-0"
        />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">質問投稿</h1>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      </main>
    </>
  );
}

export function QuestionSubmissionClient() {
  return (
    <Suspense fallback={<QuestionSubmissionLoading />}>
      <QuestionSubmissionContent />
    </Suspense>
  );
}
