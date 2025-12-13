"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductData } from "@/types/product.types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ProductCardContent } from "./ProductCardContent";

interface ProductCardOverlayProps {
  cardRect: DOMRect;
  product: ProductData;
  thumbnails: string[];
  activeIndex: number;
  isTransitioning: boolean;
  showNewBadge: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  focusTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  setIsFocused: (focused: boolean) => void;
}

/**
 * ホバー時のオーバーレイカードコンポーネント
 */
export const ProductCardOverlay = ({
  cardRect,
  product,
  thumbnails,
  activeIndex,
  isTransitioning,
  showNewBadge,
  onPrevious,
  onNext,
  onDotClick,
  onMouseEnter,
  onMouseLeave,
  focusTimeoutRef,
  setIsFocused,
}: ProductCardOverlayProps) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed z-9999"
      // 注意: DOMRectベースの動的位置とサイズのため、style属性が必要
      // Tailwindクラスでは動的な位置（left, top）やサイズ（width, height）を表現できない
      style={{
        left: cardRect.left,
        top: cardRect.top,
        width: cardRect.width,
        height: cardRect.height,
        transformOrigin: "center",
        transform: "scale(1.1)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full h-full rounded-lg bg-white border border-gray-200 overflow-hidden shadow-[0_25px_50px_-12px_rgba(156,163,175,0.15),0_20px_25px_-5px_rgba(156,163,175,0.1),0_10px_10px_-5px_rgba(156,163,175,0.04),0_0_0_1px_rgba(229,231,235,0.8)]">
        {/* 画像エリア - 60% */}
        <div className="relative w-full overflow-hidden rounded-t-lg h-[60%]">
          <Image
            src={thumbnails[activeIndex]}
            alt={product.alt[activeIndex] || `${product.title} - 画像${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={activeIndex === 0}
          />

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
                onFocus={() => {
                  if (focusTimeoutRef.current) {
                    clearTimeout(focusTimeoutRef.current);
                  }
                  setIsFocused(true);
                }}
                onBlur={() => {
                  focusTimeoutRef.current = setTimeout(() => {
                    setIsFocused(false);
                  }, 100);
                }}
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
                onFocus={() => {
                  if (focusTimeoutRef.current) {
                    clearTimeout(focusTimeoutRef.current);
                  }
                  setIsFocused(true);
                }}
                onBlur={() => {
                  focusTimeoutRef.current = setTimeout(() => {
                    setIsFocused(false);
                  }, 100);
                }}
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
              {thumbnails.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => onDotClick(index)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-2 h-2 p-0 rounded-full transition-all duration-200 hover:bg-transparent",
                    activeIndex === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Show image ${index + 1}`}
                  disabled={isTransitioning}
                />
              ))}
            </div>
          )}
        </div>

        {/* コンテンツエリア - 40% */}
        <ProductCardContent product={product} />
      </div>
    </motion.div>,
    document.body
  );
};
