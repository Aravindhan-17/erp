import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/returns')({
  component: lazyRouteComponent(() => import('@/features/account/pages/returns-page').then(m => ({ default: m.ReturnsPage }))),
});

