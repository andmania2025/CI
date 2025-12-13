"use client";

import { FavoriteButton } from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import type { MansionProperty } from "../types/property.types";

interface MansionPropertyCardProps {
  property: MansionProperty;
  onClick?: () => void;
}

// 詳細項目コンポーネント
const DetailItem = React.memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-600 font-semibold">{label}:</span>
    <span className="text-right">{value}</span>
  </div>
));

DetailItem.displayName = "DetailItem";

export const MansionPropertyCard = React.memo(({ property, onClick }: MansionPropertyCardProps) => {
  const [isScrolling, setIsScrolling] = React.useState(false);

  // スクロール検出
  React.useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  // キーボードイベントハンドラー
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  // お気に入りアイテムの変換（メモ化）
  const favoriteItem = React.useMemo(
    () => ({
      id: property.id.toString(),
      type: "sale" as const,
      title: property.title,
      image: property.image,
      price: property.price,
      description: property.description,
      details: property.details,
    }),
    [property]
  );

  return (
    <Card
      className={cn(
        "shadow-lg transition-all duration-300 cursor-pointer group",
        !isScrolling && "hover:shadow-xl"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* 視覚的に隠されたボタンでアクセシビリティを確保 */}
      <Button
        variant="ghost"
        className="sr-only"
        aria-label={`${property.title}の詳細を表示`}
        onClick={onClick}
      >
        {property.title}の詳細を表示
      </Button>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div className="relative h-[180px] w-full">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className={cn(
                "object-cover transition-transform duration-300 will-change-transform",
                !isScrolling && "group-hover:scale-105"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* 価格バッジ */}
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold shadow-md">
            {property.price}
          </div>

          {/* お気に入りボタン */}
          <div className="absolute top-2 right-2">
            <FavoriteButton item={favoriteItem} />
          </div>
        </div>

        <div className="p-4">
          {/* タイトル */}
          <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors text-primary">
            {property.title}
          </h3>

          {/* 説明 */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* 詳細情報 */}
          <div className="space-y-1 text-xs">
            <DetailItem label="所在地" value={property.details.location} />
            <DetailItem label="交通" value={property.details.access} />
            <DetailItem label="建物" value={property.details.buildingType} />
            <DetailItem label="階数" value={property.details.floor} />
            <DetailItem label="間取り" value={property.details.rooms} />
            <DetailItem label="面積" value={property.details.area} />
            <DetailItem label="築年月" value={property.details.year} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

MansionPropertyCard.displayName = "MansionPropertyCard";
