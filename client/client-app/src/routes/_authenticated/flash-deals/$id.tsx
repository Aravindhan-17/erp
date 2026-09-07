import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/flash-deals/$id')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/pages/flash-deal-detail-page').then(m => ({ default: m.FlashDealDetailPage }))),
});
