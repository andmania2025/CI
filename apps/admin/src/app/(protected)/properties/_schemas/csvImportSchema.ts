import { z } from "zod";

// CSVインポート用のバリデーションスキーマ
export const csvImportSchema = z.object({
  title: z.string().min(1, "物件名は必須です"),
  publicationStatus: z.enum(["公開", "非公開"], {
    message: "掲載状況は「公開」または「非公開」を選択してください",
  }),
  updateDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !Number.isNaN(parsedDate.getTime());
  }, "有効な日付を入力してください"),
  nextUpdateDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !Number.isNaN(parsedDate.getTime());
  }, "有効な日付を入力してください"),
  inquiryCount: z.coerce.number().int().min(0, "問い合わせ回数は0以上の整数を入力してください"),
});

// CSV行データの型定義
export type CsvPropertyData = z.infer<typeof csvImportSchema>;

// CSVインポート結果の型定義
export interface CsvImportResult {
  success: boolean;
  message: string;
  importedCount: number;
  errorCount: number;
  errors?: Array<{
    row: number;
    field: string;
    message: string;
  }>;
}
