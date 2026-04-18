import { Header } from '@/components/layout/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});
function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header variant="rootLayout" />
      <Outlet />
    </div>
  );
}
