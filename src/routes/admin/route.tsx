import { Header } from '@/components/layout/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
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
