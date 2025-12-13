import Image from "next/image";
import React from "react";

export const ConsultationHeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative h-[300px] md:h-[350px] lg:h-[400px]">
        {/* 画像 */}
        <div className="absolute right-0 h-full -ml-[175px] w-[70%]">
          <Image
            src="/questionMain.jpg"
            alt="不動産質問・相談 - 家族で不動産について相談している様子"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* テキストコンテンツ */}
        <div className="relative z-10 flex items-center h-full">
          <div className="w-1/2 pl-4 pr-8">
            <p className="text-gray-600 text-md md:text-xl font-semibold mb-4">
              知りたいこと、わからないことを解決
            </p>
            <h1 className="text-[#093893] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6">
              不動産の悩みを専門家に
              <br />
              相談しませんか？
            </h1>
            <a
              href="/question-submission"
              className="inline-block px-8 py-2 text-lg bg-[#093893] text-white border border-[#093893] hover:bg-white hover:text-[#093893] transition-colors rounded-md"
            >
              質問をする
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
