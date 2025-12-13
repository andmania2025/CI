export type Column<T> = {
  key: keyof T;
  header: string;
  className?: string;
};

export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
}

export const DataTable = <T extends { id: string | number }>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-3 border-b flex items-center justify-between bg-white">
        <div className="text-sm text-muted-foreground">{data.length} items</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="text-left p-3 font-medium text-foreground border-b"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30">
                {columns.map((c) => (
                  <td key={String(c.key)} className="p-3 border-b">
                    {String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 border-t bg-white flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Page 1 of 1</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
            Prev
          </button>
          <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
