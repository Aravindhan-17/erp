import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import type { MutationConfig } from "@/types/query";

export const login = async (data: any) => {
  const res = await axiosPublic.post("/auth/admin/sign-in", data);
  return res.data;
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    ...restConfig,
    mutationFn: login,
    onSuccess: (...args) => {
      const data = args[0];
      setAuth(data.admin, data.access_token);
      toast.success("Logged in successfully");
      onSuccess?.(...args);
    },
  });
};
