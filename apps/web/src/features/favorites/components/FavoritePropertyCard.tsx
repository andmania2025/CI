import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FavoriteItem } from "@/lib/services/favorites";
import Image from "next/image";
import type React from "react";
import { memo } from "react";

interface FavoritePropertyCardProps {
  property: FavoriteItem;
  onClick?: () => void;
}

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem = memo(({ label, value }: DetailItemProps) => (
  <div className="flex justify-between">
    <span className="text-gray-600 font-extrabold">{label}:</span>
    <span className="text-right text-xs">{value}</span>
  </div>
));

DetailItem.displayName = "DetailItem";

export const FavoritePropertyCard = memo(({ property, onClick }: FavoritePropertyCardProps) => {
  const handleCardClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  // 画像パスを正規化（確実に正しいパスを使用）
  const imageSrc = (() => {
    if (!property.image) return "/real-estate-general.jpg";

    // パスが既に絶対パスの場合
    if (property.image.startsWith("/")) {
      return property.image;
    }

    // 相対パスの場合は絶対パスに変換
    return `/${property.image}`;
  })();

  // 画像が存在しない場合のフォールバック
  const fallbackImage = "/real-estate-general.jpg";

  return (
    <Card
      className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {/* 視覚的に隠されたボタンでアクセシビリティを確保 */}
      <Button
        type="button"
        className="sr-only"
        aria-label={`${property.title}の詳細を表示`}
        onClick={handleCardClick}
        variant="ghost" // Using ghost variant as it's the most minimal for an sr-only button
      >
        {property.title}の詳細を表示
      </Button>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative w-full h-[200px] shrink-0">
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              console.error("Image failed to load:", imageSrc);
              // フォールバック画像を設定
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
              // フォールバック画像でもエラーが発生した場合の処理
              target.onerror = () => {
                console.error("Fallback image also failed to load");
                target.style.display = "none";
              };
            }}
          />

          {/* 新着バッジを左上に表示 */}
          <div className="absolute top-2 left-2 z-20">
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-0 px-2 py-1 text-xs font-medium"
            >
              New
            </Badge>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          {/* 価格表示を最初に大きく表示 */}
          <div className="flex items-baseline mb-3">
            <span className="text-xl font-extrabold text-red-600">
              {(() => {
                if (property.type === "sale") {
                  return property.price?.replace("万円", "") || "0";
                }
                // 賃貸物件の場合：rentフィールドを優先、なければpriceフィールドを使用
                const rentValue = property.rent?.replace("万円", "");
                const priceValue = property.price?.replace("万円", "");
                return rentValue || priceValue || "0";
              })()}
            </span>
            <span className="text-sm text-gray-600 ml-1">万円</span>
          </div>

          {/* 物件名 */}
          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-800">{property.title}</h3>

          {/* 住所 */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{property.details.location}</p>

          {/* バッジ表示 - 2×3グリッドに最適化（項目名 + 値） */}
          <div className="flex flex-wrap gap-1 mb-4 flex-1">
            {/* 交通バッジ */}
            {property.details.access && property.details.access.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                交通 {property.details.access}
              </Badge>
            )}

            {/* 物件種別バッジ */}
            {property.details.buildingType &&
              property.details.buildingType.trim() !== "" &&
              property.details.buildingType !== "不明" && (
                <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                  物件種別 {property.details.buildingType}
                </Badge>
              )}

            {/* 階建/階バッジ */}
            {property.details.floor && property.details.floor.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                階建/階 {property.details.floor}
              </Badge>
            )}

            {/* 間取りバッジ */}
            {property.details.rooms && property.details.rooms.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                間取り {property.details.rooms}
              </Badge>
            )}

            {/* 専有面積バッジ */}
            {property.details.area && property.details.area.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                面積 {property.details.area}
              </Badge>
            )}

            {/* 築年月バッジ */}
            {property.details.year && property.details.year.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                建築年月 {property.details.year}
              </Badge>
            )}

            {/* 土地面積バッジ */}
            {property.details.landArea && property.details.landArea.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                土地面積 {property.details.landArea}
              </Badge>
            )}

            {/* 建物面積バッジ */}
            {property.details.buildingArea && property.details.buildingArea.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                建物面積 {property.details.buildingArea}
              </Badge>
            )}

            {/* 建物構造バッジ */}
            {property.details.structure && property.details.structure.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                建物構造 {property.details.structure}
              </Badge>
            )}

            {/* 表面利回りバッジ */}
            {property.details.yieldRate && property.details.yieldRate.trim() !== "" && (
              <Badge className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200">
                表面利回り {property.details.yieldRate}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

FavoritePropertyCard.displayName = "FavoritePropertyCard";
