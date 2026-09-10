import { Plus, Loader2 } from "lucide-react";
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useCategories } from "../context/categories-provider";
import { CategoriesDialogs } from "./categories-dialogs";
import { useGetCategories } from "../api/get-categories";

export function CategoriesContent() {
  const { setOpen, setCurrentRow } = useCategories();
  const { data: categories, isLoading, error } = useGetCategories();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage product categories and taxonomy</p>
        </div>
        <button
          onClick={() => {
            setCurrentRow(null);
            setOpen('create');
          }}
          className="bg-primary hover:bg-primary-hover flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center text-red-500">
          Failed to load categories
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={categories || []}
          searchKey="name"
          filters={[
            {
              columnId: "status",
              label: "All Statuses",
              options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Upcoming", value: "UPCOMING" },
                { label: "Inactive", value: "INACTIVE" },
              ]
            }
          ]}
          bulkActions={
            <>
              <button className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-sm hover:bg-gray-50 transition">
                Mark as Active
              </button>
              <button className="h-9 px-3 rounded-lg border border-red-100 bg-red-50 text-red-600 text-xs font-medium shadow-sm hover:bg-red-100 transition">
                Delete Selected
              </button>
            </>
          }
        />
      )}

      <CategoriesDialogs availableParents={categories || []} />
    </div>
  );
}
