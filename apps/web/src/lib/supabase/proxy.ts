import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * URLが有効なHTTP/HTTPS URLかどうかを検証
 */
function isValidUrl(urlString: string | undefined): urlString is string {
  if (!urlString || urlString.trim() === "") {
    return false;
  }
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 環境変数が無効な場合は何もしない（開発環境でSupabaseなしで動作可能）
  if (!isValidUrl(supabaseUrl) || !supabaseKey || supabaseKey.trim() === "") {
    // 環境変数が設定されていない場合はセッション更新をスキップ
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          request.cookies.set({ name, value, ...options });
        }
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set({ name, value, ...options });
        }
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}
