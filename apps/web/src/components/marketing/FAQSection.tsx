"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useCallback, memo } from "react";

// よくあるご質問のデータ
const FAQ_DATA = [
  {
    id: 1,
    title: "不動産の基礎知識",
    subtitle: "購入・売却の基本について",
    content:
      "不動産取引の基本から、購入・売却・賃貸のポイントまで、初心者にもわかりやすく解説します。住宅ローン、税金、法律など、不動産に関連する重要な情報も含まれています。",
  },
  {
    id: 2,
    title: "物件選びのポイント",
    subtitle: "良い物件の見分け方",
    content:
      "立地、建物の状態、価格など、物件選びで重要な要素を詳しく説明します。実際の物件を見る際のチェックポイントや、注意すべき点も紹介します。",
  },
  {
    id: 3,
    title: "不動産業者の選び方",
    subtitle: "信頼できる業者の特徴",
    content:
      "信頼できる不動産業者を見分けるポイントや、業者との付き合い方を解説します。複数の業者に相談することの重要性や、契約時の注意点も含まれています。",
  },
  {
    id: 4,
    title: "住宅ローンの基礎",
    subtitle: "融資の種類と審査について",
    content:
      "住宅ローンの種類、金利の仕組み、審査基準など、住宅ローンに関する基本情報を解説します。返済計画の立て方や、金利変動への対応方法も含まれています。",
  },
  {
    id: 5,
    title: "不動産の税金と手続き",
    subtitle: "購入時の諸費用について",
    content:
      "不動産購入・売却時の税金、登記手続き、各種届出など、必要な手続きを詳しく説明します。節税のポイントや、専門家への相談タイミングも含まれています。",
  },
  {
    id: 6,
    title: "リフォーム・メンテナンス",
    subtitle: "住まいの維持管理",
    content:
      "リフォームの種類やメンテナンスの重要性について解説します。予算の立て方や業者選びのコツも含まれています。",
  },
];

// FAQアイテムコンポーネント
const FAQItem = memo(
  ({
    faq,
    isOpen,
    onToggle,
  }: {
    faq: (typeof FAQ_DATA)[0];
    isOpen: boolean;
    onToggle: (id: number) => void;
  }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Button
          variant="ghost"
          id={`faq-button-${faq.id}`}
          onClick={() => onToggle(faq.id)}
          className="w-full p-4 text-left group h-auto hover:bg-transparent"
          aria-expanded={isOpen}
          aria-controls={`faq-content-${faq.id}`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 text-wrap">
              <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#093893] transition-colors duration-200">
                {faq.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1 font-normal">{faq.subtitle}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-[#093893]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#093893]" />
              )}
            </div>
          </div>
        </Button>

        {/* アコーディオンコンテンツ */}
        {isOpen && (
          <div
            id={`faq-content-${faq.id}`}
            className="border-t border-gray-100"
            role="region"
            aria-labelledby={`faq-button-${faq.id}`}
          >
            <div className="px-4 pb-4 pt-2">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.content}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FAQItem.displayName = "FAQItem";

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = useCallback((id: number) => {
    setOpenFAQ((prevOpenFAQ) => {
      const newState = prevOpenFAQ === id ? null : id;
      return newState;
    });
  }, []);

  return (
    <div className="mb-20">
      <h3 className="text-xl md:text-2xl font-bold text-left mb-12 text-gray-800">
        よくあるご質問
      </h3>

      {/* モバイル：1列表示 */}
      <div className="block md:hidden space-y-6">
        {FAQ_DATA.map((faq) => (
          <FAQItem key={faq.id} faq={faq} isOpen={openFAQ === faq.id} onToggle={toggleFAQ} />
        ))}
      </div>

      {/* タブレット・デスクトップ：2列表示 */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {/* 左列 */}
        <div className="space-y-6">
          {FAQ_DATA.filter((_, index) => index % 2 === 0).map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openFAQ === faq.id} onToggle={toggleFAQ} />
          ))}
        </div>

        {/* 右列 */}
        <div className="space-y-6">
          {FAQ_DATA.filter((_, index) => index % 2 === 1).map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openFAQ === faq.id} onToggle={toggleFAQ} />
          ))}
        </div>
      </div>
    </div>
  );
};
