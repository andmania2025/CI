"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLoginForm } from "../hooks/useLoginForm";
import { FieldErrorDisplay, LoginErrorDisplay } from "./LoginErrorDisplay";

// SNSログインボタンコンポーネント
const SNSLoginButton: React.FC<{
  provider: "google";
  onClick: () => void;
  disabled?: boolean;
}> = ({ provider, onClick, disabled = false }) => {
  const config = {
    google: {
      label: "Googleでログイン",
      bgColor: "bg-white hover:bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      icon: <FcGoogle className="w-5 h-5" />,
    },
  };

  const { label, bgColor, textColor, borderColor, icon } = config[provider];

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-11 ${bgColor} ${textColor} ${borderColor} border font-bold transition-colors flex items-center justify-center gap-3 shadow-sm`}
    >
      {icon}
      <span className="font-bold text-base tracking-wide drop-shadow-sm">
        {label}
      </span>
    </Button>
  );
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    showPassword,
    togglePasswordVisibility,
    loginError,
    clearLoginError,
    demoAccounts,
    handleDemoLogin,
    emailVerified,
    handleEmailValidation,
    isRedirecting,
  } = useLoginForm();

  // 開発環境かどうかを判定
  const isDevelopment = process.env.NODE_ENV === "development";

  // SNSログインハンドラー
  const handleGoogleLogin = async () => {
    try {
      // デモ版：Googleログインは無効化
      alert(
        "Googleログインはデモ版では無効化されています。デモアカウントをご利用ください。",
      );
    } catch (_error) {
      // エラー処理
    }
  };

  // メールアドレス検証ハンドラー
  const handleContinue = async () => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    if (emailInput) {
      await handleEmailValidation({ email: emailInput.value });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-2 mt-4">
            <Image
              src="/logo.svg"
              alt="ウチカツロゴ"
              width={290}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>
        </div>

        {/* Main Login Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900">
              管理システムログイン
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Error Display */}
            <LoginErrorDisplay error={loginError} className="mb-4" />

            {/* Step 1: Email Input */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  メールアドレス
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="pl-9 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    placeholder="例: ucikatu@example.com"
                    disabled={isSubmitting || emailVerified}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <FieldErrorDisplay
                    error={{
                      type: "validation",
                      message:
                        errors.email.message ||
                        "メールアドレスを入力してください",
                      field: "email",
                    }}
                  />
                )}
              </div>

              {/* Continue Button - メールアドレス検証後に非表示 */}
              {!emailVerified && (
                <Button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                  size="lg"
                >
                  続ける
                </Button>
              )}
            </div>

            {/* SNS Login Section - メールアドレス検証前のみ表示 */}
            {!emailVerified && (
              <div className="space-y-3">
                {/* Separator */}
                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex justify-center">
                    <span className="bg-white px-3 text-sm text-gray-500 -mt-2.5">
                      または
                    </span>
                  </div>
                </div>

                {/* SNS Login Buttons */}
                <div className="space-y-3">
                  <SNSLoginButton
                    provider="google"
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Password Form (条件付き表示) */}
            {emailVerified && (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    パスワード
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password")}
                      className="pl-9 pr-12 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      placeholder="パスワードを入力"
                      disabled={isSubmitting}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      disabled={isSubmitting}
                      aria-label={
                        showPassword ? "パスワードを隠す" : "パスワードを表示"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <FieldErrorDisplay
                      error={{
                        type: "validation",
                        message:
                          errors.password.message ||
                          "パスワードを入力してください",
                        field: "password",
                      }}
                    />
                  )}
                </div>

                {/* Submit Button - パスワードフィールドとの間隔を広げる */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div
                          className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                          aria-hidden="true"
                        />
                        {isRedirecting
                          ? "ダッシュボードに移動中..."
                          : "ログイン中..."}
                      </div>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
                        ログイン
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Demo Accounts Section - 開発環境のみ表示 */}
            {isDevelopment && demoAccounts.length > 0 && (
              <>
                {/* Separator */}
                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex justify-center">
                    <span className="bg-white px-3 text-sm text-gray-500 -mt-2.5">
                      デモアカウント
                    </span>
                  </div>
                </div>

                {/* Demo Accounts */}
                <div className="space-y-3">
                  {demoAccounts.map((account) => (
                    <Card
                      key={`demo-${account.role}`}
                      className={`p-0 border transition-all duration-200 hover:shadow-md ${account.borderColor} ${account.bgColor}`}
                    >
                      <Button
                        onClick={() => handleDemoLogin(account)}
                        disabled={isSubmitting}
                        variant="ghost"
                        className={`w-full h-auto p-4 justify-between text-left hover:bg-transparent ${account.textColor}`}
                        aria-label={`${account.displayName}でログイン`}
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {account.displayName}
                          </div>
                          <div className="text-xs mt-1 font-mono opacity-75">
                            {account.email}
                          </div>
                        </div>
                        <LogIn
                          className="w-4 h-4 opacity-60"
                          aria-hidden="true"
                        />
                      </Button>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* Clear Error Button (開発用) */}
            {isDevelopment && loginError && (
              <div className="pt-2">
                <Button
                  type="button"
                  onClick={clearLoginError}
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-500 hover:text-gray-700 text-xs"
                >
                  エラーをクリア
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Copyright ©2025 DREAMPLANNING Co.,Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
