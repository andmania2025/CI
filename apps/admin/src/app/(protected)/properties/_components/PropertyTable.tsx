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

interface Property {
  id: string;
  title: string;
  publicationStatus: string;
  updateDate: string;
  nextUpdateDate: string;
  inquiryCount: number;
  actions: string;
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
    label: "物件名",
    align: "left",
    visible: true,
  },
  {
    key: "publicationStatus",
    label: "掲載状況",
    align: "center",
    visible: true,
  },
  {
    key: "updateDate",
    label: "更新日",
    align: "center",
    visible: true,
  },
  {
    key: "nextUpdateDate",
    label: "次回更新予定日",
    align: "center",
    visible: true,
  },
  {
    key: "inquiryCount",
    label: "問い合わせ回数",
    align: "center",
    visible: true,
  },
];

// 列幅を設定する共通関数（ヘッダーとコンテンツで統一）
// table-fixedを使用する場合、パーセンテージベースで指定することで、ヘッダーとコンテンツの列幅を完全に一致させる
const getWidthClass = (key: string): string => {
  switch (key) {
    case "title":
      return "w-[40%]";
    case "publicationStatus":
      return "w-[10%]";
    case "updateDate":
      return "w-[12%]";
    case "nextUpdateDate":
      return "w-[15%]";
    case "inquiryCount":
      return "w-[12%]";
    default:
      return "";
  }
};

interface PropertyTableProps {
  properties: Property[];
  selectedProperties: string[];
  selectAll: boolean;
  onSelectProperty: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onDuplicateProperty?: (propertyId: string) => void;
  onColumnsChange?: (columns: ColumnDef[]) => void;
  onToggleColumnVisibility?: (columnKey: string) => void;
  initialColumns?: ColumnDef[];
}

