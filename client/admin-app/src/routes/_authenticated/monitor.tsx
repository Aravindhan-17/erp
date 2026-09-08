import { createFileRoute } from '@tanstack/react-router';
import Monitor from '@/features/monitor';

export const Route = createFileRoute('/_authenticated/monitor')({
  component: Monitor,
});
