"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LoginFormContent } from "../forms/login-form";
import { SignUpFormContent } from "../forms/signup-form";
import type { LoginValues, SignUpValues } from "../types/schemas";

// ダイアログとしてログイン/新規登録フォームを表示するコンポーネント
export function AuthDialog({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLoginSubmit = async (_data: LoginValues) => {
    setIsLoading(true);
    // TODO: ログインロジックを実装
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignUpSubmit = async (_data: SignUpValues) => {
    setIsLoading(true);
    // TODO: 新規登録ロジックを実装
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isLoginMode ? "ログイン" : "新規登録"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLoginMode
              ? "アカウントにログインしてください"
              : "新しいアカウントを作成してください"}
          </DialogDescription>
        </DialogHeader>

        {isLoginMode ? (
          <LoginFormContent
            isLoading={isLoading}
            onSubmit={handleLoginSubmit}
            idPrefix="dialog-"
            onSwitchToSignup={() => setIsLoginMode(false)}
          />
        ) : (
          <SignUpFormContent
            isLoading={isLoading}
            onSubmit={handleSignUpSubmit}
            idPrefix="dialog-"
            onSwitchToLogin={() => setIsLoginMode(true)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

// 互換性のため、LoginFormDialogとしてもエクスポート
export const LoginFormDialog = AuthDialog;
