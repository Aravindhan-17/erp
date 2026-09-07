import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/auth/forgot-password')({
  component: lazyRouteComponent(() => import('@/features/auth/forgot-password')),
});

