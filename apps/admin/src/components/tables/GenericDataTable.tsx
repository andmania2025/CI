"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

interface GenericDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  maxHeight?: string;
}

export function GenericDataTable<T>({
  data: initialData,
  columns,
  maxHeight = "400px",
}: GenericDataTableProps<T>) {
  const [data, _setData] = React.useState(() => initialData);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, columnFilters, pagination },
    getRowId: (row: any) => row.id?.toString() || Math.random().toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="overflow-hidden rounded-lg border bg-white flex-1 min-h-0"
        style={maxHeight === "100%" ? {} : { maxHeight: `calc(${maxHeight} - 60px)` }}
      >
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-b border-gray-200">
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      colSpan={h.colSpan}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                    >
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    データがありません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-end pt-4 px-4 flex-shrink-0">
          <Pagination className="m-0 !mx-0 !w-auto !justify-end">
            <PaginationContent className="flex items-center gap-2 m-0">
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-8 w-16"
                >
                  前へ
                </Button>
              </PaginationItem>
              <div className="flex items-center gap-1">
                {(() => {
                  const current = table.getState().pagination.pageIndex + 1;
                  const total = table.getPageCount();

                  let pages: (number | string)[] = [];

                  if (total <= 7) {
                    pages = Array.from({ length: total }, (_, i) => i + 1);
                  } else if (current < 4) {
                    pages = [1, 2, 3, 4, 5, "...", total];
                  } else if (current > total - 3) {
                    pages = [1, "...", total - 4, total - 3, total - 2, total - 1, total];
                  } else {
                    pages = [1, "...", current - 1, current, current + 1, "...", total];
                  }

                  return pages.map((page, i) => (
                    <PaginationItem key={`${page}-${i}`}>
                      {page === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex((page as number) - 1);
                          }}
                          isActive={current === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ));
                })()}
              </div>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-8 w-16"
                >
                  次へ
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
