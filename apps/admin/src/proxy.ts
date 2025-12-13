import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 保護されたルート
const protectedRoutes = [
  "/dashboard",
  "/members",
  "/properties",
  "/realtors",
  "/settings",
  "/site-inquiries",
  "/user-posts",
  "/content",
  "/file-box",
  "/mail",
];

// 認証ルート
const authRoutes = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // 静的ファイルとAPIルートはスキップ
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 開発環境では認証ミドルウェアを無効化
  if (process.env.NODE_ENV === "development") {
    // ルートパスの処理のみ実行
    if (pathname === "/") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 本番環境での認証チェック
  const userToken = request.cookies.get("auth-token")?.value;
  const isAuthenticated = !!userToken;

  // 保護されたルートへのアクセス
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 認証済みユーザーが認証ページにアクセスした場合
  if (authRoutes.includes(pathname) && isAuthenticated) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ルートパスの処理
  if (pathname === "/") {
    if (isAuthenticated) {
      url.pathname = "/dashboard";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 以下を除くすべてのリクエストにマッチ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
