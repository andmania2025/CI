"use client";

import { useEffect, useRef, useState } from "react";

interface UseProductCardOverlayProps {
  isHovered: boolean;
  isFocused: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * オーバーレイ表示ロジックを管理するカスタムフック
 */
export const useProductCardOverlay = ({
  isHovered,
  isFocused,
  cardRef,
}: UseProductCardOverlayProps) => {
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldShowOverlay = isHovered || isFocused;

  useEffect(() => {
    if (shouldShowOverlay && cardRef.current) {
      const timeoutId = setTimeout(() => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
          setCardRect(rect);
        }
      }, 50); // 50ms遅延でデバウンス

      return () => clearTimeout(timeoutId);
    }
    // ホバー状態解除時は少し遅延を設けて、マウス移動による一時的な解除を防ぐ
    const timeoutId = setTimeout(() => {
      setCardRect(null);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [shouldShowOverlay, cardRef]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  return {
    cardRect,
    focusTimeoutRef,
  };
};
