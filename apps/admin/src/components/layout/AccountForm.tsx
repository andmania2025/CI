"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const accountFormSchema = z.object({
  loginId: z.string().min(1, "ログインIDは必須です"),
  email: z
    .string()
    .email("有効なメールアドレスを入力してください")
    .min(1, "メールアドレスは必須です"),
  password: z.string().min(1, "ログインパスワードは必須です"),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

interface AccountFormProps {
  defaultValues: Partial<AccountFormValues>;
  onCancel: () => void;
  onSubmit: (data: AccountFormValues) => void;
}

export function AccountForm({ defaultValues, onCancel, onSubmit }: AccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      loginId: defaultValues.loginId || "",
      email: defaultValues.email || "",
      password: defaultValues.password || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="loginId">
          ログインID<span className="text-red-500">*</span>
        </Label>
        <Input
          id="loginId"
          {...register("loginId")}
          placeholder="admin"
          readOnly
          className={cn("bg-muted cursor-not-allowed", errors.loginId ? "border-red-500" : "")}
        />
        {errors.loginId && <p className="text-sm text-red-500">{errors.loginId.message}</p>}
        <p className="text-xs text-muted-foreground">※ログインIDは変更できません。</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">
          ログインパスワード<span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="パスワードを入力"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">
          メールアドレス<span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="email@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </DialogFooter>
    </form>
  );
}
