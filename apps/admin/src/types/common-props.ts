import type React from "react";

// ============================================
// 共通モーダルスタイル定数
// ============================================
export const MODAL_STYLES = {
  container:
    "!w-[95vw] !max-w-[1000px] !max-h-[90vh] rounded-2xl shadow-xl border border-neutral-200 bg-white p-0 flex flex-col",
  header: "p-5 pb-4 shrink-0 border-b border-neutral-200",
  content: "flex-1 px-5 pt-1 pb-4 overflow-y-auto",
  section: "space-y-3",
  card: "bg-white p-3 rounded-lg border border-neutral-200",
  cardTitle: "text-sm font-semibold text-neutral-900 mb-2",
  fieldLabel: "text-xs font-medium text-neutral-600 mb-1 block",
  fieldValue: "text-xs text-neutral-900 bg-white px-2.5 py-1.5 rounded border border-neutral-200",
  fieldValueMono:
    "text-xs font-mono text-neutral-900 bg-white px-2.5 py-1.5 rounded border border-neutral-200",
} as const;

// ============================================
// 共通Props定義
// ============================================

/**
 * フィールド表示用Props
 */
export interface FieldProps {
  label: string;
  value: string | undefined;
  isMono?: boolean;
  className?: string;
}

/**
 * セクション表示用Props
 */
export interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * モーダルヘッダー用Props
 */
export interface ModalHeaderProps {
  onClose: () => void;
}

// ============================================
// 検索・ページネーション用Props
// ============================================

/**
 * ページネーション共通Props
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

/**
 * 汎用検索フォームProps
 */
export interface SearchFormProps<T> {
  searchParams: T;
  onParamsChange: (params: Partial<T>) => void;
  onSearch: () => void;
  onReset: () => void;
}

// ============================================
// テーブル選択用Props
// ============================================

/**
 * 選択可能テーブルのハンドラーProps
 */
export interface SelectableTableHandlers {
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (id: string, checked: boolean) => void;
}
