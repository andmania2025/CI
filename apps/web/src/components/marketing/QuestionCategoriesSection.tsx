import { unstable_noStore } from "next/cache";
import React from "react";
import { FAQSection } from "./FAQSection";
import { QuestionCategoriesGrid } from "./QuestionCategoriesGrid";

export const QuestionCategoriesSection = () => {
  // 動的コンテンツとしてマーク
  unstable_noStore();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* よくあるご質問セクション */}
        <FAQSection />

        {/* 不動産の質問を見るセクション */}
        <QuestionCategoriesGrid />
      </div>
    </section>
  );
};
