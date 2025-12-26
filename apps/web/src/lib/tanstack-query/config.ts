import { QueryClient } from "@tanstack/react-query";

/**
 * TanStack Queryの設定
 * サーバー状態の管理に使用
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // データが古くなるまでの時間（5分）
      staleTime: 1000 * 60 * 5,
      // キャッシュを保持する時間（10分）
      gcTime: 1000 * 60 * 10,
      // リトライ回数
      retry: 1,
      // エラー時にリトライするか
      refetchOnWindowFocus: false,
      // ネットワーク再接続時にリフェッチするか
      refetchOnReconnect: true,
    },
    mutations: {
      // ミューテーションのリトライ回数
      retry: 1,
    },
  },
});
