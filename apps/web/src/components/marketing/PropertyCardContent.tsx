import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type React from "react";

export interface PropertyCardContentProps {
  images?: string[];
  title: string;
  location: string;
  station: string;
  price: string;
  area?: string;
  builtYear?: string;
  layout?: string;
  floor?: string;
  landArea?: string;
  buildingArea?: string;
  constructionYear?: string;
  structure?: string;
  yieldRate?: string;
  isRental?: boolean;
  id?: string;
  isNew?: boolean;

  // Image navigation
  current: number;
  total: number;
  handlePrev: (e: React.MouseEvent) => void;
  handleNext: (e: React.MouseEvent) => void;
  isScrolling?: boolean;
}

export const PropertyCardContent: React.FC<PropertyCardContentProps> = ({
  images,
  title,
  location,
  station,
  price,
  area,
  builtYear,
  layout,
  floor,
  landArea,
  buildingArea,
  constructionYear,
  structure,
  yieldRate,
  isRental = false,
  id = "1",
  isNew = false,
  current,
  total,
  handlePrev,
  handleNext,
  isScrolling,
}) => {
  const safeImages = images || [];

  return (
    <div
      className={cn(
        "group overflow-hidden shadow-md transition-shadow duration-200 h-full flex flex-col bg-white",
        !isScrolling && "hover:shadow-xl"
      )}
    >
      <div className="p-0 flex-1">
        <div className="relative overflow-hidden">
          <Image
            src={safeImages[current]}
            alt={title}
            width={300}
            height={200}
            className={cn(
              "w-full h-56 object-cover transition-transform duration-300",
              !isScrolling && "group-hover:scale-110"
            )}
          />
          {total > 1 && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full h-8 w-8 shadow hover:bg-white"
                onClick={handlePrev}
                aria-label="前の画像"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full h-8 w-8 shadow hover:bg-white"
                onClick={handleNext}
                aria-label="次の画像"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {safeImages.map((img, i) => (
                  <span
                    key={`${i}-${img}`}
                    className={
                      i === current
                        ? "w-2 h-2 rounded-full bg-blue-500"
                        : "w-2 h-2 rounded-full bg-white/70 border border-gray-300"
                    }
                  />
                ))}
              </div>
            </>
          )}

          {/* 新着バッジ */}
          {isNew && (
            <div className="absolute top-2 left-2 z-20 pointer-events-none">
              <Badge
                variant="outline"
                className="bg-red-500 text-white border-0 px-1 py-0.5 text-[10px] font-medium hover:bg-red-500 hover:text-white shadow-sm pointer-events-auto"
              >
                New
              </Badge>
            </div>
          )}

          {/* お気に入りボタン */}
          <div className="absolute top-3 right-3 z-20">
            <FavoriteButton
              item={{
                id,
                type: isRental ? "rental" : "sale",
                title,
                image: (images || [])[0] || "",
                price: isRental ? undefined : price,
                rent: isRental ? price : undefined,
                description: `${location} ${station}`,
                details: {
                  location,
                  access: station,
                  buildingType: structure || "不明",
                  floor: floor || "",
                  rooms: layout || "",
                  area: area || landArea || buildingArea || "",
                  year: builtYear || constructionYear || "",
                  deposit: isRental ? "要相談" : undefined,
                  keyMoney: isRental ? "要相談" : undefined,
                },
              }}
              size="sm"
            />
          </div>
        </div>

        <div className="p-3 flex-1">
          {/* 物件価格 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold text-[#ff0000]">
                {price.replace("万円", "")}
              </span>
              <span className="text-xs text-black">万円</span>
            </div>
          </div>
          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-[#093893]">{title}</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p className="line-clamp-1">{location}</p>
            <p className="line-clamp-1">{station}</p>
            {/* 詳細情報バッジ */}
            <div className="flex flex-wrap gap-1 mt-2">
              {[
                layout,
                landArea && `土地面積 ${landArea}㎡`,
                (area || buildingArea) && `建物面積 ${area || buildingArea}㎡`,
                (builtYear || constructionYear) && `建築年月 ${builtYear || constructionYear}`,
                structure && `建物構造 ${structure}`,
                yieldRate && `表面利回り ${yieldRate}%`,
              ]
                .filter(Boolean)
                .map((text) => (
                  <Badge
                    key={text as string}
                    variant="outline"
                    className="text-xs bg-gray-100 text-gray-700 border-gray-200"
                  >
                    {text}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
