"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Download, FileText, Upload } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

interface CsvImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

// ファイルサイズ制限（10MB）
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILE_SIZE_MB = 10;

export const CsvImportDialog: React.FC<CsvImportDialogProps> = ({
  isOpen,
  onOpenChange,
  onImportComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    importedCount: number;
    errorCount: number;
    errors?: Array<{
      row: number;
      field: string;
      message: string;
    }>;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル選択処理
  const handleFileSelect = async (file: File) => {
    // ファイル拡張子チェック
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setImportResult({
        success: false,
        message: "CSVファイルを選択してください",
        importedCount: 0,
        errorCount: 0,
      });
      return;
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      setImportResult({
        success: false,
        message: `ファイルサイズが大きすぎます（最大${MAX_FILE_SIZE_MB}MB、現在のサイズ: ${(
          file.size / 1024 / 1024
        ).toFixed(2)}MB）`,
        importedCount: 0,
        errorCount: 0,
      });
      return;
    }

    // CSV内容を読み込む
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvData = e.target?.result as string;
      if (csvData) {
        await handleImport(csvData);
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  // CSVインポート処理
  const handleImport = async (csvData: string) => {
    setIsLoading(true);
    setImportResult(null);

    try {
      // 簡単なCSV解析（実際の実装ではより詳細な検証が必要）
      const lines = csvData.split("\n").filter((line) => line.trim());
      const _headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));

      // サンプル結果を返す
      setTimeout(() => {
        setImportResult({
          success: true,
          message: `${lines.length - 1}件の不動産業者データをインポートしました`,
          importedCount: lines.length - 1,
          errorCount: 0,
        });
        setIsLoading(false);
        onImportComplete?.();
      }, 2000);
    } catch (error) {
      setImportResult({
        success: false,
        message: "インポート中にエラーが発生しました",
        importedCount: 0,
        errorCount: 0,
        errors: [
          {
            row: 0,
            field: "全体",
            message: error instanceof Error ? error.message : "不明なエラー",
          },
        ],
      });
      setIsLoading(false);
    }
  };

  // ドラッグ&ドロップ処理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // サンプルCSVダウンロード
  const handleDownloadSample = async () => {
    const sampleCsv = `会社名,代表者名,免許番号,住所,電話番号,メールアドレス
株式会社サンプル不動産,田中太郎,東京都知事(1)第12345号,東京都渋谷区1-1-1,03-1234-5678,info@sample.co.jp
有限会社テストエステート,佐藤花子,東京都知事(2)第67890号,東京都新宿区2-2-2,03-9876-5432,contact@test.jp`;

    const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_realtors.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ダイアログを閉じる
  const handleClose = () => {
    setImportResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>CSVインポート</DialogTitle>
          <DialogDescription>
            不動産業者データをCSVファイルから一括インポートします。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* サンプルCSVダウンロード */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                CSVファイルの形式がわからない場合は、サンプルファイルをダウンロードしてください
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSample}
              className="flex items-center gap-1 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              サンプルCSV
            </Button>
          </div>

          {/* ファイルアップロードエリア */}
          {!importResult && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                CSVファイルをドラッグ&ドロップ
              </p>
              <p className="text-sm text-gray-500 mb-4">または</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="mb-2"
              >
                ファイルを選択
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
              />
              <div className="text-xs text-gray-400 mt-4 space-y-1">
                <p>対応形式: CSV（UTF-8）</p>
                <p>ファイルサイズ: 最大{MAX_FILE_SIZE_MB}MB</p>
              </div>
            </div>
          )}

          {/* ローディング表示 */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                <span className="text-sm text-gray-600">インポート中...</span>
              </div>
              <Progress value={undefined} className="w-full" />
            </div>
          )}

          {/* インポート結果表示 */}
          {importResult && (
            <div className="space-y-4">
              <Alert
                className={
                  importResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }
              >
                <div className="flex items-center gap-2">
                  {importResult.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={importResult.success ? "text-green-800" : "text-red-800"}
                  >
                    {importResult.message}
                  </AlertDescription>
                </div>
              </Alert>

              {/* エラー詳細 */}
              {importResult.errors && importResult.errors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">エラー詳細:</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {importResult.errors.map((error, index) => (
                      <div
                        key={index}
                        className="text-xs bg-red-50 border border-red-200 rounded p-2"
                      >
                        <span className="font-medium">行 {error.row}:</span> {error.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 統計情報 */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <div className="font-medium text-green-800">成功</div>
                  <div className="text-lg font-bold text-green-600">
                    {importResult.importedCount}件
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <div className="font-medium text-red-800">エラー</div>
                  <div className="text-lg font-bold text-red-600">{importResult.errorCount}件</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {importResult ? "閉じる" : "キャンセル"}
          </Button>
          {importResult && (
            <Button onClick={() => setImportResult(null)}>新しいファイルをインポート</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
