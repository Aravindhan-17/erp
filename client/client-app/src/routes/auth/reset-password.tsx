import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/reset-password')({
  component: lazyRouteComponent(() => import('@/features/auth/reset-password')),
});
