import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/profile')({
  component: lazyRouteComponent(() => import('@/features/account/pages/profile-page').then(m => ({ default: m.ProfilePage }))),
});

