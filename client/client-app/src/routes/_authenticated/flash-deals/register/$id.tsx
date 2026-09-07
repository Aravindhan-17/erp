import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/flash-deals/register/$id')({
  component: lazyRouteComponent(() => import('@/features/flash-deals/pages/flash-deal-register-page').then(m => ({ default: m.FlashDealRegisterPage }))),
});

