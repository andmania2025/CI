"use client";

import { AlertCircle, CheckCircle, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { DuplicatePropertyResult } from "../_actions/duplicatePropertyAction";
import type { Property } from "./types";

interface PropertyDuplicateToastProps {
  propertyId: string | null;
  propertyTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PropertyDuplicateToast: React.FC<PropertyDuplicateToastProps> = ({
  propertyId,
  propertyTitle,
  onClose,
  onSuccess,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DuplicatePropertyResult | null>(null);

  useEffect(() => {
    if (propertyId) {
      setIsVisible(true);
      handleDuplicate();
    }
  }, [propertyId]);

  const handleDuplicate = async () => {
    if (!propertyId) {
      console.log("❌ 複製エラー: propertyIdがありません");
      return;
    }

    console.log("🔄 複製処理開始:", propertyId);
    setIsLoading(true);
    setResult(null);

    try {
      // localStorageから既存の物件データを取得
      const storageData = localStorage.getItem("properties");
      console.log("📦 localStorage データ:", storageData ? "存在する" : "存在しない");

      const existingProperties = JSON.parse(storageData || "[]");
      console.log("📋 既存物件数:", existingProperties.length);

      // 複製元の物件を検索
      const originalProperty = (existingProperties as Property[]).find((p) => p.id === propertyId);

      if (!originalProperty) {
        console.log("❌ 物件が見つかりません:", propertyId);
        setResult({
          success: false,
          message: "指定された物件が見つかりません",
          error: "PROPERTY_NOT_FOUND",
        });
        return;
      }

      console.log("✅ 複製元の物件を発見:", originalProperty.title);

      // 複製用のデータを準備
      const duplicatedProperty = {
        ...originalProperty,
        id: `duplicate_${propertyId}_${Date.now()}`,
        title: `${originalProperty.title} (複製)`,
        publicationStatus: "非公開",
        updateDate: new Date().toISOString(),
        nextUpdateDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        inquiryCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("📝 複製データ作成:", duplicatedProperty.id);

      // localStorageに複製された物件を追加
      const updatedProperties = [...existingProperties, duplicatedProperty];
      localStorage.setItem("properties", JSON.stringify(updatedProperties));

      console.log("💾 localStorage保存完了。新しい物件数:", updatedProperties.length);

      setResult({
        success: true,
        message: `物件「${originalProperty.title}」を複製しました`,
        duplicatedPropertyId: duplicatedProperty.id,
      });

      console.log("✅ 複製成功");
      onSuccess?.();

      // 3秒後に自動で閉じる
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("❌ 複製エラー:", error);
      setResult({
        success: false,
        message: "複製中にエラーが発生しました",
        error: error instanceof Error ? error.message : "不明なエラー",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div
        className={`bg-white border rounded-lg shadow-lg p-4 transition-all duration-300 ${
          result?.success
            ? "border-green-200 bg-green-50"
            : result?.success === false
              ? "border-red-200 bg-red-50"
              : "border-blue-200 bg-blue-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
            ) : result?.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : result?.success === false ? (
              <AlertCircle className="w-5 h-5 text-red-600" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">
              {isLoading
                ? "物件を複製中..."
                : result?.success
                  ? "複製完了"
                  : result?.success === false
                    ? "複製エラー"
                    : "複製処理"}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {isLoading
                ? `「${propertyTitle}」を複製しています...`
                : result?.message || "処理中..."}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* プログレスバー（ローディング時のみ） */}
        {isLoading && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
