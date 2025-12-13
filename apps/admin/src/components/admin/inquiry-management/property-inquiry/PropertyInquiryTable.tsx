import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Inquiry } from "@/data/inquiry-data";
import { cn } from "@/lib/utils";
import { GripVertical, MoreVertical } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { PropertyInquiryDetailModal } from "./PropertyInquiryDetailModal";

interface ColumnDef {
  key: string;
  label: string;
  width: string;
  align: "left" | "center" | "right";
}

const defaultColumns: ColumnDef[] = [
  {
    key: "date",
    label: "問い合わせ日時",
    width: "w-52",
    align: "left",
  },
  {
    key: "inquirer",
    label: "氏名",
    width: "w-40",
    align: "left",
  },
  {
    key: "email",
    label: "メールアドレス",
    width: "w-64",
    align: "left",
  },
  {
    key: "property",
    label: "問い合わせ物件",
    width: "w-80",
    align: "left",
  },
];

interface PropertyInquiryTableProps {
  inquiries: Inquiry[];
  selectedInquiries: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectInquiry: (inquiryId: string, checked: boolean) => void;
}

export const PropertyInquiryTable: React.FC<PropertyInquiryTableProps> = ({
  inquiries,
  selectedInquiries,
  selectAll,
  onSelectAll,
  onSelectInquiry,
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(null);

  const handleDetailClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  // ドラッグ開始
  const handleDragStart = (index: number) => {
    setDraggedColumnIndex(index);
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedColumnIndex === null) return;
    if (draggedColumnIndex === index) return;
    setDragOverColumnIndex(index);
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
    setDraggedColumnIndex(null);
    setDragOverColumnIndex(null);
  };

  // セル内容のレンダリング
  const renderCellContent = (column: ColumnDef, inquiry: Inquiry) => {
    switch (column.key) {
      case "date":
        return <span className="font-mono text-sm">{inquiry.date}</span>;
      case "inquirer":
        return <span className="font-medium">{inquiry.inquirer}</span>;
      case "email":
        return <span className="text-sm">{inquiry.email}</span>;
      case "property":
        return (
          <span className="truncate" title={inquiry.property}>
            {inquiry.property}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full bg-white rounded-lg border flex-1 overflow-auto max-h-[calc(100vh-24rem)]">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="h-12 hover:bg-transparent bg-gray-50 border-b">
            <TableHead className="w-16 text-center text-[#0e0e10] dark:text-white font-medium">
              <Checkbox checked={selectAll} onCheckedChange={onSelectAll} />
            </TableHead>
            {columns.map((column, index) => {
              const isDragOver = dragOverColumnIndex === index;
              return (
                <TableHead
                  key={column.key}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragLeave={() => setDragOverColumnIndex(null)}
                  className={cn(
                    column.width,
                    "text-[#0e0e10] dark:text-white font-medium cursor-move relative",
                    isDragOver && "bg-blue-100"
                  )}
                  style={{ textAlign: column.align }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{
                      justifyContent:
                        column.align === "center"
                          ? "center"
                          : column.align === "right"
                            ? "flex-end"
                            : "flex-start",
                    }}
                  >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span>{column.label}</span>
                  </div>
                </TableHead>
              );
            })}
            <TableHead className="w-20 text-right text-[#0e0e10] dark:text-white font-medium" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="h-14">
              <TableCell className="w-16 text-center">
                <Checkbox
                  checked={selectedInquiries.includes(inquiry.id)}
                  onCheckedChange={(checked: boolean) => onSelectInquiry(inquiry.id, checked)}
                />
              </TableCell>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.key}
                    className={cn(column.width)}
                    style={{ textAlign: column.align }}
                  >
                    {renderCellContent(column, inquiry)}
                  </TableCell>
                );
              })}
              <TableCell className="w-20 text-right">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDetailClick(inquiry)}>
                        詳細
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 詳細モーダル */}
      <PropertyInquiryDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        inquiry={selectedInquiry}
      />
    </div>
  );
};
