import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/features/auth/schema";
import { Link } from "@tanstack/react-router";
import { useForgotPassword } from "@/features/auth/api/forgot-password";

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            {...register("email")}
            className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-900"
      >
        {isPending ? "Sending link..." : "Send Reset Link"}
      </button>

      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Remember your password?{" "}
        <Link to="/auth/sign-in" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          Sign In
        </Link>
      </div>
    </form>
  );
}
