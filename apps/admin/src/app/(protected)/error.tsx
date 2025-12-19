"use client";

import { Button } from "@/components/ui/button";

export default function ProtectedErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">エラー</h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <Button onClick={reset}>再試行</Button>
      </div>
    </div>
  );
}
