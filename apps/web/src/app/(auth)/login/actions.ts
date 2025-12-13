"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// バリデーションスキーマ
const authSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

export async function login(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Zodバリデーション
  const result = authSchema.safeParse(rawData);
  if (!result.success) {
    redirect("/login?error=validation");
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=credentials");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Zodバリデーション
  const result = authSchema.safeParse(rawData);
  if (!result.success) {
    redirect("/signup?error=validation");
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/signup?error=failed");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
