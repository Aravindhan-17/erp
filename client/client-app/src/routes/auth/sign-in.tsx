import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/auth/sign-in')({
  component: lazyRouteComponent(() => import('@/features/auth/sign-in')),
});

