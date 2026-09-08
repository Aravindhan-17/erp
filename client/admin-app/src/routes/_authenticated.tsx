import { createFileRoute, redirect } from '@tanstack/react-router'
import { AdminLayout } from '@/components/layouts/admin-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    // If we're not logged in, redirect to the sign in page
    if (!context.auth.token) {
      throw redirect({
        to: '/auth/sign-in',
      })
    }
  },
  component: AdminLayout,
})
