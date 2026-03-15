import { ProfileHero } from '@/features/users/components/profile-hero';
import { ProfilePageSkeleton } from '@/features/users/components/profile-page-skeleton';
import { UserReviews } from '@/features/users/components/user-reviews';
import { useGetPublicProfile } from '@/features/users/queries/use-get-public-profile';
import { useGetUserReviews } from '@/features/users/queries/use-get-user-reviews';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$username')({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useParams({ from: '/users/$username' });
  const { data: profileData, isLoading: isProfileLoading } = useGetPublicProfile(username);
  const { data: reviewsData, isLoading: isUsersReviewsLoading } = useGetUserReviews(username);
  if (isProfileLoading || isUsersReviewsLoading) return <ProfilePageSkeleton />;
  const profile = profileData?.data;
  const reviews = reviewsData?.data;
  if (!profile) return <p className="text-destructive">Profile does not exist!</p>;
  if (!reviews) return <p className="text-destructive">Reviews does not exist. Write a review!</p>;
  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero profile={profile} />
      <UserReviews reviews={reviews.reviews} totalItems={reviews.pagination.totalItems} username={username} />
    </main>
  );
}
