import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/api-client";
import { toast } from "sonner";
import type { MutationConfig } from "@/types/query";

export const deleteCategory = async (id: string) => {
  const res = await axiosPrivate.delete(`/admin/categories/${id}`);
  return res.data;
};

type UseDeleteCategoryOptions = {
  mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const useDeleteCategory = ({ mutationConfig }: UseDeleteCategoryOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    ...restConfig,
    mutationFn: deleteCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
      onSuccess?.(...args);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    }
  });
};
