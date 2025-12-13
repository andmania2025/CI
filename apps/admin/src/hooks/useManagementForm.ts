"use client";

import { useCallback, useState } from "react";

// ============================================
// 型定義
// ============================================

/**
 * チェックボックスグループの状態
 */
export type CheckboxGroupState = Record<string, Record<string, boolean>>;

/**
 * 検索パラメータの基本形
 */
export interface BaseSearchParams {
  [key: string]: string;
}

/**
 * useManagementForm のオプション
 */
export interface UseManagementFormOptions<T extends BaseSearchParams> {
  initialSearchParams: T;
  initialCheckboxState?: CheckboxGroupState;
}

/**
 * useManagementForm の戻り値
 */
export interface UseManagementFormReturn<T extends BaseSearchParams> {
  // 検索パラメータ
  searchParams: T;
  handleInputChange: (field: keyof T, value: string) => void;
  handleSearch: () => void;
  handleReset: () => void;

  // チェックボックス状態
  checkboxState: CheckboxGroupState;
  handleCheckboxChange: (category: string, field: string, checked: boolean) => void;

  // 検索状態
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
}

// ============================================
// useManagementForm Hook
// ============================================

export function useManagementForm<T extends BaseSearchParams>({
  initialSearchParams,
  initialCheckboxState = {},
}: UseManagementFormOptions<T>): UseManagementFormReturn<T> {
  const [searchParams, setSearchParams] = useState<T>(initialSearchParams);
  const [checkboxState, setCheckboxState] = useState<CheckboxGroupState>(initialCheckboxState);
  const [isSearching, setIsSearching] = useState(false);

  // テキスト入力の変更ハンドラ
  const handleInputChange = useCallback((field: keyof T, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // チェックボックスの変更ハンドラ
  const handleCheckboxChange = useCallback((category: string, field: string, checked: boolean) => {
    setCheckboxState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: checked,
      },
    }));
  }, []);

  // 検索実行
  const handleSearch = useCallback(() => {
    setIsSearching(true);
    // 実際の検索ロジックは呼び出し元で実装
    setTimeout(() => setIsSearching(false), 100);
  }, []);

  // リセット
  const handleReset = useCallback(() => {
    setSearchParams(initialSearchParams);
    setCheckboxState(initialCheckboxState);
  }, [initialSearchParams, initialCheckboxState]);

  return {
    searchParams,
    handleInputChange,
    handleSearch,
    handleReset,
    checkboxState,
    handleCheckboxChange,
    isSearching,
    setIsSearching,
  };
}

// ============================================
// useSelectionState Hook
// ============================================

export interface UseSelectionStateOptions {
  items: { id: string }[];
}

export interface UseSelectionStateReturn {
  selectedIds: string[];
  selectAll: boolean;
  handleSelectItem: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  clearSelection: () => void;
}

export function useSelectionState({ items }: UseSelectionStateOptions): UseSelectionStateReturn {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectAll = items.length > 0 && selectedIds.length === items.length;

  const handleSelectItem = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(checked ? items.map((item) => item.id) : []);
    },
    [items]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    selectedIds,
    selectAll,
    handleSelectItem,
    handleSelectAll,
    clearSelection,
  };
}

// ============================================
// useConfirmDialog Hook
// ============================================

export interface UseConfirmDialogReturn {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  confirm: (onConfirm: () => void) => void;
  executeConfirm: () => void;
}

export function useConfirmDialog(): UseConfirmDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const openDialog = useCallback(() => setIsOpen(true), []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const confirm = useCallback((onConfirm: () => void) => {
    setPendingAction(() => onConfirm);
    setIsOpen(true);
  }, []);

  const executeConfirm = useCallback(() => {
    if (pendingAction) {
      pendingAction();
    }
    closeDialog();
  }, [pendingAction, closeDialog]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    confirm,
    executeConfirm,
  };
}
