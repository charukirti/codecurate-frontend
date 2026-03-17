import { Link } from '@tanstack/react-router';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <FileQuestion className="size-16 text-muted-foreground" strokeWidth={1.5} />

      <div className="space-y-2">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button render={<Link to="/">Back to home</Link>} />
    </section>
  );
}
