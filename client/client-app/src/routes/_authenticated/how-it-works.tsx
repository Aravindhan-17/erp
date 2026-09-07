import { lazyRouteComponent, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/how-it-works')({
  component: lazyRouteComponent(() => import('@/features/how-it-works').then(m => ({ default: m.HowItWorksPage }))),
});
