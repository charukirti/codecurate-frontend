import { ResetPassword } from '@/features/auth/components/reset-password';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/reset-password')({
  validateSearch: (search) => ({
    token: (search.token as string) ?? '',
  }),
  component: ResetPassword,
});
