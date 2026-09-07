import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/orders')({
  component: lazyRouteComponent(() => import('@/features/account/pages/orders-page').then(m => ({ default: m.OrdersPage }))),
});

