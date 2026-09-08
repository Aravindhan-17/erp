import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/categories/')({
  component: lazyRouteComponent(() => import('@/features/categories/pages/categories-page').then(m => ({ default: m.CategoriesPage }))),
});

