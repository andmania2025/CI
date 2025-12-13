"use server";

import { z } from "zod";

// 物件複製用のバリデーションスキーマ
const duplicatePropertySchema = z.object({
  propertyId: z.string().min(1, "物件IDは必須です"),
});

// 複製結果の型定義
export interface DuplicatePropertyResult {
  success: boolean;
  message: string;
  duplicatedPropertyId?: string;
  error?: string;
}

/**
 * 物件を複製するServer Action（localStorage使用）
 */
export async function duplicateProperty(propertyId: string): Promise<DuplicatePropertyResult> {
  try {
    // 入力バリデーション
    const validatedData = duplicatePropertySchema.parse({ propertyId });

    // クライアントサイドでlocalStorageからデータを取得・複製するため
    // サーバーアクションでは基本的なバリデーションのみ実行
    return {
      success: true,
      message: "複製処理を開始しました",
      duplicatedPropertyId: `duplicate_${validatedData.propertyId}_${Date.now()}`,
    };
  } catch (error) {
    console.error("物件複製エラー:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "入力データが無効です",
        error: "VALIDATION_ERROR",
      };
    }

    return {
      success: false,
      message: "物件の複製中にエラーが発生しました",
      error: error instanceof Error ? error.message : "不明なエラー",
    };
  }
}
