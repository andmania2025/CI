"use client";

import { MailManagement } from "@/components/admin/content-management";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // クライアント側でのみ実行されることを保証
    if (typeof window !== "undefined") {
      document.title = "メール管理 - ウチカツ管理システム";
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full">
      {/* 固定ヘッダー */}
      <div className="sticky top-0 z-10 bg-background pb-4 pt-6 px-6 flex-shrink-0">
        <div className="flex items-baseline justify-between space-y-2 mb-4">
          <h2 className="text-3xl font-bold tracking-tight leading-none">メール管理</h2>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 min-h-0">
        <MailManagement />
      </div>
    </div>
  );
}
