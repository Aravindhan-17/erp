import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api-client";
import { toast } from "sonner";
import type { MutationConfig } from "@/types/query";

export const registerUser = async (data: any) => {
  const res = await axiosPublic.post("/auth/customer/sign-up", data);
  return res.data;
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof registerUser>;
};

export const useRegister = ({ mutationConfig }: UseRegisterOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: registerUser,
    onSuccess: (...args) => {
      toast.success("Account created successfully. You can now log in.");
      onSuccess?.(...args);
    },
  });
};
