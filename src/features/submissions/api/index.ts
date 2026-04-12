import type { UserSubmissionResponse } from '@/features/submissions/types/submissions.types';
import { api } from '@/lib/axios';

export async function getUserSubmissions() {
  const response = await api.get<UserSubmissionResponse>(`/submissions/my-submissions`);
  return response.data;
}
