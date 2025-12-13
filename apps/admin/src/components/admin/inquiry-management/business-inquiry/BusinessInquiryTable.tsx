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
import { GripVertical, MoreVertical } from "lucide-react";
import React from "react";

interface BusinessInquiry {
  id: string;
  date: string;
  companyName: string;
  contactPerson: string;
  inquiryType: string;
  email: string;
  status: string;
}

interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "center" | "right";
}

const defaultColumns: ColumnDef[] = [
  {
    key: "date",
    label: "問い合わせ日時",
    align: "left",
  },
  {
    key: "companyName",
    label: "会社名",
    align: "left",
  },
  {
    key: "contactPerson",
    label: "担当者名",
    align: "left",
  },
  {
    key: "inquiryType",
    label: "問い合わせ種別",
    align: "left",
  },
  {
    key: "email",
    label: "メールアドレス",
    align: "left",
  },
  {
    key: "status",
    label: "ステータス",
    align: "left",
  },
];

interface BusinessInquiryTableProps {
  inquiries: BusinessInquiry[];
  selectedInquiries: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectInquiry: (inquiryId: string, checked: boolean) => void;
}

export const BusinessInquiryTable: React.FC<BusinessInquiryTableProps> = ({
  inquiries,
  selectedInquiries,
  selectAll,
  onSelectAll,
  onSelectInquiry,
}) => {
  const [columns, setColumns] = React.useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = React.useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = React.useState<number | null>(null);

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
  const renderCellContent = (column: ColumnDef, inquiry: BusinessInquiry) => {
    switch (column.key) {
      case "date":
        return <span className="font-mono text-sm">{inquiry.date}</span>;
      case "companyName":
        return <span className="font-medium">{inquiry.companyName}</span>;
      case "contactPerson":
        return <span>{inquiry.contactPerson}</span>;
      case "inquiryType":
        return <span>{inquiry.inquiryType}</span>;
      case "email":
        return <span className="text-sm">{inquiry.email}</span>;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              inquiry.status === "完了"
                ? "bg-green-100 text-green-800"
                : inquiry.status === "対応中"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {inquiry.status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full bg-white rounded-lg border flex-1 overflow-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h-12 hover:bg-transparent bg-gray-50 border-b">
            <TableHead className="w-12 text-center text-[#0e0e10] dark:text-white font-medium">
              <Checkbox checked={selectAll} onCheckedChange={onSelectAll} />
            </TableHead>
            {columns.map((column, index) => {
              const isDragOver = dragOverColumnIndex === index;
              const alignClass =
                column.align === "center"
                  ? "text-center"
                  : column.align === "right"
                    ? "text-right"
                    : "text-left";
              return (
                <TableHead
                  key={column.key}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragLeave={() => setDragOverColumnIndex(null)}
                  className={`${alignClass} text-[#0e0e10] dark:text-white font-medium cursor-move relative ${
                    isDragOver ? "bg-blue-100" : ""
                  }`}
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
            <TableHead className="text-right text-[#0e0e10] dark:text-white font-medium" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="h-14">
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedInquiries.includes(inquiry.id)}
                  onCheckedChange={(checked: boolean) => onSelectInquiry(inquiry.id, checked)}
                />
              </TableCell>
              {columns.map((column) => {
                const alignClass =
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                      ? "text-right"
                      : "text-left";
                return (
                  <TableCell key={column.key} className={alignClass}>
                    {renderCellContent(column, inquiry)}
                  </TableCell>
                );
              })}
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>詳細</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
