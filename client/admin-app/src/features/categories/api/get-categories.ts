import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/api-client";
import type { Category } from "../components/columns";
import type { QueryConfig } from "@/types/query";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosPrivate.get("/admin/categories");
  return res.data;
};

type UseGetCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategories>;
};

export const useGetCategories = ({ queryConfig }: UseGetCategoriesOptions = {}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    ...queryConfig,
  });
};
