import sampleRealtorsData from "../_data/sample-realtors.json";

export async function getRealtors() {
  try {
    return sampleRealtorsData || [];
  } catch (error) {
    console.error("不動産業者データの読み込みに失敗:", error);
    return [];
  }
}
