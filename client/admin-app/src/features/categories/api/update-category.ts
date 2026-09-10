import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/api-client";
import { toast } from "sonner";
import type { CategoryFormData } from "../schema/category.schema";
import type { MutationConfig } from "@/types/query";

export const updateCategory = async ({ id, data }: { id: string; data: Partial<CategoryFormData> }) => {
  const res = await axiosPrivate.patch(`/admin/categories/${id}`, data);
  return res.data;
};

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({ mutationConfig }: UseUpdateCategoryOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    ...restConfig,
    mutationFn: updateCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
      onSuccess?.(...args);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update category");
    }
  });
};
