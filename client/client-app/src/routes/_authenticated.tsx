import { createFileRoute } from '@tanstack/react-router';
import { StorefrontLayout } from '@/components/layouts/storefront-layout';

export const Route = createFileRoute('/_authenticated')({
  component: StorefrontLayout,
});
