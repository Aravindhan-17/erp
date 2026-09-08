import { ResetPasswordForm } from './components/reset-password-form';

export function ResetPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-md">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please enter your new password below.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
