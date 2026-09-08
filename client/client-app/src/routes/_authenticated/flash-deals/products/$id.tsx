import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/flash-deals/products/$id')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/pages/flash-deal-product-detail-page').then(m => ({ default: m.FlashDealProductDetailPage }))),
});

