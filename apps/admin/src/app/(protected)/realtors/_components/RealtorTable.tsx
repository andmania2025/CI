import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, GripVertical, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface Realtor {
  id: string;
  title: string;
  representativeName?: string;
  contactPerson?: string;
  publicationStatus: string;
  updateDate: string;
  nextUpdateDate: string;
  inquiryCount: number;
  actions: string;
  accountType?: "paid" | "free"; // 有料または無料
}

interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "center";
  visible: boolean;
}

const defaultColumns: ColumnDef[] = [
  {
    key: "title",
    label: "会社名",
    align: "left",
    visible: true,
  },
  {
    key: "representativeName",
    label: "代表者名",
    align: "center",
    visible: true,
  },
  {
    key: "contactPerson",
    label: "担当者名",
    align: "center",
    visible: true,
  },
  {
    key: "accountType",
    label: "アカウント種別",
    align: "center",
    visible: true,
  },
  {
    key: "publicationStatus",
    label: "状態",
    align: "center",
    visible: true,
  },
  {
    key: "updateDate",
    label: "登録日",
    align: "center",
    visible: true,
  },
  {
    key: "nextUpdateDate",
    label: "最終ログイン",
    align: "center",
    visible: true,
  },
  {
    key: "inquiryCount",
    label: "物件数",
    align: "center",
    visible: true,
  },
];

interface RealtorTableProps {
  realtors: Realtor[];
  selectedRealtors: string[];
  selectAll: boolean;
  onSelectRealtor: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onDuplicateRealtor?: (realtorId: string) => void;
  onColumnsChange?: (columns: ColumnDef[]) => void;
  onToggleColumnVisibility?: (columnKey: string) => void;
  initialColumns?: ColumnDef[];
}

