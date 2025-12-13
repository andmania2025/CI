"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { type LoginValues, loginSchema } from "../types/schemas";

// 共通のフォームコンポーネント
export function LoginFormContent({
  isLoading,
  onSubmit,
  idPrefix = "",
  onSwitchToSignup,
}: {
  isLoading: boolean;
  onSubmit: (data: LoginValues) => void;
  idPrefix?: string;
  onSwitchToSignup?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor={`${idPrefix}email`}>メールアドレス</Label>
          <Input
            id={`${idPrefix}email`}
            type="email"
            placeholder="example@mail.com"
            disabled={isLoading}
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor={`${idPrefix}password`}>パスワード</Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm text-primary underline-offset-2 hover:underline"
            >
              パスワードをお忘れですか？
            </Link>
          </div>
          <Input
            id={`${idPrefix}password`}
            type="password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? "ログイン中..." : "ログイン"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white dark:bg-slate-950 px-2 text-muted-foreground">
            または
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
            <FcGoogle className="h-5 w-5" />
            <span className="ml-2">Google</span>
          </Button>
        </div>
        <div className="text-center text-sm">
          アカウントをお持ちでない方は{" "}
          {onSwitchToSignup ? (
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToSignup}
              className="p-0 h-auto text-primary underline underline-offset-4 hover:text-primary/80"
            >
              新規登録
            </Button>
          ) : (
            <Link
              href="/signup"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              新規登録
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}

// カード形式のログインフォーム（ページ用）
export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    // TODO: 認証ロジックを実装
    console.log(data);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">ログイン</h1>
                <p className="text-balance text-muted-foreground">
                  アカウントにログインしてください
                </p>
              </div>
              <LoginFormContent isLoading={isLoading} onSubmit={handleSubmit} idPrefix="page-" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
