import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth.store'

export interface RouterContext {
  auth: ReturnType<typeof useAuthStore.getState>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
  