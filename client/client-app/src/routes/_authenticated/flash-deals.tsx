import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/flash-deals')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/layouts/flash-deals-layout').then(m => ({ default: m.FlashDealsLayout }))),
});

