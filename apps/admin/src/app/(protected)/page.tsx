"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";

export default function Page() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-2 pb-2">
      <div className="mt-4">
        <div className="text-center text-gray-500">セクションカード（開発中）</div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="col-span-1 flex flex-col min-h-0">
          <div className="mb-2 px-3 lg:px-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">最近の物件問い合わせ</h2>
          </div>
          <div className="px-3 lg:px-4 flex-1 min-h-0">
            <div className="text-center text-gray-500">データテーブル（開発中）</div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col min-h-0">
          <div className="mb-2 px-3 lg:px-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">最近の更新した物件</h2>
          </div>
          <div className="px-3 lg:px-4 flex-1 min-h-0">
            <div className="text-center text-gray-500">データテーブル（開発中）</div>
          </div>
        </div>
      </div>
    </div>
  );
}
