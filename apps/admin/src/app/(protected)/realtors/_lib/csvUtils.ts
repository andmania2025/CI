import type { Realtor } from "../_components/types";

/**
 * 不動産業者データをCSV形式に変換する
 */
export const convertRealtorsToCSV = (realtors: Realtor[]): string => {
  if (realtors.length === 0) {
    return "";
  }

  // CSVヘッダー
  const headers = ["ID", "タイトル", "掲載状況", "更新日", "次回更新予定日", "問い合わせ数"];

  // CSVデータ行
  const rows = realtors.map((realtor) => [
    realtor.id,
    realtor.title,
    realtor.publicationStatus,
    realtor.updateDate,
    realtor.nextUpdateDate,
    realtor.inquiryCount.toString(),
  ]);

  // CSV文字列を生成
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");

  return csvContent;
};

/**
 * CSVファイルをダウンロードする
 */
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * 選択された不動産業者のCSVをダウンロードする
 */
export const downloadSelectedRealtorsCSV = (
  realtors: Realtor[],
  selectedRealtorIds: string[]
): void => {
  const selectedRealtors = realtors.filter((realtor) => selectedRealtorIds.includes(realtor.id));

  if (selectedRealtors.length === 0) {
    alert("選択された不動産業者がありません。");
    return;
  }

  const csvContent = convertRealtorsToCSV(selectedRealtors);
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `selected_realtors_${timestamp}.csv`;

  downloadCSV(csvContent, filename);
};
