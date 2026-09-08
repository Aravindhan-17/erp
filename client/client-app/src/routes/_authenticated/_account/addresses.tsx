import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/addresses')({
  component: lazyRouteComponent(() => import('@/features/account/pages/addresses-page').then(m => ({ default: m.AddressesPage }))),
});

