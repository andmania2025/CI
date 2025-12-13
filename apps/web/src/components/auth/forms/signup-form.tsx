"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { type SignUpValues, signUpSchema } from "../types/schemas";

export function SignUpFormContent({
  isLoading,
  onSubmit,
  idPrefix = "",
  onSwitchToLogin,
}: {
  isLoading: boolean;
  onSubmit: (data: SignUpValues) => void;
  idPrefix?: string;
  onSwitchToLogin?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}signup-email`}>メールアドレス</Label>
          <Input
            id={`${idPrefix}signup-email`}
            type="email"
            placeholder="example@mail.com"
            disabled={isLoading}
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}signup-password`}>パスワード</Label>
          <Input
            id={`${idPrefix}signup-password`}
            type="password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}signup-password-confirm`}>パスワード（確認）</Label>
          <Input
            id={`${idPrefix}signup-password-confirm`}
            type="password"
            disabled={isLoading}
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? "登録中..." : "新規登録"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white dark:bg-slate-950 px-2 text-muted-foreground">
            または
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
            <FcGoogle className="h-5 w-5" />
            <span className="ml-2">Googleで登録</span>
          </Button>
        </div>
        <div className="text-center text-sm">
          すでにアカウントをお持ちの方は{" "}
          {onSwitchToLogin ? (
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToLogin}
              className="p-0 h-auto text-primary underline underline-offset-4 hover:text-primary/80"
            >
              ログイン
            </Button>
          ) : (
            <Link
              href="/login"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
