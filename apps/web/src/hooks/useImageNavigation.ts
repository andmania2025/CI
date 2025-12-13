"use client";

import { useCallback, useEffect, useState } from "react";

interface UseImageNavigationProps {
  totalImages: number;
}

/**
 * 画像ナビゲーションロジックを管理するカスタムフック
 */
export const useImageNavigation = ({ totalImages }: UseImageNavigationProps) => {
  const [current, setCurrent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // スクロール検出
  useEffect(() => {
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

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((prev) => (prev - 1 + totalImages) % totalImages);
    },
    [totalImages]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((prev) => (prev + 1) % totalImages);
    },
    [totalImages]
  );

  return {
    current,
    isScrolling,
    handlePrev,
    handleNext,
  };
};
