import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2, FolderTree, Package2 } from "lucide-react";
import { useCategories } from "../context/categories-provider";

export type Category = {
  id: string;
  name: string;
  slug: string;
  status: string;
  subcategories: number;
  products: number;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          Active
        </span>
      );
    case "UPCOMING":
      return (
        <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
          Upcoming
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
          Inactive
        </span>
      );
  }
};

const CategoryRowActions = ({ row }: { row: any }) => {
  const { setOpen, setCurrentRow } = useCategories();
  const category = row.original;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setCurrentRow(category);
          setOpen('update');
        }}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary"
        title="Edit"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={() => {
          setCurrentRow(category);
          setOpen('delete');
        }}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export const columns: ColumnDef<Category>[] = [
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
          Category
          <ArrowUpDown className="h-3 w-3" />
        </button>
      );
    },
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <FolderTree size={20} />
          </div>
          <div>
            <div className="font-medium text-gray-900">{category.name}</div>
            <div className="text-xs text-gray-500">/{category.slug}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "stats",
    header: "Stats",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5" title="Subcategories">
            <FolderTree size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{category.subcategories}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Products">
            <Package2 size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{category.products}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CategoryRowActions row={row} />,
  },
];
