import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/support')({
  component: lazyRouteComponent(() => import('@/features/account/pages/support-page').then(m => ({ default: m.SupportPage }))),
});

