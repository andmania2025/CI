"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 動的レンダリングを強制（プリレンダリングを無効化）
export const dynamic = "force-dynamic";

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
          <Button variant="outline" onClick={() => router.back()}>
            戻る
          </Button>
          <Button onClick={() => router.push("/dashboard")}>ダッシュボードへ</Button>
        </div>
      </div>
    </div>
  );
}
