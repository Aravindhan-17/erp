import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/api-client";
import { toast } from "sonner";
import type { CategoryFormData } from "../schema/category.schema";
import type { MutationConfig } from "@/types/query";

export const createCategory = async (data: CategoryFormData) => {
  const res = await axiosPrivate.post("/admin/categories", data);
  return res.data;
};

type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({ mutationConfig }: UseCreateCategoryOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    ...restConfig,
    mutationFn: createCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
      onSuccess?.(...args);
    },
  });
};