export const RealtorTable = ({
  realtors,
  selectedRealtors,
  selectAll,
  onSelectRealtor,
  onSelectAll,
  onDuplicateRealtor,
  onColumnsChange,
  onToggleColumnVisibility,
  initialColumns: externalColumns,
}: RealtorTableProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columns, setColumns] = useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(null);

  // 外部から渡されたcolumnsが変更されたら更新
  useEffect(() => {
    if (externalColumns && externalColumns.length > 0) {
      setColumns((prev) => {
        const sourceColumns = prev.length > 0 ? prev : defaultColumns;
        return externalColumns.map((extCol) => {
          const existingCol = sourceColumns.find((col) => col.key === extCol.key);
          if (existingCol) {
            return { ...existingCol, visible: extCol.visible };
          }
          const defaultCol = defaultColumns.find((col) => col.key === extCol.key);
          return defaultCol
            ? { ...defaultCol, visible: extCol.visible }
            : { ...extCol, align: "left" };
        });
      });
    } else if (!externalColumns) {
      setColumns(defaultColumns);
    }
  }, [externalColumns]);

  // 画面サイズに応じて表示件数を変更
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) {
        // 2xl以上
        setItemsPerPage(20);
      } else if (window.innerWidth >= 1280) {
        // xl以上
        setItemsPerPage(15);
      } else {
        setItemsPerPage(10);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 表示件数が変更されたときに現在のページをリセット
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // 詳細ページへのナビゲーション
  const handleViewDetail = (realtorId: string) => {
    router.push(`/realtors/${realtorId}`);
  };

  // 業者複製処理
  const handleDuplicateRealtor = (realtorId: string) => {
    if (onDuplicateRealtor) {
      onDuplicateRealtor(realtorId);
    }
  };

  // ページネーション計算
  const totalPages = Math.ceil(realtors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRealtors = realtors.slice(startIndex, endIndex);

  // ユーティリティ関数
  const formatDate = (dateString: string) => {
    try {
      // すでに "YYYY/MM/DD" 形式の場合はそのまま返す
      if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) {
        return dateString;
      }

      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) {
        return dateString; // 無効な日付の場合は元の文字列を返す
      }
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(date.getDate()).padStart(2, "0")}`;
    } catch (_error) {
      return dateString; // エラーの場合は元の文字列を返す
    }
  };

  const truncateTitle = (title: string, maxLength = 30) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  // 列の表示/非表示を切り替え
  const toggleColumnVisibility = (columnKey: string) => {
    setColumns((prev) => {
      const newColumns = prev.map((col) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      );
      // visibleプロパティとalignプロパティを親に通知
      onColumnsChange?.(
        newColumns.map((col) => ({
          key: col.key,
          label: col.label,
          visible: col.visible,
          align: col.align,
        }))
      );
      return newColumns;
    });
    onToggleColumnVisibility?.(columnKey);
  };

  // 表示する列のみをフィルタ
  const visibleColumns = columns.filter((col) => col.visible);

  // ドラッグ開始（visibleColumnsのインデックスから元のcolumnsのインデックスを取得）
  const handleDragStart = (visibleIndex: number) => {
    const column = visibleColumns[visibleIndex];
    const originalIndex = columns.findIndex((col) => col.key === column.key);
    setDraggedColumnIndex(originalIndex);
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, visibleIndex: number) => {
    e.preventDefault();
    if (draggedColumnIndex === null) return;

    const column = visibleColumns[visibleIndex];
    const originalIndex = columns.findIndex((col) => col.key === column.key);

    if (draggedColumnIndex === originalIndex) return;
    setDragOverColumnIndex(originalIndex);
  };

  // ドラッグ終了
  const handleDragEnd = () => {
    if (draggedColumnIndex === null || dragOverColumnIndex === null) {
      setDraggedColumnIndex(null);
      setDragOverColumnIndex(null);
      return;
    }

    const newColumns = [...columns];
    const [draggedColumn] = newColumns.splice(draggedColumnIndex, 1);
    newColumns.splice(dragOverColumnIndex, 0, draggedColumn);

    setColumns(newColumns);
    // visibleプロパティとalignプロパティを親に通知
    onColumnsChange?.(
      newColumns.map((col) => ({
        key: col.key,
        label: col.label,
        visible: col.visible,
        align: col.align,
      }))
    );
    setDraggedColumnIndex(null);
    setDragOverColumnIndex(null);
  };

  return (
    <div className="space-y-4 h-full max-h-screen flex flex-col overflow-hidden">
      {/* ページネーション情報 */}
      <div className="flex items-center justify-between w-full px-0 flex-shrink-0">
        {/* 左端：表示件数情報 */}
        <div className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
          {realtors.length}件中 {startIndex + 1}-{Math.min(endIndex, realtors.length)}件を表示
        </div>

        {/* 右端：列の表示設定 + ページネーション */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {columns.length > 0 && onToggleColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-8">
                  列の表示設定
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={column.visible}
                    onCheckedChange={() => toggleColumnVisibility(column.key)}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {totalPages > 1 && (
            <Pagination className="m-0">
              <PaginationContent className="flex items-center gap-2 m-0">
                {/* 前へボタン */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-16"
                  >
                    前へ
                  </Button>
                </PaginationItem>

                {/* ページ番号 */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                {/* 次へボタン */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-16"
                  >
                    次へ
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      {/* テーブル */}
      <div className="border border-gray-200 rounded-lg flex-1 min-h-0 overflow-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              <TableHead className="w-[4%] text-center font-semibold text-gray-700 py-2 bg-gray-50">
                <Checkbox checked={selectAll} onCheckedChange={onSelectAll} />
              </TableHead>
              {visibleColumns.map((column, visibleIndex) => {
                const originalIndex = columns.findIndex((col) => col.key === column.key);
                const isDragOver = dragOverColumnIndex === originalIndex;

                return (
                  <TableHead
                    key={column.key}
                    draggable
                    onDragStart={() => handleDragStart(visibleIndex)}
                    onDragOver={(e) => handleDragOver(e, visibleIndex)}
                    onDragEnd={handleDragEnd}
                    onDragLeave={() => setDragOverColumnIndex(null)}
                    className={`${column.align === "center" ? "text-center" : "text-left"} font-semibold text-gray-700 py-2 bg-gray-50 cursor-move relative ${
                      isDragOver ? "bg-blue-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <span>{column.label}</span>
                    </div>
                  </TableHead>
                );
              })}
              <TableHead className="w-[5%] text-center font-semibold text-gray-700 py-2 bg-gray-50" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRealtors.map((realtor, index) => (
              <TableRow
                key={`realtor-${realtor.id}-${index}`}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="text-center py-2">
                  <Checkbox
                    checked={selectedRealtors.includes(realtor.id)}
                    onCheckedChange={() => onSelectRealtor(realtor.id)}
                  />
                </TableCell>
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`${column.align === "center" ? "text-center" : "text-left"} text-gray-600 py-2 px-2`}
                  >
                    {column.key === "title" && (
                      <div className="truncate" title={realtor.title}>
                        {truncateTitle(realtor.title)}
                      </div>
                    )}
                    {column.key === "representativeName" && (realtor.representativeName || "-")}
                    {column.key === "contactPerson" && (realtor.contactPerson || "-")}
                    {column.key === "accountType" && (
                      <div className="flex justify-center">
                        <Badge variant={realtor.accountType === "paid" ? "success" : "neutral"}>
                          {realtor.accountType === "paid"
                            ? "有料"
                            : realtor.accountType === "free"
                              ? "無料"
                              : "-"}
                        </Badge>
                      </div>
                    )}
                    {column.key === "publicationStatus" && (
                      <div className="flex justify-center">
                        <Badge
                          variant={
                            (realtor.publicationStatus === "有効"
                              ? "success"
                              : realtor.publicationStatus === "無効"
                                ? "error"
                                : "neutral") as "success" | "error" | "neutral"
                          }
                        >
                          {String(realtor.publicationStatus)}
                        </Badge>
                      </div>
                    )}
                    {column.key === "updateDate" && formatDate(realtor.updateDate)}
                    {column.key === "nextUpdateDate" && formatDate(realtor.nextUpdateDate)}
                    {column.key === "inquiryCount" && (
                      <div className="flex justify-center">
                        <Badge variant="info">{Number(realtor.inquiryCount)}件</Badge>
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-center py-2">
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(realtor.id)}>
                          詳細
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateRealtor(realtor.id)}>
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
