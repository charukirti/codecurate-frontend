import { Header } from '@/components/layout/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/users')({
  component: usersLayout,
});

function usersLayout() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header variant="rootLayout" />
      <Outlet />
    </div>
  );
}
