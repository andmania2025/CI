import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postalCode = searchParams.get("postalCode");

  if (!postalCode) {
    return NextResponse.json({ error: "郵便番号が指定されていません" }, { status: 400 });
  }

  // 郵便番号の形式チェック（7桁の数字）
  if (!/^\d{7}$/.test(postalCode)) {
    return NextResponse.json({ error: "郵便番号は7桁の数字で入力してください" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://postcode.teraren.com/postcodes/${postalCode}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // レスポンスデータの構造を確認して適切に処理
    if (data?.new) {
      return NextResponse.json({
        success: true,
        data: {
          postalCode: data.new,
          prefecture: data.prefecture || "",
          city: data.city || "",
          address: data.suburb || "",
        },
      });
    }
    return NextResponse.json({ error: "住所情報が見つかりませんでした" }, { status: 404 });
  } catch (error) {
    console.error("郵便番号API エラー:", error);
    return NextResponse.json({ error: "住所の取得に失敗しました" }, { status: 500 });
  }
}
