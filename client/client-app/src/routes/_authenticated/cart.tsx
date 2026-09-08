import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/cart')({
  component: lazyRouteComponent(() => import('@/features/cart')),
});

