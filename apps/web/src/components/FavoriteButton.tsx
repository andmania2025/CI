"use client";

import { Button } from "@/components/ui/button";
import {
  type FavoriteItem,
  addToFavorites,
  isFavorite as checkIsFavorite,
  removeFromFavorites,
} from "@/lib/services/favorites";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import { IoMdHeart } from "react-icons/io";

interface FavoriteButtonProps {
  item: Omit<FavoriteItem, "addedAt">;
  className?: string;
  size?: "sm" | "md" | "lg";
  onToggle?: (isFavorite: boolean) => void;
}

const iconSizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
} as const;

export const FavoriteButton = React.memo<FavoriteButtonProps>(
  ({ item, className = "", size = "md", onToggle }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // お気に入り状態の初期化
    useEffect(() => {
      setIsFavorite(checkIsFavorite(item.id, item.type));
    }, [item.id, item.type]);

    // お気に入り切り替え処理
    const handleToggleFavorite = useCallback(
      async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);

        try {
          const result = isFavorite
            ? removeFromFavorites(item.id, item.type)
            : addToFavorites(item);

          if (result.success) {
            const newFavoriteState = !isFavorite;
            setIsFavorite(newFavoriteState);
            onToggle?.(newFavoriteState);
          } else {
            // エラー時の処理（必要に応じてtoast等で通知）
            console.warn("お気に入り操作に失敗しました:", result.message);
          }
        } catch (error) {
          console.error("お気に入り操作エラー:", error);
        } finally {
          setIsLoading(false);
        }
      },
      [item, isFavorite, isLoading, onToggle]
    );

    // キーボードイベントハンドラー
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggleFavorite(e as unknown as React.MouseEvent);
        }
      },
      [handleToggleFavorite]
    );

    // スタイルクラスの生成
    const buttonClasses = [
      "flex items-center justify-center",
      "transition-all duration-200 z-10",
      "focus:outline-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "p-1",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const heartClasses = [
      "transition-all duration-200 drop-shadow-lg cursor-pointer",
      iconSizes[size],
      isFavorite ? "text-red-500" : "text-gray-600",
      isLoading && "animate-pulse",
    ]
      .filter(Boolean)
      .join(" ");

    // 注意: 動的な色とストローク（状態に応じた動的スタイリング）のため、style属性が必要
    // Tailwindクラスでは動的なfill、stroke、filterプロパティを表現できない
    const heartStyle = isFavorite
      ? { color: "#ef4444", fill: "#ef4444" }
      : {
          color: "#4b5563",
          fill: "#4b5563",
          stroke: "#ffffff",
          strokeWidth: "3px",
          filter: "drop-shadow(0 0 2px rgba(255,255,255,0.8))",
        };

    return (
      <Button
        variant="ghost"
        onClick={handleToggleFavorite}
        onKeyDown={handleKeyDown}
        className={cn("bg-transparent hover:bg-transparent", buttonClasses)}
        disabled={isLoading}
        aria-label={
          isLoading
            ? "処理中..."
            : isFavorite
              ? `${item.title}をお気に入りから削除`
              : `${item.title}をお気に入りに追加`
        }
        title={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
      >
        {isFavorite ? (
          <IoMdHeart className={heartClasses} style={heartStyle} />
        ) : (
          <IoMdHeart className={heartClasses} style={heartStyle} />
        )}
      </Button>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";
