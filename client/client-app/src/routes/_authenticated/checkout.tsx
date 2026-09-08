import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/checkout')({
  component: lazyRouteComponent(() => import('@/features/checkout')),
});

