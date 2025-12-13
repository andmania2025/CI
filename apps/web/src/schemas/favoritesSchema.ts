import { z } from "zod";

// お気に入りアイテムの型定義
export const favoriteItemSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
  type: z.enum(["sale", "rental"]),
  title: z.string().min(1, "タイトルは必須です"),
  image: z.string().url("画像URLは有効なURLである必要があります"),
  price: z.string().optional(),
  rent: z.string().optional(),
  description: z.string().min(1, "説明は必須です"),
  details: z.object({
    location: z.string(),
    access: z.string(),
    buildingType: z.string(),
    floor: z.string().optional(),
    rooms: z.string(),
    area: z.string(),
    year: z.string(),
    // 追加フィールド
    landArea: z.string().optional(),
    buildingArea: z.string().optional(),
    structure: z.string().optional(),
    yieldRate: z.string().optional(),
  }),
});

// フィルター型の定義
export const favoriteFilterSchema = z.enum(["all", "sale", "rental"]);

// お気に入り操作の結果型
export const favoriteOperationResultSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

// TypeScript型をエクスポート
export type FavoriteItem = z.infer<typeof favoriteItemSchema>;
export type FavoriteFilter = z.infer<typeof favoriteFilterSchema>;
export type FavoriteOperationResult = z.infer<typeof favoriteOperationResultSchema>;

// カウント型
export const favoriteCountsSchema = z.object({
  all: z.number().min(0),
  sale: z.number().min(0),
  rental: z.number().min(0),
});

export type FavoriteCounts = z.infer<typeof favoriteCountsSchema>;
