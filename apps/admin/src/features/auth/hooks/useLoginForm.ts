"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "./useAuth";

// ログインフォームのスキーマ
const loginSchema = z.object({
  email: z.string().min(1, "ユーザーIDを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// エラータイプ
export interface LoginError {
  type: "validation" | "authentication" | "network" | "general";
  message: string;
  field?: string;
}

// デモアカウント定義
export interface DemoAccount {
  email: string;
  password: string;
  role: string;
  displayName: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const demoAccounts: DemoAccount[] = [
  {
    email: "admin",
    password: "pw",
    role: "admin",
    displayName: "管理者",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  {
    email: "sales",
    password: "pw",
    role: "sales",
    displayName: "営業担当者",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    email: "user",
    password: "pw",
    role: "user",
    displayName: "一般ユーザー",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
];

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, setValue } = form;

  // パスワード表示切り替え
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // エラークリア
  const clearLoginError = useCallback(() => {
    setLoginError(null);
  }, []);

  // メールアドレス検証
  const handleEmailValidation = useCallback(async (data: { email: string }) => {
    try {
      // バリデーション
      const emailValidation = loginSchema.pick({ email: true }).safeParse(data);
      if (!emailValidation.success) {
        setLoginError({
          type: "validation",
          message: "メールアドレスの形式が正しくありません",
          field: "email",
        });
        return;
      }

      setLoginError(null);
      setEmailVerified(true);
    } catch {
      setLoginError({
        type: "general",
        message: "メールアドレスの検証中にエラーが発生しました",
      });
    }
  }, []);

  // ログイン処理
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setLoginError(null);
        setIsRedirecting(false);

        // useAuthのlogin関数を使用
        const result = await login(data.email, data.password);

        if (result.success) {
          setIsRedirecting(true);

          // リダイレクト
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 500);
        } else {
          setLoginError({
            type: "authentication",
            message: result.error || "メールアドレスまたはパスワードが正しくありません",
          });
        }
      } catch (_error) {
        setLoginError({
          type: "network",
          message: "ログインに失敗しました。しばらく時間をおいて再度お試しください。",
        });
      }
    },
    [login]
  );

  // デモアカウントログイン
  const handleDemoLogin = useCallback(
    async (account: DemoAccount) => {
      setValue("email", account.email);
      setValue("password", account.password);
      setEmailVerified(true);

      // 少し遅らせて自動ログイン
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 100);
    },
    [setValue, handleSubmit, onSubmit]
  );

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formState,
    showPassword,
    togglePasswordVisibility,
    loginError,
    clearLoginError,
    demoAccounts,
    handleDemoLogin,
    emailVerified,
    handleEmailValidation,
    isRedirecting,
  };
};
