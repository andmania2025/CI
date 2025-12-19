"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type * as React from "react";

// ローディング状態コンポーネント
interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "読み込み中...",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-8", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
          sizeClasses[size]
        )}
      />
      <p className="mt-4 text-gray-600 text-sm">{message}</p>
    </div>
  );
};

// エラー状態コンポーネント
interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "エラーが発生しました",
  message,
  retry,
  className,
}) => {
  return (
    <Card className={cn("max-w-md mx-auto", className)}>
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {retry && (
          <Button onClick={retry} variant="outline" size="sm">
            再試行
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// 空状態コンポーネント
interface EmptyStateProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "データがありません",
  message,
  action,
  icon,
  className,
}) => {
  const defaultIcon = (
    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  return (
    <div className={cn("text-center py-12", className)}>
      <div className="mx-auto mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
};

// 条件付きレンダリングの統一コンポーネント
interface ConditionalRenderProps {
  loading?: boolean;
  error?: string | Error | null;
  empty?: boolean;
  loadingProps?: Partial<LoadingStateProps>;
  errorProps?: Partial<ErrorStateProps>;
  emptyProps?: Partial<EmptyStateProps>;
  retry?: () => void;
  children: React.ReactNode;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  loading,
  error,
  empty,
  loadingProps,
  errorProps,
  emptyProps,
  retry,
  children,
}) => {
  // ローディング状態
  if (loading) {
    return <LoadingState {...loadingProps} />;
  }

  // エラー状態
  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return <ErrorState message={errorMessage} retry={retry} {...errorProps} />;
  }

  // 空状態
  if (empty) {
    return <EmptyState message="表示するデータがありません" {...emptyProps} />;
  }

  // 通常の表示
  return <>{children}</>;
};

// 物件リスト専用の条件付きレンダリング
interface PropertyListConditionalProps {
  loading?: boolean;
  error?: string | Error | null;
  properties?: unknown[];
  retry?: () => void;
  children: React.ReactNode;
}

export const PropertyListConditional: React.FC<PropertyListConditionalProps> = ({
  loading,
  error,
  properties = [],
  retry,
  children,
}) => {
  return (
    <ConditionalRender
      loading={loading}
      error={error}
      empty={!loading && !error && properties.length === 0}
      retry={retry}
      loadingProps={{
        message: "物件情報を読み込んでいます...",
      }}
      errorProps={{
        title: "物件情報の取得に失敗しました",
      }}
      emptyProps={{
        title: "物件が見つかりません",
        message: "検索条件を変更してお試しください",
        icon: (
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        ),
      }}
    >
      {children}
    </ConditionalRender>
  );
};

// お気に入りリスト専用の条件付きレンダリング
interface FavoriteListConditionalProps {
  loading?: boolean;
  error?: string | Error | null;
  favorites?: unknown[];
  onClearAll?: () => void;
  children: React.ReactNode;
}

export const FavoriteListConditional: React.FC<FavoriteListConditionalProps> = ({
  loading,
  error,
  favorites = [],
  onClearAll,
  children,
}) => {
  return (
    <ConditionalRender
      loading={loading}
      error={error}
      empty={!loading && !error && favorites.length === 0}
      loadingProps={{
        message: "お気に入りを読み込んでいます...",
      }}
      errorProps={{
        title: "お気に入りの取得に失敗しました",
      }}
      emptyProps={{
        title: "お気に入りがありません",
        message: "気になる物件をお気に入りに追加してみましょう",
        action: onClearAll
          ? undefined
          : {
              label: "物件を探す",
              onClick: () => {
                // TODO: 検索ページへのナビゲーション
              },
            },
        icon: (
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ),
      }}
    >
      {children}
    </ConditionalRender>
  );
};
