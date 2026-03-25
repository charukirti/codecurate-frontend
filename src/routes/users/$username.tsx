import { ProfileHero } from '@/features/users/components/profile-hero';
import { ProfilePageSkeleton } from '@/features/users/components/profile-page-skeleton';
import { UserReviews } from '@/features/users/components/user-reviews';
import { getPublicProfileQueryOptions, getUserReviewsQueryOptions } from '@/features/users/queries/query-options';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$username')({
  loader: ({ context, params }) =>
    Promise.all([
      context.queryClient.ensureQueryData(getPublicProfileQueryOptions(params.username)),
      context.queryClient.ensureQueryData(getUserReviewsQueryOptions(params.username)),
    ]),
  pendingComponent: ProfilePageSkeleton,
  errorComponent: ({ error }) => (
    <main className="container mx-auto px-4 py-8">
      <p className="text-destructive">{error.message}</p>
    </main>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useParams({ from: '/users/$username' });
  const { data: profileData } = useSuspenseQuery(getPublicProfileQueryOptions(username));
  const { data: reviewsData } = useSuspenseQuery(getUserReviewsQueryOptions(username));

  const profile = profileData.data;
  const reviews = reviewsData.data;

  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero profile={profile} />
      <UserReviews reviews={reviews.reviews} totalItems={reviews.pagination.totalItems} username={username} />
    </main>
  );
}
