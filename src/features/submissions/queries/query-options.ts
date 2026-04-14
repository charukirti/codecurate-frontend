import { getUserSubmissions } from '@/features/submissions/api';
import { submissionKeys } from '@/features/submissions/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export function userSubmissionsQueryOptions() {
  return queryOptions({
    queryKey: submissionKeys.userSubmissions(),
    queryFn: () => getUserSubmissions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
