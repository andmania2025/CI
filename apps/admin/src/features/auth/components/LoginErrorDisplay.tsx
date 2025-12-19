"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Mail, Shield, Wifi } from "lucide-react";
import type React from "react";

// エラータイプ定義
export interface LoginError {
  type: "validation" | "authentication" | "network" | "general";
  message: string;
  field?: string;
}

// エラー表示のプロパティ
interface LoginErrorDisplayProps {
  error: LoginError | null;
  className?: string;
}

// フィールドエラー表示のプロパティ
interface FieldErrorDisplayProps {
  error: LoginError;
  className?: string;
}

// エラータイプに応じたアイコンとスタイルを取得
const getErrorConfig = (type: LoginError["type"]) => {
  switch (type) {
    case "validation":
      return {
        icon: Mail,
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-800",
        iconColor: "text-amber-600",
      };
    case "authentication":
      return {
        icon: Shield,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
        iconColor: "text-red-600",
      };
    case "network":
      return {
        icon: Wifi,
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-800",
        iconColor: "text-orange-600",
      };
    default:
      return {
        icon: AlertCircle,
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        textColor: "text-gray-800",
        iconColor: "text-gray-600",
      };
  }
};

// メインエラー表示コンポーネント
export const LoginErrorDisplay: React.FC<LoginErrorDisplayProps> = ({ error, className }) => {
  if (!error) return null;

  const config = getErrorConfig(error.type);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        config.bgColor,
        config.borderColor,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
      <div className="flex-1">
        <p className={cn("text-sm font-medium", config.textColor)}>{error.message}</p>
      </div>
    </div>
  );
};

// フィールド固有のエラー表示コンポーネント
export const FieldErrorDisplay: React.FC<FieldErrorDisplayProps> = ({ error, className }) => {
  const config = getErrorConfig(error.type);
  const Icon = config.icon;

  return (
    <div
      className={cn("flex items-center gap-2 text-sm", config.textColor, className)}
      role="alert"
      aria-live="polite"
      id={error.field ? `${error.field}-error` : undefined}
    >
      <Icon className={cn("w-4 h-4 shrink-0", config.iconColor)} />
      <span>{error.message}</span>
    </div>
  );
};
