import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  mrp: string;
  flashPrice: string;
  openingStock: number;
  available: number;
  status: string;
  image: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="h-3 w-3" />
        </button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-11 sm:w-11">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="max-w-55 text-xs font-semibold leading-5 text-gray-800 sm:text-sm">
            {product.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs font-medium text-gray-600">{row.original.sku}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs font-medium text-gray-600">{row.original.category}</span>,
  },
  {
    accessorKey: "mrp",
    header: "MRP",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs font-semibold text-gray-700">{row.original.mrp}</span>,
  },
  {
    accessorKey: "flashPrice",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Flash Price
          <ArrowUpDown className="h-3 w-3" />
        </button>
      );
    },
    cell: ({ row }) => <span className="whitespace-nowrap text-xs font-semibold text-gray-800">{row.original.flashPrice}</span>,
  },
  {
    accessorKey: "openingStock",
    header: "Opening Stock",
    cell: ({ row }) => <span className="text-xs font-medium text-gray-700">{row.original.openingStock}</span>,
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Available
          <ArrowUpDown className="h-3 w-3" />
        </button>
      );
    },
    cell: ({ row }) => (
      <span className={`text-xs font-semibold ${row.original.available <= 1 ? "text-red-500" : "text-gray-700"}`}>
        {row.original.available}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold ${
            status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit product"
            className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition-all"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            title="Delete product"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-700 shadow-sm transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      );
    },
  },
];
