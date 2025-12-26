"use client";

import { useCallback, useEffect, useState } from "react";

// ============================================
// 型定義
// ============================================

/**
 * 列定義の基本形
 */
export interface ColumnDef<T> {
  key: string;
  label: string;
  align: "left" | "center";
  visible: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

/**
 * useDataTable のオプション
 */
export interface UseDataTableOptions<T> {
  data: T[];
  defaultColumns: ColumnDef<T>[];
  externalColumns?: ColumnDef<T>[];
  onColumnsChange?: (columns: ColumnDef<T>[]) => void;
  onToggleColumnVisibility?: (columnKey: string) => void;
  defaultItemsPerPage?: number;
}

/**
 * useDataTable の戻り値
 */
export interface UseDataTableReturn<T> {
  // ページネーション
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  currentData: T[];

  // カラム管理
  columns: ColumnDef<T>[];
  visibleColumns: ColumnDef<T>[];
  toggleColumnVisibility: (columnKey: string) => void;

  // ドラッグ&ドロップ
  draggedColumnIndex: number | null;
  dragOverColumnIndex: number | null;
  handleDragStart: (visibleIndex: number) => void;
  handleDragOver: (e: React.DragEvent, visibleIndex: number) => void;
  handleDragEnd: () => void;
  handleDragLeave: () => void;
}

// ============================================
// useDataTable Hook
// ============================================

export function useDataTable<T>({
  data,
  defaultColumns,
  externalColumns,
  onColumnsChange,
  onToggleColumnVisibility,
  defaultItemsPerPage = 10,
}: UseDataTableOptions<T>): UseDataTableReturn<T> {
  // ページネーション状態
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // カラム状態
  const [columns, setColumns] = useState<ColumnDef<T>[]>(defaultColumns);

  // ドラッグ&ドロップ状態
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(
    null,
  );
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(
    null,
  );

  // 外部からのカラム設定を反映
  useEffect(() => {
    if (externalColumns && externalColumns.length > 0) {
      const updatedColumns = defaultColumns.map((defaultCol) => {
        const extCol = externalColumns.find(
          (col) => col.key === defaultCol.key,
        );
        return extCol ? { ...defaultCol, visible: extCol.visible } : defaultCol;
      });
      setColumns(updatedColumns);
    } else if (!externalColumns) {
      setColumns(defaultColumns);
    }
  }, [externalColumns, defaultColumns]);

  // 画面サイズに応じて表示件数を変更
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) {
        setItemsPerPage(20);
      } else if (window.innerWidth >= 1280) {
        setItemsPerPage(15);
      } else {
        setItemsPerPage(defaultItemsPerPage);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [defaultItemsPerPage]);

  // 表示件数が変更されたときに現在のページをリセット
  useEffect(() => {
    // itemsPerPageの変更をトリガーとしてページをリセット
    void itemsPerPage;
    setCurrentPage(1);
  }, [itemsPerPage]);

  // ページネーション計算
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  // 表示列のフィルタ
  const visibleColumns = columns.filter((col) => col.visible);

  // 列の表示/非表示を切り替え
  const toggleColumnVisibility = useCallback(
    (columnKey: string) => {
      setColumns((prev) => {
        const newColumns = prev.map((col) =>
          col.key === columnKey ? { ...col, visible: !col.visible } : col,
        );

        // 次のレンダリングサイクルで親に通知
        setTimeout(() => {
          if (onColumnsChange) {
            onColumnsChange(
              newColumns.map((col) => ({
                key: col.key,
                label: col.label,
                visible: col.visible,
                align: col.align,
              })),
            );
          }
        }, 0);

        return newColumns;
      });

      onToggleColumnVisibility?.(columnKey);
    },
    [onColumnsChange, onToggleColumnVisibility],
  );

  // ドラッグ開始
  const handleDragStart = useCallback(
    (visibleIndex: number) => {
      const column = visibleColumns[visibleIndex];
      const originalIndex = columns.findIndex((col) => col.key === column.key);
      setDraggedColumnIndex(originalIndex);
    },
    [columns, visibleColumns],
  );

  // ドラッグオーバー
  const handleDragOver = useCallback(
    (e: React.DragEvent, visibleIndex: number) => {
      e.preventDefault();
      if (draggedColumnIndex === null) return;

      const column = visibleColumns[visibleIndex];
      const originalIndex = columns.findIndex((col) => col.key === column.key);

      if (draggedColumnIndex === originalIndex) return;
      setDragOverColumnIndex(originalIndex);
    },
    [draggedColumnIndex, columns, visibleColumns],
  );

  // ドラッグ終了
  const handleDragEnd = useCallback(() => {
    if (draggedColumnIndex === null || dragOverColumnIndex === null) {
      setDraggedColumnIndex(null);
      setDragOverColumnIndex(null);
      return;
    }

    const newColumns = [...columns];
    const [draggedColumn] = newColumns.splice(draggedColumnIndex, 1);
    newColumns.splice(dragOverColumnIndex, 0, draggedColumn);

    setColumns(newColumns);

    onColumnsChange?.(
      newColumns.map((col) => ({
        key: col.key,
        label: col.label,
        visible: col.visible,
        align: col.align,
      })),
    );

    setDraggedColumnIndex(null);
    setDragOverColumnIndex(null);
  }, [draggedColumnIndex, dragOverColumnIndex, columns, onColumnsChange]);

  // ドラッグ離脱
  const handleDragLeave = useCallback(() => {
    setDragOverColumnIndex(null);
  }, []);

  return {
    // ページネーション
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    currentData,

    // カラム管理
    columns,
    visibleColumns,
    toggleColumnVisibility,

    // ドラッグ&ドロップ
    draggedColumnIndex,
    dragOverColumnIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  };
}

// ============================================
// ユーティリティ関数
// ============================================

/**
 * 日付文字列をフォーマット
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return dateString;
    }
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
  } catch {
    return dateString;
  }
}
