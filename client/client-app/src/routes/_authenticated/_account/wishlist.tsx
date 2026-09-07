import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/_account/wishlist')({
  component: lazyRouteComponent(() => import('@/features/account/pages/wishlist-page').then(m => ({ default: m.WishlistPage }))),
});

