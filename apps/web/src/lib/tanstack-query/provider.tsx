"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { queryClient } from "./config";

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * TanStack Query Provider
 * アプリケーション全体でTanStack Queryを使用するためのProvider
 * 
 * 注意: React Query Devtoolsはオプショナルな依存関係です
 * 開発環境で使用する場合は、`pnpm add -D @tanstack/react-query-devtools`でインストールしてください
 */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtoolsはオプショナルな依存関係のため、コメントアウト
          開発環境で使用する場合は、上記のコメントを参照してインストールしてください
      {process.env.NODE_ENV === "development" && typeof window !== "undefined" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      */}
    </QueryClientProvider>
  );
};

