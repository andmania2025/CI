"use client";

import { cn } from "@/lib/utils";
import type { ProductData } from "@/types/product.types";
import { type MotionProps, motion } from "framer-motion";
import * as React from "react";
import { ProductCardContent } from "./ProductCardContent";
import { ProductCardOverlay } from "./ProductCardOverlay";
import { ProductImageGallery } from "./ProductImageGallery";
import { useProductCardNavigation } from "./hooks/useProductCardNavigation";
import { useProductCardOverlay } from "./hooks/useProductCardOverlay";

// ProductData型をエクスポート（後方互換性のため）
export type { ProductData };

// デフォルトデータ（フォールバック用）
const DEFAULT_PRODUCT: ProductData = {
  title: "三重・名張・富貴ケ丘3番町",
  excerpt: "三重県名張市富貴ケ丘3番町113番 近鉄大阪線 名張駅 徒歩30分",
  address: "三重県名張市富貴ケ丘3番町113番",
  createdAt: "March 18, 2025",
  domain: "shsf-work.dev",
  actionLabel: "Explore workspace",
  slug: "shsf-work",
  alt: [
    "三重・名張・富貴ケ丘3番町 - 物件画像1",
    "三重・名張・富貴ケ丘3番町 - 物件画像2",
    "三重・名張・富貴ケ丘3番町 - 物件画像3",
    "三重・名張・富貴ケ丘3番町 - 物件画像4",
    "三重・名張・富貴ケ丘3番町 - 物件画像5",
  ],
  techStack: ["土地: 232.05㎡"],
  thumbnail: [
    "/section/section-17.jpg",
    "/section/section-18.jpg",
    "/section/section-19.jpg",
    "/section/section-20.jpg",
    "/section/section-22.jpg",
  ],
};

export type ProductSwapCardProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    product?: ProductData;
    onSwap?: (isFirstVisible: boolean) => void;
    isNew?: boolean; // 新着物件フラグ
    forceShowNewBadge?: boolean; // 新着セクション用の強制表示フラグ
    disableHoverScale?: boolean; // ホバー時の拡大を無効化するフラグ
  };

// 新しい単体カード実装
export const ProductSwapCard = React.memo(
  React.forwardRef<HTMLDivElement, ProductSwapCardProps>((props, ref) => {
    const {
      product = DEFAULT_PRODUCT,
      className,
      onSwap,
      isNew = false,
      forceShowNewBadge = false,
      disableHoverScale = false,
      ...restProps
    } = props;

    // Newバッジの表示状態を安定化するためのメモ化
    const shouldShowNewBadge = React.useMemo(() => {
      return forceShowNewBadge || isNew;
    }, [forceShowNewBadge, isNew]);

    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const cardRef = React.useRef<HTMLDivElement>(null);
    const thumbnails = product.thumbnail?.length ? product.thumbnail : DEFAULT_PRODUCT.thumbnail;

    // カスタムフックを使用
    const { activeIndex, isTransitioning, handleNext, handlePrevious, handleDotClick } =
      useProductCardNavigation({
        thumbnails,
        onSwap,
      });

    const { cardRect, focusTimeoutRef } = useProductCardOverlay({
      isHovered,
      isFocused,
      cardRef,
    });

    const shouldShowOverlay = isHovered || isFocused;

    const handleMouseEnter = React.useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setIsHovered(false);
      setIsFocused(false);
    }, []);

    return (
      <>
        <motion.div
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            cardRef.current = node;
          }}
          className={cn(
            "w-full rounded-lg bg-white border border-gray-200 transition-all duration-300 max-w-md h-[440px] relative overflow-hidden",
            shouldShowOverlay ? "opacity-0" : "opacity-100",
            isHovered
              ? "shadow-[0_10px_15px_-3px_rgba(156,163,175,0.1),0_4px_6px_-2px_rgba(156,163,175,0.05)]"
              : "shadow-[0_1px_3px_0_rgba(156,163,175,0.1),0_1px_2px_0_rgba(156,163,175,0.06)]",
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          {/* 画像エリア */}
          <ProductImageGallery
            thumbnails={thumbnails}
            alt={product.alt}
            title={product.title}
            activeIndex={activeIndex}
            isTransitioning={isTransitioning}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleDotClick}
            showNewBadge={shouldShowNewBadge}
          />

          {/* コンテンツエリア */}
          <ProductCardContent product={product} />
        </motion.div>

        {/* ホバー時のオーバーレイカード */}
        {shouldShowOverlay && cardRect && !disableHoverScale && typeof window !== "undefined" && (
          <ProductCardOverlay
            cardRect={cardRect}
            product={product}
            thumbnails={thumbnails}
            activeIndex={activeIndex}
            isTransitioning={isTransitioning}
            showNewBadge={shouldShowNewBadge}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleDotClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            focusTimeoutRef={focusTimeoutRef}
            setIsFocused={setIsFocused}
          />
        )}
      </>
    );
  })
);
ProductSwapCard.displayName = "ProductSwapCard";
