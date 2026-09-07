import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/login-form'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-md">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Admin Sign In
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your credentials to access the dashboard.
        </p>
      </div>

      <LoginForm />
    </div>
  )
}
