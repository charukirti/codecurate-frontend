import { Header } from '@/components/layout/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="authLayout" />
      <main className="flex-1 flex items-center justify-center p-4 bg-neutral-950 antialiased selection:bg-neutral-800 selection:text-neutral-50">
        <Outlet />
      </main>
    </div>
  );
}
