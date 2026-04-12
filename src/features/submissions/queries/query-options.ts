import { getUserSubmissions } from '@/features/submissions/api';
import { queryOptions } from '@tanstack/react-query';

export function userSubmissionsQueryOptions() {
  return queryOptions({
    queryKey: ['userSubmissions', 'user'],
    queryFn: () => getUserSubmissions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
