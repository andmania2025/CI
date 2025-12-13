import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 実際の実装では、以下を行う:
    // 1. セッションまたはJWTトークンを無効化
    // 2. Supabaseからのサインアウト
    // 3. データベース内のセッション情報をクリア

    console.log("ログアウト処理を実行");

    // Cookieからトークンをクリア
    const response = NextResponse.json({ success: true, message: "ログアウトしました" });

    // 認証関連のCookieを削除
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // 即座に期限切れにする
    });

    response.cookies.set("refresh-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("ログアウトエラー:", error);
    return NextResponse.json(
      { success: false, error: "ログアウト処理に失敗しました" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // GETリクエストでのログアウト（リダイレクト形式）
  try {
    const response = NextResponse.redirect(new URL("/login", "http://localhost:3000"));

    // Cookieをクリア
    response.cookies.set("auth-token", "", { maxAge: 0 });
    response.cookies.set("refresh-token", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.error("ログアウト (GET) エラー:", error);
    return NextResponse.redirect(new URL("/login?error=logout_error", "http://localhost:3000"));
  }
}
