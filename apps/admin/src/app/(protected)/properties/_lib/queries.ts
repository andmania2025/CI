export async function getProperties() {
  try {
    // まずlocalStorageから取得を試みる
    if (typeof window !== "undefined") {
      const storedProperties = localStorage.getItem("properties");
      if (storedProperties) {
        return JSON.parse(storedProperties);
      }

      // localStorageにデータがない場合、サンプルデータをロード
      const data = await import("../_data/sample-properties.json");
      const properties = data.default || [];

      // localStorageに保存
      localStorage.setItem("properties", JSON.stringify(properties));
      return properties;
    }

    // サーバーサイドの場合はサンプルデータを返す
    const data = await import("../_data/sample-properties.json");
    return data.default || [];
  } catch (error) {
    console.error("物件データの読み込みに失敗:", error);
    return [];
  }
}
