import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/notifications')({
  component: lazyRouteComponent(() => import('@/features/account/pages/notifications-page').then(m => ({ default: m.NotificationsPage }))),
});

