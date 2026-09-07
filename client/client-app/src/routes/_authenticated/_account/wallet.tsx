import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/wallet')({
  component: lazyRouteComponent(() => import('@/features/account/pages/wallet-page').then(m => ({ default: m.WalletPage }))),
});

