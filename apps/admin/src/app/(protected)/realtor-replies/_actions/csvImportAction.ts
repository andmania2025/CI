"use server";

import {
  type CsvImportResult,
  type CsvPropertyData,
  csvImportSchema,
} from "../_schemas/csvImportSchema";

/**
 * CSVファイルから物件データをインポートするServer Action
 */
export async function importPropertiesFromCsv(_csvData: string): Promise<CsvImportResult> {
  // 一時的にSupabase接続を無効化
  return {
    success: false,
    message: "CSVインポート機能は一時的に無効化されています",
    importedCount: 0,
    errorCount: 0,
    errors: [
      {
        row: 0,
        field: "全体",
        message: "データベース接続が設定されていません",
      },
    ],
  };
}

/**
 * サンプルCSVデータを生成する関数（テスト用）
 */
export async function generateSampleCsv(): Promise<string> {
  const headers = "物件名,掲載状況,更新日,次回更新予定日,問い合わせ回数";
  const sampleData = [
    "渋谷駅徒歩5分 デザイナーズマンション,公開,2025-01-10,2025-01-15,12",
    "新宿三丁目 高層ビル最上階,公開,2025-01-12,2025-01-20,8",
    "横浜みなとみらい オーシャンビュー,非公開,2025-01-08,2025-01-18,5",
    "表参道 高級マンション,公開,2025-01-14,2025-01-22,15",
    "六本木 タワーマンション,非公開,2025-01-09,2025-01-25,3",
  ];

  return [headers, ...sampleData].join("\n");
}
