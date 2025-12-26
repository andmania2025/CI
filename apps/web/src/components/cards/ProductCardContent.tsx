"use client";

import { FavoriteButton } from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import type { ProductData } from "@/types/product.types";
import React from "react";

interface ProductCardContentProps {
  product: ProductData;
}

/**
 * カードのコンテンツ部分（価格、タイトル、住所、タグなど）
 */
export const ProductCardContent = React.memo<ProductCardContentProps>(
  ({ product }) => {
    return (
      <div className="p-3 h-[40%]">
        <div className="space-y-3">
          {/* 販売価格 */}
          {product.price && (
            <div className="flex items-center justify-between">
              <div className="text-xl font-extrabold text-red-600">
                {product.price}
              </div>
              <FavoriteButton
                item={{
                  id: product.id || "default-id",
                  type: product.isRental ? "rental" : "sale",
                  title: product.title,
                  image: product.thumbnail?.[0] || "",
                  price: product.price,
                  rent: product.isRental ? product.price : undefined,
                  description: product.address || "",
                  details: {
                    location: product.address || "",
                    access: product.station || "",
                    buildingType: product.mockProperty?.propertyType || "不明",
                    floor: product.mockProperty?.floor || "",
                    rooms: product.mockProperty?.layout || "",
                    area: product.mockProperty?.area || "",
                    year: product.mockProperty?.builtYear || "",
                    landArea: product.mockProperty?.landArea || "",
                    buildingArea: product.mockProperty?.buildingArea || "",
                    structure: product.mockProperty?.structure || "",
                    yieldRate: product.mockProperty?.yieldRate || "",
                  },
                }}
                size="sm"
                className="p-1"
              />
            </div>
          )}
          <div className="space-y-1">
            <h2 className="line-clamp-1 font-semibold text-gray-900 text-base">
              {product.title}
            </h2>
            {/* 住所 */}
            {product.address && (
              <p className="text-xs text-gray-600 line-clamp-1">
                {product.address}
              </p>
            )}
          </div>

          {/* ラベル（間隔を少し広げ自動折り返し） */}
          <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
            {product.techStack.map((tag) => (
              <Badge
                key={tag}
                className="bg-gray-100 text-gray-700 border border-gray-200 w-fit hover:bg-gray-100 hover:text-gray-700 hover:border-gray-200 text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

ProductCardContent.displayName = "ProductCardContent";
