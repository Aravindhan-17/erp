import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, SlidersHorizontal } from "lucide-react";

export interface FilterOption {
  columnId: string;
  label: string;
  options: { label: string; value: string }[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  bulkActions?: React.ReactNode;
  filters?: FilterOption[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  bulkActions,
  filters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="w-full space-y-4">
      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          {searchKey ? (
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search..."
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ) : (
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search globally..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* FACETED FILTERS */}
          {filters && filters.length > 0 && (
            <div className="items-center gap-2 hidden lg:flex">
              {filters.map((filter) => {
                const column = table.getColumn(filter.columnId);
                if (!column) return null;
                const value = (column.getFilterValue() as string) ?? "";
                return (
                  <select
                    key={filter.columnId}
                    value={value}
                    onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                    className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none hover:bg-gray-50 focus:border-primary focus:ring-1 focus:ring-primary transition cursor-pointer"
                  >
                    <option value="">{filter.label}</option>
                    {filter.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                );
              })}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {isFiltersOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg z-50">
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Toggle Columns
                </div>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <label
                        key={column.id}
                        className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                        />
                        <span className="capitalize">{column.id}</span>
                      </label>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* BULK ACTIONS */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-sm text-gray-500 mr-2">
              {selectedRows.length} row(s) selected
            </span>
            {bulkActions}
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-100 bg-gray-50/40">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="px-5 py-4 text-[12px] font-bold uppercase tracking-wide text-gray-400 whitespace-nowrap"
                        style={{ width: header.column.getSize() !== 150 ? header.column.getSize() : undefined }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group border-b border-gray-100 transition-colors hover:bg-primary/5 last:border-b-0 data-[state=selected]:bg-primary/5"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <p className="text-sm font-medium">No results found.</p>
                      <p className="text-xs">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-sm text-gray-500">
          Showing {table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline">Rows per page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="rounded-lg border border-gray-200 bg-white py-1 px-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-700 px-2 font-medium">
              Page {table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </button>
            <button
              className="p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
