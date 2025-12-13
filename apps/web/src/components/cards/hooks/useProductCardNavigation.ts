"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseProductCardNavigationProps {
  thumbnails: string[];
  onSwap?: (isFirstVisible: boolean) => void;
}

/**
 * 画像ナビゲーションロジックを管理するカスタムフック
 */
export const useProductCardNavigation = ({ thumbnails, onSwap }: UseProductCardNavigationProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (activeIndex + 1) % thumbnails.length;
    setActiveIndex(nextIndex);
    onSwap?.(nextIndex === 0);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [activeIndex, isTransitioning, thumbnails.length, onSwap]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = activeIndex === 0 ? thumbnails.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    onSwap?.(prevIndex === 0);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [activeIndex, isTransitioning, thumbnails.length, onSwap]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (!isTransitioning && index !== activeIndex) {
        setIsTransitioning(true);
        setActiveIndex(index);
        onSwap?.(index === 0);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    },
    [activeIndex, isTransitioning, onSwap]
  );

  return {
    activeIndex,
    isTransitioning,
    handleNext,
    handlePrevious,
    handleDotClick,
  };
};
