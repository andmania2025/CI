import type { Member } from "../_components/types";

export async function getProperties(): Promise<Member[]> {
  try {
    // まずlocalStorageから取得を試みる
    if (typeof window !== "undefined") {
      // 開発中は常に最新のサンプルデータをロードする
      // localStorageのキャッシュを削除する場合は、以下をコメントアウトして
      // localStorage.removeItem("members")を実行してください

      // localStorageにデータがない場合、または常に最新データを使用する場合
      const data = await import("../_data/sample-members.json");
      const members = (data.default || []) as Member[];

      // localStorageに保存（常に最新データを保存）
      localStorage.setItem("members", JSON.stringify(members));
      return members;
    }

    // サーバーサイドの場合はサンプルデータを返す
    const data = await import("../_data/sample-members.json");
    return (data.default || []) as Member[];
  } catch (error) {
    console.error("会員データの読み込みに失敗:", error);
    return [];
  }
}
