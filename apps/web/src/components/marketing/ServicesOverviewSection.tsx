"use client";

import Image from "next/image";
import React from "react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const ServiceCard = ({ icon, title, description, href }: ServiceCardProps) => {
  const content = (
    <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg hover:border-[#093893] hover:shadow-md transition-all duration-300 cursor-pointer group">
      <div className="w-16 h-16 mb-4 flex items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="w-full h-full text-[#093893]"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#093893] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

export const ServicesOverviewSection = () => {
  const mainServices = [
    {
      icon: "/top/icon/buy_real_estate.svg",
      title: "不動産を購入する",
      description: "ご希望の不動産エリアや価格帯から検索可能です",
      href: "/search?type=sale",
    },
    {
      icon: "/top/icon/rent_real_estate.svg",
      title: "不動産を借りる",
      description: "ご希望の不動産エリアや価格帯から検索可能です",
      href: "/search?type=rental",
    },
    {
      icon: "/top/icon/consult_real_estate.svg",
      title: "不動産の相談をする",
      description: "お持ちの不動産について相談する",
      href: "/real-estate-consultation",
    },
    {
      icon: "/top/icon/appraise_real_estate.svg",
      title: "不動産の査定をする",
      description: "資産算出、売却し価格の査定が可能です",
      href: "/real-estate-appraisal",
    },
  ];

  const additionalServices = [
    {
      icon: "/top/icon/find_real_estate_agent.svg",
      title: "不動産屋を探す",
      description: "優良な評価にした不動産業者を検索します",
      href: "/real-estate-agent-search",
    },
    {
      icon: "/top/icon/register_real_estate_agent.svg",
      title: "不動産業者の登録をする",
      description: "不動産業者は無料で物件掲載登録可能です",
      href: "/real-estate-agent-registration",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* ヘッダーテキスト */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#093893] mb-4">
            0円物件も検索、無料掲載可能！
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            空き家・空地・あらゆる不動産の問題を解決するなら"ウチカツ"
          </p>
          <p className="text-lg text-gray-700 mb-8">
            どこにもない物件と素敵な不動産屋が見つかります！
          </p>
        </div>

        {/* サービス説明テキスト */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold">日本全国対応！</span>
            「ポータルサイトにも掲載されない」「一括査定サイトでも反応が無い」
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            それはポータルサイト利用に多額の広告費を不動産会社が負担しているから！
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-[#093893]">業界初！</span>
            ウチカツは不動産業者も物件掲載、一括査定、不動産相談が
            <span className="font-semibold text-[#093893]">「全て無料」</span>
            <br />
            謳っていた不動産を売るなら・お宝物件を買うなら"不動産SNSウチカツ(UCIKATU)"
          </p>
        </div>

        {/* メインサービス（4つのカード） */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainServices.map((service, index) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* 追加サービス（2つのカード） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {additionalServices.map((service, index) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
