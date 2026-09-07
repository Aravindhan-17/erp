import { createFileRoute, redirect } from '@tanstack/react-router'
import { AdminLayout } from '../layouts/AdminLayout'
import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // We should ensure auth is initialized if it's returning a promise.
    const state = useAuthStore.getState()
    if (!state.token) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: AdminLayout,
})
