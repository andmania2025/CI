import { GenericDataTable } from "@/components/tables/GenericDataTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import React from "react";

interface TableSectionProps<T> {
  title: string;
  description: string;
  data: T[];
  columns: ColumnDef<T>[];
  maxHeight?: string;
  detailLink?: string;
}

export const TableSection = <T,>({
  title,
  description: _description,
  data,
  columns,
  maxHeight = "400px",
  detailLink,
}: TableSectionProps<T>) => {
  return (
    <div className="col-span-1 flex flex-col h-full min-h-0">
      <div className="mb-2 px-2 sm:px-3 lg:px-4 flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h2>
          {detailLink && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-xs h-6 sm:h-7 px-2 flex-shrink-0"
              onClick={() => (window.location.href = detailLink)}
            >
              詳細
              <ChevronRight className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      <div className="px-2 sm:px-3 lg:px-4 flex-1 min-h-0 h-full">
        <GenericDataTable data={data} columns={columns} maxHeight={maxHeight} />
      </div>
    </div>
  );
};
