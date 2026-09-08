import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_account')({
  component: lazyRouteComponent(() => import('@/features/account/layouts/account-layout').then(m => ({ default: m.AccountLayout }))),
});
