import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/categories/$id')({
  component: lazyRouteComponent(() => import('@/features/categories/pages/category-detail-page').then(m => ({ default: m.CategoryDetailPage }))),
});

