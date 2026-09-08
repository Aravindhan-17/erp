import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_home/')({
  component: lazyRouteComponent(() => import('@/features/home').then(m => ({ default: m.StorefrontHomePage }))),
});

