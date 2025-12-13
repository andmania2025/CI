import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const RealEstateKnowledgeAccordion = () => {
  return (
    <div className="mt-16">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold text-gray-800">
            不動産の基礎知識
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-gray-600">
              不動産取引の基本から、購入・売却・賃貸のポイントまで、初心者にもわかりやすく解説します。
            </p>
            <p className="text-gray-600">
              住宅ローン、税金、法律など、不動産に関連する重要な情報も含まれています。
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold text-gray-800">
            物件選びのポイント
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-gray-600">
              立地、建物の状態、価格など、物件選びで重要な要素を詳しく説明します。
            </p>
            <p className="text-gray-600">
              実際の物件を見る際のチェックポイントや、注意すべき点も紹介します。
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold text-gray-800">
            不動産業者の選び方
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-gray-600">
              信頼できる不動産業者を見分けるポイントや、業者との付き合い方を解説します。
            </p>
            <p className="text-gray-600">
              複数の業者に相談することの重要性や、契約時の注意点も含まれています。
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
