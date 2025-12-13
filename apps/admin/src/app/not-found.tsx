"use client";

// 動的レンダリングを強制（プリレンダリングを無効化）
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "ページが見つかりません - ウチカツ管理システム";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ページが見つかりません</h2>
        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            戻る
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ダッシュボードへ
          </button>
        </div>
      </div>
    </div>
  );
}
