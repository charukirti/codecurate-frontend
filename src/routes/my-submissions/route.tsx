import { Header } from '@/components/layout/header';
import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-submissions')({
  component: MySubmissionsLayout,
});

function MySubmissionsLayout() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header variant="rootLayout" />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
