import { Header } from '@/components/layout/header';
import { currentUserQueryOptions } from '@/features/auth/queries/useGetCurrentUser';
import { FeaturedTutorials } from '@/features/home/components/featured-tutorials';
import { Footer } from '@/features/home/components/footer';
import { Hero } from '@/features/home/components/hero';
import { HowItWorks } from '@/features/home/components/how-it-works';
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(currentUserQueryOptions());
      if (user) throw redirect({ to: '/resources', search: { page: 1, limit: 10 } });
    } catch (error) {
      if (isRedirect(error)) throw error;
    }
  },
  component: Home,
});

function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen ">
      <Header variant="rootLayout" />
      <Hero />
      <HowItWorks />
      <FeaturedTutorials />
      <Footer />
    </main>
  );
}
