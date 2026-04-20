import { Header } from '@/components/layout/header';
import { currentUserQueryOptions } from '@/features/auth/queries/useGetCurrentUser';
import { createFileRoute, isRedirect, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(currentUserQueryOptions());

      if (user.data.role !== 'admin') throw redirect({ to: '/' });
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: '/' });
    }
  },
  component: AdminLayout,
});
function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header variant="rootLayout" />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
