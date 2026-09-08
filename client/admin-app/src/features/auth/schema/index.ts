import { z } from "zod";

export const authSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = authSchema.pick({
  email: true,
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = authSchema.pick({
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
