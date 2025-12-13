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

  /* 元のコード（Supabase接続時に有効化）
  try {
    // CSVデータをパース
    const lines = csvData.trim().split("\n");
    if (lines.length < 2) {
      return {
        success: false,
        message: "CSVファイルにデータが含まれていません",
        importedCount: 0,
        errorCount: 0,
      };
    }

    // ヘッダー行をスキップ
    const dataLines = lines.slice(1);
    const results: CsvImportResult = {
      success: true,
      message: "",
      importedCount: 0,
      errorCount: 0,
      errors: [],
    };

    // 各行を処理
    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i].trim();
      if (!line) continue; // 空行をスキップ

      try {
        // CSV行をパース（カンマ区切り）
        const columns = line
          .split(",")
          .map((col) => col.trim().replace(/^"|"$/g, ""));

        if (columns.length < 5) {
          results.errors?.push({
            row: i + 2, // ヘッダー行を考慮して+2
            field: "全体",
            message: "必要な列数が不足しています（5列必要）",
          });
          results.errorCount++;
          continue;
        }

        // データをオブジェクトに変換
        const propertyData: CsvPropertyData = {
          title: columns[0],
          publicationStatus: columns[1] as "公開" | "非公開",
          updateDate: columns[2],
          nextUpdateDate: columns[3],
          inquiryCount: parseInt(columns[4]) || 0,
        };

        // バリデーション
        const validatedData = csvImportSchema.parse(propertyData);

        // データベースに保存
        await prisma.property.create({
          data: {
            title: validatedData.title,
            publicationStatus: validatedData.publicationStatus,
            updateDate: new Date(validatedData.updateDate),
            nextUpdateDate: new Date(validatedData.nextUpdateDate),
            inquiryCount: validatedData.inquiryCount,
          },
        });

        results.importedCount++;
      } catch (error) {
        results.errorCount++;

        if (error instanceof z.ZodError) {
          // バリデーションエラーの場合
          error.errors.forEach((err) => {
            results.errors?.push({
              row: i + 2,
              field: err.path.join("."),
              message: err.message,
            });
          });
        } else {
          // その他のエラーの場合
          results.errors?.push({
            row: i + 2,
            field: "全体",
            message:
              error instanceof Error
                ? error.message
                : "不明なエラーが発生しました",
          });
        }
      }
    }

    // 結果メッセージを設定
    if (results.importedCount > 0 && results.errorCount === 0) {
      results.message = `${results.importedCount}件の物件データを正常にインポートしました`;
    } else if (results.importedCount > 0 && results.errorCount > 0) {
      results.message = `${results.importedCount}件をインポートしましたが、${results.errorCount}件でエラーが発生しました`;
      results.success = false;
    } else {
      results.message = `${results.errorCount}件すべてでエラーが発生しました`;
      results.success = false;
    }

    return results;
  } catch (error) {
    console.error("CSVインポートエラー:", error);
    return {
      success: false,
      message: "CSVインポート中に予期しないエラーが発生しました",
      importedCount: 0,
      errorCount: 0,
      errors: [
        {
          row: 0,
          field: "全体",
          message:
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました",
        },
      ],
    };
  }
  */
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
