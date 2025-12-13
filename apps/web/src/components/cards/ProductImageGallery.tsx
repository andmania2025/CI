"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductImageGalleryProps {
  thumbnails: string[];
  alt: string[];
  title: string;
  activeIndex: number;
  isTransitioning: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  showNewBadge?: boolean;
}

/**
 * 画像ギャラリーコンポーネント
 * 画像スライダー、ナビゲーション矢印、ドットナビゲーションを含む
 */
export const ProductImageGallery = React.memo<ProductImageGalleryProps>(
  ({
    thumbnails,
    alt,
    title,
    activeIndex,
    isTransitioning,
    onPrevious,
    onNext,
    onDotClick,
    showNewBadge = false,
  }) => {
    return (
      <div className="relative w-full overflow-hidden rounded-t-lg h-[60%]">
        <AnimatePresence initial={false}>
          {thumbnails.map((src, index) => (
            <motion.div
              key={src}
              className={cn(
                "absolute inset-0 h-full w-full",
                activeIndex === index ? "z-10" : "z-0"
              )}
              initial={false}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                scale: 1,
                x: activeIndex === index ? 0 : index < activeIndex ? "-100%" : "100%",
              }}
              transition={{
                opacity: { duration: 0.4, ease: "easeInOut" },
                x: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
              }}
            >
              <div className="h-full w-full overflow-hidden">
                <Image
                  src={src}
                  alt={alt?.[index] || title}
                  fill
                  className={cn(
                    "object-cover transition-all duration-500",
                    index === 0 ? "object-top" : "object-center"
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* New バッジ */}
        {showNewBadge && (
          <div className="absolute top-2 left-2 z-60 pointer-events-none">
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-0 px-1 py-0.5 text-[10px] font-medium hover:bg-red-500 hover:text-white shadow-sm pointer-events-auto"
            >
              New
            </Badge>
          </div>
        )}

        {/* ナビゲーション矢印 */}
        {thumbnails.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none z-20">
            <Button
              onClick={onPrevious}
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-full bg-[oklch(0.35_0_0)]/20 backdrop-blur-sm text-white hover:text-white transition-colors duration-200 pointer-events-auto z-40",
                isTransitioning && "pointer-events-none opacity-70"
              )}
              aria-label="Show previous image"
              disabled={isTransitioning}
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </Button>
            <Button
              onClick={onNext}
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-full bg-[oklch(0.35_0_0)]/20 backdrop-blur-sm text-white hover:text-white transition-colors duration-200 pointer-events-auto z-40",
                isTransitioning && "pointer-events-none opacity-70"
              )}
              aria-label="Show next image"
              disabled={isTransitioning}
            >
              <ChevronRight size={16} strokeWidth={2} />
            </Button>
          </div>
        )}

        {/* ドットナビゲーション */}
        {thumbnails.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5">
            {thumbnails.map((src, index) => (
              <Button
                key={src}
                onClick={() => onDotClick(index)}
                variant="ghost"
                className={cn(
                  "size-2 rounded-full p-0 transition-all duration-300",
                  activeIndex === index
                    ? "bg-white scale-110 ring-1 ring-white/50 ring-offset-1 ring-offset-black/30 hover:bg-white"
                    : "bg-white/60 hover:bg-white/80"
                )}
                aria-label={`View image ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ProductImageGallery.displayName = "ProductImageGallery";
