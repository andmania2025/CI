import type { ColumnDef } from "@tanstack/react-table";

export interface PropertyData {
  id: number;
  updateDate: string;
  propertyName: string;
  propertyType: string;
  location: string;
}

export const propertyColumns: ColumnDef<PropertyData>[] = [
  {
    accessorKey: "updateDate",
    header: "更新日時",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600 font-mono">{row.original.updateDate}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "propertyName",
    header: "物件名",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.original.propertyName}</div>
    ),
  },
  {
    accessorKey: "propertyType",
    header: "種別",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.propertyType}</div>,
  },
  {
    accessorKey: "location",
    header: "所在地",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700 max-w-xs truncate" title={row.original.location}>
        {row.original.location}
      </div>
    ),
  },
];
