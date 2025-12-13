"use server";

import { revalidatePath } from "next/cache";

export interface PropertyUpdateData {
  id: string;
  title?: string;
  publicationStatus?: string;
  updateDate?: string;
  nextUpdateDate?: string;
  publicationStartDate?: string;
  publicationEndDate?: string;
  publicScope?: string;
  featuredSetting?: string;
  priorityDisplay?: string;
  updateFrequency?: string;
}

export async function updateProperty(data: PropertyUpdateData) {
  try {
    // TODO: 実際のAPI呼び出しやデータベース更新を実装
    console.log("物件を更新:", data);

    // 成功時にページを再生成
    revalidatePath(`/admin/properties/${data.id}`);
    revalidatePath("/admin/properties");

    return {
      success: true,
      message: "物件情報を更新しました",
      data,
    };
  } catch (error) {
    console.error("物件更新エラー:", error);
    return {
      success: false,
      message: "物件情報の更新に失敗しました",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
