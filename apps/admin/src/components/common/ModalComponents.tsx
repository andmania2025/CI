"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  type FieldProps,
  MODAL_STYLES,
  type ModalHeaderProps,
  type SectionProps,
} from "@/types/common-props";
import { FileText, X } from "lucide-react";
import type React from "react";

export { MODAL_STYLES };

// ============================================
// フィールド表示コンポーネント
// ============================================
export const Field: React.FC<FieldProps> = ({ label, value, isMono = false, className = "" }) => (
  <div className={className}>
    <Label className={MODAL_STYLES.fieldLabel}>{label}</Label>
    <p className={isMono ? MODAL_STYLES.fieldValueMono : MODAL_STYLES.fieldValue}>{value || "-"}</p>
  </div>
);

// ============================================
// セクション表示コンポーネント
// ============================================
export const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => (
  <div className={`${MODAL_STYLES.card} ${className}`}>
    <h3 className={MODAL_STYLES.cardTitle}>{title}</h3>
    {children}
  </div>
);

// ============================================
// モーダルヘッダーコンポーネント
// ============================================
interface DetailModalHeaderProps extends ModalHeaderProps {
  title?: string;
  description?: string;
}

export const DetailModalHeader: React.FC<DetailModalHeaderProps> = ({
  onClose,
  title = "問い合わせ詳細",
  description = "問い合わせの詳細情報を確認できます。",
}) => (
  <DialogHeader className={MODAL_STYLES.header}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div>
          <DialogTitle className="text-base font-semibold text-neutral-900">{title}</DialogTitle>
          <DialogDescription className="text-neutral-600 text-xs">{description}</DialogDescription>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="h-8 w-8 p-0 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        aria-label="閉じる"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  </DialogHeader>
);

// ============================================
// エクスポート型
// ============================================
export type { FieldProps, SectionProps, ModalHeaderProps } from "@/types/common-props";
