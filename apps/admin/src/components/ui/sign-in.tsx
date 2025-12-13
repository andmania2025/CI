"use client";

import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  type: "validation" | "authentication" | "network" | "general";
  message: string;
  field?: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  register?: UseFormRegister<LoginFormData>;
  errors?: FieldErrors<LoginFormData>;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  loginError?: LoginError | null;
  clearLoginError?: () => void;
  isSubmitting?: boolean;
  isRedirecting?: boolean;
}

// --- MAIN COMPONENT ---
export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-black tracking-tighter">Welcome</span>,
  description = "Access account to continue",
  onSignIn,
  register,
  errors,
  showPassword = false,
  togglePasswordVisibility,
  loginError,
  clearLoginError,
  isSubmitting = false,
  isRedirecting = false,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-center text-gray-900">
            {title}
          </h1>
          <p className="text-gray-600 text-center">{description}</p>

          {/* デモアカウント情報 */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">管理者:</span>
                <span className="text-gray-900 font-mono">admin / pw</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">業務担当者:</span>
                <span className="text-gray-900 font-mono">sales / pw</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">一般ユーザー:</span>
                <span className="text-gray-900 font-mono">user / pw</span>
              </div>
            </div>
          </div>

          {/* エラー表示 */}
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{loginError.message}</p>
              {clearLoginError && (
                <button
                  onClick={clearLoginError}
                  className="text-xs text-red-600 hover:text-red-800 underline mt-1"
                >
                  エラーをクリア
                </button>
              )}
            </div>
          )}

          <form className="space-y-5" onSubmit={onSignIn}>
            <div>
              <label className="text-sm font-medium text-gray-700">User ID</label>
              <div className="rounded-2xl border border-gray-300 bg-white transition-colors focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
                <input
                  {...(register ? register("email") : {})}
                  type="text"
                  placeholder="Enter your user ID"
                  className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
              {errors?.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="rounded-2xl border border-gray-300 bg-white transition-colors focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200">
                <div className="relative">
                  <input
                    {...(register ? register("password") : {})}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              {errors?.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gray-900 py-4 font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {isRedirecting ? "ダッシュボードに移動中..." : "ログイン中..."}
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
