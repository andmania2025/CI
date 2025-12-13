export async function getDashboardInquiries() {
  try {
    const data = await import("../_data/inquiry-data.json");
    return data.default || [];
  } catch (error) {
    console.error("問い合わせデータの読み込みに失敗:", error);
    return [];
  }
}

export async function getDashboardProperties() {
  try {
    const data = await import("../_data/property-data.json");
    return data.default || [];
  } catch (error) {
    console.error("物件データの読み込みに失敗:", error);
    return [];
  }
}
