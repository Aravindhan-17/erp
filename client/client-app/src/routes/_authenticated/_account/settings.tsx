import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/settings')({
  component: lazyRouteComponent(() => import('@/features/account/pages/settings-page').then(m => ({ default: m.SettingsPage }))),
});

