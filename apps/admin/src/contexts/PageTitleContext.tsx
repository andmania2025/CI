"use client";

import React, { createContext, useState, type ReactNode } from "react";

interface PageTitleContextType {
  title: string;
  subtitle?: string;
  setPageTitle: (title: string, subtitle?: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  // クライアント側でのみuseStateを使用
  const [title, setTitle] = useState(() => {
    if (typeof window === "undefined") return "ダッシュボード";
    return "ダッシュボード";
  });
  const [subtitle, setSubtitle] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return undefined;
  });

  const setPageTitle = (newTitle: string, newSubtitle?: string) => {
    if (typeof window === "undefined") return;
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  };

  return (
    <PageTitleContext.Provider value={{ title, subtitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = React.useContext(PageTitleContext);

  if (context === undefined) {
    // プロバイダー外での実行を考慮して、デフォルト値を返す
    return {
      title: "",
      subtitle: undefined,
      setPageTitle: () => {
        // 何もしない（no-op関数）
      },
    };
  }

  return context;
}
