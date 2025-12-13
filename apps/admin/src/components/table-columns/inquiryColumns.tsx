import type { ColumnDef } from "@tanstack/react-table";

export interface InquiryData {
  id: number;
  inquiryDate: string;
  name: string;
  property: string;
}

export const inquiryColumns: ColumnDef<InquiryData>[] = [
  {
    accessorKey: "inquiryDate",
    header: "問い合わせ日時",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600 font-mono">{row.original.inquiryDate}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "氏名",
    cell: ({ row }) => <div className="text-sm font-medium text-gray-900">{row.original.name}</div>,
  },
  {
    accessorKey: "property",
    header: "問い合わせ物件",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700 max-w-xs truncate" title={row.original.property}>
        {row.original.property}
      </div>
    ),
  },
];
