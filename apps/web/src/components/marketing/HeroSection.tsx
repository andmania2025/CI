import { PropertySearchForm } from "@/features/search/components/PropertySearchForm";
import Image from "next/image";
import React from "react";
import { cache } from "react";

const CachedHeroSection = cache(() => {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="ヒーロー背景画像"
          fill
          className="object-cover opacity-100"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-blue-800/3 to-blue-700/5" />

      {/* コンテンツ */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <div className="text-white space-y-6">
            {/* ロゴ */}
            <div className="mb-4 flex justify-center">
              <Image
                src="/top/logo/white-logo.svg"
                alt="ウチカツ"
                width={288}
                height={80}
                className="drop-shadow-lg"
                unoptimized={true}
                priority
              />
            </div>

            {/* キャッチコピー */}
            <div className="space-y-xp">
              <h1 className="text-base md:text-lg font-medium leading-tight">
                空地・空き家の売却・賃貸・相談・査定
              </h1>
              <p className="text-base md:text-lg font-medium">
                あなたにあった物件と不動産屋が見つかる！
              </p>
            </div>

            {/* 検索フォーム */}
            <PropertySearchForm />
          </div>
        </div>
      </div>

      {/* 追加の装飾要素 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
});

export const HeroSection = CachedHeroSection;
