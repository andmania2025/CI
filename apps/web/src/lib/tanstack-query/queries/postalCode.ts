import { useQuery } from "@tanstack/react-query";

/**
 * 郵便番号検索結果の型定義
 */
export interface PostalCodeResult {
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
}

/**
 * APIレスポンスの型定義
 */
interface PostalCodeApiResponse {
  success: boolean;
  data?: PostalCodeResult;
  error?: string;
}

/**
 * 郵便番号から住所情報を取得する関数
 * 
 * 注意: 将来的に郵便局の公式APIに接続予定
 * 現時点では既存の/api/postal-code routeを使用
 * 
 * @param postalCode 郵便番号（7桁の数字）
 * @returns 住所情報
 */
const fetchPostalCode = async (postalCode: string): Promise<PostalCodeResult> => {
  if (!postalCode || postalCode.length !== 7) {
    throw new Error("郵便番号は7桁の数字で入力してください");
  }

  const response = await fetch(`/api/postal-code?postalCode=${postalCode}`);

  if (!response.ok) {
    throw new Error(`郵便番号検索に失敗しました: ${response.status}`);
  }

  const result: PostalCodeApiResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "郵便番号検索に失敗しました");
  }

  return result.data;
};

/**
 * 郵便番号から住所情報を取得するTanStack Query hook
 * 
 * @param postalCode 郵便番号（7桁の数字）
 * @param enabled クエリを有効にするかどうか（郵便番号が7桁の場合のみ）
 * @returns TanStack Queryの結果
 */
export const usePostalCodeQuery = (postalCode: string | undefined, enabled = true) => {
  const isValidPostalCode = postalCode?.length === 7 && /^\d{7}$/.test(postalCode);

  return useQuery({
    queryKey: ["postalCode", postalCode],
    queryFn: () => {
      if (!postalCode || !isValidPostalCode) {
        throw new Error("郵便番号は7桁の数字で入力してください");
      }
      return fetchPostalCode(postalCode);
    },
    enabled: enabled && isValidPostalCode,
    staleTime: 1000 * 60 * 60, // 1時間キャッシュ（郵便番号データは変更されないため）
    gcTime: 1000 * 60 * 60 * 24, // 24時間キャッシュを保持
    retry: false, // 郵便番号が存在しない場合はリトライしない
  });
};

