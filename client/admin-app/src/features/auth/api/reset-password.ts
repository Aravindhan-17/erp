import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api-client";
import { toast } from "sonner";
import type { MutationConfig } from "@/types/query";

export const resetPassword = async (data: { token: string; newPassword: string }) => {
  const res = await axiosPublic.post("/auth/admin/reset-password", data);
  return res.data;
};

type UseResetPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ mutationConfig }: UseResetPasswordOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: resetPassword,
    onSuccess: (...args) => {
      toast.success("Password reset successfully. You can now sign in.");
      onSuccess?.(...args);
    },
  });
};
