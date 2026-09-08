import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthLayout } from '@/features/auth/components/auth-layout'

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ context }) => {
    // If the user is already logged in, they shouldn't see the auth pages
    if (context.auth.token) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AuthLayout,
})
