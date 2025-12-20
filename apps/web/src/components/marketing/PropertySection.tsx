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

interface PropertySectionProps {
  title: string;
  properties: MockProperty[];
}

// MockPropertyをProductDataに変換する関数
const convertToProductData = (property: MockProperty): ProductData => {
  // サムネイル補完用のデフォルト画像プール（public/section 配下）
  const fallbackThumbnails: string[] = [
    "/section/peter-hoogmoed-pmvHjs6wqhY-unsplash.jpg",
    "/section/redd-francisco-sejLyCD2UQE-unsplash.jpg",
    "/section/sava-bobov-WzxdkFw9OMU-unsplash.jpg",
    "/section/terrah-holly-pmhdkgRCbtE-unsplash.jpg",
    "/section/tommy-wong-ebUqtlITycQ-unsplash.jpg",
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
  };
};

export const PropertySection = ({
  title,
  properties,
}: PropertySectionProps) => {
  // カルーセルUIを適用するセクション（売買・賃貸・100万円以下）を判定
  const isCarouselSection =
    title.includes("100万円以下") ||
    title.includes("新着の賃貸物件") ||
    title.includes("新着の売買物件");

  // 新着セクションかどうかの判定をメモ化して安定化
  const isNewSection = React.useMemo(() => {
    return (
      title.includes("新着の売買物件") ||
      title.includes("新着の賃貸物件") ||
      title.includes("新着の100万円以下物件情報")
    );
  }, [title]);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const updateCanScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // プロパティが空の場合はスクロール不可にする
    if (properties.length === 0) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [properties]);

  React.useEffect(() => {
    if (!isCarouselSection) return;
    const el = scrollRef.current;
    updateCanScroll();
    if (!el) return;
    const onScroll = () => updateCanScroll();
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [isCarouselSection, updateCanScroll]);

  const getScrollStep = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 400;
    const firstCard = el.querySelector("[data-card]") as HTMLElement | null;
    if (firstCard) {
      // 4つのカードが表示される場合は、1カード分をスクロール
      if (isNewSection) {
        return firstCard.offsetWidth + 16; // カード幅 + gap
      }
      const style = window.getComputedStyle(firstCard);
      const marginRight = Number.parseInt(style.marginRight || "0", 10);
      return firstCard.offsetWidth + marginRight;
    }
    return Math.max(420, Math.floor(el.clientWidth * 0.8));
  }, [isNewSection]);

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
    <div className="mb-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 m-0">
          {title}
        </h2>
        {isCarouselSection && (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              disabled={!canPrev}
              className="h-10 w-10 rounded-full bg-gray-100 text-black hover:text-white hover:bg-[#093893]/90 disabled:opacity-50 transition-colors"
              aria-label="previous"
            >
              <MoveLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={!canNext}
              className="h-10 w-10 rounded-full bg-white text-black shadow-sm hover:text-white hover:bg-[#093893]/90 disabled:opacity-50 transition-colors"
              aria-label="next"
            >
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {!isCarouselSection && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => {
            return (
              <ProductSwapCard
                key={property.id || index}
                product={convertToProductData(property)}
                className="w-full"
                isNew={property.isNew}
                disableHoverScale={true}
              />
            );
          })}
        </div>
      )}

      {isCarouselSection && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar scroll-smooth"
          >
            <div className="flex gap-6 px-2">
              {properties.map((property, index) => {
                return (
                  <div
                    key={property.id || index}
                    data-card
                    className={cn(
                      "shrink-0",
                      // 新着物件セクションでは4つのカードが完全に表示されるように横幅を調整
                      isNewSection
                        ? "w-[calc((100%-96px)/4)] min-w-[360px]" // ギャップを24pxに増加し、最小幅を360pxに設定
                        : "w-[380px] sm:w-[420px]", // その他のセクションは従来の横幅
                    )}
                  >
                    <ProductSwapCard
                      product={convertToProductData(property)}
                      className="w-full"
                      isNew={property.isNew}
                      forceShowNewBadge={isNewSection}
                      disableHoverScale={isNewSection}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
