"use server";

import { revalidatePath } from "next/cache";

export interface RealtorUpdateData {
  id: string;
  title?: string;
  representativeName?: string;
  contactPerson?: string;
  publicationStatus?: string;
  updateDate?: string;
  nextUpdateDate?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  faxNumber?: string;
  email?: string;
  address?: string;
  postalCode?: string;
  website?: string;
  businessHours?: string;
  holidays?: string;
  accountType?: string;
  plan?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  paymentMethod?: string;
  monthlyFee?: string;
  propertyLimit?: number;
}

export async function updateRealtor(data: RealtorUpdateData) {
  try {
    // TODO: 実際のAPI呼び出しやデータベース更新を実装
    console.log("業者を更新:", data);

    // 成功時にページを再生成
    revalidatePath(`/admin/realtors/${data.id}`);
    revalidatePath("/admin/realtors");

    return {
      success: true,
      message: "業者情報を更新しました",
      data,
    };
  } catch (error) {
    console.error("業者更新エラー:", error);
    return {
      success: false,
      message: "業者情報の更新に失敗しました",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
