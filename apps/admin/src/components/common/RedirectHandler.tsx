"use client";

import { useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface RedirectHandlerProps {
  isAuthenticated: boolean;
  loading: boolean;
  authenticatedPath?: string;
  unauthenticatedPath?: string;
  loadingMessage?: string;
  redirectMessage?: string;
}

export const RedirectHandler = ({
  isAuthenticated,
  loading,
  authenticatedPath = "/dashboard",
  unauthenticatedPath = "/login",
  loadingMessage = "読み込み中...",
  redirectMessage = "リダイレクト中...",
}: RedirectHandlerProps) => {
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        window.location.href = authenticatedPath;
      } else {
        window.location.href = unauthenticatedPath;
      }
    }
  }, [isAuthenticated, loading, authenticatedPath, unauthenticatedPath]);

  if (loading) {
    return <LoadingSpinner message={loadingMessage} />;
  }

  return <LoadingSpinner message={redirectMessage} />;
};
