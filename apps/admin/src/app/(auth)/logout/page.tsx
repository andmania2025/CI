"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    // ページタイトルを設定
    document.title = "ログアウト - ウチカツ管理システム";

    // ログアウト処理を実行（useAuthのlogout関数は既にリダイレクトを含む）
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col gap-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
          <h1 className="text-2xl font-semibold text-gray-900">ログアウト中...</h1>
          <p className="text-gray-600">しばらくお待ちください</p>
        </div>
      </div>
    </div>
  );
}
