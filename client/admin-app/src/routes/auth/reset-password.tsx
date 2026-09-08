import { createFileRoute } from '@tanstack/react-router'
import { ResetPasswordPage } from '@/features/auth/reset-password'
import { z } from 'zod'

export const Route = createFileRoute('/auth/reset-password')({
  validateSearch: z.object({
    token: z.string().catch(''),
  }),
  component: ResetPasswordPage,
})
 