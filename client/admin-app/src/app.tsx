import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Providers } from './components/providers'
import { useAuthStore } from './stores/auth.store'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be injected at render time
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  const auth = useAuthStore()

  return (
    <Providers>
      <RouterProvider router={router} context={{ auth }} />
    </Providers>
  )
}

