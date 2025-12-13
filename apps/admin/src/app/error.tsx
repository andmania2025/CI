"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "エラーが発生しました - ウチカツ管理システム";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">エラー</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          予期しないエラーが発生しました
        </h2>
        <p className="text-gray-600 mb-8">{error.message || "不明なエラーが発生しました"}</p>
        {error.digest && <p className="text-sm text-gray-500 mb-8">エラーID: {error.digest}</p>}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            再試行
          </button>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/dashboard";
              }
            }}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            ダッシュボードへ
          </button>
        </div>
      </div>
    </div>
  );
}
