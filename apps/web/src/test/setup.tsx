import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import type { ReactElement } from "react";
import "@testing-library/jest-dom";

/**
 * テスト用のQueryClientを作成
 * 各テストで独立したキャッシュを持つため毎回新しいインスタンスを作成
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // テスト時はリトライを無効化
        gcTime: 0, // キャッシュを即座に破棄
        staleTime: 0, // 常に新鮮でないデータとして扱う
      },
    },
  });

/**
 * テスト用ProvidersWrapper
 * React Queryのプロバイダーをラップ
 */
const createWrapper = () => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

/**
 * カスタムrenderメソッド
 * TanStack Queryプロバイダーを自動的に含む
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  return render(ui, { wrapper: createWrapper(), ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
