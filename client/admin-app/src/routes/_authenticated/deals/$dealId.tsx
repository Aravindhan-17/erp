import { createFileRoute } from '@tanstack/react-router';
import { CreateDealPage } from '@/features/deals';

export const Route = createFileRoute('/_authenticated/deals/$dealId')({
  component: CreateDealPage,
});
