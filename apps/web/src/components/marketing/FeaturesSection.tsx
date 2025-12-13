import { horizontalCards, serviceCards } from "@/data/mockServiceCards";
import React from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceCardHorizontal } from "./ServiceCardHorizontal";

export const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="text-[#093893] text-md md:text-2xl">
            0円物件も検索、無料掲載可能！
            <br />
            空き家・空地・あらゆる不動産の問題を解決するなら&ldquo;ウチカツ&rdquo;
            <br />
            どこにもない物件と素敵な不動産屋が見つかります！
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-center mt-10 mb-12">
            <div className="text-sm md:text-lg">
              日本全国対応！「ポータルサイトにも掲載されない」「一括査定サイトでも反応が無い」
              <br />
              それはポータルサイト利用に多額の広告費を不動産会社が負担しているから！
              <br />
              業界初！ウチカツは不動産業者も物件掲載、一括査定、不動産相談が「全て無料」
              <br />
              諦めていた不動産を売るなら・お宝物件を買うなら&ldquo;不動産SNSウチカツ(UCIKATU)&rdquo;
            </div>
          </div>

          {/* サービスカード（上段4枚） */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={index}
                iconSrc={card.iconSrc}
                title={card.title}
                description={card.description}
                alt={card.alt}
              />
            ))}
          </div>

          {/* サービスカード（下段横並び2枚） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {horizontalCards.map((card, index) => (
              <ServiceCardHorizontal
                key={index}
                iconSrc={card.iconSrc}
                title={card.title}
                description={card.description}
                alt={card.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
