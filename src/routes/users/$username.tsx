import { ProfileHero } from '@/features/users/components/profile-hero';
import { ProfilePageSkeleton } from '@/features/users/components/profile-page-skeleton';
import { useGetPublicProfile } from '@/features/users/queries/use-get-public-profile';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$username')({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useParams({ from: '/users/$username' });
  const { data, isLoading } = useGetPublicProfile(username);
  if (isLoading) return <ProfilePageSkeleton />;
  const profile = data?.data;
  if (!profile) return <p className="text-destructive">Profile does not exist!</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero profile={profile} />
    </main>
  );
}
