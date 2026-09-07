import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_account/overview')({
  component: lazyRouteComponent(() => import('@/features/account/pages/overview-page').then(m => ({ default: m.OverviewPage }))),
});

