import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BulkAssessment } from "@/data/inquiry-data";
import { GripVertical, MoreVertical } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { BulkAssessmentDetailModal } from "./BulkAssessmentDetailModal";

interface ColumnDef {
  key: string;
  label: string;
  width: string;
  align: "left" | "center" | "right";
}

const defaultColumns: ColumnDef[] = [
  {
    key: "date",
    label: "申請日時",
    width: "w-48",
    align: "center",
  },
  {
    key: "propertyAddress",
    label: "物件住所",
    width: "w-80",
    align: "center",
  },
  {
    key: "ownerName",
    label: "所有者名",
    width: "w-36",
    align: "center",
  },
  {
    key: "email",
    label: "メールアドレス",
    width: "w-56",
    align: "center",
  },
  {
    key: "status",
    label: "ステータス",
    width: "w-28",
    align: "center",
  },
];

interface BulkAssessmentTableProps {
  assessments: BulkAssessment[];
  selectedAssessments: string[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
}

export const BulkAssessmentTable: React.FC<BulkAssessmentTableProps> = ({
  assessments,
  selectedAssessments,
  selectAll,
  onSelectAll,
  onSelectAssessment,
}) => {
  const [selectedAssessment, setSelectedAssessment] = useState<BulkAssessment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[]>(defaultColumns);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null);
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<number | null>(null);

  const handleDetailClick = (assessment: BulkAssessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssessment(null);
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
  const renderCellContent = (column: ColumnDef, assessment: BulkAssessment) => {
    switch (column.key) {
      case "date":
        return <span className="font-mono text-sm">{assessment.date}</span>;
      case "propertyAddress":
        return (
          <span className="truncate" title={assessment.propertyAddress}>
            {assessment.propertyAddress}
          </span>
        );
      case "ownerName":
        return <span className="font-medium">{assessment.ownerName}</span>;
      case "email":
        return <span className="text-sm">{assessment.email}</span>;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              assessment.status === "完了"
                ? "bg-green-100 text-green-800"
                : assessment.status === "査定中"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {assessment.status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full bg-white rounded-lg border flex-1 overflow-hidden flex flex-col max-h-[calc(100vh-24rem)]">
      {/* 固定ヘッダー */}
      <div className="sticky top-0 z-20 bg-gray-50 border-b shrink-0">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="h-12 hover:bg-transparent">
              <TableHead className="w-16 text-center text-[#0e0e10] dark:text-white font-medium">
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
                    className={`${column.width} ${alignClass} text-[#0e0e10] dark:text-white font-medium cursor-move relative ${
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
              <TableHead className="w-20 text-right text-[#0e0e10] dark:text-white font-medium" />
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* スクロール可能なボディ */}
      <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
        <div className="pt-4">
          <Table className="w-full table-fixed">
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id} className="h-14">
                  <TableCell className="w-16 text-center">
                    <Checkbox
                      checked={selectedAssessments.includes(assessment.id)}
                      onCheckedChange={(checked: boolean) =>
                        onSelectAssessment(assessment.id, checked)
                      }
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
                      <TableCell key={column.key} className={`${column.width} ${alignClass}`}>
                        {renderCellContent(column, assessment)}
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
                          <DropdownMenuItem onClick={() => handleDetailClick(assessment)}>
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
        </div>
      </div>

      {/* 詳細モーダル */}
      <BulkAssessmentDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        assessment={selectedAssessment}
      />
    </div>
  );
};