export const PropertyTable = ({
  properties,
  selectedProperties,
  selectAll,
  onSelectProperty,
  onSelectAll,
  onDuplicateProperty,
  onColumnsChange,
  onToggleColumnVisibility,
  initialColumns: externalColumns,
}: PropertyTableProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columns, setColumns] = useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(null);

  // 外部から渡されたcolumnsが変更されたら更新
  useEffect(() => {
    if (externalColumns && externalColumns.length > 0) {
      // externalColumnsに基づいて、defaultColumnsから完全な列定義を取得
      const updatedColumns = defaultColumns.map((defaultCol) => {
        const extCol = externalColumns.find((col) => col.key === defaultCol.key);
        if (extCol) {
          // externalColumnsに存在する場合は、visible状態を更新
          return { ...defaultCol, visible: extCol.visible };
        }
        // externalColumnsに存在しない場合は、defaultColumnsの設定を維持
        return defaultCol;
      });
      // 内部状態のみを更新（親への通知は行わない）
      setColumns(updatedColumns);
    } else if (!externalColumns) {
      // 内部状態のみを更新（親への通知は行わない）
      setColumns(defaultColumns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handleViewDetail = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  // 物件複製処理
  const handleDuplicateProperty = (propertyId: string) => {
    if (onDuplicateProperty) {
      onDuplicateProperty(propertyId);
    }
  };

  // ページネーション計算
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  // ユーティリティ関数
  const formatDate = (dateString: string) => {
    try {
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

  const truncateTitle = (title: string, maxLength = 25) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  // 列の表示/非表示を切り替え
  const toggleColumnVisibility = (columnKey: string) => {
    setColumns((prev) => {
      const newColumns = prev.map((col) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      );
      // 次のレンダリングサイクルで親に通知（レンダリング中ではない）
      setTimeout(() => {
        if (onColumnsChange) {
          onColumnsChange(
            newColumns.map((col) => ({
              key: col.key,
              label: col.label,
              visible: col.visible,
              align: col.align,
            }))
          );
        }
      }, 0);
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
          {properties.length}件中 {startIndex + 1}-{Math.min(endIndex, properties.length)}件を表示
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
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="h-10 border-b border-gray-200 bg-gray-50">
              <TableHead className="w-[3%] px-2 py-0 text-center font-semibold text-gray-700 bg-gray-50">
                <div className="flex items-center justify-center h-full">
                  <Checkbox checked={selectAll} onCheckedChange={onSelectAll} />
                </div>
              </TableHead>
              {visibleColumns.map((column, visibleIndex) => {
                const originalIndex = columns.findIndex((col) => col.key === column.key);
                const isDragOver = dragOverColumnIndex === originalIndex;
                const widthClass = getWidthClass(column.key);
                const textAlign = column.align === "center" ? "text-center" : "text-left";
                const justifyClass = column.align === "center" ? "justify-center" : "justify-start";

                // shadcnの標準的なアプローチ：最小限のクラスでデフォルトスタイルを活用
                // TableHeadのデフォルトpx-2にpy-0を追加して、TableCellと完全に統一
                return (
                  <TableHead
                    key={column.key}
                    draggable
                    onDragStart={() => handleDragStart(visibleIndex)}
                    onDragOver={(e) => handleDragOver(e, visibleIndex)}
                    onDragEnd={handleDragEnd}
                    onDragLeave={() => setDragOverColumnIndex(null)}
                    className={`${widthClass} px-2 py-0 ${textAlign} font-semibold text-gray-700 bg-gray-50 cursor-move relative ${
                      isDragOver ? "bg-blue-100" : ""
                    }`}
                  >
                    <div className={`flex items-center ${justifyClass} h-full gap-2`}>
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <span>{column.label}</span>
                    </div>
                  </TableHead>
                );
              })}
              <TableHead className="w-[8%] px-2 py-0 text-center font-semibold text-gray-700 bg-gray-50">
                <div className="flex items-center justify-center h-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProperties.map((property, index) => (
              <TableRow
                key={`property-${property.id}-${index}`}
                className="h-10 border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="w-[3%] px-2 py-0 text-center">
                  <div className="flex items-center justify-center h-full">
                    <Checkbox
                      checked={selectedProperties.includes(property.id)}
                      onCheckedChange={() => onSelectProperty(property.id)}
                    />
                  </div>
                </TableCell>
                {visibleColumns.map((column) => {
                  const widthClass = getWidthClass(column.key);
                  let cellContent: React.ReactNode = null;

                  switch (column.key) {
                    case "title":
                      cellContent = (
                        <span title={property.title} className="truncate block">
                          {truncateTitle(property.title || "")}
                        </span>
                      );
                      break;
                    case "publicationStatus":
                      cellContent = (
                        <Badge
                          variant={
                            (property.publicationStatus === "公開" ? "success" : "neutral") as
                              | "success"
                              | "neutral"
                          }
                        >
                          {String(property.publicationStatus || "")}
                        </Badge>
                      );
                      break;
                    case "updateDate":
                      cellContent = property.updateDate ? formatDate(property.updateDate) : "-";
                      break;
                    case "nextUpdateDate":
                      cellContent = property.nextUpdateDate
                        ? formatDate(property.nextUpdateDate)
                        : "-";
                      break;
                    case "inquiryCount":
                      cellContent = (
                        <Badge variant="info">{Number(property.inquiryCount) || 0}回</Badge>
                      );
                      break;
                    default:
                      cellContent = null;
                  }

                  // 配置を統一（column.alignに基づく）
                  const textAlign = column.align === "center" ? "text-center" : "text-left";
                  const justifyClass =
                    column.align === "center" ? "justify-center" : "justify-start";

                  // shadcnの標準的なアプローチ：最小限のクラスでデフォルトスタイルを活用
                  // セルの配置は、cell内のコンテンツで制御
                  // TableCellのデフォルトp-2をpx-2に上書きして、TableHeadと完全に統一
                  return (
                    <TableCell
                      key={column.key}
                      className={`${widthClass} px-2 py-0 ${textAlign} text-gray-600`}
                    >
                      <div className={`flex items-center ${justifyClass} h-full`}>
                        {cellContent}
                      </div>
                    </TableCell>
                  );
                })}
                <TableCell className="w-[8%] px-2 py-0 text-center">
                  <div className="flex items-center justify-center h-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(property.id)}>
                          詳細
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateProperty(property.id)}>
                          複製
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
