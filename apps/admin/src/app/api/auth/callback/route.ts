import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // エラーハンドリング
    if (error) {
      console.error("認証エラー:", error, errorDescription);
      return NextResponse.redirect(new URL("/login?error=auth_error", request.url));
    }

    // 認証コードが提供された場合の処理
    if (code) {
      // 実際の実装では、ここでSupabaseやその他の認証プロバイダーと
      // 認証コードを交換してアクセストークンを取得する

      // デモ版では簡単なリダイレクトのみ
      console.log("認証コード受信:", code);

      // 成功時はダッシュボードにリダイレクト
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // コードが提供されなかった場合
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  } catch (error) {
    console.error("認証コールバックエラー:", error);
    return NextResponse.redirect(new URL("/login?error=callback_error", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // POST形式での認証コールバック処理
    // 実際の実装では、認証プロバイダーからのWebhookを処理

    console.log("認証コールバック (POST):", body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("認証コールバック (POST) エラー:", error);
    return NextResponse.json({ error: "コールバック処理に失敗しました" }, { status: 500 });
  }
}
