"use client";

import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useImageNavigation } from "@/hooks/useImageNavigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PropertyCardContent } from "./PropertyCardContent";

interface PropertyCardProps {
  images?: string[]; // オプショナルに変更
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
  linkUrl?: string;
  isNew?: boolean; // 新着物件フラグ
}

export const PropertyCard = React.memo((props: PropertyCardProps) => {
  const { images, id = "1", linkUrl } = props;

  const detailPageUrl = `/property/${id}`;
  const safeImages = images || [];
  const total = safeImages.length;

  // カスタムフックを使用
  const { current, isScrolling, handlePrev, handleNext } = useImageNavigation({
    totalImages: total,
  });

  // 画像がない場合は何も表示しない
  if (total === 0) {
    return null;
  }

  const content = (
    <PropertyCardContent
      {...props}
      current={current}
      total={total}
      handlePrev={handlePrev}
      handleNext={handleNext}
      isScrolling={isScrolling}
    />
  );

  if (linkUrl) {
    return (
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link href={detailPageUrl} className="block h-full">
      {content}
    </Link>
  );
});

PropertyCard.displayName = "PropertyCard";
