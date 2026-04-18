import { getAllSubmissions } from '@/features/admin/api';
import { adminKeys } from '@/features/admin/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export function adminSubmissionsQueryOptions() {
  return queryOptions({
    queryKey: adminKeys.submissions(),
    queryFn: () => getAllSubmissions(),
    staleTime: 5 * 60 * 1000,
  });
}
