import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/auth/sign-up')({
  component: lazyRouteComponent(() => import('@/features/auth/sign-up')),
});

