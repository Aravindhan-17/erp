import { ForgotPasswordForm } from './components/forgot-password-form';

export function ForgotPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-md">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Forgot Password
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
