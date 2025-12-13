"use client";

import { RedirectHandler } from "@/components/common/RedirectHandler";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RootPage() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <RedirectHandler
      isAuthenticated={isAuthenticated}
      loading={loading}
      authenticatedPath="/dashboard"
      unauthenticatedPath="/login"
      loadingMessage="読み込み中..."
      redirectMessage="リダイレクト中..."
    />
  );
}
