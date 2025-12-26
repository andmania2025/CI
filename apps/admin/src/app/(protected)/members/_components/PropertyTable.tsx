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
import type React from "react";
import { useEffect, useState } from "react";
import { MemberEditModal } from "./MemberEditModal";

import type { Member } from "./types";

// 列定義
interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "center";
  visible: boolean;
  render: (member: Member) => React.ReactNode;
}

const defaultColumns: ColumnDef[] = [
  {
    key: "name",
    label: "氏名",
    align: "left",
    visible: true,
    render: (member) => member.name || "-",
  },
  {
    key: "phone",
    label: "電話番号",
    align: "center",
    visible: true,
    render: (member) => member.phone || "-",
  },
  {
    key: "gender",
    label: "性別",
    align: "center",
    visible: true,
    render: (member) => {
      switch (member.gender) {
        case "male":
          return "男性";
        case "female":
          return "女性";
        case "other":
          return "その他";
        default:
          return "-";
      }
    },
  },
  {
    key: "fax",
    label: "FAX番号",
    align: "center",
    visible: true,
    render: (member) => member.fax || "-",
  },
  {
    key: "dateOfBirth",
    label: "生年月日",
    align: "center",
    visible: true,
    render: (member) => {
      if (!member.dateOfBirth) return "-";
      try {
        const date = new Date(member.dateOfBirth);
        if (Number.isNaN(date.getTime())) return member.dateOfBirth;
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
      } catch {
        return member.dateOfBirth;
      }
    },
  },
  {
    key: "postalCode",
    label: "郵便番号",
    align: "center",
    visible: true,
    render: (member) => member.postalCode || "-",
  },
  {
    key: "email",
    label: "メールアドレス",
    align: "left",
    visible: true,
    render: (member) => member.email || "-",
  },
  {
    key: "address",
    label: "住所",
    align: "left",
    visible: true,
    render: (member) => member.address || "-",
  },
  {
    key: "accountStatus",
    label: "アカウント状態",
    align: "center",
    visible: true,
    render: (member) => {
      const status =
        member.accountStatus === "active"
          ? "有効"
          : member.accountStatus === "cancelled"
            ? "退会"
            : member.accountStatus === "invalid"
              ? "無効"
              : "-";
      return (
        <Badge
          variant={
            member.accountStatus === "active"
              ? "success"
              : member.accountStatus === "cancelled"
                ? "neutral"
                : "error"
          }
        >
          {status}
        </Badge>
      );
    },
  },
];

interface PropertyTableProps {
  properties: Member[];
  selectedProperties: string[];
  selectAll: boolean;
  onSelectProperty: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onColumnsChange?: (columns: ColumnDef[]) => void;
  onToggleColumnVisibility?: (columnKey: string) => void;
  initialColumns?: ColumnDef[];
}

export const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  selectedProperties,
  selectAll,
  onSelectProperty,
  onSelectAll,
  onColumnsChange,
  onToggleColumnVisibility,
  initialColumns: externalColumns,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(null);

  // 外部から渡されたcolumnsが変更されたら更新（render関数をマージ）
  useEffect(() => {
    if (externalColumns && externalColumns.length > 0) {
      setColumns((prev) => {
        // 既存のcolumnsが空の場合は、defaultColumnsを使用
        const sourceColumns = prev.length > 0 ? prev : defaultColumns;

        return externalColumns.map((extCol) => {
          const existingCol = sourceColumns.find((col) => col.key === extCol.key);
          if (existingCol) {
            // 既存の列のrender関数とalignを保持し、visibleのみ更新
            return { ...existingCol, visible: extCol.visible };
          }
          // 見つからない場合はdefaultColumnsから取得
          const defaultCol = defaultColumns.find((col) => col.key === extCol.key);
          return defaultCol
            ? { ...defaultCol, visible: extCol.visible }
            : { ...extCol, render: () => "-", align: "left" };
        });
      });
    } else if (!externalColumns) {
      // externalColumnsが未定義の場合はdefaultColumnsを使用
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

  // 編集モーダルを開く
  const handleEdit = (propertyId: string) => {
    setSelectedMemberId(propertyId);
    setIsEditModalOpen(true);
  };

  // 編集完了後の処理
  const handleEditSuccess = () => {
    // TODO: データを再取得する処理を追加
    setIsEditModalOpen(false);
    setSelectedMemberId(null);
  };

  // ページネーション計算
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  // 列の表示/非表示を切り替え
  const toggleColumnVisibility = (columnKey: string) => {
    setColumns((prev) => {
      const newColumns = prev.map((col) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      );
      // visibleプロパティのみを親に通知
      onColumnsChange?.(
        newColumns.map((col) => ({
          key: col.key,
          label: col.label,
          visible: col.visible,
          align: col.align,
          render: col.render,
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
    // visibleプロパティのみを親に通知
    onColumnsChange?.(
      newColumns.map((col) => ({
        key: col.key,
        label: col.label,
        visible: col.visible,
        align: col.align,
        render: col.render,
      }))
    );
    setDraggedColumnIndex(null);
    setDragOverColumnIndex(null);
  };

  return (
    <div className="space-y-4 h-full max-h-screen flex flex-col overflow-hidden">
      {/* ページネーション情報 */}
      <div className="flex items-center justify-between w-full px-0 shrink-0">
        {/* 左端：表示件数情報 */}
        <div className="text-sm text-gray-500 whitespace-nowrap shrink-0">
          {properties.length}件中 {startIndex + 1}-{Math.min(endIndex, properties.length)}件を表示
        </div>

        {/* 右端：列の表示設定 + ページネーション */}
        <div className="flex items-center gap-2 shrink-0">
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
          {totalPages > 0 && (
            <Pagination className="m-0">
              <PaginationContent className="flex items-center gap-2 m-0">
                {/* 前へボタン */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || totalPages <= 1}
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
                    disabled={currentPage === totalPages || totalPages <= 1}
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
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              <TableHead className="w-12 text-center font-semibold text-gray-700 py-2 bg-gray-50">
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
              <TableHead className="w-16 text-center font-semibold text-gray-700 py-2 bg-gray-50" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProperties.map((member, index) => (
              <TableRow
                key={`member-${member.id}-${index}`}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="text-center py-2">
                  <Checkbox
                    checked={selectedProperties.includes(member.id)}
                    onCheckedChange={() => onSelectProperty(member.id)}
                  />
                </TableCell>
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`${column.align === "center" ? "text-center" : "text-left"} text-gray-600 py-2`}
                  >
                    {column.render(member)}
                  </TableCell>
                ))}
                <TableCell className="text-center py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(member.id)}>
                        編集
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 編集モーダル */}
      <MemberEditModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        memberId={selectedMemberId}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};
