import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api-client";
import { toast } from "sonner";
import type { MutationConfig } from "@/types/query";

export const forgotPassword = async (data: { email: string }) => {
  const res = await axiosPublic.post("/auth/admin/forgot-password", data);
  return res.data;
};

type UseForgotPasswordOptions = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ mutationConfig }: UseForgotPasswordOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: forgotPassword,
    onSuccess: (...args) => {
      toast.success("Password reset link sent to your email");
      onSuccess?.(...args);
    },
  });
};
