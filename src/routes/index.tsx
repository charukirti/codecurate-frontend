import { Header } from '@/components/layout/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <Header variant="rootLayout" />
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold mb-4">Welcome to CodeCurate!</h1>
        <p className="text-gray-700 mb-6">
          This is the home page of your application. You can customize this page to include any content you like.
        </p>
      </div>
    </main>
  );
}
