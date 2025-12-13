"use client";

import { SignInPage } from "@/components/ui/sign-in";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useEffect } from "react";

export default function LoginPage() {
  // ページタイトルを設定
  useEffect(() => {
    document.title = "ログイン - ウチカツ管理システム";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    showPassword,
    togglePasswordVisibility,
    loginError,
    clearLoginError,
    isRedirecting,
  } = useLoginForm();

  return (
    <SignInPage
      onSignIn={handleSubmit}
      register={register}
      errors={errors}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      loginError={loginError}
      clearLoginError={clearLoginError}
      isSubmitting={isSubmitting}
      isRedirecting={isRedirecting}
    />
  );
}
