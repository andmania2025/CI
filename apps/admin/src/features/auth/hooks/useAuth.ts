"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 簡易的な認証チェック（実際の実装では、JWTトークンやSupabaseセッションを確認）
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
        } catch (_error) {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      // 開発用のダミーログイン（実際の実装では、Supabase Authを使用）
      const demoAccounts = [
        { email: "admin", password: "pw", role: "admin", name: "管理者" },
        { email: "sales", password: "pw", role: "sales", name: "営業担当者" },
        { email: "user", password: "pw", role: "user", name: "一般ユーザー" },
      ];

      const account = demoAccounts.find((acc) => {
        return acc.email === email && acc.password === password;
      });

      if (account) {
        const userData: User = {
          id: account.role,
          email: account.email,
          name: account.name,
          role: account.role,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Cookie認証トークンを設定（ミドルウェア用）
        document.cookie = `auth-token=${account.role}-${Date.now()}; path=/; max-age=86400; SameSite=Lax`;

        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, error: "メールアドレスまたはパスワードが正しくありません。" };
    } catch {
      setLoading(false);
      return { success: false, error: "ログインに失敗しました。" };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      // 開発用のダミーGoogleログイン
      const userData: User = {
        id: "google-1",
        email: "user@google.com",
        name: "Google ユーザー",
        role: "user",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Cookie認証トークンを設定（ミドルウェア用）
      document.cookie = `auth-token=google-${Date.now()}; path=/; max-age=86400; SameSite=Lax`;

      setLoading(false);
      return { success: true };
    } catch {
      setLoading(false);
      return { success: false, error: "Googleログインに失敗しました。" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    // Cookie認証トークンも削除
    document.cookie = "auth-token=; path=/; max-age=0; SameSite=Lax";
    setUser(null);
    router.push("/login");
  };

  return {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };
};
