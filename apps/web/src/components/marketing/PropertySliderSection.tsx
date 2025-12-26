"use client";

import {
  type ProductData,
  ProductSwapCard,
} from "@/components/cards/product-swap-card";
import { Button } from "@/components/ui/button";
import type { MockProperty } from "@/data/mockProperties";
import { cn } from "@/lib/utils";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

// MockPropertyをProductDataに変換する関数
const convertToProductData = (property: MockProperty): ProductData => {
  // サムネイル補完用のデフォルト画像プール（public/section 配下）
  const fallbackThumbnails: string[] = [
    "/section/section-17.jpg",
    "/section/section-18.jpg",
    "/section/section-19.jpg",
    "/section/section-20.jpg",
    "/section/section-22.jpg",
  ];

  // 最寄り駅と交通手段の解析
  const stationInfo = property.station || "";

  // 交通手段のパターンマッチング（徒歩、車、バスなど）
  const transportationMatch = stationInfo.match(
    /(徒歩\d+分|車\d+分|バス.*?\d+分)/,
  );
  const transportation = transportationMatch
    ? transportationMatch[1]
    : property.transportation || "";

  // 駅名の抽出（交通手段を除いた部分）
  let stationName = stationInfo
    .replace(/(徒歩\d+分|車\d+分|バス.*?\d+分)/, "")
    .trim();

  // 距離情報（m表記）を除去
  stationName = stationName.replace(/\(\d+m\)/, "").trim();

  // バス停や交通手段のみの場合は非表示にする判定
  const isOnlyTransportation = !stationName && transportation;
  const isBusRoute =
    stationInfo.includes("バス") || transportation?.includes("バス");
  const isCarOnly =
    transportation?.includes("車") || stationInfo.includes("車");

  // stationの完全な情報を一つのバッジにまとめる（適切な場合のみ）
  const stationDisplay = (() => {
    // 車25分の場合は非表示
    if (isCarOnly) {
      return "";
    }

    // バス路線の場合は非表示
    if (isBusRoute) {
      return "";
    }

    // 交通手段のみで駅名がない場合は非表示
    if (isOnlyTransportation) {
      return "";
    }

    // 正常な駅名がある場合のみ表示
    if (stationName && transportation && !isBusRoute) {
      return `${stationName} ${transportation}`;
    }
    if (stationName && !isBusRoute) {
      return stationName;
    }

    return "";
  })();

  const tags = [
    property.landArea ? `土地面積 ${property.landArea}` : "",
    property.buildingArea
      ? `建物面積・専有面積 ${property.buildingArea}`
      : property.area
        ? `面積 ${property.area}`
        : "",
    property.builtYear ? `建築年月 ${property.builtYear}` : "",
    property.layout ? `間取り ${property.layout}` : "",
    stationDisplay ? `最寄り駅 ${stationDisplay}` : "",
    property.structure ? `建物構造・階数 ${property.structure}` : "",
    property.yieldRate ? `表面利回り ${property.yieldRate}%` : "",
  ].filter(Boolean);

  // 画像配列が1枚以下の場合はデフォルトプールから補完して最大5枚にする
  const thumbnail: string[] = Array.from(
    new Set([...(property.images || []), ...fallbackThumbnails]),
  ).slice(0, 5);

  return {
    title: property.title,
    excerpt: `${property.location} ${property.station}`,
    address: property.location,
    createdAt: "2024年12月",
    domain: "ucikatu.com",
    slug: property.id,
    alt: thumbnail.map((_, idx) => `${property.title} - 物件画像${idx + 1}`),
    techStack: tags,
    thumbnail,
    actionLabel: "詳細を見る",
    price: property.price,
    station: property.station,
    id: property.id,
    isRental: property.isRental === true, // 明示的にbooleanに変換
    // お気に入りに追加する際に必要なデータを追加
    mockProperty: {
      ...property,
      floor: property.floor || "", // floorがundefinedの場合は空文字列を設定
      layout: property.layout || "", // layoutがundefinedの場合は空文字列を設定
      area: property.area || "", // areaがundefinedの場合は空文字列を設定
      builtYear: property.builtYear || "", // builtYearがundefinedの場合は空文字列を設定
    },
  };
};

interface PropertySliderSectionProps {
  title: string;
  properties: MockProperty[];
  className?: string;
  isFullWidth?: boolean;
}

export const PropertySliderSection = ({
  title,
  properties,
  className = "",
  isFullWidth = false,
}: PropertySliderSectionProps) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const updateCanScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    updateCanScroll();
    if (!el) return;

    const onScroll = () => updateCanScroll();
    el.addEventListener("scroll", onScroll);

    const observer = new ResizeObserver(() => updateCanScroll());
    observer.observe(el);
    if (el.firstElementChild) {
      observer.observe(el.firstElementChild);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [updateCanScroll]);

  const getScrollStep = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 400;
    const firstCard = el.querySelector("[data-card]") as HTMLElement | null;
    if (firstCard) {
      return firstCard.offsetWidth + 16; // カード幅 + gap
    }
    return Math.max(420, Math.floor(el.clientWidth * 0.8));
  }, []);

  const handlePrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  };

  const handleNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  };

  return (
    <div className={className}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={!canPrev}
            className="h-10 w-10 rounded-full bg-gray-100 text-black hover:text-white hover:bg-[#093893]/90 disabled:opacity-50 transition-colors"
            aria-label="previous"
          >
            <MoveLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={!canNext}
            className="h-10 w-10 rounded-full bg-white text-black shadow-sm hover:text-white hover:bg-[#093893]/90 disabled:opacity-50 transition-colors"
            aria-label="next"
          >
            <MoveRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* スライダー部分 */}
      <div className="relative overflow-visible z-0">
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth w-full relative z-0"
          style={{ isolation: "auto" }}
        >
          <div className="flex gap-3 px-1 w-full relative z-0">
            {properties.map((property, index) => {
              return (
                <div
                  key={property.id || index}
                  data-card
                  className={cn(
                    "shrink-0 relative",
                    isFullWidth
                      ? "w-[calc((100%-36px)/4)] min-w-[280px] xl:w-[calc((100%-48px)/5)] 2xl:w-[calc((100%-60px)/6)]" // 4-6カラム表示用
                      : "w-[calc((100%-12px)/2)] min-w-[280px] xl:w-[calc((100%-12px)/2)] 2xl:w-[calc((100%-12px)/2)]", // 常に2カラム表示用
                  )}
                >
                  <ProductSwapCard
                    product={convertToProductData(property)}
                    className="w-full"
                    isNew={property.isNew}
                    forceShowNewBadge={true}
                    disableHoverScale={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
