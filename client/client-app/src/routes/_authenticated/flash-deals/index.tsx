import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/flash-deals/')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/pages/flash-deals-page').then(m => ({ default: m.FlashDealsPage }))),
});

