import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/categories')({
  component: lazyRouteComponent(() => import('@/features/categories/layouts/categories-layout').then(m => ({ default: m.CategoriesLayout }))),
});

